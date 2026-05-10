import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { FC } from "react";

// interface
interface IProps {
  children: React.ReactNode;
}

// component
export const UiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  // return
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
        <ToastProvider
          placement={"top-right"}
          maxVisibleToasts={3}
          toastProps={{
            timeout: 3000,
            classNames: {
              title: "first-letter:uppercase",
              description: "first-letter:uppercase",
            },
          }}
        />

        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default UiProvider;
