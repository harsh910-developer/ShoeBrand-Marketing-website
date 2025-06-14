
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RotateCcw } from "lucide-react";

interface ARCameraViewProps {
  productImage: string;
  onCapture: () => void;
  onSwitchMode: () => void;
}

const ARCameraView = ({ productImage, onCapture, onSwitchMode }: ARCameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="space-y-4">
      {/* AR Camera View */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-96 object-cover"
        />
        
        {/* AR Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <img 
              src={productImage}
              alt="AR Overlay"
              className="w-32 h-32 object-cover opacity-80 rounded-lg shadow-lg"
            />
          </div>
          
          {/* AR Guide */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg text-sm">
            Point camera at your feet
          </div>
        </div>
      </div>

      {/* AR Controls */}
      <div className="flex justify-center gap-3">
        <Button onClick={onCapture} className="bg-red-500 hover:bg-red-600">
          <Camera className="h-4 w-4 mr-2" />
          Capture
        </Button>
        <Button variant="outline" onClick={onSwitchMode}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Switch Mode
        </Button>
      </div>
    </div>
  );
};

export default ARCameraView;
