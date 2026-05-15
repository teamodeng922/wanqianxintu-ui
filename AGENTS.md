# 万千心途 · Codex 开发指南

> Codex 每次任务开始前必须阅读本文件。本文件是项目 UI 的唯一视觉规范。

---

## 项目信息

- **项目名称**：万千心途（Paths of the Heart）
- **类型**：AI 电影叙事驱动的女性向快穿手游
- **画布**：1920×1080，16:9 横屏
- **目标平台**：手机（触屏），无鼠标/hover 交互
- **目标用户**：18-30 岁女性乙游玩家
- **视觉参考**：项目根目录下 `UI-标准图.png` 是最终效果的唯一标准

---

## 视觉风格

**一句话**：UI 是空气，不是家具。

参考《世界之外》（World Beyond by NetEase）的 UI 语言：
- 文字直接浮在画面上，无面板、无边框、无底色
- 图标是极细白色线描，几乎看不见
- 靠底部渐变暗遮罩保证文字在任何场景下可读
- 第一眼看到的是场景画面，第二眼才注意到 UI

**气质关键词**：优雅克制、温柔有距离感、电影感、呼吸感

---

## ⚠️ 手游适配前提

本项目是**手机游戏**。1920×1080 画布通过 `transform: scale()` 整体缩放到手机屏幕（通常缩小到 0.4-0.6 倍）。因此所有基准尺寸必须按手游标准设定——**比桌面网页大 1.7-1.8 倍**才能保证手机上可读。

**绝对不能出现的情况**：缩放后文字小于等效 14px、图标小于等效 20px。

---

## 色彩系统（严格遵守）

```css
:root {
  /* ===== 颜色 ===== */
  --color-white: #FFFFFF;
  --color-gold: #D4B886;          /* 柔金 · 仅用于选中态/重要提示 */
  --color-blue: #A4B8D6;          /* 心域蓝 · 仅用于AI零号/条件文字 */
  --color-ink: #2C2A33;           /* 深墨 · 仅用于浅色背景场景 */
  --color-black: #000000;

  /* ===== 透明度 ===== */
  --opacity-full: 1.0;
  --opacity-high: 0.9;            /* 对话正文 */
  --opacity-normal: 0.8;          /* 选项正文/AI对话 */
  --opacity-icon: 0.85;           /* 图标常态 */
  --opacity-monologue: 0.65;      /* 女主独白 */
  --opacity-dim: 0.5;             /* 选项字母 */
  --opacity-faint: 0.25;          /* 禁用态文字 */
  --opacity-disabled: 0.2;        /* 禁用态字母 */
  --opacity-glow: 0.12;           /* 选中光晕 */
  --opacity-gold-selected: 0.8;   /* 选中态柔金字母 */
}
```

**色彩比例**：95% 透明 + 4% 纯白 + 1% 柔金

**绝对禁止的颜色**：粉色、红色、霓虹色、纯黑文字（除过场字幕外）

---

## 字体系统

```css
:root {
  /* ===== 字体族 ===== */
  --font-serif: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', serif;
  --font-sans: 'Noto Sans SC', 'Source Han Sans SC', 'PingFang SC', sans-serif;
}
```

