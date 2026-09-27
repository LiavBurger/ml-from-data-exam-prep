# How the walkthroughs must be — the learner's guidelines

These rules come from working through 2025-C Q1.2 together with the learner (severe ADHD, failed Moed B by getting
stuck, knows single-variable calculus and numpy, does NOT own formal ML/math notation). Every rule below exists
because something else failed. The reference implementation is `data/walks/regression.js` (2025-C Q1, parts 1–5).

## 1. The format (chosen by the learner)
- **Question first.** The real exam part is on screen; under it, the solution is revealed one **move** at a time
  ("Show next move" / key N). Moves double as a hint ladder: the learner tries on paper and reveals only when stuck.
- **`start` — "Begin your answer like this".** Revealed before move 1. The **shape of the written answer** in exam
  notation with □ blanks, e.g. "The function: J(θ) = □ / Its derivative by θⱼ: dJ/dθⱼ = □ / The gradient: ∇J(θ) = □".
  It shows form, not content. ("I don't even know how to actually write the notations.")
- **`compare`** — 1–2 sentences under the last move: which move matches which line of the official solution, plus
  any official slip with the corrected value.

## 2. Casual, short, 80–90% of the points
- Aim for what a grader gives points for — the key formula, the right numbers, a one-phrase reason — not full rigor.
  ("Too formal, too strict … I can earn 80 or 90% of the points at the cost of formality.")
- **Few moves:** 2–5 per part. A move = **a bold label + one plain sentence + at most one or two formulas**.
- Labels name the action: **The function**, **Derivative by θⱼ**, **All knobs as a list**, **Select the pieces**,
  **Put it together**, **Errors Xθ − y**, **Line 16** … Last move ends with "Done." or "that's the answer".
- No formal set-up moves ("translate the question", "name the bracket", index bookkeeping).

## 3. Derivations follow the learner's own structure
Like they would write f(x) = (x²+3)², then f′(x) = {solve here}:
1. **The function** — copied from the question. Its why? writes it out with the real table (one bracket per sample).
2. **Rewrite** — only if a real manipulation is needed (splitting, simplifying). Never just to introduce a name.
3. **Derivative by θⱼ** — in their chain-rule pattern: 2 · (…) · (the number in front of θⱼ), i.e. exactly like
   (x²+3)² → 2·(x²+3)·2x, applied to each bracket. Absolute values: |a| → sign(a).
4. **All knobs as a list** — the gradient is that derivative written for θ₀, θ₁, θ₂, one row each.
5. **Select the pieces** — turn the list into matrix form by pointing at pieces (§5).
6. **Put it together** — the answer.
Never jump from the per-knob formula to the matrix form in one move ("'write it short' … feels like magic").

