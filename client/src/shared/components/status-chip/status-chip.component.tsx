import { CSSProperties, FC } from "react";

import { Chip, cn } from "@heroui/react";

import { EApplicationStatus } from "@/shared/rest-api/interface";
import { CircleFill } from "@gravity-ui/icons";
import { XIcon } from "lucide-react";
import { statusLabelMap, useStatusChipService } from "./status-chip.service";

// interface
interface IProps {
  variant?: "bordered" | "primary" | "light";
  status: EApplicationStatus;
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

// component
const StatusChipComponent: FC<Readonly<IProps>> = (props) => {
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

  const thisService = useStatusChipService({ status, variant });

  // return
  return (
    <Chip
      onClick={onClick}
      variant={thisService.getStatusVariant()}
      size={size}
      style={thisService.getStatusChipStyles(isBg)}
      className={cn(
        "flex gap-1 text-tiny capitalize transition-background w-fit",
        className,
        {
          "px-2": variant === "bordered",
          "cursor-pointer hover:bg-divider hover:bg-opacity-25": isClickable,
          "pointer-events-none opacity-50": isDisabled,
          "gap-2": variant === "light",
        },
      )}
    >
      <span
        style={{
          color: thisService.getStatusTextColor(),
        }}
      >
        <CircleFill width={6} />
      </span>

      {statusLabelMap[status]()}

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
            "flex size-4 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer",
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

export default StatusChipComponent;
