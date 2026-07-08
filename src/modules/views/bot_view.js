import createGrid from "./create_grid.js";

import createCross from "./cross.js";

export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("computer");
    this.app.classList.add("disable-interact");

    const { alphabetDiv, wrapper } = createGrid("bot-grid");
    this.grid = wrapper.childNodes[1];

    this.play = document.createElement("div");
    this.play.classList.add("play");
    this.play.textContent = "Play";

    this.app.append(alphabetDiv, wrapper);
    document.body.append(this.play, this.app);
  }

  renderBlock(blockObject, blockDiv) {
    if (blockObject.isEmpty) {
      blockDiv.classList.add("empty-block");
      const dot = document.createElement("div");
      dot.classList.add("dot");
      blockDiv.appendChild(dot);
    } else {
      blockDiv.classList.add("hit-block");
      blockDiv.append(createCross());
    }
    blockDiv.style.pointerEvents = "none";
  }

  bindPlayButton(handler) {
    this.play.addEventListener("click", () => {
      handler();
      this.app.classList.add("game-started");
      this.play.remove();
    });
  }
}
