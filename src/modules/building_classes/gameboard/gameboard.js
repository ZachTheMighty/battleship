import Block from "./block.js";

export default class {
  #ships = [];
  constructor() {
    this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    this.grid = this.generateGrid();
    this.filledBlocks = [];
    this.missedAttacks = [];
  }

  generateGrid() {
    let grid = [];

    this.alphabet.forEach((char) => {
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
    block.placeShip(ship);
    this.createGaps(x, y, block);

    this.#ships.push(ship);
    this.filledBlocks.push(block);
  }

  createGaps(x, y, block) {
    const noShipsBlocks = [
      this.getBlock(x, y + 1),
      this.getBlock(this.alphabet[this.alphabet.indexOf(x) + 1], y + 1),
      this.getBlock(this.alphabet[this.alphabet.indexOf(x) - 1], y + 1),
      this.getBlock(x, y - 1),
      this.getBlock(this.alphabet[this.alphabet.indexOf(x) + 1], y - 1),
      this.getBlock(this.alphabet[this.alphabet.indexOf(x) - 1], y - 1),
      this.getBlock(this.alphabet[this.alphabet.indexOf(x) + 1], y),
      this.getBlock(this.alphabet[this.alphabet.indexOf(x) - 1], y),
    ];
    noShipsBlocks.forEach((noShipBlock) => {
      noShipBlock.shipsAllowed = false;
      block.grayBlocks.push(noShipBlock);
    });
  }

  receiveAttack(x, y) {
    const block = this.getBlock(x, y);
    block.isEmpty ? this.missedAttacks.push(block) : block.ship.hit();
  }

  isAllSunk() {
    return this.#ships.some((ship) => !ship.isSunk) ? false : true;
  }
}
