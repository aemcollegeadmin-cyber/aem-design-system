import { forwardRef } from "react";
import { Avatar } from "./Avatar";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface ScoreCardSparkline {
  /** Weekly points, one value per day (usually 7). */
  points: number[];
  /** Index of the current day — its bar is highlighted with the brand accent. */
  todayIndex?: number;
}

export interface ScoreCardComparison {
  /** Прогрес 0–100 */
  value: number;
  /** Цільовий суперник для обгону */
  target?: {
    name: string;
    avatarUrl?: string;
    /** Попередньо відформатовані бали, напр. "40 балів". */
    score: string;
  };
  /** Підказка над баром зліва, наприклад "10 балів — і ти обходиш 14 місце" */
  hint?: string;
  /** Застарілі поля для сумісності */
  leftLabel?: string;
  rightLabel?: string;
}

export interface ScoreCardArticle {
  /** Article headline, shown under the cover. */
  title: string;
  /** Absolute link to the blog post. Opens in a new tab. */
  href: string;
  /** Cover image URL. Omit for a text-only card. */
  coverUrl?: string;
  /** Short standfirst under the headline. */
  description?: string;
}

export interface ScoreCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Caption for the total score. Defaults to «Загальний бал». */
  label?: string;
  /** Pre-formatted total score. */
  score: string;
  rank?: string;
  rankEmoji?: string;
  rankLabel?: string;
  rankContext?: string;
  /** Used when rankContext is not supplied. */
  rankDelta?: string;
  /** Pre-formatted weekly points, e.g. «+120». */
  delta?: string;
  weekLabel?: string;
  weekContext?: string;
  sparkline?: ScoreCardSparkline;
  comparison?: ScoreCardComparison;
  articles?: {
    title?: string;
    items: ScoreCardArticle[];
    action?: React.ReactNode;
  };
  footnote?: string;
  loading?: boolean;
}

/** Thin bars in a token-sized 24px track; highlights the current day. */
function Sparkline({ points, todayIndex }: ScoreCardSparkline) {
  const max = Math.max(1, ...points);
  return (
    <div className="flex h-6 shrink-0 items-end gap-1" aria-hidden="true">
      {points.map((value, index) => (
        <div key={index}
          className={cn("w-1 rounded-pill", index === todayIndex ? "bg-accent-brand" : "bg-on-inverse-track")}
          style={{ height: `${Math.max(12, Math.round((value / max) * 100))}%` }}
        />
      ))}
    </div>
  );
}

