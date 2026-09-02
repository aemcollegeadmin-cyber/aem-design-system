import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { cn } from "../lib/cn";

const MAX_HEIGHT = 160;

export interface ChatInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  sendLabel?: string;
  onSend?: () => void;
}

/** Auto-growing chat composer. Stretches vertically as the message grows,
 *  and sends on Enter (Shift+Enter adds a new line). */
export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(function ChatInput(
  {
    className,
    sendLabel = "Надіслати",
    onSend,
    placeholder = "Повідомлення для ментора",
    value,
    defaultValue,
    onChange,
    onKeyDown,
    ...props
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ""));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const setTextareaRef = (node: HTMLTextAreaElement | null) => {
    textareaRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    }
  };

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
  }, [currentValue]);

  return (
    <div
      className={cn(
        "flex min-h-11 items-end gap-2 rounded-pill border-2 border-border-strong bg-surface py-1 pl-4 pr-1.5 transition-colors hover:border-focus focus-within:border-focus",
        className,
      )}
    >
      <textarea
        data-aem-composite-control
        ref={setTextareaRef}
        value={currentValue}
        placeholder={placeholder}
        rows={1}
        className="min-h-[22px] max-h-40 flex-1 resize-none bg-transparent py-1.5 text-body text-ink placeholder:text-ink-muted focus:outline-none focus-visible:ring-0"
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend?.();
            if (!isControlled) setInternalValue("");
          }
          onKeyDown?.(e);
        }}
        {...props}
      />
      <IconButton label={sendLabel} variant="muted" size="sm" onClick={onSend}>
        <Icon name="send" size="sm" />
      </IconButton>
    </div>
  );
});
