/* Seedance Cinematic Desk — wizard UI */
const AXIOXMEDIA_BRAND = "Axiox Media";
const AIO_WATERMARK = "axioxmedia";

const I18N = {
  zh: {
    appTitle: "Seedance 电影提示词工作台",
    appSubtitle: "步骤式向导 · Grok / DeepSeek / 本地模型",
    cfgTitle: "模型与 API",
    cfgLead: "先选定通道并验证。验证通过后进入下一步，本框会隐藏。",
    useGrok: "使用 Grok",
    debugMode: "UI 调试模式",
    xaiKey: "xAI API Key",
    dsKey: "DeepSeek Key",
    useLocal: "使用本地模型（离线）",
    vramWait: "正在检测显存…",
    engine: "推理引擎",
    localIdle: "本地模型：未加载",
    keyHint: "Key 只保存在本机 localStorage。模型文件保存在 models/。",
    verifyBtn: "验证并进入下一步",
    skillTitle: "加载 Skill",
    skillLead: "上传含 SKILL.md 的 ZIP。Grok / 本地 / 调试模式可不传，直接继续。",
    skillZip: "上传 Skill ZIP",
    skillNone: "未加载",
    skillLoaded: "已加载",
    skillAuto: "已自动加载",
    skillFail: "失败",
    skillParse: "解析中…",
    clearSkill: "清除已保存 Skill",
    nextPlot: "进入输入剧情",
    back: "返回上一步",
    plotTitle: "输入剧情",
    plotLead: "写完整场景、人物关系、情绪与动作节奏。越具体越好。",
    plotLabel: "剧情 / 场景描述 *",
    plotPh: "在这里输入完整剧情、场景、人物关系、想要表达的情绪或动作节奏……",
    langPref: "目标语言",
    langAuto: "自动",
    durPref: "时长偏好",
    durAuto: "自动判断",
    durMulti: "允许多 Part",
    charNote: "角色外貌补充",
    charPh: "女主黑长直、白衬衫…",
    analyzeBtn: "分析并生成风格选项",
    loadLast: "加载上一次项目",
    clearHist: "清除历史",
    noHist: "暂无项目记录",
    lastProj: "最近项目：",
    styleTitle: "选择风格",
    styleLead: "四个选项均来自 Skill 允许的参考风格库。选一张卡片再继续。",
    extraNote: "额外调参 / 补充要求",
    extraPh: "更强调微表情、必须包含特定道具、禁止某类元素…",
    backPlot: "返回修改剧情",
    planBtn: "规划 Part 结构",
    planTitle: "Part 规划",
    planCountA: "共",
    planCountB: "个 Part。逐个生成完整提示词。",
    backStyle: "返回调整风格",
    seeResults: "查看已生成结果",
    resultTitle: "生成结果",
    backPlan: "返回 Part 规划",
    dlAll: "下载全部 Part",
    collapse: "收起",
    expand: "展开",
    logWait: "等待后端连接…",
    working: "处理中…",
    step0: "通道",
    step1: "Skill",
    step2: "剧情",
    step3: "风格",
    step4: "规划",
    step5: "结果",
    readyLocal: "本地模型已加载",
    needKey: "请先填写 API Key",
    needLocal: "请先加载本地模型",
    needPlot: "请先输入剧情描述",
    needStyle: "请先选择一个风格选项",
    needSkill: "请先上传并成功解析 Skill ZIP",
    genPart: "生成此 Part 提示词",
    regen: "重新生成",
    saveAs: "另存为",
    copy: "复制",
    copied: "已复制",
    generated: "已生成",
    noParts: "还没有生成任何 Part",
    fit: "适配",
    lowVram: "显存可能不足",
    rec: "推荐",
    recPlus: "强烈推荐",
    load: "加载",
    download: "下载",
    del: "删除",
    confirmForce: "当前显存可能不足，仍要强制下载吗？",
    confirmDel: "确定删除本地模型文件吗？此操作不可恢复。",
  },
  en: {
    appTitle: "Seedance Cinematic Desk",
    appSubtitle: "Step wizard · Grok / DeepSeek / local model",
    cfgTitle: "Model & API",
    cfgLead: "Pick a channel and verify. The next step hides this card.",
    useGrok: "Use Grok",
    debugMode: "UI debug mode",
    xaiKey: "xAI API Key",
    dsKey: "DeepSeek Key",
    useLocal: "Use local model (offline)",
    vramWait: "Detecting VRAM…",
    engine: "Inference engine",
    localIdle: "Local model: not loaded",
    keyHint: "Keys stay in localStorage. Model files live in models/.",
    verifyBtn: "Verify and continue",
    skillTitle: "Load Skill",
    skillLead: "Upload a ZIP that contains SKILL.md. Grok / local / debug can skip.",
    skillZip: "Skill ZIP",
    skillNone: "Not loaded",
    skillLoaded: "Loaded",
    skillAuto: "Restored",
    skillFail: "Failed",
    skillParse: "Parsing…",
    clearSkill: "Clear saved Skill",
    nextPlot: "Continue to plot",
    back: "Back",
    plotTitle: "Plot",
    plotLead: "Write the full scene, relationships, emotion and action rhythm.",
    plotLabel: "Plot / scene *",
    plotPh: "Full plot, characters, emotion, action rhythm…",
    langPref: "Output language",
    langAuto: "Auto",
    durPref: "Duration",
    durAuto: "Auto",
    durMulti: "Allow multiple parts",
    charNote: "Character look (optional)",
    charPh: "heroine, long black hair, white shirt…",
    analyzeBtn: "Analyze and build style cards",
    loadLast: "Load last project",
    clearHist: "Clear history",
    noHist: "No saved project",
    lastProj: "Last project: ",
    styleTitle: "Pick a style",
    styleLead: "Four options stay inside the Skill style library. Select one card.",
    extraNote: "Extra notes",
    extraPh: "More micro-expressions, required props, banned elements…",
    backPlot: "Edit plot",
    planBtn: "Plan parts",
    planTitle: "Part plan",
    planCountA: "",
    planCountB: " part(s). Generate each prompt separately.",
    backStyle: "Adjust style",
    seeResults: "Open generated results",
    resultTitle: "Results",
    backPlan: "Back to plan",
    dlAll: "Download all parts",
    collapse: "Hide",
    expand: "Show",
    logWait: "Waiting for backend…",
    working: "Working…",
    step0: "Channel",
    step1: "Skill",
    step2: "Plot",
    step3: "Style",
    step4: "Plan",
    step5: "Result",
    readyLocal: "Local model loaded",
    needKey: "Enter an API key first",
    needLocal: "Load a local model first",
    needPlot: "Enter a plot first",
    needStyle: "Pick a style first",
    needSkill: "Upload and parse a Skill ZIP first",
    genPart: "Generate this part",
    regen: "Regenerate",
    saveAs: "Save as",
    copy: "Copy",
    copied: "Copied",
    generated: "Ready",
    noParts: "No part generated yet",
    fit: "Fits",
    lowVram: "VRAM may be low",
    rec: "Recommended",
    recPlus: "Strongly recommended",
    load: "Load",
    download: "Download",
    del: "Delete",
    confirmForce: "VRAM may be too low. Force download?",
    confirmDel: "Delete local model files? This cannot be undone.",
  },
};

