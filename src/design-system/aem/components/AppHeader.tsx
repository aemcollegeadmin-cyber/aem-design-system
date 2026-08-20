import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  user?: React.ReactNode;
  brand?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Three-slot application header: user, brand, actions. */
export const AppHeader = forwardRef<HTMLElement, AppHeaderProps>(function AppHeader(
  { user, brand, actions, className, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      className={cn("flex items-center justify-between gap-4 rounded-card bg-surface px-5 py-3 shadow-card", className)}
      {...props}
    >
      <div className="flex-1">{user}</div>
      <div className="flex-1 text-center text-caption font-semibold tracking-widest text-ink uppercase">{brand}</div>
      <div className="flex flex-1 justify-end gap-2">{actions}</div>
    </header>
  );
});