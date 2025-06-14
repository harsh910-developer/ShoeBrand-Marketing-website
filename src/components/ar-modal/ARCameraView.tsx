
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Square, Play, Download, RotateCcw, Zap } from 'lucide-react';
import { RefObject, useState, useEffect } from 'react';

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
  const [footDetected, setFootDetected] = useState(false);
  const [shoePosition, setShoePosition] = useState({ x: 50, y: 70 });
  const [shoeScale, setShoeScale] = useState(1);
  const [arQuality, setArQuality] = useState<'standard' | 'enhanced'>('standard');

  // Simulate foot detection (in a real implementation, this would use computer vision)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        // Simulate realistic foot detection with some variation
        const detected = Math.random() > 0.3; // 70% detection rate
        setFootDetected(detected);
        
        if (detected) {
          // Add slight movement to shoe position for realism
          setShoePosition(prev => ({
            x: prev.x + (Math.random() - 0.5) * 2,
            y: prev.y + (Math.random() - 0.5) * 1
          }));
        }
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

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

  const resetPosition = () => {
    setShoePosition({ x: 50, y: 70 });
    setShoeScale(1);
  };

  const toggleARQuality = () => {
    setArQuality(prev => prev === 'standard' ? 'enhanced' : 'standard');
  };

  return (
    <div className="relative h-full bg-black rounded-lg overflow-hidden">
      {!isActive ? (
        // Enhanced Start Screen
        <div className="flex flex-col items-center justify-center h-full text-white">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Enhanced AR Try-On
              </h3>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Experience our advanced AR technology with intelligent foot detection, 
                realistic shoe placement, and dynamic lighting effects.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <span>AI Foot Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-purple-400" />
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-green-400" />
                  <span>Dynamic Positioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-orange-400" />
                  <span>HD Capture</span>
                </div>
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
      ) : (
        // Enhanced Active AR View
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Enhanced AR Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Status Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <Badge className={`${footDetected ? 'bg-green-500' : 'bg-red-500'} text-white animate-pulse`}>
                {footDetected ? '🦶 Foot Detected' : '🔍 Scanning...'}
              </Badge>
              <Badge className="bg-blue-500 text-white">
                🔴 {arQuality === 'enhanced' ? 'HD AR MODE' : 'STANDARD AR'}
              </Badge>
            </div>

            {/* Enhanced Foot Detection Frame */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <div className={`w-80 h-48 border-2 rounded-2xl transition-all duration-300 ${
                footDetected 
                  ? 'border-green-400 bg-green-400/10 shadow-green-400/50' 
                  : 'border-dashed border-white/60 bg-black/20'
              } backdrop-blur-sm shadow-2xl`}>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-full border border-white/20">
                  {footDetected ? '✓ Perfect positioning!' : 'Position your feet here'}
                </div>
                
                {/* Corner indicators */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/60"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-white/60"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-white/60"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/60"></div>
              </div>
            </div>

            {/* Enhanced Virtual Shoe Overlay */}
            <div 
              className="absolute transition-all duration-300 ease-out"
              style={{ 
                left: `${shoePosition.x}%`, 
                top: `${shoePosition.y}%`,
                transform: `translate(-50%, -50%) scale(${footDetected ? shoeScale * 1.1 : shoeScale * 0.9})`
              }}
            >
              <div className="relative">
                {/* Shoe shadow */}
                <div className="absolute inset-0 bg-black/30 blur-md transform translate-y-2 scale-110"></div>
                
                {/* Main shoe image with enhanced effects */}
                <img 
                  src={productImage}
                  alt="Virtual Shoe"
                  className={`w-40 h-40 object-contain rounded-xl transition-all duration-300 ${
                    footDetected ? 'opacity-90 shadow-2xl' : 'opacity-70'
                  } ${arQuality === 'enhanced' ? 'filter brightness-110 contrast-110' : ''}`}
                  style={{ 
                    filter: `hue-rotate(${
                      shoeColor === '#DC2626' ? '0deg' : 
                      shoeColor === '#059669' ? '120deg' : 
                      shoeColor === '#2563EB' ? '240deg' : '0deg'
                    }) ${arQuality === 'enhanced' ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : ''}` 
                  }}
                />
                
                {/* Glow effect for enhanced mode */}
                {arQuality === 'enhanced' && footDetected && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm animate-pulse"></div>
                )}
                
                {/* Status indicator */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/70 px-3 py-1 rounded-full border border-white/30">
                  {footDetected ? 'Perfect Fit!' : 'Adjusting...'}
                </div>
              </div>
            </div>

            {/* Enhanced Instructions Panel */}
            <div className="absolute top-4 right-4 bg-black/70 text-white p-4 rounded-xl text-sm max-w-xs backdrop-blur-md border border-white/20">
              <div className="space-y-2">
                <div className="font-semibold text-blue-400 mb-2">AR Tips:</div>
                <p className="flex items-center gap-2">
                  <span className={footDetected ? 'text-green-400' : 'text-yellow-400'}>👟</span>
                  Keep feet in frame
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-400">📱</span>
                  Hold device steady
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-400">💡</span>
                  Good lighting helps
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-orange-400">🎯</span>
                  Try different angles
                </p>
              </div>
            </div>

            {/* Real-time metrics */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg text-xs backdrop-blur-md border border-white/20">
              <div className="space-y-1">
                <div>Detection: {footDetected ? '✓ Active' : '⌛ Scanning'}</div>
                <div>Quality: {arQuality === 'enhanced' ? 'HD' : 'Standard'}</div>
                <div>Position: {shoePosition.x.toFixed(0)}%, {shoePosition.y.toFixed(0)}%</div>
              </div>
            </div>
          </div>

          {/* Enhanced Camera Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 pointer-events-auto">
            <Button
              onClick={toggleARQuality}
              size="sm"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/20 backdrop-blur-md"
            >
              <Zap className="h-4 w-4 mr-1" />
              {arQuality === 'enhanced' ? 'HD' : 'STD'}
            </Button>
            
            <Button
              onClick={resetPosition}
              size="sm"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/20 backdrop-blur-md"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={onCapture}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-16 h-16 shadow-xl"
              disabled={!footDetected}
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
        </>
      )}

      {/* Enhanced Captured Photo Display */}
      {capturedImage && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/95 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="text-center space-y-6 max-w-2xl mx-auto p-6">
            <h3 className="text-2xl font-bold text-white mb-4">Perfect Shot! 📸</h3>
            <div className="relative">
              <img 
                src={capturedImage} 
                alt="Captured AR try-on"
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

export default ARCameraView;
