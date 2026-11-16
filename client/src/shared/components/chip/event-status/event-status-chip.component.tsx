import { CSSProperties, FC } from "react";

import { Chip, cn } from "@heroui/react";

import { eventStatusLabelMap } from "@/shared/constant";
import { EApplicationEventStatus } from "@/shared/rest-api/interface";
import { CircleFill } from "@gravity-ui/icons";
import { XIcon } from "lucide-react";
import { useEventStatusChipService } from "./event-status-chip.service";

interface IProps {
  variant?: "bordered" | "primary" | "light";
  status: EApplicationEventStatus;
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

const EventStatusChipComponent: FC<Readonly<IProps>> = (props) => {
  const {
    status,
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

  const thisService = useEventStatusChipService({ status, variant });

  return (
    <Chip
      onClick={onClick}
      variant={thisService.getStatusVariant()}
      size={size}
      style={thisService.getStatusChipStyles(isBg)}
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
      <span style={{ color: thisService.getStatusTextColor() }}>
        <CircleFill width={6} />
      </span>

      {eventStatusLabelMap[status]()}

      {isCloseable && (
        <button
          type="button"
          aria-label="Remove"
          style={
            {
              "--status-close-hover-bg":
                thisService.getStatusCloseButtonHoverBackground(),
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

export default EventStatusChipComponent;
