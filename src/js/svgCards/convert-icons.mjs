import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const src = readFileSync(resolve(__dirname, "cards.js"), "utf8");

const start = src.indexOf("{");
const end = src.lastIndexOf("}");
if (start === -1 || end === -1) throw new Error("Не нашёл объект cards");

const objLiteral = src.slice(start, end + 1);

const cards = new Function(`return (${objLiteral});`)();

function parseTag(raw) {
  const tagMatch = raw.match(/^<\s*([a-zA-Z][\w:-]*)/);
  if (!tagMatch) return null;
  const tag = tagMatch[1];

  const attrs = {};
  const attrRe = /([a-zA-Z_:][\w:.-]*)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = attrRe.exec(raw)) !== null) {
    attrs[m[1]] = m[2];
  }
  const selfClosing = /\/\s*>$/.test(raw.trim());
  return { tag, attrs, selfClosing };
}

function parseSvg(svgStr) {
  const tagRe = /<[^>]+>/g;
  const tags = svgStr.match(tagRe) || [];

  let root = null;
  const stack = [];

  for (const raw of tags) {
    const isClose = /^<\s*\//.test(raw);
    const isComment = /^<\s*!/.test(raw) || /^<\s*\?/.test(raw);
    if (isComment) continue;

    if (isClose) {
      const name = raw.match(/^<\s*\/\s*([a-zA-Z][\w:-]*)/)?.[1];
      if (!name) continue;
      if (stack.length && stack[stack.length - 1].tag === name) stack.pop();
      continue;
    }

    const parsed = parseTag(raw);
    if (!parsed) continue;

    const node = { tag: parsed.tag, attrs: { ...parsed.attrs }, children: [] };

    if (stack.length === 0) {
      root = node;
    } else {
      stack[stack.length - 1].node.children.push(node);
    }

    if (!parsed.selfClosing) {
      stack.push({ tag: parsed.tag, node });
    }
  }

  return root;
}

const result = {};
for (const [key, svgStr] of Object.entries(cards)) {
  const tree = parseSvg(svgStr);
  if (!tree) {
    console.warn(`Пропуск ${key}: не удалось распарсить`);
    continue;
  }
  delete tree.attrs.xmlns;
  result[key] = tree;
}

const out =
  "const cards = " +
  JSON.stringify(result, null, 2) +
  ";\n\nexport default cards;\n";

writeFileSync(resolve(__dirname, "cards.data.js"), out, "utf8");

// node convert-icons.mjs
