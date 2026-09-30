import "@/styles/main.scss";
import { el } from "@/js/utils/utils.js";
import renderGameScreen from "@/js/screens/GameScreen.js";
import renderHeader from "@/js/components/Header.js";
import { counterDefault } from "@/js/state.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = el("div", { id: "app" });

  app.append(renderHeader());
  app.append(renderGameScreen({ counterDefault }));
  document.body.append(app);
});
