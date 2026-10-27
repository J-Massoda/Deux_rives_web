# Deux Rives Web — Wave 2 local testing and development

This milestone adds four **working browser demonstrations** to the corporate website. All names, companies, projects, inventory, budgets, invoices and document fields are fictional.

## Requirements

- Node.js 20 or later (Node.js 22 LTS recommended)
- Git
- A recent browser (Chrome, Firefox or Edge)
- No paid API, Supabase credentials, secrets or cloud services are required.

## Quick start — Windows PowerShell

```powershell
git clone https://github.com/J-Massoda/Deux_rives_web.git
cd Deux_rives_web
git fetch origin
git switch redesign/wave-1-corporate-foundation
node --version
npm install
npm test
npm run dev
```

Open **http://127.0.0.1:4173/**.

If the repository already exists locally, use:

```powershell
git fetch origin
git switch redesign/wave-1-corporate-foundation
git pull --ff-only
npm test
npm run dev
```

This repository uses a dependency-free static-site generator. Install dependencies with `npm install` before running tests; Sharp now converts the ten original PNG image assets to smaller WebP images when generating the site. The GitHub Actions browser workflow installs Playwright separately for screenshot and interaction checks.

## Interactive showcase routes

| Application | Local URL | What to test |
|---|---|---|
| ClientFlow Pro | http://127.0.0.1:4173/applications/clientflow-pro/ | Add an opportunity → qualify → proposal → accepted → a new mission appears |
| ChantierPilot | http://127.0.0.1:4173/applications/chantierpilot/ | Add a work package → +25% progress → add cost → check totals → export CSV |
| CommercePilot | http://127.0.0.1:4173/applications/commercepilot/ | Sell a product → quantity drops → create supplier order → receive → stock rises |
| DocuPilot AI | http://127.0.0.1:4173/applications/docupilot-ai/ | Select sample B-205 → analyze → correct total to 912 → validate → export JSON |

For each application, reload the browser after making a change to verify local persistence, then use **Réinitialiser la démonstration** to recover the initial scenario.

Test the applications again on a narrow/mobile viewport. Check that forms, navigation, result states, side panels and buttons remain usable without horizontal page scrolling.

## How the system works

- `scripts/build.mjs`: static-site generation, page metadata, navigation, routes, and assets
- `scripts/flagships.mjs`: French landing pages and SEO-rich explanations for the four applications
- `src/flagship-apps.js`: four deterministic client-side state machines and actions
- `src/flagship-apps.css`: responsive application UI
- `src/flagship-pages.css`: editorial product-page layout
- `scripts/wave2-guides.mjs`: three practical French guides (including official e-invoicing references)
- `tests/site.test.mjs`: generated page and link tests
- `scripts/flagship-browser-audit.mjs`: end-to-end browser workflows, exports, persistence and reset
- `scripts/browser-audit.mjs`: desktop/mobile scan of all generated routes
- `.github/workflows/visual-audit.yml`: browser verification on pull requests

## Data boundaries

The applications do **not** require account creation, collect real client records, send network requests, process uploads or use live artificial-intelligence services. All user-supplied entries remain in that browser's localStorage, prefixed `drw:demo:v2:`. Avoid typing real confidential information. The reset button clears each application's local storage key and restores fictional records.

A production implementation would require authentication, authorization, server-side validation, reliable persistence, backups, audit logging, error handling, privacy controls, operational monitoring, security assessment, and integration design.

## Acceptance checklist

- [ ] All four application routes render.
- [ ] No controls are decorative: create, advance, update, receive, validate, export and reset all work as labeled.
- [ ] Financial and stock calculations change predictably.
- [ ] Invalid inputs cannot bypass essential checks.
- [ ] Browser refresh preserves the local scenario.
- [ ] Reset restores the initial dataset.
- [ ] Desktop and mobile layouts are navigable.
- [ ] No personal data or simulated analysis is presented as a real client result.
- [ ] Service, sector, product and article links resolve.
- [ ] French copy, SEO metadata, disclosures and legal status are reviewed before public indexing.

## Publishing and SEO

The site intentionally emits `noindex,nofollow` and a restrictive `robots.txt` while `site.config.mjs` has `publishReady: false` and legal fields are incomplete. **Do not enable indexing merely because the pages are finished.** When registration and mandatory public details are confirmed, review legal notices, contact handling, canonical URLs, sitemap, privacy, analytics, and any tax/regulatory claims before launch.

A successful build is not evidence of search rankings or completed regulatory compliance. Published content should remain accurate and updated, especially the French electronic-invoicing schedule.

## Build verification

```powershell
npm test
npm run build
```

The GitHub PR workflow additionally opens the generated website with Chromium/Playwright, checks desktop and mobile routes, simulates full workflows, and saves screenshots as artifacts.
