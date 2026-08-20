# Finish the AEM design system, then adopt it

Order of work: complete the system here, review and fix it, and only after that touch
"Той самий коледж!". The LMS scan below is used only to size what the system must cover —
no LMS code changes in this plan.

What the LMS tells us it needs: Vite + React 18 on **Tailwind v3**, the full **shadcn/ui**
set (48 primitives), 18 pages, shadcn-shaped HSL tokens in `src/index.css`, 86 raw color
literals, 11 files touching `dark:`.

Current system: 19 bespoke components, a Tailwind v4 `@theme` file, light-only, no form or
overlay primitives.

## Phase 1 — Complete the tokens

- Fill the gaps in `src/design-system/aem/styles/theme.css`: a semantic state set
  (success / warning / danger / info foregrounds and surfaces), border and ring tokens, a
  focus token, and a z / motion (duration + easing) set.
- Add a **dark theme** as a `@custom-variant`-driven block so every token has a dark value.
- Add a **shadcn-compatible token export** (`styles/theme-shadcn-v3.css`): the same palette
  expressed as HSL triplets under the shadcn variable names (`--background`, `--card`,
  `--primary`, `--muted`, `--border`, `--radius`, `--warning` → peach, `--success` → lime,
  plus the sidebar block). This is what makes the system usable in a Tailwind v3 shadcn app
  later, and it is authored as part of finishing the system, not as migration work.
- Document radius mapping: our field/card/panel/pill scale against a single `--radius`.

## Phase 2 — Complete the component set

The system covers learning surfaces (lessons, modules, submissions, chat) but not app
chrome or forms. Built in self-continuing waves, each wave verified in the showcase:

- **Forms**: Input, Label, Field (label + hint + error), Select, Checkbox, Radio, Switch,
  PasswordInput, SearchInput.
- **Overlays & feedback**: Dialog, Sheet/Drawer, DropdownMenu, Tooltip, Toast styling,
  Alert, ConfirmDialog.
- **Data**: Table (header/row/cell), Pagination, Skeleton, EmptyState, Separator,
  Accordion.
- **Shell**: AppShell (sidebar + top nav), NavLink, Breadcrumb, PageHeader — the LMS has
  `AppLayout` / `TopNavbar` and a dark sidebar our tokens do not describe.
- **Progress**: CircularProgress (the LMS has its own).

Each gets variant / size props with fixed options, `className` + ref forwarding, a barrel
export, and `usage` / `examples` / `antipatterns` in the catalog.

## Phase 3 — Showcase, docs and metadata

- Rebuild the showcase as a small site behind shared nav: Overview, Colors, Typography,
  Iconography, Components (component sidebar + search), with a light/dark toggle so both
  themes are verified.
- Every component section: live instance, all variants and states side by side
  (default / hover / focus-visible / disabled / loading / error), a copyable snippet, and
  one realistic composition.
- `.lovable/system.md`: accent semantics (peach = awaiting review, lime = accepted), the
  dark-theme rules, and how to consume each theme export.
- Add `.dsignore` so showcase-only files never reach consumers; keep `sources.yaml` and
  `meta.yaml` accurate.

## Phase 4 — Review and fix

- Audit every component against the contract: no raw color / radius / type / shadow
  literals, no styling via inline `style`, variant props not booleans, semantic elements,
  visible focus, ref + `className` forwarding, barrel entry present.
- Check every token is actually used and every component renders correctly in both themes,
  at narrow and wide viewports, in the browser.
- Typecheck and lint clean; fix everything the audit surfaces.

## Phase 5 — Adopt in "Той самий коледж!" (only after Phase 4 is signed off)

- Publish a version of the system and attach it in the LMS.
- Swap the LMS `:root` tokens for the shadcn-compatible export — this restyles all 48
  shadcn primitives at once.
- Then migrate page by page: `CoursesPage`, `CourseDetailPage`, `LessonPage`, then admin
  pages, replacing the 86 raw color literals with tokens.

## Technical notes

- Library stack: TanStack Start + Tailwind v4 (`@theme` in
  `src/design-system/aem/styles/theme.css`). Consumer: Vite + Tailwind v3
  (`tailwind.config.ts` + `@layer base`). The v3 token file is hand-authored CSS with HSL
  triplets so it drops into the LMS `:root` block unchanged.
- Attach copies `src/**`, so both theme files live under `src/design-system/aem/styles/`.
- No LMS code changes until Phase 5, which happens in that project after a publish.