# KSSoftware Website Summary

**Domain:** kssoftware.net
**Hosting:** GitHub Pages
**Tech Stack:** Static HTML/CSS/JS (exported from WordPress with Divi theme v4.27.4)
**Formatting:** Prettier v3.3.3

---

## 1. File & Folder Structure

```
/
├── CNAME                          # GitHub Pages custom domain (kssoftware.net)
├── CLAUDE.md                      # Project documentation
├── index.html                     # Main landing page (~200KB)
├── privacy-policy.html            # Privacy policy for Job Post Tracker extension
├── package.json                   # Node project config (Prettier)
├── package-lock.json
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .prettierrc
├── .prettierignore
│
├── assets/js/
│   ├── enable-js-class.js         # Adds 'js' class to <html>
│   ├── jquery-alias-lock.js       # Locks $ to jQuery
│   ├── jquery-stub.js             # jQuery stub for pre-load queuing
│   └── mock-wp-json.js            # Mocks WP REST API for static site
│
├── SystemDesigns/
│   └── sublime_architecture.html  # Sublime Security architecture doc
│
├── Tutors/
│   └── Julie/
│       ├── index.html             # PDF viewer page
│       ├── Julie.pdf              # (not committed)
│       └── Julie_assets/
│           └── page-001.jpg       # Rendered PDF page
│
├── Utils/
│   ├── crawl.mjs                  # Playwright-based site crawler
│   ├── fetch-assets.mjs           # Downloads wp-content assets from index.html
│   └── fetch-one.mjs              # Downloads a single asset via Playwright
│
├── wp-content/
│   ├── themes/Divi/
│   │   ├── style-static.min.css   # Main Divi theme stylesheet
│   │   ├── js/scripts.min.js      # Divi core scripts
│   │   ├── core/admin/
│   │   │   ├── js/common.js       # Browser detection
│   │   │   └── fonts/fontawesome/  # FontAwesome icon fonts
│   │   └── includes/builder/feature/dynamic-assets/assets/js/
│   │       ├── jquery.fitvids.js  # Responsive video embedding
│   │       ├── jquery.mobile.js   # jQuery Mobile utilities
│   │       └── sticky-elements.js # Sticky scroll elements
│   ├── uploads/
│   │   ├── 2024/10/               # UCLA logos
│   │   ├── 2025/05/               # Headshots, company logos, lifestyle images
│   │   └── 2025/08/               # Video (Keith-Smith-Video.mp4), SEO image
│   └── et-fonts/                  # Custom fonts (Avenir variants)
│
└── wp-includes/
    └── js/
        ├── jquery/
        │   ├── jquery.min.js
        │   └── jquery-migrate.min.js
        └── mediaelement/
            ├── mediaelement-and-player.min.js
            ├── mediaelement-migrate.min.js
            ├── wp-mediaelement.min.js
            ├── mediaelementplayer-legacy.min.css
            └── wp-mediaelement.min.css
```

---

## 2. HTML File Content

### index.html — Main Landing Page

**Title:** "Keith Smith"
**Subtitle (H2):** "Senior Engineering Leader | Growth Platforms | AI-Enablement"

**Sections (in order):**

| Section        | Anchor ID       | Description                                      |
|----------------|-----------------|--------------------------------------------------|
| Header/Nav     | —               | Desktop + mobile navigation menus                |
| Hero           | —               | H1 "Keith Smith", H2 tagline                     |
| Experience     | `#experience`   | Professional experience                          |
| Results        | `#results`      | Key accomplishments                              |
| Expertise      | `#expertise`    | Skills and technical expertise                   |
| Education      | `#education`    | Educational background                           |
| Meet Keith     | `#meet`         | Personal introduction                            |
| Testimonials   | `#testimonials` | Professional testimonials                        |
| Q & A          | `#qa`           | Question and answer section                      |
| Interests      | `#interests`    | Golf, Cooking, Travel (with images)              |
| Contact        | `#contact`      | Phone: 916-802-8853, Email: keith@kssoftware.net |

### privacy-policy.html — Privacy Policy

**Title:** "Privacy Policy – Job Post Tracker"
**Author:** Keith Smith (keith@kssoftware.net)
**Published:** March 2026

**Sections:**
1. Overview — Job Post Tracker Chrome extension privacy
2. Data We Access — Job posting content, notes, tags
3. How Data Is Used — Save postings, store notes (no ads/analytics)
4. Where Data Is Stored — Notion workspace via Notion API
5. Data Sharing — Only Notion, no third parties
6. Data Retention and Deletion — User-controlled in Notion
7. Permissions — Minimal required access
8. Children's Privacy — Not directed at under-13
9. Changes to This Policy
10. Contact

### SystemDesigns/sublime_architecture.html — Architecture Doc

**Title:** "Sublime Security Platform Architecture"
**Subtitle:** "Real-Time Email Threat Detection System with Retroactive Scanning"

**Scale Stats:** 2.5B emails/day, 100K peak emails/sec, <2s latency, 3.75 PB storage

**System Layers:**
1. Customer Mail Systems — Microsoft 365, Google Workspace, IMAP
2. Ingestion Layer — Lambda, Kafka, Kubernetes
3. Detection Engines (parallel) — Identity/Auth, Content Analysis (NLP/LLM), Link/URL, Attachment Scanner, Visual Analysis, Behavioral Analysis, MQL Rule Engine
4. Autonomous AI Agents — ASA (Security Analyst), ADE (Detection Engineer)
5. Action Engine — Quarantine, Warning, Attachment Stripping, Alerts
6. Storage Layer — S3, Cassandra/PostgreSQL, Elasticsearch, DynamoDB

