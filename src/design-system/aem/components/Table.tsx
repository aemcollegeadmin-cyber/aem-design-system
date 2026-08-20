import { forwardRef } from "react";
import { cn } from "../lib/cn";

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

/** Data table root. Wrap in a `Card` for the elevated surface. */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, ...props },
  ref,
) {
  return (
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={cn("w-full border-collapse text-body text-ink", className)} {...props} />
    </div>
  );
});

export interface TableSectionProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn("text-caption text-ink-muted", className)} {...props} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={className} {...props} />;
  },
);

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return <tr ref={ref} className={cn("border-b border-border-subtle last:border-0", className)} {...props} />;
});

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = "col", ...props },
  ref,
) {
  return <th ref={ref} scope={scope} className={cn("px-4 py-3 text-left font-medium", className)} {...props} />;
});

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return <td ref={ref} className={cn("px-4 py-3 align-middle", className)} {...props} />;
});