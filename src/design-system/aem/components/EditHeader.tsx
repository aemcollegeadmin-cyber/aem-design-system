import { forwardRef } from "react";
import { PageNav } from "./PageNav";
import { type BreadcrumbItem } from "./Breadcrumbs";
import { cn } from "../lib/cn";

export interface EditHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Current title value of the inline title field. */
  title: string;
  /** Called with the new title on every keystroke. */
  onTitleChange: (value: string) => void;
  /** Placeholder for the inline title field. */
  titlePlaceholder?: string;
  /** Accessible name of the inline title field. */
  titleLabel?: string;
  /** Disables editing (read-only edit header). */
  titleDisabled?: boolean;
  /** Breadcrumb trail rendered under the title. */
  breadcrumbs?: BreadcrumbItem[];
  /** Status badge rendered at the end of the breadcrumb row. */
  status?: React.ReactNode;
  /** Navigation target for the back control — renders an anchor. */
  backHref?: string;
  /** Click handler for the back control — renders a button. */
  onBack?: () => void;
  /** Accessible name of the back control. */
  backLabel?: string;
  /** Edit-mode toggles (Switch, Tabs) rendered next to the actions. */
  controls?: React.ReactNode;
  /** Trailing actions (save / cancel) rendered on the far right. */
  actions?: React.ReactNode;
}

/**
 * Page header for edit mode: an inline title input in place of the H1, plus a
 * slot for edit toggles. Composes `PageNav` so back control, breadcrumbs and
 * status stay identical to view mode.
 */
export const EditHeader = forwardRef<HTMLElement, EditHeaderProps>(function EditHeader(
  {
    title,
    onTitleChange,
    titlePlaceholder = "Без назви",
    titleLabel = "Назва",
    titleDisabled,
    controls,
    actions,
    className,
    ...props
  },
  ref,
) {
  return (
    <PageNav
      ref={ref}
      className={className}
      titleSlot={
        <input
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={titlePlaceholder}
          aria-label={titleLabel}
          disabled={titleDisabled}
          data-aem-input-control
          className={cn(
            "min-w-0 flex-1 truncate rounded-field border-2 border-transparent bg-transparent px-3 py-1 -mx-3",
            "text-h2 text-ink placeholder:text-ink-muted transition-colors",
            "hover:border-border-strong focus:border-ink focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        />
      }
      actions={
        controls || actions ? (
          <div className="flex flex-wrap items-center gap-3">
            {controls}
            {actions}
          </div>
        ) : undefined
      }
      {...props}
    />
  );
});
