"""Seedance Cinematic Desk — local FastAPI + pywebview wizard."""

from __future__ import annotations

import asyncio
import json
import os
import sys
import time
import zipfile
from collections import deque
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

import httpx
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from axioxmedia import (
    AIO_BRAND,
    aio_logo_png,
    aio_watermark,
    apply_hwnd_icon,
    axiox_window_title,
)
from backend import local_llm
from backend.downloader import delete_model, download_model, is_model_downloaded, list_local_models
from backend.paths import bundle_root, data_root, output_dir
from backend.vram import ENGINE_INFO, MODEL_CATALOG, get_vram_info

APP_VERSION = "1.0.0"
APP_NAME_ZH = "Seedance 电影提示词工作台"
APP_NAME_EN = "Seedance Cinematic Desk"
LOG_NAME = "seedance_desk.log"

ROOT = bundle_root()
STATIC = ROOT / "static"
OUTPUT = output_dir()

app = FastAPI(title=APP_NAME_EN, version=APP_VERSION)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_log_buffer: deque[str] = deque(maxlen=200)
_log_subscribers: list[asyncio.Queue] = []


def log(msg: str) -> None:
    ts = datetime.now().strftime("%H:%M:%S")
    line = f"[{ts}] {msg}"
    _log_buffer.append(line)
    print(line, flush=True)
    write_log(line)
    for q in list(_log_subscribers):
        try:
            q.put_nowait(line)
        except Exception:
            pass


@app.get("/api/logs/stream")
async def log_stream():
    async def event_gen():
        q: asyncio.Queue = asyncio.Queue()
        _log_subscribers.append(q)
        for line in list(_log_buffer):
            yield f"data: {json.dumps({'line': line}, ensure_ascii=False)}\n\n"
        try:
            while True:
                line = await q.get()
                yield f"data: {json.dumps({'line': line}, ensure_ascii=False)}\n\n"
        except asyncio.CancelledError:
            pass
        finally:
            if q in _log_subscribers:
                _log_subscribers.remove(q)

    return StreamingResponse(event_gen(), media_type="text/event-stream")


@app.get("/")
def index() -> FileResponse:
    return FileResponse(STATIC / "index.html")


@app.get("/brand/logo.png")
def brand_logo() -> Response:
    return Response(content=aio_logo_png(), media_type="image/png")


@app.get("/favicon.ico")
def brand_favicon() -> Response:
    return Response(content=aio_logo_png(), media_type="image/png")


@app.get("/api/defaults")
def api_defaults() -> dict[str, Any]:
    return {
        "version": APP_VERSION,
        "name_zh": APP_NAME_ZH,
        "name_en": APP_NAME_EN,
        "brand": AIO_BRAND,
        "watermark": aio_watermark(),
        "data_root": str(data_root()),
        "output": str(OUTPUT),
    }


@app.get("/api/vram")
def api_vram():
    return get_vram_info().__dict__


@app.get("/api/engines")
def api_engines():
    return ENGINE_INFO


@app.get("/api/models")
def api_models():
    vram = get_vram_info()
    models = list_local_models()
    for m in models:
        m["suitable"] = (
            (m["id"] == "7b" and vram.suitable_7b)
            or (m["id"] == "14b" and vram.suitable_14b)
            or (m["id"] == "32b" and vram.suitable_32b)
        )
        m["vram_total_gb"] = vram.total_gb
    return {
        "vram": vram.__dict__,
        "models": models,
        "engines": ENGINE_INFO,
        "local_status": local_llm.get_status(),
    }


class DownloadReq(BaseModel):
    model_id: str
    force: bool = False


