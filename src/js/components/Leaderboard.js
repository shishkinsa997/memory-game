import "@/styles/modal.scss";
import { renderModal } from "@/js/components/Modal.js";
import { el, formatDate } from "@/js/utils/utils.js";

const leaderEasy = el("ol", {
  className: "modal-section leaderboard-list",
  text: "Easy",
  attrs: {
    "data-difficulty": "easy",
  },
});
const leaderNormal = el("ol", {
  className: "modal-section leaderboard-list",
  text: "Normal",
  attrs: {
    "data-difficulty": "normal",
  },
});
const leaderHard = el("ol", {
  className: "modal-section leaderboard-list",
  text: "Hard",
  attrs: {
    "data-difficulty": "hard",
  },
});

const createLi = (li) => {
  return el("li", {
    className: `leaderboard-li ${li.isReview ? "review" : ""}`,
    text: `Steps: ${li.steps} • ${li.isReview ? "review" : "Time: " + li.timer} • Date: ${formatDate(li.id)}`,
  });
};

function renderLeaderboard() {
  const LeaderboardModal = renderModal({
    name: "leaderboard",
    title: "Leaderboard",
    content: [leaderEasy, leaderNormal, leaderHard],
  });

  updateBoard();
  return LeaderboardModal;
}

const updateBoard = () => {
  const score = JSON.parse(localStorage.getItem("score"));

  [leaderEasy, leaderNormal, leaderHard].forEach((ol) => {
    ol.textContent = ol.dataset.difficulty;
    const sortedScore = score[ol.dataset.difficulty]
      .sort((a, b) => {
        if (a.steps === b.steps) {
          return a.id - b.id;
        } else {
          return a.steps - b.steps;
        }
      })
      .slice(0, 10);
    const empty = el("p", {
      text: "No results yet",
    });
    if (sortedScore.length === 0) {
      ol.append(empty);
    }

    sortedScore.forEach((li) => {
      ol.append(createLi(li));
    });
  });
};

export { renderLeaderboard, updateBoard };
