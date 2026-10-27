# Deux Rives Web — Wave 3 local review

This branch builds on the merged corporate foundation and the Wave 2 interactive applications. Wave 3 introduces four **working, browser-only fictional demonstrations**, stronger sector narratives, search and industry filters, and a redesigned mobile navigation.

## Start locally (Windows PowerShell)

If you already cloned this repository:

\`\`\`powershell
git fetch origin
git switch redesign/wave-1-corporate-foundation
git pull --ff-only
npm test
npm run dev
\`\`\`

Open **http://127.0.0.1:4173/** in Chrome or Edge.

If the branch is not available locally yet, run \`git fetch origin\` first and then \`git switch -c redesign/wave-1-corporate-foundation --track origin/redesign/wave-1-corporate-foundation\`.

## Wave 3 acceptance matrix

| App | Local URL | Workflow to verify |
|---|---|---|
| Intervention 360 | http://127.0.0.1:4173/applications/intervention-360/ | Create incident → assign to technician → start → complete; examine journal, refresh and reset |
| FactureConnect | http://127.0.0.1:4173/applications/factureconnect/ | Create fictitious invoice → review → validate → export JSON; reset |
| Devis Atelier | http://127.0.0.1:4173/applications/devis-atelier/ | Add service → adjust quantities → mark sent → edit, triggering a new draft version |
| MissionDesk | http://127.0.0.1:4173/applications/missiondesk/ | Create assignment → record time → submit for delivery → close; refresh and reset |

All records, figures and statuses are fictional. **No invoices are legally issued, no messages are sent, no real service calls are made**, and no client data is stored on a remote server. Entries stay in localStorage under keys beginning with \`drw:wave3:1:\`; reset clears the scenario.

## Cross-site review

1. On **mobile width 375–390 px**, open the hamburger menu at the top and after scrolling. It must cover almost the entire header width, with readable full-width links. Tap each dropdown and verify links do not get clipped.
2. Test tablet at 768 px and desktop at 1366–1440 px. The floating sticky header should not jump or cover interactive elements.
3. Visit \`/studio/\`: filter by **Bâtiment & interventions**, search for **Devis Atelier**, then enter an impossible keyword. The count and empty state must respond; reset both controls.
4. Visit \`/secteurs/transport-logistique/\` and other sector pages to review the premium editorial/industry-UI spotlight that replaces the previous generic context panel.
5. Visit a Wave 3 project via the homepage's eight-product carousel and its studio concept page.
6. From a Wave 3 app, use **Parlons de votre projet**, verify that the contact brief is prefilled with the relevant solution, and add the sector, project category, existing tools and needs.
7. Confirm \`/confidentialite/\` correctly explains localStorage and how to reset the demos.

## Automated tests

\`npm test\` validates **72 generated pages**, links, metadata, contact safeguards and project/sector content.

The GitHub Actions visual pipeline runs Playwright across all pages in desktop and mobile resolutions, checks the mobile navigation width and behavior, checks the studio's search/filter combinations, runs all four Wave 3 workflows, verifies persistence and reset, and uploads screenshots for review.

## What remains outside this milestone

- Real user authentication, shared database, permissions, simultaneous team editing
- Real invoicing submission or regulatory compliance certifications
- Production backend, server-side validations, integration credentials, external API connections
- True offline sync, GPS, technician notifications, payment processing and deployment to client systems
- Customer reviews, testimonials, measured outcomes and legal registration details not yet verified

**Do not use personal or confidential data in demo forms.** The site remains intentionally unindexed until legal/contact readiness is confirmed. Published design examples must remain identified as illustrative, not delivered customer work.

## Reviewer sign-off

- [ ] All eight applications work and reset
- [ ] Mobile navigation remains full width, including expanded submenus
- [ ] Sector landing pages feel differentiated and useful
- [ ] Search and sector filters work together
- [ ] Contact brief includes project, sector and integrations
- [ ] FAQ, typography, spacing, keyboard interaction and contrast reviewed
- [ ] No horizontal overflow or broken internal links
- [ ] Site content does not assert fictional customer projects or unverified legal details