const SYSTEM_PROMPT = `你是 Seedance 2.0 超详细电影级提示词专家。必须严格遵守参考案例库规则。
本工具是分阶段表单，不是对话。
- 分析风格：只返回 JSON，不要最终提示词。
- 生成最终提示词：按已选风格输出完整 ultra-detailed 提示词 JSON。
允许风格：Ultra-photorealistic / Live-action cinematic；Hollywood prestige / IMAX disaster / documentary；Anime live-action adaptation；Dark fantasy / VFX-heavy；Sci-fi epic trailer (Dune-style)；Post-apocalyptic；Western fantasy action；Emotional micro-expression close-up；Pure love / Japanese drama restrained；Action comedy with precise timing；以及上述合理组合。
禁止发明库外风格。
风格选项正好 4 个：A/B 忠实，C/D 更大胆但仍在库内。
最终提示词必须含：Global Specs、Character Consistency、Premise/Tone、Action Principles、Camera Rules、Time-coded Timeline、Dialogue Rules、Sound Design、Strict Prohibitions、Quality Constraints。
长剧情自动拆 Part，不删内容，每 Part 同等细节密度。
只返回纯 JSON，不要 markdown。`;

const SEEDANCE_FIXED_FRAMEWORK = `# Seedance 2.0 固定提示词骨架
写的是视频生成提示词，不是小说或第一人称独白。
禁止：我/我感到/我意识到；空词堆砌。
必须含 10 层：Global Specs；Character Consistency；Premise/Tone；Action Principles；Camera Rules；秒级 Timeline；Dialogue；Sound；Prohibitions；Quality。
只返回 JSON：{"part":N,"duration_seconds":T,"style_focus":"...","prompt":"..."}`;

let uiLang = "zh";
let selectedStyleId = null;
let selectedStyleData = null;
let lastAnalysis = null;
let currentPlot = "";
let isDebugMode = false;
let useGrok = true;
let useLocal = false;
let customSystemPrompt = null;
let skillLoaded = false;
let loadingStepTimer = null;
let logCollapsed = false;
let currentStep = 0;
let currentProject = { id: null, timestamp: null, plot: "", style: null, extra: "", parts: [] };

function t(key) {
  return (I18N[uiLang] && I18N[uiLang][key]) || I18N.zh[key] || key;
}

function detectUiLang() {
  const saved = localStorage.getItem("aio.uiLang");
  if (saved === "zh" || saved === "en") return saved;
  const nav = (navigator.language || "zh").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.setAttribute("placeholder", t(key));
  });
  document.querySelectorAll("#uiLangSwitch [data-ui-lang]").forEach((btn) => {
    btn.classList.toggle("on", btn.getAttribute("data-ui-lang") === uiLang);
  });
  document.documentElement.lang = uiLang === "zh" ? "zh-CN" : "en";
  renderStepNav();
  updateProviderChip();
  updateHistoryStatus();
  updateGoResultsButton();
  if (currentProject.parts && currentProject.parts.length) {
    if (currentStep === 4) renderPlanCards();
    if (currentStep === 5) renderResultParts();
  }
}

function setUiLang(lang) {
  uiLang = lang === "en" ? "en" : "zh";
  localStorage.setItem("aio.uiLang", uiLang);
  applyI18n();
}

function renderStepNav() {
  const labels = [t("step0"), t("step1"), t("step2"), t("step3"), t("step4"), t("step5")];
  const nav = document.getElementById("stepNav");
  nav.innerHTML = labels.map((label, i) => {
    const cls = i === currentStep ? "on" : i < currentStep ? "done" : "";
    const gap = i < labels.length - 1 ? '<div class="step-gap"></div>' : "";
    return `<div class="step-pill ${cls}"><span class="num">${i + 1}</span>${label}</div>${gap}`;
  }).join("");
}

function hideAllStages() {
  for (let i = 0; i <= 5; i++) {
    const el = document.getElementById("stage" + i);
    if (el) el.classList.remove("on");
  }
}

function goStep(n) {
  currentStep = n;
  hideAllStages();
  const el = document.getElementById("stage" + n);
  if (el) el.classList.add("on");
  renderStepNav();
}

function updateProviderChip() {
  const chip = document.getElementById("providerChip");
  if (!chip) return;
  if (isDebugMode) chip.textContent = "DEBUG";
  else if (useGrok) chip.textContent = "Grok";
  else if (useLocal) chip.textContent = "LOCAL";
  else chip.textContent = "DeepSeek";
}

function toggleClassOn(el, on) {
  if (!el) return;
  el.classList.toggle("on", !!on);
}

