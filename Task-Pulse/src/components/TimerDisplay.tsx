
import React from 'react';

interface TimerDisplayProps {
  time: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const percentage = time / (25 * 60); // Assuming 25 minutes for progress ring

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <div className="relative w-80 h-80 mx-auto my-8">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 250 250">
        <circle
          cx="125"
          cy="125"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="125"
          cy="125"
          r="120"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-red-500 transition-all duration-1000 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 dark:text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
