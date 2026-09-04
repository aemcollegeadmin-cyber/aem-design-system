import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface TextLinkProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Only used when the rendered element is an anchor. */
  href?: string;
}

/** Secondary action link. Uses the same weight/size as button text, always underlined. */
export const TextLink = forwardRef<HTMLElement, TextLinkProps>(function TextLink(
  { as: Tag = "a", className, children, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cn(
        "text-body font-semibold text-ink underline underline-offset-2 transition-colors hover:text-ink-soft",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
});