function toggleProvider() {
  useGrok = !useGrok;
  localStorage.setItem("seedance_use_grok", useGrok ? "1" : "0");
  toggleClassOn(document.getElementById("useGrokToggle"), useGrok);
  document.getElementById("grokKeyArea").hidden = !useGrok;
  document.getElementById("deepseekArea").hidden = useGrok;
  if (!useGrok) {
    applyLocalModeUI();
    if (useLocal) refreshLocalModels();
  }
  updateProviderChip();
}

function toggleDebugMode() {
  isDebugMode = !isDebugMode;
  localStorage.setItem("seedance_debug_mode", isDebugMode ? "1" : "0");
  toggleClassOn(document.getElementById("debugToggle"), isDebugMode);
  updateProviderChip();
}

function applyLocalModeUI() {
  toggleClassOn(document.getElementById("useLocalToggle"), useLocal);
  const panel = document.getElementById("localModelPanel");
  const cloud = document.getElementById("cloudKeyRow");
  if (panel) panel.hidden = !useLocal;
  if (cloud) cloud.hidden = !!useLocal;
}

function toggleLocalModel() {
  useLocal = !useLocal;
  localStorage.setItem("seedance_use_local", useLocal ? "1" : "0");
  applyLocalModeUI();
  if (useLocal) refreshLocalModels();
  updateProviderChip();
}

async function verifyAndUnlock() {
  const hint = document.getElementById("verifyHint");
  hint.textContent = "…";
  try {
    if (isDebugMode) {
      hint.textContent = "DEBUG";
      goStep(1);
      restoreSkillFromStorage();
      return;
    }
    if (useGrok) {
      const key = document.getElementById("apiKey").value.trim();
      if (!key) { alert(t("needKey")); hint.textContent = ""; return; }
      localStorage.setItem("seedance_xai_key", key);
      const r = await fetch("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "grok-4.6",
          messages: [{ role: "user", content: "Reply with exactly: OK" }],
          max_tokens: 5, temperature: 0, provider: "grok", api_key: key,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      hint.textContent = "Grok OK";
      goStep(1);
      restoreSkillFromStorage();
    } else if (useLocal) {
      const st = await fetch("/api/models/status").then((r) => r.json());
      if (!st.loaded) { alert(t("needLocal")); hint.textContent = t("needLocal"); return; }
      hint.textContent = t("readyLocal") + " " + (st.model_id || "");
      goStep(1);
      restoreSkillFromStorage();
    } else {
      const key = document.getElementById("deepseekKey").value.trim();
      if (!key) { alert(t("needKey")); hint.textContent = ""; return; }
      localStorage.setItem("seedance_deepseek_key", key);
      const r = await fetch("/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-v4-pro",
          messages: [{ role: "user", content: "Reply with exactly: OK" }],
          max_tokens: 5, temperature: 0, provider: "deepseek", api_key: key,
        }),
      });
      if (!r.ok) throw new Error(await r.text());
      hint.textContent = "DeepSeek OK";
      goStep(1);
      restoreSkillFromStorage();
    }
  } catch (e) {
    hint.textContent = String(e.message || e);
    alert(hint.textContent);
  }
}

function continueAfterSkill() {
  if (!skillLoaded && !useLocal && !useGrok && !isDebugMode) {
    alert(t("needSkill"));
    return;
  }
  goStep(2);
}

function clearStoredSkill() {
  localStorage.removeItem("seedance_skill_md");
  localStorage.removeItem("seedance_skill_name");
  localStorage.removeItem("seedance_skill_time");
  customSystemPrompt = null;
  skillLoaded = false;
  const st = document.getElementById("skillStatus");
  if (st) st.textContent = t("skillNone");
  const meta = document.getElementById("skillMeta");
  if (meta) meta.textContent = "";
  const inp = document.getElementById("skillZip");
  if (inp) inp.value = "";
}

function restoreSkillFromStorage() {
  const md = localStorage.getItem("seedance_skill_md");
  const name = localStorage.getItem("seedance_skill_name") || "Skill";
  const time = localStorage.getItem("seedance_skill_time");
  if (md && md.trim()) {
    customSystemPrompt = md;
    skillLoaded = true;
    const st = document.getElementById("skillStatus");
    if (st) st.textContent = t("skillAuto");
    const meta = document.getElementById("skillMeta");
    if (meta) meta.textContent = name + (time ? " · " + time : "") + " · " + md.length;
  }
}

async function handleSkillZip(event) {
  const file = event.target.files[0];
  const statusEl = document.getElementById("skillStatus");
  const metaEl = document.getElementById("skillMeta");
  if (!file) return;
  customSystemPrompt = null;
  skillLoaded = false;
  if (statusEl) statusEl.textContent = t("skillParse");
  try {
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/skill/parse", { method: "POST", body: fd });
    const data = await r.json();
    if (!r.ok) throw new Error(data.detail || JSON.stringify(data));
    customSystemPrompt = data.skill_md;
    skillLoaded = true;
    const ts = new Date().toLocaleString();
    try {
      localStorage.setItem("seedance_skill_md", customSystemPrompt);
      localStorage.setItem("seedance_skill_name", file.name);
      localStorage.setItem("seedance_skill_time", ts);
    } catch (_) {
      try {
        localStorage.setItem("seedance_skill_md", customSystemPrompt.slice(0, 8000));
      } catch (__) {}
    }
    if (statusEl) statusEl.textContent = t("skillLoaded");
    if (metaEl) metaEl.textContent = file.name + " · " + ts + " · " + data.chars;
  } catch (e) {
    skillLoaded = false;
    if (statusEl) statusEl.textContent = t("skillFail");
    alert(e.message);
  }
}

function getKey() {
  if (isDebugMode) return "debug-mode";
  if (useGrok) {
    const key = document.getElementById("apiKey").value.trim();
    if (!key) { alert(t("needKey")); return null; }
    return key;
  }
  if (useLocal) return "local-mode";
  const key = document.getElementById("deepseekKey").value.trim();
  if (!key) { alert(t("needKey")); return null; }
  if (!skillLoaded || !customSystemPrompt) { alert(t("needSkill")); return null; }
  return key;
}

