import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Icon, type IconName } from "./Icon";
import { cn } from "../lib/cn";

const preview = cva(
  "relative flex shrink-0 items-center justify-center overflow-hidden bg-surface-inverse text-on-inverse",
  {
    variants: {
      size: {
        sm: "h-16 w-24 rounded-field",
        md: "h-20 w-32 rounded-card",
        lg: "h-36 w-full rounded-panel",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/** What the preview stands for. Drives the glyph shown on the poster. */
export type MediaPreviewKind = "video" | "test" | "reading" | "task" | "image";

const kindIcon: Record<MediaPreviewKind, IconName> = {
  video: "play",
  test: "clipboardCheck",
  reading: "bookOpen",
  task: "fileText",
  image: "image",
};

export interface MediaPreviewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof preview> {
  kind?: MediaPreviewKind;
  /** Poster image URL. Falls back to a dark plate with the kind glyph. */
  src?: string;
  /**
   * Video file URL. Renders the real first frame of the lesson video as the
   * poster (muted, non-interactive) instead of a bare glyph.
   */
  videoSrc?: string;
  /** Accessible description of the poster image. */
  alt?: string;
  /** Renders the glyph as a button, e.g. to start playback. */
  onActivate?: () => void;
  /** Accessible name for the activate control. */
  actionLabel?: string;
}

/** Derives a thumbnail URL from a YouTube / Vimeo-style watch or embed link. */
function youTubeThumb(url: string): string | undefined {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/,
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : undefined;
}

/**
 * Lesson poster: dark plate with a kind glyph (video, test, reading, task) and
 * an optional cover image or real video frame.
 */
export const MediaPreview = forwardRef<HTMLDivElement, MediaPreviewProps>(function MediaPreview(
  { kind = "video", src, videoSrc, alt, onActivate, actionLabel, size, className, ...props },
  ref,
) {
  const embedThumb = videoSrc ? youTubeThumb(videoSrc) : undefined;
  const posterSrc = src ?? embedThumb;
  const showVideo = Boolean(videoSrc && !embedThumb && !src);
  const hasMedia = Boolean(posterSrc || showVideo);

  const glyph = (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-pill",
        kind === "video"
          ? "bg-accent-brand text-accent-brand-fg"
          : "bg-surface-inverse-muted text-on-inverse",
        size === "lg" ? "size-12" : "size-9",
      )}
    >
      <Icon name={kindIcon[kind]} size={size === "lg" ? "xl" : "lg"} />
    </span>
  );

  return (
    <div ref={ref} className={cn(preview({ size }), className)} {...props}>
      {posterSrc && (
        <img
          src={posterSrc}
          alt={alt ?? ""}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      {showVideo && (
        <video
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      )}
      {hasMedia && kind === "video" && (
        <span aria-hidden="true" className="absolute inset-0 bg-surface-inverse/30" />
      )}
      {onActivate ? (
        <button
          type="button"
          onClick={onActivate}
          aria-label={actionLabel ?? "Відкрити"}
          className="relative rounded-pill"
        >
          {glyph}
        </button>
      ) : (
        <span className="relative">{glyph}</span>
      )}
    </div>
  );
});

