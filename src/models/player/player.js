import Gameboard from "../gameboard/gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}