**Google Fonts 引用**（必须加在 index.html 的 `<head>` 中）：
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@300;400;700&display=swap" rel="stylesheet">
```

---

## 字号系统（1920×1080 基准 · 手游适配版）

```css
:root {
  /* ===== 字号（手游基准，缩放后仍可读）===== */
  --size-character-name: 48px;    /* 角色名 "沈言" "零号" */
  --size-dialogue: 36px;          /* 对话正文 */
  --size-monologue: 32px;         /* 女主内心独白 */
  --size-choice-letter: 42px;     /* 选项字母 A. B. C. */
  --size-choice-text: 36px;       /* 选项正文 */
  --size-toast: 28px;             /* 记忆碎片收集提示 */
  --size-auto-indicator: 20px;    /* 自动播放 ▶ */
  --size-subtitle: 42px;          /* 过场字幕 */
}
```

**关键约束**：对话正文（36px）、选项正文（36px）、女主独白（32px）三者必须视觉近似。角色名（48px）比正文大一档，选项字母（42px）比正文大半档。

### 字号 × 字体 × 字重 × 颜色 完整对照

| 元素 | 字号 | 字体 | 字重 | 颜色 |
|------|------|------|------|------|
| 角色名（男主） | 48px | **--font-serif** | **700** | 白色 100% |
| 角色名（AI零号） | 48px | **--font-serif** | **700** | 心域蓝 #A4B8D6 100% |
| 对话正文 | 36px | **--font-sans** | 400 | 白色 90% |
| AI 对话正文 | 36px | **--font-sans** | 400 | 白色 80% |
| 女主独白 | 32px | **--font-sans** | **300** | 白色 65% |
| 选项字母（常态） | 42px | **--font-serif** | **700** | 白色 50% |
| 选项字母（选中） | 42px | **--font-serif** | **700** | 柔金 #D4B886 80% |
| 选项字母（禁用） | 42px | **--font-serif** | **700** | 白色 20% |
| 选项正文（常态） | 36px | **--font-sans** | 400 | 白色 80% |
| 选项正文（选中） | 36px | **--font-sans** | 400 | 白色 100% |
| 选项正文（禁用） | 36px | **--font-sans** | 400 | 白色 25% |
| 条件文字 | 36px | **--font-sans** | 400 | 心域蓝 #A4B8D6 70% |
| 记忆碎片提示 | 28px | **--font-sans** | **300** | 柔金 #D4B886 80% |
| 自动播放 ▶ | 20px | — | — | 白色 50% |
| 过场字幕 | 42px | **--font-serif** | 400 | 白色 80% |

**必须严格遵守字体族**：角色名和选项字母用衬线（--font-serif），对话/独白/选项正文用无衬线（--font-sans）。这两种字体给出完全不同的质感，不能混用。

---

## 图标系统

```css
:root {
  /* ===== 图标尺寸（手游适配版）===== */
  --icon-nav: 56px;               /* 导航图标（返回） */
  --icon-func: 48px;              /* 功能图标（快进） */
  --icon-interaction: 120px;      /* 互动点击圆圈直径 */
  --icon-hand: 56px;              /* 互动手指图标 */
  --icon-diamond: 24px;           /* 菱形记忆碎片图标 */
}
```

### 图标实现方式：内联 SVG（非 PNG）

**所有图标使用内联 SVG**，不引用外部文件。

**SVG 通用属性**：
- `fill="none"` — 纯线描，永远不填充
- `stroke="white"` — 常态白色
- `stroke-width="1.5"` — 所有图标统一 1.5px
- `stroke-linecap="round"` + `stroke-linejoin="round"`

**SVG 代码清单**：

#### 返回 ← （56×56）
```html
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="34,10 18,28 34,46"/>
</svg>
```

#### 快进 · 缺口圆弧 + ›› （48×48）

3/4 圆弧（右侧断口 90°），双箭头 ›› 指向断口方向。

```html
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- 3/4 arc: gap opens to the right, radius 17, center (24,24) -->
  <path d="M 36.02 11.98 A 17 17 0 1 0 36.02 36.02"/>
  <!-- Double chevron ›› pointing into the gap -->
  <polyline points="22,19 28,24 22,29"/>
  <polyline points="29,19 35,24 29,29"/>
</svg>
```

#### 互动手指 · 极简几何版 （56×56）

一根手指轮廓（圆角矩形）向下指向点击涟漪。极简几何，不写实。

```html
<svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Finger: rounded rectangle pointing down -->
  <rect x="22" y="6" width="12" height="30" rx="6" ry="6"/>
  <!-- Tap ripple: 3 concentric circles -->
  <circle cx="28" cy="46" r="2.5"/>
  <circle cx="28" cy="46" r="6" opacity="0.4"/>
  <circle cx="28" cy="46" r="10" opacity="0.15"/>
</svg>
```

#### 菱形记忆碎片 （24×24）
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4B886" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2 L20 12 L12 22 L4 12 Z"/>
</svg>
```

### 图标交互状态（两态，无 hover）

| 状态 | 视觉 | CSS |
|------|------|-----|
| **常态** | 纯白，清晰可见 | `opacity: 0.85; stroke: white;` |
| **点击态（:active）** | 柔金闪现 + 轻微缩小 | `opacity: 1; stroke: var(--color-gold); transform: scale(0.92);` |

```css
.ui-icon {
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.6));
  opacity: var(--opacity-icon);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.ui-icon:active {
  opacity: var(--opacity-full);
  transform: scale(0.92);
}
.ui-icon:active svg {
  stroke: var(--color-gold);
}
```

---

## 间距系统（手游适配版）

```css
:root {
  /* ===== 间距 ===== */
  --spacing-safe-x: 80px;         /* 左右安全边距 */
  --spacing-safe-y: 56px;         /* 上下安全边距 */
  --spacing-choice-gap: 40px;     /* 选项之间间距 */
  --spacing-icon-gap: 32px;       /* 图标之间间距 */
  --spacing-dialogue-gap: 28px;   /* 对话组之间间距 */
  --spacing-name-text: 12px;      /* 角色名和对话文字间距 */
}
```

---

## 视口适配（关键）

