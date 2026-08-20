import { forwardRef } from "react";
import { Indicator, Root } from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof Root> {}

/** Square checkbox; lime when checked. */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { className, ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-field border border-border-strong bg-surface text-accent-lime-fg transition-colors data-[state=checked]:border-accent-lime data-[state=checked]:bg-accent-lime disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Indicator>
        <Check className="size-3.5" />
      </Indicator>
    </Root>
  );
});