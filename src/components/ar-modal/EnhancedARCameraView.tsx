
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Square, Play, Download, RotateCcw, Settings } from 'lucide-react';
import { RefObject, useState, useEffect } from 'react';
import { FootDetectionEngine, FootDetection, CalibrationData } from './FootDetectionEngine';
import ARCalibration from './ARCalibration';
import ARViewModes, { ARViewMode } from './ARViewModes';
import ARSizeComparison from './ARSizeComparison';
import ARGestureControls from './ARGestureControls';

interface EnhancedARCameraViewProps {
  isActive: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  productImage: string;
  shoeColor: string;
  onStartAR: () => void;
  onStopAR: () => void;
  onCapture: () => void;
  capturedImage: string | null;
  availableSizes: number[];
  selectedSize: number;
  onSizeChange: (size: number) => void;
}

const EnhancedARCameraView = ({
  isActive,
  videoRef,
  productImage,
  shoeColor,
  onStartAR,
  onStopAR,
  onCapture,
  capturedImage,
  availableSizes,
  selectedSize,
  onSizeChange
}: EnhancedARCameraViewProps) => {
  const [footDetections, setFootDetections] = useState<FootDetection[]>([]);
  const [viewMode, setViewMode] = useState<ARViewMode>('default');
  const [showCalibration, setShowCalibration] = useState(false);
  const [detectionEngine] = useState(() => new FootDetectionEngine());
  const [shoePositions, setShoePositions] = useState<Array<{
    x: number; y: number; scale: number; rotation: number;
  }>>([]);
  const [gestureScale, setGestureScale] = useState(1);
  const [gestureOffset, setGestureOffset] = useState({ x: 0, y: 0 });

  // Enhanced foot detection loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && videoRef.current) {
      interval = setInterval(() => {
        const detections = detectionEngine.detectFeet(videoRef.current!);
        setFootDetections(detections);

        // Calculate shoe positions based on detections
        const positions = detections.map(detection => 
          detectionEngine.calculateShoePosition(detection, selectedSize)
        );
        setShoePositions(positions);
      }, 100); // More frequent updates for smoother experience
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, detectionEngine, selectedSize]);

  // Check for existing calibration on mount
  useEffect(() => {
    const calibration = detectionEngine.getCalibration();
    if (!calibration && isActive) {
      setShowCalibration(true);
    }
  }, [isActive, detectionEngine]);

  const handleCalibration = (data: CalibrationData) => {
    detectionEngine.setCalibration(data);
    setShowCalibration(false);
  };

  const handleGesture = (gesture: any) => {
    switch (gesture.type) {
      case 'pinch':
        setGestureScale(prev => Math.max(0.5, Math.min(2, prev * gesture.scale)));
        break;
      case 'drag':
        setGestureOffset(prev => ({
          x: prev.x + gesture.delta.x * 0.1,
          y: prev.y + gesture.delta.y * 0.1
        }));
        break;
      case 'tap':
        // Reset position on double tap
        setGestureScale(1);
        setGestureOffset({ x: 0, y: 0 });
        break;
    }
  };

  const getViewTransform = (mode: ARViewMode, index: number) => {
    const base = shoePositions[index] || { x: 50, y: 70, scale: 1, rotation: 0 };
    
    switch (mode) {
      case 'side':
        return {
          ...base,
          rotation: base.rotation + 90,
          scale: base.scale * 0.8
        };
      case 'top':
        return {
          ...base,
          rotation: base.rotation + 180,
          scale: base.scale * 1.2,
          y: base.y - 10
        };
      case 'walk':
        return {
          ...base,
          y: base.y + Math.sin(Date.now() * 0.01) * 3,
          rotation: base.rotation + Math.sin(Date.now() * 0.005) * 5
        };
      default:
        return base;
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `ar-tryon-enhanced-${Date.now()}.png`;
      link.href = capturedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Camera className="h-16 w-16 text-white" />
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Enhanced AR Experience
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience next-generation AR with intelligent foot detection, multiple viewing angles, 
              size comparison, and gesture controls.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-8">
              <div>🦶 Advanced Foot Detection</div>
              <div>📐 Size Comparison</div>
              <div>👋 Gesture Controls</div>
              <div>🔄 Multiple View Angles</div>
            </div>
          </div>
          <Button 
            onClick={onStartAR}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
          >
            <Play className="h-6 w-6 mr-3" />
            Start Enhanced AR
          </Button>
        </div>
      </div>
    );
  }

  if (showCalibration) {
    return (
      <div className="flex items-center justify-center h-full bg-black/50 backdrop-blur-md">
        <ARCalibration
          onCalibrate={handleCalibration}
          onSkip={() => setShowCalibration(false)}
          currentCalibration={detectionEngine.getCalibration()}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full bg-black rounded-lg overflow-hidden">
      <ARGestureControls onGesture={handleGesture} isActive={isActive}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </ARGestureControls>
      
      {/* Enhanced AR Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Foot Detection Visualizations */}
        {footDetections.map((detection, index) => (
          <div key={index}>
            {/* Foot bounding box */}
            <div
              className="absolute border-2 border-green-400 bg-green-400/10 rounded-lg transition-all duration-300"
              style={{
                left: `${detection.boundingBox.x}%`,
                top: `${detection.boundingBox.y}%`,
                width: `${detection.boundingBox.width}px`,
                height: `${detection.boundingBox.height}px`,
                opacity: detection.confidence
              }}
            >
              <Badge className="absolute -top-6 left-0 bg-green-500 text-white text-xs">
                {index === 0 ? 'Left' : 'Right'} Foot ({Math.round(detection.confidence * 100)}%)
              </Badge>
            </div>

            {/* Enhanced Shoe Overlay */}
            {shoePositions[index] && (
              <div
                className="absolute transition-all duration-200 ease-out"
                style={{
                  left: `${getViewTransform(viewMode, index).x + gestureOffset.x}%`,
                  top: `${getViewTransform(viewMode, index).y + gestureOffset.y}%`,
                  transform: `translate(-50%, -50%) scale(${getViewTransform(viewMode, index).scale * gestureScale}) rotate(${getViewTransform(viewMode, index).rotation}deg)`
                }}
              >
                {/* Enhanced shadow */}
                <div className="absolute inset-0 bg-black/40 blur-lg transform translate-y-3 scale-110 rounded-xl"></div>
                
                {/* Main shoe with enhanced effects */}
                <img
                  src={productImage}
                  alt="Virtual Shoe"
                  className="w-40 h-40 object-contain rounded-xl shadow-2xl"
                  style={{
                    filter: `hue-rotate(${
                      shoeColor === '#DC2626' ? '0deg' : 
                      shoeColor === '#059669' ? '120deg' : 
                      shoeColor === '#2563EB' ? '240deg' : '0deg'
                    }) drop-shadow(0 15px 25px rgba(0,0,0,0.4)) brightness(1.1) contrast(1.1)`,
                    opacity: detection.confidence
                  }}
                />
                
                {/* Size indicator */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/70 px-3 py-1 rounded-full border border-white/30">
                  Size {selectedSize}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Status and Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className="bg-green-500 text-white animate-pulse">
            🦶 {footDetections.length} Foot{footDetections.length !== 1 ? 's' : ''} Detected
          </Badge>
          <Badge className="bg-blue-500 text-white">
            👀 {viewMode.toUpperCase()} VIEW
          </Badge>
        </div>

        {/* Calibration button */}
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowCalibration(true)}
            className="border-white/50 text-white hover:bg-white/20 backdrop-blur-md pointer-events-auto"
          >
            <Settings className="h-4 w-4 mr-1" />
            Calibrate
          </Button>
        </div>
      </div>

      {/* View Modes */}
      <ARViewModes
        currentMode={viewMode}
        onModeChange={setViewMode}
        isActive={isActive}
      />

      {/* Size Comparison */}
      <ARSizeComparison
        currentSize={selectedSize}
        availableSizes={availableSizes}
        onSizeChange={onSizeChange}
        isActive={isActive}
      />

      {/* Enhanced Camera Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 pointer-events-auto">
        <Button
          onClick={onCapture}
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-16 h-16 shadow-xl"
          disabled={footDetections.length === 0}
        >
          <Camera className="h-6 w-6" />
        </Button>
        
        <Button
          onClick={onStopAR}
          variant="outline"
          size="lg"
          className="border-white/50 text-white hover:bg-white/20 rounded-full backdrop-blur-md"
        >
          <Square className="h-5 w-5 mr-2" />
          Stop
        </Button>
      </div>

      {/* Enhanced Captured Photo Display */}
      {capturedImage && (
        <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md pointer-events-auto">
          <div className="text-center space-y-6 max-w-2xl mx-auto p-6">
            <h3 className="text-3xl font-bold text-white mb-4">Perfect AR Shot! ✨</h3>
            <div className="relative">
              <img 
                src={capturedImage} 
                alt="Enhanced AR try-on"
                className="max-w-md max-h-96 rounded-xl shadow-2xl border-2 border-white/20"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={downloadImage} 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3"
              >
                <Download className="h-4 w-4 mr-2" />
                Download HD
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="border-white/50 text-white hover:bg-white/10 backdrop-blur-md px-6 py-3"
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

export default EnhancedARCameraView;