/** Three equal statistic tiles (rank, total, week), followed by optional blog previews. */
export const ScoreCard = forwardRef<HTMLElement, ScoreCardProps>(function ScoreCard(
  {
    label = "Загальний бал", score, rank, rankEmoji, rankLabel = "Місце в рейтингу",
    rankContext, rankDelta, delta, weekLabel = "Бал за тиждень", weekContext,
    sparkline, comparison, articles, footnote, loading = false, className, ...props
  }, ref,
) {
  const progress = comparison ? Math.min(100, Math.max(0, comparison.value)) : 0;
  return (
    <section ref={ref} aria-busy={loading || undefined}
      className={cn("flex flex-col gap-6 rounded-panel bg-surface-inverse p-6 text-on-inverse", className)} {...props}>
      <div className="aem-score-grid grid grid-cols-1 items-stretch gap-3 md:grid-cols-3">
        {loading ? [0, 1, 2].map((index) => (
          <div key={index} className={cn("flex min-w-0 flex-col justify-between gap-4 rounded-card p-4", index === 0 ? "bg-surface text-ink" : "bg-surface-inverse-muted text-on-inverse")}>
            <Skeleton radius="pill" className={cn("h-4 w-2/3", index === 0 ? "bg-surface-muted" : "bg-on-inverse-track")} />
            <Skeleton radius="pill" className={cn("h-10 w-3/4 md:h-12", index === 0 ? "bg-surface-muted" : "bg-on-inverse-track")} />
            <div className="flex min-h-6 flex-col justify-end gap-2">
              {index === 1 && <Skeleton radius="pill" className="h-2 w-full bg-on-inverse-track" />}
              <Skeleton radius="pill" className={cn("h-4 w-2/3", index === 0 ? "bg-surface-muted" : "bg-on-inverse-track")} />
            </div>
          </div>
        )) : (
          <>
            <div className="flex min-w-0 flex-col justify-between gap-4 rounded-card bg-surface p-4 text-ink">
              <span className="text-caption uppercase tracking-widest text-ink-muted">{rankLabel || "Місце в рейтингу"}</span>
              <div className="flex flex-wrap items-center gap-2">
                {rankEmoji && <span className="text-h1">{rankEmoji}</span>}
                <span className="text-h1 wrap-anywhere">{rank || "—"}</span>
              </div>
              <span className="min-h-6 text-caption text-ink-soft">{rankContext || rankDelta}</span>
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-4 rounded-card bg-surface-inverse-muted p-4 text-on-inverse">
              <span className="text-caption uppercase tracking-widest text-on-inverse-soft">{label || "Загальний бал"}</span>
              <span className="text-h1 text-on-inverse wrap-anywhere">{score}</span>
              <div className="flex min-h-6 flex-col justify-end gap-2">
                {comparison && (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="min-w-0 text-caption text-on-inverse-soft">{comparison.hint || comparison.leftLabel}</span>
                      {comparison.target ? (
                        <div className="ml-auto flex items-center gap-2">
                          <Avatar name={comparison.target.name} src={comparison.target.avatarUrl} size="sm" />
                          <span className="text-caption text-on-inverse">{comparison.target.score}</span>
                        </div>
                      ) : comparison.rightLabel && <span className="ml-auto text-caption text-on-inverse-soft">{comparison.rightLabel}</span>}
                    </div>
                    <div role="progressbar" aria-label={label || "Загальний бал"} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}
                      className="h-2 w-full overflow-hidden rounded-pill bg-on-inverse-track">
                      <div className="h-full rounded-pill bg-accent-brand" style={{ width: `${progress}%` }} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex min-w-0 flex-col justify-between gap-4 rounded-card bg-surface-inverse-muted p-4 text-on-inverse">
              <span className="text-caption uppercase tracking-widest text-on-inverse-soft">{weekLabel || "Бал за тиждень"}</span>
              <span className="text-h1 text-accent-brand wrap-anywhere">{delta || "—"}</span>
              <div className="flex min-h-6 flex-wrap items-center justify-between gap-2">
                {sparkline && <Sparkline {...sparkline} />}
                {weekContext && <span className="text-caption text-on-inverse-soft">{weekContext}</span>}
              </div>
            </div>
          </>
        )}
      </div>
      {loading ? (
        <div className="flex flex-col gap-3 border-t-2 border-on-inverse-track pt-5">
          <div className="flex items-center justify-between gap-3">
            <Skeleton radius="pill" className="h-5 w-1/2 bg-surface-inverse-muted" />
            <Skeleton radius="pill" className="h-4 w-16 bg-surface-inverse-muted" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex min-w-0 flex-col gap-2.5 rounded-card bg-surface-inverse-muted p-3">
                <Skeleton radius="field" className="aspect-video w-full bg-surface-inverse" />
                <Skeleton radius="pill" className="h-4 w-full bg-surface-inverse" />
                <Skeleton radius="pill" className="h-4 w-2/3 bg-surface-inverse" />
              </div>
            ))}
          </div>
        </div>
      ) : articles ? (
        <div className="flex flex-col gap-3 border-t-2 border-on-inverse-track pt-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-body text-on-inverse">{articles.title || "Пишемо про спільноту та айті:"}</span>
            {articles.action && (
              <div className="aem-score-action ml-auto shrink-0">
                {typeof articles.action === "string" ? <span className="text-caption text-on-inverse underline underline-offset-4">{articles.action}</span> : articles.action}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {articles.items.map((article, index) => (
              <a key={`${article.href}-${index}`} href={article.href} target="_blank" rel="noopener noreferrer"
                className="flex min-w-0 flex-col gap-2.5 rounded-card bg-surface-inverse-muted p-3 hover:bg-on-inverse-track/40">
                {article.coverUrl && <img src={article.coverUrl} alt="" loading="lazy" className="aspect-video w-full rounded-field bg-surface-inverse object-cover" />}
                <span className="aem-article-clamp text-caption font-bold text-on-inverse line-clamp-2">{article.title}</span>
                {article.description && <span className="aem-article-clamp text-caption text-on-inverse-soft line-clamp-2">{article.description}</span>}
              </a>
            ))}
          </div>
        </div>
      ) : footnote && <p className="text-caption text-on-inverse-soft">{footnote}</p>}
    </section>
  );
});
