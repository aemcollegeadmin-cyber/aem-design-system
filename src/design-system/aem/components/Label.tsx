import { forwardRef } from "react";
import { Root } from "@radix-ui/react-label";
import { cn } from "../lib/cn";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof Root> {
  /** Marks the associated control as required with a visual indicator. */
  required?: boolean;
}

/** Form label bound to its control via `htmlFor`. */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, required, children, ...props },
  ref,
) {
  return (
    <Root ref={ref} className={cn("text-caption text-ink-soft", className)} {...props}>
      {children}
      {required && (
        <span className="text-danger-fg" aria-hidden="true">
          {" *"}
        </span>
      )}
    </Root>
  );
});