import { forwardRef } from "react";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { StatusIcon } from "./StatusIcon";
import { cn } from "../lib/cn";

export interface ModuleCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  progress: number;
  /** Right-hand meta pill, e.g. "4 уроки" or "Пройдено". */
  meta?: React.ReactNode;
  /** LessonRow children. */
  children?: React.ReactNode;
}

/** Module panel: header, progress and the lesson list. */
export const ModuleCard = forwardRef<HTMLElement, ModuleCardProps>(function ModuleCard(
  { title, description, progress, meta, children, className, ...props },
  ref,
) {
  const complete = progress >= 100;
  return (
    <section ref={ref} className={cn("flex flex-col gap-4 rounded-panel bg-surface-muted p-5", className)} {...props}>
      <div className="flex items-start gap-3">
        {complete ? (
          <StatusIcon status="completed" />
        ) : (
          <span className="inline-flex size-8 items-center justify-center rounded-pill bg-surface text-ink shadow-card">
            <Icon name="module" size="sm" />
          </span>
        )}
        <div className="flex flex-1 flex-col">
          <h3 className="text-h2 text-ink">{title}</h3>
          {description && <p className="text-caption text-ink-muted">{description}</p>}
        </div>
        {meta ?? <Badge variant={complete ? "lime" : "neutral"}>{complete ? "Пройдено" : "Модуль"}</Badge>}
      </div>
      <ProgressBar value={progress} />
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
});