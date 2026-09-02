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
   * `clamped` (default) limits the body height and fades its bottom edge;
   * `full` lets the body grow with its content;
   * `scroll` keeps the panel height fixed and scrolls only the body.
   */
  contentState?: "clamped" | "full" | "scroll";
  /** Stacked actions pinned to the bottom, above a hairline divider. */
  actions?: React.ReactNode;
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
    contentState = "clamped",
    actions,
    className,
    children,
    ...props
  },
  ref,
) {
  const panelId = useId();
  const clamped = contentState === "clamped";
  const scroll = contentState === "scroll";

  return (
    <aside
      ref={ref}
      className={cn(
        "flex flex-col gap-4 rounded-panel bg-surface p-4 shadow-card",
        scroll && "h-full min-h-0",
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
        <div className="flex shrink-0 flex-col gap-3 border-t-2 border-border-line pt-4">{actions}</div>
      )}
    </aside>
  );
});

