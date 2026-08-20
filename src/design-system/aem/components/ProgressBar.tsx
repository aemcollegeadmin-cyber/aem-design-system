import { forwardRef } from "react";
import { CircleCheck } from "lucide-react";
import { cn } from "../lib/cn";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Completion percentage, 0–100. */
  value: number;
  label?: string;
  showLabel?: boolean;
}

/** Course/module progress with an inline label and completion check. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, label, showLabel = true, className, ...props },
  ref,
) {
  const clamped = Math.min(100, Math.max(0, value));
  const complete = clamped >= 100;
  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {showLabel && (
        <div className="flex items-center gap-1.5 text-caption text-ink-soft">
          <span>{label ?? `Пройдено ${clamped}%`}</span>
          <CircleCheck className={cn("size-4", complete ? "text-accent-lime-fg" : "text-ink-muted")} />
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 w-full overflow-hidden rounded-pill bg-border-subtle"
      >
        <div
          className={cn("h-full rounded-pill", complete ? "bg-accent-lime-fg" : "bg-ink")}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
});