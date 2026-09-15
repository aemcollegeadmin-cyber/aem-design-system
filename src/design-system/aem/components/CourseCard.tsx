import { forwardRef } from "react";
import { ProgressBar } from "./ProgressBar";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface CourseCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Required unless `loading` is true. */
  title?: string;
  description?: string;
  /** Required unless `loading` is true. */
  progress?: number;
  cover?: React.ReactNode;
  /** Access state shown over a dimmed cover, e.g. "Доступ завершено". */
  coverStatus?: React.ReactNode;
  /**
   * Access / mentorship tags pinned to the top of the cover, e.g.
   * "Доступ до 12 бер. 27'", "Супровід закінчився". Pass `Badge`s.
   * The LMS computes which tags apply; the card only positions them.
   */
  coverTags?: React.ReactNode;
  /** Course facts such as module, lesson and test counts. */
  meta?: React.ReactNode;
  /** Primary course action. */
  action?: React.ReactNode;
  /** Access period and learning-format details, rendered outside the mentor group. */
  details?: React.ReactNode;
  /** Mentor chips rendered under the "Ментори навчання" label. */
  mentors?: React.ReactNode;
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/** Course summary card with cover, progress and mentors. */
export const CourseCard = forwardRef<HTMLElement, CourseCardProps>(function CourseCard(
  {
    title,
    description,
    progress,
    cover,
    coverStatus,
    meta,
    action,
    details,
    mentors,
    loading = false,
    className,
    ...props
  },
  ref,
) {
  if (loading) {
    return (
      <article
        ref={ref}
        aria-busy="true"
        className={cn("aem-course-card flex flex-col gap-4 rounded-panel bg-surface p-4", className)}
        {...props}
      >
        <Skeleton radius="card" className="aem-course-cover" />
        <div className="flex flex-col gap-2">
          <Skeleton radius="pill" className="h-5 w-40" />
          {description !== undefined && <Skeleton radius="pill" className="h-4 w-56" />}
        </div>
        <Skeleton radius="pill" className="h-2 w-full" />
        {meta !== undefined && <Skeleton radius="pill" className="h-8 w-full" />}
        {action !== undefined && <Skeleton radius="pill" className="h-11 w-full" />}
        {details !== undefined && <Skeleton radius="pill" className="h-10 w-full" />}
        {mentors !== undefined && (
          <div className="flex flex-col gap-2">
            <Skeleton radius="pill" className="h-4 w-32" />
            <div className="flex flex-wrap gap-2">
              <Skeleton radius="pill" className="h-8 w-24" />
              <Skeleton radius="pill" className="h-8 w-28" />
            </div>
          </div>
        )}
      </article>
    );
  }

  return (
    <article
      ref={ref}
      className={cn("aem-course-card flex flex-col gap-4 rounded-panel bg-surface p-4", className)}
      {...props}
    >
      <div className="aem-course-cover relative flex items-center justify-center overflow-hidden rounded-panel bg-ink text-accent-lime">
        <div className="size-full">{cover ?? <span className="flex size-full items-center justify-center text-h2">aem</span>}</div>
        {coverStatus && (
          <>
            <div className="aem-course-cover-scrim absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-x-3 bottom-3 z-10 flex justify-start">
              <span className="inline-flex items-center rounded-pill bg-surface px-3 py-1 text-caption text-ink">
                {coverStatus}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-h4 text-ink">{title}</h3>
        {description && <p className="text-caption text-ink-muted">{description}</p>}
      </div>
      <ProgressBar value={progress ?? 0} />
      {meta && <div className="flex flex-wrap items-center gap-3 text-caption text-ink-soft">{meta}</div>}
      {action && <div className="flex flex-col">{action}</div>}
      {details && <div className="flex flex-col gap-2 text-caption text-ink-soft">{details}</div>}
      {mentors && (
        <div className="flex flex-col gap-2">
          <span className="text-caption text-ink-muted">Ментори навчання</span>
          <div className="flex flex-wrap gap-2">{mentors}</div>
        </div>
      )}
    </article>
  );
});