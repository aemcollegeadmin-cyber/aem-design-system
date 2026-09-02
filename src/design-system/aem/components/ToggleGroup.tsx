import { forwardRef } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "../lib/cn";

export interface ToggleGroupProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> {
  /** "single" allows one pressed item; "multiple" allows many. */
  type?: "single" | "multiple";
}

/** Bordered pill switcher for filters, view toggles and segmented controls. */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
  { className, type = "single", ...props },
  ref,
) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type={type}
      className={cn(
        "inline-flex w-fit gap-1 rounded-pill border-2 border-border-strong bg-surface-muted p-1",
        className,
      )}
      {...props}
    />
  );
});

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  function ToggleGroupItem({ className, children, ...props }, ref) {
    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-pill border-2 border-transparent px-4 py-2 text-caption font-medium text-ink-muted transition-colors",
          "hover:bg-surface/60 hover:text-ink-soft",
          "data-[state=on]:border-border-strong data-[state=on]:bg-surface data-[state=on]:text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
          className,
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    );
  },
);
