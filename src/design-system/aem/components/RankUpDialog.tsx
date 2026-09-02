import { forwardRef } from "react";
import { Content, Description, Overlay, Portal, Title, Close } from "@radix-ui/react-dialog";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { cn } from "../lib/cn";

export interface RankUpDialogProps extends React.ComponentPropsWithoutRef<typeof Content> {
  /** Headline, e.g. "Нове місце в рейтингу". */
  title?: string;
  /** New place, pre-formatted, e.g. "#5". */
  rank: string;
  /** Place change line, e.g. "↑ 2 місця за тиждень". */
  rankDelta?: string;
  /** Supporting line, e.g. "Ти обійшов Нату Ш. — тримай темп." */
  description?: string;
  /** Current score, pre-formatted, e.g. "1 520". */
  score?: string;
  /** Label under the score, defaults to "Бал у коледжі". */
  scoreLabel?: string;
  /** Primary CTA label. */
  primaryLabel?: string;
  onPrimary?: () => void;
  /** Secondary (dismiss) CTA label. */
  secondaryLabel?: string;
  closeLabel?: string;
}

/**
 * Celebration modal shown when the student moves up in the weekly ranking.
 * Wrap in `DialogRoot` and control with `open`/`onOpenChange`.
 */
export const RankUpDialog = forwardRef<HTMLDivElement, RankUpDialogProps>(function RankUpDialog(
  {
    title = "Нове місце в рейтингу",
    rank,
    rankDelta,
    description,
    score,
    scoreLabel = "Бал у коледжі",
    primaryLabel = "До рейтингу",
    onPrimary,
    secondaryLabel = "Пізніше",
    closeLabel = "Закрити",
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <Portal>
      <Overlay className="fixed inset-0 z-40 bg-ink/40" />
      <Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-panel bg-surface p-6",
          className,
        )}
        {...props}
      >
        <header className="flex shrink-0 items-start justify-between gap-4">
          <Title className="min-w-0 flex-1 text-left text-h2 text-ink">{title}</Title>
          <Close asChild>
            <IconButton label={closeLabel} variant="muted" size="sm">
              <Icon name="close" size="md" />
            </IconButton>
          </Close>
        </header>

        <div className="flex flex-col items-center gap-3 rounded-panel bg-surface-inverse px-6 py-8 text-on-inverse">
          <span className="inline-flex size-12 items-center justify-center rounded-pill bg-accent-brand text-accent-brand-fg">
            <Icon name="trophy" size="lg" />
          </span>
          <span className="text-h1 text-on-inverse">{rank}</span>
          {rankDelta && <span className="text-body text-accent-brand">{rankDelta}</span>}
          {score && (
            <span className="text-caption text-on-inverse-soft">
              {scoreLabel}: {score}
            </span>
          )}
        </div>

        {description && (
          <Description className="text-body text-ink-muted">{description}</Description>
        )}

        {children}

        <div className="flex justify-end gap-2">
          <Close asChild>
            <Button variant="ghost">{secondaryLabel}</Button>
          </Close>
          <Close asChild>
            <Button variant="primary" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          </Close>
        </div>
      </Content>
    </Portal>
  );
});
