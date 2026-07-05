export default class {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.isSunk = this.isSunk();
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    return this.length === this.timesHit ? true : false;
  }
}
