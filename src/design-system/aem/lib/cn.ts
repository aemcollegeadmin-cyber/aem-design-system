import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The theme adds a named font-size scale (text-h1 … text-caption). Without this
// registration tailwind-merge classifies those as text *colors* and silently
// drops the real color class from the same call.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "h4", "body", "caption"] }],
    },
  },
});

/** Merge conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
