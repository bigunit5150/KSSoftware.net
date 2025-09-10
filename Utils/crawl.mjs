// crawl.mjs — Save same-origin HTML + assets using real Chromium.
// Usage: node crawl.mjs "https://keith-smith-engineering.com/" "site_copy" 50

import fs from "fs/promises";
import path from "path";
import { chromium } from "playwright";

const startUrl = process.argv[2] || "https://example.com/";
const outRoot = process.argv[3] || "site_copy";
const maxPages = parseInt(process.argv[4] || "50", 10);

const ORIGIN = new URL(startUrl).origin;

const toFile = (url, isHtml=false, contentType="") => {
  const u = new URL(url);
  if (u.origin !== ORIGIN) return null;
  let p = u.pathname.replace(/\/+/g, "/");
  if (p.endsWith("/")) p += isHtml ? "index.html" : "index";
  if (!path.extname(p) && isHtml) p += ".html";
  if (!path.extname(p) && !isHtml) {
    const ct = (contentType||"").split(";")[0].trim().toLowerCase();
    const ext = ct.startsWith("image/") ? "."+ct.split("/")[1].replace("jpeg","jpg")
             : ct==="text/css" ? ".css"
             : (ct==="application/javascript"||ct==="text/javascript") ? ".js"
             : ct==="font/woff2" ? ".woff2"
             : ct==="font/woff"  ? ".woff"
             : ct==="font/ttf"   ? ".ttf"
             : "";
    if (ext) p += ext;
  }
  return path.join(outRoot, u.host, p);
};

const ensureDir = async f => fs.mkdir(path.dirname(f), {recursive:true});

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();

  // Save assets as the page loads
  page.on("response", async (resp) => {
    try {
      const url = resp.url();
      const u = new URL(url);
      if (u.origin !== ORIGIN) return;
      const status = resp.status();
      if (status >= 400) return;
      const ct = resp.headers()["content-type"] || "";
      const isAsset = ct.startsWith("image/") || ct==="text/css" || ct==="application/javascript" || ct==="text/javascript" || ct.startsWith("font/");
      if (!isAsset) return;
      const f = toFile(url, false, ct);
      if (!f) return;
      await ensureDir(f);
      await fs.writeFile(f, await resp.body());
    } catch {}
  });

  const queue = [startUrl];
  const seen = new Set();
  let n = 0;

  while (queue.length && n < maxPages) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });

      // Enqueue same-origin links (skip WP admin/api)
      const hrefs = await page.$$eval("a[href]", as => as.map(a=>a.href).filter(Boolean));
      for (const h of hrefs) {
        try {
          const u = new URL(h, url);
          if (u.origin !== ORIGIN) continue;
          if (u.pathname.startsWith("/wp-admin") || u.pathname.startsWith("/wp-json") || u.pathname.endsWith("/xmlrpc.php")) continue;
          if (!seen.has(u.href) && !queue.includes(u.href)) queue.push(u.href.split("#")[0]);
        } catch {}
      }

      // Save HTML
      const html = await page.content();
      const f = toFile(url, true);
      if (f) {
        await ensureDir(f);
        await fs.writeFile(f, html, "utf8");
      }

      n++;
    } catch {}
  }

  await browser.close();
  console.log(`Done. Saved ~${n} page(s) to ${path.join(outRoot, new URL(startUrl).host)}`);
})();
