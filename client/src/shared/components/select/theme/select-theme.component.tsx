"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

import { useSelectThemeService } from "./select-theme.service";

export const SelectThemeComponent = () => {
  const thisService = useSelectThemeService();

  return (
    <Button
      onClick={thisService.handleChangeTheme}
      aria-label="Change Theme"
      variant="outline"
      size="lg"
      isIconOnly
      className="text-foreground-muted hover:text-foreground"
    >
      <Moon key={"theme-light"} className={"dark:hidden w-5 h-5"} />

      <Sun key={"theme-dark"} className={"hidden dark:block w-5 h-5"} />
    </Button>
  );
};
