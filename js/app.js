/* ML Exam C study site — rendering, routing and saved progress (localStorage).
   Structure: topic → whole exam questions → parts (each part marked Got it / Shaky / Failed). */
(function () {
  "use strict";
  const M = window.MANIFEST, TOPICS = window.TOPICS, CODE = window.CODE, MOEDB = window.MOEDB || {};
  const NOTES = window.NOTES || {};
  const notesOf = t => NOTES[t.id] || { intro: t.intro || "", moves: [], hints: {} };
  const WALKS = window.WALKS || {};
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
      <nav>${TOPICS.map(t => {
        const p = topicProgress(t), pct = p.total ? Math.round(100 * p.done / p.total) : 0;
        return `<a class="nav-t ${t.id === activeTopic ? "on" : ""}" href="#/t/${t.id}">
          <span class="num">${t.num}</span><span class="nt">${esc(t.title)}</span>
          ${t.noQuestions ? "" : `<span class="bar"><i style="width:${pct}%"></i></span><span class="cnt" title="questions finished">${p.done}/${p.total}</span>`}
        </a>`;
      }).join("")}</nav>
      <div class="side-foot">
        <button id="theme">${document.documentElement.dataset.theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}</button>
        <button id="export">Download progress backup</button>
        <label class="imp">Restore backup<input type="file" id="import" accept="application/json"></label>
      </div>`;
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
      ${t.questions.length ? `<section><h2 class="sec">Questions <span class="muted">— in this order, each one start to finish</span></h2>${qs}</section>` : ""}
      ${notes ? `<section><details class="refnotes" ${openNoteIdx !== undefined ? "open" : ""}><summary>Reference notes <span class="muted">— optional, ${(N.moves || []).length} long notes; a move's <i>why?</i> links straight to the one you need</span></summary>
        ${N.intro ? `<div class="refintro">${N.intro}</div>` : ""}${notes}</details></section>` : ""}`;
    math($("#main"));
    $("#main").querySelectorAll(".close-note").forEach(b => b.addEventListener("click", () => {
      const d = b.closest("details");
      d.open = false;
      d.scrollIntoView({ block: "start" });   // keep your place: land on the note's title, not further down the page
    }));
    if (openNoteIdx !== undefined) { const el = document.getElementById("note-" + openNoteIdx); if (el) el.scrollIntoView({ block: "start" }); }
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
          <details class="sol"><summary>Official solution</summary><div class="img">${img(m.sol, "official solution")}</div></details>
        </div>
        <div class="marks" data-id="${pid}">
          <span class="muted">After checking:</span>
          ${Object.entries(MARKS).map(([k, v]) => `<button class="mk ${k} ${mark === k ? "on" : ""}" data-m="${k}">${v}</button>`).join("")}
        </div>
      </article>`;
  }

  // ── walkthrough: the solution in small moves, revealed one at a time ─────
  function walkHtml(pid) {
    const w = WALKS[pid], shown = Math.min((state.walk || {})[pid] || 0, w.moves.length + (w.start ? 1 : 0));
    return `<div class="walk" data-pid="${pid}">
      <div class="walk-h">Solve it step by step <span class="muted">— try it on paper first; reveal a move only when you need it (key <kbd>N</kbd>)</span></div>
      <ol class="mvs">${w.start ? `
        <li class="mv start" ${shown > 0 ? "" : "hidden"}>
          <div class="n">✍</div>
          <div class="body"><div class="line">Begin your answer like this:</div><div class="paper">${linkNotes(w.start)}</div></div>
        </li>` : ""}${w.moves.map((mv, i) => `
        <li class="mv" ${i + (w.start ? 1 : 0) < shown ? "" : "hidden"}>
          <div class="n">${i + 1}</div>
          <div class="body">
            <div class="line">${linkNotes(mv.line)}</div>
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
    const next = $(".next", box), hasStart = !!box.querySelector(".mv.start"), nMoves = mvs.length - (hasStart ? 1 : 0);
    const movesShown = Math.max(0, shown - (hasStart ? 1 : 0));
    next.hidden = end;
    next.textContent = shown === 0 && hasStart ? "Show how to start" : movesShown === 0 ? "Show first move" : "Show next move";
    $(".cnt", box).textContent = movesShown ? `move ${movesShown} of ${nMoves}` : `${nMoves} moves`;
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
      <div class="code-h">Type your answers <span class="muted">— checked against the official answer; if yours differs, you judge it</span></div>
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
      res.innerHTML = ok ? "✓ matches" : `differs — official: <code>${esc(b.accept[0])}</code>`;
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
      renderSide(findQ(id.split(".")[0]).t.id);
    }));
    $("#main").querySelectorAll(".walk").forEach(box => {
      const n = () => (state.walk || {})[box.dataset.pid] || 0, total = box.querySelectorAll(".mv").length;
      $(".next", box).onclick = () => walkSet(box, Math.min(n() + 1, total), true);
      $(".all", box).onclick = () => walkSet(box, total, false);
      $(".reset", box).onclick = () => walkSet(box, 0, false);
      walkUpdate(box, false);
    });
    $("#main").querySelectorAll(".code").forEach(box => {
      $(".check", box).onclick = () => checkCode(box);
      box.querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", e => { if (e.key === "Enter") checkCode(box); }));
    });
  }

  // ── routing ──────────────────────────────────────────────────────────────
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "t" && TOPICS.find(x => x.id === parts[1])) {
      const i = parts[2] === "note" ? noteIndex(parts[1], +parts[3]) : -1;
      renderSide(parts[1]); renderTopic(TOPICS.find(x => x.id === parts[1]), i >= 0 ? i : undefined);
    } else if (parts[0] === "q" && findQ(parts[1])) {
      renderSide(findQ(parts[1]).t.id); renderQuestion(parts[1], parts[2]);
    } else { renderSide(null); renderHome(); }
    if (!parts[2]) window.scrollTo(0, 0);
  }
  try { const th = localStorage.getItem(KEY + "_theme"); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
  window.addEventListener("hashchange", route);
  route();
})();