所有 UI 按 1920×1080 设计，通过**整体等比缩放**适配不同屏幕。

```html
<div id="game-container">
  <!-- 所有 UI 内容放这里 -->
</div>
```

```css
body {
  margin: 0;
  padding: 0;
  background: #000000;       /* 黑边颜色 */
  overflow: hidden;
}

#game-container {
  width: 1920px;
  height: 1080px;
  position: relative;
  overflow: hidden;
  transform-origin: top left;
  transform: scale(var(--scale-factor, 1));
}
```

```javascript
function updateScale() {
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = Math.min(scaleX, scaleY);
  document.documentElement.style.setProperty('--scale-factor', scale);

  const container = document.getElementById('game-container');
  const offsetX = (window.innerWidth - 1920 * scale) / 2;
  const offsetY = (window.innerHeight - 1080 * scale) / 2;
  container.style.marginLeft = offsetX + 'px';
  container.style.marginTop = offsetY + 'px';
}

window.addEventListener('resize', updateScale);
window.addEventListener('load', updateScale);
```

**规则**：
- 所有 UI 元素在 `#game-container`（1920×1080）内
- 不使用 vw/vh/rem/%
- 超出 16:9 的屏幕显示黑边（letterbox），不拉伸
- gradient-overlay 高度用 `480px`（1080×44%）

---

## 组件规格

### 底部渐变遮罩

```css
.gradient-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 480px;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%);
  pointer-events: none;
  z-index: 1;
}
```

### 文字投影（所有 UI 文字必须加）

```css
text-shadow: 0 2px 4px rgba(0,0,0,0.6);
```

### 导航图标区

- **左上角**：距左 80px，距顶 56px — 返回 ← 图标（56px）
- **右上角**：距右 80px，距顶 56px — 快进 缺口圆弧图标（48px）
- **全局仅 2 个导航按钮**
- **点击效果**：scale(0.92) + stroke 变柔金，150ms 回弹

### 对话区

- **位置**：左下角，距左 80px，距底 140px
- **AI 零号在上，男主在下**，间距 28px
- **角色名**：48px，**衬线粗体**，letter-spacing: 0.1em
- **对话正文**：36px，**无衬线常规**
- **自动播放 ▶**：20px，在对话文字末尾，带 1.5s opacity 闪烁动画

### 女主独白

- **位置**：底部居中，距底 80px
- **max-width**：60%
- **text-align**：center
- **32px，无衬线 Light（300）**
- **无角色名，无头像**

### 对话选项

- **位置**：right: 5%，垂直居中
- **max-width**：40%
- **选项字母**：42px，**衬线粗体**
- **选项正文**：36px，**无衬线常规**
- **选中态竖线**：3px 宽，柔金 #D4B886，高度 = 行高
- **选中态光晕**：水平方向 #D4B886，12% 透明度，覆盖整行文字宽度 +60px，高 64px，filter: blur(12px)
- **点击反馈**：scale(0.98)，200ms 回弹

### 互动点击指示器

- **位置**：画面中央
- **圆形边框**：120px 直径，1.5px 白色描边
- **内部图标**：手指 SVG（圆角矩形+涟漪），56px，居中
- **呼吸动画**：opacity 0.6 ↔ 1.0，2 秒周期，ease-in-out
- **浮动动画**：translateY -4px ↔ 4px，3 秒周期
- **点击后**：scale 1→1.5 + opacity 1→0，300ms 后移除

### 记忆碎片收集提示

- **位置**：顶部居中，距顶 56px
- **图标**：菱形 SVG，24px，柔金色，在文字左侧
- **文字**：28px，无衬线 Light
- **动画**：500ms 淡入 → 停留 2000ms → 500ms 淡出

---

## 动画规范

```css
@keyframes breathing {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1.0; }
}

@keyframes floating {
  0%, 100% { transform: translateY(-4px); }
  50% { transform: translateY(4px); }
}

@keyframes blink {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.1; }
}

@keyframes glow-in {
  from { opacity: 0; }
  to { opacity: var(--opacity-glow); }
}

@keyframes toast-lifecycle {
  0% { opacity: 0; }
  12.5% { opacity: 1; }
  87.5% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes ripple-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(1.5); opacity: 0; }
}

@keyframes subtitle-fadein {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 0.8; transform: translateY(0); }
}
```

**通用过渡规则**：
- 界面切换：cross-fade，300ms
- 按钮按压：scale(0.92)，150ms 回弹
- 选项点击：scale(0.98)，200ms 回弹
- 所有过渡使用 `cubic-bezier(0.4, 0, 0.2, 1)`，禁止线性动画

---

## 界面状态管理

### 三个主界面（互斥，同一时刻只显示一个）

