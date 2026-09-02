import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  /** Content pinned to the bottom (user chip, sign out). */
  footer?: React.ReactNode;
}

/** Vertical navigation rail. Compose with `NavItem`. */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { label = "Головна навігація", footer, className, children, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label={label}
      className={cn(
        "flex h-full w-64 flex-col justify-between gap-5 rounded-panel bg-surface px-4 py-5 shadow-card",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">{children}</div>
      {footer && <div className="flex flex-col gap-2">{footer}</div>}
    </nav>
  );
});