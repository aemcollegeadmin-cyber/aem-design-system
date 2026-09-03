import { forwardRef, useEffect, useRef } from "react";
import { cn } from "../lib/cn";

/**
 * Height/geometry invariants are shared with `LessonSidebar`: the same shell,
 * the same header/footer treatment and the same `fit` sticky behaviour, so a
 * chat panel and an info sidebar standing side by side always match.
 */
const PANEL_SHELL = "flex min-h-0 w-full flex-col gap-4 rounded-panel bg-surface p-4 shadow-card";
const PANEL_HEADER = "shrink-0";
const PANEL_BODY = "flex min-h-0 flex-col gap-3 text-body text-ink";
const PANEL_FOOTER = "shrink-0 border-t-2 border-border-line pt-4";
const PANEL_FOOTER_MOBILE =
  "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-40 max-lg:border-t-2 max-lg:bg-surface max-lg:px-4 max-lg:pb-[max(1rem,env(safe-area-inset-bottom))] max-lg:pt-3";

export interface ChatPanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Panel header — usually a `PageNav`-less title row or a `UserChip`. */
  headerSlot?: React.ReactNode;
  /** Status strip under the header — usually a `Callout`. */
  callout?: React.ReactNode;
  /** Composer pinned to the bottom — usually a `ChatInput`. */
  composer?: React.ReactNode;
  /**
   * Height behaviour, identical to `LessonSidebar`:
   * `fit` (default) sticks to the viewport on desktop — only the thread scrolls;
   * `scroll` fills 100% of the parent height and scrolls only the thread;
   * `full` grows with the thread.
   */
  contentState?: "fit" | "scroll" | "full";
  /** On mobile the composer floats as a fixed bar (default). */
  floatingComposerOnMobile?: boolean;
  /** Keep the thread scrolled to the newest message. */
  autoScroll?: boolean;
}

/**
 * Mentor/student chat panel. Compose the thread from `ChatBubble` children and
 * pass a `ChatInput` as `composer`. Roles differ only in content — the panel
 * geometry and height logic are identical everywhere.
 */
export const ChatPanel = forwardRef<HTMLElement, ChatPanelProps>(function ChatPanel(
  {
    headerSlot,
    callout,
    composer,
    contentState = "fit",
    floatingComposerOnMobile = true,
    autoScroll = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const threadRef = useRef<HTMLDivElement>(null);
  const fit = contentState === "fit";
  const scroll = contentState === "scroll";
  const floating = Boolean(composer) && floatingComposerOnMobile;

  useEffect(() => {
    if (!autoScroll) return;
    const node = threadRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [autoScroll, children]);

  return (
    <section
      ref={ref}
      className={cn(
        PANEL_SHELL,
        scroll && "h-full",
        fit && "aem-panel-fit lg:sticky lg:top-4 lg:h-[calc(100dvh-2rem)] lg:max-h-[calc(100dvh-2rem)]",
        className,
      )}
      {...props}
    >
      {headerSlot && <div className={PANEL_HEADER}>{headerSlot}</div>}
      {callout && <div className={PANEL_HEADER}>{callout}</div>}

      <div
        ref={threadRef}
        className={cn(
          PANEL_BODY,
          scroll && "flex-1 overflow-y-auto",
          fit && "aem-panel-fit-body lg:flex-1 lg:overflow-y-auto",
        )}
      >
        {children}
      </div>

      {composer && <div className={cn(PANEL_FOOTER, floating && PANEL_FOOTER_MOBILE)}>{composer}</div>}
      {floating && <div aria-hidden="true" className="h-24 shrink-0 lg:hidden" />}
    </section>
  );
});
