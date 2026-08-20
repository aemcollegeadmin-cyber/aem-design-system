import { forwardRef } from "react";
import { Content, Item, Portal, Root, Separator, Trigger } from "@radix-ui/react-dropdown-menu";
import { cn } from "../lib/cn";

export const DropdownMenuRoot = Root;
export const DropdownMenuTrigger = Trigger;

export interface DropdownMenuProps extends React.ComponentPropsWithoutRef<typeof Content> {}

/** Floating action menu surface. Compose with `DropdownMenuItem`. */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { className, sideOffset = 6, align = "end", ...props },
  ref,
) {
  return (
    <Portal>
      <Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn("z-50 min-w-[12rem] rounded-card bg-surface p-1 shadow-overlay", className)}
        {...props}
      />
    </Portal>
  );
});

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Item> {
  tone?: "default" | "danger";
}

/** Single menu action. */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  function DropdownMenuItem({ className, tone = "default", ...props }, ref) {
    return (
      <Item
        ref={ref}
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-field px-3 py-2 text-body outline-hidden select-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-muted",
          tone === "danger" ? "text-danger-fg" : "text-ink",
          className,
        )}
        {...props}
      />
    );
  },
);

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof Separator> {}

/** Thin rule between menu groups. */
export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ className, ...props }, ref) {
    return <Separator ref={ref} className={cn("my-1 h-px bg-border-subtle", className)} {...props} />;
  },
);