import type { FC, ReactNode } from "react";
import { HeaderComponent } from "./elements/header";

// interface
interface IAuthLayoutModuleProps {
  children: ReactNode;
}

const AuthLayoutModule: FC<Readonly<IAuthLayoutModuleProps>> = (props) => {
  const { children } = props;

  return (
    <div className="px-5 sm:px-8 py-6 sm:py-8">
      <HeaderComponent />

      {children}
    </div>
  );
};

export default AuthLayoutModule;
