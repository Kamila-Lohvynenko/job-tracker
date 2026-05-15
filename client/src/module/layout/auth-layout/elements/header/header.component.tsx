import { LogoComponent } from "@/shared/components/logo";
import { SelectLanguageComponent } from "@/shared/components/select/language";
import { SelectThemeComponent } from "@/shared/components/select/theme";

// component
export const HeaderComponent = () => {
  return (
    <div className="flex items-center justify-between">
      <LogoComponent />

      <div className="flex items-center gap-2">
        <SelectLanguageComponent />

        <SelectThemeComponent />
      </div>
    </div>
  );
};
