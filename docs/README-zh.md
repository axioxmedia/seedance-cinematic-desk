<div align="center">

# Seedance 电影提示词工作台

**Packed via Axiox Media**

本地步骤向导：把剧情写成可粘贴进 Seedance 2.0 的超详细电影提示词，通道为 Grok / DeepSeek / 离线 GGUF。

<p>
  <a href="../README.md"><img src="https://img.shields.io/badge/English-README-e7c07a?style=for-the-badge" alt="English README" /></a>
</p>

</div>

<div align="center">
  <img src="APPCap.png" alt="Seedance Cinematic Desk 预览" width="100%" />
</div>

## 安装

优先用 [GitHub Deploy Desk](https://github.com/axioxmedia/github-deployer) 粘贴仓库地址、阅读 README 后再部署。

源码启动：

```bat
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
.venv\Scripts\python.exe app.py
```

或双击 `start.bat`。

### 打包 EXE

1. 安装 Python 3.11 / 3.12，勾选加入 PATH。
2. 双击 `build_exe.bat`。
3. 得到 `dist\SeedanceCinematicDesk.exe`。

本地推理依赖 `llama-cpp-python`，仅在选择本地引擎时再装。

## 功能

- 六个独立步骤框，点下一步会隐藏上一框
- Grok / DeepSeek / 本地模型
- Skill ZIP（需含 SKILL.md）
- 风格卡片 → Part 规划 → 单 Part 生成 → `output/` 存档
- 显存检测与 7B / 14B / 32B 目录
- 右下角 Runtime Log，中英界面记忆 `aio.uiLang`

## 预览图

把程序截图放到本目录，文件名必须是 `APPCap.png`。
