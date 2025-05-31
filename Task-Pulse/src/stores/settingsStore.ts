
import { create } from 'zustand';

interface Settings {
  theme: 'light' | 'dark';
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  autoSwitch: boolean;
  soundEnabled: boolean;
  volume: number;
  language: string;
}

interface SettingsState extends Settings {
  updateSettings: (settings: Partial<Settings>) => void;
}

const loadSettings = (): Settings => {
  try {
    const stored = localStorage.getItem('pomodoro-settings');
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

const defaultSettings: Settings = {
  theme: 'light',
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  autoSwitch: true,
  soundEnabled: true,
  volume: 0.5,
  language: 'en',
};

const saveSettings = (settings: Settings) => {
  localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...loadSettings(),
  updateSettings: (newSettings) => set((state) => {
    const updated = { ...state, ...newSettings };
    saveSettings(updated);
    return updated;
  }),
}));
