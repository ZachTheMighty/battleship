import Gameboard from "../gameboard/gameboard.js";

export default class {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
