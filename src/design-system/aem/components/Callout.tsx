import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

const callout = cva("flex items-start gap-2 rounded-field px-3 py-2.5 text-caption", {
  variants: {
    variant: {
      pending: "bg-accent-peach text-accent-peach-fg",
      done: "bg-accent-lime text-accent-lime-fg",
      neutral: "bg-surface-muted text-ink-soft",
    },
  },
  defaultVariants: { variant: "pending" },
});

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof callout> {
  icon?: React.ReactNode;
}

/** Inline informational strip used under lesson content. */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { className, variant = "pending", icon, children, ...props },
  ref,
) {
  const fallback = <Icon name={variant === "done" ? "done" : "alert"} size="md" />;
  return (
    <div ref={ref} className={cn(callout({ variant }), className)} {...props}>
      <span className="mt-px shrink-0">{icon ?? fallback}</span>
      <span>{children}</span>
    </div>
  );
});