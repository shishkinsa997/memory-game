import "@/styles/modal.scss";

import { el, formatDate } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import { counterDefault } from "@/js/state.js";
import { renderModal } from "@/js/components/Modal.js";

const gameOverResult = el("p", {
  className: "modal-section game-over-result",
});

function renderGameOver() {
  const newGameBtn = el("button", {
    className: "new-game btn",
    text: "New Game",
  });
  newGameBtn.addEventListener("click", () => {
    document.getElementById("game-screen").remove();
    document.getElementById("app").append(renderGameScreen({ counterDefault }));
    gameOverModal.close();
  });

  const gameOverModal = renderModal({
    name: "game-over",
    title: "You are win",
    content: [gameOverResult],
    button: newGameBtn,
  });

  return gameOverModal;
}

const updateGameOver = ({ counter }) => {
  gameOverResult.textContent = `Steps: ${counter.steps} • Time: ${counter.timer} • Date: ${formatDate(Date.now())}`;
};

export { renderGameOver, updateGameOver };
