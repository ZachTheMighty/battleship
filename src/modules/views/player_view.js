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

    this.numsDiv = document.createElement("div");
    this.numsDiv.classList.add("numbers");
    for (let i = 1; i < 11; i++) {
      const numDiv = document.createElement("div");
      numDiv.classList.add("y-coordinates");
      numDiv.textContent = i;
      this.numsDiv.append(numDiv);
    }

    this.grid = this.createGrid();
    this.grid.classList.add("player-grid");

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("wrapper");
    this.wrapper.append(this.numsDiv, this.grid);

    this.app.append(this.alphabetDiv, this.wrapper);
    document.body.append(this.app);
  }

  createGrid() {
    const grid = document.createElement("div");
    for (let i = 1; i < 11; i++)
      this.alphabet.forEach((char) => {
        const block = document.createElement("div");
        block.classList.add("block");
        block.classList.add(char);
        block.classList.add(i);
        grid.append(block);
      });
    return grid;
  }

  render(blockObject) {
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
}
