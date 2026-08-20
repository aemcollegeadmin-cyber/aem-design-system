import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const card = cva("", {
  variants: {
    variant: {
      surface: "bg-surface shadow-card",
      muted: "bg-surface-muted",
      panel: "bg-surface-muted",
    },
    padding: { none: "", sm: "p-3", md: "p-4", lg: "p-6" },
    radius: { card: "rounded-card", panel: "rounded-panel", field: "rounded-field" },
  },
  defaultVariants: { variant: "surface", padding: "md", radius: "card" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

/** Generic surface container. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant, padding, radius, ...props },
  ref,
) {
  return <div ref={ref} className={cn(card({ variant, padding, radius }), className)} {...props} />;
});