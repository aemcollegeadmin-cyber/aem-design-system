import { forwardRef } from "react";
import { Search } from "lucide-react";
import { Input, type InputProps } from "./Input";
import { cn } from "../lib/cn";

export interface SearchInputProps extends Omit<InputProps, "type"> {}

/** Search field with a leading magnifier in a circular shape. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, placeholder = "Пошук", ...props },
  ref,
) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 left-1.5 inline-flex size-8 items-center justify-center rounded-pill bg-surface-muted text-ink-muted"
      >
        <Search className="size-4" />
      </span>
      <Input ref={ref} type="search" placeholder={placeholder} className="pl-12" {...props} />
    </div>
  );
});