function showLoading(text) {
  const el = document.getElementById("loading");
  document.getElementById("loadingText").textContent = text || t("working");
  document.getElementById("loadingLog").innerHTML = "";
  el.classList.add("on");
}

function hideLoading() {
  document.getElementById("loading").classList.remove("on");
  if (loadingStepTimer) { clearInterval(loadingStepTimer); loadingStepTimer = null; }
}

function addLoadingStep(text, kind) {
  const log = document.getElementById("loadingLog");
  const prev = log.querySelector('[data-pending="1"]');
  if (prev && kind !== "error") {
    prev.dataset.pending = "0";
    prev.className = "ok-text";
    prev.textContent = "✓ " + (prev.getAttribute("data-label") || "");
  }
  const row = document.createElement("div");
  if (kind === "error") { row.className = "err-text"; row.textContent = "✗ " + text; }
  else if (kind === "ok") { row.className = "ok-text"; row.textContent = "✓ " + text; }
  else { row.className = "warn-text"; row.textContent = "… " + text; row.dataset.pending = "1"; row.setAttribute("data-label", text); }
  log.appendChild(row);
}

function startProgressiveSteps(steps, intervalMs) {
  if (loadingStepTimer) { clearInterval(loadingStepTimer); loadingStepTimer = null; }
  let i = 0;
  const tick = () => { if (i < steps.length) addLoadingStep(steps[i++]); };
  tick();
  loadingStepTimer = setInterval(() => {
    if (i >= steps.length) { clearInterval(loadingStepTimer); loadingStepTimer = null; return; }
    tick();
  }, intervalMs || 1200);
}

function finishLoadingSteps() {
  if (loadingStepTimer) { clearInterval(loadingStepTimer); loadingStepTimer = null; }
  document.querySelectorAll('#loadingLog [data-pending="1"]').forEach((row) => {
    row.dataset.pending = "0";
    row.className = "ok-text";
    row.textContent = "✓ " + (row.getAttribute("data-label") || "");
  });
  addLoadingStep(uiLang === "zh" ? "全部完成" : "Done", "ok");
}

function randomLorem(n) {
  const bits = [
    "Wide establishing, low angle, slow dolly-in, volumetric gold light.",
    "Medium tracking shot, fabric and dust detail, continuous motion.",
    "Push-in to micro-expression, shallow depth, restrained atmosphere.",
    "No dialogue. Practical sound only. Strict continuity.",
  ];
  return Array.from({ length: n }, (_, i) => bits[i % bits.length]).join("\n");
}

function generateFakeStyleOptions() {
  return {
    analysis_brief: "debug",
    style_options: [
      { id: "A", title: "Ultra-photorealistic live-action", description: "Faithful cinematic realism.", reference_hint: "case photoreal" },
      { id: "B", title: "Emotional micro-expression close-up", description: "Faces, breath, gaze tension.", reference_hint: "case-08" },
      { id: "C", title: "Sci-fi epic trailer + photoreal", description: "Dune-scale motion, still photoreal.", reference_hint: "case-06" },
      { id: "D", title: "Dark fantasy VFX-heavy", description: "Energy hierarchy and volume light.", reference_hint: "case-03" },
    ],
  };
}

function generateFakeParts() {
  return {
    parts: [
      { part: 1, duration_seconds: 20, style_focus: "establishing", brief: "Debug part 1" },
      { part: 2, duration_seconds: 18, style_focus: "climax", brief: "Debug part 2" },
    ],
  };
}

async function runAnalyze() {
  const key = getKey();
  if (!key) return;
  const plot = document.getElementById("plotInput").value.trim();
  if (!plot && !isDebugMode) { alert(t("needPlot")); return; }
  currentPlot = plot || "[debug plot]";
  const lang = document.getElementById("langPref").value;
  const duration = document.getElementById("durationPref").value;
  const charNote = document.getElementById("charNote").value.trim();
  const userMsg = `请分析以下剧情，并生成风格选项（只返回 JSON）。\n\n【剧情】\n${plot}\n\n【附加信息】\n- 目标语言偏好：${lang}\n- 时长偏好：${duration}\n- 角色外貌补充：${charNote || "无"}\n\n请严格按 system 规定的 JSON 格式返回 4 个风格选项。`;
  showLoading(isDebugMode ? "DEBUG" : t("analyzeBtn"));
  document.getElementById("btnAnalyze").disabled = true;
  startProgressiveSteps(isDebugMode ? ["plot", "cards"] : ["plot", "system", useGrok ? "Grok" : useLocal ? "local" : "DeepSeek", "json"], isDebugMode ? 400 : 1400);
  try {
    const data = isDebugMode ? (await sleep(800), generateFakeStyleOptions()) : await callAPI(key, userMsg);
    finishLoadingSteps();
    lastAnalysis = data;
    const container = document.getElementById("styleOptions");
    container.innerHTML = "";
    selectedStyleId = null;
    selectedStyleData = null;
    if (!data || !Array.isArray(data.style_options) || !data.style_options.length) {
      throw new Error("no style_options");
    }
    const map = new Map();
    for (const opt of data.style_options) {
      const id = String(opt.id || "").trim() || Math.random().toString(36).slice(2, 6);
      const prev = map.get(id);
      const score = ((opt.description || "") + (opt.title || "")).length;
      if (!prev || score > ((prev.description || "") + (prev.title || "")).length) map.set(id, { ...opt, id });
    }
    data.style_options = Array.from(map.values());
    data.style_options.forEach((opt) => {
      const card = document.createElement("div");
      card.className = "style-card";
      card.innerHTML = `<div style="display:flex;gap:10px;align-items:flex-start">
        <div class="style-id">${escapeHtml(opt.id)}</div>
        <div><h3>${escapeHtml(opt.title || "")}</h3><p>${escapeHtml(opt.description || "")}</p><div class="ref">${escapeHtml(opt.reference_hint || "")}</div></div>
      </div>`;
      card.onclick = () => selectStyle(opt, card);
      container.appendChild(card);
    });
    goStep(3);
  } catch (err) {
    addLoadingStep(String(err.message), "error");
    alert(err.message);
  } finally {
    setTimeout(hideLoading, 350);
    document.getElementById("btnAnalyze").disabled = false;
  }
}

