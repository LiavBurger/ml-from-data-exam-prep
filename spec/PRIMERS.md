# Primer cards — "learn the topic first" (read spec/WALKS.md too: same learner, same style law)

## Why
Learner (2026-09-29, starting Linear classification): *"I need to begin by learning the topic before going for the
questions."* They chose short cards over the long reference notes, with two conditions:
- *"I don't want to be 'training' on the exam questions yet. Then I'll have nowhere to do the 'real' practice."*
  → **Cards never use past-exam questions, numbers or tables.** Examples and "try it" come ONLY from the lectures
  (`Lectures/*.pdf`) and homework (`hw*/`). Never invent a question or dataset — if the course material has no
  example for a card, the card has no example.
- *"Things change from exam to exam and new things come up, it's not the same question with different numbers, so
  need not only the exact exam ideas, but general understanding and applications."*
  → Cards cover the **whole topic as taught in the lectures**, not only what past exams asked.

## One card = one idea, read in ~2 minutes
Fields (data/primers/<topic>.js):
- `title` — the idea, 2–5 words.
- `what` — the idea in plain words, ≤ 120 words, casual (WALKS.md §2), concrete first. What it is, what it's for,
  how it connects to the previous card. No new notation unless the course uses it.
- `formula` (optional) — the one formula to hold on to, with `[sheet: Exact Name]` if it's on the formula sheet.
- `remember` (optional) — a fact to bring from memory (not on the sheet in this form) — renders as the purple
  "🧠 Remember from class" box (WALKS.md §6b).
- `example` (optional) — `{ src: "Lecture ML05, slide 'Gradient of BCE Loss'" | "HW3 Q6", html }`: a worked example
  from that source, in the learner's step style (the function → derivative by one weight → matrices → stack, for
  gradients: WALKS.md §3; select the pieces; size checks on matrix steps §4b). Short.
- `try` (optional) — `{ src, q, a }`: a small exercise from the lectures/HW with its answer (answer hidden until clicked).
- `mistakes` (optional) — 1–2 classic traps, one line each (e.g. "labels are 0/1 in LoR but ±1 in the Perceptron").
- `where` — which exam parts use this idea, as ids only (e.g. "2025-A Q4.1"), no content from them.
Total visible text (what + formula + remember) ≤ 150 words; example/try/mistakes are collapsed.

## Style (all of WALKS.md applies)
Casual, short, no fluff, (…) for brackets, never name a bracket (rᵢ, eᵢ), matrix steps get size checks, gradients
follow §3 (one weight → matrices with only the constant highlighted → stack). KaTeX `\( \)` `\[ \]`, HTML in String.raw.
Every card is self-contained (a pointer to another card may be added, never replace the explanation).
