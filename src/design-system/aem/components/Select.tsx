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
import { Icon as AemIcon } from "./Icon";
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
        data-aem-input-control
        ref={ref}
        id={id}
        aria-label={triggerLabel}
        className={cn(
          "inline-flex h-11 w-full items-center justify-between gap-2 rounded-pill border-2 border-border-strong bg-surface pr-1.5 pl-4 text-body text-ink transition-colors hover:border-ink focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-ink-muted data-[state=open]:border-ink",
          className,
        )}
      >
        <Value placeholder={placeholder} />
        <Icon asChild>
          <AemIcon name="chevronDown" size="md" className="text-ink-muted" />
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
                  <AemIcon name="check" size="md" />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
});