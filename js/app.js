/* ML Exam C study site — rendering, routing and saved progress (localStorage).
   Structure: topic → whole exam questions → parts (each part marked Got it / Shaky / Failed). */
(function () {
  "use strict";
  const M = window.MANIFEST, TOPICS = window.TOPICS, CODE = window.CODE, MOEDB = window.MOEDB || {};
  const NOTES = window.NOTES || {};
  const notesOf = t => NOTES[t.id] || { intro: t.intro || "", moves: [], hints: {} };
  const KEY = "ml_examc_v1";
  const MARKS = { got: "Got it", shaky: "Shaky", fail: "Failed" };

  // ── storage ──────────────────────────────────────────────────────────────
  function load() {
    try { return Object.assign({ marks: {}, code: {} }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return { marks: {}, code: {} }; }
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
      f.text().then(txt => { state = Object.assign({ marks: {}, code: {} }, JSON.parse(txt)); save(); route(); });
    };
  }

  // ── home ─────────────────────────────────────────────────────────────────
  function renderHome() {
    const retest = Object.entries(state.marks).filter(([, v]) => v.m !== "got").sort((a, b) => b[1].t - a[1].t);
    const total = TOPICS.reduce((s, t) => s + t.questions.length, 0);
    $("#main").innerHTML = `
      <header class="page-h"><h1>Pass Exam C</h1>
        <p class="lede">Answer 4 of 5 questions, 25 points each; 60 passes. In Moed B you weren't short on time — you got stuck. This site has all ${total} real questions from the 5 past exams, each one whole, grouped by the kind of question it is.</p></header>

      <section class="card how"><h2>Each study session</h2>
        <ol>
          <li><b>Retest first</b> (≈10 min): redo the parts below that you marked Failed or Shaky.</li>
          <li><b>Next question in the topic you're on.</b> New topic? Read its notes first.</li>
          <li>Work the question from part 1 to the end <b>on paper, with only the formula sheet</b>. Open the official solution only after writing something, then mark yourself honestly.</li>
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

  // ── topic ────────────────────────────────────────────────────────────────
  function renderTopic(t) {
    const N = notesOf(t);
    const moves = (N.moves || []).map((mv, i) => {
      const exam = mv.cue || mv.first || mv.recipe || mv.table || mv.trap;
      return `
      <details class="move" ${i === 0 ? "open" : ""}>
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
    }).join("");
    const notesNote = (N.moves || []).length >= 3 ? "" :
      `<p class="banner">${moves ? "More notes for this topic come next." : "Notes for this topic come next."} The questions below are complete and ready to practise.</p>`;
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
      <header class="page-h"><div class="kicker">Topic ${t.num}</div><h1>${esc(t.title)}</h1>${N.intro || t.intro || ""}</header>
      ${moves || notesNote ? `<section><h2 class="sec">Notes</h2>${notesNote}${moves}</section>` : ""}
      ${t.questions.length ? `<section><h2 class="sec">Questions <span class="muted">— do them in this order, each one start to finish</span></h2>${qs}</section>` : ""}`;
    math($("#main"));
    $("#main").querySelectorAll(".close-note").forEach(b => b.addEventListener("click", () => {
      const d = b.closest("details");
      d.open = false;
      d.scrollIntoView({ block: "start" });   // keep your place: land on the note's title, not further down the page
    }));
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
        <div class="reveals">
          ${extra.move ? `<details class="fm"><summary>Stuck? Show the first move</summary><p>${extra.move}</p></details>` : ""}
          ${mine}
          <details class="sol"><summary>Official solution</summary><div class="img">${img(m.sol, "official solution")}</div></details>
        </div>
        <div class="marks" data-id="${pid}">
          <span class="muted">After checking:</span>
          ${Object.entries(MARKS).map(([k, v]) => `<button class="mk ${k} ${mark === k ? "on" : ""}" data-m="${k}">${v}</button>`).join("")}
        </div>
      </article>`;
  }

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
    $("#main").querySelectorAll(".code").forEach(box => {
      $(".check", box).onclick = () => checkCode(box);
      box.querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", e => { if (e.key === "Enter") checkCode(box); }));
    });
  }

  // ── routing ──────────────────────────────────────────────────────────────
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    if (parts[0] === "t" && TOPICS.find(x => x.id === parts[1])) {
      renderSide(parts[1]); renderTopic(TOPICS.find(x => x.id === parts[1]));
    } else if (parts[0] === "q" && findQ(parts[1])) {
      renderSide(findQ(parts[1]).t.id); renderQuestion(parts[1], parts[2]);
    } else { renderSide(null); renderHome(); }
    if (!parts[2]) window.scrollTo(0, 0);
  }
  try { const th = localStorage.getItem(KEY + "_theme"); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
  window.addEventListener("hashchange", route);
  route();
})();
