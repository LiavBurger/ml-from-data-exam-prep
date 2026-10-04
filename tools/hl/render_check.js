// usage: node render_check.js <walkfile e.g. linclass>  — renders every part of that walk file (all steps + boxes open),
// reports KaTeX errors, page errors, missing start/full answer, and sideways overflow (page and inside boxes).
const path = require('path'); const { open, goto, revealAll } = require('./common');
(async () => {
  const file = process.argv[2]; global.window = {};
  require(path.resolve(__dirname, '../../data/walks/' + file + '.js'));
  const pids = Object.keys(window.WALKS), qs = [...new Set(pids.map(p => p.split('.')[0]))];
  const { b, page } = await open(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const out = [];
  for (const q of qs) {
    await goto(page, '#/q/' + q);
    for (const pid of pids.filter(p => p.startsWith(q + '.'))) {
      if (!(await revealAll(page, pid))) { out.push(pid + ': NO WALK RENDERED'); continue; }
      const r = await page.evaluate((pid) => { const w = document.querySelector(`[data-pid="${pid}"]`), res = [];
        if (w.querySelector('.katex-error')) res.push('KaTeX error: ' + w.querySelector('.katex-error').textContent.slice(0, 80));
        if (!w.querySelector('.mv.start')) res.push('no start'); if (!w.querySelector('details.fullans')) res.push('no full answer');
        [...w.querySelectorAll('.formula, .paper, .katex-display, .remember, .depth, .pointtext, .tw')].forEach(e => { if (e.scrollWidth > e.clientWidth + 2) res.push('overflow +' + (e.scrollWidth - e.clientWidth) + 'px in .' + e.className.split(' ')[0] + ': ' + e.innerText.slice(0, 40).replace(/\n/g, ' ')); });
        return res; }, pid);
      r.forEach(x => out.push(pid + ': ' + x));
    }
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) out.push(q + ': page scrolls sideways');
  }
  errs.forEach(e => out.push('page error: ' + e)); await b.close();
  console.log(out.length ? out.join('\n') : `✓ ${pids.length} parts render cleanly (start + full answer present, no KaTeX errors, no overflow)`);
})();
