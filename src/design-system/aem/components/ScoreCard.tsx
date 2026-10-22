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
  /** Текст під баром, наприклад "10 балів — і ти обходиш 14 місце" */
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
  /** Small uppercase label, e.g. "Бал у коледжі". */
  label: string;
  /** Main figure, pre-formatted, e.g. "1 480". */
  score: string;
  /** Change since last period, e.g. "+120 за тиждень". Shown in the week section. */
  delta?: string;
  /** Place in the ranking, e.g. "#7". */
  rank?: string;
  /** Place change, e.g. "↑ 2 місця". */
  rankDelta?: string;
  /** Compact weekly sparkline next to the weekly delta. */
  sparkline?: ScoreCardSparkline;
  comparison?: ScoreCardComparison;
  /** Muted closing line, e.g. "Найкращий тиждень. Серія 12 днів тримає темп." */
  footnote?: string;
  /** Blog preview block. `items` drives the card grid. */
  articles?: {
    title?: string;
    items: ScoreCardArticle[];
    action?: React.ReactNode;
  };
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/** Seven thin 24px bars; the current day is highlighted with the brand accent. */
function Sparkline({ points, todayIndex }: ScoreCardSparkline) {
  const max = Math.max(1, ...points);
  return (
    <div className="flex h-6 items-end gap-1" aria-hidden="true">
      {points.map((value, index) => (
        <div
          key={index}
          className={cn(
            "w-1 rounded-pill",
            index === todayIndex ? "bg-accent-brand" : "bg-on-inverse-track",
          )}
          style={{ height: `${Math.max(12, Math.round((value / max) * 100))}%` }}
        />
      ))}
    </div>
  );
}

/**
 * Dark hero card with the student's college score, place in the ranking,
 * a compact weekly section (delta + sparkline + progress to the next place)
 * and an optional blog preview.
 */
export const ScoreCard = forwardRef<HTMLElement, ScoreCardProps>(function ScoreCard(
  {
    label,
    score,
    delta,
    rank,
    rankDelta,
    sparkline,
    comparison,
    articles,
    footnote,
    loading = false,
    className,
    ...props
  },
  ref,
) {
  if (loading) {
    return (
      <section
        ref={ref}
        aria-busy="true"
        className={cn(
          "flex flex-col gap-6 rounded-panel bg-surface-inverse p-6 text-on-inverse",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <Skeleton radius="pill" className="h-4 w-32 bg-surface-inverse-muted" />
            <Skeleton radius="pill" className="h-10 w-48 bg-surface-inverse-muted" />
          </div>
          <Skeleton radius="pill" className="h-8 w-16 bg-surface-inverse-muted" />
        </div>
        <div className="flex flex-col gap-3 rounded-card bg-surface-inverse-muted p-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton radius="pill" className="h-4 w-28 bg-on-inverse-track" />
            <Skeleton radius="pill" className="h-6 w-16 bg-on-inverse-track" />
          </div>
          <Skeleton radius="pill" className="h-2 w-full bg-on-inverse-track" />
          <Skeleton radius="pill" className="h-3 w-2/3 bg-on-inverse-track" />
        </div>
        <div className="flex flex-col gap-3 border-t-2 border-on-inverse-track pt-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="flex flex-col gap-2.5 rounded-card bg-surface-inverse-muted p-3"
              >
                <Skeleton radius="field" className="aspect-video w-full bg-surface-inverse" />
                <Skeleton radius="pill" className="h-3 w-full bg-surface-inverse" />
                <Skeleton radius="pill" className="h-3 w-2/3 bg-surface-inverse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={cn(
        "flex flex-col gap-6 rounded-panel bg-surface-inverse p-6 text-on-inverse",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-caption tracking-widest text-on-inverse-soft uppercase">
            {label}
          </span>
          <span className="text-h1 text-on-inverse">{score}</span>
        </div>
        {(rank || rankDelta) && (
          <div className="flex flex-col items-end gap-1">
            {rank && <span className="text-h2 text-on-inverse">{rank}</span>}
            {rankDelta && <span className="text-caption text-accent-brand">{rankDelta}</span>}
          </div>
        )}
      </div>

      {(delta || sparkline || comparison) && (
        <div className="flex flex-col gap-3 rounded-card bg-surface-inverse-muted p-4">
          {(delta || sparkline) && (
            <div className="flex items-center justify-between gap-4">
              {delta && (
                <span className="text-body font-semibold text-accent-brand">{delta}</span>
              )}
              {sparkline && <Sparkline {...sparkline} />}
            </div>
          )}
          {comparison && (
            <div className="flex flex-col gap-2">
              {comparison.target ? (
                <div className="flex items-center justify-end gap-2">
                  <Avatar
                    name={comparison.target.name}
                    src={comparison.target.avatarUrl}
                    size="sm"
                  />
                  <span className="text-caption text-on-inverse">
                    {comparison.target.score}
                  </span>
                </div>
              ) : (
                (comparison.leftLabel || comparison.rightLabel) && (
                  <div className="flex items-center justify-between gap-4 text-caption text-on-inverse-soft">
                    <span>{comparison.leftLabel}</span>
                    {comparison.rightLabel && <span>{comparison.rightLabel}</span>}
                  </div>
                )
              )}
              <div
                role="progressbar"
                aria-valuenow={Math.min(100, Math.max(0, comparison.value))}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2 w-full overflow-hidden rounded-pill bg-on-inverse-track"
              >
                <div
                  className="h-full rounded-pill bg-accent-brand"
                  style={{ width: `${Math.min(100, Math.max(0, comparison.value))}%` }}
                />
              </div>
              {comparison.hint && (
                <p className="text-caption text-on-inverse-soft">{comparison.hint}</p>
              )}
            </div>
          )}
        </div>
      )}

      {articles && (
        <div className="flex flex-col gap-3 border-t-2 border-on-inverse-track pt-5">
          {(articles.title || articles.action) && (
            <div
              className={cn(
                "flex items-center gap-3",
                articles.title ? "justify-between" : "justify-end",
              )}
            >
              {articles.title && (
                <span className="text-body text-on-inverse">{articles.title}</span>
              )}
              {articles.action && (
                <div className="aem-score-action">
                  {typeof articles.action === "string" ? (
                    <span className="text-caption font-semibold text-on-inverse underline underline-offset-4">
                      {articles.action}
                    </span>
                  ) : (
                    articles.action
                  )}
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {articles.items.map((article, index) => (
              <a
                key={`${article.href}-${index}`}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2.5 rounded-card bg-surface-inverse-muted p-3 hover:bg-on-inverse-track/40"
              >
                {article.coverUrl && (
                  <img
                    src={article.coverUrl}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full rounded-field bg-surface-inverse object-cover"
                  />
                )}
                <span className="aem-article-clamp text-caption font-bold text-on-inverse line-clamp-2">
                  {article.title}
                </span>
                {article.description && (
                  <span className="aem-article-clamp text-caption text-on-inverse-soft line-clamp-2">
                    {article.description}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}

      {footnote && !articles && <p className="text-caption text-on-inverse-soft">{footnote}</p>}
    </section>
  );
});
