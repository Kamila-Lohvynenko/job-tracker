import { localizeHref } from "@/paraglide/runtime";
import { ERoutes } from "@/shared/routes";
import { useRouter } from "next/navigation";

export const useApplicationHeaderService = () => {
  const { replace } = useRouter();
  const goBackToApplications = () => {
    replace(localizeHref(ERoutes.APPLICATIONS));
  };

  const openApplicationModal = () => {
    console.log("openApplicationModal");
  };

  // return
  return {
    goBackToApplications,
    openApplicationModal,
  };
};
