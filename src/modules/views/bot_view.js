import createGrid from "./create_grid.js";

export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("computer");

    const { alphabetDiv, wrapper } = createGrid("bot-grid");
    this.grid = wrapper.childNodes[1];

    this.app.append(alphabetDiv, wrapper);
    document.body.append(this.app);
  }
}
