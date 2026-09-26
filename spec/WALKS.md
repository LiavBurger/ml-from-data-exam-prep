# Walkthroughs ("Show next move") — writing standard

The learner has **severe ADHD**. Long notes failed ("too much on the screen", "can't hold earlier parts"); compressed
notes failed ("jumpy"). They tried three prototypes and chose **B — question first, teach just in time**:
the real exam part is on screen, and its solution is built in small **moves** revealed one at a time
("Show next move" / key N). Each move is **one line**; the explanation sits behind a **why?** expander.
Reference implementation (content + tone): `prototypes/b-question-first.html` (2025-C Q1.2, 10 moves).

The same moves double as a **hint ladder**: on later questions the learner tries the part on paper and reveals
moves only when stuck. So move 1 must already be useful on its own (the first move), and each move must make
sense with only the earlier moves visible above it.

## Rules
1. **One move = one action, one line.** ≤ ~25 words plus at most one formula or one calculation line.
   Start with a verb: "Write…", "Name…", "Compute…", "Differentiate…", "Compare…". No paragraphs in the line.
2. **Moves build the exam answer.** The final move(s) are what the learner writes on the exam paper.
   3–12 moves per part, roughly scaled to points. Long computations: one move per entry/row, with the full
   chain on that line (e.g. `(1,−1,1)·(1,−2,3) = 1·1 + (−1)·(−2) + 1·3 = 1 + 2 + 3 = 6`).
3. **why? = the teaching.** Plain words first, then the symbol, then (if needed) a small worked chain. Short
   paragraphs, `<b>` lead-ins ("The picture.", "Why X…"). Explain every factor of a compound expression.
   Point to the long reference notes when useful: "(Regression note 5)". The why? must never be required
   to follow the *next line* — it is for understanding, not for continuity.
4. **Optional extras** (`extra`: collapsed, labelled): e.g. "see it with the numbers", a trap, a slip in the
   official solution. Keep traps from the learner's Moed B where relevant (`data/content.js` `mine` entries).
5. **compare** (1–2 sentences, shown with the official solution): which move matches which line of the
   official solution; flag any official slip with the corrected value.
6. **Real material only — never invent questions.** Everything comes from the real exam part, its official
   solution (images are authoritative), homework, lectures. Verify every number with python3/numpy.
7. **Don't repeat what a previous part already walked through** in full: refer to it ("as in part 2, move 9").

## File format — `data/walks/<topic>.js`
```js
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {
    "2025C-q1.2": {
      moves: [
        { line: R`Translate the question: …`, why: R`<p><b>The picture.</b> …</p>`,
          extra: [{ label: "see it with 2025-C's numbers", html: R`…` }] },   // extra is optional
        …
      ],
      compare: R`Its first line is your move 8; its last line is your move 10.`,
    },
  });
})();
```
HTML inside `R\`…\``; math `\( \)` inline, `\[ \]` display (KaTeX; use `\begin{aligned}` to break long chains —
the page must fit a laptop without sideways scrolling). Never `${`. `&lt;` for `<` inside `<pre><code>`.
Validate: `node tools/check_walks.js data/walks/<topic>.js` must print ✓.
