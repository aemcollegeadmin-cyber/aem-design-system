# Design Tokens

Token reference for **aem-design-system**. Use utility classes and CSS variables — never raw values.

## Colors

Apply with any color utility: `bg-<name>`, `text-<name>`, `border-<name>`, `ring-<name>`, `divide-<name>`, etc.

| Name | CSS variable |
|---|---|
| `aem-ink` | `--aem-ink` |
| `aem-ink-soft` | `--aem-ink-soft` |
| `aem-ink-muted` | `--aem-ink-muted` |
| `aem-surface` | `--aem-surface` |
| `aem-surface-muted` | `--aem-surface-muted` |
| `aem-surface-inverse` | `--aem-surface-inverse` |
| `aem-surface-inverse-muted` | `--aem-surface-inverse-muted` |
| `aem-on-inverse` | `--aem-on-inverse` |
| `aem-on-inverse-soft` | `--aem-on-inverse-soft` |
| `aem-on-inverse-track` | `--aem-on-inverse-track` |
| `aem-border-subtle` | `--aem-border-subtle` |
| `aem-border-strong` | `--aem-border-strong` |
| `aem-focus` | `--aem-focus` |
| `aem-accent-peach` | `--aem-accent-peach` |
| `aem-accent-peach-fg` | `--aem-accent-peach-fg` |
| `aem-accent-lime` | `--aem-accent-lime` |
| `aem-accent-lime-fg` | `--aem-accent-lime-fg` |
| `aem-accent-brand` | `--aem-accent-brand` |
| `aem-accent-brand-fg` | `--aem-accent-brand-fg` |
| `aem-action-disabled-bg` | `--aem-action-disabled-bg` |
| `aem-bg-placeholder` | `--aem-bg-placeholder` |
| `aem-success` | `--aem-success` |
| `aem-success-fg` | `--aem-success-fg` |
| `aem-warning` | `--aem-warning` |
| `aem-warning-fg` | `--aem-warning-fg` |
| `aem-danger` | `--aem-danger` |
| `aem-danger-fg` | `--aem-danger-fg` |
| `aem-info` | `--aem-info` |
| `aem-info-fg` | `--aem-info-fg` |

## Typography

Typography classes (`font-*` for families, `text-*` for sizes):

| Class | CSS variable |
|---|---|
| — | `--aem-border-line` |
| `font-sans` | `--font-sans` |
| `text-h1` | `--text-h1` |
| `text-h1--line-height` | `--text-h1--line-height` |
| `text-h1--font-weight` | `--text-h1--font-weight` |
| `text-h2` | `--text-h2` |
| `text-h2--line-height` | `--text-h2--line-height` |
| `text-h2--font-weight` | `--text-h2--font-weight` |
| `text-h3` | `--text-h3` |
| `text-h3--line-height` | `--text-h3--line-height` |
| `text-h3--font-weight` | `--text-h3--font-weight` |
| `text-h4` | `--text-h4` |
| `text-h4--line-height` | `--text-h4--line-height` |
| `text-h4--font-weight` | `--text-h4--font-weight` |
| `text-body` | `--text-body` |
| `text-body--line-height` | `--text-body--line-height` |
| `text-body--font-weight` | `--text-body--font-weight` |
| `text-caption` | `--text-caption` |
| `text-caption--line-height` | `--text-caption--line-height` |
| `text-caption--font-weight` | `--text-caption--font-weight` |

## Spacing

Apply with any spacing utility: `p-<name>`, `m-<name>`, `gap-<name>`, `space-<name>`, `w-<name>`, `h-<name>`, etc.

| Name | CSS variable |
|---|---|
| — | `--text-h1--letter-spacing` |
| — | `--text-h2--letter-spacing` |
| — | `--text-h3--letter-spacing` |
| — | `--text-h4--letter-spacing` |
| — | `--spacing` |

## Border Radius

Border-radius classes:

| Class | CSS variable |
|---|---|
| `rounded-field` | `--radius-field` |
| `rounded-card` | `--radius-card` |
| `rounded-composer` | `--radius-composer` |
| `rounded-panel` | `--radius-panel` |
| `rounded-pill` | `--radius-pill` |

## Shadows

Box-shadow classes:

| Class | CSS variable |
|---|---|
| — | `--aem-shadow-card` |
| — | `--aem-shadow-overlay` |

## Other

Reference via `var(--name)` in inline styles or CSS.

| CSS variable |
|---|
| `--ease-standard` |
| `--ease-emphasized` |

