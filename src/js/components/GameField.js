import "@/styles/game-field.scss";
import { el } from "@/js/utils/utils.js";
import { getRandomItems } from "@/js/utils/getRandom.js";
import renderCard from "@/js/components/Card.js";
import cards from "@/js/svgCards/cards.js";
const pair = [null, null];

function renderGameField({ counter }) {
  const gameField = el("div", {
    className: "game",
    id: "game",
  });
  const gameGrid = el("div", {
    id: "game-grid",
    className: "game-grid grid-8",
  });

  const cardsArray = [...Object.keys(cards)];

  const gameCards = getRandomItems(cardsArray, 8);
  gameCards.push(...gameCards);
  console.log(gameCards);

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
      } else {
        const [a, b] = pair;
        gameGrid.style = "pointer-events: none;";

        setTimeout(() => {
          a.el.classList.remove("is-flipped");
          b.el.classList.remove("is-flipped");
          pair[0] = null;
          pair[1] = null;
          gameGrid.style = "pointer-events: auto;";
        }, 800);
      }
    }
  }

  gameField.append(gameGrid);

  return gameField;
}

export { renderGameField, pair };
