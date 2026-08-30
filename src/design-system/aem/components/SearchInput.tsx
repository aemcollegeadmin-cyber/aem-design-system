import { forwardRef, useRef, useState, useCallback } from "react";
import { Icon } from "./Icon";
import { Input, type InputProps } from "./Input";
import { cn } from "../lib/cn";

export interface SearchInputProps extends Omit<InputProps, "type"> {
  /** Accessible label for the clear button. */
  clearLabel?: string;
}

/** Search field with a leading magnifier and a system-icon clear button. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, placeholder = "Пошук", value: valueProp, defaultValue, onChange, clearLabel = "Очистити", ...props },
  forwardedRef,
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ""));
  const value = isControlled ? String(valueProp) : internalValue;
  const hasValue = value.length > 0;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback(() => {
    const input = internalRef.current;
    if (!input) return;

    // Programmatically clear the value and dispatch an input event so form bindings react.
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
    nativeInputValueSetter?.call(input, "");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.focus();
  }, []);

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 left-1.5 inline-flex size-8 items-center justify-center rounded-pill bg-surface-muted text-ink-muted"
      >
        <Icon name="search" size="sm" />
      </span>

      <Input
        ref={setRefs}
        type="search"
        placeholder={placeholder}
        className="pl-12 pr-12"
        value={valueProp}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />

      <span data-debug-value={value} className="sr-only">debug</span>
      {hasValue && (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={handleClear}
          className="absolute top-1.5 right-1.5 inline-flex size-8 items-center justify-center rounded-pill bg-surface-muted text-ink-muted transition-colors hover:bg-border-subtle hover:text-ink"
        >
          <Icon name="close" size="sm" aria-hidden="true" />
        </button>
      )}
    </div>
  );
});