@app.post("/api/models/download")
async def api_download(req: DownloadReq):
    vram = get_vram_info()
    catalog = {m["id"]: m for m in MODEL_CATALOG}
    if req.model_id not in catalog:
        raise HTTPException(400, "unknown model_id")
    info = catalog[req.model_id]
    suitable = (
        (req.model_id == "7b" and vram.suitable_7b)
        or (req.model_id == "14b" and vram.suitable_14b)
        or (req.model_id == "32b" and vram.suitable_32b)
    )
    if not suitable and not req.force:
        return JSONResponse({
            "ok": False,
            "need_confirm": True,
            "message": (
                f"VRAM ~ {vram.total_gb} GB may be low for {info['name']} "
                f"(recommended {info['recommended_vram']}). Force download?"
            ),
        })
    log(f"download start: {info['name']}")
    loop = asyncio.get_event_loop()
    try:
        result = await loop.run_in_executor(
            None, lambda: download_model(req.model_id, progress_callback=log)
        )
        log(f"download done: {req.model_id}")
        return {"ok": True, **result}
    except Exception as e:
        log(f"download failed: {e}")
        raise HTTPException(500, str(e))


class LoadReq(BaseModel):
    model_id: str
    engine: str = "llama_cpp"
    n_gpu_layers: int = -1


class DeleteReq(BaseModel):
    model_id: str


@app.post("/api/models/delete")
def api_delete_model(req: DeleteReq):
    try:
        st = local_llm.get_status()
        if st.get("loaded") and st.get("model_id") == req.model_id:
            local_llm.unload()
            log(f"unloaded before delete: {req.model_id}")
    except Exception as e:
        log(f"unload before delete: {e}")
    try:
        result = delete_model(req.model_id)
        log(f"deleted model: {req.model_id}")
        return result
    except Exception as e:
        log(f"delete failed: {e}")
        raise HTTPException(500, str(e))


@app.post("/api/models/load")
async def api_load(req: LoadReq):
    if not is_model_downloaded(req.model_id):
        raise HTTPException(400, "model not downloaded")
    log(f"load local model: {req.model_id} engine={req.engine}")
    try:
        if req.engine == "llama_cpp":
            result = local_llm.load_llama_cpp(req.model_id, req.n_gpu_layers)
        elif req.engine == "transformers":
            result = local_llm.load_transformers(req.model_id)
        else:
            raise HTTPException(400, f"unknown engine: {req.engine}")
        log(f"loaded: {req.model_id}")
        return result
    except Exception as e:
        log(f"load failed: {e}")
        raise HTTPException(500, str(e))


@app.post("/api/models/unload")
def api_unload():
    local_llm.unload()
    log("local model unloaded")
    return {"ok": True}


@app.get("/api/models/status")
def api_local_status():
    return local_llm.get_status()


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatReq(BaseModel):
    model: str = "local"
    messages: list[ChatMessage]
    temperature: float = 0.7
    max_tokens: int = 8192
    provider: str = "local"
    api_key: Optional[str] = None
    json_mode: bool = False
    prompt: Optional[str] = None
    kind: str = "text"


async def _run_chat(req: ChatReq) -> dict[str, Any]:
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    if req.prompt and not messages:
        messages = [{"role": "user", "content": req.prompt}]

    if req.provider == "local":
        log(f"local infer messages={len(messages)} max_tokens={req.max_tokens}")
        loop = asyncio.get_event_loop()
        content = await loop.run_in_executor(
            None,
            lambda: local_llm.chat_completion(messages, req.temperature, req.max_tokens),
        )
        log("local infer done")
        return {
            "id": f"local-{int(time.time())}",
            "object": "chat.completion",
            "choices": [{
                "index": 0,
                "message": {"role": "assistant", "content": content},
                "finish_reason": "stop",
            }],
        }

    if req.provider == "deepseek":
        url = "https://api.deepseek.com/v1/chat/completions"
        model = req.model or "deepseek-v4-pro"
        if model in ("local", "grok-4.6"):
            model = "deepseek-v4-pro"
    elif req.provider in ("grok", "xai"):
        url = "https://api.x.ai/v1/chat/completions"
        model = req.model or "grok-4.6"
        if model in ("local", "deepseek-v4-pro"):
            model = "grok-4.6"
    else:
        raise HTTPException(400, f"unknown provider: {req.provider}")

    if not req.api_key:
        raise HTTPException(400, "missing api_key")

    payload: dict[str, Any] = {
        "model": model,
        "messages": messages,
        "temperature": req.temperature,
        "max_tokens": req.max_tokens,
    }
    if req.json_mode:
        payload["response_format"] = {"type": "json_object"}

    log(f"proxy -> {req.provider} model={model}")
    async with httpx.AsyncClient(timeout=180.0, trust_env=False) as client:
        r = await client.post(
            url,
            headers={
                "Authorization": f"Bearer {req.api_key}",
                "Content-Type": "application/json",
            },
            json=payload,
        )
        if r.status_code >= 400:
            log(f"upstream {r.status_code}: {r.text[:200]}")
            raise HTTPException(r.status_code, r.text[:500])
        data = r.json()
        log(f"upstream ok · {req.provider}")
        return data


