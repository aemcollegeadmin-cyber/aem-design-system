# AEM College Design System

A calm, high-contrast learning-platform UI: near-black ink on light grey canvas,
white elevated cards, and two accent tints (peach = waiting on someone, lime =
done). Everything is soft-cornered; actions are fully rounded pills. Interface
copy is Ukrainian by default.

## Hard constraints

- Never write raw color, radius, font-size, or shadow literals. Use the token
  utilities: `text-ink`, `text-ink-soft`, `text-ink-muted`, `bg-surface`,
  `bg-surface-muted`, `bg-accent-peach` / `text-accent-peach-fg`,
  `bg-accent-lime` / `text-accent-lime-fg`, `rounded-field|card|panel|pill`,
  `text-h1|h2|h4|body|caption`, `shadow-card`. Add a new token to
  `src/design-system/aem/styles/theme.css` if a value is genuinely missing.
- No inline `style` for styling. The single exception is a computed dimension,
  e.g. the progress bar's `width`.
- Import components from the barrel (`@/design-system/aem`), never deep paths.
- Compose existing components before writing a new one — `LessonRow` builds on
  `StatusIcon`, `ModuleCard` on `ProgressBar` + `Badge`, `UserChip` on `Avatar`.

## Semantics of the accents

- Peach (`accent-peach`) = blocked / awaiting review ("На перевірці").
- Lime (`accent-lime`) = completed / accepted ("Прийнято", "Пройдено").
- Never use peach or lime as a decorative background for neutral content.

## Component API rules

- Visual variation is exposed as `variant` / `size` props with fixed options,
  never as boolean styling props or a near-duplicate component.
- Components accept `className`, forward their ref, and spread the remaining
  props onto the underlying element.
- Icon-only controls use `IconButton`, which requires a `label` for its
  accessible name. Actions are `<button>`, navigation is `<a>`.
- Keyboard focus stays visible; the theme sets a global `:focus-visible` ring.

## Type scale usage

H1 for page titles, H2 for module titles, H4 for card titles, `body` for
content and controls, `caption` for meta, timestamps and badges.

See `.lovable/rules/design-tokens.md` and `.lovable/rules/components.md` for the
generated token and component reference.