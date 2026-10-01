import "@/styles/game-over.scss";
import { el, formatDate } from "@/js/utils/utils.js";

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
  const gameOverCloseBtn = el("button", {
    className: "btn game-over-btn ",
    text: "Close",
  });

  gameOverCloseBtn.addEventListener("click", () => gameOverModal.close());
  gameOverModal.addEventListener("click", (e) => {
    if (e.target === gameOverModal) {
      gameOverModal.close();
    }
  });
  gameOverInner.append(gameOverTitle, gameOverResult, gameOverCloseBtn);
  gameOverModal.append(gameOverInner);

  return gameOverModal;
}

const updateGameOver = ({ counter }) => {
  gameOverResult.textContent = `Steps: ${counter.steps} • Time: ${counter.timer} • Date: ${formatDate(Date.now())}`;
};

export { renderGameOver, updateGameOver };
