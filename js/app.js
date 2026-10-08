/* ML Exam C study site — rendering, routing and saved progress (localStorage).
   Structure: topic → whole exam questions → parts (each part marked Got it / Shaky / Failed). */
(function () {
  "use strict";
  const M = window.MANIFEST, TOPICS = window.TOPICS, CODE = window.CODE, MOEDB = window.MOEDB || {};
  const NOTES = window.NOTES || {};
  const notesOf = t => NOTES[t.id] || { intro: t.intro || "", moves: [], hints: {} };
  const WALKS = window.WALKS || {};
  const PRIMERS = window.PRIMERS || {};
  const TOPIC_NAMES = { "Regression": "regression", "Linear classification": "linclass", "Max-margin, SVM & kernels": "svm",
    "SVM": "svm", "Bayes": "bayes", "Clustering": "clustering", "GMM & EM": "gmm", "GMM": "gmm", "Decision trees": "trees", "Trees": "trees" };
  const KEY = "ml_examc_v1";
  const MARKS = { got: "Got it", shaky: "Shaky", fail: "Failed" };

  // ── storage ──────────────────────────────────────────────────────────────
  function load() {
    try { return Object.assign({ marks: {}, code: {}, walk: {} }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return { marks: {}, code: {}, walk: {} }; }
  }
  let state = load();
  state.walk = {}; // revealed steps are per visit: every question opens fully closed (learner: "Nothing should be open by default")
  let lastQ = null;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ } }

  // ── helpers ──────────────────────────────────────────────────────────────
  const $ = (sel, el) => (el || document).querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function examOf(qid) { const m = /^(\d{4})([ABC])-q(\d+)$/.exec(qid); return { year: m[1], moed: m[2], q: +m[3] }; }
  const qLabel = qid => { const e = examOf(qid); return `${e.year}-${e.moed} · Question ${e.q}`; };
  const pLabel = pid => { const [qid, p] = pid.split("."); const e = examOf(qid); return `${e.year}-${e.moed} · Q${e.q}.${p}`; };
  function partsOf(qid) {
    return Object.keys(M).filter(k => k.startsWith(qid + ".")).map(k => +k.slice(qid.length + 1)).sort((a, b) => a - b);
  }
  const qPoints = qid => partsOf(qid).reduce((s, p) => s + (M[`${qid}.${p}`].bonus ? 0 : M[`${qid}.${p}`].pts), 0);
  function qProgress(qid) {
    const ps = partsOf(qid);
    return { done: ps.filter(p => state.marks[`${qid}.${p}`]).length, total: ps.length };
  }
  function topicProgress(t) {
    const done = t.questions.filter(q => { const p = qProgress(q.id); return p.done === p.total; }).length;
    return { done, total: t.questions.length };
  }
  const findQ = qid => { for (const t of TOPICS) for (const q of t.questions) if (q.id === qid) return { t, q }; return null; };
  function math(el) {
    if (window.renderMathInElement) renderMathInElement(el, {
      delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }],
      throwOnError: false,
    });
  }
  const img = (src, alt) => src ? `<img src="${src}" alt="${esc(alt)}" loading="lazy">` : "";

  // ── sidebar ──────────────────────────────────────────────────────────────
  function renderSide(activeTopic) {
    $("#side").innerHTML = `
      <a class="brand" href="#/">ML from Data<span>Exam C prep</span></a>
      <a class="nav-t nav-day ${activeTopic === "day" ? "on" : ""}" href="#/day"><span class="num">📅</span><span class="nt">Last day plan</span></a>
      <a class="nav-t nav-day ${activeTopic === "memo" ? "on" : ""}" href="#/memo"><span class="num">🧠</span><span class="nt">Memory sheet</span></a>
      <nav>${TOPICS.map(t => {
        const p = topicProgress(t), pct = p.total ? Math.round(100 * p.done / p.total) : 0;
        return `<a class="nav-t ${t.id === activeTopic ? "on" : ""}" href="#/t/${t.id}">
          <span class="num">${t.num}</span><span class="nt">${esc(t.title)}</span>
          ${t.noQuestions ? "" : `<span class="bar"><i style="width:${pct}%"></i></span><span class="cnt" title="questions finished">${p.done}/${p.total}</span>`}
        </a>`;
      }).join("")}</nav>
      <div class="side-foot">
        <button id="sheetbtn">📄 Formula sheet</button>
        <button id="theme">${document.documentElement.dataset.theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}</button>
        <button id="export">Download progress backup</button>
        <label class="imp">Restore backup<input type="file" id="import" accept="application/json"></label>
      </div>`;
    $("#sheetbtn").onclick = () => openSheet(null);
    $("#theme").onclick = () => {
      const cur = document.documentElement.dataset.theme || "dark";
      document.documentElement.dataset.theme = cur === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY + "_theme", document.documentElement.dataset.theme); } catch (e) {}
      $("#theme").textContent = document.documentElement.dataset.theme === "light" ? "🌙 Dark mode" : "☀️ Light mode";
    };
    $("#export").onclick = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 1)], { type: "application/json" }));
      a.download = "ml-examc-progress.json"; a.click();
    };
    $("#import").onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(txt => { state = Object.assign({ marks: {}, code: {}, walk: {} }, JSON.parse(txt)); save(); route(); });
    };
  }

  // ── home ─────────────────────────────────────────────────────────────────
  function renderHome() {
    const retest = Object.entries(state.marks).filter(([, v]) => v.m !== "got").sort((a, b) => b[1].t - a[1].t);
    const total = TOPICS.reduce((s, t) => s + t.questions.length, 0);
    $("#main").innerHTML = `
      <a class="card daylink" href="#/day"><b>📅 Today: your last-day plan →</b><span class="muted">One timed exam, fix the ⭐ parts, the 8 templates from memory, the homework, sleep.</span></a>
      <header class="page-h"><h1>Pass Exam C</h1>
        <p class="lede">Answer 4 of 5 questions, 25 points each; 60 passes. In Moed B you weren't short on time — you got stuck. This site has all ${total} real questions from the 5 past exams, each one whole, grouped by the kind of question it is.</p></header>

      <section class="card how"><h2>Each study session (about 25 minutes, then a 5-minute break)</h2>
        <ol>
          <li><b>Retest first</b> (≈5 min): redo one or two parts below that you marked Failed or Shaky.</li>
          <li><b>Open the next question</b> in the topic you're on. Work each part <b>on paper</b>.</li>
          <li>Stuck? Press <b>Show next move</b> (or <kbd>N</kbd>) — one small step at a time, <i>why?</i> only if a line isn't clear.</li>
          <li>Check the official solution and mark yourself honestly. When the 25 minutes are up, stop at the end of the part.</li>
        </ol></section>

      <section class="card"><h2>Retest first</h2>
        ${retest.length ? `<ul class="retest">${retest.map(([pid, v]) => {
          const qid = pid.split(".")[0], f = findQ(qid);
          return `<li><span class="pill ${v.m}">${MARKS[v.m]}</span> <a href="#/q/${qid}/${pid.split(".")[1]}">${esc(pLabel(pid))}</a>${f ? ` <span class="muted">— ${esc(f.t.title)}</span>` : ""}</li>`;
        }).join("")}</ul>` : `<p class="muted">Nothing yet — parts you mark Failed or Shaky show up here.</p>`}</section>

      <section class="card stuck"><h2>When you're stuck</h2>
        <ol>${window.STUCK_PROTOCOL.map(s => `<li>${s}</li>`).join("")}</ol></section>

      <section class="card"><h2>Topics, in order</h2>
        <ol class="order">${TOPICS.map(t => `<li><a href="#/t/${t.id}">${esc(t.title)}</a> <span class="muted">— ${t.blurb}${t.questions.length ? ` (${t.questions.length} questions)` : ""}</span></li>`).join("")}</ol></section>`;
    math($("#main"));
  }

  // ── notes (reference) ────────────────────────────────────────────────────
  function noteHtml(mv, i, open) {
    const exam = mv.cue || mv.first || mv.recipe || mv.table || mv.trap;
    return `
      <details class="move" id="note-${i}" ${open ? "open" : ""}>
        <summary>${mv.title}</summary>
        ${mv.idea ? `<h4>In plain words</h4><div class="idea">${mv.idea}</div>` : ""}
        ${mv.notation ? `<h4>Symbols</h4><div class="tw"><table class="notation"><tbody>${mv.notation.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody></table></div>` : ""}
        ${mv.example ? `<h4>Worked example</h4><div class="example">${mv.example}</div>` : ""}
        ${exam && mv.idea ? `<h4>On the exam</h4>` : ""}
        ${mv.cue ? `<p><span class="tag cue">You'll see</span> ${mv.cue}</p>` : ""}
        ${mv.first ? `<p><span class="tag first">First line</span> ${mv.first}</p>` : ""}
        ${mv.recipe ? `<div class="recipe">${mv.recipe}</div>` : ""}
        ${mv.table ? `<div class="tw"><table><thead><tr>${mv.table.head.map(h => `<th>${h}</th>`).join("")}</tr></thead>
          <tbody>${mv.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}
        ${mv.trap ? `<p class="trap"><span class="tag trapt">Trap</span> ${mv.trap}</p>` : ""}
        <button class="close-note">▲ Close this note</button>
      </details>`;
  }
  // "Regression note 5" -> index of the note whose title starts with "5 ·"
  function noteIndex(topicId, n) {
    const t = TOPICS.find(x => x.id === topicId); if (!t) return -1;
    return (notesOf(t).moves || []).findIndex(mv => String(mv.title).trim().startsWith(n + " ·"));
  }
  function linkNotes(html) {
    html = String(html).replace(/\[sheet: ([^\]]+)\]/g, (m, name) =>
      `<a href="#" class="sheetref" data-name="${esc(name)}">📄 Formula sheet → ${esc(name)}</a>`);
    const names = Object.keys(TOPIC_NAMES).sort((a, b) => b.length - a.length).map(n => n.replace(/[.*+?^()|[\]\\]/g, "\\$&"));
    return String(html).replace(new RegExp(`\\b(${names.join("|")}) notes? (\\d+)`, "g"),
      (m, name, n) => `<a href="#" class="noteref" data-t="${TOPIC_NAMES[name]}" data-n="${n}">${m}</a>`);
  }
  // open one reference note on top of the current page, so you never lose your place
  function openNote(topicId, n) {
    const t = TOPICS.find(x => x.id === topicId), i = noteIndex(topicId, n);
    if (!t || i < 0) return;
    let dlg = $("#notedlg");
    if (!dlg) { dlg = document.createElement("dialog"); dlg.id = "notedlg"; document.body.appendChild(dlg); }
    dlg.innerHTML = `<div class="dlg-h"><span class="kicker">${esc(t.title)} · reference note</span><button class="dlg-x" aria-label="Close">✕ Close</button></div>
      ${noteHtml(notesOf(t).moves[i], i, true)}`;
    const close = () => dlg.close();
    $(".dlg-x", dlg).onclick = close; $(".close-note", dlg).onclick = close;
    dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
    math(dlg); dlg.showModal(); dlg.scrollTop = 0;
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("a.noteref"); if (!a) return;
    e.preventDefault(); openNote(a.dataset.t, +a.dataset.n);
  });
  // the official formula sheet, on top of the current page (you get it in the exam)
  function openSheet(name) {
    const S = window.SHEET; if (!S) return;
    const where = name ? S.index[name] : null;
    let dlg = $("#notedlg");
    if (!dlg) { dlg = document.createElement("dialog"); dlg.id = "notedlg"; document.body.appendChild(dlg); }
    const page = (src, id) => `<div class="sheetpage" id="${id}"><img src="${src}" alt="formula sheet page"></div>`;
    dlg.innerHTML = `<div class="dlg-h sheet-h"><div><span class="kicker">📄 Formula sheet — you get this in the exam</span>
        ${name ? `<p class="lookfor">Look for: <b>${esc(name)}</b>${where ? ` <span class="muted">(${where.startsWith("ext") ? "extension, " : ""}page ${where.split("-")[1]})</span>` : ""}</p>` : ""}</div>
        <button class="dlg-x" aria-label="Close">✕ Close</button></div>
      ${S.pages.map((src, i) => page(src, "sheet-" + (i + 1))).join("")}
      <details class="more" ${where && where.startsWith("ext") ? "open" : ""}><summary>Extension to the formula sheet (only for eligible students)</summary>
        ${S.ext.map((src, i) => page(src, "ext-" + (i + 1))).join("")}</details>`;
    $(".dlg-x", dlg).onclick = () => dlg.close();
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    dlg.showModal(); dlg.scrollTop = 0;
    if (where) { const el = dlg.querySelector("#" + where); if (el) setTimeout(() => el.scrollIntoView({ block: "start" }), 50); }
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("a.sheetref"); if (!a) return;
    e.preventDefault(); openSheet(a.dataset.name);
  });

  // ── topic ────────────────────────────────────────────────────────────────
  function renderTopic(t, openNoteIdx) {
    const N = notesOf(t);
    const notes = (N.moves || []).map((mv, i) => noteHtml(mv, i, i === openNoteIdx)).join("");
    const qs = t.questions.map((q, i) => {
      const p = qProgress(q.id), mb = MOEDB[q.id];
      return `<a class="qcard ${p.done === p.total ? "done" : ""}" href="#/q/${q.id}">
        <div class="qn">${i + 1}</div>
        <div class="qb"><div class="qt">${qLabel(q.id)} ${mb !== undefined ? `<span class="mb">Moed B · you scored ${mb}/25</span>` : ""}</div>
          <div class="qs">${esc(q.summary)}</div>
          <div class="qm muted">${partsOf(q.id).length} parts · ${qPoints(q.id)} pts${p.done ? ` · ${p.done}/${p.total} parts checked` : ""}</div></div>
      </a>`;
    }).join("");
    $("#main").innerHTML = `
      <header class="page-h"><div class="kicker">Topic ${t.num}</div><h1>${esc(t.title)}</h1>
        <p class="lede">${t.blurb}</p>
        ${t.questions.length ? `<p>Open question 1 and work it part by part. Under each part, <b>Show next move</b> reveals the solution one small step at a time — try it on paper first, and reveal a move only when you need it.</p>` : (t.intro || "")}</header>
      ${PRIMERS[t.id] ? `<section><h2 class="sec">Learn it first <span class="muted">— short cards from the lectures and homework, no exam questions; one at a time</span></h2><div class="primer" data-t="${t.id}"></div></section>` : ""}
      ${t.questions.length ? `<section><h2 class="sec">Questions <span class="muted">— in this order, each one start to finish</span></h2>${qs}</section>` : ""}
      ${notes ? `<section><details class="refnotes" ${openNoteIdx !== undefined ? "open" : ""}><summary>Reference notes <span class="muted">— optional, ${(N.moves || []).length} long notes; a move's <i>why?</i> links straight to the one you need</span></summary>
        ${N.intro ? `<div class="refintro">${N.intro}</div>` : ""}${notes}</details></section>` : ""}`;
    const pbox = $("#main .primer"); if (pbox) primerShow(pbox, (state.primer || {})[t.id] || 0);
    math($("#main"));
    $("#main").querySelectorAll(".close-note").forEach(b => b.addEventListener("click", () => {
      const d = b.closest("details");
      d.open = false;
      d.scrollIntoView({ block: "start" });   // keep your place: land on the note's title, not further down the page
    }));
    if (openNoteIdx !== undefined) { const el = document.getElementById("note-" + openNoteIdx); if (el) el.scrollIntoView({ block: "start" }); }
  }

  // ── primer cards: learn the topic before the questions, one card at a time ─
  function primerCard(c, i, n) {
    return `<article class="pcard">
      <div class="pcard-h"><span class="pnum">Card ${i + 1} of ${n}</span><h3>${c.title}</h3></div>
      <div class="pwhat">${linkNotes(c.what)}</div>
      ${c.formula ? `<div class="formula">${linkNotes(c.formula)}</div>` : ""}
      ${c.remember ? `<div class="remember"><span class="rtag">🧠 Remember this for the exam!</span>${linkNotes(c.remember)}</div>` : ""}
      ${c.example ? `<details class="more"><summary>Example <span class="muted">— ${esc(c.example.src)}</span></summary><div class="depth">${linkNotes(c.example.html)}</div></details>` : ""}
      ${c.try ? `<div class="ptry"><div class="ptry-h">✍ Try it <span class="muted">— ${esc(c.try.src)}</span></div>${linkNotes(c.try.q)}
        <details class="more"><summary>Show answer</summary><div class="depth">${linkNotes(c.try.a)}</div></details></div>` : ""}
      ${c.mistakes ? `<details class="more"><summary>Classic mistakes</summary><div class="depth">${linkNotes(c.mistakes)}</div></details>` : ""}
      ${(c.where || []).length ? `<p class="muted pwhere">Shows up in: ${c.where.map(esc).join(" · ")}</p>` : ""}
    </article>`;
  }
  function primerShow(box, i) {
    const cards = PRIMERS[box.dataset.t], n = cards.length;
    i = Math.max(0, Math.min(i, n - 1));
    state.primer = state.primer || {}; state.primer[box.dataset.t] = i; save();
    box.innerHTML = `
      <div class="pdots">${cards.map((c, k) => `<button class="pdot ${k === i ? "on" : ""} ${k < i ? "seen" : ""}" data-k="${k}" title="${esc(c.title.replace(/<[^>]+>|\\[()]/g, ""))}">${k + 1}</button>`).join("")}</div>
      ${primerCard(cards[i], i, n)}
      <div class="pnav">
        <button class="linkbtn pprev" ${i ? "" : "disabled"}>← Previous</button>
        ${i < n - 1 ? `<button class="primary pnext">Next card →</button>` : `<span class="muted">That's the whole topic — now the questions below, in order.</span>`}
      </div>`;
    math(box);
    box.querySelectorAll(".pdot").forEach(b => b.onclick = () => { primerShow(box, +b.dataset.k); box.scrollIntoView({ block: "start" }); });
    const pp = $(".pprev", box), pn = $(".pnext", box);
    if (pp) pp.onclick = () => { primerShow(box, i - 1); box.scrollIntoView({ block: "start" }); };
    if (pn) pn.onclick = () => { primerShow(box, i + 1); box.scrollIntoView({ block: "start" }); };
  }

  // ── question ─────────────────────────────────────────────────────────────
  function renderQuestion(qid, focusPart) {
    const f = findQ(qid); if (!f) { renderHome(); return; }
    const { t, q } = f, stem = M[qid] || {}, idx = t.questions.indexOf(q);
    const prev = t.questions[idx - 1], next = t.questions[idx + 1], mb = MOEDB[qid];
    const hints = notesOf(t).hints || {};
    const parts = partsOf(qid).map(p => partCard(qid, p, Object.assign({}, (q.parts || {})[p] || {}, (hints[qid] || {})[p] ? { move: hints[qid][p] } : {}))).join("");
    $("#main").innerHTML = `
      <header class="page-h"><div class="kicker"><a href="#/t/${t.id}">Topic ${t.num} · ${esc(t.title)}</a> · question ${idx + 1} of ${t.questions.length}</div>
        <h1>${qLabel(qid)}</h1>
        <p class="lede">${esc(q.summary)}</p>
        <p class="muted">${partsOf(qid).length} parts · ${qPoints(qid)} points${mb !== undefined ? ` · <b class="mbt">Moed B: you scored ${mb}/25</b>` : ""}</p></header>
      <section class="card setup"><div class="img">${img(stem.stem, "question setup")}</div></section>
      ${parts}
      <nav class="qnav">
        ${prev ? `<a href="#/q/${prev.id}">← ${qLabel(prev.id)}</a>` : `<span></span>`}
        <a href="#/t/${t.id}">All ${esc(t.title)} questions</a>
        ${next ? `<a href="#/q/${next.id}">${qLabel(next.id)} →</a>` : `<span></span>`}
      </nav>`;
    math($("#main"));
    wire();
    if (focusPart) { const el = document.getElementById(`p-${qid}.${focusPart}`); if (el) el.scrollIntoView({ block: "start" }); }
  }

  function partCard(qid, p, extra) {
    const pid = `${qid}.${p}`, m = M[pid] || {}, mark = (state.marks[pid] || {}).m;
    const mine = extra.mine ? `
      <details class="mine"><summary>What you wrote in Moed B <span class="score">${extra.mine.score}</span></summary>
        ${extra.mine.img ? `<div class="img scan">${img(extra.mine.img, "your Moed B answer")}</div>` : ""}
        <p>${extra.mine.what}</p></details>` : "";
    return `
      <article class="item ${mark || ""}" id="p-${pid}">
        <div class="item-h"><div><span class="src">Part ${p}</span> <span class="pts">${m.pts} pts${m.bonus ? " bonus" : ""}</span></div>${mark ? `<span class="pill ${mark}">${MARKS[mark]}</span>` : ""}</div>
        <div class="img q">${img(m.q, "part " + p)}</div>
        ${extra.code ? codeTrainer(extra.code) : ""}
        ${WALKS[pid] ? walkHtml(pid) : ""}
        <div class="reveals">
          ${extra.move && !WALKS[pid] ? `<details class="fm"><summary>Stuck? Show the first move</summary><p>${linkNotes(extra.move)}</p></details>` : ""}
          ${mine}
          <details class="sol"><summary>Official solution${WALKS[pid] && WALKS[pid].slip ? ` <span class="sliptag">⚠ has a slip</span>` : ""}</summary>${WALKS[pid] && WALKS[pid].slip ? `<div class="slipnote"><b>⚠ Heads-up:</b> ${linkNotes(WALKS[pid].slip)}</div>` : ""}<div class="img">${img(m.sol, "official solution")}</div></details>
        </div>
        <div class="marks" data-id="${pid}">
          <span class="muted">After checking:</span>
          ${Object.entries(MARKS).map(([k, v]) => `<button class="mk ${k} ${mark === k ? "on" : ""}" data-m="${k}">${v}</button>`).join("")}
        </div>
      </article>`;
  }

  // ── walkthrough: the solution in small moves, revealed one at a time ─────
  function walkHtml(pid) {
    const w = WALKS[pid];
    // the start template with every blank filled in — collapsed until pressed
    const fa = w.answer ? `<details class="fullans"><summary>📝 Full exam answer <span class="muted">— press to see it filled in</span></summary><div class="paper">${linkNotes(w.answer)}</div></details>` : "";
    const shown = Math.min((state.walk || {})[pid] || 0, w.moves.length + (w.start ? 1 : 0) + (w.point ? 1 : 0));
    return `<div class="walk" data-pid="${pid}">
      <div class="walk-h">Solve it step by step <span class="muted">— try it on paper first; reveal a step only when you need it (key <kbd>N</kbd>)</span></div>
      <ol class="mvs">${w.point ? `
        <li class="mv point" ${shown > 0 ? "" : "hidden"}>
          <div class="n">💡</div>
          <div class="body"><div class="line">The point</div><div class="pointtext">${linkNotes(w.point)}</div>${w.start ? "" : fa}</div>
        </li>` : ""}${w.start ? `
        <li class="mv start" ${shown > (w.point ? 1 : 0) ? "" : "hidden"}>
          <div class="n">✍</div>
          <div class="body"><div class="line">Begin your answer like this:</div><div class="paper">${linkNotes(w.start)}</div>${fa}</div>
        </li>` : ""}
        <li class="stepsh" hidden>The steps, explained</li>${w.moves.map((mv, i) => `
        <li class="mv" ${i + (w.start ? 1 : 0) + (w.point ? 1 : 0) < shown ? "" : "hidden"}>
          <div class="n">${i + 1}</div>
          <div class="body">
            <div class="line">${linkNotes(mv.line)}</div>
            ${mv.remember ? `<div class="remember"><span class="rtag">🧠 Remember this for the exam!</span>${linkNotes(mv.remember)}</div>` : ""}
            ${mv.size ? `<div class="sizecheck"><span class="tag sizetag">Size check</span>${linkNotes(mv.size)}</div>` : ""}
            ${mv.why ? `<details class="more"><summary>why?</summary><div class="depth">${linkNotes(mv.why)}</div></details>` : ""}
            ${(mv.extra || []).map(x => `<details class="more"><summary>${esc(x.label)}</summary><div class="depth">${linkNotes(x.html)}</div></details>`).join("")}
          </div>
        </li>`).join("")}</ol>
      <div class="walk-ctrl">
        <button class="next primary"></button>
        <span class="cnt muted"></span>
        <button class="linkbtn all">show all</button>
        <button class="linkbtn reset">hide moves</button>
      </div>
      <div class="walk-done" hidden>${w.compare ? `<p><b>Now compare with the official solution below.</b> ${linkNotes(w.compare)}</p>` : `<p><b>Now compare with the official solution below.</b></p>`}</div>
    </div>`;
  }
  function walkUpdate(box, scroll) {
    const pid = box.dataset.pid, mvs = [...box.querySelectorAll(".mv")];
    const shown = Math.min((state.walk || {})[pid] || 0, mvs.length), end = shown >= mvs.length;
    mvs.forEach((m, k) => { m.hidden = k >= shown; m.classList.toggle("latest", k === shown - 1); });
    const sh = $(".stepsh", box);
    const next = $(".next", box), hasPoint = !!box.querySelector(".mv.point"), hasStart = !!box.querySelector(".mv.start");
    const pre = (hasPoint ? 1 : 0) + (hasStart ? 1 : 0), nMoves = mvs.length - pre;
    const movesShown = Math.max(0, shown - pre);
    if (sh) sh.hidden = movesShown === 0;
    next.hidden = end;
    next.textContent = shown === 0 && hasPoint ? "Show the point" : shown < pre ? "Show how to start" : movesShown === 0 ? "Show the first step" : "Show the next step";
    $(".cnt", box).textContent = movesShown ? `step ${movesShown} of ${nMoves}` : `${nMoves} steps`;
    $(".all", box).hidden = end; $(".reset", box).hidden = !shown;
    $(".walk-done", box).hidden = !end;
    if (end) { const sol = $(".sol", box.closest(".item")); if (sol) sol.open = true; }
    if (scroll && shown) mvs[shown - 1].scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function walkSet(box, n, scroll) {
    state.walk = state.walk || {}; state.walk[box.dataset.pid] = n; save(); walkUpdate(box, scroll);
  }
  // N reveals the next move of the part you're looking at (the first unfinished walkthrough in view)
  document.addEventListener("keydown", e => {
    if (e.key !== "n" && e.key !== "N") return;
    if (e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA/.test((e.target || {}).tagName || "")) return;
    const boxes = [...document.querySelectorAll(".walk")].filter(b => {
      const r = b.getBoundingClientRect(); return r.bottom > 80 && r.top < innerHeight;
    });
    const box = boxes.find(b => ((state.walk || {})[b.dataset.pid] || 0) < b.querySelectorAll(".mv").length);
    if (box) walkSet(box, ((state.walk || {})[box.dataset.pid] || 0) + 1, true);
  });

  // ── code trainer ─────────────────────────────────────────────────────────
  const norm = s => s.replace(/\s+/g, "").replace(/;$/, "").replace(/:$/, "").replace(/^if/, "").replace(/'/g, '"');
  function stripLhs(s, label) {                  // accept "grad = X.T @ z" when the label already says "grad ="
    const lhs = /^\(\d\)\s+([\w.]+)\s*=$/.exec(label);
    return lhs ? s.replace(new RegExp("^" + lhs[1].replace(/\./g, "\\.") + "_?="), "") : s;
  }
  function codeTrainer(key) {
    const c = CODE[key], saved = state.code[key] || {};
    return `<div class="code" data-key="${key}">
      <div class="code-h">Type your answers <span class="muted">— checked against ${c.ref ? "the answer from " + c.ref : "the official answer"}; if yours differs, you judge it</span></div>
      ${c.blanks.map((b, i) => `
        <div class="blank" data-i="${i}">
          <label><code>${esc(b.label)}</code></label>
          <input type="text" spellcheck="false" autocomplete="off" value="${esc(saved[i] || "")}">
          <span class="res"></span>
        </div>`).join("")}
      <button class="check">Check</button>
    </div>`;
  }
  function checkCode(box) {
    const c = CODE[box.dataset.key], answers = {};
    box.querySelectorAll(".blank").forEach(row => {
      const i = +row.dataset.i, b = c.blanks[i], v = $("input", row).value.trim(), res = $(".res", row);
      answers[i] = v;
      if (!v) { res.className = "res"; res.innerHTML = ""; return; }
      const ok = b.accept.map(norm).includes(stripLhs(norm(v), b.label));
      res.className = "res " + (ok ? "ok" : "diff");
      res.innerHTML = ok ? "✓ matches" : `differs — ${c.ref || "official"}: <code>${esc(b.accept[0])}</code>`;
    });
    state.code[box.dataset.key] = answers; save();
  }

  function wire() {
    $("#main").querySelectorAll(".marks").forEach(el => el.addEventListener("click", e => {
      const b = e.target.closest("button.mk"); if (!b) return;
      const id = el.dataset.id, m = b.dataset.m;
      if ((state.marks[id] || {}).m === m) delete state.marks[id]; else state.marks[id] = { m, t: Date.now() };
      save();
      const card = document.getElementById("p-" + id), cur = (state.marks[id] || {}).m;
      card.className = "item " + (cur || "");
      el.querySelectorAll("button.mk").forEach(x => x.classList.toggle("on", cur === x.dataset.m));
      const pill = $(".item-h .pill", card); if (pill) pill.remove();
      if (cur) $(".item-h", card).insertAdjacentHTML("beforeend", `<span class="pill ${cur}">${MARKS[cur]}</span>`);
      if (cur) {   // marked: fold the part back up (solution, Moed B answer, notes, moves) and stay on it
        card.querySelectorAll("details[open]").forEach(d => d.open = false);
        card.querySelectorAll(".walk").forEach(w => walkSet(w, 0, false));
        card.scrollIntoView({ block: "start" });
      }
      renderSide(findQ(id.split(".")[0]).t.id);
    }));
    $("#main").querySelectorAll(".walk").forEach(box => {
      const n = () => (state.walk || {})[box.dataset.pid] || 0, total = box.querySelectorAll(".mv").length;
      $(".next", box).onclick = () => walkSet(box, Math.min(n() + 1, total), true);
      $(".all", box).onclick = () => walkSet(box, total, false);
      $(".reset", box).onclick = () => {
        walkSet(box, 0, false);
        // moves collapsed: jump back to this part's question, not somewhere further down the page
        const card = box.closest('[id^="p-"]') || box;
        card.scrollIntoView({ block: "start" });
      };
      walkUpdate(box, false);
    });
    $("#main").querySelectorAll(".code").forEach(box => {
      $(".check", box).onclick = () => checkCode(box);
      box.querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", e => { if (e.key === "Enter") checkCode(box); }));
    });
  }

  // ── last day: the plan (#/day) and a past exam as a paper (#/paper/<exam>) ─────────
  const DAY = window.LASTDAY || { templates: [] };
  const examParts = ex => Object.keys(M).filter(k => k.startsWith(ex + "-q") && k.includes("."))
    .sort((a, b) => { const [qa, pa] = a.split("-q")[1].split(".").map(Number), [qb, pb] = b.split("-q")[1].split(".").map(Number); return qa - qb || pa - pb; });
  const stars = ex => examParts(ex).filter(pid => (state.stars || {})[pid]);
  const fmt = ms => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
  let tick = null;
  function beep() {
    try { const a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain();
      o.connect(g); g.connect(a.destination); o.frequency.value = 660; g.gain.value = 0.2; o.start(); o.stop(a.currentTime + 0.8); } catch (e) {}
  }
  // one countdown at a time, kept in state so a refresh doesn't lose it
  function timerHtml(choices) {
    return `<div class="timer card"><div class="t-left"><span class="t-label muted"></span><span class="t-clock">—</span></div>
      <div class="t-btns">${choices.map(([lab, min]) => `<button class="mk" data-min="${min}" data-lab="${esc(lab)}">${lab}</button>`).join("")}<button class="mk t-stop">Stop</button></div></div>`;
  }
  function timerWire() {
    const box = $("#main .timer"); if (!box) return;
    const show = () => {
      const t = state.timer, clock = $(".t-clock", box), lab = $(".t-label", box);
      if (!t) { clock.textContent = "—"; lab.textContent = "No timer running"; document.title = "ML Exam C — Study Site"; return; }
      const left = t.end - Date.now();
      lab.textContent = t.label;
      if (left <= 0) {
        clock.textContent = "Time's up"; document.title = "⏰ Time's up";
        if (!t.rang) { t.rang = true; save(); beep(); }
      } else { clock.textContent = fmt(left); document.title = `${fmt(left)} · ${t.label}`; }
    };
    box.querySelectorAll("[data-min]").forEach(b => b.onclick = () => {
      state.timer = { label: b.dataset.lab, end: Date.now() + 60000 * +b.dataset.min }; save(); show();
    });
    $(".t-stop", box).onclick = () => { delete state.timer; save(); show(); };
    clearInterval(tick); tick = setInterval(() => { if (!document.body.contains(box)) { clearInterval(tick); document.title = "ML Exam C — Study Site"; return; } show(); }, 1000);
    show();
  }
  function tickBox(key, label) {
    const on = (state.day || {})[key];
    return `<label class="tick ${on ? "on" : ""}"><input type="checkbox" data-day="${key}" ${on ? "checked" : ""}><span>${label}</span></label>`;
  }
  function starList(ex, empty) {
    const s = stars(ex);
    return s.length ? `<ul class="retest">${s.map(pid => `<li>⭐ <a href="#/q/${pid.split(".")[0]}/${pid.split(".")[1]}">${esc(pLabel(pid))}</a> <span class="muted">— ${esc((findQ(pid.split(".")[0]) || { t: { title: "" } }).t.title)}</span></li>`).join("")}</ul>`
      : `<p class="muted">${empty}</p>`;
  }
  function renderDay() {
    const mock = DAY.mock, check = DAY.check, d = state.day || {};
    const done = DAY.templates.filter((_, i) => d["tpl" + i]).length;
    const HW = Object.assign({ fill: [], bugs: [], theory: [] }, DAY.hw);
    HW.fill.forEach(f => { CODE[f.key] = Object.assign({ ref: "your HW" }, f); });
    const hwTotal = HW.fill.length + HW.bugs.length + HW.theory.length;
    const hwDone = ["hwf", "hwb", "hwt"].reduce((n, k, j) => n + [HW.fill, HW.bugs, HW.theory][j].filter((_, i) => d[k + i]).length, 0);
    const examLinks = ids => ids.map(pid => `<a href="#/q/${pid.split(".")[0]}/${pid.split(".")[1]}">${esc(pLabel(pid))}</a>`).join(", ");
    $("#main").innerHTML = `
      <header class="page-h"><div class="kicker">Thursday 8 October · exam Friday 9 October</div><h1>Last day</h1>
        <p class="lede">The exam: answer 4 of 5 questions, 3 hours, 60 passes. Today is for <b>doing</b>, not rereading. Tick each block when it's done.</p></header>

      ${timerHtml([["45 min focus", 45], ["10 min break", 10], ["3h exam", 180]])}
      <p class="muted">Rhythm: 45 minutes on, 10 off, phone in another room. The timer keeps running if you switch pages or refresh, and beeps at the end.</p>

      <section class="card day"><h2>Block 1 · morning, 3h: one whole exam, timed</h2>
        <p><b>${mock}</b>, on paper, formula sheet and calculator only. It's the second hardest past exam; 2026B is your own Moed B, so you'd half-remember it.</p>
        <ol><li>Press <b>3h exam</b> above, then open the paper.</li>
          <li>Pick 4 of the 5 questions, like in the real exam.</li>
          <li>Stuck on a part? Press <b>⭐</b> on it and move on. Don't open any solution.</li></ol>
        <p><a class="go" href="#/paper/${mock}">Open the ${mock} paper →</a></p>
        ${tickBox("b1", "Block 1 done")}</section>

      <section class="card day"><h2>Block 2 · ~1.5h: fix only the ⭐ parts</h2>
        <p>For each one: open it, redo it from scratch on paper, use <b>Show next move</b> only when stuck. Skip everything you got right.</p>
        ${starList(mock, "Your ⭐ parts from the " + mock + " paper show up here.")}
        ${tickBox("b2", "Block 2 done")}</section>

      <p class="muted center">🍽 Lunch. Away from the screen.</p>

      <section class="card day"><h2>Block 3 · ~1.5h: the 8 templates from memory <span class="muted">(${done}/8)</span></h2>
        <p>For each: write it on a blank page <b>without looking</b>, then open it and check. Tick the ones you wrote fully. The ones you can't tick are your last review tonight.</p>
        ${DAY.templates.map((t, i) => `<details class="move tpl ${d["tpl" + i] ? "done" : ""}"><summary>${i + 1}. ${t.title}</summary>
          <p><span class="tag cue">You'll see</span> ${t.cue}</p>${t.html}
          ${tickBox("tpl" + i, "I wrote it fully from memory")}</details>`).join("")}
        ${tickBox("b3", "Block 3 done")}</section>

      <section class="card day"><h2>Block 4 · ~1h: the homework, exam-style <span class="muted">(${hwDone}/${hwTotal})</span></h2>
        <p>Practice built from <b>your own HW</b> (code and theory answers), shaped like the exams' questions. <b>Not real exam questions.</b> The "In the exams" links show the real parts each one mirrors.</p>
        <h3>4a · 25 min: fill in the blanks</h3>
        ${HW.fill.map((f, i) => `<details class="move tpl ${d["hwf" + i] ? "done" : ""}"><summary>${f.title} <span class="muted">· ${esc(f.hw)}</span></summary>
          <p><span class="tag cue">In the exams</span> ${examLinks(f.exams)}</p>
          <p>${f.prompt}</p>
          ${f.api ? `<div class="api"><div class="api-h">What you're given</div><div class="tw"><table><tbody>${f.api.map(([n, t]) => `<tr><td><code>${esc(n)}</code></td><td>${t}</td></tr>`).join("")}</tbody></table></div></div>` : ""}
          <pre class="hwcode"><code>${esc(f.code).replace(/___\((\d)\)___/g, '<span class="hole">($1)</span>')}</code></pre>
          ${codeTrainer(f.key)}
          ${tickBox("hwf" + i, "All blanks right")}</details>`).join("")}
        <h3>4b · 15 min: find the bugs</h3>
        ${HW.bugs.map((g, i) => `<details class="move tpl ${d["hwb" + i] ? "done" : ""}"><summary>${g.title} <span class="muted">· ${esc(g.hw)}</span></summary>
          <p><span class="tag cue">In the exams</span> ${examLinks(g.exams)}</p>
          <p>${g.prompt}</p>
          ${g.api ? `<div class="api"><div class="api-h">What you're given</div><div class="tw"><table><tbody>${g.api.map(([n, t]) => `<tr><td><code>${esc(n)}</code></td><td>${t}</td></tr>`).join("")}</tbody></table></div></div>` : ""}
          <div class="bugbox" data-i="${i}"><ol class="buglines">${g.lines.map((l, k) => `<li><button type="button" class="bl" data-n="${k + 1}"><code>${esc(l)}</code></button></li>`).join("")}</ol>
            <button class="check bugcheck">Check</button><div class="bugres"></div></div>
          ${tickBox("hwb" + i, "Found all the bugs")}</details>`).join("")}
        <h3>4c · 20 min: theory <span class="muted">— not asked in an exam yet</span></h3>
        <p>Write the answer on paper first. Then click each □ to check that step, or <b>Show all</b>.</p>
        ${HW.theory.map((t, i) => `<details class="move tpl ${d["hwt" + i] ? "done" : ""}"><summary>${t.q} <span class="muted">· ${esc(t.src)}</span></summary>
          <div class="gapans">${t.a.replace(/⟦([\s\S]*?)⟧/g, '<button type="button" class="gap"><span class="gap-q">□</span><span class="gap-a">$1</span></button>')}</div>
          <button class="mk gapall">Show all</button>
          ${tickBox("hwt" + i, "I had every step")}</details>`).join("")}
        ${tickBox("b4", "Block 4 done")}</section>

      <section class="card day"><h2>Evening · stop by 20:00</h2>
        <ul class="ticks">
          <li>${tickBox("e1", "Flip through the <b>Learn it first</b> cards of each topic (light, nothing new)")}</li>
          <li>${tickBox("e2", "Templates you couldn't tick in Block 3: read them once more")}</li>
          <li>${tickBox("e7", "Read the <a href=\"#/memo\">Memory sheet</a> once, top to bottom")}</li>
          <li>${tickBox("e3", "Calculator: \\(\\ln\\), \\(e^x\\), \\(\\log_2 x = \\ln x \\div \\ln 2\\)")}</li>
          <li>${tickBox("e4", "Check whether the <b>extension formula sheet</b> is allowed in the exam")}</li>
          <li>${tickBox("e5", "Bag ready: ID, calculator, pens, water")}</li>
          <li>${tickBox("e6", "<b>Sleep.</b> It gains you more points than another exam")}</li></ul></section>`;
    math($("#main"));
    timerWire();
    $("#main").querySelectorAll(".code").forEach(box => {
      $(".check", box).onclick = () => checkCode(box);
      box.querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", e => { if (e.key === "Enter") checkCode(box); }));
    });
    $("#main").querySelectorAll(".bugbox").forEach(box => {
      const g = HW.bugs[+box.dataset.i];
      box.querySelectorAll(".bl").forEach(b => b.onclick = () => { b.classList.toggle("picked"); box.classList.remove("checked"); });
      $(".bugcheck", box).onclick = () => {
        box.classList.add("checked");
        const picked = [...box.querySelectorAll(".bl.picked")].map(b => +b.dataset.n), real = Object.keys(g.bugs).map(Number);
        box.querySelectorAll(".bl").forEach(b => { const n = +b.dataset.n, isBug = real.includes(n), was = picked.includes(n);
          b.classList.toggle("hit", isBug && was); b.classList.toggle("miss", isBug && !was); b.classList.toggle("wrong", !isBug && was); });
        const found = real.filter(n => picked.includes(n)).length, extra = picked.filter(n => !real.includes(n)).length;
        $(".bugres", box).innerHTML = `<p><b>${found} of ${real.length} bugs found</b>${extra ? ` · ${extra} line${extra > 1 ? "s" : ""} marked that ${extra > 1 ? "are" : "is"} fine` : ""}</p>
          <ul>${real.map(n => `<li><b>Line ${n}:</b> ${g.bugs[n]}</li>`).join("")}</ul>`;
        math($(".bugres", box));
      };
    });
    $("#main").querySelectorAll(".gap").forEach(b => b.onclick = () => b.classList.toggle("shown"));
    $("#main").querySelectorAll(".gapall").forEach(b => b.onclick = () => b.parentElement.querySelectorAll(".gap").forEach(g => g.classList.add("shown")));
    $("#main").querySelectorAll("[data-day]").forEach(c => c.onchange = () => {
      state.day = state.day || {}; state.day[c.dataset.day] = c.checked; save();
      c.closest(".tick").classList.toggle("on", c.checked);
      const box = c.closest("details.tpl"); if (box) box.classList.toggle("done", c.checked);
    });
  }
  function renderPaper(ex) {
    const qs = [...new Set(examParts(ex).map(pid => pid.split(".")[0]))];
    $("#main").innerHTML = `
      <header class="page-h"><div class="kicker"><a href="#/day">← Last day</a></div><h1>${ex.slice(0, 4)} Moed ${ex[4]} · exam paper</h1>
        <p class="lede">Questions only, no solutions. Answer 4 of the 5. Press ⭐ on any part you get stuck on (or don't know the first move for) and move on.</p></header>
      ${timerHtml([["3h exam", 180], ["45 min focus", 45], ["10 min break", 10]])}
      ${qs.map(qid => `<section class="paper-q"><h2>${esc((M[qid] || {}).title || qid)}</h2>
        ${M[qid] && M[qid].stem ? `<div class="img">${img(M[qid].stem, "question setup")}</div>` : ""}
        ${examParts(ex).filter(pid => pid.startsWith(qid + ".")).map(pid => {
          const m = M[pid], on = (state.stars || {})[pid];
          return `<article class="item"><div class="item-h"><div><span class="src">Part ${pid.split(".")[1]}</span> <span class="pts">${m.pts} pts${m.bonus ? " bonus" : ""}</span></div>
            <button class="mk star ${on ? "on" : ""}" data-pid="${pid}">${on ? "⭐ stuck" : "☆ stuck?"}</button></div>
            <div class="img q">${img(m.q, "part " + pid.split(".")[1])}</div></article>`;
        }).join("")}</section>`).join("")}
      <p><a class="go" href="#/day">Done → back to the plan, your ⭐ parts are listed there</a></p>`;
    timerWire();
    $("#main").querySelectorAll(".star").forEach(b => b.onclick = () => {
      state.stars = state.stars || {}; const on = !state.stars[b.dataset.pid];
      if (on) state.stars[b.dataset.pid] = true; else delete state.stars[b.dataset.pid]; save();
      b.classList.toggle("on", on); b.textContent = on ? "⭐ stuck" : "☆ stuck?";
    });
  }

  // ── memory sheet (#/memo): short formulas that are NOT on the official formula sheet ──
  function renderMemo() {
    const MEMO = window.MEMO || { sections: [] };
    $("#main").innerHTML = `
      <header class="page-h"><div class="kicker"><a href="#/day">← Last day</a></div><h1>Memory sheet</h1>
        <p class="lede">Short formulas the exams use that are <b>not</b> on the official formula sheet. ★ = used in many past exams.</p>
        ${MEMO.intro || ""}</header>
      ${MEMO.sections.map(sec => `<section class="card memo"><h2>${esc(sec.title)}</h2>
        <div class="tw"><table><tbody>${sec.items.map(it => `<tr><td class="m-name">${it.star ? "★ " : ""}${it.name}</td><td class="m-f">${it.f}</td><td class="m-when muted">${it.when || ""}</td></tr>`).join("")}</tbody></table></div></section>`).join("")}
      <p class="muted">Printable: Ctrl+P prints only this sheet.</p>`;
    math($("#main"));
  }

  // ── routing ──────────────────────────────────────────────────────────────
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "day") { renderSide("day"); renderDay(); }
    else if (parts[0] === "memo") { renderSide("memo"); renderMemo(); }
    else if (parts[0] === "paper" && /^\d{4}[ABC]$/.test(parts[1] || "") && examParts(parts[1]).length) { renderSide("day"); renderPaper(parts[1]); }
    else if (parts[0] === "t" && TOPICS.find(x => x.id === parts[1])) {
      const i = parts[2] === "note" ? noteIndex(parts[1], +parts[3]) : -1;
      renderSide(parts[1]); renderTopic(TOPICS.find(x => x.id === parts[1]), i >= 0 ? i : undefined);
    } else if (parts[0] === "q" && findQ(parts[1])) {
      if (parts[1] !== lastQ) { state.walk = {}; lastQ = parts[1]; }
      renderSide(findQ(parts[1]).t.id); renderQuestion(parts[1], parts[2]);
    } else { renderSide(null); renderHome(); }
    if (!parts[2]) window.scrollTo(0, 0);
  }
  try { const th = localStorage.getItem(KEY + "_theme"); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
  window.addEventListener("hashchange", route);
  route();
  // refresh returns to the part you were on: keep the part in view in the address (#/q/<question>/<part>)
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  let st = 0;
  window.addEventListener("scroll", () => {
    clearTimeout(st);
    st = setTimeout(() => {
      const parts = location.hash.replace(/^#\/?/, "").split("/");
      if (parts[0] !== "q") return;
      const cards = [...document.querySelectorAll('article.item[id^="p-"]')];
      const cur = cards.filter(c => c.getBoundingClientRect().top <= 120).pop() || cards[0];
      if (!cur) return;
      const p = cur.id.split(".").pop(), h = `#/q/${parts[1]}/${p}`;
      if (location.hash !== h) history.replaceState(null, "", h);
    }, 200);
  }, { passive: true });
  // images above the part load after the first jump and push it down — jump again once they're in
  window.addEventListener("load", () => {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] !== "q" || !parts[2]) return;
    const el = document.getElementById(`p-${parts[1]}.${parts[2]}`);
    if (el) el.scrollIntoView({ block: "start" });
  });
})();
