const stage = document.querySelector(".game-stage");

if (stage && window.Router) {
  window.appRouter = new window.Router(stage);
}
