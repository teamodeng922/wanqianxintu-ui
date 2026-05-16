class Router {
  constructor(stage) {
    this.stage = stage;
    this.screens = Array.from(document.querySelectorAll(".screen"));
    this.screenIds = new Set(this.screens.map((screen) => screen.dataset.screen));
    this.currentScreen = "1";
    this.previousScreen = "1";
    this.currentOverlay = null;
    this.toastTimer = null;
    this.mapCloseTimer = null;
    this.mapSelectTimer = null;
    this.interactionCallback = null;
    this.mapSelectCallback = null;

    this.storyScreen = document.querySelector('.screen[data-screen="1"]');
    this.storyDialogue = document.querySelector("[data-story-dialogue]");
    this.overlayElements = Array.from(document.querySelectorAll("[data-overlay]"));
    this.toast = document.querySelector("[data-toast]");
    this.interaction = document.querySelector('[data-overlay="interaction"]');
    this.mapScreen = document.querySelector('.screen[data-screen="4"]');
    this.mapClose = document.querySelector("[data-map-close]");
    this.mapParticles = document.querySelector("[data-map-particles]");
    this.mapAvatarNodes = [];

    this.createParticles(this.mapParticles);
    this.bindEvents();
    this.updateScale();
    this.render();
  }

  bindEvents() {
    window.addEventListener("resize", () => this.updateScale());
    window.addEventListener("load", () => this.updateScale());

    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();

      if (this.screenIds.has(key)) {
        this.setScreen(key);
        return;
      }

      if (key === "m") {
        this.setOverlay("monologue");
        return;
      }

      if (key === "i") {
        this.setOverlay("interaction");
        return;
      }

      if (key === "z") {
        this.setOverlay("ai");
        return;
      }

      if (key === "t") {
        this.playToast();
      }
    });

    if (this.interaction) {
      this.interaction.addEventListener("click", () => {
        this.interaction.classList.add("is-clicked");
        this.interactionCallback?.();

        window.setTimeout(() => {
          this.interaction.hidden = true;
          this.currentOverlay = null;
          this.renderStoryOverlay();
        }, 300);
      });
    }

    this.bindMapAvatars();

    this.mapClose?.addEventListener("click", () => {
      this.closeMap();
    });
  }

  bindMapAvatars() {
    this.mapAvatarNodes = Array.from(document.querySelectorAll(".map-avatar-node"));

    this.mapAvatarNodes.forEach((node) => {
      if (node.dataset.bound === "true") {
        return;
      }

      node.dataset.bound = "true";
      node.addEventListener("click", () => this.selectMapAvatar(node));
      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this.selectMapAvatar(node);
        }
      });
    });
  }

  selectMapAvatar(node) {
    this.mapAvatarNodes.forEach((avatar) => avatar.classList.remove("selected"));
    node.classList.add("selected");
    window.clearTimeout(this.mapSelectTimer);

    this.mapSelectTimer = window.setTimeout(() => {
      this.mapSelectCallback?.(node.dataset.characterName || "");
    }, 300);
  }

  updateScale() {
    const scaleX = window.innerWidth / 1920;
    const scaleY = window.innerHeight / 1080;
    const scale = Math.min(scaleX, scaleY);
    document.documentElement.style.setProperty("--scale-factor", scale);

    const offsetX = (window.innerWidth - 1920 * scale) / 2;
    const offsetY = (window.innerHeight - 1080 * scale) / 2;
    this.stage.style.marginLeft = `${offsetX}px`;
    this.stage.style.marginTop = `${offsetY}px`;
  }

  setScreen(screenId) {
    if (!this.screenIds.has(screenId)) {
      return;
    }

    if (this.currentScreen !== "4" && screenId === "4") {
      this.previousScreen = this.currentScreen;
    }

    if (screenId !== "4") {
      window.clearTimeout(this.mapCloseTimer);
      window.clearTimeout(this.mapSelectTimer);
      this.mapScreen?.classList.remove("is-closing");
      this.mapAvatarNodes.forEach((avatar) => avatar.classList.remove("selected"));
    }

    this.currentScreen = screenId;
    this.currentOverlay = null;
    this.render();
  }

  closeMap() {
    if (this.currentScreen !== "4") {
      return;
    }

    this.mapScreen?.classList.add("is-closing");
    window.clearTimeout(this.mapCloseTimer);

    this.mapCloseTimer = window.setTimeout(() => {
      const targetScreen = this.screenIds.has(this.previousScreen) ? this.previousScreen : "1";
      this.setScreen(targetScreen);
    }, 300);
  }

  setOverlay(overlay) {
    if (this.currentScreen !== "1") {
      this.setScreen("1");
    }

    this.currentOverlay = this.currentOverlay === overlay ? null : overlay;
    this.renderStoryOverlay();
  }

  playToast() {
    if (this.currentScreen !== "1") {
      this.setScreen("1");
    }

    if (!this.toast) {
      return;
    }

    window.clearTimeout(this.toastTimer);
    this.toast.classList.remove("is-playing");
    this.toast.offsetHeight;
    this.toast.classList.add("is-playing");

    this.toastTimer = window.setTimeout(() => {
      this.toast.classList.remove("is-playing");
    }, 4000);
  }

  render() {
    this.stage.dataset.currentScreen = this.currentScreen;

    this.screens.forEach((screen) => {
      screen.classList.toggle("is-active", screen.dataset.screen === this.currentScreen);
    });

    this.renderStoryOverlay();
  }

  renderStoryOverlay() {
    this.overlayElements.forEach((element) => {
      element.hidden = element.dataset.overlay !== this.currentOverlay;
    });

    if (this.interaction) {
      this.interaction.classList.remove("is-clicked");
    }

    const hidesDialogue = this.currentOverlay === "monologue" || this.currentOverlay === "interaction";
    this.storyDialogue?.classList.toggle("is-hidden", hidesDialogue);
  }

  createParticles(container, count = 20) {
    if (!container || container.children.length > 0) {
      return;
    }

    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement("div");
      dot.className = "map-particle";
      dot.style.left = `${10 + Math.random() * 80}%`;
      dot.style.top = `${10 + Math.random() * 80}%`;
      dot.style.setProperty("--duration", `${2 + Math.random() * 3}s`);
      dot.style.setProperty("--delay", `${Math.random() * 3}s`);

      const size = `${2 + Math.random() * 2}px`;
      dot.style.width = size;
      dot.style.height = size;

      container.appendChild(dot);
    }
  }
}

window.Router = Router;
