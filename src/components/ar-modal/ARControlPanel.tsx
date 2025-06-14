
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Info, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  images: string[];
  brand: string;
}

interface ARControlPanelProps {
  product: Product;
  shoeColor: string;
  onColorChange: (color: string) => void;
  isARActive: boolean;
  hasCamera: boolean;
}

const ARControlPanel = ({ 
  product, 
  shoeColor, 
  onColorChange, 
  isARActive,
  hasCamera 
}: ARControlPanelProps) => {
  const colors = [
    { name: 'Brown', value: '#8B4513' },
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#DC2626' },
    { name: 'Green', value: '#059669' },
    { name: 'Blue', value: '#2563EB' },
  ];

  return (
    <div className="w-full lg:w-80 space-y-6">
      {/* Product Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="aspect-square relative">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h3 className="font-semibold">{product.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">4.8</span>
              </div>
              <span className="text-sm text-gray-500">(234 reviews)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Customize Color
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`relative w-full aspect-square rounded-lg border-2 transition-all ${
                  shoeColor === color.value ? 'border-blue-500 scale-105' : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => onColorChange(color.value)}
              >
                {shoeColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  {color.name}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status & Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="h-5 w-5" />
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={hasCamera ? "default" : "destructive"} className="text-xs">
              {hasCamera ? "Camera Ready" : "No Camera"}
            </Badge>
            {isARActive && (
              <Badge variant="secondary" className="text-xs animate-pulse">
                AR Active
              </Badge>
            )}
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            {isARActive ? (
              <>
                <p>✅ AR mode is active</p>
                <p>📱 Point camera at your feet</p>
                <p>👟 Position feet in the frame</p>
                <p>📸 Tap camera to capture</p>
                <p>🎨 Try different colors above</p>
              </>
            ) : (
              <>
                <p>🎯 Click "Start AR Try-On" to begin</p>
                <p>📱 Allow camera access when prompted</p>
                <p>💡 Ensure good lighting</p>
                <p>👟 Have your feet ready to position</p>
                <p>🎨 Customize colors before starting</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Real-time AR overlay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Multiple color options</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Photo capture & download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Instant virtual fitting</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARControlPanel;
