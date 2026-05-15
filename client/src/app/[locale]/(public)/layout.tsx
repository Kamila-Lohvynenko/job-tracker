import { AuthLayoutModule } from "@/module/layout/auth-layout";
import type { FC, ReactNode } from "react";
// interface
interface IPublicLayoutModuleProps {
  children: ReactNode;
}

// component
const PublicLayoutModule: FC<Readonly<IPublicLayoutModuleProps>> = (props) => {
  const { children } = props;

  // return
  return <AuthLayoutModule>{children}</AuthLayoutModule>;
};

export default PublicLayoutModule;
