import BotModel from "../models/bot_model.js";
import BotView from "../views/bot_view.js";

import PlayerController from "./player_controller.js";

class BotController {
  constructor(playerController, botModel, botView) {
    this.botModel = botModel;
    this.botView = botView;

    this.bot = this.botModel.player;
    this.botGameboard = this.bot.gameboard;
    this.botGameboard.randomPopulate();

    this.botView.bindPlayButton(() => this.handlePlayGame());

    this.playerView = playerController.view;
    this.playerModel = playerController.model;
  }

  handlePlayGame() {
    this.botView.app.classList.remove("disable-interact");
    this.playerView.app.classList.add("disable-interact");

    this.botView.grid.childNodes.forEach((node) => {
      node.addEventListener("click", () => {
        this.receiveAttack(node);
        this.makeMove();
      });
    });
  }

  receiveAttack(node) {
    const x = node.classList[1];
    const y = node.classList[2];
    const blockObject = this.botGameboard.getBlock(x, +y);

    this.botGameboard.receiveAttack(x, +y);

    this.botView.renderBlock(blockObject, node);
  }

  makeMove() {
    const playerGameboard = this.playerModel.player.gameboard;
    let uniqueBlocks, block;

    do {
      uniqueBlocks = playerGameboard.grid.filter((block) => !block.hasBeenHit);
      block = uniqueBlocks[Math.floor(Math.random() * uniqueBlocks.length)];

      if (!block) return;

      this.playerModel.player.gameboard.receiveAttack(block.x, block.y);
      this.playerView.renderBlock(block);
    } while (playerGameboard.filledBlocks.includes(block));
  }
}

export default new BotController(
  PlayerController,
  new BotModel(),
  new BotView(),
);
