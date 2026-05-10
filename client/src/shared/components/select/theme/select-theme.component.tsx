"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

import { useSelectThemeService } from "./select-theme.service";

export const SelectThemeComponent = () => {
  const thisService = useSelectThemeService();

  return (
    <Button
      onClick={thisService.handleChangeTheme}
      isIconOnly
      aria-label="Change Theme"
    >
      <Moon key={"theme-light"} size={20} className={"dark:hidden"} />

      <Sun key={"theme-dark"} size={20} className={"hidden dark:block"} />
    </Button>
  );
};
