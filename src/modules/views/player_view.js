export default class {
  constructor() {
    this.app = document.createElement("div");
    this.app.classList.add("player");

    this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    this.alphabetDiv = document.createElement("div");
    this.alphabetDiv.classList.add("alphabet");
    this.alphabet.forEach((char) => {
      const charDiv = document.createElement("div");
      charDiv.classList.add("x-coordinates");
      charDiv.textContent = char;
      this.alphabetDiv.append(charDiv);
    });

    this.app.append(this.alphabetDiv);

    this.grid = this.createGrid();
    this.grid.classList.add("player-grid");

    this.app.append(this.grid);
    document.body.append(this.app);
  }

  createGrid() {
    const grid = document.createElement("div");
    for (let i = 0; i < 10; i++)
      for (let j = 0; j < 10; j++) {
        const block = document.createElement("div");
        block.classList.add("block");
        grid.append(block);
      }
    return grid;
  }
}
