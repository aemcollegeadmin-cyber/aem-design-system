import { forwardRef } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Bookmark,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  Ellipsis,
  ExternalLink,
  File,
  Folder,
  Info,
  LayoutGrid,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Pencil,
  Play,
  Plus,
  Search,
  Settings,
  SquareCheck,
  Star,
  Trash,
  User,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import * as Ph from "@phosphor-icons/react";
import { cn } from "../lib/cn";


/**
 * Curated icon registry. Every entry is a geometrically simple outline glyph
 * (single shape, no small internal details) so icons stay legible at 16px and
 * never add visual noise. Add new semantic names here instead of importing
 * lucide icons directly in product code.
 */
export const icons = {
  /* Navigation */
  home: LayoutGrid,
  menu: Menu,
  more: Ellipsis,
  back: ArrowLeft,
  forward: ArrowRight,
  up: ArrowUp,
  down: ArrowDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  external: ExternalLink,
  close: X,
  logout: LogOut,

  /* Learning */
  course: Folder,
  module: Folder,
  lesson: File,
  document: File,
  review: SquareCheck,
  bookmark: Bookmark,
  star: Star,

  /* People & communication */
  user: User,
  users: Users,
  chat: MessageCircle,
  mail: Mail,
  bell: Bell,

  /* Actions */
  add: Plus,
  remove: Minus,
  edit: Pencil,
  delete: Trash,
  copy: Copy,
  search: Search,
  settings: Settings,
  send: ArrowUp,
  play: Play,

  /* Status */
  check: Check,
  done: CircleCheck,
  alert: CircleAlert,
  info: Info,
  dot: Circle,
  clock: Clock,
  calendar: Calendar,
} satisfies Record<string, LucideIcon>;

/**
 * Solid counterparts used for the small sizes (sm/md), where a 2px outline
 * stroke is visually too heavy. Same semantic names as `icons`.
 */
export const filledIcons = {
  home: Ph.SquaresFour,
  menu: Ph.List,
  more: Ph.DotsThree,
  back: Ph.ArrowLeft,
  forward: Ph.ArrowRight,
  up: Ph.ArrowUp,
  down: Ph.ArrowDown,
  chevronLeft: Ph.CaretLeft,
  chevronRight: Ph.CaretRight,
  chevronUp: Ph.CaretUp,
  chevronDown: Ph.CaretDown,
  external: Ph.ArrowSquareOut,
  close: Ph.X,
  logout: Ph.SignOut,

  course: Ph.Folder,
  module: Ph.Folder,
  lesson: Ph.File,
  document: Ph.File,
  review: Ph.CheckSquare,
  bookmark: Ph.BookmarkSimple,
  star: Ph.Star,

  user: Ph.User,
  users: Ph.Users,
  chat: Ph.ChatCircle,
  mail: Ph.Envelope,
  bell: Ph.Bell,

  add: Ph.Plus,
  remove: Ph.Minus,
  edit: Ph.PencilSimple,
  delete: Ph.Trash,
  copy: Ph.Copy,
  search: Ph.MagnifyingGlass,
  settings: Ph.Gear,
  send: Ph.ArrowUp,
  play: Ph.Play,

  check: Ph.Check,
  done: Ph.CheckCircle,
  alert: Ph.WarningCircle,
  info: Ph.Info,
  dot: Ph.Circle,
  clock: Ph.Clock,
  calendar: Ph.CalendarBlank,
} satisfies Record<keyof typeof icons, Ph.Icon>;


export type IconName = keyof typeof icons;

/**
 * Icon scale.
 * - `sm` (16) and `md` (20) render FILLED glyphs — a 2px stroke is far too
 *   heavy at those sizes, so small icons are solid shapes instead.
 * - `lg` (24) and `xl` (32) render outline glyphs with a constant 2px stroke.
 */
export const iconSizes = { sm: 16, md: 20, lg: 24, xl: 32 } as const;

export type IconSize = keyof typeof iconSizes;

/** Sizes rendered as solid glyphs. */
const filledSizes: IconSize[] = ["sm", "md"];

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /** Semantic icon name from the system registry. */
  name: IconName;
  /** sm 16px & md 20px are filled; lg 24px & xl 32px are 2px outline. */
  size?: IconSize;
  /** Accessible name. Omit for purely decorative icons. */
  label?: string;
}

/**
 * The single way to render an icon in this system: solid glyphs at sm/md,
 * simple outline glyphs with a constant 2px stroke at lg/xl.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = "lg", label, className, ...props },
  ref,
) {
  const px = iconSizes[size];
  const filled = filledSizes.includes(size);
  const a11y = {
    "data-aem-icon": name,
    "aria-hidden": label ? undefined : true,
    "aria-label": label,
    role: label ? ("img" as const) : undefined,
    className: cn("shrink-0", className),
  };

  if (filled) {
    const Solid = filledIcons[name];
    return (
      <Solid
        ref={ref}
        size={px}
        weight={strokeOnlyGlyphs.has(name) ? "bold" : "fill"}
        {...a11y}
        {...(props as Record<string, unknown>)}
      />
    );
  }

  const Glyph = icons[name];
  return (
    <Glyph
      ref={ref}
      width={px}
      height={px}
      strokeWidth={2}
      absoluteStrokeWidth
      {...a11y}
      {...props}
    />
  );
});

