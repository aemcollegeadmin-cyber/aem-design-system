import { forwardRef } from "react";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Required unless `loading` is true. */
  title?: string;
  description?: string;
  /** Breadcrumbs or eyebrow content above the title. */
  above?: React.ReactNode;
  /** Primary actions, right-aligned on wide viewports. */
  actions?: React.ReactNode;
  /** Skeleton placeholder instead of content — keeps the same geometry. */
  loading?: boolean;
}

/** Page title block with optional breadcrumbs and actions. */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, description, above, actions, loading = false, className, ...props },
  ref,
) {
  if (loading) {
    return (
      <header
        ref={ref}
        aria-busy="true"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {above !== undefined && <Skeleton radius="pill" className="h-4 w-48 max-w-full" />}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton radius="pill" className="h-9 w-64 max-w-full" />
            {description !== undefined && (
              <Skeleton radius="pill" className="h-5 w-80 max-w-full" />
            )}
          </div>
          {actions !== undefined && <Skeleton radius="pill" className="h-11 w-32" />}
        </div>
      </header>
    );
  }

  return (
    <header ref={ref} className={cn("flex flex-col gap-3", className)} {...props}>
      {above}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 text-ink">{title}</h1>
          {description && <p className="text-body text-ink-soft">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
});
