# KSSoftware Website

Static website for **kssoftware.net** (Keith Smith's personal site), hosted on GitHub Pages.

## Project Structure

- `index.html` — Main landing page
- `Tutors/` — Tutor pages (e.g., Julie)
- `SystemDesigns/` — System design documents
- `Utils/` — Node.js utility scripts (crawl, fetch assets)
- `assets/` — JS, CSS, images
- `wp-content/`, `wp-includes/` — Static assets from a WordPress export
- `privacy-policy.html` — Privacy policy page

## Tech Stack

- Static HTML/CSS/JS site (originally exported from WordPress)
- jQuery (with a stub/shim for pre-load queuing)
- GitHub Pages hosting via CNAME (`kssoftware.net`)
- Prettier for formatting (`npm run format`)

## Development

```bash
npm run format      # Format all files with Prettier
npm run lint:format # Check formatting
```

## Notes

- The site uses mock WP JSON endpoints and jQuery alias locks to work as static HTML after WordPress export.
- No build step required — files are served as-is via GitHub Pages.
