# Walkthroughs ("Show next move") — writing standard

## CASUAL MODE (current — overrides the older rules below where they conflict)

Learner, after trying the 10-move formal version of 2025-C Q1.2: "The extremely high level math notation is killing
me. This is too formal, too strict. I need it more 'casual', in a way that's much shorter and I can earn 80 or 90% of
the points at the cost of formality … The 10 steps are mostly mathematical jargon which is simply not the requirement
… I need to find the method that works for me to study from and be in control rather than die in the details."

- **Aim for 80–90% of the points, not full rigor.** Keep only what a grader gives points for: the key formula, the
  right numbers, a one-phrase reason. Drop formal set-up lines ("translate the question", "name the bracket",
  "differentiate one residual", index bookkeeping).
- **2–4 moves per part** (at most ~5 for long code/bug parts). Each move = one plain-language instruction + the short
  line to write, e.g. "Penalty part → λ·sign(θ)". The last move ends with "Done." / "That's the answer".
- **Casual notation:** words where possible ("errors", "predictions − labels", "each column · errors", "sum over
  samples"), and only the standard short symbols the exam itself uses (X, y, θ, Xᵀ, λ, sign). No ∂-fraction chains,
  no Σ with limits, no (i) superscripts unless the exam answer needs them.
- **why? = 1–3 casual sentences** (an analogy is welcome). Numbers in a why? are the short chain, not every product.
- **start** stays: the answer's shape on paper with □ blanks.
- **Sums:** whenever an official answer has a Σ, show what is inside it — put big brackets around the whole summand and
  write it out term by term for the real number of samples. Learner misread 2Σᵢ xⱼ⁽ⁱ⁾(θᵀx⁽ⁱ⁾ − y⁽ⁱ⁾) as
  "(Σ xⱼ) × (error)". Rule to state: *everything with an i in it is inside the sum.* Prefer a per-sample table with real numbers.
- **Chain rule on a squared norm:** ‖v‖² is a sum of per-sample squares; apply "2 · stuff · (derivative of stuff)"
  per sample, never to ‖v‖ as a whole (learner wrote 2·‖Xθ−y‖·xⱼ).
- **Explain the way the learner thinks: concrete first, formula last.** Learner: "If I had to get the derivative of
  (x²+3)² I'd write 2·(x²+3)·2x — I don't see that structure here." What worked: write the loss out with the REAL
  table (one bracket per sample, real numbers), apply their single-variable pattern to each bracket, add up, check
  with real θ — and only then say "the official formula is just this, written short". Never lead with Σ/index notation.
- **Every derivation part has the learner's structure** (they asked for it: "show the function that I want to do the
  derivative beforehand, and any manipulations we do to it before starting the derivation — like f(x) = (x²+3)², then
  f'(x) = {solve here}"):
  1. **The function** — copied from the question, labelled "The function"; the why? writes it out with the real data.
  2. **Rewrite** — only if a real manipulation is needed (splitting, simplifying) — never just to introduce a new name.
  3. **Derivative** — "dJ/dθⱼ = …" using the chain rule on the rewritten pieces.
  4. **Write it short** — the compact/official form = the answer.
  The `start` shows "The function: … = □" and "Its derivative: … = □".
- **No new names or variables** (e.g. eᵢ, rᵢ, u) unless the official answer itself uses them. Keep brackets verbatim,
  exactly as the question writes them. Learner: "why e_i now.. do we really need more variables and notations".
- **No sideways scrolling.** Break every long formula over lines with `\begin{aligned}` (≤ ~50 characters of math per line); put two formulas under each other, never side by side with ⟹.
- Reference model: `data/walks/regression.js` (2025-C Q1, casual rewrite).

---

## Older rules (still apply unless the casual mode says otherwise)

The learner has **severe ADHD**. Long notes failed ("too much on the screen", "can't hold earlier parts"); compressed
notes failed ("jumpy"). They tried three prototypes and chose **B — question first, teach just in time**:
the real exam part is on screen, and its solution is built in small **moves** revealed one at a time
("Show next move" / key N). Each move is **one line**; the explanation sits behind a **why?** expander.
Reference implementation (content + tone): `prototypes/b-question-first.html` (2025-C Q1.2, 10 moves).

The same moves double as a **hint ladder**: on later questions the learner tries the part on paper and reveals
moves only when stuck. So move 1 must already be useful on its own (the first move), and each move must make
sense with only the earlier moves visible above it.

## Rules
0. **`start` — "Begin your answer like this".** Revealed *before* move 1. The learner said: "I'm having problems
   writing down on the paper as I don't even know how to actually write the notations." So `start` shows how the
   written answer **looks on paper**: its opening line(s) in exam notation, with `\square` blanks for what they must
   fill in (e.g. `\[\frac{\partial J_\lambda}{\partial\theta_j} = \;\square\]`), and — if useful — the shape of the
   final line. It must not give away the content of the answer, only its form.
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
      start: R`\[\frac{\partial J_\lambda}{\partial \theta_j} = \;\square\]`,   // "Begin your answer like this"
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
