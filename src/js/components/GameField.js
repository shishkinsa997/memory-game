import "@/styles/game-field.scss";
import { el } from "@/js/utils/utils.js";
import { getNumberOfCards } from "@/js/utils/getNumberOfCards.js";
import { getRandomItems } from "@/js/utils/getRandom.js";
import renderCard from "@/js/components/Card.js";
import { updateGameOver } from "@/js/components/GameOver.js";
import cards from "@/js/svgCards/cards.js";
const pair = [null, null];

function renderGameField({ counter, user, timer }) {
  pair[0] = null;
  const cardsArray = [...Object.keys(cards)];
  const numberOfCards = getNumberOfCards(user);

  const gameField = el("div", {
    className: "game",
    id: "game",
  });
  const gameGrid = el("div", {
    id: "game-grid",
    className: `game-grid grid-${numberOfCards}`,
  });

  const gameCards = getRandomItems(cardsArray, numberOfCards);
  gameCards.push(...gameCards);

  getRandomItems(gameCards).forEach((c) => {
    gameGrid.append(
      renderCard({
        cardName: c,
        onClick: (cardName, cardEl) => handleCardClick(cardName, cardEl),
      }),
    );
  });

  function handleCardClick(cardName, cardEl) {
    if (cardEl.classList.contains("is-flipped")) return;

    if (pair[0]?.name === cardName && pair[0]?.el === cardEl) return;

    cardEl.classList.add("is-flipped");

    if (!pair[0]) {
      pair[0] = { name: cardName, el: cardEl };
    } else {
      pair[1] = { name: cardName, el: cardEl };
      counter.steps++;

      if (pair[0].name === pair[1].name) {
        pair[0] = null;
        pair[1] = null;
        counter.pairs++;
        if (counter.pairs === numberOfCards) {
          initGameOver();
        }
      } else {
        const [a, b] = pair;
        gameGrid.style = "pointer-events: none;";

        setTimeout(() => {
          a.el.classList.remove("is-flipped");
          b.el.classList.remove("is-flipped");
          pair[0] = null;
          pair[1] = null;
          setTimeout(() => {
            gameGrid.style = "pointer-events: auto;";
          }, 500);
        }, 800);
      }
    }
  }

  const initGameOver = () => {
    clearInterval(timer);
    const score = JSON.parse(localStorage.getItem("score"));
    const gameOverModal = document.getElementById("game-over");
    gameOverModal.showModal();
    document.documentElement.style = "overflow: hidden";
    updateGameOver({ counter });
    const difficulty = user?.difficulty;
    const game = {
      id: Date.now(),
      steps: counter.steps,
      timer: counter.timer,
    };

    if (difficulty === "review") {
      score["easy"].push(game);
    } else {
      score[difficulty]?.push(game);
    }
    localStorage.setItem("score", JSON.stringify(score));
  };

  gameField.append(gameGrid);

  return gameField;
}

export { renderGameField, pair };
