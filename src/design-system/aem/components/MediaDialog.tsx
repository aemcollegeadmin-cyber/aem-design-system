import { forwardRef, useRef, useState } from "react";
import { Close, Content, Description, Overlay, Portal, Title } from "@radix-ui/react-dialog";
import { Button } from "./Button";
import { Icon, type IconName } from "./Icon";
import { IconButton } from "./IconButton";
import { cn } from "../lib/cn";

export type MediaDialogMediaType = "image" | "video" | "embed";

export interface MediaDialogMedia {
  /** `image` covers GIF too; `embed` is an iframe (YouTube/Vimeo embed URL). */
  type: MediaDialogMediaType;
  src: string;
  /** Required for `image` — accessible description of the media. */
  alt?: string;
  /** Poster frame for `video`. */
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface MediaDialogAction {
  label: string;
  /**
   * Return (or resolve to) `false` to keep the dialog open — e.g. when a form
   * inside the step fails validation. Any other result closes it.
   */
  onClick?: () => void | boolean | Promise<void | boolean>;
  /** Keeps the dialog open after the click (default: closes it). */
  keepOpen?: boolean;
  disabled?: boolean;
  /** Shows a spinner and blocks the action; async handlers set this automatically. */
  loading?: boolean;
}

export interface MediaDialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Content>, "title" | "children"> {
  title: string;
  description?: string;
  /** Visual at the top of the dialog: screenshot, GIF, video or embed. */
  media?: MediaDialogMedia;
  /**
   * Custom React node (e.g. a CSS/React animation) rendered inside the same
   * media container. Used only when `media` is not provided — `media` wins.
   * The node must keep its styles scoped to its own container.
   */
  mediaComponent?: React.ReactNode;
  mediaAspect?: "video" | "square" | "wide";
  /** Background surface behind media, mediaComponent, or fallback icon. */
  mediaSurface?: "muted" | "inverse";

  /** Circular accent glyph shown above the title (used when there is no media). */
  icon?: IconName;
  /** Onboarding step position — renders progress dots and «N з M». */
  step?: { current: number; total: number };
  primaryAction?: MediaDialogAction;
  secondaryAction?: MediaDialogAction;
  /** Low-emphasis text link under the actions («Пропустити»). */
  tertiaryAction?: MediaDialogAction;
  /** Show the close control and allow dismissing by overlay/Esc. */
  dismissible?: boolean;
  closeLabel?: string;
  size?: "sm" | "md" | "lg";
  align?: "center" | "start";
  children?: React.ReactNode;
}

const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;
const aspects = { video: "aspect-video", square: "aspect-square", wide: "aspect-[21/9]" } as const;

function MediaFrame({ media, aspect, surface }: { media: MediaDialogMedia; aspect: keyof typeof aspects; surface: "muted" | "inverse" }) {
  const surfaceBg = surface === "inverse" ? "bg-surface-inverse" : "bg-surface-muted";
  return (
    <div className={cn("w-full overflow-hidden rounded-card", surfaceBg, aspects[aspect])}>
      {media.type === "image" && (
        <img src={media.src} alt={media.alt ?? ""} className="size-full object-cover" />
      )}
      {media.type === "video" && (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay={media.autoPlay}
          loop={media.loop}
          muted={media.muted ?? media.autoPlay}
          controls={media.controls ?? !media.autoPlay}
          playsInline
          className="size-full object-cover"
        />
      )}
      {media.type === "embed" && (
        <iframe
          src={media.src}
          title={media.alt ?? "media"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="size-full border-0"
        />
      )}
    </div>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-pill transition-all",
            i + 1 === current ? "w-5 bg-ink" : "w-1.5 bg-border-subtle",
          )}
        />
      ))}
    </div>
  );
}

