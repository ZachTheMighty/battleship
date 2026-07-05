import PlayerModel from "./models/player_model.js";
import PlayerView from "./views/player_view.js";

import Ship from "./building_classes/ship/ship.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    const gameboard = this.model.player.gameboard;
    // gameboard.placeShip("A", 1, new Ship(5));
    gameboard.placeShip("E", 6, new Ship(5));
    // gameboard.placeShip("B", 7, new Ship(2));
    // gameboard.placeShip("J", 9, new Ship(3));

    const filledBlocks = gameboard.filledBlocks;
    filledBlocks.forEach((block) => {
      this.view.render(block);
      block.grayBlocks.forEach((block) => this.view.render(block));
    });
  }
}

export default new Controller(new PlayerModel("idk"), new PlayerView());
