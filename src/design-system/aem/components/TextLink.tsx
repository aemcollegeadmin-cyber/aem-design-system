import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const textLink = cva(
  "text-body font-semibold underline underline-offset-2 transition-colors",
  {
    variants: {
      /**
       * Surface the link sits on. `default` (default) is for light surfaces;
       * `onInverse` is for dark surfaces (ScoreCard, dark hero panels).
       */
      tone: {
        default: "text-ink hover:text-ink-soft",
        onInverse: "text-on-inverse hover:text-on-inverse-soft",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export interface TextLinkProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textLink> {
  as?: React.ElementType;
  /** Only used when the rendered element is an anchor. */
  href?: string;
}

/** Secondary action link. Uses the same weight/size as button text, always underlined. */
export const TextLink = forwardRef<HTMLElement, TextLinkProps>(function TextLink(
  { as: Tag = "a", className, tone, children, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cn(textLink({ tone }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
});
