import { LogoComponent } from "@/shared/components/logo";
import { SelectThemeComponent } from "@/shared/components/select/theme";

// component
export const HeaderComponent = () => {
  return (
    <div className="flex items-center justify-between">
      <LogoComponent />
      <SelectThemeComponent />
    </div>
  );
};
