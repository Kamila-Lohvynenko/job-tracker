import { CSSProperties } from "react";

import { EApplicationEventStatus } from "@/shared/rest-api/interface";

const STATUS_BG_OPACITY = 12;
const STATUS_CLOSE_HOVER_BG_OPACITY = 24;

interface IProps {
  status: EApplicationEventStatus;
  variant: "bordered" | "primary" | "light";
}

export function useEventStatusChipService(props: IProps) {
  const { status, variant } = props;

  const getStatusBackgroundColor = () => {
    switch (status) {
      case EApplicationEventStatus.SCHEDULED:
        return "var(--application-event-status-scheduled)";
      case EApplicationEventStatus.COMPLETED:
        return "var(--application-event-status-completed)";
      case EApplicationEventStatus.CANCELLED:
        return "var(--application-event-status-cancelled)";
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case EApplicationEventStatus.SCHEDULED:
        return "var(--application-event-status-scheduled-text)";
      case EApplicationEventStatus.COMPLETED:
        return "var(--application-event-status-completed-text)";
      case EApplicationEventStatus.CANCELLED:
        return "var(--application-event-status-cancelled-text)";
    }
  };

  const getStatusBackgroundWithOpacity = (
    backgroundColor: string,
    opacity = STATUS_BG_OPACITY,
  ) => `color-mix(in srgb, ${backgroundColor} ${opacity}%, transparent)`;

  const getStatusCloseButtonHoverBackground = () =>
    getStatusBackgroundWithOpacity(
      getStatusBackgroundColor(),
      STATUS_CLOSE_HOVER_BG_OPACITY,
    );

  const getStatusVariant = () => {
    switch (variant) {
      case "bordered":
      case "light":
        return "tertiary" as const;
      default:
        return variant;
    }
  };

  const getStatusChipStyles = (isBg = true): CSSProperties => {
    const textColor = getStatusTextColor();
    const backgroundColor = isBg
      ? getStatusBackgroundWithOpacity(getStatusBackgroundColor())
      : "transparent";

    if (variant === "bordered") {
      return {
        color: textColor,
        backgroundColor,
        border: `1px solid ${textColor}`,
      };
    }

    if (variant === "light") {
      return {
        color: "var(--foreground)",
        backgroundColor: "transparent",
        border: "none",
      };
    }

    return {
      color: textColor,
      backgroundColor,
      border: "none",
    };
  };

  return {
    getStatusTextColor,
    getStatusVariant,
    getStatusChipStyles,
    getStatusCloseButtonHoverBackground,
  };
}
