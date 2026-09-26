#!/usr/bin/env node
// Validate a notes file: loads it, renders every \( \) / \[ \] with KaTeX (throwOnError),
// checks hint keys exist in the manifest, and flags unbalanced HTML tags.
// Usage: node tools/check_notes.js data/notes/regression.js
const path = require("path"), fs = require("fs");
const root = path.dirname(__dirname);
global.window = {};
const katex = require(path.join(root, "vendor/katex.min.js"));
require(path.join(root, "data/manifest.js"));
const file = path.resolve(process.argv[2]);
require(file);
const [topic] = Object.keys(window.NOTES);
const N = window.NOTES[topic];
let errors = 0;
const err = (where, msg) => { errors++; console.log(`✗ ${where}: ${msg}`); };
function checkHtml(where, html) {
  if (typeof html !== "string") return;
  for (const m of html.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)) {
    const tex = m[1] !== undefined ? m[1] : m[2];
    try { katex.renderToString(tex, { throwOnError: true, displayMode: m[1] !== undefined }); }
    catch (e) { err(where, `KaTeX: ${e.message.slice(0, 160)}  in  ${tex.slice(0, 80)}`); }
  }
  const noMath = html.replace(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g, "");
  for (const tag of ["p", "ul", "ol", "li", "b", "i", "table", "tr", "td", "th", "pre", "code", "h5", "div", "span"]) {
    const open = (noMath.match(new RegExp(`<${tag}(\\s[^>]*)?>`, "g")) || []).length;
    const close = (noMath.match(new RegExp(`</${tag}>`, "g")) || []).length;
    if (open !== close) err(where, `<${tag}> opened ${open}× closed ${close}×`);
  }
  const code = [...noMath.matchAll(/<pre><code>([\s\S]*?)<\/code><\/pre>/g)].map(x => x[1]).join("\n");
  if (/<(?!\/?(b|i|span)\b)[^>]*$/m.test(code) && /[^-]<[^/bis]/.test(code.replace(/&lt;/g, ""))) err(where, "raw '<' inside <pre><code> — use &lt;");
}
checkHtml("intro", N.intro);
(N.moves || []).forEach((mv, i) => {
  const w = `move ${i} (${String(mv.title).slice(0, 40)})`;
  for (const k of ["title", "idea", "example", "cue", "first", "recipe", "trap"]) checkHtml(`${w}.${k}`, mv[k]);
  (mv.notation || []).forEach((r, j) => r.forEach(c => checkHtml(`${w}.notation[${j}]`, c)));
  if (mv.table) { mv.table.head.forEach(c => checkHtml(`${w}.table.head`, c)); mv.table.rows.forEach(r => r.forEach(c => checkHtml(`${w}.table`, c))); }
});
for (const [qid, parts] of Object.entries(N.hints || {})) {
  if (!window.MANIFEST[qid]) err(`hints.${qid}`, "unknown question id");
  for (const [p, h] of Object.entries(parts)) {
    if (!window.MANIFEST[`${qid}.${p}`]) err(`hints.${qid}.${p}`, "unknown part");
    checkHtml(`hints.${qid}.${p}`, h);
  }
}
console.log(errors ? `${errors} problem(s) in ${topic}` : `✓ ${topic}: ${(N.moves || []).length} notes, ${Object.values(N.hints || {}).reduce((s, p) => s + Object.keys(p).length, 0)} hints — all math renders, tags balanced`);
process.exit(errors ? 1 : 0);
