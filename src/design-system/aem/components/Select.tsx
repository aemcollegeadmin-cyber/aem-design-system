import { forwardRef } from "react";
import {
  Content,
  Icon,
  Item,
  ItemIndicator,
  ItemText,
  Portal,
  Root,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

export const SelectRoot = Root;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}


export interface SelectProps extends React.ComponentPropsWithoutRef<typeof Root> {
  options: SelectOption[];
  placeholder?: string;
  /** Accessible name when no visible `Label` is bound to the trigger. */
  triggerLabel?: string;
  className?: string;
  id?: string;
}

/** Token-styled single select built on a listbox primitive. */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { options, placeholder = "Виберіть", triggerLabel, className, id, ...props },
  ref,
) {
  return (
    <Root {...props}>
      <Trigger
        ref={ref}
        id={id}
        aria-label={triggerLabel}
        className={cn(
          "inline-flex h-11 w-full items-center justify-between gap-2 rounded-field bg-surface px-4 text-body text-ink shadow-card disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-ink-muted",
          className,
        )}
      >
        <Value placeholder={placeholder} />
        <Icon>
          <ChevronDown className="size-4 text-ink-muted" />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          position="popper"
          sideOffset={6}
          className="z-50 min-w-[12rem] overflow-hidden rounded-card bg-surface p-1 shadow-overlay"
        >
          <Viewport>
            {options.map((option) => (
              <Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-field px-3 py-2 text-body text-ink outline-hidden select-none data-[disabled]:opacity-50 data-[highlighted]:bg-surface-muted"
              >
                <ItemText>{option.label}</ItemText>
                <ItemIndicator>
                  <Check className="size-4" />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
});