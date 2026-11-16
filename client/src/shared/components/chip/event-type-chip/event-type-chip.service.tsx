import { CSSProperties } from "react";

import { APPLICATION_EVENT_CONFIG } from "@/module/application/constant";
import { EApplicationEventType } from "@/shared/rest-api/interface";

const STATUS_BG_OPACITY = 12;
const STATUS_CLOSE_HOVER_BG_OPACITY = 24;

interface IProps {
  type: EApplicationEventType;
  variant: "bordered" | "primary" | "light";
}

export function useEventTypeChipService(props: IProps) {
  const { type, variant } = props;
  const config = APPLICATION_EVENT_CONFIG[type];

  const getTypeBackgroundWithOpacity = (
    backgroundColor: string,
    opacity = STATUS_BG_OPACITY,
  ) => `color-mix(in srgb, ${backgroundColor} ${opacity}%, transparent)`;

  const getTypeCloseButtonHoverBackground = () =>
    getTypeBackgroundWithOpacity(config.color, STATUS_CLOSE_HOVER_BG_OPACITY);

  const getTypeVariant = () => {
    switch (variant) {
      case "bordered":
      case "light":
        return "tertiary" as const;
      default:
        return variant;
    }
  };

  const getTypeChipStyles = (isBg = true): CSSProperties => {
    const backgroundColor = isBg ? config.backgroundColor : "transparent";

    if (variant === "bordered") {
      return {
        color: config.textColor,
        backgroundColor,
        border: `1px solid ${config.textColor}`,
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
      color: config.textColor,
      backgroundColor,
      border: "none",
    };
  };

  return {
    config,
    getTypeVariant,
    getTypeChipStyles,
    getTypeCloseButtonHoverBackground,
  };
}
