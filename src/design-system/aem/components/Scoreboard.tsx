import { forwardRef, useState } from "react";
import { Avatar } from "./Avatar";
import { Skeleton } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { Tabs, type TabItem } from "./Tabs";
import { Dialog, DialogRoot } from "./Dialog";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

export interface ScoreboardRow {
  /** Place in the ranking. */
  rank: number;
  name: string;
  /** Pre-formatted score, e.g. "1 480". */
  score: string;
  /** Change since the previous period, e.g. "+120". */
  delta?: string;
  /** Secondary line, e.g. group or course. */
  meta?: string;
  avatarSrc?: string;
  /** Highlights the row as the current student. */
  current?: boolean;
}

export interface ScoreboardProps extends React.HTMLAttributes<HTMLElement> {
  /** Page-level title, e.g. "Рейтинг тижня". */
  title?: string;
  /** Period caption, e.g. "1–7 вересня". */
  period?: string;
  /**
   * Period switcher, e.g. Тиждень / Загальний. Rendered under the header.
   * The parent re-fetches/re-computes `rows` on change — the component is
   * purely presentational.
   */
  periods?: TabItem[];
  /** Active period value. Required when `periods` is passed. */
  activePeriod?: string;
  onPeriodChange?: (value: string) => void;
  /**
   * Explainer about how points work, opened from the info icon in the header.
   * Shown regardless of the active period (covers the all-time total too).
   */
  infoTitle?: string;
  infoDescription?: React.ReactNode;
  rows: ScoreboardRow[];
  /** Own row pinned to the bottom when it is outside the visible range. */
  currentRow?: ScoreboardRow;
  /** Skeleton rows instead of content. */
  loading?: boolean;
  /** Number of skeleton rows while loading. */
  loadingRows?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Block under the list, e.g. `Pagination`. */
  footer?: React.ReactNode;
}

function Row({ row, pinned }: { row: ScoreboardRow; pinned?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-pill px-4 py-3",
        row.current ? "bg-accent-brand text-accent-brand-fg" : "bg-surface-muted text-ink",
        pinned && "border-2 border-border-strong",
      )}
    >
      <span
        className={cn(
          "w-8 text-body",
          row.current ? "text-accent-brand-fg" : "text-ink-muted",
        )}
      >
        {row.rank}
      </span>
      <Avatar
        name={row.name}
        src={row.avatarSrc}
        size="lg"
        variant={row.current ? "surface" : "surface"}
        className={row.current ? "bg-surface-inverse text-on-inverse" : "bg-surface text-ink"}
      />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-body">{row.name}</span>
        {row.meta && (
          <span
            className={cn(
              "truncate text-caption",
              row.current ? "text-accent-brand-fg" : "text-ink-muted",
            )}
          >
            {row.meta}
          </span>
        )}
      </span>
      {row.delta && (
        <span
          className={cn(
            "text-caption",
            row.current ? "text-accent-brand-fg" : "text-ink-muted",
          )}
        >
          {row.delta}
        </span>
      )}
      <span className="text-body">{row.score}</span>
    </div>
  );
}

/** Full weekly scoreboard list for a dedicated rating page. */
export const Scoreboard = forwardRef<HTMLElement, ScoreboardProps>(function Scoreboard(
  {
    title,
    period,
    periods,
    activePeriod,
    onPeriodChange,
    infoTitle,
    infoDescription,
    rows,
    currentRow,
    loading = false,
    loadingRows = 8,
    emptyTitle = "Рейтинг ще формується",
    emptyDescription = "Щойно з'являться перші бали за тиждень — тут буде список.",
    footer,
    className,
    ...props
  },
  ref,
) {
  const showPinned = currentRow && !rows.some((row) => row.rank === currentRow.rank);
  const [infoOpen, setInfoOpen] = useState(false);
  const hasInfo = Boolean(infoTitle);

  return (
    <section
      ref={ref}
      className={cn("flex flex-col gap-4 rounded-panel bg-surface p-6", className)}
      {...props}
    >
      {(title || period || hasInfo) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {title && <h2 className="text-h2 text-ink">{title}</h2>}
            {hasInfo && (
              <IconButton
                label={infoTitle!}
                variant="muted"
                size="sm"
                onClick={() => setInfoOpen(true)}
              >
                <Icon name="info" size="md" />
              </IconButton>
            )}
          </div>
          {period && <span className="text-caption text-ink-muted">{period}</span>}
        </div>
      )}

      {hasInfo && (
        <DialogRoot open={infoOpen} onOpenChange={setInfoOpen}>
          <Dialog title={infoTitle!} size="sm">
            {infoDescription && <div className="text-body text-ink">{infoDescription}</div>}
          </Dialog>
        </DialogRoot>
      )}

      {periods && activePeriod && (
        <Tabs items={periods} value={activePeriod} onValueChange={onPeriodChange} />
      )}

      {loading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: loadingRows }).map((_, index) => (
            <Skeleton key={index} radius="pill" className="h-14 w-full" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon={undefined}
          title={emptyTitle}
          description={emptyDescription}
          className="bg-surface-muted"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {rows.map((row) => (
            <Row key={`${row.rank}-${row.name}`} row={row} />
          ))}
        </div>
      )}

      {!loading && showPinned && (
        <div className="flex flex-col gap-2 border-t-2 border-border-line pt-4">
          <Row row={{ ...currentRow!, current: true }} pinned />
        </div>
      )}

      {footer && <div className="flex justify-center pt-2">{footer}</div>}
    </section>
  );
});
