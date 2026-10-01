import "@/styles/card.scss";
import { el } from "@/js/utils/utils.js";
import { renderIcon } from "@/js/svgCards/renderIcon.js";

export default function renderCard({ cardName, onClick }) {
  const card = el("button", {
    className: "card",
    attrs: {
      "data-id": cardName,
    },
  });
  const cardInner = el("div", {
    className: "card-inner",
  });
  const face = el("div", {
    className: "face",
  });
  const backdrop = el("div", {
    className: "backdrop",
  });

  card.addEventListener("click", () => {
    onClick?.(cardName, card);
  });

  face.append(renderIcon(cardName, { width: "100%", height: "100%" }));
  cardInner.append(face, backdrop);
  card.append(cardInner);

  return card;
}
