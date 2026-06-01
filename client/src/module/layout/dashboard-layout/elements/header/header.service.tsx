import { useGlobalStore } from "@/shared/store/global.store";

export const HeaderService = () => {
  const handleGlobalStore = useGlobalStore((state) => state.handleGlobalStore);

  const openMenu = () => {
    handleGlobalStore({ menu: true });
  };

  // return
  return {
    openMenu,
  };
};
