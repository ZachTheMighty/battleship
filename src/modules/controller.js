import PlayerModel from "./models/player_model.js";
import PlayerView from "./views/player_view.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.gameboard = this.model.player.gameboard;
    this.gameboard.randomPopulate();

    this.gameboard.filledBlocks.forEach((block) => {
      this.view.render(block);
      block.grayBlocks.forEach((block) => this.view.render(block));
    });
  }
}

export default new Controller(new PlayerModel("idk"), new PlayerView());
