import { forwardRef } from "react";
import { Badge } from "./Badge";
import { StatusIcon } from "./StatusIcon";
import { cn } from "../lib/cn";

export type SubmissionStatus = "review" | "accepted";

export interface SubmissionRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  status?: SubmissionStatus;
  timestamp?: string;
}

/**
 * Homework review queue row. On mobile the meta (status badge + timestamp)
 * wraps onto a second line under the title/subtitle; from `sm:` up everything
 * sits on one line.
 */
export const SubmissionRow = forwardRef<HTMLDivElement, SubmissionRowProps>(function SubmissionRow(
  { title, subtitle, status = "review", timestamp, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-start gap-3 rounded-card bg-surface px-4 py-3 shadow-card sm:items-center", className)}
      {...props}
    >
      <StatusIcon status={status === "accepted" ? "completed" : "available"} />
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-body text-ink">{title}</span>
          {subtitle && <span className="text-caption text-ink-muted">{subtitle}</span>}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
          <Badge variant={status === "accepted" ? "lime" : "peach"}>
            {status === "accepted" ? "Прийнято" : "На перевірці"}
          </Badge>
          {timestamp && <span className="text-caption text-ink-muted">{timestamp}</span>}
        </div>
      </div>
    </div>
  );
});
