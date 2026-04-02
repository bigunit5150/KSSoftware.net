# KSSoftware Website

Static website for **kssoftware.net** — Keith Smith's AI consulting site for small businesses, hosted on GitHub Pages.

## Project Structure

- `index.html` — Main homepage (hero, services, process, about preview, testimonials, projects, contact)
- `about.html` — Professional background page (noindex, direct-link only)
- `projects/index.html` — Projects listing (LLM Gateway, AI Job Search System)
- `projects/job-tracker.html` — Job Tracker Chrome extension detail page
- `CareerCopilot/` — AI Job Search System onboarding (4 pages)
  - `index.html` — Overview with flow diagram and setup navigation
  - `extension.html` — Step 1: Chrome extension install
  - `notion-setup.html` — Step 2: Notion database setup + Claude connector
  - `claude-setup.html` — Step 3: Claude project + onboarding prompt (with copy button)
- `jobtracker-privacy-policy.html` — Privacy policy for Chrome extension
- `css/style.css` — Main design system (variables, components, responsive)
- `css/about.css` — About page additional styles
- `js/main.js` — Mobile nav, sticky nav, scroll reveal, smooth scroll
- `Tutors/` — Tutor pages (e.g., Julie)
- `SystemDesigns/` — System design documents
- `Utils/` — Node.js utility scripts (crawl, fetch assets via Playwright)
- `wp-content/` — Static image assets from WordPress export

## Design System

- **Colors:** Dark theme with amber accent (`--amber: #e8a230`). All colors via CSS variables in `:root`.
- **Typography:** Fraunces (display, weight 300) + Plus Jakarta Sans (body, weight 300/400/500/600)
- **Components:** `.card`, `.badge`, `.btn`/`.btn-primary`/`.btn-ghost`, `.grid-2`/`.grid-3`/`.grid-4`, `.eyebrow`, `.section-headline`, `.reveal`, `.divider`, `.callout-bar`
- **Responsive:** Single breakpoint at 768px. Grids collapse to 1-col, hamburger nav on mobile.
- **Animations:** `.reveal` class triggers fade-in on scroll via IntersectionObserver in `main.js`.

## Tech Stack

- Static HTML/CSS/JS site (no build step)
- GitHub Pages hosting via CNAME (`kssoftware.net`)
- Prettier for formatting (`npm run format`)
- No framework dependencies

## Development

```bash
npm run format      # Format all files with Prettier
npm run lint:format # Check formatting
```

## Conventions

- New pages use `../css/style.css` and `../js/main.js` (no additional CSS/JS files)
- Page-specific styles go in `<style>` blocks using existing CSS variables
- Sub-page asset paths use `../` prefix
- `.reveal` class on any element that should animate in on scroll
- Inline styles on project cards match existing patterns
- Footer is consistent across all pages (copyright + privacy policy)
- No build step required — files are served as-is via GitHub Pages

## External URLs

- **Calendly:** `https://calendly.com/keith-kssoftware/30min`
- **LinkedIn:** `https://linkedin.com/in/kesmith3`
- **GitHub:** `https://github.com/bigunit5150/`
- **LLM Gateway repo:** `https://github.com/bigunit5150/ModelGatewayProxy/`
- **Job Tracker repo:** `https://github.com/bigunit5150/JobTrackerChromeExtension`
- **Chrome Web Store:** `https://chromewebstore.google.com/detail/job-tracker-for-notion/ponffclikgodccpghpammcpjpjeojopj`
