import { forwardRef } from "react";
import { Avatar } from "./Avatar";
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
  /** Optional block under the list, e.g. a Callout with the next goal. */
  footer?: React.ReactNode;
}

/** Weekly ranking preview: top places plus the current student's row. */
export const LeaderboardCard = forwardRef<HTMLElement, LeaderboardCardProps>(
  function LeaderboardCard({ title, action, entries, footer, className, ...props }, ref) {
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

        <ul className="flex flex-col gap-1">
          {entries.map((entry) => (
            <li
              key={`${entry.rank}-${entry.name}`}
              className={cn(
                "flex items-center gap-3 rounded-pill px-3 py-2",
                entry.current
                  ? "bg-accent-brand text-accent-brand-fg"
                  : "text-ink",
                entry.current && "mt-2 border-t-2 border-transparent",
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
          ))}
        </ul>

        {footer && <div className="border-t-2 border-border-line pt-4">{footer}</div>}
      </section>
    );
  },
);
