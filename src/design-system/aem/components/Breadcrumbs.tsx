import { forwardRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  label?: string;
}

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
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a href={item.href} className="text-ink-muted hover:text-ink">
                  {item.label}
                </a>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-ink">
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="size-3 text-ink-muted" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});