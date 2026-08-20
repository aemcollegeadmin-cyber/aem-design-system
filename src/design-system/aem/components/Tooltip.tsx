import { forwardRef } from "react";
import { Content, Portal, Provider, Root, Trigger } from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";

export const TooltipProvider = Provider;
export const TooltipRoot = Root;
export const TooltipTrigger = Trigger;

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof Content> {}

/** Short hint attached to a control. Wrap the app in `TooltipProvider` once. */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { className, sideOffset = 6, ...props },
  ref,
) {
  return (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn("z-50 rounded-field bg-ink px-3 py-1.5 text-caption text-surface", className)}
        {...props}
      />
    </Portal>
  );
});