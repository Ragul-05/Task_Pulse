
import React from 'react';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface ControlButtonsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Button
        onClick={isRunning ? onPause : onStart}
        size="lg"
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-4"
      >
        {isRunning ? <Pause size={20} /> : <Play size={20} />}
        <span className="ml-2">{isRunning ? 'Pause' : 'Start'}</span>
      </Button>
      
      <Button onClick={onReset} variant="outline" size="lg" className="px-6 py-4">
        <RotateCcw size={20} />
        <span className="ml-2">Reset</span>
      </Button>
      
      <Button onClick={onSkip} variant="outline" size="lg" className="px-6 py-4">
        <SkipForward size={20} />
        <span className="ml-2">Skip</span>
      </Button>
    </div>
  );
};

export default ControlButtons;
