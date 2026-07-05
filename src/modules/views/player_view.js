export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("player");

    this.grid = document.createElement("div");
    this.grid.classList.add("player-grid");

    for (let i = 0; i < 10; i++)
      for (let j = 0; j < 10; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        this.grid.append(block);
      }
    this.app.append(this.grid);
    document.body.append(this.app);
  }
}
