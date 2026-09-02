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
  `border-border-line` (canonical hairline / divider colour),
  `text-h1|h2|h4|body|caption`, `shadow-card`. Add a new token to
  `src/design-system/aem/styles/theme.css` if a value is genuinely missing.
- No inline `style` for styling. The single exception is a computed dimension,
  e.g. the progress bar's `width`.
- Import components from the barrel (`@/design-system/aem`), never deep paths.
- Compose existing components before writing a new one — `LessonRow` builds on
  `StatusIcon`, `ModuleCard` on `ProgressBar` + `Badge`, `UserChip` on `Avatar`.

## Typography — exactly six roles

- The scale is closed: `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-body`,
  `text-caption`. No other size may appear — never `text-sm`, `text-xl`, or an
  arbitrary `text-[13px]`. Prefer the `Text` component (`variant="h1" | "h2" | "h3" |
  "h4" | "paragraph" | "caption" | "link"`) over raw classes.
- Font weight is part of the token, not the markup: h1/h2/h3/h4 are 700, body and
  caption are 500. Never add `font-medium` / `font-semibold` next to a
  `text-*` role class — it duplicates (or weakens) the token. Weight utilities
  are allowed only on non-role text such as button labels or table headers,
  where the component already sets them.
- Tone is expressed with color tokens (`text-ink`, `text-ink-soft`,
  `text-ink-muted`) — a different tone is never a new size.



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
- Any control that sits on `bg-surface-muted` must have a visible border so it
  does not dissolve into the canvas. `Button` secondary/ghost, `IconButton`
  muted, and `Switch` all ship with a 2px `border-border-strong` outline by
  default.
- For a binary on/off setting use `Switch` — no text labels inside the control.
  For a group of mutually exclusive options use `RadioGroup` or `Tabs`.

## Type scale usage

H1 for page titles, H2 for module titles, H4 for card titles, `body` for
content and controls, `caption` for meta, timestamps and badges.

See `.lovable/rules/design-tokens.md` and `.lovable/rules/components.md` for the
generated token and component reference.
## Іконки

- Іконки рендеряться тільки через `<Icon name="…" size="md|lg|xl" />` з дизайн-системи. Не імпортуй `lucide-react` напряму в продуктовому коді.
- Реєстр `icons` (outline, lucide) і `filledIcons` (solid, phosphor) містять однакові семантичні імена. Потрібна нова іконка — додай ім'я в ОБА реєстри, а не окремий імпорт.
- Розміри фіксовані: md 20, lg 24, xl 32. **md завжди рендериться двохсоставною (duotone: основна форма + прозорий парний шар)** — 2px штрих на малому розмірі виглядає надто важким. lg і xl — outline зі сталим штрихом 2px (`absoluteStrokeWidth`).


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

## Верхня навігація сторінки

- Кожна сторінка починається з `PageNav`: кнопка «назад», заголовок (H1) і
  другорядний рядок — `breadcrumbs` зі статусом у кінці. Не збирай власні шапки
  з IconButton + тексту, щоб верх не «стрибав» між сторінками.
- `backHref` = навігація (рендериться `<a>`), `onBack` = дія (`<button>`).
  Опускай обидва тільки на кореневих сторінках без батька.
- Статус сторінки йде в проп `status` — у кінці рядка хлібних крихт.
- Дії сторінки (кнопки) йдуть у проп `actions` — на крайній правій стороні шапки.
- `PageHeader` лишається для великих секційних заголовків з описом; для
  консістентної верхньої навігації використовуй саме `PageNav`.

- Хлібні крихти приймають `href` (навігація, працює з Cmd+click) або `onClick`
  (дія). Не збирай власні трейли з тексту і шевронів.
- Сторінка з власним заголовком (наприклад inline-інпут назви) використовує
  `PageNav` з пропом `titleSlot` — щоб не було двох H1.
- Режим редагування сторінки — компонент `EditHeader`: inline-інпут назви,
  слот `controls` для перемикачів (`Switch`, `Tabs`) і `actions` для «Зберегти /
  Скасувати». Не роби кастомних edit-шапок у продуктовому коді.

## Панель уроку

