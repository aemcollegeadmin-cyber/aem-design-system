import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabItem[];
  value: string;
  onValueChange?: (value: string) => void;
}

/** Segmented tab switcher with a bordered, pill-shaped track. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, value, onValueChange, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex w-fit gap-1 rounded-pill border-2 border-border-strong bg-surface-muted p-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onValueChange?.(item.value)}
            className={cn(
              "rounded-pill px-4 py-2 text-caption transition-colors",
              active
                ? "bg-surface text-ink shadow-card"
                : "text-ink-muted hover:bg-surface hover:text-ink-soft",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
});