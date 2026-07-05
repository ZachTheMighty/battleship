export default class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isEmpty = true;
  }

  placeShip(ship) {
    this.ship = ship;
    this.isEmpty = false;
  }
}
