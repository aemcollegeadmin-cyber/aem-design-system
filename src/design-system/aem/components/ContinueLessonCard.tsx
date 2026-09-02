import { forwardRef } from "react";
import { MediaPreview, type MediaPreviewKind } from "./MediaPreview";
import { cn } from "../lib/cn";

export interface ContinueLessonCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb-like meta line, e.g. "Інтерфейсник · Модуль 3 · Урок 12 з 90". */
  meta?: string;
  title: string;
  /** Kind of lesson content — drives the poster glyph. */
  kind?: MediaPreviewKind;
  /** Poster image URL. */
  previewSrc?: string;
  /** Lesson video URL (file or YouTube link) — renders a real video preview. */
  previewVideoSrc?: string;

  /** Starts the lesson from the poster. */
  onOpen?: () => void;
  /** Watched/completed share of the lesson, 0–100. */
  progress?: number;
  /** Caption next to the progress bar, e.g. "4:12 з 14:20". */
  progressLabel?: string;
  /** Buttons on the right, e.g. "Продовжити" + homework status. */
  actions?: React.ReactNode;
}

/** Resume card for the lesson the student stopped on. */
export const ContinueLessonCard = forwardRef<HTMLElement, ContinueLessonCardProps>(
  function ContinueLessonCard(
    {
      meta,
      title,
      kind = "video",
      previewSrc,
      previewVideoSrc,

      onOpen,
      progress,
      progressLabel,
      actions,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        className={cn(
          "flex flex-col gap-5 rounded-panel bg-surface p-6 md:flex-row md:items-center",
          className,
        )}
        {...props}
      >
        <MediaPreview
          kind={kind}
          src={previewSrc}
          videoSrc={previewVideoSrc}

          alt={title}
          size="md"
          onActivate={onOpen}
          actionLabel={`Продовжити: ${title}`}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {meta && <span className="text-caption text-ink-muted">{meta}</span>}
          <h2 className="text-h4 text-ink">{title}</h2>
          {typeof progress === "number" && (
            <div className="flex items-center gap-3">
              <div
                role="progressbar"
                aria-valuenow={Math.min(100, Math.max(0, progress))}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-1 flex-1 overflow-hidden rounded-pill bg-border-subtle"
              >
                <div
                  className="h-full rounded-pill bg-ink"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
              {progressLabel && (
                <span className="text-caption text-ink-muted">{progressLabel}</span>
              )}
            </div>
          )}
        </div>

        {actions && <div className="flex shrink-0 flex-col gap-2">{actions}</div>}
      </section>
    );
  },
);
