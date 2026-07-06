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

    this.#ships.push(ship);
    this.placeHorizontally(x, y, ship);
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

    for (let i = 0; i < noShipsBlocks.length; i++) {
      try {
        if (!noShipsBlocks[i].isEmpty) continue;
        noShipsBlocks[i].shipsAllowed = false;
        block.grayBlocks.push(noShipsBlocks[i]);
      } catch (error) {
        continue;
      }
    }
  }

  placeHorizontally(x, y, ship) {
    const x_coordinates = this.alphabet.indexOf(x);
    for (let i = 0; i < ship.length; i++) {
      if (
        x_coordinates === 0 &&
        this.getBlock(this.alphabet[x_coordinates + ship.length - 1], y)
          .shipsAllowed
      ) {
        const block = this.getBlock(this.alphabet[x_coordinates + i], y);
        block.isEmpty = false;
        this.filledBlocks.push(block);
      } else if (
        x_coordinates === this.alphabet.length - 1 &&
        this.getBlock(this.alphabet[x_coordinates - ship.length + 1], y)
          .shipsAllowed &&
        this.getBlock(this.alphabet[x_coordinates - ship.length + 1], y).isEmpty
      ) {
        const block = this.getBlock(this.alphabet[x_coordinates - i], y);
        block.isEmpty = false;
        this.filledBlocks.push(block);
      }
    }
    this.filledBlocks
      .filter((block) => block.grayBlocks.length === 0)
      .forEach((block) => this.createGaps(block.x, block.y, block));
  }

  receiveAttack(x, y) {
    const block = this.getBlock(x, y);
    block.isEmpty ? this.missedAttacks.push(block) : block.ship.hit();
  }

  isAllSunk() {
    return this.#ships.some((ship) => !ship.isSunk) ? false : true;
  }
}
