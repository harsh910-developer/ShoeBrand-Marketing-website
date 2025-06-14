
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, RotateCw, Move3D, Layers } from 'lucide-react';

export type ARViewMode = 'default' | 'side' | 'top' | 'walk';

interface ARViewModesProps {
  currentMode: ARViewMode;
  onModeChange: (mode: ARViewMode) => void;
  isActive: boolean;
}

const ARViewModes = ({ currentMode, onModeChange, isActive }: ARViewModesProps) => {
  const modes = [
    { id: 'default' as ARViewMode, label: 'Front View', icon: Eye, description: 'Standard front-facing view' },
    { id: 'side' as ARViewMode, label: 'Side View', icon: RotateCw, description: 'Profile view of shoes' },
    { id: 'top' as ARViewMode, label: 'Top View', icon: Layers, description: 'Top-down perspective' },
    { id: 'walk' as ARViewMode, label: 'Walk Mode', icon: Move3D, description: 'Dynamic walking simulation' }
  ];

  if (!isActive) return null;

  return (
    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md rounded-lg p-3 border border-white/20">
      <div className="flex items-center gap-2 mb-3">
        <Badge className="bg-blue-500 text-white text-xs">
          AR VIEWS
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Button
              key={mode.id}
              size="sm"
              variant={currentMode === mode.id ? "default" : "outline"}
              onClick={() => onModeChange(mode.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                currentMode === mode.id 
                  ? 'bg-blue-500 text-white' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs">{mode.label}</span>
            </Button>
          );
        })}
      </div>
      
      <div className="mt-2 text-xs text-gray-300">
        {modes.find(m => m.id === currentMode)?.description}
      </div>
    </div>
  );
};

export default ARViewModes;
