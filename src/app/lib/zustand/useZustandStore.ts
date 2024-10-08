import dayjs, { type Dayjs } from 'dayjs';
import { create } from 'zustand';

// Define the shape of your state
interface AppState {
  isAddTaskOpen: boolean;
  isSidebarOpen: boolean;
  selectedDate: Dayjs | null;
  selectedMonthAndYear: Dayjs | null;
  hasTaskCompleted: boolean;
  setIsAddTaskOpen: (flag?: boolean) => void;
  setIsSidebarOpen: (flag?: boolean) => void;
  setSelectedDate: (date: Dayjs | null) => void;
  setSelectedMonthAndYear: (date: Dayjs | null) => void;
  setHasTaskCompleted: (flag: boolean) => void;
}

const initialState = {
  isAddTaskOpen: false,
  isSidebarOpen: false,
  selectedDate: dayjs(),
  selectedMonthAndYear: dayjs(),
  hasTaskCompleted: false,
};

const actions = (set: any) => ({
  setIsAddTaskOpen: (flag?: boolean) =>
    set((state: AppState) => ({
      isAddTaskOpen: flag === undefined ? !state.isAddTaskOpen : flag,
    })),
  setIsSidebarOpen: (flag?: boolean) =>
    set((state: AppState) => ({
      isSidebarOpen: flag === undefined ? !state.isSidebarOpen : flag,
    })),
  setSelectedDate: (date: Dayjs | null) => set({ selectedDate: date }),
  setSelectedMonthAndYear: (date: Dayjs | null) =>
    set({ selectedMonthAndYear: date }),
  setHasTaskCompleted: (flag: boolean) => set({ hasTaskCompleted: flag }),
});

// Create the Zustand store
const useZustandStore = create<AppState>((set) => ({
  ...initialState,
  ...actions(set),
}));

export default useZustandStore;
