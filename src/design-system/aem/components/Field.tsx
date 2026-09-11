import { forwardRef, useId } from "react";
import { Label } from "./Label";
import { cn } from "../lib/cn";

export interface FieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** Stretch to fill the available height of a flex parent. */
  fill?: boolean;
  /** Receives the generated id and describedby wiring for the control. */
  children: (control: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode;
}

/** Label + control + hint/error wrapper that wires up accessible descriptions. */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, hint, error, required, children, fill = false, className, ...props },
  ref,
) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5", fill && "min-h-0 flex-1", className)}
      {...props}
    >
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children({
        id,
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        ...(error ? { "aria-invalid": true } : {}),
      })}
      {hint && !error && (
        <span id={hintId} className="text-caption text-ink-muted">
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="text-caption text-danger-fg">
          {error}
        </span>
      )}
    </div>
  );
});