
import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  estimate: number;
  completed: number;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  incrementTaskPomodoro: (id: string) => void;
}

const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem('pomodoro-tasks');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: loadTasks(),
  addTask: (task) => set((state) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const newTasks = [...state.tasks, newTask];
    saveTasks(newTasks);
    return { tasks: newTasks };
  }),
  updateTask: (id, updates) => set((state) => {
    const newTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );
    saveTasks(newTasks);
    return { tasks: newTasks };
  }),
  deleteTask: (id) => set((state) => {
    const newTasks = state.tasks.filter((task) => task.id !== id);
    saveTasks(newTasks);
    return { tasks: newTasks };
  }),
  incrementTaskPomodoro: (id) => set((state) => {
    const newTasks = state.tasks.map((task) =>
      task.id === id ? { ...task, completed: task.completed + 1 } : task
    );
    saveTasks(newTasks);
    return { tasks: newTasks };
  }),
}));
