import { useTheme } from "next-themes";

// service
export const useSelectThemeService = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    switch (theme) {
      case "light": {
        setTheme("dark");
        break;
      }
      case "dark": {
        setTheme("light");
        break;
      }
    }
  };

  // return
  return { handleChangeTheme };
};
