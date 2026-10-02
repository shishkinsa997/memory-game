import { el } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import { counterDefault } from "@/js/state.js";

export default function renderNewGameBtn() {
  const newGameBtn = el("button", {
    className: "new-game btn",
    text: "New Game",
  });

  newGameBtn.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((m) => {
      m.close();
      document.documentElement.style = "overflow: auto";
    });

    setTimeout(() => {
      const gameScreen = renderGameScreen({ counterDefault });
      document.getElementById("game-screen").remove();
      document.getElementById("app").append(gameScreen);
    }, 500);
  });

  return newGameBtn;
}
