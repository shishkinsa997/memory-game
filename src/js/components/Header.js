import "@/styles/header.scss";
import { el } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import { updateBoard } from "@/js/components/Leaderboard.js";
import { showModal } from "@/js/components/Modal.js";
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

  const filterBar = el("div", {
    className: "filter-bar",
    id: "filter-bar",
  });

  const createFilterTab = (tab) => {
    const tabBtn = el("button", {
      className: "filter-btn",
      id: tab,
      text: tab,
    });
    if (JSON.parse(localStorage.getItem("user")).difficulty === tab) {
      tabBtn.classList.add("filter-tab-active");
    }
    tabBtn.addEventListener("click", () => {
      const tabs = document.querySelectorAll(".filter-btn");
      tabs.forEach((x) => x.classList.remove("filter-tab-active"));
      tabBtn.classList.add("filter-tab-active");

      const user = JSON.parse(localStorage.getItem("user"));
      user.difficulty = tab;
      localStorage.setItem("user", JSON.stringify(user));
    });
    return tabBtn;
  };

  newGameBtn.addEventListener("click", () => {
    document.getElementById("game-screen").remove();
    document.getElementById("app").append(renderGameScreen({ counterDefault }));
  });
  leaderBoardBtn.addEventListener("click", () => {
    updateBoard();
    const leaderBoard = document.getElementById("leaderboard");
    showModal(leaderBoard);
    // leaderBoard.showModal();
    // document.documentElement.style = "overflow: hidden";
  });
  ["easy", "normal", "hard", "review"].forEach((d) => {
    filterBar.append(createFilterTab(d));
  });
  headerInner.append(newGameBtn, leaderBoardBtn, filterBar);
  header.append(headerInner);

  return header;
}
