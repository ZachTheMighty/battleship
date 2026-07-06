import PlayerModel from "../models/player_model.js";
import PlayerView from "../views/player_view.js";

class PlayerController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.gameboard = this.model.player.gameboard;
    this.gameboard.randomPopulate();

    this.view.bindRandomize(() => this.handleRandomize());

    this.gameboard.filledBlocks.forEach((block) => {
      this.view.render(block);
      block.grayBlocks.forEach((block) => this.view.render(block));
    });
  }

  handleRandomize() {
    this.gameboard.reset();
    this.view.resetGrid();
    this.gameboard.randomPopulate();
    this.renderGameBoard();
  }

  renderGameBoard() {
    this.gameboard.filledBlocks.forEach((block) => {
      this.view.render(block);
      block.grayBlocks.forEach((block) => this.view.render(block));
    });
  }
}

export default new PlayerController(new PlayerModel("idk"), new PlayerView());
