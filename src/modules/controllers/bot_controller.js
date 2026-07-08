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
    this.playerGameboard = this.playerModel.player.gameboard;
  }

  handlePlayGame() {
    this.botView.app.classList.remove("disable-interact");
    this.playerView.app.classList.add("disable-interact");

    this.botView.grid.childNodes.forEach((node) => {
      node.addEventListener("click", () => {
        if (!this.receiveAttack(node)) this.makeMove();

        if (this.botGameboard.isAllSunk())
          this.gameOver(this.playerModel.player.name);
        if (this.playerGameboard.isAllSunk())
          this.gameOver(this.botModel.player.name);
      });
    });
  }

  receiveAttack(node) {
    const x = node.classList[1];
    const y = node.classList[2];
    const blockObject = this.botGameboard.getBlock(x, +y);

    this.botGameboard.receiveAttack(x, +y);
    this.botView.renderBlock(blockObject, node);

    if (this.botGameboard.filledBlocks.includes(blockObject)) return true;
    return false;
  }

  makeMove() {
    let uniqueBlocks, block;

    do {
      uniqueBlocks = this.playerGameboard.grid.filter(
        (block) => !block.hasBeenHit,
      );
      block = uniqueBlocks[Math.floor(Math.random() * uniqueBlocks.length)];

      this.playerModel.player.gameboard.receiveAttack(block.x, block.y);
      this.playerView.renderBlock(block);
    } while (this.playerGameboard.filledBlocks.includes(block));
  }

  gameOver(winner) {
    this.botView.app.classList.add("disable-interact");

    const gameOverMessage = document.createElement("div");
    gameOverMessage.classList.add("game-over");
    gameOverMessage.textContent = `${winner} has won! wohoo`;

    gameOverMessage.append(this.rematch());
    document.body.insertBefore(gameOverMessage, this.botView.app);
  }

  rematch() {
    const rematch = document.createElement("div");
    rematch.classList.add("rematch");
    rematch.textContent = "Rematch";

    rematch.addEventListener("click", () => {
      window.location.reload();
      localStorage.setItem("rematch", "true");
    });

    return rematch;
  }
}

export default new BotController(
  PlayerController,
  new BotModel(),
  new BotView(),
);
