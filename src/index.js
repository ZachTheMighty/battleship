import "./index.css";
import BotController from "./modules/controllers/bot_controller.js";

if (localStorage.getItem("rematch") === "true")
  BotController.botView.play.click();
localStorage.clear();