function selectStyle(opt, cardEl) {
  selectedStyleId = opt.id;
  selectedStyleData = opt;
  document.querySelectorAll(".style-card").forEach((c) => c.classList.remove("selected"));
  cardEl.classList.add("selected");
}

function backToPlot() { goStep(2); }
function backToStyle() { goStep(3); }
function backToPlan() { goStep(4); updateGoResultsButton(); }

async function runGenerate() {
  const key = getKey();
  if (!key) return;
  if (!selectedStyleId) { alert(t("needStyle")); return; }
  const extra = document.getElementById("extraNote").value.trim();
  const lang = document.getElementById("langPref").value;
  const duration = document.getElementById("durationPref").value;
  const charNote = document.getElementById("charNote").value.trim();
  const baseContext = `【原始剧情】\n${currentPlot}\n\n【已选风格】\nID: ${selectedStyleData.id}\n标题: ${selectedStyleData.title}\n描述: ${selectedStyleData.description}\n参考倾向: ${selectedStyleData.reference_hint || ""}\n\n【额外调参】\n${extra || "无"}\n\n【附加信息】\n- 语言：${lang}\n- 时长：${duration}\n- 外貌：${charNote || "无"}`;
  showLoading(t("planBtn"));
  document.getElementById("btnGenerate").disabled = true;
  try {
    let plan = [];
    if (isDebugMode) {
      addLoadingStep("debug plan");
      await sleep(600);
      plan = generateFakeParts().parts;
    } else {
      addLoadingStep("plan");
      const planMsg = `请根据以下信息，只规划需要拆分成几个 Part。\n\n${baseContext}\n\n规则：15–30 秒能写完就 1 个 Part；过多必须拆分且不删剧情。只返回 {"parts_plan":[...]}`;
      const planData = await callAPI(key, planMsg, true);
      plan = planData.parts_plan || planData.parts || [];
      if (!plan.length) throw new Error("empty parts_plan");
    }
    finishLoadingSteps();
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    currentProject = {
      id: ts, timestamp: ts, plot: currentPlot, style: selectedStyleData, extra, baseContext,
      parts: plan.map((p, i) => ({
        part: p.part || (i + 1),
        duration_seconds: p.duration_seconds || 20,
        style_focus: p.style_focus || selectedStyleData.title,
        brief: p.brief || "",
        prompt: null,
      })),
    };
    renderPlanCards();
    saveProjectToStorage();
    goStep(4);
    updateHistoryStatus();
  } catch (err) {
    addLoadingStep(String(err.message), "error");
    alert(err.message);
  } finally {
    setTimeout(hideLoading, 350);
    document.getElementById("btnGenerate").disabled = false;
  }
}

function renderPlanCards() {
  const container = document.getElementById("planParts");
  container.innerHTML = "";
  document.getElementById("planCount").textContent = currentProject.parts.length;
  currentProject.parts.forEach((p, idx) => {
    const hasPrompt = !!p.prompt;
    const card = document.createElement("div");
    card.className = "part-card";
    card.innerHTML = `<div class="part-head">
      <div>
        <strong>Part ${p.part}</strong>
        <span class="badge">${p.duration_seconds}s</span>
        <span class="badge">${escapeHtml(p.style_focus || "")}</span>
        ${hasPrompt ? `<span class="badge ok">${t("generated")}</span>` : ""}
        <p class="hint" style="margin-top:8px">${escapeHtml(p.brief || "")}</p>
      </div>
      <div class="actions" style="margin-top:0">
        ${hasPrompt
          ? `<button class="soft" type="button" onclick="downloadSinglePart(${idx})">${t("saveAs")}</button>
             <button class="ghost" type="button" onclick="generateSinglePart(${idx})">${t("regen")}</button>`
          : `<button class="primary" type="button" id="btnGenPart${idx}" onclick="generateSinglePart(${idx})" style="margin-top:0;width:auto">${t("genPart")}</button>`}
      </div>
    </div>
    ${hasPrompt ? `<pre class="prompt">${escapeHtml((p.prompt || "").slice(0, 400))}${(p.prompt || "").length > 400 ? "…" : ""}</pre>` : ""}`;
    container.appendChild(card);
  });
  updateGoResultsButton();
}

async function generateSinglePart(idx) {
  const key = getKey();
  if (!key) return;
  const p = currentProject.parts[idx];
  if (!p) return;
  const btn = document.getElementById(`btnGenPart${idx}`);
  if (btn) { btn.disabled = true; btn.textContent = "…"; }
  showLoading("Part " + p.part);
  addLoadingStep("Part " + p.part);
  try {
    let result;
    if (isDebugMode) {
      await sleep(700);
      result = { part: p.part, duration_seconds: p.duration_seconds, style_focus: p.style_focus, prompt: "[DEBUG Part " + p.part + "]\n\n" + randomLorem(6) };
    } else {
      const expandMsg = `按固定骨架为这个 Part 生成可粘贴进 Seedance 的提示词。\n\n${currentProject.baseContext}\n\n【本 Part】part=${p.part} duration=${p.duration_seconds}s focus=${p.style_focus} brief=${p.brief || ""}\n只返回 JSON。`;
      result = await callAPI(key, expandMsg, false, true);
    }
    currentProject.parts[idx].prompt = result.prompt || result.parts?.[0]?.prompt || "";
    currentProject.parts[idx].duration_seconds = result.duration_seconds || p.duration_seconds;
    currentProject.parts[idx].style_focus = result.style_focus || p.style_focus;
    try {
      await fetch("/api/save_part", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: currentProject.timestamp || currentProject.id,
          part: currentProject.parts[idx].part,
          duration_seconds: currentProject.parts[idx].duration_seconds,
          style_focus: currentProject.parts[idx].style_focus,
          prompt: currentProject.parts[idx].prompt,
        }),
      });
    } catch (_) {}
    finishLoadingSteps();
    saveProjectToStorage();
    renderPlanCards();
    updateHistoryStatus();
  } catch (err) {
    addLoadingStep(String(err.message), "error");
    alert(err.message);
    if (btn) { btn.disabled = false; btn.textContent = t("genPart"); }
  } finally {
    setTimeout(hideLoading, 350);
  }
}