| 界面 | 快捷键 | 内容 |
|------|--------|------|
| 界面 1 · 剧情对话 | 按 1 | 背景+遮罩+导航+对话区 |
| 界面 2 · 选项选择 | 按 2 | 背景+遮罩+导航+对话区+右侧4选项 |
| 界面 3 · 过场字幕 | 按 3 | 纯黑背景+居中两行文字淡入淡出（无导航/无遮罩） |

### 界面 1 的子元素（单独触发，默认隐藏）

| 子元素 | 快捷键 | 行为 |
|--------|--------|------|
| 女主独白 | M | 显示独白，同时隐藏对话区 |
| 互动点击圈 | I | 显示互动圈，同时隐藏对话区 |
| 记忆碎片 toast | T | 顶部播放 4 秒 toast，不影响其他元素 |
| AI 零号对话 | Z | 在男主对话上方加一组零号对话 |

### 状态管理逻辑

```javascript
let currentScreen = 1;
let currentOverlay = null;

function switchScreen(n) {
  currentScreen = n;
  currentOverlay = null;
  render();
}

function toggleOverlay(type) {
  if (currentScreen !== 1) return;
  currentOverlay = (currentOverlay === type) ? null : type;
  render();
}
```

---

## 文件结构

```
万千心途_UI/
├── index.html
├── AGENTS.md
├── UI-标准图.png
├── css/
│   ├── style.css            /* 全局样式 + CSS变量 + 视口适配 */
│   ├── typography.css       /* 字体定义 */
│   ├── animations.css       /* 所有动画关键帧 */
│   └── components.css       /* 组件样式 */
├── js/
│   ├── main.js              /* 入口 + 视口缩放 */
│   ├── Router.js            /* 界面切换 + 状态管理 */
│   ├── DialogueManager.js   /* 对话逻辑 */
│   ├── ChoiceManager.js     /* 选项交互 */
│   ├── InteractionManager.js /* 互动点击 */
│   └── ToastManager.js      /* 碎片提示 */
└── Assets/
    └── background.png       /* 背景图（唯一需要的图片资产） */
```

---

## 代码规范

- 所有颜色/字号/间距/透明度**必须使用 CSS Variables**，禁止硬编码
- HTML/CSS/JS **文件分离**，严禁写在一个文件里
- 图标**使用内联 SVG**，禁止 PNG 图标文件
- 所有 UI 元素在 `#game-container`（1920×1080）内，通过整体 scale 适配屏幕
- **角色名/选项字母 = 衬线粗体**，**对话/独白/选项正文 = 无衬线**，不能混
- **严禁**：CSS 形状绘制替代图标、Emoji 替代图标、外部网络图片、vw/vh 单位
- 代码渲染结果必须对照 `UI-标准图.png` 逐元素验证
- 打开 `index.html` 即可在浏览器直接运行，无需 npm/node/webpack

---

## 绝对禁止清单

| 禁止 | 原因 |
|------|------|
| 不透明面板/底色 | 破坏透明呼吸感 |
| 可见边框线 | UI 不是家具 |
| 金色装饰线/角标/纹理 | 太重 |
| 毛玻璃/磨砂效果 | 仍然是"面板" |
| 圆角矩形按钮 | 按钮感太强 |
| 头像圆形边框 | 对话不需要 |
| 渐变色填充 | 任何元素不用 |
| 粗体图标（>2px线宽） | 图标必须极细 |
| 粉色/红色/霓虹色 | 与项目调性冲突 |
| 卡通/拟物图标 | 必须几何线性 |
| 线性动画（linear） | 必须用缓动曲线 |
| PNG 图标文件 | 用内联 SVG |
| hover 效果 | 手游无鼠标 |
| vw/vh/rem 单位 | 用 px + 整体 scale |
| 衬线/无衬线混用 | 角色名=衬线，正文=无衬线 |

---

### AGENTS.md 版本变更记录

| 版本 | 日期 | 变更 |
|------|------|------|
| v1 | 2026-05 | 初始版本 |
| v2 | 2026-05-14 | 图标 PNG→SVG，三态→两态，移除 hover |
| v2.1 | 2026-05-14 | 快进改缺口圆弧+单箭头，新增视口适配 |
| v3 | 2026-05-14 | ① **所有尺寸×1.75**（手游适配）：字号 48/36/32/42，图标 56/48/120，间距 80/56/40 ② 快进改缺口圆弧+**双箭头** ③ 手指图标改**极简几何版**（圆角矩形+涟漪） ④ 强调衬线/无衬线严格区分 ⑤ 选中光晕/竖线/遮罩等比放大 |

---

*AGENTS.md · 万千心途 UI 开发指南 v3*
*2026 年 5 月 14 日*
