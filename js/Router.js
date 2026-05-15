class Router {
  constructor(stage) {
    this.stage = stage;
    this.screens = Array.from(document.querySelectorAll(".screen"));
    this.screenIds = new Set(this.screens.map((screen) => screen.dataset.screen));
    this.currentScreen = "1";
    this.currentOverlay = null;
    this.toastTimer = null;

    this.storyScreen = document.querySelector('.screen[data-screen="1"]');
    this.storyDialogue = document.querySelector("[data-story-dialogue]");
    this.overlayElements = Array.from(document.querySelectorAll("[data-overlay]"));
    this.toast = document.querySelector("[data-toast]");
    this.interaction = document.querySelector('[data-overlay="interaction"]');

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

        window.setTimeout(() => {
          this.interaction.hidden = true;
          this.currentOverlay = null;
          this.renderStoryOverlay();
        }, 300);
      });
    }
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

    this.currentScreen = screenId;
    this.currentOverlay = null;
    this.render();
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
}

window.Router = Router;