function ActionButton({
  action,
  variant,
  size,
  block = true,
  onClose,
}: {
  action: MediaDialogAction;
  variant: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  onClose: () => void;
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    if (pending) return;
    try {
      const result = action.onClick?.();
      if (result instanceof Promise) {
        setPending(true);
        const settled = await result;
        if (!action.keepOpen && settled !== false) onClose();
        return;
      }
      if (!action.keepOpen && result !== false) onClose();
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      block={block && variant !== "ghost"}
      disabled={action.disabled}
      loading={action.loading || pending}
      onClick={handleClick}
    >
      {action.label}
    </Button>
  );
}

/**
 * Media-first modal: onboarding steps, feature announcements and “what’s new”
 * popups. Wrap in `DialogRoot` (controlled `open` for onboarding flows).
 */
export const MediaDialog = forwardRef<HTMLDivElement, MediaDialogProps>(function MediaDialog(
  {
    title,
    description,
    media,
    mediaComponent,

    mediaAspect = "video",
    mediaSurface = "muted",
    icon,
    step,
    primaryAction,
    secondaryAction,
    tertiaryAction,
    dismissible = true,
    closeLabel = "Закрити",
    size = "sm",
    align = "center",
    className,
    children,
    ...props
  },
  ref,
) {
  const centered = align === "center";
  const surfaceBg = mediaSurface === "inverse" ? "bg-surface-inverse" : "bg-surface-muted";
  const onSurfaceColor = mediaSurface === "inverse" ? "text-on-inverse" : "text-accent-lime-fg";
  const glyphSurfaceBg = mediaSurface === "inverse" ? "bg-surface-inverse-muted" : "bg-accent-lime";
  const closeRef = useRef<HTMLButtonElement>(null);
  const requestClose = () => closeRef.current?.click();
  return (
    <Portal>
      <Overlay className="fixed inset-0 z-40 bg-ink/40" />
      <Content
        ref={ref}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-panel bg-surface p-6",
          sizes[size],
          className,
        )}
        onEscapeKeyDown={(e) => !dismissible && e.preventDefault()}
        onPointerDownOutside={(e) => !dismissible && e.preventDefault()}
        onInteractOutside={(e) => !dismissible && e.preventDefault()}
        {...props}
      >
        <Close ref={closeRef} aria-hidden tabIndex={-1} className="hidden" />

        <header className="flex shrink-0 items-center justify-between gap-4">
          <Title className="min-w-0 flex-1 text-h2 text-left text-ink">{title}</Title>
          {dismissible && (
            <Close asChild>
              <IconButton label={closeLabel} variant="muted" size="sm">
                <Icon name="close" size="md" />
              </IconButton>
            </Close>
          )}
        </header>

        <div className="flex flex-col gap-4">
          {media && <MediaFrame media={media} aspect={mediaAspect} surface={mediaSurface} />}

          {!media && mediaComponent && (
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-card isolate",
                surfaceBg,
                aspects[mediaAspect],
              )}
            >
              {mediaComponent}
            </div>
          )}

          {!media && !mediaComponent && icon && (

            <div
              className={cn(
                "flex w-full items-center justify-center overflow-hidden rounded-card aspect-video",
                surfaceBg,
                onSurfaceColor,
                centered && "mx-auto",
              )}
            >
              <div className={cn("flex size-12 items-center justify-center rounded-pill", glyphSurfaceBg, onSurfaceColor)}>
                <Icon name={icon} size="lg" />
              </div>
            </div>
          )}

          {description && (
            <Description className={cn("text-body text-ink-soft", centered && "text-center")}>
              {description}
            </Description>
          )}

          {children}

          {step && (
            <div className={cn("flex items-center", centered && "justify-center")}>
              <StepDots current={step.current} total={step.total} />
            </div>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col gap-2">
              {primaryAction && (
                <ActionButton action={primaryAction} variant="primary" onClose={requestClose} />
              )}
              {secondaryAction && (
                <ActionButton action={secondaryAction} variant="secondary" onClose={requestClose} />
              )}
            </div>
          )}

          {tertiaryAction && (
            <div className={cn("flex", centered ? "justify-center" : "justify-start")}>
              <ActionButton action={tertiaryAction} variant="ghost" size="sm" onClose={requestClose} />
            </div>
          )}
        </div>
      </Content>
    </Portal>
  );
});
