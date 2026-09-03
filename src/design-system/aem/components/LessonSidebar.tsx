import { forwardRef, useId } from "react";
import { Tabs, type TabItem } from "./Tabs";
import { cn } from "../lib/cn";

/**
 * Invariants shared by EVERY LessonSidebar instance, regardless of the account
 * type (mentor / student), the tabs it shows or the `contentState` in use.
 * States may only change HOW the body scrolls — never the panel geometry.
 */
const SIDEBAR_SHELL = "flex min-h-0 w-full flex-col gap-4 rounded-panel bg-surface p-4 shadow-card";
const SIDEBAR_HEADER = "shrink-0";
const SIDEBAR_BODY = "relative min-h-0 text-body text-ink";
/**
 * Status messages (Callout / Alert) always sit at the BOTTOM of the panel,
 * directly ABOVE the actions. They are one visual group: `gap-2`, no divider.
 */
const SIDEBAR_CALLOUTS = "mt-auto flex shrink-0 flex-col gap-2";
const SIDEBAR_ACTIONS = "flex shrink-0 flex-col gap-3 border-t-2 border-border-line pt-4";
const SIDEBAR_ACTIONS_MOBILE =
  "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-40 max-lg:border-t-2 max-lg:bg-surface max-lg:px-4 max-lg:pb-[max(1rem,env(safe-area-inset-bottom))] max-lg:pt-3";

export interface LessonSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Tab switcher at the top of the panel (e.g. Інформація / Рекомендації). */
  tabs?: TabItem[];
  /** Active tab value. Required when `tabs` is passed. */
  value?: string;
  onValueChange?: (value: string) => void;
  /**
   * Replaces the tab switcher with arbitrary content (e.g. a homework form
   * header or a mentor filter row). Rendered in the same slot as `tabs`, with
   * the same spacing.
   */
  headerSlot?: React.ReactNode;
  /**
   * Status messages (`Callout` / `Alert`). Rendered as ONE tight group pinned
   * to the bottom of the panel, above the actions. Pass several elements — the
   * group keeps a minimal `gap-2` between them.
   */
  callout?: React.ReactNode;
  /**
   * Body scroll behaviour only — padding, gaps, radius, header and action
   * geometry stay identical in every state:
   * `fit` (default) sticks the panel to the viewport on desktop (only the body scrolls);
   * `clamped` limits the body height and fades its bottom edge;
   * `full` lets the body grow with its content;
   * `scroll` keeps the panel at 100% of its parent height and scrolls only the body.
   */
  contentState?: "fit" | "clamped" | "full" | "scroll";
  /** Stacked actions pinned to the bottom, above a hairline divider. */
  actions?: React.ReactNode;
  /**
   * On mobile the actions float above the page as a fixed bar (default).
   * Set to `false` to keep them inline inside the panel.
   */
  floatingActionsOnMobile?: boolean;
}

/**
 * Right-hand lesson panel: tabs (or a custom header slot), a status callout,
 * the lesson body and stacked actions. The same component serves mentor and
 * student screens — role differences live in the content passed in, never in
 * the panel's layout. Compose the body from `Text`, the actions from `Button`.
 */
export const LessonSidebar = forwardRef<HTMLElement, LessonSidebarProps>(function LessonSidebar(
  {
    tabs,
    value,
    onValueChange,
    headerSlot,
    callout,
    contentState = "fit",
    actions,
    floatingActionsOnMobile = true,
    className,
    children,
    ...props
  },
  ref,
) {
  const panelId = useId();
  const clamped = contentState === "clamped";
  const scroll = contentState === "scroll";
  const fit = contentState === "fit";
  const floating = Boolean(actions) && floatingActionsOnMobile;
  const header = headerSlot ??
    (tabs && value ? (
      <Tabs items={tabs} value={value} onValueChange={onValueChange} aria-controls={panelId} />
    ) : null);

  return (
    <aside
      ref={ref}
      className={cn(
        SIDEBAR_SHELL,
        scroll && "h-full",
        fit && "aem-panel-fit",
        className,
      )}
      {...props}
    >
      {header && <div className={SIDEBAR_HEADER}>{header}</div>}

      <div
        id={panelId}
        className={cn(
          SIDEBAR_BODY,
          clamped && "max-h-72 overflow-hidden",
          scroll && "flex-1 overflow-y-auto",
          fit && "aem-panel-fit-body lg:flex-1 lg:overflow-y-auto",
        )}
      >
        {children}
        {clamped && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-surface to-transparent"
          />
        )}
      </div>

      {callout && <div className={SIDEBAR_CALLOUTS}>{callout}</div>}

      {actions && (
        <div className={cn(SIDEBAR_ACTIONS, floating && SIDEBAR_ACTIONS_MOBILE)}>{actions}</div>
      )}

      {floating && <div aria-hidden="true" className="h-20 shrink-0 lg:hidden" />}
    </aside>
  );
});
