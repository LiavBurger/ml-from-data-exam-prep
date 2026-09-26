/* ML Exam C study site — rendering, routing and saved progress (localStorage).
   Structure: topic → whole exam questions → parts (each part marked Got it / Shaky / Failed). */
(function () {
  "use strict";
  const M = window.MANIFEST, TOPICS = window.TOPICS, CODE = window.CODE, MOEDB = window.MOEDB || {};
  const NOTES = window.NOTES || {};
  const notesOf = t => NOTES[t.id] || { intro: t.intro || "", moves: [], hints: {} };
  const CARDS = window.CARDS || {};
  const cardsOf = t => CARDS[t.id] || { cards: {}, parts: {} };
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
          <li><b>Start the 25-minute timer</b> (bottom corner). Take the 5-minute break when it rings.</li>
          <li><b>Open the next question</b> in the topic you're on and go part by part: read the recipe card above the part (1–2 min), do the part <b>on paper</b>, then open the official solution and mark yourself honestly.</li>
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
    const CT = cardsOf(t), order = cardOrder(t);
    const cardIndex = order.map(id => cardHtml(t, id, false, "")).join("");
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
      <header class="page-h"><div class="kicker">Topic ${t.num}</div><h1>${esc(t.title)}</h1>${CT.intro || N.intro || t.intro || ""}</header>
      ${t.questions.length ? `<section><h2 class="sec">Questions <span class="muted">— in this order, each one part by part</span></h2>${qs}</section>` : ""}
      ${cardIndex ? `<section><h2 class="sec">All recipe cards <span class="muted">— for review; each one also appears above the parts that need it</span></h2>${cardIndex}</section>` : ""}
      ${moves ? `<section><details class="fullnotes"><summary><span class="sec-like">Full notes</span> <span class="muted">— long reference explanations, only if a card's "why" isn't enough</span></summary>${moves}</details></section>` : ""}`;
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
    const parts = partsOf(qid).map(p => partCard(t, qid, p, Object.assign({}, (q.parts || {})[p] || {}, (hints[qid] || {})[p] ? { move: hints[qid][p] } : {}))).join("");
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

  // ── recipe cards ─────────────────────────────────────────────────────────
  function cardOrder(t) {                       // card ids in order of first use along the topic's questions
    const CT = cardsOf(t), seen = [];
    t.questions.forEach(q => partsOf(q.id).forEach(p => (CT.parts[`${q.id}.${p}`] || []).forEach(id => { if (!seen.includes(id) && CT.cards[id]) seen.push(id); })));
    Object.keys(CT.cards).forEach(id => { if (!seen.includes(id)) seen.push(id); });
    return seen;
  }
  function cardUsed(t, id, exceptPid) {         // has the learner already marked a part that uses this card?
    const CT = cardsOf(t);
    return Object.entries(CT.parts).some(([pid, ids]) => pid !== exceptPid && ids.includes(id) && state.marks[pid]);
  }
  function cardHtml(t, id, open, note) {
    const c = cardsOf(t).cards[id]; if (!c) return "";
    return `
      <details class="rcard" ${open ? "open" : ""}>
        <summary><span class="rk">Recipe</span> ${c.title} <span class="muted">· ~${c.minutes || 2} min${note ? " · " + note : ""}</span></summary>
        <div class="rc-body">
          ${c.cue ? `<p><span class="tag cue">You'll see</span> ${c.cue}</p>` : ""}
          <div class="rc-lines"><span class="tag first">Write these lines</span><ol>${(c.lines || []).map(l => `<li>${l}</li>`).join("")}</ol></div>
          ${c.numbers ? `<div class="rc-num"><span class="tag num">With numbers</span>${c.numbers}</div>` : ""}
          ${c.check ? `<p><span class="tag cue">Check</span> ${c.check}</p>` : ""}
          ${c.trap ? `<p class="trap"><span class="tag trapt">Trap</span> ${c.trap}</p>` : ""}
          ${(c.why || []).length || c.side ? `<div class="rc-drawers">
            ${(c.why || []).map(([label, html]) => `<details class="why"><summary>${label}</summary><div>${html}</div></details>`).join("")}
            ${c.side ? `<details class="side"><summary>Side notes <span class="muted">(not needed for points)</span></summary><div>${c.side}</div></details>` : ""}
          </div>` : ""}
        </div>
      </details>`;
  }

  function partCard(t, qid, p, extra) {
    const pid = `${qid}.${p}`, m = M[pid] || {}, mark = (state.marks[pid] || {}).m;
    const cards = (cardsOf(t).parts[pid] || []).map(id => {
      const used = cardUsed(t, id, pid);
      return cardHtml(t, id, !used, used ? "you've used this card — try from memory first" : "");
    }).join("");
    const mine = extra.mine ? `
      <details class="mine"><summary>What you wrote in Moed B <span class="score">${extra.mine.score}</span></summary>
        ${extra.mine.img ? `<div class="img scan">${img(extra.mine.img, "your Moed B answer")}</div>` : ""}
        <p>${extra.mine.what}</p></details>` : "";
    return `
      <article class="item ${mark || ""}" id="p-${pid}">
        <div class="item-h"><div><span class="src">Part ${p}</span> <span class="pts">${m.pts} pts${m.bonus ? " bonus" : ""}</span></div>${mark ? `<span class="pill ${mark}">${MARKS[mark]}</span>` : ""}</div>
        ${cards ? `<div class="rcards">${cards}</div>` : ""}
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


  // ── 25/5 study timer (fixed blocks: 25 min focus, 5 min break) ────────────
  const TKEY = KEY + "_timer";
  const PH = { focus: { len: 25 * 60, label: "Focus", next: "break" }, break: { len: 5 * 60, label: "Break", next: "focus" } };
  let T = (() => { try { return JSON.parse(localStorage.getItem(TKEY)) || null; } catch (e) { return null; } })()
    || { phase: "focus", running: false, endsAt: 0, left: PH.focus.len, day: "", blocks: 0 };
  const today = () => new Date().toISOString().slice(0, 10);
  if (T.day !== today()) { T.day = today(); T.blocks = 0; }
  const tsave = () => { try { localStorage.setItem(TKEY, JSON.stringify(T)); } catch (e) {} };
  const remaining = () => T.running ? Math.max(0, Math.round((T.endsAt - Date.now()) / 1000)) : T.left;
  const mmss = sec => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  function chime() {
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach(dt => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.frequency.value = T.phase === "break" ? 660 : 880; o.connect(g); g.connect(ac.destination);
        g.gain.setValueAtTime(0.0001, ac.currentTime + dt);
        g.gain.exponentialRampToValueAtTime(0.25, ac.currentTime + dt + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dt + 0.3);
        o.start(ac.currentTime + dt); o.stop(ac.currentTime + dt + 0.32);
      });
    } catch (e) {}
  }
  function tdraw() {
    let el = document.getElementById("timer");
    if (!el) { el = document.createElement("div"); el.id = "timer"; document.body.appendChild(el); }
    const sec = remaining();
    el.className = `timer ${T.phase} ${T.running ? "run" : ""}`;
    el.innerHTML = `
      <div class="t-ph">${PH[T.phase].label}${T.blocks ? ` <span class="t-bl" title="focus blocks finished today">· ${T.blocks} done today</span>` : ""}</div>
      <div class="t-time">${mmss(sec)}</div>
      <div class="t-btns">
        <button data-a="toggle">${T.running ? "Pause" : sec === PH[T.phase].len ? "Start" : "Resume"}</button>
        <button data-a="reset" title="restart this block">↺</button>
        <button data-a="skip" title="skip to ${PH[T.phase].next}">Skip</button>
      </div>`;
    document.title = T.running ? `${mmss(sec)} ${PH[T.phase].label} · ML Exam C` : "ML Exam C — Study Site";
  }
  function tswitch() {                           // block finished → next phase; a break starts by itself, a focus block waits for you
    if (T.phase === "focus") T.blocks++;
    T.phase = PH[T.phase].next; T.left = PH[T.phase].len;
    T.running = T.phase === "break"; T.endsAt = Date.now() + T.left * 1000;
    tsave();
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("#timer button"); if (!b) return;
    const a = b.dataset.a;
    if (a === "toggle") {
      if (T.running) { T.left = remaining(); T.running = false; }
      else { T.endsAt = Date.now() + T.left * 1000; T.running = true; }
    } else if (a === "reset") { T.running = false; T.left = PH[T.phase].len; }
    else if (a === "skip") { T.phase = PH[T.phase].next; T.running = false; T.left = PH[T.phase].len; }
    tsave(); tdraw();
  });
  setInterval(() => {
    if (T.running && remaining() === 0) { chime(); tswitch(); }
    tdraw();
  }, 1000);

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
  tdraw();
})();
