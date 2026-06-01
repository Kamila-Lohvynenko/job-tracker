import { LogoIcon } from "@/images";
import { cn } from "@/shared/utils/cn";
import { FC } from "react";

// interfaces
interface ILogoComponentProps {
  isCollapsed: boolean;
}

// component
export const LogoComponent: FC<ILogoComponentProps> = (props) => {
  const { isCollapsed } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isCollapsed ? "justify-center" : "pl-1",
      )}
    >
      <LogoIcon width={32} height={32} />

      <span
        className={cn("text-xl font-bold", isCollapsed ? "hidden" : "block")}
      >
        JobTracker
      </span>
    </div>
  );
};
