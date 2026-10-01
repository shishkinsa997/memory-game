import "@/styles/header.scss";
import { el } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import { updateBoard } from "@/js/components/Leaderboard.js";
import { counterDefault } from "@/js/state.js";

export default function renderHeader() {
  const header = el("header", {
    className: "header",
  });
  const headerInner = el("div", {
    className: "header-inner",
  });
  const newGameBtn = el("button", {
    className: "new-game btn",
    text: "New Game",
  });
  const leaderBoardBtn = el("button", {
    className: "leader-board btn",
    text: "Leaderboard",
  });

  newGameBtn.addEventListener("click", () => {
    document.getElementById("game-screen").remove();
    document.getElementById("app").append(renderGameScreen({ counterDefault }));
  });
  leaderBoardBtn.addEventListener("click", () => {
    updateBoard();
    const leaderBoard = document.getElementById("leaderboard");
    leaderBoard.showModal();
  });

  headerInner.append(newGameBtn, leaderBoardBtn);
  header.append(headerInner);

  return header;
}
