import "./index.css";
import BotController from "./modules/controllers/bot_controller.js";

import packageInfo from "../package.json";
import footer from "./modules/footer.js";

const repoName = packageInfo.name;
footer(repoName);

if (localStorage.getItem("rematch") === "true")
  BotController.botView.play.click();
localStorage.clear();
