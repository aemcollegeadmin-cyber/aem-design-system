import { forwardRef } from "react";
import { Inbox } from "lucide-react";
import { cn } from "../lib/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

/** Placeholder for an empty list, table or filter result. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, icon, action, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-3 rounded-card bg-surface px-6 py-10 text-center shadow-card",
        className,
      )}
      {...props}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-pill bg-surface-muted text-ink-muted">
        {icon ?? <Inbox className="size-5" />}
      </span>
      <span className="text-h4 font-semibold text-ink">{title}</span>
      {description && <span className="max-w-sm text-caption text-ink-muted">{description}</span>}
      {action}
    </div>
  );
});