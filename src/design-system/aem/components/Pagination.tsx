import { forwardRef } from "react";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
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
        size="md"
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
      >
        <Icon name="chevronLeft" size="md" />
      </IconButton>
      <span className="text-caption text-ink-muted">
        {page} / {pageCount}
      </span>
      <IconButton
        label={nextLabel}
        variant="muted"
        size="md"
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
      >
        <Icon name="chevronRight" size="md" />
      </IconButton>
    </nav>
  );
});