function goToResultsIfReady() {
  if (!currentProject.parts.some((p) => p.prompt)) return;
  renderResultParts();
  goStep(5);
}

function updateGoResultsButton() {
  const btn = document.getElementById("btnGoResults");
  if (!btn) return;
  const hasAny = currentProject.parts && currentProject.parts.some((p) => p.prompt);
  btn.disabled = !hasAny;
  btn.textContent = t("seeResults");
}

function renderResultParts() {
  const container = document.getElementById("resultParts");
  container.innerHTML = "";
  currentProject.parts.filter((p) => p.prompt).forEach((p) => {
    const card = document.createElement("div");
    card.className = "part-card";
    card.innerHTML = `<div class="part-head">
      <div><strong>Part ${p.part}</strong> <span class="badge">${p.duration_seconds}s</span> <span class="badge">${escapeHtml(p.style_focus || "")}</span></div>
      <div class="actions" style="margin-top:0">
        <button class="soft" type="button" onclick="copyPrompt(this)">${t("copy")}</button>
        <button class="ghost" type="button" onclick="downloadSinglePartByPart(${p.part})">${t("saveAs")}</button>
      </div>
    </div>
    <pre class="prompt">${escapeHtml(p.prompt)}</pre>
    <p class="hint">${p.prompt.length}</p>`;
    container.appendChild(card);
  });
}

