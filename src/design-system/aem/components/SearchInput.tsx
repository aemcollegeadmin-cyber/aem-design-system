import { forwardRef } from "react";
import { Search } from "lucide-react";
import { Input, type InputProps } from "./Input";
import { cn } from "../lib/cn";

export interface SearchInputProps extends Omit<InputProps, "type"> {}

/** Search field with a leading magnifier. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { className, radius = "pill", placeholder = "Пошук", ...props },
  ref,
) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted" />
      <Input ref={ref} type="search" radius={radius} placeholder={placeholder} className="pl-11" {...props} />
    </div>
  );
});