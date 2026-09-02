import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-surface hover:bg-ink/90",
        secondary: "bg-surface-muted text-ink hover:bg-border-subtle",
        ghost: "bg-transparent text-ink hover:bg-surface-muted",
        lime: "bg-accent-lime text-accent-lime-fg hover:brightness-95",
      },
      size: {
        sm: "h-9 px-4 text-caption",
        md: "h-11 px-5 text-body",
        lg: "h-12 px-6 text-body",
      },
      block: { true: "w-full", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

/** Pill-shaped action button. Icons are passed as children. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, block, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(button({ variant, size, block }), className)}
      {...props}
    />
  );
});