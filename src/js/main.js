import "@/styles/main.scss";
import { el } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import renderHeader from "@/js/components/Header.js";
import { renderLeaderboard } from "@/js/components/Leaderboard.js";
import { renderGameOver } from "@/js/components/GameOver.js";
import { counterDefault, userDefault, scoreDefault } from "@/js/state.js";

if (!localStorage.getItem("score")) {
  localStorage.setItem("score", JSON.stringify(scoreDefault));
}
if (!localStorage.getItem("user")) {
  localStorage.setItem("user", JSON.stringify(userDefault));
}
document.body.append(renderLeaderboard());
document.body.append(renderGameOver());

document.addEventListener("DOMContentLoaded", () => {
  const app = el("div", { id: "app" });

  app.append(renderHeader());
  app.append(renderGameScreen({ counterDefault }));

  document.body.append(app);
});
