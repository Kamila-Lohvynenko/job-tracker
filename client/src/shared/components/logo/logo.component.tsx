import { LogoIcon } from "@/images";
import { FC } from "react";

// component
export const LogoComponent: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon width={32} height={32} />

      <span className="text-xl font-bold">JobTracker</span>
    </div>
  );
};
