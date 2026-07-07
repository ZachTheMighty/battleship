import PlayerController from "./player_controller.js";

import BotModel from "../models/bot_model.js";
import BotView from "../views/bot_view.js";

class BotController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.bot = this.model.player;
    this.gameboard = this.bot.gameboard;
    this.gameboard.randomPopulate();

    this.view.bindPlayButton(() => this.handlePlayGame());
  }

  handlePlayGame() {
    this.view.grid.childNodes.forEach((node) => {
      node.addEventListener("click", () => this.attackBlock(node));
    });
  }

  attackBlock(node) {
    const x = node.classList[1];
    const y = node.classList[2];
    const blockObject = this.gameboard.getBlock(x, +y);

    this.gameboard.receiveAttack(x, +y);

    this.view.render(blockObject, node);
  }
}

export default new BotController(new BotModel(), new BotView());
