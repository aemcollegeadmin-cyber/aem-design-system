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

export interface ScoreCardRankProgress {
  /** Прогрес 0–100 до наступного місця в загальному рейтингу коледжу. */
  value: number;
  /** Місце, яке стоїть перед нами, напр. «#34». */
  nextRank?: string;
}

export interface ScoreCardComparison {
  /** Тижневий прогрес 0–100 до суперника. */
  value: number;
  /** Суперник, який у тижневому рейтингу стоїть перед нами. */
  target?: {
    name: string;
    avatarUrl?: string;
    /** Попередньо відформатовані бали, напр. "180 балів". */
    score: string;
  };
  /** Доступна назва бару. */
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
  /** Caption under the total score. Defaults to «Твій загальний бал». */
  label?: string;
  /** Pre-formatted total score. */
  score: string;
  rank?: string;
  /** Emoji shown in the top-right corner of the rank tile. */
  rankEmoji?: string;
  /** Caption under the rank, used when rankContext is not supplied. */
  rankLabel?: string;
  rankContext?: string;
  /** Used when neither rankContext nor rankLabel is supplied. */
  rankDelta?: string;
  /** Overall college ranking bar under the total score. */
  rankProgress?: ScoreCardRankProgress;
  /** Pre-formatted weekly points, e.g. «+120». */
  delta?: string;
  /** Caption under the weekly score. Defaults to «Результат цього тижня». */
  weekLabel?: string;
  weekContext?: string;
  sparkline?: ScoreCardSparkline;
  /** Weekly ranking bar with the student ahead of us this week. */
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

function Bar({ value, label }: { value: number; label: string }) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}
      className="h-2 min-w-0 flex-1 overflow-hidden rounded-pill bg-on-inverse-track">
      <div className="h-full rounded-pill bg-accent-brand" style={{ width: `${v}%` }} />
    </div>
  );
}

const tile = "relative flex min-w-0 flex-col gap-4 rounded-card p-4";

/** Three statistic tiles (rank, total, wider week tile) with numbers on top and captions at the bottom, followed by optional blog previews. */
export const ScoreCard = forwardRef<HTMLElement, ScoreCardProps>(function ScoreCard(
  {
    label = "Твій загальний бал", score, rank, rankEmoji, rankLabel,
    rankContext, rankDelta, rankProgress, delta, weekLabel = "Результат цього тижня", weekContext,
    sparkline, comparison, articles, footnote, loading = false, className, ...props
  }, ref,
) {
  return (
    <section ref={ref} aria-busy={loading || undefined}
      className={cn("flex flex-col gap-6 rounded-panel bg-surface-inverse p-6 text-on-inverse", className)} {...props}>
      <div className="aem-score-grid grid grid-cols-1 items-stretch gap-3">
        {loading ? [0, 1, 2].map((index) => (
          <div key={index} className={cn(tile, index === 0 ? "bg-surface text-ink" : "bg-surface-inverse-muted text-on-inverse")}>
            <Skeleton radius="pill" className={cn("h-10 w-1/2 md:h-12", index === 0 ? "bg-surface-muted" : "bg-on-inverse-track")} />
            <div className="flex min-h-8 items-center gap-3">
              {index > 0 && <Skeleton radius="pill" className="h-2 flex-1 bg-on-inverse-track" />}
              {index === 1 && <Skeleton radius="pill" className="h-4 w-8 bg-on-inverse-track" />}
              {index === 2 && <><Skeleton radius="pill" className="size-8 bg-on-inverse-track" /><Skeleton radius="pill" className="h-4 w-16 bg-on-inverse-track" /></>}
            </div>
            <Skeleton radius="pill" className={cn("mt-auto h-4 w-2/3", index === 0 ? "bg-surface-muted" : "bg-on-inverse-track")} />
          </div>
        )) : (
          <>
            <div className={cn(tile, "bg-surface text-ink")}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-h1 wrap-anywhere">{rank || "—"}</span>
                {rankEmoji && <span className="shrink-0 text-h2" aria-hidden="true">{rankEmoji}</span>}
              </div>
              <div className="min-h-8" aria-hidden="true" />
              <span className="mt-auto text-body text-ink-soft">{rankContext || rankLabel || rankDelta}</span>
            </div>
            <div className={cn(tile, "bg-surface-inverse-muted text-on-inverse")}>
              <span className="text-h1 text-on-inverse wrap-anywhere">{score}</span>
              <div className="flex min-h-8 items-center gap-3">
                {rankProgress && (
                  <>
                    <Bar value={rankProgress.value} label={label} />
                    {rankProgress.nextRank && <span className="shrink-0 text-body text-on-inverse">{rankProgress.nextRank}</span>}
                  </>
                )}
              </div>
              <span className="mt-auto text-body text-on-inverse-soft">{label}</span>
            </div>
            <div className={cn(tile, "bg-surface-inverse-muted text-on-inverse")}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-h1 text-on-inverse wrap-anywhere">{delta || "—"}</span>
                {sparkline && <Sparkline {...sparkline} />}
              </div>
              <div className="flex min-h-8 items-center gap-3">
                {comparison && (
                  <>
                    <Bar value={comparison.value} label={comparison.hint || comparison.leftLabel || weekLabel} />
                    {comparison.target ? (
                      <div className="flex shrink-0 items-center gap-2">
                        <Avatar name={comparison.target.name} src={comparison.target.avatarUrl} size="md" />
                        <span className="text-body text-on-inverse-soft">{comparison.target.score}</span>
                      </div>
                    ) : comparison.rightLabel && <span className="shrink-0 text-body text-on-inverse-soft">{comparison.rightLabel}</span>}
                  </>
                )}
              </div>
              <span className="mt-auto text-body text-on-inverse-soft">{weekContext || weekLabel}</span>
            </div>
          </>
        )}
      </div>
      {loading ? (
        <div className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-3">
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
