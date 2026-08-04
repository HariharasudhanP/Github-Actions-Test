# Development Strategy — “About Me (Skills)” React SPA

## Scope & Inputs
- **Building:** Minimal single-page “About Me” site focused on **Skills**
- **Stack:** React SPA (Vite + TypeScript), CSS Modules, Vitest + React Testing Library
- **In scope:**
  - Single page with **Header/Nav**, **Hero/About**, **Skills list**, **Footer**
  - Token-driven minimal styling; responsive layout
  - A11y basics (landmarks, skip link, headings, list semantics, focus-visible)
  - Unit/component tests for rendering + semantics
- **Out of scope:** backend/API, database, authentication, CMS, analytics, contact form, real IaC (optional Docker static hosting is acceptable but not required)
- **Primary “source of truth” inputs available in this phase:** orchestrator scope + existing scaffold/files under `src/` as implemented by frontend worker

## Folder / File Plan (target structure)
- `index.html` — meta tags, root mount
- `src/main.tsx` — app bootstrap + global styles import
- `src/App.tsx`, `src/App.module.css` — page composition + layout + skip link
- `src/styles/tokens.css` — design tokens (color/type/spacing/radius/focus)
- `src/styles/global.css` — reset + global element styles + reduced motion
- `src/components/`
  - `SiteHeader/` (`SiteHeader.tsx`, `.module.css`) — brand + in-page nav
  - `SiteFooter/` (`SiteFooter.tsx`, `.module.css`) — copyright + back-to-top
- `src/sections/`
  - `AboutSection/` — hero/intro card
  - `SkillsSection/`
    - `SkillsSection.tsx`, `.module.css` — heading + key + list grid
    - `components/SkillCard/` — individual skill presentation
- `src/data/skills.ts` — editable skills data source (local array)
- `src/tests/setup.ts` — jest-dom matchers
- `src/App.test.tsx` — smoke tests covering key semantics
- `vitest.config.ts` — jsdom + setup

## Minimal Design Tokens (decision log)
- **Typography tokens:** body / display / mono fonts; 4 text sizes
- **Spacing tokens:** `--space-1..7` using a 4px-ish scale
- **Color tokens:** background, panels, foreground, muted/subtle, border, 2 accents
- **Focus token:** `--focus-ring` applied via `:focus-visible`
- **Rationale:** keep styling consistent and easy to tweak without refactoring components

## Page Sections & Semantics (requirements)
1. **Skip link**: first focusable element → `href="#main"`
2. **Header**
   - `<header>` containing `<nav aria-label="Primary">`
   - in-page anchors: `#about`, `#skills`
3. **Main**
   - `<main id="main">` single column container with max width
4. **About/Hero section**
   - `<section id="about" aria-labelledby="about-title">`
   - `<h1 id="about-title">` single page H1
5. **Skills section**
   - `<section id="skills" aria-labelledby="skills-title">`
   - `<h2 id="skills-title">`
   - Skills rendered as a **list** (`role="list"`) of **listitems**
   - Empty-state message uses `role="status"`
6. **Footer**
   - `<footer>` (`contentinfo`) + “Back to top” anchor

## Build Sequence (sequenced task table)
| # | Task | Component | Files (create/modify) | Implements (story/contract) | Depends on | Tests | Parallel? |
|---|------|-----------|------------------------|------------------------------|------------|-------|-----------|
| 1 | Initialize React SPA scaffold (Vite+TS) | frontend-foundation | `package.json`, `vite.config.ts`, `index.html`, `src/main.tsx` | Project bootstrap for SPA | — | `npm run build` sanity | no |
| 2 | Establish design tokens + global styles | styling-system | `src/styles/tokens.css`, `src/styles/global.css` | Minimal token-driven styling requirement | 1 | Visual check; lint-free CSS | yes (after 1) |
| 3 | Compose App shell + skip link + layout container | app-shell | `src/App.tsx`, `src/App.module.css` | Single-page layout; a11y skip link; responsive container | 2 | RTL: skip link present; `<main>` exists | no |
| 4 | Header with primary in-page nav | UI-component | `src/components/SiteHeader/*` | Header + nav anchors (`#about`, `#skills`) | 3 | RTL: `navigation[Primary]` present | yes (after 3) |
| 5 | Footer with contentinfo landmark + back-to-top | UI-component | `src/components/SiteFooter/*` | Footer + “Back to top” | 3 | RTL: `<footer>` present | yes (after 3) |
| 6 | About section (hero card) | page-section | `src/sections/AboutSection/*` | “About me” content; single H1 | 3 | RTL: H1 exists (optional) | yes (after 3) |
| 7 | Skills data model (local, editable) | data | `src/data/skills.ts` | Skills content source; easy to edit | 1 | Type-check | yes (after 1) |
| 8 | Skills section + list semantics + empty state | page-section | `src/sections/SkillsSection/*` | Skills list UI + key + empty-state status | 7,2,3 | RTL: skills heading + list + listitems | no |
| 9 | Skill card component | UI-component | `src/sections/SkillsSection/components/SkillCard/*` | Present each skill consistently | 8 | Covered via Skills/App tests | yes (after 8 contract fixed) |
| 10 | Testing harness (Vitest + RTL setup) | test-foundation | `vitest.config.ts`, `src/tests/setup.ts` | Ability to run component tests | 1 | `npm test` runs | no |
| 11 | App smoke tests for landmarks + skills rendering | tests | `src/App.test.tsx` | Validate layout semantics + seeded skills | 10,3,8 | `npm test` green; coverage baseline | no |
| 12 | A11y + responsive QA pass (manual checklist) | QA | (no files required; optional notes) | Confirm keyboard/focus, headings, contrast, mobile layout | 2–9 | N/A | yes |

