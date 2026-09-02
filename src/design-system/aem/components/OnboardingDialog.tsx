import { useState } from "react";
import { Root } from "@radix-ui/react-dialog";
import { MediaDialog, type MediaDialogMedia, type MediaDialogProps } from "./MediaDialog";
import type { IconName } from "./Icon";

export interface OnboardingStep {
  title: string;
  description?: string;
  media?: MediaDialogMedia;
  mediaAspect?: MediaDialogProps["mediaAspect"];
  icon?: IconName;
  /** Extra content (form fields, checklist) rendered under the description. */
  content?: React.ReactNode;
  /** Overrides the default «Далі» / «Почати» label. */
  nextLabel?: string;
  /** Blocks the primary action (e.g. required field is empty). */
  nextDisabled?: boolean;
  /** Spinner on the primary action while the step is being submitted. */
  nextLoading?: boolean;
  /**
   * Runs before advancing. Return (or resolve to) `false` to stay on the step —
   * used for per-step validation.
   */
  onNext?: () => void | boolean | Promise<void | boolean>;
}

export interface OnboardingDialogProps {
  open: boolean;
  steps: OnboardingStep[];
  /** Called after the last step's primary action. */
  onFinish?: () => void;
  /** Called when the user skips or closes; omit to make the flow blocking. */
  onSkip?: () => void;
  skipLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  finishLabel?: string;
  size?: MediaDialogProps["size"];
  align?: MediaDialogProps["align"];
}

/**
 * Multi-step onboarding / welcome flow built on `MediaDialog`: media or accent
 * icon per step, progress dots, back / next / skip. Blocking when `onSkip`
 * is omitted (no close control, Esc and overlay clicks are ignored).
 */
export function OnboardingDialog({
  open,
  steps,
  onFinish,
  onSkip,
  skipLabel = "Пропустити",
  backLabel = "Назад",
  nextLabel = "Далі",
  finishLabel = "Почати",
  size = "sm",
  align = "center",
}: OnboardingDialogProps) {
  const [index, setIndex] = useState(0);
  const step = steps[Math.min(index, steps.length - 1)];
  if (!step) return null;

  const isLast = index === steps.length - 1;

  return (
    <Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onSkip?.();
      }}
    >
      <MediaDialog
        title={step.title}
        description={step.description}
        media={step.media}
        mediaAspect={step.mediaAspect}
        icon={step.icon}
        size={size}
        align={align}
        dismissible={Boolean(onSkip)}
        step={steps.length > 1 ? { current: index + 1, total: steps.length } : undefined}
        primaryAction={{
          label: step.nextLabel ?? (isLast ? finishLabel : nextLabel),
          keepOpen: !isLast,
          disabled: step.nextDisabled,
          loading: step.nextLoading,
          onClick: async () => {
            if (step.onNext) {
              const ok = await step.onNext();
              if (ok === false) return false;
            }
            if (isLast) {
              onFinish?.();
              return;
            }
            setIndex((i) => i + 1);
          },
        }}
        secondaryAction={
          index > 0
            ? { label: backLabel, keepOpen: true, onClick: () => setIndex((i) => i - 1) }
            : undefined
        }
        tertiaryAction={onSkip && !isLast ? { label: skipLabel, onClick: onSkip } : undefined}
      >
        {step.content}
      </MediaDialog>
    </Root>
  );
}