**Key Feature:** Retroactive scanning (75B emails in 24 hours)

### Tutors/Julie/index.html — PDF Viewer

**Title:** "Julie"
**Content:** Minimal page displaying `Julie_assets/page-001.jpg` on a dark background (#0b0c0f)

---

## 3. CSS Structure

### Divi Theme (`wp-content/themes/Divi/style-static.min.css`)

Minified Divi v4.27.4 theme stylesheet. Key class/ID patterns:

**Layout:**
- `#page-container` — Main page wrapper
- `#et-boc` — Divi builder outer container
- `.et_pb_section` — Full-width section blocks
- `.et_pb_row` — Row containers
- `.et_pb_column` — Columns (`.et_pb_column_1_3`, `_1_2`, `_4_4`, etc.)

**Modules:**
- `.et_pb_text` / `.et_pb_text_inner` — Text blocks
- `.et_pb_blurb` — Blurb/icon+text blocks
- `.et_pb_image` — Image modules
- `.et_pb_button` — Button styling
- `.et_pb_video` — Video embeds

**Navigation:**
- `#et-top-navigation` — Desktop nav
- `#et_mobile_nav_menu` — Mobile nav
- `.et-menu` — Menu list
- `.menu-item` / `.current-menu-item` — Nav items
- `.sub-menu` — Dropdown menus

**Responsive:** Mobile-first with media queries for breakpoints

### Inline CSS (index.html)

~2000+ lines of inline styles including:
- CSS custom properties/variables (Divi presets)
- WordPress block library theme CSS
- Section-specific background colors, spacing, typography

### privacy-policy.html (Inline)

- `body` — `max-width: 760px; margin: 48px auto; font-family: system-ui`
- `h1` — `font-size: 1.8rem`
- `h2` — `font-size: 1.15rem; border-bottom`
- Links — `color: #1a73e8`
- Meta text — `color: #666; font-size: 0.88rem`

### sublime_architecture.html (Inline)

- `.container` — `max-width: 1600px`, white background, rounded borders
- `.layer` — `background: #f7fafc`, colored borders per layer
- `.components` — CSS Grid layout
- `.component` — `border: 2px`, hover effects
- `.stat-box` — Gradient background (`#667eea` to `#764ba2`)
- `.highlight-box` — `background: #edf2f7`, left border accent

### MediaElement CSS (`wp-includes/js/mediaelement/`)

- `mediaelementplayer-legacy.min.css` — Legacy media player styles
- `wp-mediaelement.min.css` — WordPress media player integration

---

## 4. Meta Tags & SEO Elements

### index.html

| Tag                        | Value                                                        |
|----------------------------|--------------------------------------------------------------|
| `<title>`                  | Keith Smith                                                  |
| `<link rel="canonical">`   | https://kssoftware.net/                                      |
| `og:locale`                | en_US                                                        |
| `og:type`                  | website                                                      |
| `og:title`                 | Keith Smith                                                  |
| `og:url`                   | https://kssoftware.net/                                      |
| `og:site_name`             | Keith Smith                                                  |
| `og:image`                 | ./wp-content/uploads/2025/08/seo-scaled.jpg (2560x1176, JPEG)|
| `twitter:card`             | summary_large_image                                          |
| `twitter:title`            | Keith Smith                                                  |
| `twitter:image`            | ./wp-content/uploads/2025/08/seo-scaled.jpg                  |
| `article:modified_time`    | 2025-08-07T19:40:33+00:00                                    |
| `robots`                   | index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1 |

**JSON-LD Schema:** WebPage, ImageObject, BreadcrumbList, WebSite
**SEO Plugin:** Yoast SEO v25.6

### privacy-policy.html

No meta tags beyond `<title>` ("Privacy Policy – Job Post Tracker")

### sublime_architecture.html

No meta tags beyond `<title>` ("Sublime Security Platform Architecture")

### Tutors/Julie/index.html

No meta tags beyond `<title>` ("Julie")

---

## 5. Internal Navigation & Links

### Primary Nav Menu (index.html — desktop & mobile)

```
Home (/)
├── Experience    → #experience
├── Results       → #results
├── Expertise     → #expertise
└── Education     → #education

Meet Keith        → #meet
├── Testimonials  → #testimonials
├── Q & A         → #qa
└── Interests     → #interests

Contact           → #contact
```

### Cross-Page Links

| From                    | To                              | Type          |
|-------------------------|---------------------------------|---------------|
| index.html              | #experience, #results, etc.     | Anchor links  |
| privacy-policy.html     | notion.so/privacy               | External link |
| privacy-policy.html     | mailto:keith@kssoftware.net     | Email link    |
| index.html (contact)    | mailto:keith@kssoftware.net     | Email link    |
| index.html (contact)    | LinkedIn profile                | External link |

### Orphan Pages (not linked from main nav)

- `/privacy-policy.html` — No inbound links from other pages
- `/SystemDesigns/sublime_architecture.html` — No inbound links from other pages
- `/Tutors/Julie/index.html` — No inbound links from other pages

---

## Summary Statistics

| Metric              | Value     |
|---------------------|-----------|
| HTML pages           | 4         |
| CSS files            | 3         |
| JS files             | 13        |
| Utility scripts      | 3 (.mjs)  |
| Image assets         | ~40+      |
| Font files           | 3+        |
| Config files         | 6         |
| Total files (approx) | ~70+      |
