import { forwardRef } from "react";
import { ArrowUp } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "../lib/cn";

export interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sendLabel?: string;
  onSend?: () => void;
}

/** Single-line chat composer with a send affordance. */
export const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(function ChatInput(
  { className, sendLabel = "Надіслати", onSend, placeholder = "Повідомлення для ментора", ...props },
  ref,
) {
  return (
    <div className={cn("flex items-center gap-2 rounded-card bg-surface px-4 py-2 shadow-card", className)}>
      <input
        ref={ref}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-body text-ink placeholder:text-ink-muted focus:outline-none"
        {...props}
      />
      <IconButton label={sendLabel} variant="muted" size="sm" onClick={onSend}>
        <ArrowUp className="size-4" />
      </IconButton>
    </div>
  );
});