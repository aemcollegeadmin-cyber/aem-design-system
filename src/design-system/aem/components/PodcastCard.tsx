import { forwardRef, useState } from "react";
import { Badge } from "./Badge";
import { Icon } from "./Icon";
import { MediaPreview } from "./MediaPreview";
import { ProgressBar } from "./ProgressBar";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface PodcastCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Required unless `loading` is true. */
  title?: string;
  description?: string;
  /** YouTube link of the first / featured episode — used for the cover thumbnail. */
  coverVideoSrc?: string;
  /** Explicit cover image URL. Wins over the YouTube thumbnail. */
  coverSrc?: string;
  /** Custom cover node instead of the MediaPreview plate. */
  cover?: React.ReactNode;
  /** Episode count shown as a pill, e.g. 6 → "6 епізодів". */
  episodeCount?: number;
  /** Listening progress across the podcast, 0–100. */
  progress?: number;
  /** Starts the featured episode from the cover. */
  onPlay?: () => void;
  /** Inline player node (YouTubePlayer). Rendered above the episode list when present. */
  player?: React.ReactNode;
  /** EpisodeRow children — collapsible. */
  children?: React.ReactNode;
  /** Controlled episode-list expansion. Falls back to internal state. */
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/** Podcast summary card: cover, episode count, listening progress, inline player and episode list. */
export const PodcastCard = forwardRef<HTMLElement, PodcastCardProps>(function PodcastCard(
  {
    title,
    description,
    coverVideoSrc,
    coverSrc,
    cover,
    episodeCount,
    progress,
    onPlay,
    player,
    children,
    expanded,
    onExpandedChange,
    loading = false,
    className,
    ...props
  },
  ref,
) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = expanded ?? internalExpanded;
  const toggle = () => {
    const next = !isExpanded;
    setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  if (loading) {
    return (
      <article
        ref={ref}
        aria-busy="true"
        className={cn("flex w-72 flex-col gap-4", className)}
        {...props}
      >
        <Skeleton radius="card" className="h-36 w-full" />
        <div className="flex flex-col gap-2">
          <Skeleton radius="pill" className="h-5 w-40" />
          <Skeleton radius="pill" className="h-4 w-56" />
        </div>
        <Skeleton radius="pill" className="h-2 w-full" />
        <Skeleton radius="pill" className="h-8 w-32" />
      </article>
    );
  }

  const listened = (progress ?? 0) >= 100 ? "Прослухано" : `Прослухано ${Math.round(progress ?? 0)}%`;

  return (
    <article ref={ref} className={cn("flex w-full flex-col gap-4", className)} {...props}>
      {/* Fixed 16:9 stage: the cover and the inline player share it, so
          starting playback never changes the card's height. */}
      <div className="aspect-video w-full overflow-hidden rounded-panel [&>*]:size-full">
        {player ??
          cover ?? (
            <MediaPreview
              size="video"
              kind="audio"
              src={coverSrc}
              videoSrc={coverVideoSrc}
              alt={title}
              onActivate={onPlay}
              actionLabel="Слухати"
            />
          )}
      </div>


      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-h4 text-ink">{title}</h3>
          {description && <p className="text-caption text-ink-muted">{description}</p>}
        </div>
        {episodeCount !== undefined && (
          <Badge className="shrink-0">
            {episodeCount} {episodeCount === 1 ? "епізод" : "епізодів"}
          </Badge>
        )}
      </div>

      {progress !== undefined && <ProgressBar value={progress} label={listened} />}

      {children && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={isExpanded}
            className="flex items-center gap-1.5 self-start text-caption text-ink-soft transition-colors hover:text-ink"
          >
            {isExpanded ? "Згорнути епізоди" : "Показати епізоди"}
            <Icon name={isExpanded ? "chevronUp" : "chevronDown"} size="md" />
          </button>
          {isExpanded && <div className="flex flex-col gap-2">{children}</div>}
        </div>
      )}
    </article>
  );
});
