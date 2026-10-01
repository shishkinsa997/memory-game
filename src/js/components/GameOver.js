import "@/styles/game-over.scss";
import { el, formatDate } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import { counterDefault } from "@/js/state.js";

const gameOverModal = el("dialog", {
  className: "game-over",
  id: "game-over",
});
const gameOverResult = el("p", {
  className: "modal-section game-over-result",
});

function renderGameOver() {
  const gameOverInner = el("div", {
    className: "modal-container game-over-inner",
  });
  const gameOverTitle = el("h2", {
    className: "modal-title game-over-title",
    text: "You are win",
  });
  const btnContainer = el("div", {
    className: "game-over-btn-container",
  });
  const gameOverCloseBtn = el("button", {
    className: "btn game-over-btn ",
    text: "Close",
  });
  const newGameBtn = el("button", {
    className: "new-game btn",
    text: "New Game",
  });
  newGameBtn.addEventListener("click", () => {
    document.getElementById("game-screen").remove();
    document.getElementById("app").append(renderGameScreen({ counterDefault }));
    gameOverModal.close();
  });

  gameOverCloseBtn.addEventListener("click", () => {
    gameOverModal.close();
    document.documentElement.style = "overflow: auto";
  });
  gameOverModal.addEventListener("click", (e) => {
    if (e.target === gameOverModal) {
      gameOverModal.close();
      document.documentElement.style = "overflow: auto";
    }
  });

  btnContainer.append(newGameBtn, gameOverCloseBtn);
  gameOverInner.append(gameOverTitle, gameOverResult, btnContainer);
  gameOverModal.append(gameOverInner);

  return gameOverModal;
}

const updateGameOver = ({ counter }) => {
  gameOverResult.textContent = `Steps: ${counter.steps} • Time: ${counter.timer} • Date: ${formatDate(Date.now())}`;
};

export { renderGameOver, updateGameOver };
