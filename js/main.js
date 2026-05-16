const stage = document.querySelector(".game-stage");

if (stage && window.Router) {
  window.appRouter = new window.Router(stage);
}

if (window.GameUI) {
  window.GameUI.showChoices({
    context: { speaker: "沈言", text: "雨声这么大，你还要走吗？" },
    choices: [
      { letter: "A", text: "我是选项常态示意", status: "normal" },
      { letter: "B", text: "我是选项选中态示意", status: "selected" },
      { letter: "C", text: "我是选项内容", status: "normal", condition: "好感度 ≥ 3" },
      { letter: "D", text: "我是选项灰态示意", status: "disabled" },
    ],
  });
  window.GameUI.showTransition(["但如果……", "你做了不一样的选择呢？"]);
  window.GameUI.showMap({
    characters: [
      { name: "沈言", avatar: "Assets/avatar_shenyan.png", affinity: 40, position: { left: "12%", top: "45%" } },
      { name: "陆让", avatar: "Assets/avatar_lurang.png", affinity: 60, position: { right: "12%", top: "55%" } },
    ],
  });
  window.GameUI.showDialogue({ speaker: "沈言", text: "……谢谢。" });
}

async function demoGameFlow() {
  if (!window.GameUI) {
    return;
  }

  GameUI.showTransition(["两周前", "明礼学院 · 雨季"]);
  await wait(3000);

  GameUI.showDialogue({ speaker: "沈言", text: "……谢谢。" });
  await wait(2000);

  GameUI.showMonologue("他的声音很轻，像是怕惊动什么。");
  await wait(2500);

  GameUI.showChoices({
    context: { speaker: "沈言", text: "雨声这么大，你还要走吗？" },
    choices: [
      { letter: "A", text: "「不怕。」", status: "normal" },
      { letter: "B", text: "「其实……我也不确定。」", status: "normal" },
    ],
    onSelect: (letter) => {
      console.log(`玩家选了：${letter}`);
      GameUI.showDialogue({ speaker: "沈言", text: "……是吗。" });
    },
  });
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

document.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat) {
    return;
  }

  event.preventDefault();
  demoGameFlow();
});
