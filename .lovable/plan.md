# Adopting the AEM system in "Той самий коледж!"

I inspected the LMS snapshot. It is a Vite + React 18 app on **Tailwind v3** with the
full **shadcn/ui** set (48 primitives), 18 pages, HSL semantic tokens in `src/index.css`
(blue `--primary`, green `--accent`), 86 raw color literals in pages, and 11 files
touching `dark:`.

This library today ships 19 bespoke components and a **Tailwind v4 `@theme`** file.
Attaching it as-is would not restyle the LMS: none of its shadcn components read our
tokens, and our theme file cannot compile in a v3 project.

Three gaps to close, in order.

## 1. A token layer the LMS can actually consume

The highest-impact piece. Add a second token entry that expresses the same AEM palette as
**shadcn-shaped HSL variables** (`--background`, `--card`, `--primary`, `--muted`,
`--border`, `--radius`, plus `--warning` / `--success` mapped to peach / lime and the
sidebar block the LMS already uses). Dropping that file into the LMS restyles all 48
shadcn primitives and most of the 18 pages at once, with no component rewrites.

Also needed here:
- Radius mapping: the LMS has a single `--radius`; our scale is field/card/panel/pill.
- A **dark theme** — AEM tokens are light-only today, and the LMS references `dark:`.
- Keep the v4 `@theme` file as the canonical entry for new projects; the v3 file is the
  compatibility export.

## 2. Components the LMS needs that the system lacks

The system covers learning surfaces (lessons, modules, submissions, chat) but not the app
chrome and forms the LMS is built from. To add, grouped by wave:

- **Forms**: Input, Label, Field (label + hint + error), Select, Checkbox, Radio, Switch,
  PasswordInput, SearchInput.
- **Overlays & feedback**: Dialog, Sheet/Drawer, DropdownMenu, Tooltip, Toast styling,
  Alert, ConfirmDialog.
- **Data**: Table (header/row/cell), Pagination, Skeleton, EmptyState, Separator,
  Accordion.
- **Shell**: AppShell (sidebar + top nav), NavLink, Breadcrumb, PageHeader — the LMS has
  `AppLayout` / `TopNavbar` and a dark sidebar our tokens do not describe.
- **Progress**: CircularProgress (the LMS has its own).

Each gets variant props, `className` + ref forwarding, a barrel export, and
`usage` / `examples` / `antipatterns` in the catalog.

## 3. Publishing and adoption mechanics

- Document in `system.md` that peach = awaiting review, lime = accepted, and how those map
  to `--warning` / `--success` in the LMS.
- Add `.dsignore` so showcase routes never ship to consumers.
- Publish a version, attach it in the LMS, then migrate page by page — `CoursesPage`,
  `CourseDetailPage`, `LessonPage`, then the admin pages — replacing the 86 raw color
  literals with tokens as we go.

## Technical notes

- Library stack: TanStack Start + Tailwind v4 (`@theme` in
  `src/design-system/aem/styles/theme.css`). Consumer: Vite + Tailwind v3
  (`tailwind.config.ts` + `@layer base`). The v3 token file is hand-authored CSS with HSL
  triplets so it drops into the LMS `:root` block unchanged.
- Attach copies `src/**`, so both theme files live under `src/design-system/aem/styles/`.
- No LMS code changes from this project — that migration happens there after a publish.

## Scope check

This is the library-side work. Tell me whether to start with step 1 only (tokens + dark
theme, the fastest visible win in the LMS) or run straight through the component waves.