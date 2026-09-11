import { forwardRef, useLayoutEffect, useRef } from "react";
import { cn } from "../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Grows with content up to `maxRows`. */
  autoResize?: boolean;
  /** Minimum number of visible rows. Ignored when `rows` is provided. */
  minRows?: number;
  /** Maximum number of visible rows when `autoResize` is on. */
  maxRows?: number;
  /** Let the user resize vertically. */
  resize?: "none" | "vertical";
  /** Stretch to fill the available height of a flex parent. */
  fill?: boolean;
}

const DEFAULT_MIN_ROWS = 4;
const DEFAULT_MAX_ROWS = 12;

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

/** Multiline field used for homework submissions and long-form comments. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className,
    rows,
    minRows = DEFAULT_MIN_ROWS,
    maxRows = DEFAULT_MAX_ROWS,
    autoResize = false,
    resize = "none",
    fill = false,
    value,
    defaultValue,
    onChange,
    ...props
  },
  ref,
) {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (!autoResize) return;
    const el = innerRef.current;
    if (!el) return;

    const computed = getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight) || 22;
    const paddingTop = parseFloat(computed.paddingTop) || 0;
    const paddingBottom = parseFloat(computed.paddingBottom) || 0;
    const rowHeight = lineHeight;
    const minHeight = minRows * rowHeight + paddingTop + paddingBottom;
    const maxHeight = maxRows * rowHeight + paddingTop + paddingBottom;

    el.style.height = "0px";
    el.style.height = `${Math.max(minHeight, Math.min(el.scrollHeight, maxHeight))}px`;
  }, [autoResize, value, defaultValue, minRows, maxRows]);

  return (
    <textarea
      data-aem-input-control
      ref={mergeRefs(ref, innerRef)}
      rows={rows ?? minRows}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      className={cn(
        "w-full border-2 border-border-strong bg-surface px-4 py-3 text-body text-ink placeholder:text-ink-muted shadow-card transition-colors hover:border-ink focus:border-ink focus:outline-none",
        resize === "vertical" ? "resize-y" : "resize-none",
        fill && "min-h-0 flex-1 h-full",
        className,
      )}
      {...props}
    />
  );
});
