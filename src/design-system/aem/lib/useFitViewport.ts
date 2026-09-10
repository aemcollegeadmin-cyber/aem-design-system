import { useEffect, useRef } from "react";

/**
 * Fixes an element's height so its bottom edge always sits `bottomGap` px
 * above the viewport bottom — wherever the element is placed on the page
 * (under any header) and on any screen size.
 *
 * The measurement is deliberately scroll-INDEPENDENT: it uses the element's
 * position in the DOCUMENT (rect.top + scrollY) instead of its current
 * position in the viewport, and clamps the result to the viewport height
 * minus the sticky offset. Measuring viewport-relative made the panel
 * unstable — a measurement taken while the page was scrolled produced a
 * panel taller than the screen, which then ran past the bottom edge.
 *
 * Re-measures on viewport changes AND on layout shifts (fonts, images,
 * content above the panel growing), never on page scroll.
 *
 * Desktop-only (lg+): on mobile the panel is in normal flow.
 */
export function useFitViewport<T extends HTMLElement>(
  enabled: boolean,
  bottomGap = 16,
  stickyTop = 16,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const apply = () => {
      if (!mq.matches) {
        el.style.height = "";
        el.style.maxHeight = "";
        return;
      }
      // Clear first so a previously applied height cannot bias the measurement.
      el.style.height = "";
      el.style.maxHeight = "";
      const documentTop = el.getBoundingClientRect().top + window.scrollY;
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      const fromTop = viewport - documentTop - bottomGap;
      const whenSticky = viewport - stickyTop - bottomGap;
      const height = `${Math.max(0, Math.round(Math.min(fromTop, whenSticky)))}px`;
      el.style.height = height;
      el.style.maxHeight = height;
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    update();

    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    window.visualViewport?.addEventListener("resize", update);
    mq.addEventListener?.("change", update);
    document.fonts?.ready?.then(update).catch(() => {});

    // Layout shifts above/around the panel (content loading, headers growing).
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    if (el.parentElement) ro.observe(el.parentElement);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
      window.visualViewport?.removeEventListener("resize", update);
      mq.removeEventListener?.("change", update);
      el.style.height = "";
      el.style.maxHeight = "";
    };
  }, [enabled, bottomGap, stickyTop]);

  return ref;
}
