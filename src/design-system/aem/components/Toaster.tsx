import { Toaster as SonnerToaster, toast } from "sonner";

export { toast };

export interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {}

/** Toast host, mounted once at the app root. Styled with AEM tokens. */
export function Toaster({ position = "bottom-right", ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      toastOptions={{
        classNames: {
          toast: "rounded-card bg-surface text-ink shadow-overlay text-body",
          description: "text-caption text-ink-muted",
          actionButton: "rounded-pill bg-ink text-surface text-caption",
          cancelButton: "rounded-pill bg-surface-muted text-ink text-caption",
          success: "bg-success text-success-fg",
          error: "bg-danger text-danger-fg",
          warning: "bg-warning text-warning-fg",
          info: "bg-info text-info-fg",
        },
      }}
      {...props}
    />
  );
}