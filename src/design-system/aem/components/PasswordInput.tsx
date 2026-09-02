import { forwardRef, useState } from "react";
import { Input, type InputProps } from "./Input";
import { IconButton } from "./IconButton";
import { Icon } from "./Icon";
import { cn } from "../lib/cn";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  showLabel?: string;
  hideLabel?: string;
}

/** Password field with a reveal toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { className, showLabel = "Показати пароль", hideLabel = "Сховати пароль", ...props },
    ref,
  ) {
    const [visible, setVisible] = useState(false);
    return (
      <div className={cn("relative", className)}>
        <Input ref={ref} type={visible ? "text" : "password"} className="pr-12" {...props} />
        <IconButton
          label={visible ? hideLabel : showLabel}
          variant="muted"
          size="sm"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-1.5 -translate-y-1/2"
        >
          <Icon name={visible ? "hide" : "show"} size="md" />
        </IconButton>
      </div>
    );
  },
);