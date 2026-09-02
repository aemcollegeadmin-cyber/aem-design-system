import { forwardRef } from "react";
import { Close, Content, Overlay, Portal, Root, Title, Trigger } from "@radix-ui/react-dialog";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

export const SheetRoot = Root;
export const SheetTrigger = Trigger;
export const SheetClose = Close;

export interface SheetProps extends React.ComponentPropsWithoutRef<typeof Content> {
  title: string;
  side?: "right" | "left";
  closeLabel?: string;
}

/** Edge-anchored drawer, used for lesson homework and filter panels. */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  { title, side = "right", closeLabel = "Закрити", className, children, ...props },
  ref,
) {
  return (
    <Portal>
      <Overlay className="fixed inset-0 z-40 bg-ink/40" />
      <Content
        ref={ref}
        className={cn(
          "fixed inset-y-0 z-50 flex w-full max-w-md flex-col gap-4 bg-surface p-6 shadow-overlay",
          side === "right" ? "right-0 rounded-l-panel" : "left-0 rounded-r-panel",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-4">
          <Title className="text-h4 text-left text-ink">{title}</Title>
          <Close asChild>
            <IconButton label={closeLabel} variant="muted" size="sm">
              <Icon name="close" size="md" />
            </IconButton>
          </Close>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </Content>
    </Portal>
  );
});