export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isEmpty = true;
    this.missed = false;
  }

  placeShip(ship) {
    this.ship = ship;
    this.isEmpty = false;
  }
}
