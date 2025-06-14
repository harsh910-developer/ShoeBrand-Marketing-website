
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import Shoe3D from './Shoe3D';

interface ARDisplayProps {
  isARActive: boolean;
  cameraStream: MediaStream | null;
  shoeColor: string;
  onResetView: () => void;
}

const ARDisplay = ({ isARActive, cameraStream, shoeColor, onResetView }: ARDisplayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
      {isARActive && cameraStream ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          {/* AR Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="w-48 h-32 border-2 border-dashed border-white rounded-lg bg-black/20 flex items-center justify-center">
                <span className="text-white text-sm">Position your feet here</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Shoe3D color={shoeColor} />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            autoRotate={false}
          />
          <Environment preset="studio" />
        </Canvas>
      )}

      {/* Control Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Badge variant="secondary" className="text-xs">
          {isARActive ? "AR Mode" : "3D Preview"}
        </Badge>
        {!isARActive && (
          <Button size="sm" variant="outline" onClick={onResetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ARDisplay;
