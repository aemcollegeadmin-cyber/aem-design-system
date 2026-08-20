import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  /** Trailing controls, pushed to the far edge. */
  trailing?: React.ReactNode;
}

/** Horizontal strip of filters and actions above a list or table. */
export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { label = "Дії", trailing, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="toolbar"
      aria-label={label}
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-card bg-surface p-3 shadow-card",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {trailing && <div className="flex flex-wrap items-center gap-2">{trailing}</div>}
    </div>
  );
});