
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box } from '@react-three/drei';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, RotateCcw, Info, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  images: string[];
  brand: string;
}

interface ARTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

// Simple 3D Shoe Component
function Shoe3D({ color = "#8B4513" }: { color?: string }) {
  return (
    <group position={[0, -0.5, 0]} rotation={[0, Math.PI / 4, 0]}>
      {/* Shoe sole */}
      <Box args={[2.5, 0.3, 1]} position={[0, -0.15, 0]}>
        <meshStandardMaterial color="#2F2F2F" />
      </Box>
      
      {/* Shoe upper */}
      <Box args={[2.2, 1.2, 0.8]} position={[0.2, 0.4, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Shoe tongue */}
      <Box args={[0.6, 0.8, 0.1]} position={[-0.8, 0.3, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Laces */}
      <Box args={[0.1, 0.1, 0.9]} position={[-0.8, 0.6, 0]}>
        <meshStandardMaterial color="white" />
      </Box>
    </group>
  );
}

const ARTryOnModal = ({ isOpen, onClose, product }: ARTryOnModalProps) => {
  const [isARActive, setIsARActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [shoeColor, setShoeColor] = useState("#8B4513");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasCamera(true))
      .catch(() => setHasCamera(false));
  }, []);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      setIsARActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      toast({
        title: "AR Try-On Active",
        description: "Point your camera at your feet and move them into the frame.",
      });
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to use AR try-on feature.",
        variant: "destructive",
      });
    }
  };

  const stopAR = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsARActive(false);
  };

  const resetView = () => {
    setShoeColor("#8B4513");
    toast({
      title: "View Reset",
      description: "3D model has been reset to default position.",
    });
  };

  const handleClose = () => {
    stopAR();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              AR Try-On: {product.name}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* AR/3D View */}
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
                <Button size="sm" variant="outline" onClick={resetView}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-80 space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Try-On Options</h4>
              
              {hasCamera ? (
                <Button 
                  className="w-full" 
                  onClick={isARActive ? stopAR : startAR}
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
                  {["#8B4513", "#000000", "#FFFFFF", "#DC2626", "#059669"].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        shoeColor === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setShoeColor(color)}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARTryOnModal;