- Права панель уроку — компонент `LessonSidebar`: таби зверху, `callout` зі
  статусом, тіло опису і стек дій знизу над хайрлайном. Не збирай власні картки
  для цього блоку.
- `contentState="clamped"` (дефолт) обрізає тіло і додає градієнтне затухання,
  `"full"` — показує весь контент. Інших станів немає.
- Дії передаються в `actions` як `Button variant="secondary" block` — вони
  стають вертикальним стеком автоматично.

## Оновлення (icons / LessonSidebar / dialogs)

- Реєстр `icons` / `filledIcons` розширено: редактор (`bold`, `italic`, `heading1`, `heading2`, `list`, `listOrdered`, `quote`, `link`, `unlink`, `gripVertical`, `save`), файли й медіа (`bookOpen`, `fileText`, `fileImage`, `folderOpen`, `image`, `imagePlus`, `camera`, `upload`, `download`, `zoomIn`, `zoomOut`), навчання (`graduationCap`, `award`, `trophy`, `clipboardCheck`, `activity`, `megaphone`, `partyPopper`, `sparkles`, `wand`), акаунти й система (`userCircle`, `userCog`, `userPlus`, `userMinus`, `logIn`, `keyRound`, `sliders`, `refresh`, `rotateCcw`, `plug`, `unplug`, `loader`). Ніколи не імпортуй lucide/phosphor напряму — тільки `Icon`.
- `LessonSidebar` має `contentState="scroll"` (фіксована висота панелі, скролиться лише тіло) та `headerSlot` (форма/фільтри замість табів).
- `MediaDialogAction` підтримує `disabled` і `loading`; `onClick` може повернути `false` (або Promise, що резолвиться у `false`), щоб не закривати попап при помилці валідації. Async `onClick` автоматично показує спінер. `OnboardingStep` має `onNext`, `nextDisabled`, `nextLoading`.
- `Button` має проп `loading` (спінер + блокування).

## Дашборд студента (ScoreCard / LeaderboardCard / ContinueLessonCard / StreakChip)

- Головна сторінка навчання складається з готових компонентів; не збирай власні
  картки: `ScoreCard` (бал у коледжі, 2/3 сітки), `LeaderboardCard` (рейтинг
  тижня, 1/3 сітки), `ContinueLessonCard` (урок, на якому людина зупинилась),
  `StreakChip` (day streak у шапці, поруч з головною дією).
- Темні поверхні мають власні токени: `bg-surface-inverse`,
  `bg-surface-inverse-muted`, `text-on-inverse`, `text-on-inverse-soft`,
  `bg-on-inverse-track`. На темному фоні НЕ використовуй `text-ink*`.
- Прев'ю уроку — тільки `MediaPreview` з `kind="video|test|reading|task|image"`
  (глиф підбирається автоматично) і `size="sm|md|lg"`. Не вставляй `<video>` чи
  `<img>` вручну як постер.
- Поточний студент у рейтингу — `current: true` у записі (рядок стає
  `bg-accent-brand`), а не окремий компонент.
- Бали, час і місця передаються вже відформатованими рядками — компоненти не
  форматують числа.

## Гейміфікація (MVP)

- Стани завантаження і порожні стани вже вбудовані: `ScoreCard loading`,
  `LeaderboardCard loading` / порожній `entries={[]}` (показує `emptyLabel`),
  `ScoreCard chart={{ bars: [] }}` (перший тиждень), `Scoreboard loading` /
  порожні `rows`. Не малюй власні `Skeleton`/`EmptyState` для цих блоків.
- Серія 0 днів — `<StreakChip days={0} active={false} />`, не окремий компонент.
- Окрема сторінка рейтингу тижня — `Scoreboard` (`rows`, `currentRow` для
  закріпленого власного рядка, `footer` для `Pagination`). Без перемикача
  періодів: MVP показує лише тиждень.
- Нарахування балів показується тостом `toastPoints({ points, reason })`;
  потрібен один `<Toaster />` у корені. Не роби власних toast-стилів.
- Підвищення місця в рейтингу — `RankUpDialog` у `DialogRoot` з керованим
  `open`. Показувати один раз на подію, не на кожен рендер.

