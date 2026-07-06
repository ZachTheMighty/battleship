import PlayerController from "./player_controller.js";

import BotView from "../views/bot_view.js";

class BotController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}

export default new BotController(null, new BotView());
