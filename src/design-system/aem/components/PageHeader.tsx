import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  /** Breadcrumbs or eyebrow content above the title. */
  above?: React.ReactNode;
  /** Primary actions, right-aligned on wide viewports. */
  actions?: React.ReactNode;
}

/** Page title block with optional breadcrumbs and actions. */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, description, above, actions, className, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      {above}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-semibold text-ink">{title}</h1>
          {description && <p className="text-body text-ink-soft">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
});