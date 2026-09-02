import { forwardRef } from "react";
import { cn } from "../lib/cn";

export type TextVariant = "h1" | "h2" | "h3" | "h4" | "paragraph" | "caption" | "link";

const variantClass: Record<TextVariant, string> = {
  h1: "text-h1 tracking-tight text-ink",
  h2: "text-h2 tracking-tight text-ink",
  h3: "text-h3 tracking-tight text-ink",
  h4: "text-h4 text-ink",
  paragraph: "text-body text-ink-soft",
  caption: "text-caption text-ink-soft",
  link: "text-body text-ink underline underline-offset-2 hover:no-underline",
};

const defaultTag: Record<TextVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  paragraph: "p",
  caption: "span",
  link: "a",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: React.ElementType;
  /** Only used when the rendered element is an anchor (variant="link"). */
  href?: string;
}

/** Typography primitive covering the kit's H1/H2/H4/Paragraph/Link styles. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { variant = "paragraph", as, className, ...props },
  ref,
) {
  const Tag = (as ?? defaultTag[variant]) as React.ElementType;
  return <Tag ref={ref} className={cn(variantClass[variant], className)} {...props} />;
});