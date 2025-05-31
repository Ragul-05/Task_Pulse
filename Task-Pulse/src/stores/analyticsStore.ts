
import { create } from 'zustand';

interface DailyStats {
  [date: string]: number;
}

interface AnalyticsState {
  dailyStats: DailyStats;
  addPomodoro: (date: string) => void;
  getWeeklyStats: () => { date: string; count: number }[];
  getMonthlyStats: () => { date: string; count: number }[];
}

const loadAnalytics = (): DailyStats => {
  try {
    const stored = localStorage.getItem('pomodoro-analytics');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveAnalytics = (stats: DailyStats) => {
  localStorage.setItem('pomodoro-analytics', JSON.stringify(stats));
};

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  dailyStats: loadAnalytics(),
  addPomodoro: (date) => set((state) => {
    const newStats = {
      ...state.dailyStats,
      [date]: (state.dailyStats[date] || 0) + 1,
    };
    saveAnalytics(newStats);
    return { dailyStats: newStats };
  }),
  getWeeklyStats: () => {
    const stats = get().dailyStats;
    const today = new Date();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weekData.push({
        date: dateStr,
        count: stats[dateStr] || 0,
      });
    }
    
    return weekData;
  },
  getMonthlyStats: () => {
    const stats = get().dailyStats;
    const today = new Date();
    const monthData = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      monthData.push({
        date: dateStr,
        count: stats[dateStr] || 0,
      });
    }
    
    return monthData;
  },
}));
