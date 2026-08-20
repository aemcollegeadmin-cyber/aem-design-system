import { forwardRef } from "react";
import { Dialog, DialogClose, type DialogProps } from "./Dialog";
import { Button } from "./Button";

export interface ConfirmDialogProps extends Omit<DialogProps, "footer" | "children"> {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  /** Extra content shown above the actions. */
  children?: React.ReactNode;
}

/** Destructive/irreversible action confirmation built on `Dialog`. */
export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  function ConfirmDialog(
    { confirmLabel = "Підтвердити", cancelLabel = "Скасувати", onConfirm, children, ...props },
    ref,
  ) {
    return (
      <Dialog
        ref={ref}
        size="sm"
        footer={
          <>
            <DialogClose asChild>
              <Button variant="ghost">{cancelLabel}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="primary" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </DialogClose>
          </>
        }
        {...props}
      >
        {children}
      </Dialog>
    );
  },
);