/* ML Exam C study site — rendering, routing and saved progress (localStorage). */
(function () {
  "use strict";
  const M = window.MANIFEST, TOPICS = window.TOPICS, CODE = window.CODE;
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
  function examLabel(id) {                      // "2026B-q1.2" -> "2026-B · Q1.2"
    const m = /^(\d{4})([ABC])-q(\d+)(?:\.(\d+))?$/.exec(id);
    return m ? `${m[1]}-${m[2]} · Q${m[3]}${m[4] ? "." + m[4] : ""}` : id;
  }
  const stemId = id => id.replace(/\.\d+$/, "");
  function math(el) {
    if (window.renderMathInElement) renderMathInElement(el, {
      delimiters: [{ left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }],
      throwOnError: false,
    });
  }
  function topicItems(t) { return (t.items || []).map(it => it.id); }
  function progress(t) {
    const ids = [...new Set(topicItems(t))];
    const got = ids.filter(id => (state.marks[id] || {}).m === "got").length;
    return { got, total: ids.length };
  }
  function itemTopic(id) { return TOPICS.find(t => topicItems(t).includes(id)); }

  // ── sidebar ──────────────────────────────────────────────────────────────
  function renderSide(activeId) {
    const side = $("#side");
    side.innerHTML = `
      <a class="brand" href="#/">ML from Data<span>Exam C prep</span></a>
      <nav>${TOPICS.map(t => {
        const p = progress(t);
        const pct = p.total ? Math.round(100 * p.got / p.total) : 0;
        return `<a class="nav-t ${t.id === activeId ? "on" : ""} ${t.ready ? "" : "later"}" href="#/t/${t.id}">
          <span class="num">${t.num}</span><span class="nt">${esc(t.title)}</span>
          ${t.ready ? `<span class="bar"><i style="width:${pct}%"></i></span><span class="cnt">${p.got}/${p.total}</span>` : `<span class="soon">next</span>`}
        </a>`;
      }).join("")}</nav>
      <div class="side-foot">
        <button id="theme">Toggle dark mode</button>
        <button id="export">Download progress backup</button>
        <label class="imp">Restore backup<input type="file" id="import" accept="application/json"></label>
      </div>`;
    math(side);
    $("#theme").onclick = () => {
      const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.dataset.theme = cur === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY + "_theme", document.documentElement.dataset.theme); } catch (e) {}
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
    const retest = Object.entries(state.marks).filter(([, v]) => v.m !== "got")
      .sort((a, b) => b[1].t - a[1].t);
    $("#main").innerHTML = `
      <header class="page-h"><h1>Pass Exam C</h1>
        <p class="lede">Answer 4 of 5 questions, 25 points each; 60 passes. In Moed B you weren't short on time — you got stuck. This site trains the <b>first move</b> for every kind of item, using only real course material.</p></header>

      <section class="card how"><h2>Each study session</h2>
        <ol>
          <li><b>Retest first</b> (≈10 min): redo the items below that you marked Failed or Shaky.</li>
          <li><b>Next topic in order</b>: read its <i>first moves</i>, then solve each item <b>on paper, from memory, with only the formula sheet</b>.</li>
          <li>Only then open the official solution, and mark yourself honestly.</li>
        </ol></section>

      <section class="card"><h2>Retest first</h2>
        ${retest.length ? `<ul class="retest">${retest.map(([id, v]) => {
          const t = itemTopic(id);
          return `<li><span class="pill ${v.m}">${MARKS[v.m]}</span> <a href="#/t/${t ? t.id : ""}/${id}">${esc(itemLabel(id))}</a>${t ? ` <span class="muted">— ${esc(t.title)}</span>` : ""}</li>`;
        }).join("")}</ul>` : `<p class="muted">Nothing yet — items you mark Failed or Shaky show up here.</p>`}</section>

      <section class="card stuck"><h2>When you're stuck</h2>
        <ol>${window.STUCK_PROTOCOL.map(s => `<li>${s}</li>`).join("")}</ol></section>

      <section class="card"><h2>Topic order</h2>
        <ol class="order" start="0">${TOPICS.map(t => `<li><a href="#/t/${t.id}">${esc(t.title)}</a> <span class="muted">— ${t.blurb}</span>${t.ready ? "" : ` <span class="soon">next</span>`}</li>`).join("")}</ol></section>`;
    math($("#main"));
  }

  function itemLabel(id) {
    for (const t of TOPICS) for (const it of t.items || []) if (it.id === id && it.hw) return it.title.replace(/\\\(|\\\)/g, "");
    return examLabel(id);
  }

  // ── topic ────────────────────────────────────────────────────────────────
  function renderTopic(t, focus) {
    if (!t.ready) {
      $("#main").innerHTML = `<header class="page-h"><div class="kicker">Topic ${t.num}</div><h1>${esc(t.title)}</h1>
        <p class="lede">${t.blurb}</p></header>
        <section class="card"><p>This topic isn't built yet — it comes after the pilot is reviewed.</p>
        <p class="muted">Sources: ${esc(t.sources)}</p></section>`;
      return;
    }
    const moves = (t.moves || []).map((mv, i) => `
      <details class="move" ${i === 0 ? "open" : ""}>
        <summary>${mv.title}</summary>
        ${mv.cue ? `<p><span class="tag cue">You'll see</span> ${mv.cue}</p>` : ""}
        ${mv.first ? `<p><span class="tag first">First line</span> ${mv.first}</p>` : ""}
        ${mv.table ? `<div class="tw"><table><thead><tr>${mv.table.head.map(h => `<th>${h}</th>`).join("")}</tr></thead>
          <tbody>${mv.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}
        ${mv.recipe ? `<div class="recipe">${mv.recipe}</div>` : ""}
        ${mv.trap ? `<p class="trap"><span class="tag trapt">Trap</span> ${mv.trap}</p>` : ""}
      </details>`).join("");

    let prevStem = null;
    const items = t.items.map(it => { const html = itemCard(it, prevStem); prevStem = it.hw ? null : stemId(it.id); return html; }).join("");
    const pts = t.items.reduce((s, it) => s + (it.hw ? 0 : (M[it.id] || {}).pts || 0), 0);

    $("#main").innerHTML = `
      <header class="page-h"><div class="kicker">Topic ${t.num}</div><h1>${esc(t.title)}</h1>${t.intro}</header>
      ${moves ? `<section><h2 class="sec">First moves</h2>${moves}</section>` : ""}
      <section><h2 class="sec">Practice <span class="muted">— ${t.items.length} items${pts ? ` · ${pts} exam points` : ""}</span></h2>${items}</section>`;
    math($("#main"));
    wire(t);
    if (focus) { const el = document.getElementById("i-" + focus); if (el) el.scrollIntoView({ block: "start" }); }
  }

  function img(src, alt) { return src ? `<img src="${src}" alt="${esc(alt)}" loading="lazy">` : ""; }

  function itemCard(it, prevStem) {
    const mark = (state.marks[it.id] || {}).m;
    let head, body;
    if (it.hw) {
      head = `<span class="src hw">Homework</span> ${it.title}`;
      body = `<div class="prompt">${it.prompt}</div>`;
    } else {
      const m = M[it.id] || {}, s = M[stemId(it.id)] || {};
      const same = prevStem === stemId(it.id);
      const ctx = (it.context || []).map(c => img((M[c] || {}).q, examLabel(c))).join("");
      head = `<span class="src">${examLabel(it.id)}</span> ${m.pts ? `<span class="pts">${m.pts} pts${m.bonus ? " bonus" : ""}</span>` : ""}`;
      body = `
        <details class="setup" ${same && !it.context ? "" : "open"}><summary>${same ? "Question setup (same as above)" : "Question setup"} <span class="muted">— ${esc((s.title || "").replace(/\s+/g, " "))}</span></summary>
          <div class="img">${img(s.stem, "setup")}${ctx}</div></details>
        <div class="img q">${img(m.q, "question")}</div>`;
    }
    const code = it.code ? codeTrainer(it.code) : "";
    const mine = it.mine ? `
      <details class="mine"><summary>What you wrote in Moed B <span class="score">${it.mine.score}</span></summary>
        ${it.mine.img ? `<div class="img scan">${img(it.mine.img, "your Moed B answer")}</div>` : ""}
        <p>${it.mine.what}</p></details>` : "";
    const sol = it.hw
      ? `<div class="solution">${it.solution}<p class="muted">${esc(it.source)}</p></div>`
      : `<div class="img">${img((M[it.id] || {}).sol, "official solution")}</div>`;
    return `
      <article class="item ${mark || ""}" id="i-${it.id}">
        <div class="item-h"><div>${head}</div>${mark ? `<span class="pill ${mark}">${MARKS[mark]}</span>` : ""}</div>
        ${body}
        ${code}
        <div class="reveals">
          ${it.move ? `<details class="fm"><summary>Stuck? Show the first move</summary><p>${it.move}</p></details>` : ""}
          ${mine}
          <details class="sol"><summary>Official solution</summary>${sol}</details>
        </div>
        <div class="marks" data-id="${it.id}">
          <span class="muted">After checking:</span>
          ${Object.entries(MARKS).map(([k, v]) => `<button class="mk ${k} ${mark === k ? "on" : ""}" data-m="${k}">${v}</button>`).join("")}
        </div>
      </article>`;
  }

  // ── code trainer ─────────────────────────────────────────────────────────
  const norm = s => s.replace(/\s+/g, "").replace(/;$/, "").replace(/:$/, "").replace(/^if/, "").replace(/'/g, '"');
  function stripLhs(s, label) {                  // allow "grad = X.T @ z" when the label already says "grad ="
    const lhs = /^\(\d\)\s+([\w.]+)\s*=$/.exec(label);
    return lhs ? s.replace(new RegExp("^" + lhs[1].replace(/\./g, "\\.") + "="), "") : s;
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
    const c = CODE[box.dataset.key];
    const answers = {};
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

  function wire(t) {
    $("#main").querySelectorAll(".marks").forEach(el => el.addEventListener("click", e => {
      const b = e.target.closest("button.mk"); if (!b) return;
      const id = el.dataset.id, m = b.dataset.m;
      if ((state.marks[id] || {}).m === m) delete state.marks[id]; else state.marks[id] = { m, t: Date.now() };
      save();
      const card = document.getElementById("i-" + id);
      card.className = "item " + ((state.marks[id] || {}).m || "");
      el.querySelectorAll("button.mk").forEach(x => x.classList.toggle("on", (state.marks[id] || {}).m === x.dataset.m));
      const pill = $(".item-h .pill", card); if (pill) pill.remove();
      if (state.marks[id]) $(".item-h", card).insertAdjacentHTML("beforeend", `<span class="pill ${m}">${MARKS[m]}</span>`);
      renderSide(t.id);
    }));
    $("#main").querySelectorAll(".code").forEach(box => {
      $(".check", box).onclick = () => checkCode(box);
      box.querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", e => { if (e.key === "Enter") checkCode(box); }));
    });
  }

  // ── routing ──────────────────────────────────────────────────────────────
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const t = parts[0] === "t" ? TOPICS.find(x => x.id === parts[1]) : null;
    renderSide(t ? t.id : null);
    if (t) renderTopic(t, parts[2]); else renderHome();
    if (!parts[2]) window.scrollTo(0, 0);
  }
  try { const th = localStorage.getItem(KEY + "_theme"); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
  window.addEventListener("hashchange", route);
  route();
})();
