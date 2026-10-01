import "@/styles/leaderboard.scss";
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
    className: "leaderboard-li ",
    text: `Steps: ${li.steps} • Time: ${li.timer} • Date: ${formatDate(li.id)}`,
  });
};

function renderLeaderboard() {
  const leaderModal = el("dialog", {
    className: "leaderboard",
    id: "leaderboard",
  });
  const leaderInner = el("div", {
    className: "modal-container leaderboard-inner",
  });
  const leaderTitle = el("h2", {
    className: "modal-title leaderboard-title",
    text: "Leaderboard",
  });
  const leaderCloseBtn = el("button", {
    className: "btn leaderboard-btn ",
    text: "Close",
  });

  updateBoard();
  leaderCloseBtn.addEventListener("click", () => {
    leaderModal.close();
    document.documentElement.style = "overflow: auto";
  });
  leaderModal.addEventListener("click", (e) => {
    if (e.target === leaderModal) {
      leaderModal.close();
      document.documentElement.style = "overflow: auto";
    }
  });

  leaderInner.append(
    leaderTitle,
    leaderEasy,
    leaderNormal,
    leaderHard,
    leaderCloseBtn,
  );
  leaderModal.append(leaderInner);

  return leaderModal;
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
