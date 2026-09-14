import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Skeleton } from "./Skeleton";
import { cn } from "../lib/cn";

/** Extracts the 11-char video id from any YouTube watch / embed / short link. */
export function youTubeId(url: string): string | undefined {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/,
  );
  return match?.[1];
}

export interface YouTubePlayerHandle {
  /** Current playback position in seconds. */
  getCurrentSecond: () => number;
}

export interface YouTubePlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Full YouTube link (watch, embed, youtu.be or shorts). */
  url: string;
  /** Controlled playback state. The host page keeps only one player playing. */
  playing?: boolean;
  /** Position to resume from, in seconds. */
  startSecond?: number;
  /** Fired roughly once a second while playing. */
  onTimeChange?: (second: number) => void;
  /** Fired once the total length is known. */
  onDuration?: (seconds: number) => void;
  /** Fired when the episode reaches the end. */
  onEnded?: () => void;
  /** Fired when the viewer plays/pauses inside the YouTube UI. */
  onPlayingChange?: (playing: boolean) => void;
  /**
   * Hides the video frame and keeps audio only — an audio-like podcast
   * experience. The surrounding frame still renders the system skin.
   */
  audioOnly?: boolean;
  /** Skeleton placeholder with the same geometry. */
  loading?: boolean;
}

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

const API_SRC = "https://www.youtube.com/iframe_api";
let apiPromise: Promise<void> | undefined;

function loadApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as { YT?: { Player?: unknown }; onYouTubeIframeAPIReady?: () => void };
  if (w.YT?.Player) return Promise.resolve();
  apiPromise ??= new Promise<void>((resolve) => {
    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
  return apiPromise;
}

/**
 * Inline YouTube episode player wrapped in the system frame. Playback is
 * controlled from the host page so only one episode plays at a time; timing
 * callbacks feed per-student listening progress.
 */
export const YouTubePlayer = forwardRef<YouTubePlayerHandle, YouTubePlayerProps>(
  function YouTubePlayer(
    {
      url,
      playing = false,
      startSecond = 0,
      onTimeChange,
      onDuration,
      onEnded,
      onPlayingChange,
      audioOnly = false,
      loading = false,
      className,
      ...props
    },
    ref,
  ) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<YTPlayer | null>(null);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const videoId = youTubeId(url);

    const callbacks = useRef({ onTimeChange, onDuration, onEnded, onPlayingChange });
    callbacks.current = { onTimeChange, onDuration, onEnded, onPlayingChange };

    useImperativeHandle(ref, () => ({
      getCurrentSecond: () => Math.floor(playerRef.current?.getCurrentTime() ?? 0),
    }));

    useEffect(() => {
      if (!videoId || loading) return;
      let cancelled = false;
      setReady(false);
      setFailed(false);

      loadApi().then(() => {
        if (cancelled || !hostRef.current) return;
        const YT = (window as unknown as { YT: { Player: new (...args: unknown[]) => YTPlayer } }).YT;
        playerRef.current = new YT.Player(hostRef.current, {
          videoId,
          playerVars: { playsinline: 1, rel: 0, modestbranding: 1, start: Math.floor(startSecond) },
          events: {
            onReady: () => {
              if (cancelled) return;
              setReady(true);
              const duration = playerRef.current?.getDuration() ?? 0;
              if (duration > 0) callbacks.current.onDuration?.(Math.round(duration));
            },
            onStateChange: (event: { data: number }) => {
              if (event.data === 1) {
                callbacks.current.onPlayingChange?.(true);
                const duration = playerRef.current?.getDuration() ?? 0;
                if (duration > 0) callbacks.current.onDuration?.(Math.round(duration));
              }
              if (event.data === 2) callbacks.current.onPlayingChange?.(false);
              if (event.data === 0) {
                callbacks.current.onPlayingChange?.(false);
                callbacks.current.onEnded?.();
              }
            },
            onError: () => setFailed(true),
          },
        });
      });

      return () => {
        cancelled = true;
        playerRef.current?.destroy();
        playerRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, loading]);

    useEffect(() => {
      if (!ready || failed) return;
      if (playing) playerRef.current?.playVideo();
      else playerRef.current?.pauseVideo();
    }, [playing, ready, failed]);

    useEffect(() => {
      if (!ready || !playing) return;
      const id = window.setInterval(() => {
        const second = playerRef.current?.getCurrentTime();
        if (typeof second === "number") callbacks.current.onTimeChange?.(Math.floor(second));
      }, 1000);
      return () => window.clearInterval(id);
    }, [ready, playing]);

    const seek = useCallback((second: number) => {
      playerRef.current?.seekTo(second, true);
    }, []);
    void seek;

    const frame = "overflow-hidden rounded-panel bg-surface-inverse text-on-inverse";

    if (loading) {
      return (
        <Skeleton
          radius="card"
          aria-busy="true"
          className={cn("aspect-video w-full rounded-panel", className)}
        />
      );
    }

    if (!videoId || failed) {
      return (
        <div
          role="alert"
          className={cn(
            frame,
            "flex aspect-video w-full flex-col items-center justify-center gap-2 px-4 text-center",
            className,
          )}
          {...props}
        >
          <Icon name="warning" size="xl" />
          <span className="text-caption">Це відео недоступне</span>
        </div>
      );
    }

    return (
      <div
        className={cn(
          frame,
          audioOnly ? "flex h-11 w-full items-center justify-center" : "aspect-video w-full",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            audioOnly ? "size-0 overflow-hidden opacity-0" : "size-full",
          )}
        >
          <div ref={hostRef} className="size-full" />
        </div>
        {audioOnly && (
          <span className="flex items-center gap-2 text-caption">
            <Icon name="headphones" size="md" />
            {playing ? "Відтворення" : "Пауза"}
          </span>
        )}
      </div>
    );
  },
);
