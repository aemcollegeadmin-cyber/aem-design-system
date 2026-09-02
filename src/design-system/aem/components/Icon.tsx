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

export type IconName = keyof typeof icons;

/** Icon scale. Only two sizes so the 2px stroke stays proportional. */
export const iconSizes = { lg: 24, xl: 32 } as const;

export type IconSize = keyof typeof iconSizes;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /** Semantic icon name from the system registry. */
  name: IconName;
  /** lg 24px, xl 32px. */
  size?: IconSize;
  /** Accessible name. Omit for purely decorative icons. */
  label?: string;
}

/**
 * The single way to render an icon in this system: simple outline glyphs with a
 * constant 2px stroke at every size.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = "lg", label, className, ...props },
  ref,
) {
  const Glyph = icons[name];
  const px = iconSizes[size];
  return (
    <Glyph
      ref={ref}
      width={px}
      height={px}
      strokeWidth={2}
      absoluteStrokeWidth
      data-aem-icon={name}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
});
