// fetch-assets.mjs — Download wp-content assets referenced by index.html
// Usage: node Utils/fetch-assets.mjs https://kssoftware.net

import fs from 'fs/promises';
import path from 'path';

const base = process.argv[2] || 'https://kssoftware.net';
const htmlPath = path.resolve('index.html');

function toSet(iterable) { const s = new Set(); for (const v of iterable) s.add(v); return s; }

function unique(arr) { return Array.from(new Set(arr)); }

function normRel(p) {
  // Expect strings like './wp-content/...'
  if (!p) return null;
  if (p.startsWith('./')) return p.slice(1); // 'wp-content/...'
  if (p.startsWith('/')) return p;          // '/wp-content/...'
  return null;
}

function absUrl(rel, baseUrl) {
  const norm = rel.startsWith('/') ? rel : '/' + rel;
  return new URL(norm, baseUrl).toString();
}

function joinUrl(u, rel) {
  // Join rel to the directory of u
  const url = new URL(u);
  if (rel.startsWith('data:')) return null;
  try { return new URL(rel, url).toString(); } catch { return null; }
}

function extractAssetsFromHtml(html) {
  const found = new Set();
  const add = (s) => { const n = normRel(s); if (n && n.includes('/wp-content/')) found.add(n); };

  // 1) Capture src= and href=
  for (const m of html.matchAll(/\b(?:src|href)=("|')([^"'>]+)\1/gi)) {
    add(m[2]);
  }
  // 2) Capture srcset entries
  for (const m of html.matchAll(/\bsrcset=("|')([^"']+)\1/gi)) {
    const parts = m[2].split(',');
    for (const p of parts) {
      const url = p.trim().split(/\s+/)[0];
      add(url);
    }
  }
  // 3) Capture CSS url(...) occurring inline in HTML
  for (const m of html.matchAll(/url\(([^)]+)\)/gi)) {
    let v = m[1].trim().replace(/^['"]|['"]$/g, '');
    add(v);
  }
  return Array.from(found);
}

async function ensureDirFor(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function download(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get('content-type') || '';
  return { buf, ct };
}

function extractCssUrls(css, ownerUrl) {
  const out = new Set();
  for (const m of css.matchAll(/url\(([^)]+)\)/gi)) {
    let v = m[1].trim().replace(/^['"]|['"]$/g, '');
    if (!v || v.startsWith('data:')) continue;
    const abs = joinUrl(ownerUrl, v);
    if (abs) out.add(abs);
  }
  return Array.from(out);
}

async function main() {
  const html = await fs.readFile(htmlPath, 'utf8');
  const relAssets = extractAssetsFromHtml(html);

  const queue = [];
  for (const rel of relAssets) {
    const u = absUrl(rel, base);
    queue.push({ url: u, rel });
  }

  const fetched = new Set();
  const errors = [];
  const cssToParse = [];

  for (const item of queue) {
    if (fetched.has(item.url)) continue;
    fetched.add(item.url);
    try {
      const { buf, ct } = await download(item.url);
      const outPath = path.join('.', item.rel.startsWith('/') ? item.rel.slice(1) : item.rel);
      await ensureDirFor(outPath);
      await fs.writeFile(outPath, buf);
      if ((ct || '').includes('text/css')) {
        cssToParse.push({ url: item.url, css: buf.toString('utf8') });
      }
      // Be nice to servers
      await new Promise(r => setTimeout(r, 50));
    } catch (e) {
      errors.push({ url: item.url, rel: item.rel, error: String(e.message || e) });
    }
  }

  // Parse CSS files for additional assets (fonts/images referenced relatively)
  for (const entry of cssToParse) {
    const extra = extractCssUrls(entry.css, entry.url);
    for (const abs of extra) {
      if (fetched.has(abs)) continue;
      fetched.add(abs);
      try {
        const { buf } = await download(abs);
        // Determine local path corresponding to abs
        const u = new URL(abs);
        const rel = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
        const outPath = path.join('.', rel);
        await ensureDirFor(outPath);
        await fs.writeFile(outPath, buf);
        await new Promise(r => setTimeout(r, 50));
      } catch (e) {
        errors.push({ url: abs, rel: '(css-ref)', error: String(e.message || e) });
      }
    }
  }

  // Summary
  console.log(`Fetched ${fetched.size} URLs (including CSS refs).`);
  if (errors.length) {
    console.log(`Errors (${errors.length}):`);
    for (const err of errors) {
      console.log('-', err.url, '->', err.error);
    }
  }
}

main().catch(e => { console.error('FAILED:', e); process.exit(1); });

