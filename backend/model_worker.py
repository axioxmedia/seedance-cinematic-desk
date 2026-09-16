# -*- coding: utf-8 -*-
"""Minimal local LLM HTTP worker. Run as: python model_worker.py --model PATH --port 8766"""
from __future__ import annotations
import argparse
import sys

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--host", default="127.0.0.1")
    ap.add_argument("--port", type=int, default=8766)
    ap.add_argument("--n_gpu_layers", type=int, default=-1)
    ap.add_argument("--n_ctx", type=int, default=4096)
    args = ap.parse_args()

    print(f"[worker] loading model: {args.model}", flush=True)
    print(f"[worker] n_gpu_layers={args.n_gpu_layers} n_ctx={args.n_ctx}", flush=True)

    from llama_cpp import Llama
    llm = Llama(
        model_path=args.model,
        n_ctx=args.n_ctx,
        n_gpu_layers=args.n_gpu_layers,
        verbose=True,
    )
    print("[worker] model loaded OK", flush=True)

    from fastapi import FastAPI
    from pydantic import BaseModel
    from typing import List, Optional
    import uvicorn

    app = FastAPI()

    class Msg(BaseModel):
        role: str
        content: str

    class ChatReq(BaseModel):
        messages: List[Msg]
        temperature: float = 0.7
        max_tokens: int = 4096

    @app.get("/v1/models")
    def models():
        return {"data": [{"id": args.model, "object": "model"}]}

    @app.get("/health")
    def health():
        return {"ok": True}

    @app.post("/v1/chat/completions")
    def chat(req: ChatReq):
        prompt_parts = []
        for m in req.messages:
            if m.role == "system":
                prompt_parts.append(f"System: {m.content}\n")
            elif m.role == "user":
                prompt_parts.append(f"User: {m.content}\n")
            elif m.role == "assistant":
                prompt_parts.append(f"Assistant: {m.content}\n")
        prompt_parts.append("Assistant: ")
        prompt = "\n".join(prompt_parts)
        out = llm(
            prompt,
            max_tokens=req.max_tokens,
            temperature=req.temperature,
            stop=["User:", "System:"],
            echo=False,
        )
        text = out["choices"][0]["text"].strip()
        return {
            "choices": [{"message": {"role": "assistant", "content": text}, "finish_reason": "stop"}],
            "usage": out.get("usage", {}),
        }

    @app.on_event("startup")
    def _on_start():
        print(f"[worker] HTTP ready http://{args.host}:{args.port}", flush=True)

    print(f"[worker] binding http://{args.host}:{args.port} ...", flush=True)
    uvicorn.run(app, host=args.host, port=args.port, log_level="info")

if __name__ == "__main__":
    main()
