import { forwardRef } from "react";
import { Avatar } from "./Avatar";
import { cn } from "../lib/cn";

export interface UserChipProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  email?: string;
  avatarSrc?: string;
  /** `pill` is the compact mentor chip; `row` is the profile row with email. */
  variant?: "pill" | "row";
  /**
   * Background the chip sits on. `onSurface` (default) renders a light-grey
   * pill for white surfaces; `onMuted` renders a white pill for grey surfaces.
   */
  tone?: "onSurface" | "onMuted";
}

/** Avatar + name (+ email) identity chip for mentors, students and moderators. */
export const UserChip = forwardRef<HTMLDivElement, UserChipProps>(function UserChip(
  { name, email, avatarSrc, variant = "pill", tone = "onSurface", className, ...props },
  ref,
) {
  if (variant === "pill") {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-pill p-1 pr-3 shadow-card",
          tone === "onMuted" ? "bg-surface" : "bg-surface-muted",
          className,
        )}
        {...props}
      >
        <Avatar
          name={name}
          src={avatarSrc}
          size="sm"
          variant={tone === "onMuted" ? "muted" : "surface"}
        />
        <span className="text-caption text-ink">{name}</span>
      </div>
    );
  }
  return (
    <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
      <Avatar name={name} src={avatarSrc} size="lg" />
      <span className="flex flex-col">
        <span className="text-body text-ink">{name}</span>
        {email && <span className="text-caption text-ink-muted">{email}</span>}
      </span>
    </div>
  );
});
