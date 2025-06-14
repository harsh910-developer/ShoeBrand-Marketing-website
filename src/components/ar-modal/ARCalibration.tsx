
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler, Footprints } from 'lucide-react';
import { CalibrationData } from './FootDetectionEngine';

interface ARCalibrationProps {
  onCalibrate: (data: CalibrationData) => void;
  onSkip: () => void;
  currentCalibration?: CalibrationData | null;
}

const ARCalibration = ({ onCalibrate, onSkip, currentCalibration }: ARCalibrationProps) => {
  const [footLength, setFootLength] = useState(currentCalibration?.footLength || 25);
  const [footWidth, setFootWidth] = useState(currentCalibration?.footWidth || 10);
  const [shoeSize, setShoeSize] = useState(currentCalibration?.shoeSize || 9);

  const handleCalibrate = () => {
    const calibrationData: CalibrationData = {
      footLength,
      footWidth,
      shoeSize,
      preferredPosition: { x: 50, y: 70 }
    };
    onCalibrate(calibrationData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-blue-500" />
          AR Calibration
        </CardTitle>
        <p className="text-sm text-gray-600">
          Help us provide more accurate shoe fitting by calibrating your measurements.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="footLength">Foot Length (cm)</Label>
            <Input
              id="footLength"
              type="number"
              value={footLength}
              onChange={(e) => setFootLength(Number(e.target.value))}
              min="20"
              max="35"
              step="0.5"
            />
          </div>
          <div>
            <Label htmlFor="footWidth">Foot Width (cm)</Label>
            <Input
              id="footWidth"
              type="number"
              value={footWidth}
              onChange={(e) => setFootWidth(Number(e.target.value))}
              min="7"
              max="15"
              step="0.5"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="shoeSize">Current Shoe Size</Label>
          <Input
            id="shoeSize"
            type="number"
            value={shoeSize}
            onChange={(e) => setShoeSize(Number(e.target.value))}
            min="5"
            max="15"
            step="0.5"
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Footprints className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Measurement Tips</span>
          </div>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• Measure your foot from heel to longest toe</li>
            <li>• Measure width at the widest part</li>
            <li>• Use your most comfortable shoe size</li>
          </ul>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleCalibrate} className="flex-1">
            Calibrate AR
          </Button>
          <Button variant="outline" onClick={onSkip}>
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARCalibration;
