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

/** Homework review queue row. */
export const SubmissionRow = forwardRef<HTMLDivElement, SubmissionRowProps>(function SubmissionRow(
  { title, subtitle, status = "review", timestamp, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 rounded-card bg-surface px-4 py-3 shadow-card", className)}
      {...props}
    >
      <StatusIcon status={status === "accepted" ? "completed" : "available"} />
      <div className="flex flex-1 flex-col">
        <span className="text-body text-ink">{title}</span>
        {subtitle && <span className="text-caption text-ink-muted">{subtitle}</span>}
      </div>
      <Badge variant={status === "accepted" ? "lime" : "peach"}>
        {status === "accepted" ? "Прийнято" : "На перевірці"}
      </Badge>
      {timestamp && <span className="text-caption text-ink-muted">{timestamp}</span>}
    </div>
  );
});