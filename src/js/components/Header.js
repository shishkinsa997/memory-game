import "@/styles/header.scss";
import { el } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import { counterDefault } from "@/js/state.js";

export default function renderHeader() {
  const header = el("header", {
    className: "header",
  });
  const headerInner = el("div", {
    className: "header-inner",
  });
  const newGame = el("button", {
    className: "new-game btn",
    text: "New Game",
  });
  const leaderBoard = el("button", {
    className: "leader-board btn",
    text: "Leaderboard",
  });

  newGame.addEventListener("click", () => {
    document.getElementById("game-screen").remove();
    document.getElementById("app").append(renderGameScreen({ counterDefault }));
  });
  leaderBoard.addEventListener("click", () => {
    console.log("lead");
  });

  headerInner.append(newGame, leaderBoard);
  header.append(headerInner);

  return header;
}
