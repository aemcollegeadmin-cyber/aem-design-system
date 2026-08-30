# AEM College Design System

A calm, high-contrast learning-platform UI: near-black ink on light grey canvas,
white elevated cards, and two accent tints (peach = waiting on someone, lime =
done). Everything is soft-cornered; actions are fully rounded pills. Interface
copy is Ukrainian by default.

## Hard constraints

- Tokens live ONLY in the design system. A project that attaches this library
  must never declare its own colors, fonts, text sizes, radii, or shadows —
  every value comes from the system's token files (`theme.css`, or
  `theme-shadcn-v3.css` for Tailwind v3 / shadcn consumers). If a value is
  genuinely missing, it is added to the design system and published as a new
  version — never patched locally in the consumer.
- Never edit files inside the attached design-system folder in a consumer
  project. Attach is a versioned snapshot: any local edit there is overwritten
  by the next library update. All customization flows through new library
  versions, not consumer-side forks.
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
## Іконки

- Іконки рендеряться тільки через `<Icon name="…" size="sm|md|lg|xl" />` з дизайн-системи. Не імпортуй `lucide-react` напряму в продуктовому коді.
- Реєстр `icons` містить лише прості outline-глифи (одна фігура, без дрібних внутрішніх деталей), щоб іконка була читабельною на 16px і не створювала шуму. Потрібна нова іконка — додай семантичне ім'я в реєстр, а не окремий імпорт.
- Розміри фіксовані: sm 16, md 20, lg 24, xl 32. Штрих завжди 2px (`absoluteStrokeWidth`), незалежно від розміру.

## Попапи та онбординг

- Модальні вікна: `Dialog` (форми, стандартний контент), `ConfirmDialog`
  (підтвердження дій), `Sheet` (бокова панель), `MediaDialog` (медіа-попапи:
  анонси, «що нового», інструкції з картинкою / GIF / відео / embed).
- Багатокрокові онбординг-флоу — тільки `OnboardingDialog` (обгортка над
  `MediaDialog`): кроки з медіа або акцентною іконкою, прогрес-точки,
  «Далі / Назад / Пропустити». Не збирай власні state-машини онбордінгу.
- `dismissible={false}` (або `OnboardingDialog` без `onSkip`) робить попап
  блокуючим: без хрестика, Esc і клік по оверлею ігноруються — використовуй це
  лише для обов'язкових кроків (наприклад, встановлення пароля).
- Медіа задається через проп `media` (`image | video | embed`), співвідношення —
  через `mediaAspect`. Не вставляй `<img>` / `<iframe>` вручну в тіло діалогу.
- Дії задаються через `primaryAction` / `secondaryAction` / `tertiaryAction`;
  за замовчуванням клік закриває попап, `keepOpen: true` — залишає відкритим.
