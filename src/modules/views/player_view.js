import createGrid from "./create_grid.js";
import createCross from "./cross.js";

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

  renderBlock(blockObject) {
    const blockDiv = Array.from(this.grid.childNodes).find(
      (block) =>
        block.classList.contains(blockObject.x) &&
        block.classList.contains(blockObject.y),
    );

    if (blockObject.isEmpty) {
      blockDiv.classList.add("empty-block");
      const dot = document.createElement("div");
      dot.classList.add("dot");
      blockDiv.appendChild(dot);
    } else {
      blockDiv.classList.add("hit-block");
      blockDiv.append(createCross());
    }
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
