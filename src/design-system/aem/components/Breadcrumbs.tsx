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

const interactiveClasses = "text-ink-muted hover:text-ink";

/** Trail of ancestor pages; the last item is the current page. */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  { items, label = "Навігація", className, ...props },
  ref,
) {
  return (
    <nav ref={ref} aria-label={label} className={cn("text-caption", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const interactive = !isLast && (item.href || item.onClick);

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {interactive ? (
                item.href ? (
                  <a href={item.href} onClick={item.onClick} className={interactiveClasses}>
                    {item.label}
                  </a>
                ) : (
                  <button type="button" onClick={item.onClick} className={interactiveClasses}>
                    {item.label}
                  </button>
                )
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              )}
              {!isLast && <Icon name="chevronRight" size="md" className="text-ink-muted" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});
