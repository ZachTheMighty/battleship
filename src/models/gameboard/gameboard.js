import Block from "./block.js";

class Gameboard {
  constructor() {
    this.grid = this.generateGrid();
  }

  generateGrid() {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    let grid = [];

    alphabet.forEach((char) => {
      for (let i = 1; i < 11; i++) grid.push(new Block(char, i));
    });
    return grid;
  }
}
