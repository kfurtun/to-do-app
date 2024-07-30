import { create } from 'zustand';

// Define the shape of your state
interface AppState {
  isAddTaskOpen: boolean;
  isSidebarOpen: boolean;
  setIsAddTaskOpen: (flag?: boolean) => void;
  setIsSidebarOpen: () => void;
}

const initialState = {
  isAddTaskOpen: false,
  isSidebarOpen: false,
};

const actions = (set: any) => ({
  setIsAddTaskOpen: (flag?: boolean) =>
    set((state: AppState) => ({
      isAddTaskOpen: flag === undefined ? !state.isAddTaskOpen : flag,
    })),
  setIsSidebarOpen: () =>
    set((state: AppState) => ({ isSidebarOpen: !state.isSidebarOpen })),
});

// Create the Zustand store
const useZustandStore = create<AppState>((set) => ({
  ...initialState,
  ...actions(set),
}));

export default useZustandStore;
