import { forwardRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "./IconButton";
import { cn } from "../lib/cn";

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  label?: string;
  prevLabel?: string;
  nextLabel?: string;
}

/** Compact page stepper for tables and lists. */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page,
    pageCount,
    onPageChange,
    label = "Навігація сторінками",
    prevLabel = "Попередня сторінка",
    nextLabel = "Наступна сторінка",
    className,
    ...props
  },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label={label}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      <IconButton
        label={prevLabel}
        variant="muted"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        <ChevronLeft className="size-4" />
      </IconButton>
      <span className="text-caption text-ink-muted">
        {page} / {pageCount}
      </span>
      <IconButton
        label={nextLabel}
        variant="muted"
        size="sm"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
      >
        <ChevronRight className="size-4" />
      </IconButton>
    </nav>
  );
});