@app.post("/v1/chat/completions")
async def chat_completions(req: ChatReq):
    return await _run_chat(req)


@app.post("/api/ai/complete")
async def api_ai_complete(req: ChatReq):
    """ai-provider-gateway contract. Same body as chat completions."""
    return await _run_chat(req)


class SavePartReq(BaseModel):
    project_id: str
    part: int
    duration_seconds: int = 20
    style_focus: str = ""
    prompt: str


@app.post("/api/save_part")
def save_part(req: SavePartReq):
    folder = OUTPUT / req.project_id
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"Part{req.part}.txt"
    header = (
        f"# Part {req.part}\n"
        f"# duration: {req.duration_seconds}s\n"
        f"# style: {req.style_focus}\n"
        f"# generated: {datetime.now().isoformat()}\n\n"
    )
    path.write_text(header + req.prompt, encoding="utf-8")
    log(f"saved -> output/{req.project_id}/Part{req.part}.txt")
    return {"ok": True, "path": str(path)}


@app.get("/api/projects")
def list_projects():
    projects = []
    if OUTPUT.exists():
        for d in sorted(OUTPUT.iterdir(), reverse=True):
            if d.is_dir():
                parts = list(d.glob("Part*.txt"))
                projects.append({"id": d.name, "parts": len(parts), "path": str(d)})
    return {"projects": projects}


@app.post("/api/skill/parse")
async def parse_skill(file: UploadFile = File(...)):
    raw = await file.read()
    if not raw:
        raise HTTPException(400, "empty zip")
    import io

    try:
        zf = zipfile.ZipFile(io.BytesIO(raw))
    except zipfile.BadZipFile as e:
        raise HTTPException(400, f"not a zip: {e}") from e

    skill_md = ""
    refs: list[str] = []
    for name in zf.namelist():
        if name.endswith("/"):
            continue
        base = name.split("/")[-1]
        try:
            txt = zf.read(name).decode("utf-8", errors="replace")
        except Exception:
            continue
        if base.lower() == "skill.md":
            skill_md = txt
        elif base.lower().endswith(".md") or "reference" in name.lower():
            refs.append(f"\n\n<!-- file: {name} -->\n{txt}")
    if not skill_md.strip():
        for name in zf.namelist():
            if name.lower().endswith(".md") and not name.endswith("/"):
                skill_md = zf.read(name).decode("utf-8", errors="replace")
                break
    if not skill_md.strip():
        raise HTTPException(400, "SKILL.md not found in zip")
    text = skill_md + "".join(refs)
    log(f"skill parsed: {file.filename} chars={len(text)}")
    return {
        "ok": True,
        "name": file.filename or "skill.zip",
        "chars": len(text),
        "skill_md": text,
    }


if STATIC.exists():
    app.mount("/assets", StaticFiles(directory=str(STATIC)), name="assets")


@app.on_event("startup")
def on_startup():
    log(f"{APP_NAME_EN} v{APP_VERSION} started")
    v = get_vram_info()
    log(v.message)
    try:
        local_llm.set_log_fn(log)
    except Exception:
        pass


def runtime_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent


