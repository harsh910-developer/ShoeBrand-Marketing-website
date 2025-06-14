
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Ruler, ArrowUpDown } from 'lucide-react';

interface ARSizeComparisonProps {
  currentSize: number;
  availableSizes: number[];
  onSizeChange: (size: number) => void;
  isActive: boolean;
}

const ARSizeComparison = ({ currentSize, availableSizes, onSizeChange, isActive }: ARSizeComparisonProps) => {
  const [showComparison, setShowComparison] = useState(false);
  const [compareSize, setCompareSize] = useState(currentSize + 0.5);

  if (!isActive) return null;

  const sizeScale = (size: number) => {
    // Calculate scale based on shoe size (rough approximation)
    const baseSize = 9; // US size 9 as baseline
    return 0.9 + (size - baseSize) * 0.05;
  };

  const getSizeDifference = (size1: number, size2: number) => {
    const diff = Math.abs(size1 - size2);
    if (diff < 0.5) return 'Minimal difference';
    if (diff < 1) return 'Half size difference';
    return `${diff} size difference`;
  };

  return (
    <div className="absolute bottom-24 right-4 bg-black/70 backdrop-blur-md rounded-lg p-4 border border-white/20 max-w-xs">
      <div className="flex items-center justify-between mb-3">
        <Badge className="bg-purple-500 text-white text-xs">
          SIZE COMPARISON
        </Badge>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowComparison(!showComparison)}
          className="border-white/30 text-white hover:bg-white/10 h-6 px-2"
        >
          <ArrowUpDown className="h-3 w-3" />
        </Button>
      </div>

      {/* Current Size Display */}
      <div className="mb-3">
        <div className="text-white text-sm mb-1">Current Size: {currentSize}</div>
        <div className="text-gray-300 text-xs">
          Scale: {(sizeScale(currentSize) * 100).toFixed(0)}%
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-3">
        <div className="text-gray-300 text-xs mb-2">Try Different Size:</div>
        <div className="flex flex-wrap gap-1">
          {availableSizes.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={currentSize === size ? "default" : "outline"}
              onClick={() => onSizeChange(size)}
              className={`h-6 px-2 text-xs ${
                currentSize === size 
                  ? 'bg-purple-500 text-white' 
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Size Comparison Mode */}
      {showComparison && (
        <div className="border-t border-white/20 pt-3">
          <div className="text-gray-300 text-xs mb-2">Compare with:</div>
          <Slider
            value={[compareSize]}
            onValueChange={(value) => setCompareSize(value[0])}
            min={Math.min(...availableSizes)}
            max={Math.max(...availableSizes)}
            step={0.5}
            className="mb-2"
          />
          <div className="text-white text-xs">
            Size {compareSize} vs {currentSize}
          </div>
          <div className="text-gray-300 text-xs">
            {getSizeDifference(currentSize, compareSize)}
          </div>
        </div>
      )}

      {/* Visual Size Indicator */}
      <div className="mt-3 flex items-center gap-2">
        <Ruler className="h-3 w-3 text-purple-400" />
        <div className="flex-1 bg-white/20 rounded-full h-2 relative">
          <div 
            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(sizeScale(currentSize) - 0.8) * 500}%` }}
          />
        </div>
        <span className="text-xs text-white">{currentSize}</span>
      </div>
    </div>
  );
};

export default ARSizeComparison;
