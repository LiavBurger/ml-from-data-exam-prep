# Writing standard for the topic notes

The reader is a CS student who **failed Moed B with 35/100** by getting *stuck*: they know the math tools
(derivatives incl. chain rule, Σ notation, vectors & dot products, matrix × vector, transpose) but they do
**not** yet understand the ML ideas or the notation, and compressed explanations lose them. They are
comfortable only with decision trees. They have ADHD: long is fine, *jumping* is not. The goal is exam level:
after the notes they must be able to solve the real exam questions themselves.

## The learner's own feedback (the reason this guide exists)

> "It's jumping and not thorough enough at places."
> "'Why a column of ones?' comes very randomly. Starts with a question — what column of ones are you even
> talking about? … it's out of the blue and makes no progressive sense."
> "In the worked example you're simply saying Xθ = [1+2+3, 1+4+0, 1−2+9, 1+0+3] = [6,5,8,4] — it would've
> been nicer to simply write down the entire chain, for my clarity and flow, instead of 'wait what? ohh...'"
> "The 'Weighted variant' is so dull and unclear… just needs a bit more to it."
> Earlier: "It's too short, too explicit. It assumes I instantly have an absolute, complete understanding."

## Rules

1. **Progressive, never out of the blue.** Every paragraph follows from the previous one. Introduce an object
   *before* talking about it; never open with a question about something not yet shown. Pattern:
   *where we are → what we want → the problem → the idea that solves it → the notation for it*.
2. **Plain words first, symbols second.** Say what a thing *is* and *why we want it* before any formula.
   Every symbol is decoded (in the note's Symbols table or inline) the first time it appears.
3. **Full chains in every calculation.** Write the expression, substitute the numbers, show every product
   and sum, then the result — e.g. `(1,−1,1)·(1,−2,3) = 1·1 + (−1)·(−2) + 1·3 = 1 + 2 + 3 = 6`, one line per
   vector entry. Never jump from a formula to a number. The reader should never think "wait, where did that come from?"
4. **Variants get the full treatment.** A variant (ridge, LASSO, weighted, probit, a different linkage, a
   cost matrix …) gets: why it exists → what exactly changes → a worked example with numbers. Never a one-liner.
5. **Small labelled steps.** Break ideas into `<h5>Step 1 — …</h5>` style mini-headings, short paragraphs,
   lists. No walls of text, no giant formula without a sentence around it.
6. **Real material only — never invent questions.** Worked examples use the data and official solutions of
   *real* exam questions (preferably the topic's **guided question**, the first question in the topic),
   homework, or lecture slides. You may show intermediate steps the official solution skips, but do not
   create new exercises or "try this" questions. Say which exam/part a number comes from.
7. **Verify every number** with Python (numpy) before writing it. If an official solution contains a slip,
   say so plainly in the note (and in the part's hint), with the corrected value.
8. **Exam-level.** Cover every kind of part that appears in the topic's real questions; after the idea and
   example, the *On the exam* fields say how the exam phrases it, the first line to write, the recipe, and the trap.
9. **Explain every factor of a compound expression.** For something like \((Xw-y)^\top\Gamma(Xw-y)\), say what *each*
   factor contributes and show the simpler expression it generalizes (here: \(r^\top r\) = "each residual times itself",
   with \(\Gamma\) slipped in between). Learner feedback: "we multiply the residuals by weights … then why do we multiply by
   the residuals again?"
10. **Traps from Moed B** where relevant (the learner's actual mistakes are listed in `../MISSION.md` and in
   the `mine` entries of `data/content.js`).

## Reference standard

`data/notes/regression.js`, **note 1** ("Put the table into matrix form") is the model rewrite that fixes the
feedback above. Match its progression, its full calculation chains, and its treatment of the weighted variant.

## File format (`data/notes/<topic>.js`)

```js
// Notes for topic "<topic>". Written to spec/STYLE.md. Loaded before data/content.js.
(function () {
  const R = String.raw;
  window.NOTES = window.NOTES || {};
  window.NOTES["<topic>"] = {
    intro: R`<p>…what this exam question family is, which parts repeat, how to use the notes…</p>`,
    moves: [                       // the notes, in reading order; title starts "0 · ", "1 · ", …
      { title: "1 · …",            // plain string; math inside titles needs double backslashes: "\\(X\\)"
        idea: R`…`,                // In plain words (HTML). Use <h5>Step 1 — …</h5> for steps.
        notation: [[R`\(X\)`, R`meaning`], …],   // Symbols table
        example: R`…`,             // Worked example (HTML), full chains, real numbers
        cue: R`…`, first: R`…`, recipe: R`…`, table: { head: [...], rows: [[...]] }, trap: R`…`,  // On the exam (all optional)
      },
    ],
    hints: {                       // "Stuck? Show the first move" — one per part, for EVERY part of EVERY question in the topic
      "2025C-q1": { 1: R`…`, 2: R`…` },
    },
  };
})();
```

- HTML inside `R\`…\`` (String.raw): `<p> <ul> <ol> <li> <b> <i> <h5> <code> <pre><code> <table>` (wrap tables in `<div class="tw">`).
- Math: `\( … \)` inline, `\[ … \]` display, KaTeX syntax (`\begin{bmatrix}…\end{bmatrix}`, `\dfrac`, `\mathrm{sign}`).
- Never write `${` inside a template. Inside `<pre><code>` write `&lt;` for `<`.
- A hint is 1–3 sentences: the first move for that part (not the full answer), may point to a note ("note 3").
- Validate with `node tools/check_notes.js data/notes/<topic>.js` (KaTeX renders, tags balanced, part ids exist). Must print ✓.
