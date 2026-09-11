import { forwardRef } from "react";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { StatusIcon } from "./StatusIcon";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface ModuleCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Required unless `loading` is true. */
  title?: string;
  description?: string;
  /** Required unless `loading` is true. */
  progress?: number;
  /** Right-hand meta pill, e.g. "4 уроки" or "Пройдено". */
  meta?: React.ReactNode;
  /** LessonRow children. */
  children?: React.ReactNode;
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
  /** Number of skeleton lesson rows while loading. */
  loadingRows?: number;
}

/** Module panel: header, progress and the lesson list. */
export const ModuleCard = forwardRef<HTMLElement, ModuleCardProps>(function ModuleCard(
  { title, description, progress, meta, children, loading = false, loadingRows = 3, className, ...props },
  ref,
) {
  if (loading) {
    return (
      <section
        ref={ref}
        aria-busy="true"
        className={cn("flex flex-col gap-4 rounded-panel bg-surface-muted p-5", className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          <Skeleton radius="pill" className="size-8 shrink-0" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton radius="pill" className="h-5 w-40" />
            {description !== undefined && <Skeleton radius="pill" className="h-4 w-56" />}
          </div>
          <Skeleton radius="pill" className="h-6 w-20" />
        </div>
        <Skeleton radius="pill" className="h-2 w-full" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: loadingRows }).map((_, index) => (
            <Skeleton key={index} radius="card" className="h-[52px] w-full" />
          ))}
        </div>
      </section>
    );
  }

  const complete = (progress ?? 0) >= 100;
  return (
    <section ref={ref} className={cn("flex flex-col gap-4 rounded-panel bg-surface-muted p-5", className)} {...props}>
      <div className="flex items-start gap-3">
        {complete ? (
          <StatusIcon status="completed" />
        ) : (
          <span className="inline-flex size-8 items-center justify-center rounded-pill bg-surface text-ink shadow-card">
            <Icon name="module" size="md" />
          </span>
        )}
        <div className="flex flex-1 flex-col">
          <h3 className="text-h2 text-ink">{title}</h3>
          {description && <p className="text-caption text-ink-muted">{description}</p>}
        </div>
        {meta ?? <Badge variant={complete ? "lime" : "neutral"}>{complete ? "Пройдено" : "Модуль"}</Badge>}
      </div>
      <ProgressBar value={progress ?? 0} />
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
});