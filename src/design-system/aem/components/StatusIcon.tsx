import { forwardRef } from "react";
import { Ban, CircleCheck, Play } from "lucide-react";
import { cn } from "../lib/cn";

export type LessonStatus = "available" | "completed" | "locked";

export interface StatusIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: LessonStatus;
}

const styles: Record<LessonStatus, string> = {
  available: "bg-surface-muted text-ink",
  completed: "bg-accent-lime text-accent-lime-fg",
  locked: "bg-surface-muted text-ink-muted",
};

const labels: Record<LessonStatus, string> = {
  available: "Доступний",
  completed: "Пройдено",
  locked: "Заблоковано",
};

/** Round lesson-state indicator: play / check / locked. */
export const StatusIcon = forwardRef<HTMLSpanElement, StatusIconProps>(function StatusIcon(
  { status = "available", className, ...props },
  ref,
) {
  const Icon = status === "completed" ? CircleCheck : status === "locked" ? Ban : Play;
  return (
    <span
      ref={ref}
      role="img"
      aria-label={labels[status]}
      className={cn("inline-flex size-8 items-center justify-center rounded-pill", styles[status], className)}
      {...props}
    >
      <Icon className="size-4" />
    </span>
  );
});