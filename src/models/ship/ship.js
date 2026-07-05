class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
  }

  isSunk() {
    return this.length === this.timesHit ? true : false;
  }
}

export default new Ship(3);
