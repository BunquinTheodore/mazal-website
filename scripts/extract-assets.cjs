// One-off extraction script: pulls base64 data URIs out of the legacy
// single-file index.html into real asset files, and writes a stripped
// copy of the HTML (data URIs replaced with /assets/... paths) so the
// remaining markup/text is readable for porting into React components.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'mazal-website', 'index.html');
const OUT_ASSETS = path.join(__dirname, '..', 'extracted', 'assets');
const OUT_HTML = path.join(__dirname, '..', 'extracted', 'index.stripped.html');
const MANIFEST = path.join(__dirname, '..', 'extracted', 'manifest.json');

fs.mkdirSync(OUT_ASSETS, { recursive: true });

const html = fs.readFileSync(SRC, 'utf8');

const mimeExt = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/gif': 'gif',
  'font/woff2': 'woff2',
  'font/woff': 'woff',
  'font/ttf': 'ttf',
  'application/font-woff2': 'woff2',
  'application/font-woff': 'woff',
  'application/x-font-woff2': 'woff2',
};

let counter = 0;
const manifest = [];
const seen = new Map(); // hash-ish dedupe by data length+prefix

const re = /data:([a-zA-Z0-9.+/-]+);base64,([A-Za-z0-9+/=]+)/g;

let result = '';
let lastIndex = 0;
let m;
while ((m = re.exec(html)) !== null) {
  const [full, mime, b64] = m;
  const ext = mimeExt[mime] || mime.split('/')[1] || 'bin';
  const kind = mime.startsWith('font') || mime.includes('font') ? 'fonts' : 'images';

  const dedupeKey = mime + ':' + b64.length + ':' + b64.slice(0, 32);
  let fname;
  if (seen.has(dedupeKey)) {
    fname = seen.get(dedupeKey);
  } else {
    counter++;
    fname = `${kind}/asset-${String(counter).padStart(3, '0')}.${ext}`;
    seen.set(dedupeKey, fname);
    const outPath = path.join(OUT_ASSETS, fname);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
    manifest.push({ file: fname, mime, bytes: b64.length });
  }

  result += html.slice(lastIndex, m.index) + `/assets/${fname}`;
  lastIndex = m.index + full.length;
}
result += html.slice(lastIndex);

fs.mkdirSync(path.dirname(OUT_HTML), { recursive: true });
fs.writeFileSync(OUT_HTML, result, 'utf8');
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');

console.log(`Extracted ${manifest.length} unique assets.`);
console.log(`Stripped HTML: ${OUT_HTML} (${(result.length / 1024 / 1024).toFixed(2)} MB)`);