## Vertical-Slice Strategy (recommended increments)
Slice A (fast integration): **App shell + tokens + header/footer + about**  
- Confirms overall layout, typography, sticky header, skip link, and responsive container early.

Slice B (core value): **Skills data + skills section + cards + tests**  
- End-to-end content path: `src/data/skills.ts` → UI render → semantics tests.

Slice C (hardening): **A11y & responsive pass + empty state**  
- Reduce regressions and ensure “minimal but polished” feel.

## Accessibility Checks (manual + testable)
- **Keyboard navigation**
  - Skip link visible on focus and jumps to `#main`
  - Header links and “Back to top” reachable and have visible focus ring (`:focus-visible`)
- **Landmarks**
  - `header`, `nav[aria-label="Primary"]`, `main`, `footer` all present
- **Headings**
  - Exactly one `h1` in About; Skills uses `h2`; Skill names use `h3` inside card
- **Skills semantics**
  - Skills container exposes `role="list"` and each card `role="listitem"`
  - Empty state uses `role="status"` to announce changes
- **Reduced motion**
  - `prefers-reduced-motion` disables transitions/animations
- **Color contrast**
  - Quick check: muted/subtle text still readable on bg; adjust tokens if needed

## Test Expectations (minimum)
- **Unit/component smoke tests (RTL)**
  - Renders primary navigation landmark (`role="navigation" name="Primary"`)
  - Renders `main` landmark
  - Renders `footer` (`contentinfo`)
  - Renders Skills heading (`h2`) and list (`role="list" name="Skills list"`)
  - Skills list has at least 1 `listitem` with seeded data
  - Skip link exists and targets `#main`
- **Optional (if time)**
  - Empty state test by mocking `skills` to `[]` (requires module mock strategy)
  - Snapshot tests are not necessary; prefer behavior assertions

## Dependency / Library Decisions
- **No new UI libraries** (keep minimal; CSS Modules + tokens are sufficient).
- **Testing stack already suitable:** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- If adding anything later, require justification (a11y tooling like `eslint-plugin-jsx-a11y` could be a future enhancement; not required by scope).

## Risks & Spikes
- **Risk: CSS `color-mix()` support** varies across older browsers. If broad compatibility is required, plan a spike to replace `color-mix()` with fixed RGBA/hex values.
- **Risk: “Empty state” test** might need module mocking; confirm project conventions for mocks if required.
- **Non-goal risk:** adding routing (React Router) is unnecessary for in-page anchors; avoid scope creep.

## Definition of Done (per task)
1. **Scaffold**
   - App runs via `npm run dev`; production build completes via `npm run build`.
2. **Tokens + global styles**
   - Tokens defined once; globals don’t break component isolation; reduced-motion respected.
3. **App shell**
   - Skip link present and functional; `main` has stable id `main`; responsive padding/max width.
4. **Header**
   - Sticky header doesn’t cover anchored sections (use scroll-margin-top on sections).
5. **Footer**
   - Footer renders current year; “Back to top” points to `#main`.
6. **About section**
   - Contains exactly one H1 and short descriptive copy; no hard-coded personal data required.
7. **Skills data**
   - `Skill` type defined; seed data included; easy to edit in one file.
8. **Skills section**
   - Renders title, key, and list semantics; empty state handles zero skills.
9. **Skill card**
   - Displays name, level, note; preserves semantics (`article` listitem).
10. **Test harness**
   - `npm test` runs in jsdom with jest-dom matchers; CSS handling enabled if needed.
11. **Tests**
   - All tests pass; failures are actionable; no flaky timers.
12. **QA pass**
   - Keyboard/focus verified; mobile layout verified at ~360px width; no obvious contrast issues.

--- 

## Integration Notes (planner-to-implementer alignment)
- **Contract between data and UI:** `Skill = { name, level, note }`, `level ∈ "Core" | "Strong" | "Working"`.
- **Editing workflow:** update `src/data/skills.ts` only; UI should update without further changes.
- **A11y baseline:** keep ARIA labels stable to avoid breaking tests and assistive tech navigation.