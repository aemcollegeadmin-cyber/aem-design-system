import { forwardRef } from "react";
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

export const DialogRoot = Root;
export const DialogTrigger = Trigger;
export const DialogClose = Close;

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof Content> {
  title: string;
  description?: string;
  /** Footer actions, right-aligned. */
  footer?: React.ReactNode;
  closeLabel?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;

/** Modal dialog body. Wrap in `DialogRoot` and open with `DialogTrigger`. */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { title, description, footer, closeLabel = "Закрити", size = "md", className, children, ...props },
  ref,
) {
  return (
    <Portal>
      <Overlay className="fixed inset-0 z-40 bg-ink/40" />
      <Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-panel bg-surface p-6 shadow-overlay",
          sizes[size],
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Title className="text-h4 text-ink">{title}</Title>
            {description && (
              <Description className="text-caption text-ink-muted">{description}</Description>
            )}
          </div>
          <Close asChild>
            <IconButton label={closeLabel} variant="muted" size="sm">
              <Icon name="close" size="md" />
            </IconButton>
          </Close>
        </div>
        {children}
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </Content>
    </Portal>
  );
});