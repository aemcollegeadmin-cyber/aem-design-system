import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badge = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-caption font-medium",
  {
    variants: {
      variant: {
        neutral: "text-ink-soft",
        peach: "bg-accent-peach text-accent-peach-fg",
        lime: "bg-accent-lime text-accent-lime-fg",
        solid: "bg-ink text-surface",
      },
      /**
       * Background the badge sits on (neutral variant only). `onSurface`
       * (default) renders a light-grey pill for white surfaces; `onMuted`
       * renders a white pill for grey surfaces.
       */
      tone: { onSurface: "", onMuted: "" },
    },
    compoundVariants: [
      { variant: "neutral", tone: "onSurface", class: "bg-surface-muted" },
      { variant: "neutral", tone: "onMuted", class: "bg-surface shadow-card" },
    ],
    defaultVariants: { variant: "neutral", tone: "onSurface" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badge> {}

/** Small status pill: "На перевірці", "Прийнято", "4 уроки". */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, variant, tone, ...props },
  ref,
) {
  return <span ref={ref} className={cn(badge({ variant, tone }), className)} {...props} />;
});
