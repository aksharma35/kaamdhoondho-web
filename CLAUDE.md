# Kaamdhoondho Web (Angular 22)

Two-sided job platform for India's informal labor market. Workers find jobs, employers hire.
Design source of truth: Figma "Kaamdhoondo - Job Marketplace Design" (bilingual mocks are
illustrative — the app shows ONE language at a time, default English, EN|HI toggle).

## Conventions

- Standalone components, signals for state. No NgModules, no NgRx.
- Structure: `core/` (services, guards, i18n), `layouts/`, `features/<role>/<feature>/`, `shared/`.
- Routes: lazy `loadComponent`, `title` on every route. Guards: `authGuard`, `profileGuard`.
- i18n: no hardcoded user-facing strings. `translate` pipe + keys in BOTH
  `public/i18n/en.json` and `hi.json`. Brand lockup "Kaamdhoondo / कामढूंढो" stays bilingual.
- Styling: Tailwind utilities inline. Palette: teal `#0f5c56`, dark `#0a4742`, mid `#1b6f69`,
  mint `#e3f3f1`/`#eaf6f5`, cream bg `#fffbf2`, input bg `#fdf8ec`, borders `#d8e8e6`/`#e4eceb`,
  CTA orange `#ff8a3d` (hover `#e97c2f`), accent yellow `#ffd166`, text `#1e2d2c`, muted `#6b8280`.
  Rounded-full buttons, rounded-2xl/3xl cards.
- Skill categories: import from `shared/constants/categories.ts`, never redefine.
- Backend does not exist yet. Mock seams are marked with `ponytail:` comments
  (`core/auth/auth.service.ts`, `core/profile/profile.service.ts` — localStorage). Keep that
  pattern for new mock data; never auto-publish AI-extracted values without user confirmation.
- Keep it lazy: reuse before writing, no speculative abstractions, shortest working diff.

## Commands

- Dev server: `npm start` (preview launch config name: `web`, port 4200).
- Build check: `npm run build`.
- Git identity is repo-local (personal email) — never commit with the enterprise email.

## Verify before done

Run the app, exercise the changed flow in the browser, check console for errors, test EN and HI.
