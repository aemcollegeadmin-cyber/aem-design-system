import { forwardRef } from "react";
import { Avatar } from "./Avatar";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

export interface LeaderboardEntry {
  /** Place in the ranking. */
  rank: number;
  name: string;
  /** Pre-formatted score, e.g. "2 310". */
  score: string;
  avatarSrc?: string;
  /** Highlights the row as the current student ("Ти"). */
  current?: boolean;
}

export interface LeaderboardCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Card title, e.g. "Рейтинг тижня". */
  title: string;
  /** Trailing link/button in the header, e.g. "усі →". */
  action?: React.ReactNode;
  entries: LeaderboardEntry[];
  /**
   * Current student shown after the preview list when they are outside it.
   * If the same student already exists in `entries`, that row is highlighted
   * in place and no duplicate is rendered.
   */
  currentEntry?: LeaderboardEntry;
  /** Optional block under the list, e.g. a Callout with the next goal. */
  footer?: React.ReactNode;
  /** Skeleton rows instead of the list. */
  loading?: boolean;
  /** Number of skeleton rows while loading. */
  loadingRows?: number;
  /** Line shown when there are no entries yet. */
  emptyLabel?: string;
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <li
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-pill px-3 py-2",
        entry.current ? "bg-accent-brand text-accent-brand-fg" : "text-ink",
      )}
    >
      <span
        className={cn(
          "w-5 text-caption",
          entry.current ? "text-accent-brand-fg" : "text-ink-muted",
        )}
      >
        {entry.rank}
      </span>
      <Avatar
        name={entry.name}
        src={entry.avatarSrc}
        size="md"
        variant={entry.current ? "surface" : "muted"}
        className={entry.current ? "bg-surface-inverse text-on-inverse" : undefined}
      />
      <span className="flex-1 truncate text-body">{entry.name}</span>
      <span className="text-body">{entry.score}</span>
    </li>
  );
}

/** Weekly ranking preview: top places plus the current student's row. */
export const LeaderboardCard = forwardRef<HTMLElement, LeaderboardCardProps>(
  function LeaderboardCard(
    {
      title,
      action,
      entries,
      currentEntry,
      footer,
      loading = false,
      loadingRows = 5,
      emptyLabel = "Рейтинг ще формується — перші бали з'являться цього тижня.",
      className,
      ...props
    },
    ref,
  ) {
    const currentEntryIndex = currentEntry
      ? entries.findIndex(
          (entry) =>
            (entry.current || entry.rank === currentEntry.rank) && entry.name === currentEntry.name,
        )
      : -1;
    const visibleEntries = currentEntry
      ? entries.map((entry, index) =>
          index === currentEntryIndex ? { ...entry, current: true } : entry,
        )
      : entries;
    const pinnedCurrentEntry = currentEntryIndex === -1 && currentEntry
      ? { ...currentEntry, current: true }
      : undefined;
    const hasEntries = visibleEntries.length > 0 || Boolean(pinnedCurrentEntry);

    return (
      <section
        ref={ref}
        className={cn("flex flex-col gap-4 rounded-panel bg-surface p-6", className)}
        {...props}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-h4 text-ink">{title}</h2>
          {action}
        </div>

        {loading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: loadingRows }).map((_, index) => (
              <Skeleton key={index} radius="pill" className="h-11 w-full" />
            ))}
          </div>
        ) : !hasEntries ? (
          <p className="rounded-card bg-surface-muted px-4 py-6 text-center text-caption text-ink-muted">
            {emptyLabel}
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {visibleEntries.length > 0 && (
              <ul className="flex flex-col gap-1">
                {visibleEntries.map((entry) => (
                  <LeaderboardRow key={`${entry.rank}-${entry.name}`} entry={entry} />
                ))}
              </ul>
            )}
            {pinnedCurrentEntry && (
              <ul className="border-t-2 border-border-line pt-2">
                <LeaderboardRow entry={pinnedCurrentEntry} />
              </ul>
            )}
          </div>
        )}


        {footer && <div className="border-t-2 border-border-line pt-4">{footer}</div>}
      </section>
    );
  },
);
