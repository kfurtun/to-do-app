import dayjs, { type Dayjs } from 'dayjs';
import { create } from 'zustand';

// Define the shape of your state
interface AppState {
  isAddTaskOpen: boolean;
  isSidebarOpen: boolean;
  selectedDate: Dayjs | null;
  selectedMonthAndYear: Dayjs | null;
  setIsAddTaskOpen: (flag?: boolean) => void;
  setIsSidebarOpen: () => void;
  setSelectedDate: (date: Dayjs | null) => void;
  setSelectedMonthAndYear: (date: Dayjs | null) => void;
}

const initialState = {
  isAddTaskOpen: false,
  isSidebarOpen: false,
  selectedDate: dayjs(),
  selectedMonthAndYear: dayjs(),
};

const actions = (set: any) => ({
  setIsAddTaskOpen: (flag?: boolean) =>
    set((state: AppState) => ({
      isAddTaskOpen: flag === undefined ? !state.isAddTaskOpen : flag,
    })),
  setIsSidebarOpen: () =>
    set((state: AppState) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSelectedDate: (date: Dayjs | null) => set({ selectedDate: date }),
  setSelectedMonthAndYear: (date: Dayjs | null) =>
    set({ selectedMonthAndYear: date }),
});

// Create the Zustand store
const useZustandStore = create<AppState>((set) => ({
  ...initialState,
  ...actions(set),
}));

export default useZustandStore;
