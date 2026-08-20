import { forwardRef } from "react";
import { Avatar } from "./Avatar";
import { cn } from "../lib/cn";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string;
  avatarSrc?: string;
  time?: string;
  /** `incoming` aligns left, `outgoing` aligns right. */
  variant?: "incoming" | "outgoing";
}

/** Mentor chat message bubble. */
export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(function ChatBubble(
  { author, avatarSrc, time, variant = "incoming", children, className, ...props },
  ref,
) {
  const outgoing = variant === "outgoing";
  return (
    <div
      ref={ref}
      className={cn("flex items-end gap-2", outgoing ? "flex-row-reverse" : "flex-row", className)}
      {...props}
    >
      <Avatar name={author} src={avatarSrc} size="md" />
      <div
        className={cn(
          "max-w-md rounded-card px-4 py-3 text-caption",
          outgoing ? "bg-surface-muted text-ink" : "bg-surface text-ink shadow-card",
        )}
      >
        <p>{children}</p>
        {time && <span className="mt-2 block text-caption text-ink-muted">{time}</span>}
      </div>
    </div>
  );
});