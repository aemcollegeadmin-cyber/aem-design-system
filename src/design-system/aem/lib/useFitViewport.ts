import { useEffect, useRef } from "react";

/**
 * Caps an element's height so its bottom edge always sits `bottomGap` px
 * above the viewport bottom — wherever the element is placed on the page
 * (under any header) and on any screen size. Re-measures on resize/scroll,
 * so the panel "breathes" with the viewport instead of overflowing it.
 *
 * Desktop-only (lg+): on mobile the panel is in normal flow.
 */
export function useFitViewport<T extends HTMLElement>(enabled: boolean, bottomGap = 16) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      if (!mq.matches) {
        el.style.maxHeight = "";
        return;
      }
      const top = el.getBoundingClientRect().top;
      const available = window.innerHeight - top - bottomGap;
      el.style.maxHeight = `${Math.max(240, Math.round(available))}px`;
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    mq.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
      mq.removeEventListener?.("change", update);
      el.style.maxHeight = "";
    };
  }, [enabled, bottomGap]);

  return ref;
}
