import { forwardRef } from "react";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface ScoreCardBar {
  /** Optional axis label, e.g. a week number. */
  label?: string;
  /** Relative height, 0–100. */
  value: number;
  /** Highlights the bar with the brand accent (usually the current week). */
  highlight?: boolean;
}

export interface ScoreCardComparison {
  /** Own progress toward the next place, 0–100. */
  value: number;
  /** Left caption, e.g. "ти · 1 480". */
  leftLabel: string;
  /** Right caption, e.g. "#6 Ната Ш. · 1 520". */
  rightLabel?: string;
  /** Line under the bar, e.g. "40 балів — і ти обходиш шосте місце". */
  hint?: string;
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
  /** Change since last period, e.g. "+120 за тиждень". */
  delta?: string;
  /** Place in the ranking, e.g. "#7". */
  rank?: string;
  /** Place change, e.g. "↑ 2 місця". */
  rankDelta?: string;
  comparison?: ScoreCardComparison;
  /** Bar history block. An empty `bars` array renders `emptyLabel` instead. */
  chart?: { title: string; bars: ScoreCardBar[]; emptyLabel?: string };
  /** Muted closing line, e.g. "Найкращий тиждень. Серія 12 днів тримає темп." */
  footnote?: string;
  /** Blog preview block under the chart. `items` drives the card grid. */
  articles?: {
    title?: string;
    items: ScoreCardArticle[];
    action?: React.ReactNode;
  };
  /** Skeleton placeholder instead of content. */
  loading?: boolean;
}

/**
 * Dark hero card with the student's college score, place in the ranking,
 * distance to the next place and a short history of weekly points.
 */
export const ScoreCard = forwardRef<HTMLElement, ScoreCardProps>(function ScoreCard(
  {
    label,
    score,
    delta,
    rank,
    rankDelta,
    comparison,
    chart,
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
        <div className="flex flex-col gap-3">
          <Skeleton radius="pill" className="h-4 w-32 bg-surface-inverse-muted" />
          <Skeleton radius="pill" className="h-10 w-48 bg-surface-inverse-muted" />
        </div>
        <Skeleton radius="pill" className="h-2 w-full bg-surface-inverse-muted" />
        <Skeleton radius="card" className="h-28 w-full bg-surface-inverse-muted" />
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
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-h1 text-on-inverse">{score}</span>
            {delta && <span className="text-body text-accent-brand">{delta}</span>}
          </div>
        </div>
        {(rank || rankDelta) && (
          <div className="flex flex-col items-end gap-1">
            {rank && <span className="text-h2 text-on-inverse">{rank}</span>}
            {rankDelta && <span className="text-caption text-accent-brand">{rankDelta}</span>}
          </div>
        )}
      </div>

      {comparison && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4 text-caption text-on-inverse-soft">
            <span>{comparison.leftLabel}</span>
            {comparison.rightLabel && <span>{comparison.rightLabel}</span>}
          </div>
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
          {comparison.hint && <p className="text-body text-on-inverse">{comparison.hint}</p>}
        </div>
      )}

      {chart && (
        <div className="flex flex-col gap-3 border-t-2 border-on-inverse-track pt-5">
          <span className="text-body text-on-inverse">{chart.title}</span>
          {chart.bars.length === 0 ? (
            <p className="rounded-card bg-surface-inverse-muted px-4 py-6 text-center text-caption text-on-inverse-soft">
              {chart.emptyLabel ?? "Це твій перший тиждень — історія балів з'явиться далі."}
            </p>
          ) : (
          <div className="flex h-28 items-end gap-2">
            {chart.bars.map((bar, index) => (
              <div key={bar.label ?? index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div
                  className={cn(
                    "w-full rounded-field",
                    bar.highlight ? "bg-accent-brand" : "bg-surface-inverse-muted",
                  )}
                  style={{ height: `${Math.min(100, Math.max(4, bar.value))}%` }}
                />
                {bar.label && (
                  <span className="text-caption text-on-inverse-soft">{bar.label}</span>
                )}
              </div>
            ))}
          </div>
          )}

        </div>
      )}

      {articles && (
        <div className="flex flex-col gap-3 border-t-2 border-on-inverse-track pt-5">
          {(articles.title || articles.action) && (
            <div className="flex items-center justify-between gap-3">
              {articles.title && (
                <span className="text-body text-on-inverse">{articles.title}</span>
              )}
              {articles.action}
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
