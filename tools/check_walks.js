#!/usr/bin/env node
// Validate a walkthrough file: part ids exist, every move has a line, KaTeX renders, tags balanced.
// Usage: node tools/check_walks.js data/walks/regression.js
const path = require("path");
const root = path.dirname(__dirname);
global.window = {};
const katex = require(path.join(root, "vendor/katex.min.js"));
require(path.join(root, "data/manifest.js"));
require(path.resolve(process.argv[2]));
let errors = 0, moves = 0;
const err = (w, m) => { errors++; console.log(`✗ ${w}: ${m}`); };
function check(w, html) {
  if (typeof html !== "string") return;
  for (const m of html.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)) {
    const tex = m[1] !== undefined ? m[1] : m[2];
    try { katex.renderToString(tex, { throwOnError: true, displayMode: m[1] !== undefined }); }
    catch (e) { err(w, `KaTeX: ${e.message.slice(0, 140)} in ${tex.slice(0, 70)}`); }
  }
  const t = html.replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, "");
  for (const tag of ["p", "ul", "ol", "li", "b", "i", "table", "tr", "td", "pre", "code", "div", "span"]) {
    const o = (t.match(new RegExp(`<${tag}(\\s[^>]*)?>`, "g")) || []).length, c = (t.match(new RegExp(`</${tag}>`, "g")) || []).length;
    if (o !== c) err(w, `<${tag}> opened ${o}× closed ${c}×`);
  }
}
for (const [pid, wk] of Object.entries(window.WALKS)) {
  if (!window.MANIFEST[pid] || !/\.\d+$/.test(pid)) err(pid, "unknown part id");
  if (!Array.isArray(wk.moves) || !wk.moves.length) err(pid, "no moves");
  (wk.moves || []).forEach((mv, i) => {
    moves++;
    if (!mv.line) err(`${pid} move ${i + 1}`, "empty line");
    check(`${pid} move ${i + 1}.line`, mv.line); check(`${pid} move ${i + 1}.why`, mv.why);
    (mv.extra || []).forEach((x, k) => { if (!x.label) err(`${pid} move ${i + 1}`, "extra without label"); check(`${pid} move ${i + 1}.extra[${k}]`, x.html); });
    const words = String(mv.line).replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, " F ").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    if (words > 40) err(`${pid} move ${i + 1}`, `line has ${words} words (keep it to one short line)`);
  });
  if (!wk.start) err(pid, "no start (\"Begin your answer like this\")");
  check(`${pid}.start`, wk.start);
  check(`${pid}.compare`, wk.compare);
}
const parts = Object.keys(window.WALKS).length;
console.log(errors ? `${errors} problem(s)` : `✓ ${parts} parts, ${moves} moves — all math renders, tags balanced, lines short`);
process.exit(errors ? 1 : 0);
