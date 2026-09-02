import { forwardRef } from "react";
import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

export const AccordionRoot = Root;

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Item> {
  title: string;
}

/** Collapsible section. Wrap items in `AccordionRoot`. */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem({ title, className, children, ...props }, ref) {
    return (
      <Item
        ref={ref}
        className={cn("overflow-hidden rounded-card bg-surface shadow-card", className)}
        {...props}
      >
        <Header>
          <Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-body text-ink">
            {title}
            <ChevronDown className="size-4 shrink-0 text-ink-muted transition-transform group-data-[state=open]:rotate-180" />
          </Trigger>
        </Header>
        <Content className="px-4 pb-4 text-caption text-ink-soft">{children}</Content>
      </Item>
    );
  },
);