## 3b. Argument / comparison parts follow the learner's template
("It would be better if questions like this would be structured this way: θ* is the best possible θ for the loss
function {} / θ̃ is the best possible θ for the loss function {} / Look at the structure, we can see that … / This is
why …")
1. **"A is the best possible … for …"** — one move per object, each with its defining formula written out.
2. **"Look at the structure, we can see that …"** — select the pieces (colours + braces) that make the difference.
3. **"This is why …"** — the conclusion, as the answer.
The `start` is the same four sentence openers with □ blanks.

## 4. Notation: nothing new unless the exam forces it
- **No new names or variables** (eᵢ, rᵢ, u, bracketᵢ …) unless the official answer itself uses them. ("Why e_i now…
  do we really need more variables and notations.")
- **Refer back with (…)** — "2 · (…) · x" = the same bracket as before, copied as-is. When samples must be told
  apart, say it in words: "sample 1's (…) × sample 1's x₁".
- **Sums:** always show what is inside Σ — everything with an i in it is inside — and write it out for the real
  samples. (Learner read 2Σᵢ xⱼ⁽ⁱ⁾(θᵀx⁽ⁱ⁾ − y⁽ⁱ⁾) as "(Σ xⱼ) × (error)".)
- **A squared norm is a sum of per-sample squares:** apply the chain rule per sample, never to ‖v‖ as a whole
  (learner wrote 2·‖Xθ−y‖·xⱼ).
- **Shorthands are definitions, not steps** — say so, then show it with the real numbers and the numpy equivalent:
  sign(θ) = (sign θ₀, sign θ₁, sign θ₂) = `np.sign(theta)` → (1, −1, 1); θᵀx⁽ⁱ⁾ = the prediction θ₀ + θ₁x₁ + θ₂x₂;
  Xθ − y = `X @ theta - y`.

## 5. "Select the pieces" — the method that works best
("I think it would make more sense to me if we rather 'select' pieces and say 'this part = X', 'this part = Xᵀ'.")
- Colour a piece of the formula, put a brace under it, and say what it equals:
  `\underbrace{\color{#e8912d}(\dots)}_{\textstyle\color{#e8912d}\text{this part = }X\theta - y}`.
- Colours (readable in both themes): orange `#e8912d`, blue `#4c8dff`. Labels at normal size (`\textstyle`) and in the
  piece's colour. Keep labels short so the formula fits.
- Use it for every change of form: sum → matrix, one knob → all knobs, pieces of an answer ("this part = step 4's sums").
- Later moves can refer to the colours: "the orange part 2Xᵀ(Xθ − y)".

## 6. Explanations (why?)
- **Concrete first, formula last.** Start from the real exam table and numbers, in the learner's single-variable
  pattern; only then "the official formula is just this, written short".
- 1–3 short sentences, plus (optional) a small real-numbers table or a numpy line. Analogies welcome.
- **Known facts → the formula sheet.** The learner gets the official formula sheet in the exam and won't derive
  facts there ("I wouldn't figure this out during the exam … I don't know it"). Whenever a move uses a known result,
  point to the exact sheet entry with `[sheet: Entry name]` (renders as a clickable "📄 Formula sheet → Entry name"
  that opens the sheet on the right page; names must match `data/sheet.js` — the checker enforces it), e.g.
  `[sheet: Least squares solution]`, `[sheet: Square error loss gradient]`, `[sheet: Responsibilities update]`.
  Say "you don't need to know this by heart". If the fact is NOT on the sheet, flag it as "🧠 know by heart" — rare.
  Any derivation of such a fact is optional, inside the why?.
- **Never state a known formula as a given.** If a move uses a result like θ̃ = (XᵀX)⁻¹Xᵀy, its why? shows where it comes
  from in the learner's structure (the function → derivative → set = 0 → solve), reusing earlier parts. (Learner:
  "How did we get from (XᵀX)⁻¹Xᵀy to ‖Xθ−y‖²?")
- The why? is for understanding; the next move must be followable without opening it.
- Optional `extra` blocks (collapsed, labelled): "check it with numbers", an official-solution slip, a Moed B trap.

## 7. Layout
- **No sideways scrolling.** Break long formulas with `\begin{aligned}` (≈ 50 characters of math per line); stack
  two formulas vertically, never side by side with ⟹.
- **Multi-row calculations (row · θ for each sample, column · errors, …) go in a small table**, not in a wide aligned formula.
- Explanations for the learner go on the site, where math renders — not in the terminal chat.

## 8. Content rules
- **Real material only — never invented questions.** Exam parts, official solutions (images are authoritative),
  homework, lectures. Worked numbers come from the real exam tables.
- Verify every number with python3/numpy. Flag official slips (in `compare` and an `extra`) with the corrected value.
- Don't re-walk what an earlier part of the same question already did — refer to it ("part 2, step 4").

## 9. File format and validation — `data/walks/<topic>.js`
```js
(function () {
  const R = String.raw;
  window.WALKS = window.WALKS || {};
  Object.assign(window.WALKS, {
    "2025C-q1.2": {
      start: R`<p><b>The function:</b></p>\[J(\theta) = \;\square\]`,
      moves: [
        { line: R`<b>The function</b> — copy it from the question: <div class="formula">\[…\]</div>`,
          why: R`<p>…</p>`,
          extra: [{ label: "check it with numbers", html: R`…` }] },   // extra is optional
      ],
      compare: R`The official solution's last line is move 5.`,
    },
  });
})();
```
HTML inside `R\`…\``; math `\( \)` inline, `\[ \]` display (KaTeX). Never `${`. `&lt;` for `<` inside `<pre><code>`.
Every part needs `start`, `moves`, `compare`. Validate: `node tools/check_walks.js data/walks/<topic>.js` must print ✓.
Then look at it in a browser at ~950 px width: no sideways scrolling anywhere.
