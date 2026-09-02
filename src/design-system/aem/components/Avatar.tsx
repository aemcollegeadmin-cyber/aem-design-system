import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const avatar = cva(
  "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-surface-muted text-ink font-semibold",
  {
    variants: {
      size: { sm: "size-6 text-caption", md: "size-8 text-caption", lg: "size-10 text-body" },
      variant: { muted: "bg-surface-muted", surface: "bg-surface shadow-card" },
    },
    defaultVariants: { size: "md", variant: "muted" },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatar> {
  name: string;
  src?: string;
}

/** Circular avatar that falls back to the first initial. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, src, size, variant, className, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(avatar({ size, variant }), className)} {...props}>
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{name.trim().charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
});