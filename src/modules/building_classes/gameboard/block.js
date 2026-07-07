export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isEmpty = true;
    this.shipsAllowed = true;
    this.grayBlocks = [];
    this.hasBeenHit = false;
  }

  placeShip(ship) {
    this.ship = ship;
    this.isEmpty = false;
  }
}
