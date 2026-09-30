import "@/styles/counters.scss";
import { el } from "@/js/utils/utils.js";

export default function renderCounters({ counter }) {
  const countersWrapper = el("div", {
    className: "counters",
    id: "counters",
  });
  const pairs = el("div", {
    className: "pairs",
    text: "Pairs: ",
  });
  const steps = el("div", {
    className: "steps",
    text: "Steps: ",
  });
  const timer = el("div", {
    className: "timer",
    text: "Time: ",
  });
  const pairsCounter = el("span", {
    className: "pairs",
    id: "pairs",
    text: `${counter.pairs}`,
  });
  const stepsCounter = el("span", {
    className: "steps",
    id: "steps",
    text: `${counter.steps}`,
  });
  const timerCounter = el("span", {
    className: "timer",
    id: "timer",
    text: "00:00",
  });

  pairs.append(pairsCounter);
  steps.append(stepsCounter);
  timer.append(timerCounter);
  countersWrapper.append(pairs, steps, timer);

  function update() {
    pairsCounter.textContent = counter.pairs;
    stepsCounter.textContent = counter.steps;
    timerCounter.textContent = counter.timer;
  }

  update();
  return { element: countersWrapper, update };
}
