import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badge = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-caption font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-surface-muted text-ink-soft",
        peach: "bg-accent-peach text-accent-peach-fg",
        lime: "bg-accent-lime text-accent-lime-fg",
        solid: "bg-ink text-surface",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

/** Small status pill: "На перевірці", "Прийнято", "4 уроки". */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, ...props },
  ref,
) {
  return <span ref={ref} className={cn(badge({ variant }), className)} {...props} />;
});