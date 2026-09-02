import { forwardRef } from "react";
import { Icon } from "./Icon";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { cn } from "../lib/cn";

export interface PageNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Page title, rendered as the single H1 of the page. */
  title: string;
  /** Secondary line under the title (path, meta, subtitle). Ignored when `breadcrumbs` is set. */
  subtitle?: string;
  /** Breadcrumb trail rendered instead of `subtitle`. */
  breadcrumbs?: BreadcrumbItem[];
  /** Navigation target for the back control — renders an anchor. */
  backHref?: string;
  /** Click handler for the back control — renders a button. Ignored when `backHref` is set. */
  onBack?: () => void;
  /** Accessible name of the back control. */
  backLabel?: string;
  /** Trailing content: status badge, actions. */
  actions?: React.ReactNode;
}

const backClasses =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-pill border-2 border-border-strong bg-surface-muted text-ink no-underline transition-colors hover:bg-border-subtle";

/** Consistent page-top navigation: back control, title, secondary line, trailing actions. */
export const PageNav = forwardRef<HTMLElement, PageNavProps>(function PageNav(
  {
    title,
    subtitle,
    breadcrumbs,
    backHref,
    onBack,
    backLabel = "Назад",
    actions,
    className,
    ...props
  },
  ref,
) {
  const showBack = Boolean(backHref || onBack);

  return (
    <header
      ref={ref}
      className={cn("flex w-full items-center gap-4", className)}
      {...props}
    >
      {showBack &&
        (backHref ? (
          <a href={backHref} aria-label={backLabel} className={backClasses}>
            <Icon name="chevronLeft" size="lg" aria-hidden="true" />
          </a>
        ) : (
          <button type="button" aria-label={backLabel} onClick={onBack} className={backClasses}>
            <Icon name="chevronLeft" size="lg" aria-hidden="true" />
          </button>
        ))}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h1 className="truncate text-h2 text-ink">{title}</h1>
        {breadcrumbs ? (
          <Breadcrumbs items={breadcrumbs} />
        ) : (
          subtitle && <p className="truncate text-caption text-ink-muted">{subtitle}</p>
        )}
      </div>

      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
});
