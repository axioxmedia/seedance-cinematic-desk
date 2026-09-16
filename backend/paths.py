"""Runtime data roots. Bundled static lives in _MEIPASS; models/output live next to the EXE."""

from __future__ import annotations

import sys
from pathlib import Path


def bundle_root() -> Path:
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS)
    return Path(__file__).resolve().parent.parent


def data_root() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent.parent


def models_dir() -> Path:
    p = data_root() / "models"
    p.mkdir(parents=True, exist_ok=True)
    return p


def output_dir() -> Path:
    p = data_root() / "output"
    p.mkdir(parents=True, exist_ok=True)
    return p
