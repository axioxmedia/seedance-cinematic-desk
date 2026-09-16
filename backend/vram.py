"""显存检测与模型推荐"""

from __future__ import annotations
from dataclasses import dataclass
from typing import Optional
import platform


@dataclass
class VRAMInfo:
    available: bool
    total_gb: float
    name: str
    suitable_7b: bool
    suitable_14b: bool
    suitable_32b: bool
    message: str


def get_vram_info() -> VRAMInfo:
    """检测本机 GPU 显存"""
    try:
        import torch
        if not torch.cuda.is_available():
            return VRAMInfo(
                available=False,
                total_gb=0.0,
                name="No CUDA GPU",
                suitable_7b=False,
                suitable_14b=False,
                suitable_32b=False,
                message="未检测到可用的 CUDA GPU，本地模型将使用 CPU（速度很慢）",
            )
        props = torch.cuda.get_device_properties(0)
        total_gb = props.total_memory / (1024 ** 3)
        name = props.name
    except Exception:
        # fallback: try pynvml / 简单返回未知
        try:
            import subprocess
            out = subprocess.check_output(
                ["nvidia-smi", "--query-gpu=name,memory.total", "--format=csv,noheader,nounits"],
                text=True, timeout=5
            ).strip().split("\n")[0]
            name, mem = [x.strip() for x in out.split(",")]
            total_gb = float(mem) / 1024  # MiB → GiB roughly
        except Exception:
            return VRAMInfo(
                available=False,
                total_gb=0.0,
                name="Unknown",
                suitable_7b=False,
                suitable_14b=False,
                suitable_32b=False,
                message="无法检测显存，请手动选择模型并注意显存占用",
            )

    # 推荐阈值（针对 GGUF Q4/Q5 量化）
    # 7B  Q4 ≈ 5–6 GB
    # 14B Q4 ≈ 9–11 GB
    # 32B Q4 ≈ 18–22 GB
    suitable_7b = total_gb >= 6
    suitable_14b = total_gb >= 12
    suitable_32b = total_gb >= 22

    msg_parts = [f"检测到 GPU: {name}，显存约 {total_gb:.1f} GB。"]
    if suitable_32b:
        msg_parts.append("推荐可运行 7B / 14B / 32B。")
    elif suitable_14b:
        msg_parts.append("推荐可运行 7B / 14B，32B 可能 OOM。")
    elif suitable_7b:
        msg_parts.append("推荐仅运行 7B，更大模型可能 OOM。")
    else:
        msg_parts.append("显存较低，本地模型可能无法流畅运行。")

    return VRAMInfo(
        available=True,
        total_gb=round(total_gb, 1),
        name=name,
        suitable_7b=suitable_7b,
        suitable_14b=suitable_14b,
        suitable_32b=suitable_32b,
        message=" ".join(msg_parts),
    )


# 模型目录（GGUF 量化，适合 llama-cpp）
MODEL_CATALOG = [
    {
        "id": "7b",
        "name": "DeepSeek-R1-Distill-Qwen-7B",
        "size_label": "约 4.5–6 GB (Q4_K_M)",
        "repo": "bartowski/DeepSeek-R1-Distill-Qwen-7B-GGUF",
        "filename_hint": "Q4_K_M",
        "min_vram_gb": 6,
        "recommended_vram": "8–12 GB",
        "desc": "轻量，适合 8–12GB 显卡，速度较快，质量对短提示词足够。",
    },
    {
        "id": "14b",
        "name": "DeepSeek-R1-Distill-Qwen-14B",
        "size_label": "约 8–10 GB (Q4_K_M)",
        "repo": "bartowski/DeepSeek-R1-Distill-Qwen-14B-GGUF",
        "filename_hint": "Q4_K_M",
        "min_vram_gb": 12,
        "recommended_vram": "16–24 GB",
        "desc": "平衡选择，质量明显优于 7B，推荐大多数用户。",
    },
    {
        "id": "32b",
        "name": "DeepSeek-R1-Distill-Qwen-32B",
        "size_label": "约 18–22 GB (Q4_K_M)",
        "repo": "bartowski/DeepSeek-R1-Distill-Qwen-32B-GGUF",
        "filename_hint": "Q4_K_M",
        "min_vram_gb": 22,
        "recommended_vram": "RTX 4090 / 5090 (24GB+)",
        "desc": "最强蒸馏版，接近原版 R1 表现，需要高显存。",
    },
]


ENGINE_INFO = {
    "llama_cpp": {
        "name": "llama-cpp-python (GGUF)",
        "pros": [
            "显存占用低（量化后 7B 仅需 ~5–6GB）",
            "启动快，推理速度在消费级显卡上表现好",
            "安装相对简单，跨平台支持好",
            "适合本工具的「生成超长提示词」场景",
        ],
        "cons": [
            "需要 GGUF 量化文件（非原版 safetensors）",
            "极端复杂推理能力略低于全精度原版",
            "部分高级采样特性支持不如 transformers",
        ],
        "recommend": "大多数用户首选，尤其是 8–24GB 显卡",
    },
    "transformers": {
        "name": "transformers + bitsandbytes",
        "pros": [
            "可直接使用官方 safetensors / 原版权重",
            "量化灵活（4bit/8bit），社区生态完整",
            "对研究和精细控制更友好",
        ],
        "cons": [
            "同样量化下显存通常比 llama-cpp 略高",
            "首次加载和依赖体积更大",
            "在 Windows 上 CUDA / bitsandbytes 配置更容易出问题",
        ],
        "recommend": "有经验的用户、或需要原版权重时使用",
    },
}
