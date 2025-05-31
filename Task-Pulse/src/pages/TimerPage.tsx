
import React, { useEffect, useRef } from 'react';
import { useTimerStore } from '../stores/timerStore';
import { useTaskStore } from '../stores/taskStore';
import { useAnalyticsStore } from '../stores/analyticsStore';
import { useSettingsStore } from '../stores/settingsStore';
import TimerDisplay from '../components/TimerDisplay';
import ControlButtons from '../components/ControlButtons';
import TaskSelector from '../components/TaskSelector';
import { useToast } from '../hooks/use-toast';

const TimerPage = () => {
  const { time, isRunning, sessionType, setTime, setRunning, setSessionType, incrementSessions, currentTask } = useTimerStore();
  const { incrementTaskPomodoro } = useTaskStore();
  const { addPomodoro } = useAnalyticsStore();
  const { workDuration, breakDuration, longBreakDuration, autoSwitch, soundEnabled } = useSettingsStore();
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      
      if (time === 0 && isRunning) {
        handleSessionComplete();
      }
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleSessionComplete = () => {
    setRunning(false);
    
    if (sessionType === 'work') {
      incrementSessions();
      const today = new Date().toISOString().split('T')[0];
      addPomodoro(today);
      
      if (currentTask) {
        incrementTaskPomodoro(currentTask);
      }
      
      toast({
        title: "Work session completed!",
        description: "Time for a break",
      });
    }

    if (soundEnabled) {
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
    }

    if (autoSwitch) {
      switchToNextSession();
    }
  };

  const switchToNextSession = () => {
    if (sessionType === 'work') {
      setSessionType('break');
      setTime(breakDuration * 60);
    } else {
      setSessionType('work');
      setTime(workDuration * 60);
    }
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    const duration = sessionType === 'work' ? workDuration : 
                     sessionType === 'break' ? breakDuration : longBreakDuration;
    setTime(duration * 60);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            {sessionType === 'work' ? 'Work Session' : 
             sessionType === 'break' ? 'Short Break' : 'Long Break'}
          </h1>
          
          <TaskSelector />
          
          <TimerDisplay time={time} />
          
          <ControlButtons
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onSkip={switchToNextSession}
          />
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
