import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const input = cva(
  "w-full bg-surface text-body text-ink placeholder:text-ink-muted transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: { sm: "h-9 px-3", md: "h-11 px-4", lg: "h-12 px-4" },
      radius: { field: "rounded-field", pill: "rounded-pill" },
      tone: {
        default: "shadow-card",
        muted: "bg-surface-muted",
        invalid: "shadow-card ring-2 ring-danger-fg",
      },
    },
    defaultVariants: { size: "md", radius: "field", tone: "default" },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof input> {}

/** Single-line text field. Pair with `Field` for label, hint and error text. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size, radius, tone, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(input({ size, radius, tone }), className)}
      {...props}
    />
  );
});