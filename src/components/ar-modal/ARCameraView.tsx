
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Square, Play, Download } from 'lucide-react';
import { RefObject } from 'react';

interface ARCameraViewProps {
  isActive: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  productImage: string;
  shoeColor: string;
  onStartAR: () => void;
  onStopAR: () => void;
  onCapture: () => void;
  capturedImage: string | null;
}

const ARCameraView = ({
  isActive,
  videoRef,
  productImage,
  shoeColor,
  onStartAR,
  onStopAR,
  onCapture,
  capturedImage
}: ARCameraViewProps) => {
  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `ar-tryon-${Date.now()}.png`;
      link.href = capturedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative h-full bg-black rounded-lg overflow-hidden">
      {!isActive ? (
        // Start Screen
        <div className="flex flex-col items-center justify-center h-full text-white">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
              <Camera className="h-12 w-12 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Try On?</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Click the button below to start your AR experience. Point your camera at your feet for the best results.
              </p>
            </div>
            <Button 
              onClick={onStartAR}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
            >
              <Play className="h-5 w-5 mr-2" />
              Start AR Try-On
            </Button>
          </div>
        </div>
      ) : (
        // Active AR View
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* AR Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Status Badge */}
            <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-pulse">
              🔴 LIVE AR
            </Badge>

            {/* Foot Detection Frame */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <div className="w-64 h-40 border-2 border-dashed border-white/80 rounded-lg bg-black/20 backdrop-blur-sm">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                  Position your feet here
                </div>
              </div>
            </div>

            {/* Virtual Shoe Overlay */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <img 
                  src={productImage}
                  alt="Virtual Shoe"
                  className="w-32 h-32 object-contain opacity-80 rounded-lg shadow-lg"
                  style={{ filter: `hue-rotate(${shoeColor === '#DC2626' ? '0deg' : shoeColor === '#059669' ? '120deg' : shoeColor === '#2563EB' ? '240deg' : '0deg'})` }}
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                  Virtual Fit
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-lg text-sm max-w-xs">
              <div className="space-y-1">
                <p>👟 Point camera at your feet</p>
                <p>📱 Keep device steady</p>
                <p>💡 Ensure good lighting</p>
              </div>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 pointer-events-auto">
            <Button
              onClick={onCapture}
              size="lg"
              className="bg-white text-black hover:bg-gray-100 rounded-full w-16 h-16"
            >
              <Camera className="h-6 w-6" />
            </Button>
            <Button
              onClick={onStopAR}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black rounded-full"
            >
              <Square className="h-5 w-5 mr-2" />
              Stop
            </Button>
          </div>
        </>
      )}

      {/* Captured Photo Display */}
      {capturedImage && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 flex items-center justify-center z-50">
          <div className="text-center space-y-4">
            <img 
              src={capturedImage} 
              alt="Captured AR try-on"
              className="max-w-md max-h-96 rounded-lg shadow-xl"
            />
            <div className="flex gap-3 justify-center">
              <Button onClick={downloadImage} className="bg-blue-500 hover:bg-blue-600">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARCameraView;
