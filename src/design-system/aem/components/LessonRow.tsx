import { forwardRef } from "react";
import { Icon } from "./Icon";
import { StatusIcon, type LessonStatus } from "./StatusIcon";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface LessonRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Required unless `loading` is true. */
  title?: string;
  description?: string;
  status?: LessonStatus;
  trailing?: React.ReactNode;
  onOpen?: () => void;
  /** Background the row sits on; forwarded to the status indicator. */
  tone?: "onSurface" | "onMuted";
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/** One lesson line: status indicator + title/description card. */
export const LessonRow = forwardRef<HTMLDivElement, LessonRowProps>(function LessonRow(
  { title, description, status = "available", trailing, onOpen, tone = "onSurface", loading = false, className, ...props },
  ref,
) {
  if (loading) {
    return (
      <div ref={ref} aria-busy="true" className={cn("flex items-center gap-3", className)} {...props}>
        <Skeleton radius="pill" className="size-8 shrink-0" />
        <Skeleton radius="card" className="h-[52px] flex-1" />
      </div>
    );
  }

  const locked = status === "locked";
  const body = (
    <>
      <span className="flex flex-col text-left">
        <span className={cn("text-body", locked ? "text-ink-muted" : "text-ink")}>{title}</span>
        {description && <span className="text-caption text-ink-muted">{description}</span>}
      </span>
      <span className={cn("shrink-0", locked ? "text-ink-muted" : "text-ink")}>
        {trailing ?? <Icon name="lesson" size="md" />}
      </span>
    </>
  );

  return (
    <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
      <StatusIcon status={status} tone={tone} />
      {onOpen && !locked ? (
        <button
          type="button"
          onClick={onOpen}
          className="flex flex-1 items-center justify-between gap-3 rounded-card bg-surface px-4 py-3 shadow-card transition-colors hover:bg-surface-muted"
        >
          {body}
        </button>
      ) : (
        <div
          className={cn(
            "flex flex-1 items-center justify-between gap-3 rounded-card px-4 py-3",
            locked ? "bg-surface-muted" : "bg-surface shadow-card",
          )}
        >
          {body}
        </div>
      )}
    </div>
  );
});