function downloadSinglePart(idx) {
  const p = currentProject.parts[idx];
  if (!p || !p.prompt) return;
  const blob = new Blob([p.prompt], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Part${p.part}_${currentProject.timestamp || "prompt"}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function downloadSinglePartByPart(partNum) {
  const idx = currentProject.parts.findIndex((p) => p.part === partNum);
  if (idx >= 0) downloadSinglePart(idx);
}

function downloadAllParts() {
  const generated = currentProject.parts.filter((p) => p.prompt);
  if (!generated.length) { alert(t("noParts")); return; }
  generated.forEach((p, i) => setTimeout(() => {
    const blob = new Blob([p.prompt], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Part${p.part}_${currentProject.timestamp || "prompt"}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, i * 250));
}

function saveProjectToStorage() {
  try {
    const key = "seedance_project_" + (currentProject.timestamp || Date.now());
    localStorage.setItem(key, JSON.stringify(currentProject));
    localStorage.setItem("seedance_last_project_key", key);
    const keys = Object.keys(localStorage).filter((k) => k.startsWith("seedance_project_")).sort();
    while (keys.length > 10) localStorage.removeItem(keys.shift());
  } catch (_) {}
}

function loadLastProject() {
  const lastKey = localStorage.getItem("seedance_last_project_key");
  if (!lastKey) { alert(t("noHist")); return; }
  try {
    const data = JSON.parse(localStorage.getItem(lastKey));
    if (!data || !data.parts) throw new Error("bad data");
    currentProject = data;
    currentPlot = data.plot || "";
    document.getElementById("plotInput").value = currentPlot;
    selectedStyleData = data.style;
    selectedStyleId = data.style?.id || null;
    renderPlanCards();
    goStep(4);
    updateHistoryStatus();
  } catch (e) {
    alert(e.message);
  }
}

function clearAllHistory() {
  if (!confirm(t("clearHist") + "?")) return;
  Object.keys(localStorage)
    .filter((k) => k.startsWith("seedance_project_") || k === "seedance_last_project_key")
    .forEach((k) => localStorage.removeItem(k));
  updateHistoryStatus();
}

function updateHistoryStatus() {
  const lastKey = localStorage.getItem("seedance_last_project_key");
  const btn = document.getElementById("btnLoadLast");
  const status = document.getElementById("historyStatus");
  if (!status) return;
  if (lastKey && localStorage.getItem(lastKey)) {
    if (btn) btn.disabled = false;
    status.textContent = t("lastProj") + lastKey.replace("seedance_project_", "");
  } else {
    if (btn) btn.disabled = true;
    status.textContent = t("noHist");
  }
}

function copyPrompt(btn) {
  const pre = btn.closest(".part-card").querySelector("pre");
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const original = btn.textContent;
    btn.textContent = t("copied");
    setTimeout(() => { btn.textContent = original; }, 1400);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function refreshLocalModels() {
  try {
    const r = await fetch("/api/models");
    const data = await r.json();
    document.getElementById("vramInfo").textContent = data.vram?.message || t("vramWait");
    window._engineInfo = data.engines || {};
    updateEngineInfo();
    const container = document.getElementById("modelCards");
    container.innerHTML = "";
    (data.models || []).forEach((m) => {
      const card = document.createElement("div");
      card.className = "model-card";
      const suit = m.suitable ? `<span class="ok-text">${t("fit")}</span>` : `<span class="warn-text">${t("lowVram")}</span>`;
      let rec = "";
      if (m.id === "14b") rec = `<span class="badge">${t("rec")}</span>`;
      if (m.id === "32b") rec = `<span class="badge">${t("recPlus")}</span>`;
      const action = m.downloaded
        ? `<button class="primary" type="button" style="margin-top:0;width:auto;height:34px" onclick="loadLocalModel('${m.id}')">${t("load")}</button>`
        : `<button class="soft" type="button" onclick="downloadLocalModel('${m.id}', ${m.suitable})">${t("download")}</button>`;
      const del = m.downloaded
        ? `<button class="danger" type="button" onclick="deleteLocalModel('${m.id}')">${t("del")}</button>`
        : "";
      card.innerHTML = `<div class="top"><div><strong>${escapeHtml(m.name)}</strong> ${rec}<div class="hint">${escapeHtml(m.size_label)} · ${escapeHtml(m.recommended_vram)}</div><div class="hint">${escapeHtml(m.desc || "")}</div></div><div>${suit}<div class="actions" style="margin-top:8px">${del}${action}</div></div></div>`;
      container.appendChild(card);
    });
    const st = data.local_status || {};
    document.getElementById("localStatus").textContent = st.loaded
      ? `${t("readyLocal")}: ${st.model_id} (${st.engine})`
      : t("localIdle");
  } catch (_) {
    document.getElementById("vramInfo").textContent = t("logWait");
  }
}

function updateEngineInfo() {
  const sel = document.getElementById("localEngine");
  if (!sel) return;
  localStorage.setItem("seedance_last_local_engine", sel.value);
  const info = (window._engineInfo || {})[sel.value];
  const el = document.getElementById("engineProsCons");
  if (!info) { el.textContent = ""; return; }
  el.textContent = (info.recommend || "") + " · " + (info.pros || []).slice(0, 2).join(" / ");
}

async function downloadLocalModel(modelId, suitable) {
  if (!suitable && !confirm(t("confirmForce"))) return;
  try {
    const r = await fetch("/api/models/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model_id: modelId, force: !suitable }),
    });
    const data = await r.json();
    if (data.need_confirm && confirm(data.message)) {
      await fetch("/api/models/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: modelId, force: true }),
      });
    }
    setTimeout(refreshLocalModels, 2000);
  } catch (e) {
    alert(e.message);
  }
}

async function deleteLocalModel(modelId) {
  if (!confirm(t("confirmDel"))) return;
  try {
    const r = await fetch("/api/models/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model_id: modelId }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.detail || JSON.stringify(data));
    if (localStorage.getItem("seedance_last_local_model") === modelId) {
      localStorage.removeItem("seedance_last_local_model");
    }
    refreshLocalModels();
  } catch (e) {
    alert(e.message);
  }
}

async function loadLocalModel(modelId, silent) {
  const engine = document.getElementById("localEngine").value;
  try {
    const r = await fetch("/api/models/load", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model_id: modelId, engine }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.detail || JSON.stringify(data));
    localStorage.setItem("seedance_last_local_model", modelId);
    localStorage.setItem("seedance_last_local_engine", engine);
    refreshLocalModels();
  } catch (e) {
    if (!silent) alert(e.message);
  }
}

function startLogStream() {
  const el = document.getElementById("runtimeLog");
  try {
    const es = new EventSource("/api/logs/stream");
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        const line = document.createElement("div");
        line.textContent = data.line;
        el.appendChild(line);
        el.scrollTop = el.scrollHeight;
        while (el.children.length > 100) el.removeChild(el.firstChild);
      } catch (_) {}
    };
  } catch (e) {
    el.textContent = String(e.message);
  }
}

function toggleLogCollapse() {
  logCollapsed = !logCollapsed;
  document.getElementById("runtimeLog").style.display = logCollapsed ? "none" : "block";
  document.getElementById("logCollapseIcon").textContent = logCollapsed ? t("expand") : t("collapse");
}

async function callAPI(apiKey, userMessage, isPlanning, isExpand) {
  let systemContent = SYSTEM_PROMPT;
  let provider = "grok";
  if (!useGrok) {
    if (useLocal) {
      provider = "local";
      const jsonRules = "\n只输出合法 JSON。不要 markdown，不要 <think>。\n";
      if (isExpand) {
        systemContent = SEEDANCE_FIXED_FRAMEWORK;
        if (customSystemPrompt) systemContent += "\n# Skill\n" + customSystemPrompt.slice(0, 7000);
        systemContent += jsonRules;
      } else if (customSystemPrompt) {
        systemContent = customSystemPrompt.slice(0, 14000) + jsonRules;
      } else {
        systemContent = "你是 Seedance 规划助手。" + jsonRules;
      }
    } else {
      provider = "deepseek";
      systemContent = (customSystemPrompt || SYSTEM_PROMPT) + "\n只返回 JSON。";
    }
  }
  if (isExpand) {
    systemContent = SEEDANCE_FIXED_FRAMEWORK;
    if (customSystemPrompt) systemContent += "\n# Skill\n" + customSystemPrompt.slice(0, 10000);
    else systemContent += "\n# 内置\n" + SYSTEM_PROMPT.slice(0, 8000);
    systemContent += "\n只输出 JSON，prompt 必须是镜头提示词。";
  } else if (isPlanning) {
    systemContent += "\n规划阶段：只返回 parts_plan。";
  }
  const body = {
    model: provider === "local" ? "local" : provider === "deepseek" ? "deepseek-v4-pro" : "grok-4.6",
    messages: [
      { role: "system", content: systemContent },
      { role: "user", content: userMessage },
    ],
    temperature: provider === "local" ? (isExpand ? 0.75 : 0.25) : isPlanning ? 0.3 : 0.7,
    max_tokens: isPlanning ? (provider === "local" ? 4096 : 4000) : provider === "local" ? 8192 : 12000,
    provider,
    api_key: apiKey || "",
    json_mode: provider === "grok" || provider === "deepseek",
    kind: "text",
    prompt: userMessage,
  };
  let res = await fetch("/api/ai/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText.slice(0, 300)}`);
  }
  const json = await res.json();
  let content = json.choices?.[0]?.message?.content || "";
  if (typeof content !== "string") content = JSON.stringify(content);
  let parsed = extractJsonValue(content);
  if (!parsed && isExpand) parsed = recoverExpandFromTruncated(content);
  if (!parsed && isPlanning) parsed = recoverPartsPlanFromText(content);
  if (!parsed) throw new Error("invalid JSON: " + stripModelNoise(content).slice(0, 280));
  if (isExpand) parsed = normalizeExpand(parsed);
  else if (isPlanning) parsed = normalizePartsPlan(parsed);
  else {
    if (parsed.parts_plan || parsed.parts) parsed = normalizePartsPlan(parsed);
    parsed = normalizeStyleOptions(parsed);
  }
  return parsed;
}

function stripModelNoise(s) {
  s = String(s || "");
  s = s.replace(/<think>[\s\S]*?<\/think>/gi, "");
  s = s.replace(/<\/?think>/gi, "");
  s = s.replace(/```(?:json)?/gi, "");
  s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  return s.trim();
}

function extractJsonValue(s) {
  s = stripModelNoise(s);
  let best = null, depth = 0, startIdx = -1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "{") { if (depth === 0) startIdx = i; depth++; }
    else if (s[i] === "}") {
      depth--;
      if (depth === 0 && startIdx >= 0) best = s.slice(startIdx, i + 1);
    }
  }
  const candidates = [];
  if (best) candidates.push(best);
  candidates.push(s);
  const a0 = s.indexOf("{"), a1 = s.lastIndexOf("}");
  if (a0 >= 0 && a1 > a0) candidates.push(s.slice(a0, a1 + 1));
  for (let c of candidates) {
    c = c.replace(/,\s*([}\]])/g, "$1").trim();
    try { return JSON.parse(c); } catch (_) {}
    let openB = (c.match(/{/g) || []).length, closeB = (c.match(/}/g) || []).length;
    let openA = (c.match(/\[/g) || []).length, closeA = (c.match(/]/g) || []).length;
    let fixed = c.replace(/,\s*$/g, "");
    for (let i = 0; i < openA - closeA; i++) fixed += "]";
    for (let i = 0; i < openB - closeB; i++) fixed += "}";
    try { return JSON.parse(fixed.replace(/,\s*([}\]])/g, "$1")); } catch (_) {}
  }
  return null;
}

function normalizeStyleOptions(parsed) {
  if (!parsed || typeof parsed !== "object") return parsed;
  let arr = parsed.style_options || parsed.styles || parsed.options;
  if (!Array.isArray(arr)) return parsed;
  parsed.style_options = arr.map((item, i) => {
    if (typeof item === "string") {
      return { id: String.fromCharCode(65 + i), title: item, description: item, reference_hint: item };
    }
    return {
      id: String(item.id || String.fromCharCode(65 + i)),
      title: item.title || item.name || ("style " + (i + 1)),
      description: item.description || item.desc || "",
      reference_hint: item.reference_hint || item.reference || "",
    };
  });
  return parsed;
}

function normalizePartsPlan(parsed) {
  if (!parsed || typeof parsed !== "object") return parsed;
  const arr = parsed.parts_plan || parsed.parts;
  if (!Array.isArray(arr)) return parsed;
  parsed.parts_plan = arr.map((p, i) => ({
    part: p.part || (i + 1),
    duration_seconds: p.duration_seconds || p.seconds || 20,
    style_focus: p.style_focus || p.focus || p.style || "",
    brief: p.brief || p.summary || p.desc || "",
  }));
  return parsed;
}

function normalizeExpand(parsed) {
  if (!parsed || typeof parsed !== "object") return parsed;
  if (!parsed.prompt && parsed.data && parsed.data.prompt) parsed.prompt = parsed.data.prompt;
  if (typeof parsed.prompt !== "string") parsed.prompt = parsed.prompt != null ? String(parsed.prompt) : "";
  return parsed;
}

function recoverPartsPlanFromText(text) {
  const s = stripModelNoise(text);
  const parts = [];
  const re = /"part"\s*:\s*(\d+)/g;
  const idxs = [];
  let m;
  while ((m = re.exec(s)) !== null) idxs.push({ i: m.index, part: parseInt(m[1], 10) });
  for (let k = 0; k < idxs.length; k++) {
    const chunk = s.slice(idxs[k].i, k + 1 < idxs.length ? idxs[k + 1].i : s.length);
    const dur = chunk.match(/"duration_seconds"\s*:\s*(\d+)/);
    parts.push({
      part: idxs[k].part,
      duration_seconds: dur ? parseInt(dur[1], 10) : 20,
      style_focus: "",
      brief: "",
    });
  }
  return parts.length ? { parts_plan: parts } : null;
}

function recoverExpandFromTruncated(text) {
  const s = stripModelNoise(text);
  const key = s.match(/"prompt"\s*:\s*"/);
  if (!key) return null;
  let prompt = s.slice(key.index + key[0].length);
  prompt = prompt.replace(/"\s*}\s*$/m, "").replace(/"\s*$/m, "").replace(/}\s*$/m, "");
  prompt = prompt.replace(/\\n/g, "\n").replace(/\\"/g, '"').trim();
  if (prompt.length < 20) return null;
  return { part: 1, duration_seconds: 20, style_focus: "", prompt };
}

window.addEventListener("DOMContentLoaded", async () => {
  uiLang = detectUiLang();
  document.getElementById("uiLangSwitch").addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-ui-lang]");
    if (btn) setUiLang(btn.getAttribute("data-ui-lang"));
  });
  const savedKey = localStorage.getItem("seedance_xai_key");
  if (savedKey) document.getElementById("apiKey").value = savedKey;
  const dsKey = localStorage.getItem("seedance_deepseek_key");
  if (dsKey) document.getElementById("deepseekKey").value = dsKey;
  if (localStorage.getItem("seedance_debug_mode") === "1") {
    isDebugMode = true;
    toggleClassOn(document.getElementById("debugToggle"), true);
  }
  if (localStorage.getItem("seedance_use_grok") === "0") {
    useGrok = true;
    toggleProvider();
  }
  if (localStorage.getItem("seedance_use_local") === "1") {
    useLocal = true;
    applyLocalModeUI();
  }
  const lastEngine = localStorage.getItem("seedance_last_local_engine");
  if (lastEngine) {
    const sel = document.getElementById("localEngine");
    if (sel) sel.value = lastEngine;
  }
  applyI18n();
  startLogStream();
  restoreSkillFromStorage();
  try {
    const d = await fetch("/api/defaults").then((r) => r.json());
    if (d.version) document.getElementById("appVersion").textContent = "v" + d.version;
  } catch (_) {}
  if (!useGrok) refreshLocalModels();
  goStep(0);
});
