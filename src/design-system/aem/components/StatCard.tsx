import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const statCard = cva("flex flex-col gap-1 rounded-card p-4 shadow-card", {
  variants: {
    tone: {
      neutral: "bg-surface text-ink",
      peach: "bg-accent-peach text-accent-peach-fg",
      lime: "bg-accent-lime text-accent-lime-fg",
    },
  },
  defaultVariants: { tone: "neutral" },
});

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCard> {
  label: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
}

/** Single metric tile for dashboards. Peach = pending, lime = completed. */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, hint, icon, tone, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(statCard({ tone }), className)} {...props}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-caption opacity-80">{label}</span>
        {icon && <span className="opacity-80">{icon}</span>}
      </div>
      <span className="text-h2">{value}</span>
      {hint && <span className="text-caption opacity-70">{hint}</span>}
    </div>
  );
});