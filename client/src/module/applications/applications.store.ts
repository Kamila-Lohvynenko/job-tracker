import { create } from "zustand";
import { devtools } from "zustand/middleware";

// interface
interface IState {
  modalType: "add" | "remove" | null;
  applicationIdToDelete: string | null;
}

interface IStore extends IState {
  handleApplicationsStore: (value: Partial<IState>) => void;
}

// store
export const useApplicationsStore = create<IStore>()(
  devtools(
    (set) => ({
      // Initial state values
      modalType: null,
      applicationIdToDelete: null,

      // State update function
      handleApplicationsStore: (value: Partial<IState>) =>
        set((state: IState) => ({ ...state, ...value })),
    }),
    {
      enabled:
        process.env.NODE_ENV !== "production" && typeof window !== "undefined",
    },
  ),
);
