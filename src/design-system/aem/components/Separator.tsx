import { forwardRef } from "react";
import { Root } from "@radix-ui/react-separator";
import { cn } from "../lib/cn";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof Root> {}

/** Hairline rule between content groups. */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { className, orientation = "horizontal", decorative = true, ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        "shrink-0 bg-border-subtle",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
});