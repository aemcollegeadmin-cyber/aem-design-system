import { forwardRef } from "react";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

export interface BreadcrumbItem {
  label: string;
  /** Navigation target — renders an anchor (supports Cmd+click / new tab). */
  href?: string;
  /** Click handler. With `href` it augments the link; without it renders a button. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  label?: string;
}

const interactiveClasses = "text-ink-muted transition-colors hover:text-ink";

function Crumb({ item, current }: { item: BreadcrumbItem; current?: boolean }) {
  if (!current && (item.href || item.onClick)) {
    return item.href ? (
      <a href={item.href} onClick={item.onClick} className={cn(interactiveClasses, "truncate")}>
        {item.label}
      </a>
    ) : (
      <button type="button" onClick={item.onClick} className={cn(interactiveClasses, "truncate")}>
        {item.label}
      </button>
    );
  }

  return (
    <span aria-current={current ? "page" : undefined} className="truncate text-ink">
      {item.label}
    </span>
  );
}

const Chevron = () => (
  <Icon name="chevronRight" size="md" className="shrink-0 text-ink-muted" aria-hidden="true" />
);

/**
 * Trail of ancestor pages; the last item is the current page.
 * On mobile the trail always stays on one line: everything above the previous
 * step collapses into an ellipsis, so only `… / попередній крок / поточна`
 * is shown. The full trail returns from `sm:` up.
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, label = "Навігація", className, ...props },
  ref,
) {
  const previous = items.length > 1 ? items[items.length - 2] : undefined;
  const current = items[items.length - 1];
  const collapsed = items.length > 2;

  return (
    <nav ref={ref} aria-label={label} className={cn("min-w-0 text-caption", className)} {...props}>
      {/* Mobile: single line, collapsed */}
      <ol className="flex min-w-0 items-center gap-1.5 sm:hidden">
        {collapsed && (
          <li aria-hidden="true" className="flex shrink-0 items-center gap-1.5 text-ink-muted">
            <span>…</span>
            <Chevron />
          </li>
        )}
        {previous && (
          <li className="flex min-w-0 shrink items-center gap-1.5">
            <Crumb item={previous} />
            <Chevron />
          </li>
        )}
        {current && (
          <li className="flex min-w-0 items-center">
            <Crumb item={current} current />
          </li>
        )}
      </ol>

      {/* sm and up: full trail */}
      <ol className="hidden flex-wrap items-center gap-1.5 sm:flex">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex min-w-0 items-center gap-1.5">
              <Crumb item={item} current={isLast} />
              {!isLast && <Chevron />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
