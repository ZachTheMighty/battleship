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
    if (!this.getBlock(x, y).isEmpty || !this.getBlock(x, y).shipsAllowed)
      return false;

    const block = this.getBlock(x, y);
    block.placeShip(ship);

    this.#ships.push(ship);

    this.placeVertically(x, y, ship);
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
    const randomNumber = Math.floor(Math.random() * 2);
    const x_coordinates = this.alphabet.indexOf(x);
    for (let i = 0; i < ship.length; i++) {
      if (
        x_coordinates === 0 &&
        this.noShipInTheWay(x_coordinates, y, ship, "right")
      )
        this.spanShip(x_coordinates + i, y);
      else if (
        x_coordinates === this.alphabet.length - 1 &&
        this.noShipInTheWay(x_coordinates, y, ship, "left")
      )
        this.spanShip(x_coordinates - i, y);
      else {
        if (
          x_coordinates + ship.length <= this.alphabet.length &&
          this.noShipInTheWay(x_coordinates, y, ship, "right")
        ) {
          if (this.noShipInTheWay(x_coordinates, y, ship, "left")) {
            randomNumber === 1
              ? this.spanShip(x_coordinates + i, y)
              : this.spanShip(x_coordinates - i, y);
            continue;
          }
          this.spanShip(x_coordinates + i, y);
        } else if (this.noShipInTheWay(x_coordinates, y, ship, "left"))
          this.spanShip(x_coordinates - i, y);
        else return false;
      }
    }
    this.filledBlocks
      .filter((block) => block.grayBlocks.length === 0)
      .forEach((block) => this.createGaps(block.x, block.y, block));
  }

  placeVertically(x, y, ship) {
    const randomNumber = Math.floor(Math.random() * 2);
    const x_coordinates = this.alphabet.indexOf(x);
    for (let i = 0; i < ship.length; i++) {
      if (y === 1 && this.noShipInTheWay(x_coordinates, y, ship, "bottom"))
        this.spanShip(x_coordinates, y + i);
      else if (
        y === this.alphabet.length &&
        this.noShipInTheWay(x_coordinates, y, ship, "top")
      )
        this.spanShip(x_coordinates, y - i);
      else {
        if (
          y + ship.length <= this.alphabet.length + 1 &&
          this.noShipInTheWay(x_coordinates, y, ship, "bottom")
        ) {
          if (this.noShipInTheWay(x_coordinates, y, ship, "top")) {
            randomNumber === 1
              ? this.spanShip(x_coordinates, y + i)
              : this.spanShip(x_coordinates, y - i);
            continue;
          }
          this.spanShip(x_coordinates, y + i);
        } else if (this.noShipInTheWay(x_coordinates, y, ship, "top"))
          this.spanShip(x_coordinates, y - i);
        else return false;
      }
    }
    this.filledBlocks
      .filter((block) => block.grayBlocks.length === 0)
      .forEach((block) => this.createGaps(block.x, block.y, block));
  }

  spanShip(x, y) {
    const block = this.getBlock(this.alphabet[x], y);
    block.isEmpty = false;
    this.filledBlocks.push(block);
  }

  noShipInTheWay(x, y, ship, direction) {
    let targetBlock;

    if (direction === "right")
      targetBlock = this.getBlock(this.alphabet[x + ship.length - 1], y);
    else if (direction === "left")
      targetBlock = this.getBlock(this.alphabet[x - ship.length + 1], y);
    else if (direction === "bottom")
      targetBlock = this.getBlock(this.alphabet[x], y + ship.length - 1);
    else targetBlock = this.getBlock(this.alphabet[x], y - ship.length + 1);

    return targetBlock.shipsAllowed && targetBlock.isEmpty;
  }

  receiveAttack(x, y) {
    const block = this.getBlock(x, y);
    block.isEmpty ? this.missedAttacks.push(block) : block.ship.hit();
  }

  isAllSunk() {
    return this.#ships.some((ship) => !ship.isSunk) ? false : true;
  }
}
