import createGrid from "./create_grid.js";

export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("player");

    const { alphabetDiv, wrapper } = createGrid("player-grid");
    this.grid = wrapper.childNodes[1];

    this.randomizeDiv = document.createElement("div");
    this.randomizeDiv.classList.add("randomize-div");

    this.randomizeButton = document.createElement("button");
    this.randomizeButton.classList.add("randomize-button");
    this.randomizeButton.textContent = "Randomize";

    this.randomizeDiv.append(this.randomizeButton);

    this.app.append(alphabetDiv, wrapper, this.randomizeDiv);
    document.body.append(this.app);
  }
  renderGameboard(blockObject) {
    const blockDiv = Array.from(this.grid.childNodes).find(
      (block) =>
        block.classList.contains(blockObject.x) &&
        block.classList.contains(blockObject.y),
    );
    if (!blockObject.shipsAllowed) {
      blockDiv.classList.add("no-ships");
      return;
    }
    blockDiv.classList.add("filled-block");
  }

  resetGrid() {
    this.grid.childNodes.forEach((node) =>
      node.classList.remove("filled-block"),
    );
  }

  bindRandomize(handler) {
    this.randomizeButton.addEventListener("click", handler);
  }
}
