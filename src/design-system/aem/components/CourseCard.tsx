import { forwardRef } from "react";
import { ProgressBar } from "./ProgressBar";
import { cn } from "../lib/cn";

export interface CourseCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  progress: number;
  cover?: React.ReactNode;
  /** Mentor chips rendered under the "Ментори навчання" label. */
  mentors?: React.ReactNode;
}

/** Course summary card with cover, progress and mentors. */
export const CourseCard = forwardRef<HTMLElement, CourseCardProps>(function CourseCard(
  { title, description, progress, cover, mentors, className, ...props },
  ref,
) {
  return (
    <article ref={ref} className={cn("flex w-72 flex-col gap-4", className)} {...props}>
      <div className="flex h-36 items-center justify-center rounded-panel bg-ink text-accent-lime">
        {cover ?? <span className="text-h2">aem</span>}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-h4 text-ink">{title}</h3>
        {description && <p className="text-caption text-ink-muted">{description}</p>}
      </div>
      <ProgressBar value={progress} />
      {mentors && (
        <div className="flex flex-col gap-2">
          <span className="text-caption text-ink-muted">Ментори навчання</span>
          <div className="flex flex-wrap gap-2">{mentors}</div>
        </div>
      )}
    </article>
  );
});