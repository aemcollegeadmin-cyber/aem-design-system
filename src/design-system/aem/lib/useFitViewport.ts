import { useEffect, useRef } from "react";

/**
 * Fixes an element's height so its bottom edge always sits `bottomGap` px
 * above the viewport bottom — wherever the element is placed on the page
 * (under any header) and on any screen size. Re-measures when the viewport
 * changes, while keeping page scroll from changing or stretching the panel.
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
        el.style.height = "";
        el.style.maxHeight = "";
        return;
      }
      const top = el.getBoundingClientRect().top;
      const available = window.innerHeight - top - bottomGap;
      const height = `${Math.max(0, Math.round(available))}px`;
      el.style.height = height;
      el.style.maxHeight = height;
    };

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    mq.addEventListener?.("change", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      mq.removeEventListener?.("change", update);
      el.style.height = "";
      el.style.maxHeight = "";
    };
  }, [enabled, bottomGap]);

  return ref;
}
