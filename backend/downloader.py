"""Model download via huggingface_hub into models/<id>/."""

from __future__ import annotations

import shutil
from pathlib import Path
from typing import Callable, Optional

from .paths import models_dir
from .vram import MODEL_CATALOG


def get_model_path(model_id: str) -> Path:
    return models_dir() / model_id


def is_model_downloaded(model_id: str) -> bool:
    p = get_model_path(model_id)
    if not p.exists():
        return False
    return any(p.glob("*.gguf"))


def list_local_models() -> list[dict]:
    result = []
    for m in MODEL_CATALOG:
        path = get_model_path(m["id"])
        downloaded = is_model_downloaded(m["id"])
        gguf_files = list(path.glob("*.gguf")) if path.exists() else []
        result.append({
            **m,
            "downloaded": downloaded,
            "path": str(path) if downloaded else None,
            "gguf_count": len(gguf_files),
        })
    return result


def download_model(
    model_id: str,
    progress_callback: Optional[Callable[[str], None]] = None,
) -> dict:
    catalog = {m["id"]: m for m in MODEL_CATALOG}
    if model_id not in catalog:
        raise ValueError(f"unknown model id: {model_id}")

    info = catalog[model_id]
    target = get_model_path(model_id)
    target.mkdir(parents=True, exist_ok=True)

    def log(msg: str):
        if progress_callback:
            progress_callback(msg)
        print(msg)

    log(f"download {info['name']} -> {target}")
    log(f"repo: {info['repo']}")

    from huggingface_hub import snapshot_download

    snapshot_download(
        repo_id=info["repo"],
        local_dir=str(target),
        local_dir_use_symlinks=False,
        allow_patterns=[
            "*Q4_K_M*.gguf",
            "*q4_k_m*.gguf",
            "README*",
            "*.md",
            "*.json",
            "*.txt",
        ],
        ignore_patterns=[
            "*f32*", "*f16*", "*bf16*",
            "*Q8*", "*Q6*", "*Q5*", "*Q3*", "*Q2*",
            "*Q4_0*", "*Q4_1*", "*Q4_K_S*", "*Q4_K_L*",
            "*IQ*", "*imatrix*",
        ],
    )
    log(f"download done: {info['name']}")
    return {"ok": True, "path": str(target), "model_id": model_id}


def delete_model(model_id: str) -> dict:
    catalog = {m["id"]: m for m in MODEL_CATALOG}
    if model_id not in catalog:
        raise ValueError(f"unknown model id: {model_id}")
    target = get_model_path(model_id)
    if not target.exists():
        return {"ok": True, "deleted": False, "message": "missing"}
    shutil.rmtree(target, ignore_errors=True)
    if target.exists():
        for f in target.rglob("*"):
            try:
                if f.is_file():
                    f.unlink()
            except Exception:
                pass
        try:
            target.rmdir()
        except Exception:
            pass
    return {"ok": True, "deleted": True, "model_id": model_id, "path": str(target)}
