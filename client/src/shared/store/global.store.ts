import { create } from "zustand";
import { devtools } from "zustand/middleware";

// interface
interface IState {
  menu: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IParams extends Partial<IState> {}
interface IStore extends IState {
  handleGlobalStore: (value: IParams) => void;
}

// store
export const useGlobalStore = create<IStore>()(
  devtools(
    (set) => ({
      menu: false,
      handleGlobalStore: (params: IParams) =>
        set((state: IState) => ({ ...state, ...params })),
    }),
    {
      enabled:
        process.env.NODE_ENV !== "production" && typeof window !== "undefined",
    },
  ),
);
