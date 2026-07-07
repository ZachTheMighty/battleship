import createGrid from "./create_grid.js";

export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("computer");

    const { alphabetDiv, wrapper } = createGrid("bot-grid");
    this.grid = wrapper.childNodes[1];

    this.playDiv = document.createElement("div");
    this.playDiv.classList.add("play-div");

    this.playButton = document.createElement("button");
    this.playButton.classList.add("play-button");
    this.playButton.textContent = "Play";

    this.playDiv.append(this.playButton);

    this.app.append(alphabetDiv, wrapper);
    document.body.append(this.playDiv, this.app);
  }

  bindPlayButton(handler) {
    this.playButton.addEventListener("click", () => {
      handler;
      this.playButton.remove();
    });
  }
}
