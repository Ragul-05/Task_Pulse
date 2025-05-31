
import React, { useState } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Trash2, Plus } from 'lucide-react';

const TaskManager = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskEstimate, setNewTaskEstimate] = useState(4);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        estimate: newTaskEstimate,
        completed: 0,
      });
      setNewTaskTitle('');
      setNewTaskEstimate(4);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Task Manager</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask} className="flex gap-4">
              <Input
                type="text"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Estimated Pomodoros"
                value={newTaskEstimate}
                onChange={(e) => setNewTaskEstimate(Number(e.target.value))}
                min="1"
                max="20"
                className="w-40"
              />
              <Button type="submit" className="bg-red-500 hover:bg-red-600">
                <Plus size={20} className="mr-2" />
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No tasks yet. Add your first task above!
              </p>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => {
            const progress = task.estimate > 0 ? (task.completed / task.estimate) * 100 : 0;
            
            return (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {task.title}
                    </h3>
                    <Button
                      onClick={() => deleteTask(task.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Progress: {task.completed} / {task.estimate} Pomodoros</span>
                      <span>{Math.round(progress)}% Complete</span>
                    </div>
                    
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={task.title}
                        onChange={(e) => updateTask(task.id, { title: e.target.value })}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        value={task.estimate}
                        onChange={(e) => updateTask(task.id, { estimate: Number(e.target.value) })}
                        min="1"
                        max="20"
                        className="w-20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TaskManager;
