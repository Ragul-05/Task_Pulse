
import React from 'react';
import { useTaskStore } from '../stores/taskStore';
import { useTimerStore } from '../stores/timerStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const TaskSelector = () => {
  const { tasks } = useTaskStore();
  const { currentTask, setCurrentTask } = useTimerStore();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Working on:
      </label>
      <Select value={currentTask || 'none'} onValueChange={(value) => setCurrentTask(value === 'none' ? null : value)}>
        <SelectTrigger className="w-full max-w-md mx-auto">
          <SelectValue placeholder="Select a task (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No task selected</SelectItem>
          {tasks.map((task) => (
            <SelectItem key={task.id} value={task.id}>
              {task.title} ({task.completed}/{task.estimate})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskSelector;
