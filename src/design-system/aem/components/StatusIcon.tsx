import { forwardRef } from "react";
import { Ban, CircleCheck, Play } from "lucide-react";
import { cn } from "../lib/cn";

export type LessonStatus = "available" | "completed" | "locked";

export interface StatusIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: LessonStatus;
  /**
   * Background the indicator sits on. `onSurface` (default) renders a
   * light-grey circle for white surfaces; `onMuted` renders a white circle
   * for grey surfaces. Applies to the neutral states (available / locked).
   */
  tone?: "onSurface" | "onMuted";
}

const labels: Record<LessonStatus, string> = {
  available: "Доступний",
  completed: "Пройдено",
  locked: "Заблоковано",
};

/** Round lesson-state indicator: play / check / locked. */
export const StatusIcon = forwardRef<HTMLSpanElement, StatusIconProps>(function StatusIcon(
  { status = "available", tone = "onSurface", className, ...props },
  ref,
) {
  const Icon = status === "completed" ? CircleCheck : status === "locked" ? Ban : Play;
  const neutralBg = tone === "onMuted" ? "bg-surface" : "bg-surface-muted";
  const styles: Record<LessonStatus, string> = {
    available: cn(neutralBg, "text-ink"),
    completed: "bg-accent-lime text-accent-lime-fg",
    locked: cn(neutralBg, "text-ink-muted"),
  };
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
