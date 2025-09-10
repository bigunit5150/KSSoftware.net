// fetch-one.mjs
// Usage:
//   node fetch-one.mjs "https://keith-smith-engineering.com/wp-content/uploads/2025/05/headshot-3-e1747837111984-300x300.jpg" "site_copy"
// Notes:
//   - Requires: npm i playwright  &&  npx playwright install chromium
//   - Saves to: <outRoot>/<host>/<original-path>

import fs from "fs/promises";
import path from "path";
import { chromium } from "playwright";

const urlArg = process.argv[2];
const outRoot = process.argv[3] || "site_copy";

if (!urlArg) {
  console.error("Usage: node fetch-one.mjs <absolute-url> [out_root]");
  process.exit(1);
}

const targetUrl = new URL(urlArg);
const ORIGIN = targetUrl.origin;

// Map content-type → extension (fallback if URL has no extension)
function extFromContentType(ct = "") {
  const type = ct.split(";")[0].trim().toLowerCase();
  if (type.startsWith("image/")) return "." + type.split("/")[1].replace("jpeg", "jpg");
  if (type === "text/css") return ".css";
  if (type === "application/javascript" || type === "text/javascript") return ".js";
  if (type === "font/woff2") return ".woff2";
  if (type === "font/woff") return ".woff";
  if (type === "font/ttf") return ".ttf";
  if (type === "application/json") return ".json";
  return "";
}

function stripQuery(u) {
  return u.split("?")[0];
}

function destPathFor(u, contentType = "") {
  const url = new URL(u);
  let p = stripQuery(url.pathname).replace(/\/+/g, "/");
  const hasExt = path.extname(p) !== "";
  if (!hasExt) p += extFromContentType(contentType) || "";
  return path.join(outRoot, url.host, p);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      extraHTTPHeaders: {
        "Referer": ORIGIN,
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // Use Playwright's request context so we don't need to render a page
    const req = await ctx.request.get(targetUrl.toString(), { timeout: 45000 });
    if (!req.ok()) {
      throw new Error(`HTTP ${req.status()} fetching ${targetUrl}`);
    }

    const ct = req.headers()["content-type"] || "";
    const buf = await req.body();
    const dest = destPathFor(targetUrl.toString(), ct);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buf);
    console.log(`Saved: ${dest}`);
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error("FAILED:", e.message || e);
  process.exit(1);
});
