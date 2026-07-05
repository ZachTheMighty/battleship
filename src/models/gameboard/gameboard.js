import Block from "./block.js";
import Ship from "../ship/ship.js";

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

  getBlock(x, y) {
    const block = this.grid.find((block) => block.x === x && block.y === y);
    return block ? block : "Invalid coordinates";
  }

  placeShip(x, y, ship) {
    this.getBlock(x, y).placeShip(ship);
  }
}
