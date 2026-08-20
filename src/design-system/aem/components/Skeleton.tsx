import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const skeleton = cva("animate-pulse bg-surface-muted", {
  variants: {
    radius: { field: "rounded-field", card: "rounded-card", pill: "rounded-pill" },
  },
  defaultVariants: { radius: "field" },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeleton> {}

/** Loading placeholder block. Size it with layout utilities. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { className, radius, ...props },
  ref,
) {
  return <div ref={ref} aria-hidden="true" className={cn(skeleton({ radius }), className)} {...props} />;
});