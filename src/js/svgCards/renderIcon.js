import cards from "./cards.data.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export function renderIcon(name, overrides = {}) {
  const data = cards[name];
  if (!data) throw new Error(`Нет иконки: ${name}`);
  const el = buildNode(data);
  for (const [k, v] of Object.entries(overrides)) {
    el.setAttribute(k, v);
  }
  return el;
}

function buildNode(node) {
  const el = document.createElementNS(SVG_NS, node.tag);
  for (const [k, v] of Object.entries(node.attrs ?? {})) {
    el.setAttribute(k, v);
  }
  for (const child of node.children ?? []) {
    el.appendChild(buildNode(child));
  }
  return el;
}
