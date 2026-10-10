// Re-print an SVG (from `pdftocairo -svg`, where every glyph is already a path) to PDF at its exact size,
// so the result contains no fonts at all, which is what CorelDRAW/print shops without the brand fonts need.
// Usage: NODE_PATH=$(npm root -g) node outline_pdf.js in.svg out.pdf
const { chromium } = require('playwright');
const fs = require('fs');
const [inSvg, outPdf] = process.argv.slice(2);
const svg = fs.readFileSync(inSvg, 'utf8');
const [, w, h] = svg.match(/<svg[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"/);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(`<html><head><style>@page{size:${w}pt ${h}pt;margin:0}html,body{margin:0;padding:0}svg{display:block;width:${w}pt;height:${h}pt}</style></head><body>${svg.replace(/^<\?xml[^>]*>/, '')}</body></html>`);
  await p.pdf({ path: outPdf, width: `${(w / 72).toFixed(4)}in`, height: `${(h / 72).toFixed(4)}in`, printBackground: true, pageRanges: '1' });
  await b.close();
})();
