"use client";

import { Button } from "@heroui/react";
import { useLanguageSwitcherService } from "./select-language.service";

export const SelectLanguageComponent = () => {
  const thisService = useLanguageSwitcherService();

  return (
    <Button
      aria-label="Change Language"
      variant="outline"
      size="lg"
      onClick={thisService.handleChangeLanguage}
      className="text-foreground-muted hover:text-foreground"
    >
      {thisService.nextLocale.toUpperCase()}
    </Button>
  );
};
