import BotModel from "../models/bot_model.js";
import BotView from "../views/bot_view.js";

import PlayerController from "./player_controller.js";

class BotController {
  constructor(playerController, botModel, botView) {
    this.botModel = botModel;
    this.botView = botView;

    this.bot = this.botModel.player;
    this.gameboard = this.bot.gameboard;
    this.gameboard.randomPopulate();

    this.botView.bindPlayButton(() => this.handlePlayGame());

    this.playerView = playerController.view;
    this.playerModel = playerController.model;
  }

  handlePlayGame() {
    this.botView.grid.childNodes.forEach((node) => {
      node.addEventListener("click", () => {
        this.attackBlock(node);
        this.makeMove();
      });
    });
  }

  attackBlock(node) {
    const x = node.classList[1];
    const y = node.classList[2];
    const blockObject = this.gameboard.getBlock(x, +y);

    this.gameboard.receiveAttack(x, +y);

    this.botView.renderBlock(blockObject, node);
  }

  makeMove() {
    const playerGameboard = this.playerModel.player.gameboard;
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const x = alphabet[Math.floor(Math.random() * 10)];
    const y = Math.floor(Math.random() * 10) + 1;
    const block = playerGameboard.getBlock(x, y);

    if (block.hasBeenHit) return this.makeMove();
    this.playerModel.player.gameboard.receiveAttack(x, y);
    this.playerView.renderBlock(block);
  }
}

export default new BotController(
  PlayerController,
  new BotModel(),
  new BotView(),
);
