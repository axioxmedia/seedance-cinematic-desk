"""Local LLM via persistent child process + Queue (no HTTP)."""

from __future__ import annotations

import multiprocessing as mp
import threading
import time
import traceback
from pathlib import Path
from typing import Callable, Optional

from .paths import models_dir

_engine: Optional[str] = None
_model_id: Optional[str] = None
_proc: Optional[mp.Process] = None
_req_q: Optional[mp.Queue] = None
_res_q: Optional[mp.Queue] = None
_lock = threading.RLock()
_log_fn: Optional[Callable[[str], None]] = None


def set_log_fn(fn: Callable[[str], None]):
    global _log_fn
    _log_fn = fn


def _log(msg: str):
    if _log_fn:
        try:
            _log_fn(msg)
        except Exception:
            pass
    print(msg, flush=True)


def get_status() -> dict:
    alive = _proc is not None and _proc.is_alive()
    return {
        "loaded": alive and _model_id is not None,
        "engine": _engine,
        "model_id": _model_id,
        "port": None,
    }


def _worker_main(model_path: str, n_gpu_layers: int, n_ctx: int, req_q: mp.Queue, res_q: mp.Queue):
    try:
        print(f"[worker] loading {model_path}", flush=True)
        from llama_cpp import Llama

        llm = Llama(
            model_path=model_path,
            n_ctx=n_ctx,
            n_gpu_layers=n_gpu_layers,
            verbose=False,
        )
        print("[worker] model loaded OK", flush=True)
        res_q.put({"type": "ready"})
    except Exception as e:
        res_q.put({"type": "error", "error": f"load failed: {e}\n{traceback.format_exc()}"})
        return

    while True:
        msg = req_q.get()
        if not msg or msg.get("type") == "stop":
            print("[worker] stop", flush=True)
            break
        if msg.get("type") == "chat":
            try:
                messages = msg["messages"]
                temperature = float(msg.get("temperature", 0.7))
                max_tokens = int(msg.get("max_tokens", 4096))
                prompt_parts = []
                for m in messages:
                    role = m.get("role", "user")
                    content = m.get("content", "")
                    if role == "system":
                        prompt_parts.append(f"System: {content}\n")
                    elif role == "user":
                        prompt_parts.append(f"User: {content}\n")
                    elif role == "assistant":
                        prompt_parts.append(f"Assistant: {content}\n")
                prompt_parts.append("Assistant: ")
                prompt = "\n".join(prompt_parts)
                try:
                    n_prompt = len(llm.tokenize(prompt.encode("utf-8"), add_bos=True))
                except Exception:
                    n_prompt = max(1, len(prompt) // 2)
                room = max(128, n_ctx - n_prompt - 64)
                max_tokens = min(max_tokens, room)
                print(f"[worker] n_prompt={n_prompt} max_tokens={max_tokens} n_ctx={n_ctx}", flush=True)
                out = llm(
                    prompt,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    stop=["User:", "System:"],
                    echo=False,
                )
                text = out["choices"][0]["text"].strip()
                res_q.put({"type": "chat_ok", "content": text})
            except Exception as e:
                res_q.put({"type": "chat_err", "error": f"{e}\n{traceback.format_exc()}"})


def unload():
    global _proc, _req_q, _res_q, _engine, _model_id
    with _lock:
        if _req_q is not None:
            try:
                _req_q.put({"type": "stop"})
            except Exception:
                pass
        if _proc is not None:
            _log("stopping model worker process...")
            _proc.join(timeout=8)
            if _proc.is_alive():
                _proc.terminate()
                _proc.join(timeout=3)
            _proc = None
        _req_q = None
        _res_q = None
        _engine = None
        _model_id = None


def _find_gguf(model_id: str) -> Path:
    model_dir = models_dir() / model_id
    ggufs = list(model_dir.glob("*.gguf"))
    if not ggufs:
        raise FileNotFoundError(f"GGUF not found: {model_id}")
    preferred = [f for f in ggufs if "Q4_K_M" in f.name or "q4_k_m" in f.name.lower()]
    return preferred[0] if preferred else ggufs[0]


def load_llama_cpp(model_id: str, n_gpu_layers: int = -1) -> dict:
    global _proc, _req_q, _res_q, _engine, _model_id

    _log("=== local_llm loader v4-queue ===")
    model_file = _find_gguf(model_id)
    _log(f"gguf: {model_file}")
    if n_gpu_layers is None:
        n_gpu_layers = -1
    n_ctx = 16384

    with _lock:
        unload()
        try:
            mp.set_start_method("spawn", force=True)
        except RuntimeError:
            pass

        _req_q = mp.Queue()
        _res_q = mp.Queue()
        _proc = mp.Process(
            target=_worker_main,
            args=(str(model_file.resolve()), n_gpu_layers, n_ctx, _req_q, _res_q),
            daemon=True,
        )
        _log("starting queue worker process...")
        _proc.start()

        deadline = time.time() + 180
        while time.time() < deadline:
            if not _proc.is_alive():
                raise RuntimeError("worker process died during load")
            try:
                msg = _res_q.get(timeout=1.0)
            except Exception:
                continue
            if msg.get("type") == "ready":
                _engine = "queue_worker"
                _model_id = model_id
                _log(f"OK: local model ready model={model_id}")
                return {
                    "ok": True,
                    "engine": _engine,
                    "model_id": model_id,
                    "file": model_file.name,
                    "n_gpu_layers": n_gpu_layers,
                }
            if msg.get("type") == "error":
                raise RuntimeError(msg.get("error", "unknown load error"))
        raise TimeoutError("timeout waiting for worker ready (180s)")


def load_transformers(model_id: str) -> dict:
    raise NotImplementedError("Use llama_cpp engine.")


def chat_completion(
    messages: list,
    temperature: float = 0.7,
    max_tokens: int = 4096,
) -> str:
    if _proc is None or not _proc.is_alive() or _req_q is None or _res_q is None:
        raise RuntimeError("local model not loaded")

    with _lock:
        _req_q.put({
            "type": "chat",
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        })
        deadline = time.time() + 600
        while time.time() < deadline:
            if not _proc.is_alive():
                raise RuntimeError("worker process died during chat")
            try:
                msg = _res_q.get(timeout=1.0)
            except Exception:
                continue
            if msg.get("type") == "chat_ok":
                return msg["content"]
            if msg.get("type") == "chat_err":
                raise RuntimeError(msg.get("error", "chat error"))
        raise TimeoutError("chat timeout (600s)")
