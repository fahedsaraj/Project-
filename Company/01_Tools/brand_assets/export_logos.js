// Export UIA logo files (SVG, PNG, PDF, social, favicon) from parts.json.
// Usage: node export_logos.js parts.json OUT_DIR
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [partsFile, OUT] = process.argv.slice(2);
const parts = JSON.parse(fs.readFileSync(partsFile, 'utf8'));
const C = { gold: '#E2A02D', blue: '#29566C', midnight: '#0B1626', white: '#FFFFFF', black: '#000000' };
const VARIANTS = {
  'full-colour': { gold: C.gold, accent: C.blue, word: C.blue },
  'reversed': { gold: C.gold, accent: C.white, word: C.white },
  'blue': { gold: C.blue, accent: C.blue, word: C.blue },
  'gold': { gold: C.gold, accent: C.gold, word: C.gold },
  'black': { gold: C.black, accent: C.black, word: C.black },
  'white': { gold: C.white, accent: C.white, word: C.white },
};
const DARK = new Set(['reversed', 'gold', 'white']);
const PNG_WIDTH = { stacked: 3000, horizontal: 4000, symbol: 2048 };
const fill = (s, v) => s.replace(/\{gold\}/g, v.gold).replace(/\{accent\}/g, v.accent).replace(/\{word\}/g, v.word);
const mk = (d) => fs.mkdirSync(d, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Measure each lockup's bounding box and the cap height of UNITED (clear space x).
  const boxes = {};
  for (const [name, p] of Object.entries(parts)) {
    const inner = fill(p.gold + p.accent + p.word, VARIANTS['full-colour']);
    await page.setContent(`<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000"><g id="all">${inner}</g><g id="w">${fill(p.word, VARIANTS['full-colour'])}</g></svg>`);
    boxes[name] = await page.evaluate(() => {
      const b = document.getElementById('all').getBBox();
      const w = document.getElementById('w');
      const first = w.firstElementChild ? w.firstElementChild.getBBox() : null;
      return { x: b.x, y: b.y, w: b.width, h: b.height, cap: first ? first.height : null };
    });
  }
  const capX = boxes.stacked.cap; // UNITED letter height in the stacked lockup
  const svgDoc = (name, v, pad) => {
    const b = boxes[name], p = parts[name];
    const k = name === 'stacked' ? 1 : name === 'horizontal' ? (b.h / boxes.stacked.h) : 1;
    const padU = pad ? (name === 'symbol' ? b.w * 0.12 : (name === 'horizontal' ? boxes.horizontal.cap : capX)) : 0;
    const vb = [b.x - padU, b.y - padU, b.w + 2 * padU, b.h + 2 * padU].map(n => +n.toFixed(3));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${vb[2]}" height="${vb[3]}">` +
      `<title>United International Academy logo (${name}, ${v})</title>` + fill(p.gold + p.accent + p.word, VARIANTS[v]) + `</svg>`;
  };

  const render = async (svg, outPng, width, bg) => {
    const vb = svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
    const height = Math.round(width * vb[3] / vb[2]);
    await page.setViewportSize({ width, height });
    await page.setContent(`<html><body style="margin:0;background:${bg || 'transparent'}">${svg.replace('<svg ', `<svg style="display:block;width:${width}px;height:${height}px" `)}</body></html>`);
    await page.screenshot({ path: outPng, omitBackground: !bg, clip: { x: 0, y: 0, width, height } });
  };

  for (const name of Object.keys(parts)) {
    for (const v of Object.keys(VARIANTS)) {
      const base = `uia-logo-${name}-${v}`;
      const tight = svgDoc(name, v, false), padded = svgDoc(name, v, true);
      mk(path.join(OUT, 'SVG')); fs.writeFileSync(path.join(OUT, 'SVG', base + '.svg'), tight);
      mk(path.join(OUT, 'PNG')); await render(padded, path.join(OUT, 'PNG', base + '.png'), PNG_WIDTH[name]);
      if (v === 'full-colour' || v === 'reversed') {
        mk(path.join(OUT, 'PNG', 'web'));
        await render(padded, path.join(OUT, 'PNG', 'web', base + '-1000px.png'), 1000);
        // Vector PDF for print. Reversed artwork is placed on Midnight so it is visible.
        mk(path.join(OUT, 'PDF'));
        const vb = padded.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
        const wmm = 120, hmm = wmm * vb[3] / vb[2];
        await page.setContent(`<html><head><style>@page{size:${wmm}mm ${hmm}mm;margin:0}html,body{margin:0}</style></head><body style="background:${DARK.has(v) ? C.midnight : 'transparent'}">${padded.replace('<svg ', `<svg style="display:block;width:${wmm}mm;height:${hmm}mm" `)}</body></html>`);
        await page.pdf({ path: path.join(OUT, 'PDF', base + '.pdf'), width: `${wmm}mm`, height: `${hmm}mm`, printBackground: DARK.has(v), pageRanges: '1' });
      }
    }
  }

  // Social avatar: reversed symbol centred on Midnight (platforms crop to a circle).
  mk(path.join(OUT, 'Social'));
  const sym = boxes.symbol, sp = parts.symbol;
  const side = Math.max(sym.w, sym.h) / 0.62; // symbol fills 62% so it survives the circle crop
  const cx = sym.x + sym.w / 2, cy = sym.y + sym.h / 2;
  const avatar = (bgc, v) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${cx - side / 2} ${cy - side / 2} ${side} ${side}"><rect x="${cx - side / 2}" y="${cy - side / 2}" width="${side}" height="${side}" fill="${bgc}"/>${fill(sp.gold + sp.accent, VARIANTS[v])}</svg>`;
  fs.writeFileSync(path.join(OUT, 'Social', 'uia-avatar-midnight.svg'), avatar(C.midnight, 'reversed'));
  await render(avatar(C.midnight, 'reversed'), path.join(OUT, 'Social', 'uia-avatar-midnight-1080.png'), 1080);
  await render(avatar(C.midnight, 'reversed'), path.join(OUT, 'Social', 'uia-avatar-midnight-320.png'), 320);

  // Favicons and app icons.
  mk(path.join(OUT, 'Favicon'));
  const iconSide = Math.max(sym.w, sym.h) / 0.78;
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${cx - iconSide / 2} ${cy - iconSide / 2} ${iconSide} ${iconSide}"><rect x="${cx - iconSide / 2}" y="${cy - iconSide / 2}" width="${iconSide}" height="${iconSide}" rx="${iconSide * 0.18}" fill="${C.midnight}"/>${fill(sp.gold + sp.accent, VARIANTS.reversed)}</svg>`;
  fs.writeFileSync(path.join(OUT, 'Favicon', 'favicon.svg'), icon);
  for (const s of [16, 32, 48, 180, 192, 512]) {
    const n = s === 180 ? 'apple-touch-icon.png' : `icon-${s}.png`;
    await render(icon, path.join(OUT, 'Favicon', n), s);
  }
  // Email signature logo: horizontal full colour, 360px wide (shown at 180px = guideline screen minimum, sharp on retina).
  const sigDir = path.join(OUT, '..', 'Email_Signature'); mk(sigDir);
  await render(svgDoc('horizontal', 'full-colour', false), path.join(sigDir, 'uia-signature-logo-360w.png'), 360);
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'measurements.json'), JSON.stringify({ boxes, clearSpaceX_stacked: capX }, null, 2));
  console.log('done', JSON.stringify(boxes));
})();
