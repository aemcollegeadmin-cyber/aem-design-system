import { forwardRef } from "react";
import { Root, Thumb } from "@radix-ui/react-switch";
import { cn } from "../lib/cn";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof Root> {}

/** Binary toggle used in settings rows. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 items-center rounded-pill border-2 border-border-strong bg-surface-muted p-0.5 transition-colors data-[state=checked]:bg-ink disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Thumb className="block size-5 rounded-pill bg-surface shadow-card transition-transform data-[state=checked]:translate-x-5" />
    </Root>
  );
});