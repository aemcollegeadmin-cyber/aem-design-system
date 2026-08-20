import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const navItem = cva(
  "flex items-center gap-3 rounded-field px-3 py-2 text-body no-underline transition-colors",
  {
    variants: {
      active: {
        true: "bg-surface-muted font-medium text-ink",
        false: "text-ink-soft hover:bg-surface-muted hover:text-ink",
      },
    },
    defaultVariants: { active: false },
  },
);

export interface NavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navItem> {
  icon?: React.ReactNode;
}

/** Sidebar navigation link. Navigation is an anchor, never a button. */
export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(function NavItem(
  { className, active, icon, children, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(navItem({ active }), className)}
      {...props}
    >
      {icon && <span className="shrink-0 text-ink-muted">{icon}</span>}
      {children}
    </a>
  );
});