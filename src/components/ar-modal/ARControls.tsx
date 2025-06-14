
import { Button } from '@/components/ui/button';
import { Camera, Info } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  images: string[];
  brand: string;
}

interface ARControlsProps {
  hasCamera: boolean;
  isARActive: boolean;
  shoeColor: string;
  product: Product;
  onStartAR: () => void;
  onStopAR: () => void;
  onColorChange: (color: string) => void;
}

const ARControls = ({ 
  hasCamera, 
  isARActive, 
  shoeColor, 
  product, 
  onStartAR, 
  onStopAR, 
  onColorChange 
}: ARControlsProps) => {
  const colors = ["#8B4513", "#000000", "#FFFFFF", "#DC2626", "#059669"];

  return (
    <div className="w-full lg:w-80 space-y-4">
      <div className="space-y-3">
        <h4 className="font-semibold">Try-On Options</h4>
        
        {hasCamera ? (
          <Button 
            className="w-full" 
            onClick={isARActive ? onStopAR : onStartAR}
            variant={isARActive ? "destructive" : "default"}
          >
            <Camera className="h-4 w-4 mr-2" />
            {isARActive ? "Stop AR" : "Start AR Try-On"}
          </Button>
        ) : (
          <div className="text-sm text-gray-600 p-3 bg-yellow-50 rounded-lg">
            <Info className="h-4 w-4 inline mr-2" />
            Camera not available. Using 3D preview mode.
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Shoe Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  shoeColor === color ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3">
        <h4 className="font-semibold">Instructions</h4>
        <div className="text-sm space-y-2 text-gray-600">
          {isARActive ? (
            <>
              <p>• Point camera at your feet</p>
              <p>• Keep camera steady</p>
              <p>• Ensure good lighting</p>
              <p>• Position feet in the frame</p>
            </>
          ) : (
            <>
              <p>• Use mouse to rotate the 3D model</p>
              <p>• Scroll to zoom in/out</p>
              <p>• Try different colors above</p>
              <p>• Click "Start AR" for live view</p>
            </>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm font-medium">{product.brand}</p>
        <p className="text-sm text-gray-600">{product.name}</p>
      </div>
    </div>
  );
};

export default ARControls;
