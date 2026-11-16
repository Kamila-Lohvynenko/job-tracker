import { IApplicationEventDto } from "@/shared/rest-api/interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IState {
  isEventModalOpen: boolean;
  eventToEdit: IApplicationEventDto | null;
}

interface IStore extends IState {
  handleApplicationStore: (value: Partial<IState>) => void;
}

export const useApplicationStore = create<IStore>()(
  devtools(
    (set) => ({
      isEventModalOpen: false,
      eventToEdit: null,

      handleApplicationStore: (value: Partial<IState>) =>
        set((state: IState) => ({ ...state, ...value })),
    }),
    {
      enabled:
        process.env.NODE_ENV !== "production" && typeof window !== "undefined",
    },
  ),
);
