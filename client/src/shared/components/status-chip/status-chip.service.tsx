import { CSSProperties } from "react";

import * as m from "@/paraglide/messages";
import { EApplicationStatus } from "@/shared/rest-api/interface";

const STATUS_BG_OPACITY = 12;
const STATUS_CLOSE_HOVER_BG_OPACITY = 24;

export const statusLabelMap: Record<EApplicationStatus, () => string> = {
  [EApplicationStatus.WISHLIST]: m.status_label_WISHLIST,
  [EApplicationStatus.APPLIED]: m.status_label_APPLIED,
  [EApplicationStatus.HR_SCREEN]: m.status_label_HR_SCREEN,
  [EApplicationStatus.INTERVIEW]: m.status_label_INTERVIEW,
  [EApplicationStatus.TECHNICAL]: m.status_label_TECHNICAL,
  [EApplicationStatus.TAKE_HOME]: m.status_label_TAKE_HOME,
  [EApplicationStatus.FINAL]: m.status_label_FINAL,
  [EApplicationStatus.OFFER]: m.status_label_OFFER,
  [EApplicationStatus.REJECTED]: m.status_label_REJECTED,
  [EApplicationStatus.WITHDRAWN]: m.status_label_WITHDRAWN,
  [EApplicationStatus.ARCHIVED]: m.status_label_ARCHIVED,
};

// interface
interface IProps {
  status: EApplicationStatus;
  variant: "bordered" | "primary" | "light";
}

// service
export function useStatusChipService(props: IProps) {
  const { status, variant } = props;

  const getStatusBackgroundColor = () => {
    switch (status) {
      case EApplicationStatus.WISHLIST:
        return "var(--application-status-wishlist)";
      case EApplicationStatus.APPLIED:
        return "var(--application-status-applied)";
      case EApplicationStatus.HR_SCREEN:
        return "var(--application-status-hr-screen)";
      case EApplicationStatus.INTERVIEW:
        return "var(--application-status-interview)";
      case EApplicationStatus.TECHNICAL:
        return "var(--application-status-technical)";
      case EApplicationStatus.TAKE_HOME:
        return "var(--application-status-take-home)";
      case EApplicationStatus.FINAL:
        return "var(--application-status-final)";
      case EApplicationStatus.OFFER:
        return "var(--application-status-offer)";
      case EApplicationStatus.REJECTED:
        return "var(--application-status-rejected)";
      case EApplicationStatus.WITHDRAWN:
        return "var(--application-status-withdrawn)";
      case EApplicationStatus.ARCHIVED:
        return "var(--application-status-withdrawn)";
      default:
        return "var(--application-status-rejected)";
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case EApplicationStatus.WISHLIST:
        return "var(--application-status-wishlist-text)";
      case EApplicationStatus.APPLIED:
        return "var(--application-status-applied-text)";
      case EApplicationStatus.HR_SCREEN:
        return "var(--application-status-hr-screen-text)";
      case EApplicationStatus.INTERVIEW:
        return "var(--application-status-interview-text)";
      case EApplicationStatus.TECHNICAL:
        return "var(--application-status-technical-text)";
      case EApplicationStatus.TAKE_HOME:
        return "var(--application-status-take-home-text)";
      case EApplicationStatus.FINAL:
        return "var(--application-status-final-text)";
      case EApplicationStatus.OFFER:
        return "var(--application-status-offer-text)";
      case EApplicationStatus.REJECTED:
        return "var(--application-status-rejected-text)";
      case EApplicationStatus.WITHDRAWN:
        return "var(--application-status-withdrawn-text)";
      case EApplicationStatus.ARCHIVED:
        return "var(--application-status-withdrawn-text)";
      default:
        return "var(--application-status-rejected-text)";
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
        return "tertiary";
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
    getStatusBackgroundColor,
    getStatusTextColor,
    getStatusVariant,
    getStatusChipStyles,
    getStatusCloseButtonHoverBackground,
  };
}
