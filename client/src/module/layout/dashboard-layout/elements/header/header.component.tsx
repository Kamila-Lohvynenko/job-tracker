"use client";

import { SelectLanguageComponent } from "@/shared/components/select/language";
import { SelectThemeComponent } from "@/shared/components/select/theme";
import { Button } from "@heroui/react";
import { MenuIcon } from "lucide-react";
import { HeaderService } from "./header.service";

export const HeaderComponent = () => {
  const thisService = HeaderService();

  return (
    <div className="flex items-center w-full p-4">
      <Button
        isIconOnly
        size="lg"
        aria-label="Toggle Sidebar"
        onClick={thisService.openMenu}
        className="md:hidden bg-transparent text-foreground-subtle hover:text-foreground"
      >
        <MenuIcon className="w-8 h-8" />
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <SelectLanguageComponent />

        <SelectThemeComponent />
      </div>
    </div>
  );
};
