import { CSSProperties, FC } from "react";

import { Chip, cn } from "@heroui/react";

import { eventTypeLabelMap } from "@/shared/constant";
import { EApplicationEventType } from "@/shared/rest-api/interface";
import { XIcon } from "lucide-react";
import { useEventTypeChipService } from "./event-type-chip.service";

interface IProps {
  variant?: "bordered" | "primary" | "light";
  type: EApplicationEventType;
  radius?: "sm" | "md" | "lg";
  isClickable?: boolean;
  isBg?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  isCloseable?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const EventTypeChipComponent: FC<Readonly<IProps>> = (props) => {
  const {
    type,
    isClickable,
    isBg = true,
    size = "lg",
    className = "",
    variant = "primary",
    isCloseable = false,
    isDisabled = false,
    onClick,
    onClose,
  } = props;

  const thisService = useEventTypeChipService({ type, variant });
  const { Icon, color } = thisService.config;

  return (
    <Chip
      onClick={onClick}
      variant={thisService.getTypeVariant()}
      size={size}
      style={thisService.getTypeChipStyles(isBg)}
      className={cn(
        "flex w-fit gap-1 text-tiny capitalize transition-background",
        className,
        {
          "px-2": variant === "bordered",
          "cursor-pointer hover:bg-divider hover:bg-opacity-25": isClickable,
          "pointer-events-none opacity-50": isDisabled,
          "gap-2 px-0": variant === "light",
        },
      )}
    >
      <Icon className="size-3.5 shrink-0" style={{ color }} />

      {eventTypeLabelMap[type]()}

      {isCloseable && (
        <button
          type="button"
          aria-label="Remove"
          style={
            {
              "--status-close-hover-bg":
                thisService.getTypeCloseButtonHoverBackground(),
            } as CSSProperties
          }
          className={cn(
            "flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors",
            "hover:bg-(--status-close-hover-bg)",
          )}
          onClick={(event) => {
            event.stopPropagation();
            onClose?.();
          }}
        >
          <XIcon width={12} />
        </button>
      )}
    </Chip>
  );
};

export default EventTypeChipComponent;
