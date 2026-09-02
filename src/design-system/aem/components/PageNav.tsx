import { forwardRef } from "react";
import { Icon } from "./Icon";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { cn } from "../lib/cn";

export interface PageNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Page title, rendered as the single H1 of the page. */
  title: string;
  /** Breadcrumb trail rendered under the title. */
  breadcrumbs?: BreadcrumbItem[];
  /** Status badge rendered at the end of the breadcrumb row. */
  status?: React.ReactNode;
  /** Navigation target for the back control — renders an anchor. */
  backHref?: string;
  /** Click handler for the back control — renders a button. Ignored when `backHref` is set. */
  onBack?: () => void;
  /** Accessible name of the back control. */
  backLabel?: string;
  /** Trailing page actions rendered on the far right of the header. */
  actions?: React.ReactNode;
}

const backClasses =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-pill border-2 border-border-strong bg-surface-muted text-ink no-underline transition-colors hover:bg-border-subtle";

/** Consistent page-top navigation: back control, title, breadcrumbs + status, trailing actions. */
export const PageNav = forwardRef<HTMLElement, PageNavProps>(function PageNav(
  {
    title,
    breadcrumbs,
    status,
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

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h1 className="truncate text-h2 text-ink">{title}</h1>
        {breadcrumbs && (
          <div className="flex min-w-0 items-center justify-between gap-4">
            <Breadcrumbs items={breadcrumbs} />
            {status && <div className="flex shrink-0 items-center">{status}</div>}
          </div>
        )}
      </div>

      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
});
