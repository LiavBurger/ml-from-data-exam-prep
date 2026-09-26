#!/usr/bin/env node
// Validate a cards file: KaTeX renders, tags balanced, every part of the topic's questions is mapped,
// every mapped card exists, core word counts. Usage: node tools/check_cards.js data/cards/regression.js
const path = require("path");
const root = path.dirname(__dirname);
global.window = {};
const katex = require(path.join(root, "vendor/katex.min.js"));
require(path.join(root, "data/manifest.js"));
require(path.join(root, "data/content.js"));
require(path.resolve(process.argv[2]));
const [topic] = Object.keys(window.CARDS);
const C = window.CARDS[topic];
let errors = 0, warns = 0;
const err = (w, m) => { errors++; console.log(`✗ ${w}: ${m}`); };
const warn = (w, m) => { warns++; console.log(`! ${w}: ${m}`); };
function checkHtml(where, html) {
  if (typeof html !== "string") return;
  for (const m of html.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)) {
    const tex = m[1] !== undefined ? m[1] : m[2];
    try { katex.renderToString(tex, { throwOnError: true, displayMode: m[1] !== undefined }); }
    catch (e) { err(where, `KaTeX: ${e.message.slice(0, 140)} in ${tex.slice(0, 60)}`); }
  }
  const noMath = html.replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, "");
  for (const tag of ["p", "ul", "ol", "li", "b", "i", "table", "tr", "td", "th", "pre", "code", "div", "span", "h5"]) {
    const o = (noMath.match(new RegExp(`<${tag}(\\s[^>]*)?>`, "g")) || []).length, c = (noMath.match(new RegExp(`</${tag}>`, "g")) || []).length;
    if (o !== c) err(where, `<${tag}> opened ${o}× closed ${c}×`);
  }
}
const words = h => (h || "").replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, " M ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
checkHtml("intro", C.intro);
for (const [id, c] of Object.entries(C.cards)) {
  for (const k of ["title", "cue", "numbers", "check", "trap", "side"]) checkHtml(`${id}.${k}`, c[k]);
  (c.lines || []).forEach((l, i) => checkHtml(`${id}.lines[${i}]`, l));
  (c.why || []).forEach(([a, b], i) => { checkHtml(`${id}.why[${i}]`, a); checkHtml(`${id}.why[${i}]`, b); });
  if (!c.lines || c.lines.length < 1) err(id, "no lines");
  const core = words(c.cue) + (c.lines || []).reduce((s, l) => s + words(l), 0) + words(c.numbers) + words(c.check) + words(c.trap);
  if (core > 200) warn(id, `core is ${core} words (target ≤ ~150)`);
}
const t = window.TOPICS.find(x => x.id === topic);
const allParts = t.questions.flatMap(q => Object.keys(window.MANIFEST).filter(k => k.startsWith(q.id + ".")));
for (const p of allParts) if (!(p in C.parts)) err("parts", `${p} not mapped`);
for (const [p, ids] of Object.entries(C.parts)) {
  if (!window.MANIFEST[p]) err("parts", `unknown part ${p}`);
  for (const id of ids) if (!C.cards[id]) err("parts", `${p} → unknown card "${id}"`);
}
const used = new Set(Object.values(C.parts).flat());
for (const id of Object.keys(C.cards)) if (!used.has(id)) warn(id, "not used by any part");
console.log(errors ? `${errors} error(s), ${warns} warning(s) in ${topic}` : `✓ ${topic}: ${Object.keys(C.cards).length} cards, ${Object.keys(C.parts).length}/${allParts.length} parts mapped${warns ? `, ${warns} warning(s)` : ""}`);
process.exit(errors ? 1 : 0);
