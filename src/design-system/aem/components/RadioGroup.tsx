import { forwardRef } from "react";
import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { cn } from "../lib/cn";

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof Root> {}

/** Radio group container. Compose with `RadioGroupItem`. */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { className, ...props },
  ref,
) {
  return <Root ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />;
});

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof Item> {}

/** Single radio option. */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  function RadioGroupItem({ className, ...props }, ref) {
    return (
      <Item
        ref={ref}
        className={cn(
          "inline-flex size-5 shrink-0 items-center justify-center rounded-pill border border-border-strong bg-surface transition-colors data-[state=checked]:border-ink disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <Indicator className="block size-2.5 rounded-pill bg-ink" />
      </Item>
    );
  },
);