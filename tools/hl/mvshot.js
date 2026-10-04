// usage: node mvshot.js <out.png> <partId> [li index: 0 = point, 1 = start, 2.. = steps | "all"]
const { open, goto, revealAll } = require('./common');
(async () => {
  const [out, pid, idx = 'all'] = process.argv.slice(2);
  const { b, page } = await open(); await goto(page, '#/q/' + pid.split('.')[0]); await revealAll(page, pid);
  const el = idx === 'all' ? await page.$(`[data-pid="${pid}"]`) : (await page.$$(`[data-pid="${pid}"] li.mv`))[+idx];
  await el.screenshot({ path: out }); await b.close();
})();
