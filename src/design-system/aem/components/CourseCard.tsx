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
  /** Mentor chips rendered under the "Ментори навчання" label. */
  mentors?: React.ReactNode;
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/** Course summary card with cover, progress and mentors. */
export const CourseCard = forwardRef<HTMLElement, CourseCardProps>(function CourseCard(
  { title, description, progress, cover, mentors, loading = false, className, ...props },
  ref,
) {
  if (loading) {
    return (
      <article
        ref={ref}
        aria-busy="true"
        className={cn("aem-course-card flex flex-col gap-4", className)}
        {...props}
      >
        <Skeleton radius="card" className="aem-course-cover" />
        <div className="flex flex-col gap-2">
          <Skeleton radius="pill" className="h-5 w-40" />
          {description !== undefined && <Skeleton radius="pill" className="h-4 w-56" />}
        </div>
        <Skeleton radius="pill" className="h-2 w-full" />
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
    <article ref={ref} className={cn("aem-course-card flex flex-col gap-4", className)} {...props}>
      <div className="aem-course-cover flex items-center justify-center overflow-hidden rounded-panel bg-ink text-accent-lime">
        {cover ?? <span className="text-h2">aem</span>}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-h4 text-ink">{title}</h3>
        {description && <p className="text-caption text-ink-muted">{description}</p>}
      </div>
      <ProgressBar value={progress ?? 0} />
      {mentors && (
        <div className="flex flex-col gap-2">
          <span className="text-caption text-ink-muted">Ментори навчання</span>
          <div className="flex flex-wrap gap-2">{mentors}</div>
        </div>
      )}
    </article>
  );
});