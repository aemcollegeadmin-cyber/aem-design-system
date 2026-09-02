import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const iconButton = cva(
  "inline-flex items-center justify-center rounded-pill border-2 border-transparent transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        muted: "border-border-strong bg-surface-muted text-ink hover:bg-border-subtle",
        solid: "bg-ink text-surface hover:bg-ink/90",
        lime: "bg-accent-lime text-accent-lime-fg hover:brightness-95",
        ghost: "border-transparent bg-transparent text-ink-muted hover:text-ink",
      },
      /** Single control size across the system — sm/lg are kept as aliases. */
      size: { sm: "size-11", md: "size-11", lg: "size-11" },

    },
    defaultVariants: { variant: "muted", size: "md" },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {
  /** Accessible name — required because the control is icon-only. */
  label: string;
}

/** Circular icon-only control (close, play, next). */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ className, variant, size, label, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        className={cn(iconButton({ variant, size }), className)}
        {...props}
      />
    );
  },
);