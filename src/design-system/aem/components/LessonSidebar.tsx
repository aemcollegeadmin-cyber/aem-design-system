import { forwardRef, useId } from "react";
import { Tabs, type TabItem } from "./Tabs";
import { cn } from "../lib/cn";

export interface LessonSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Tab switcher at the top of the panel (e.g. Інформація / Рекомендації). */
  tabs?: TabItem[];
  /** Active tab value. Required when `tabs` is passed. */
  value?: string;
  onValueChange?: (value: string) => void;
  /**
   * Replaces the tab switcher with arbitrary content (e.g. a homework form
   * header or a filter row). Rendered in the same slot as `tabs`.
   */
  headerSlot?: React.ReactNode;
  /** Status strip under the tabs — usually a `Callout`. */
  callout?: React.ReactNode;
  /**
   * `fit` (default) makes the panel stick to the viewport on desktop: the
   * panel never exceeds the screen height and only the body scrolls;
   * `clamped` limits the body height and fades its bottom edge;
   * `full` lets the body grow with its content;
   * `scroll` keeps the panel height fixed (100% of its parent) and scrolls only the body.
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
 * the lesson description and stacked actions. Compose the body from `Text`,
 * the actions from `Button`.
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

  return (
    <aside
      ref={ref}
      className={cn(
        "flex flex-col gap-4 rounded-panel bg-surface p-4 shadow-card",
        scroll && "h-full min-h-0",
        fit && "min-h-0 lg:sticky lg:top-4 lg:max-h-[calc(100dvh-2rem)]",
        floating && "max-lg:pb-4",
        className,
      )}
      {...props}
    >
      {headerSlot ??
        (tabs && value && (
          <Tabs items={tabs} value={value} onValueChange={onValueChange} aria-controls={panelId} />
        ))}

      {callout}

      <div
        id={panelId}
        className={cn(
          "relative min-h-0 text-body text-ink",
          clamped && "max-h-72 overflow-hidden",
          scroll && "flex-1 overflow-y-auto",
          fit && "lg:flex-1 lg:overflow-y-auto",
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

      {actions && (
        <div
          className={cn(
            "flex shrink-0 flex-col gap-3 border-t-2 border-border-line pt-4",
            floating &&
              "max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-40 max-lg:border-t-2 max-lg:bg-surface max-lg:px-4 max-lg:pb-[max(1rem,env(safe-area-inset-bottom))] max-lg:pt-3",
          )}
        >
          {actions}
        </div>
      )}
      {floating && <div aria-hidden="true" className="h-20 shrink-0 lg:hidden" />}
    </aside>
  );
});


