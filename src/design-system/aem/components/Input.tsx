import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const input = cva(
  "w-full border-2 border-border-strong bg-surface text-body text-ink placeholder:text-ink-muted transition-colors hover:border-ink focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: { sm: "h-11 px-4", md: "h-11 px-4", lg: "h-11 px-4" },
      radius: { field: "rounded-pill", pill: "rounded-pill" },
      tone: {
        default: "",
        muted: "bg-surface-muted",
        invalid: "border-danger-fg",
      },
    },
    defaultVariants: { size: "md", radius: "pill", tone: "default" },

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
      data-aem-input-control
      ref={ref}
      type={type}
      className={cn(input({ size, radius, tone }), className)}
      {...props}
    />
  );
});