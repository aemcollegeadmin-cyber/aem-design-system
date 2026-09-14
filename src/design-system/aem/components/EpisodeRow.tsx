import { forwardRef } from "react";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface EpisodeRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 1-based position in the podcast. */
  index?: number;
  /** Required unless `loading` is true. */
  title?: string;
  /** Human-readable length, e.g. "32 хв". */
  duration?: string;
  /** Listening progress 0–100. Renders "Прослухано 40%". */
  progress?: number;
  /** Fully listened. */
  completed?: boolean;
  /** Whether this episode is the one currently playing. */
  playing?: boolean;
  /** Play / pause the episode. Only one episode plays at a time. */
  onToggle?: () => void;
  /** Background the row sits on. */
  tone?: "onSurface" | "onMuted";
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/** One podcast episode line: index, title, length, listened status, play control. */
export const EpisodeRow = forwardRef<HTMLDivElement, EpisodeRowProps>(function EpisodeRow(
  {
    index,
    title,
    duration,
    progress,
    completed = false,
    playing = false,
    onToggle,
    tone = "onSurface",
    loading = false,
    className,
    ...props
  },
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

  const listened = completed
    ? "Прослухано"
    : progress && progress > 0
      ? `Прослухано ${Math.min(99, Math.round(progress))}%`
      : undefined;

  return (
    <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-pill text-caption",
          completed
            ? "bg-accent-lime text-accent-lime-fg"
            : cn(tone === "onMuted" ? "bg-surface" : "bg-surface-muted", "text-ink"),
        )}
      >
        {completed ? <Icon name="done" size="md" /> : index}
      </span>
      <div
        className={cn(
          "flex flex-1 items-center justify-between gap-3 rounded-card px-4 py-2",
          tone === "onMuted" ? "bg-surface shadow-card" : "bg-surface-muted",
        )}
      >
        <span className="flex flex-col text-left">
          <span className="text-body text-ink">{title}</span>
          <span className="text-caption text-ink-muted">
            {[duration, listened].filter(Boolean).join(" · ")}
          </span>
        </span>
        {onToggle && (
          <IconButton
            variant={playing ? "solid" : "muted"}
            label={playing ? "Пауза" : "Слухати"}
            onClick={onToggle}
            className="shrink-0"
          >
            <Icon name={playing ? "pause" : "play"} size="md" />
          </IconButton>
        )}
      </div>
    </div>
  );
});
