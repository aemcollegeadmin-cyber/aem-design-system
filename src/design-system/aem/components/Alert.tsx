import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon, type IconName } from "./Icon";
import { cn } from "../lib/cn";

const alert = cva("flex items-start gap-3 rounded-card px-4 py-3", {
  variants: {
    variant: {
      info: "bg-info text-info-fg",
      success: "bg-success text-success-fg",
      warning: "bg-warning text-warning-fg",
      danger: "bg-danger text-danger-fg",
    },
  },
  defaultVariants: { variant: "info" },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alert> {
  title?: string;
  icon?: React.ReactNode;
}

const icons = {
  info: "info",
  success: "done",
  warning: "alert",
  danger: "warning",
} as const satisfies Record<string, IconName>;

/** Page-level status message. Use `Callout` for inline lesson strips. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant = "info", title, icon, children, ...props },
  ref,
) {
  const iconName = icons[variant ?? "info"];
  return (
    <div ref={ref} role="status" className={cn(alert({ variant }), className)} {...props}>
      <span className="mt-0.5 shrink-0">{icon ?? <Icon name={iconName} size="md" />}</span>
      <div className="flex flex-col gap-0.5">
        {title && <span className="text-body font-semibold">{title}</span>}
        {children && <span className="text-caption">{children}</span>}
      </div>
    </div>
  );
});