
import { create } from 'zustand';

interface TimerState {
  time: number;
  isRunning: boolean;
  sessionType: 'work' | 'break' | 'longBreak';
  sessionsCompleted: number;
  currentTask: string | null;
  setTime: (time: number) => void;
  setRunning: (isRunning: boolean) => void;
  setSessionType: (sessionType: 'work' | 'break' | 'longBreak') => void;
  incrementSessions: () => void;
  setCurrentTask: (taskId: string | null) => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  time: 25 * 60,
  isRunning: false,
  sessionType: 'work',
  sessionsCompleted: 0,
  currentTask: null,
  setTime: (time) => set({ time }),
  setRunning: (isRunning) => set({ isRunning }),
  setSessionType: (sessionType) => set({ sessionType }),
  incrementSessions: () => set((state) => ({ sessionsCompleted: state.sessionsCompleted + 1 })),
  setCurrentTask: (taskId) => set({ currentTask: taskId }),
  resetTimer: () => set({ 
    time: 25 * 60, 
    isRunning: false, 
    sessionType: 'work' 
  }),
}));
