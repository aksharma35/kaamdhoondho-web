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

## Desktop (lg+) layout rules — do not ship phone columns on web

The Figma has web frames only for: landing (1:2), role selection (24:2), marketplace grids
(74:2 employer, 78:2 worker), detail modals (81:2, 83:2). For every other screen the mobile
frame defines CONTENT and STYLE, and these rules define the desktop LAYOUT:

- Focused single-task screens (auth/OTP, onboarding steps, success states): centered card
  (max-w-md) is correct on desktop — keep it.
- Tabbed app screens (worker/employer shells): on lg+ the bottom tab bar becomes a left
  sidebar (brand at top, nav items with icon+label, active = mint bg + teal text); content
  area uses the freed width — lists become 2-col grids, cards get max-w-2xl, forms may go
  two-column. Below lg, keep the mobile bottom-tab layout.
- Detail views: bottom sheet on mobile, centered modal with overlay on lg+ (per 81:2/83:2).
- Never present a lone 390px column with dead space on both sides for browsing/list screens.

## Commands

- Dev server: `npm start` (preview launch config name: `web`, port 4200).
- Build check: `npm run build`.
- Git identity is repo-local (personal email) — never commit with the enterprise email.

## Verify before done

Run the app, exercise the changed flow in the browser, check console for errors, test EN and HI.
