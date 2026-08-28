import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Multiline field used for homework submissions. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      data-aem-input-control
      ref={ref}
      rows={rows}
      className={cn(
        "w-full resize-none rounded-card border-2 border-border-strong bg-surface px-4 py-3 text-body text-ink placeholder:text-ink-muted shadow-card transition-colors hover:border-focus focus:border-focus focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});