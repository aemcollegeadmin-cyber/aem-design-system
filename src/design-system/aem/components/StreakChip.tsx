import { forwardRef } from "react";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

export interface StreakChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Number of days in a row. */
  days: number;
  /** Word after the number. Defaults to "днів". */
  unit?: string;
  /** A cold streak (0 days) renders muted instead of accented. */
  active?: boolean;
  /** Renders a static pill instead of a button when no handler is needed. */
  as?: "button" | "span";
}

/**
 * Day-streak pill for the app header, sitting next to the primary header
 * action. Accented while the streak is alive, muted when it breaks.
 */
export const StreakChip = forwardRef<HTMLElement, StreakChipProps>(function StreakChip(
  { days, unit = "днів", active = true, as = "button", className, ...props },
  ref,
) {
  const content = (
    <>
      <Icon
        name="flame"
        size="md"
        className={active ? "text-accent-brand-fg" : "text-ink-muted"}
      />
      <span>
        {days} {unit}
      </span>
    </>
  );

  const classes = cn(
    "inline-flex h-11 items-center gap-2 rounded-pill border-2 px-4 text-body",
    active
      ? "border-border-strong bg-surface-muted text-ink"
      : "border-border-strong bg-surface text-ink-muted",
    className,
  );

  if (as === "span") {
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={classes}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
});