LOG_FILE = runtime_dir() / LOG_NAME


def write_log(message: str) -> None:
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as fh:
            fh.write(message.rstrip() + "\n")
    except Exception:
        pass


def show_error(message: str) -> None:
    write_log(message)
    if os.name == "nt":
        try:
            import ctypes

            ctypes.windll.user32.MessageBoxW(0, message[:2000], APP_NAME_EN, 0x10)
        except Exception:
            pass


def _free_port(preferred: int = 8787) -> int:
    import socket

    for port in range(preferred, preferred + 40):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def ensure_stdio() -> None:
    if sys.stdout is None:
        sys.stdout = open(os.devnull, "w", encoding="utf-8")
    if sys.stderr is None:
        sys.stderr = open(os.devnull, "w", encoding="utf-8")


def run_server(host: str, port: int, reload: bool = False) -> None:
    import uvicorn

    ensure_stdio()
    config = uvicorn.Config(
        app,
        host=host,
        port=port,
        reload=reload,
        log_config=None,
        log_level="info",
    )
    server = uvicorn.Server(config)
    server.install_signal_handlers = False
    server.run()


def wait_ready(url: str, server_error: list[str], timeout: float = 30.0) -> None:
    deadline = time.time() + timeout
    last = ""
    while time.time() < deadline:
        if server_error:
            raise RuntimeError(server_error[0])
        try:
            with httpx.Client(trust_env=False, timeout=1.5) as client:
                r = client.get(url)
                if r.status_code < 500:
                    return
                last = f"HTTP {r.status_code}"
        except Exception as exc:
            last = str(exc)
        time.sleep(0.2)
    raise RuntimeError(f"server not ready: {last}")


def run_desktop() -> None:
    import threading
    import traceback
    import webbrowser

    write_log(f"start frozen={getattr(sys, 'frozen', False)} meipass={getattr(sys, '_MEIPASS', '')}")
    write_log(f"static={STATIC} exists={STATIC.exists()}")

    port = _free_port()
    url = f"http://127.0.0.1:{port}"
    write_log(f"bind {url}")
    server_error: list[str] = []

    def _serve() -> None:
        try:
            run_server("127.0.0.1", port, reload=False)
        except Exception:
            server_error.append(traceback.format_exc())
            write_log(server_error[-1])

    thread = threading.Thread(target=_serve, name="uvicorn", daemon=True)
    thread.start()
    wait_ready(f"{url}/api/defaults", server_error)

    try:
        import webview

        window = webview.create_window(
            title=axiox_window_title(),
            url=url,
            width=1280,
            height=900,
            min_size=(960, 680),
            background_color="#0b0d12",
        )

        def paint_chrome(_=None) -> None:
            if os.name != "nt":
                return
            try:
                import ctypes

                hwnd = int(window.native.Handle.ToInt32())
                apply_hwnd_icon(hwnd)
                value = ctypes.c_int(1)
                for attr in (20, 19):
                    ctypes.windll.dwmapi.DwmSetWindowAttribute(
                        hwnd, attr, ctypes.byref(value), ctypes.sizeof(value)
                    )
            except Exception as exc:
                write_log(f"dark titlebar skipped: {exc}")

        try:
            window.events.shown += paint_chrome
        except Exception:
            pass
        webview.start()
        return
    except Exception:
        write_log(traceback.format_exc())
        webbrowser.open(url)
        while thread.is_alive():
            thread.join(timeout=0.5)


if __name__ == "__main__":
    import multiprocessing
    import traceback

    multiprocessing.freeze_support()
    ensure_stdio()
    try:
        desktop = "--web" not in sys.argv and os.environ.get("SEEDANCE_DESK_WEB") != "1"
        if desktop:
            run_desktop()
        else:
            run_server("127.0.0.1", _free_port(8787), reload=not getattr(sys, "frozen", False))
    except Exception:
        show_error("启动失败：\n\n" + traceback.format_exc() + f"\n\n日志文件：{LOG_FILE}")
        raise
