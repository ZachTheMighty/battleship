export default class {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.isSunk = false;
  }

  hit() {
    this.timesHit++;
    this.isSunk = this.length === this.timesHit ? true : false;
  }
}
