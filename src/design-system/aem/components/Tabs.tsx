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

/** Segmented tab switcher with a white active pill. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, value, onValueChange, className, ...props },
  ref,
) {
  return (
    <div ref={ref} role="tablist" className={cn("flex gap-1 rounded-pill p-1", className)} {...props}>
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
              "rounded-pill px-4 py-2 text-caption font-medium transition-colors",
              active ? "bg-surface text-ink shadow-card" : "text-ink-muted hover:text-ink-soft",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
});