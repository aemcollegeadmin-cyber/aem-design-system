import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill border-2 border-transparent font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-surface hover:bg-ink/90",
        secondary: "border-border-strong bg-surface-muted text-ink hover:bg-border-subtle",
        ghost: "border-border-strong bg-transparent text-ink hover:bg-surface-muted",
        lime: "bg-accent-lime text-accent-lime-fg hover:brightness-95",
      },
      /** Single control height across the system — sm/lg are kept as aliases. */
      size: {
        sm: "h-11 px-5 text-body",
        md: "h-11 px-5 text-body",
        lg: "h-11 px-5 text-body",
      },

      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  /** Shows a spinner and blocks interaction while an action is in flight. */
  loading?: boolean;
}

/** Pill-shaped action button. Icons are passed as children. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, block, type = "button", loading, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(button({ variant, size, block }), className)}
      {...props}
    >
      {loading && <Icon name="loader" size="md" className="animate-spin" />}
      {children}
    </button>
  );
});