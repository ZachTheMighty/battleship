import Block from "./block.js";

export default class {
  #ships = [];
  constructor() {
    this.grid = this.generateGrid();
    this.filledBlocks = [];
    this.missedAttacks = [];
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
    const block = this.getBlock(x, y);
    this.#ships.push(ship);
    block.placeShip(ship);
    this.filledBlocks.push(block);
  }

  receiveAttack(x, y) {
    const block = this.getBlock(x, y);
    block.isEmpty ? this.missedAttacks.push(block) : block.ship.hit();
  }

  isAllSunk() {
    return this.#ships.some((ship) => !ship.isSunk) ? false : true;
  }
}
