// import "../../styles/ancients.scss";
import { el, formatMs } from "@/js/utils/utils.js";
import { renderGameField } from "@/js/components/GameField.js";
import renderCounters from "@/js/components/Counters.js";

export default function renderGameScreen({ counterDefault }) {
  const gameScreen = el("main", {
    className: "game-screen main",
    id: "game-screen",
  });
  const counterCopy = { ...counterDefault };
  const user = JSON.parse(localStorage.getItem("user"));

  const start = Date.now();

  let updateCounters = () => {};

  const counter = new Proxy(counterCopy, {
    set(target, prop, value) {
      if (target[prop] !== value) {
        target[prop] = value;
        updateCounters();
      }
      return true;
    },
  });

  const counters = renderCounters({ counter });
  updateCounters = counters.update;

  const timer = setInterval(() => {
    const total = Math.floor(Date.now() - start);
    counter.timer = formatMs(total);
  }, 1000);
  timer;

  gameScreen.append(
    renderGameField({ counter, user, timer }),
    counters.element,
  );

  return gameScreen;
}
