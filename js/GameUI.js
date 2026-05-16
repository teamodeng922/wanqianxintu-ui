const GameUI = (() => {
  const heartSvg = `
    <svg class="avatar-heart" width="20" height="20" viewBox="0 0 20 20" fill="#E87A7A" stroke="none" aria-hidden="true">
      <path d="M10 17.5 C6 14 2 10.5 2 7 C2 4.5 4 2.5 6.5 2.5 C8 2.5 9.5 3.5 10 5 C10.5 3.5 12 2.5 13.5 2.5 C16 2.5 18 4.5 18 7 C18 10.5 14 14 10 17.5Z"/>
    </svg>
  `;
  const defaultAvatars = {
    沈言: "Assets/avatar_shenyan.png",
    陆让: "Assets/avatar_lurang.png",
  };

  function router() {
    return window.appRouter;
  }

  function switchScreen(screenId) {
    router()?.setScreen(String(screenId));
  }

  function createDialogueGroup({ speaker, text, color = "white" }) {
    const article = document.createElement("article");
    article.className = `dialogue-group ${color === "blue" ? "dialogue-ai" : "dialogue-main"}`;

    const name = document.createElement("h2");
    name.className = "character-name";
    name.textContent = speaker || "";

    const line = document.createElement("p");
    line.className = "dialogue-text";

    const lineText = document.createElement("span");
    lineText.textContent = text || "";

    const indicator = document.createElement("span");
    indicator.className = "auto-indicator";
    indicator.setAttribute("aria-hidden", "true");
    indicator.textContent = "▶";

    line.append(lineText, indicator);
    article.append(name, line);

    return article;
  }

  function renderDialogue(container, dialogue) {
    if (!container) {
      return;
    }

    container.replaceChildren(createDialogueGroup(dialogue));
  }

  function renderCondition(condition) {
    if (!condition) {
      return "";
    }

    return condition.startsWith("需要") ? `（${condition}）` : `（需要：${condition}）`;
  }

  function showDialogue({ speaker, text, color = "white" }) {
    switchScreen("1");

    const appRouter = router();
    const dialogue = document.querySelector("[data-story-dialogue]");

    appRouter.currentOverlay = null;
    renderDialogue(dialogue, { speaker, text, color });
    appRouter.renderStoryOverlay();
  }

  function showMonologue(text) {
    switchScreen("1");

    const appRouter = router();
    const monologue = document.querySelector('[data-overlay="monologue"]');

    if (monologue) {
      monologue.textContent = text || "";
    }

    appRouter.currentOverlay = "monologue";
    appRouter.renderStoryOverlay();
  }

  function showChoices({ context, choices, onSelect }) {
    switchScreen("2");

    const contextContainer = document.querySelector("[data-choice-context]");
    const choiceList = document.querySelector("[data-choice-list]");

    renderDialogue(contextContainer, context || { speaker: "", text: "" });

    if (!choiceList) {
      return;
    }

    choiceList.replaceChildren();

    (choices || []).forEach((choice) => {
      const button = document.createElement("button");
      const status = choice.status || "normal";
      button.className = `choice-item ${status === "selected" ? "is-selected" : ""} ${status === "disabled" ? "is-disabled" : ""}`.trim();
      button.type = "button";
      button.disabled = status === "disabled";

      const letter = document.createElement("span");
      letter.className = "choice-letter";
      letter.textContent = `${choice.letter}.`;

      const text = document.createElement("span");
      text.className = "choice-text";
      text.textContent = choice.text || "";

      if (choice.condition) {
        const condition = document.createElement("span");
        condition.className = "choice-condition";
        condition.textContent = renderCondition(choice.condition);
        text.append(condition);
      }

      button.append(letter, text);

      button.addEventListener("click", () => {
        if (button.disabled) {
          return;
        }

        choiceList.querySelectorAll(".choice-item").forEach((item) => item.classList.remove("is-selected"));
        button.classList.add("is-selected");
        onSelect?.(choice.letter);
      });

      choiceList.append(button);
    });
  }

  function showTransition(lines) {
    const subtitleScreen = document.querySelector('.screen[data-screen="3"]');
    const subtitleLines = document.querySelector("[data-subtitle-lines]");

    subtitleScreen?.classList.remove("is-active");

    if (subtitleLines) {
      subtitleLines.replaceChildren();
      (lines || []).forEach((line, index) => {
        const item = document.createElement("p");
        item.className = "subtitle-line";
        item.style.setProperty("--subtitle-delay", `${180 + index * 820}ms`);
        item.textContent = line;
        subtitleLines.append(item);
      });
    }

    subtitleScreen?.offsetHeight;
    switchScreen("3");
  }

  function showInteraction(onTap) {
    switchScreen("1");

    const appRouter = router();
    appRouter.interactionCallback = onTap;
    appRouter.currentOverlay = "interaction";
    appRouter.renderStoryOverlay();
  }

  function showMemoryToast(name) {
    const toastText = document.querySelector("[data-toast] span");

    if (toastText) {
      toastText.textContent = `收集记忆碎片：${name}`;
    }

    router()?.playToast();
  }

  function createMapAvatar(character, index) {
    const node = document.createElement("div");
    node.className = "map-avatar-node";
    node.dataset.characterName = character.name || "";
    node.style.setProperty("--avatar-order", index);
    node.setAttribute("role", "button");
    node.setAttribute("tabindex", "0");
    node.setAttribute("aria-label", `选择${character.name || "角色"}`);

    Object.entries(character.position || {}).forEach(([key, value]) => {
      node.style[key] = value;
    });

    const image = document.createElement("div");
    image.className = "avatar-image";

    const avatar = character.avatar || defaultAvatars[character.name];

    if (avatar) {
      image.style.backgroundImage = `url("${avatar}")`;
    }

    node.innerHTML = `
      <div class="avatar-ring"></div>
      <div class="avatar-diamond top"></div>
      <div class="avatar-diamond bottom"></div>
      <div class="avatar-diamond left"></div>
      <div class="avatar-diamond right"></div>
      <div class="avatar-info">
        <span class="avatar-name"></span>
        ${heartSvg}
        <span class="avatar-affinity"></span>
      </div>
    `;

    node.prepend(image);
    node.querySelector(".avatar-name").textContent = character.name || "";
    node.querySelector(".avatar-affinity").textContent = `${character.affinity ?? 0}%`;

    return node;
  }

  function showMap({ characters, onSelectCharacter }) {
    const appRouter = router();
    const avatarLayer = document.querySelector("[data-map-avatars]");

    if (avatarLayer) {
      avatarLayer.replaceChildren();
      (characters || []).forEach((character, index) => {
        avatarLayer.append(createMapAvatar(character, index));
      });
    }

    appRouter.mapSelectCallback = onSelectCharacter;
    appRouter.bindMapAvatars();
    switchScreen("4");
  }

  return {
    showDialogue,
    showMonologue,
    showChoices,
    showTransition,
    showInteraction,
    showMemoryToast,
    showMap,
  };
})();

window.GameUI = GameUI;
