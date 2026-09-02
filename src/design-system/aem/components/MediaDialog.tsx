import { forwardRef } from "react";
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
  onClick?: () => void;
  /** Keeps the dialog open after the click (default: closes it). */
  keepOpen?: boolean;
}

export interface MediaDialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Content>, "title" | "children"> {
  title: string;
  description?: string;
  /** Visual at the top of the dialog: screenshot, GIF, video or embed. */
  media?: MediaDialogMedia;
  mediaAspect?: "video" | "square" | "wide";
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

function MediaFrame({ media, aspect }: { media: MediaDialogMedia; aspect: keyof typeof aspects }) {
  return (
    <div className={cn("w-full overflow-hidden rounded-card bg-surface-muted", aspects[aspect])}>
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
}: {
  action: MediaDialogAction;
  variant: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  block?: boolean;
}) {
  const button = (
    <Button variant={variant} size={size} block={block && variant !== "ghost"} onClick={action.onClick}>
      {action.label}
    </Button>
  );
  return action.keepOpen ? button : <Close asChild>{button}</Close>;
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
    mediaAspect = "video",
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
        <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Title className="min-w-0 text-h2 text-left text-ink">{title}</Title>
          {dismissible && (
            <Close asChild>
              <IconButton label={closeLabel} variant="muted" size="sm">
                <Icon name="close" size="md" />
              </IconButton>
            </Close>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {media && <MediaFrame media={media} aspect={mediaAspect} />}

          {!media && icon && (
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-pill bg-accent-lime text-accent-lime-fg",
                centered && "mx-auto",
              )}
            >
              <Icon name={icon} size="lg" />
            </div>
          )}

          {description && (
            <Description className={cn("text-body text-ink-soft", centered && "text-center")}>
              {description}
            </Description>
          )}

          {children}

          {step && (
            <div className={cn("flex items-center gap-3", centered && "justify-center")}>
              <StepDots current={step.current} total={step.total} />
              <span className="text-caption text-ink-muted">
                {step.current} з {step.total}
              </span>
            </div>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col gap-2">
              {primaryAction && (
                <ActionButton action={primaryAction} variant="primary" />
              )}
              {secondaryAction && (
                <ActionButton action={secondaryAction} variant="secondary" />
              )}
            </div>
          )}

          {tertiaryAction && (
            <div className={cn("flex", centered ? "justify-center" : "justify-start")}>
              <ActionButton action={tertiaryAction} variant="ghost" size="sm" />
            </div>
          )}
        </div>
      </Content>
    </Portal>
  );
});
