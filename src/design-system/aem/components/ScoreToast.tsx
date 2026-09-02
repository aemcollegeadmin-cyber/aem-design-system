import { toast } from "sonner";
import { Icon, type IconName } from "./Icon";

export interface ScoreToastOptions {
  /** Points awarded, e.g. 25. Rendered as "+25". */
  points: number;
  /** What the points were awarded for, e.g. "Урок 4 завершено". */
  reason?: string;
  /** Small glyph on the left. Defaults to "sparkles". */
  icon?: IconName;
  /** Milliseconds the toast stays visible. */
  duration?: number;
  /** Pre-formatted points label, overrides the "+N" default. */
  label?: string;
}

/**
 * Points-earned toast, styled with the system Toaster. Requires `<Toaster />`
 * mounted once at the app root.
 */
export function toastPoints({
  points,
  reason,
  icon = "sparkles",
  duration = 4000,
  label,
}: ScoreToastOptions) {
  return toast.custom(
    () => (
      <div className="flex items-center gap-3 rounded-card bg-surface-inverse px-4 py-3 text-on-inverse">
        <span className="inline-flex size-8 items-center justify-center rounded-pill bg-accent-brand text-accent-brand-fg">
          <Icon name={icon} size="md" />
        </span>
        <span className="flex flex-col">
          <span className="text-body text-on-inverse">{label ?? `+${points} балів`}</span>
          {reason && <span className="text-caption text-on-inverse-soft">{reason}</span>}
        </span>
      </div>
    ),
    { duration },
  );
}
