import "@/styles/modal.scss";
import { el, formatDate } from "@/js/utils/utils.js";
import { renderModal } from "@/js/components/Modal.js";
import renderNewGameBtn from "@/js/components/NewGameBtn.js";

const gameOverResult = el("p", {
  className: "modal-section game-over-result",
});

function renderGameOver() {
  const gameOverModal = renderModal({
    name: "game-over",
    title: "You are win",
    content: [gameOverResult],
    button: renderNewGameBtn(),
  });

  return gameOverModal;
}

const updateGameOver = ({ counter }) => {
  gameOverResult.textContent = `Steps: ${counter.steps} • Time: ${counter.timer} • Date: ${formatDate(Date.now())}`;
};

export { renderGameOver, updateGameOver };
