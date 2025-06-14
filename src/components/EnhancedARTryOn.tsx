
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, RotateCcw, Download, Share2, Zap, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EnhancedARTryOnProps {
  productId: number;
  productName: string;
  productImage: string;
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedARTryOn = ({ productId, productName, productImage, isOpen, onClose }: EnhancedARTryOnProps) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [arMode, setArMode] = useState<"preview" | "try-on">("preview");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && arMode === "try-on") {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, arMode]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraActive(true);
      }

      toast({
        title: "Camera activated",
        description: "Point your camera at your feet to try on the shoes virtually.",
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use the AR try-on feature.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        toast({
          title: "Photo captured!",
          description: "Your AR try-on photo has been saved.",
        });
      }
    }
  };

  const downloadPhoto = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `ar-tryon-${productName}-${Date.now()}.png`;
      link.href = capturedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sharePhoto = async () => {
    if (capturedImage && navigator.share) {
      try {
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const file = new File([blob], `ar-tryon-${productName}.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `AR Try-On: ${productName}`,
          text: `Check out how ${productName} looks on me!`,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({
          title: "Sharing not supported",
          description: "Your browser doesn't support native sharing.",
          variant: "destructive",
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            AR Try-On: {productName}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <div className="flex gap-2">
            <Button
              variant={arMode === "preview" ? "default" : "outline"}
              onClick={() => setArMode("preview")}
              className={arMode === "preview" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              Product Preview
            </Button>
            <Button
              variant={arMode === "try-on" ? "default" : "outline"}
              onClick={() => setArMode("try-on")}
              className={arMode === "try-on" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              Live AR Try-On
            </Button>
          </div>

          {arMode === "preview" ? (
            /* Product Preview Mode */
            <div className="space-y-4">
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 text-center">
                <img 
                  src={productImage} 
                  alt={productName}
                  className="w-64 h-64 object-cover mx-auto rounded-lg shadow-lg"
                />
                <div className="mt-4">
                  <Badge className="bg-blue-500">360° View Available</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Virtual Fitting</h4>
                  <p className="text-sm text-gray-600">See how the shoes look from different angles</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Size Visualization</h4>
                  <p className="text-sm text-gray-600">Get a better sense of proportions and fit</p>
                </div>
              </div>
            </div>
          ) : (
            /* AR Try-On Mode */
            <div className="space-y-4">
              {!cameraActive ? (
                <div className="text-center space-y-4 py-8">
                  <Camera className="h-16 w-16 mx-auto text-gray-400" />
                  <h3 className="text-xl font-semibold">Start AR Try-On Experience</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Enable your camera to virtually try on {productName}. Point your camera at your feet for the best experience.
                  </p>
                  <Button 
                    onClick={() => startCamera()} 
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {isLoading ? "Starting Camera..." : "Enable Camera"}
                  </Button>
                </div>
              ) : (
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
                    <Button onClick={capturePhoto} className="bg-red-500 hover:bg-red-600">
                      <Camera className="h-4 w-4 mr-2" />
                      Capture
                    </Button>
                    <Button variant="outline" onClick={() => setArMode("preview")}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Switch Mode
                    </Button>
                  </div>

                  {/* Captured Photo */}
                  {capturedImage && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Your AR Try-On Photo:</h4>
                      <div className="relative inline-block">
                        <img 
                          src={capturedImage} 
                          alt="Captured AR try-on"
                          className="w-full max-w-md rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={downloadPhoto} variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button onClick={sharePhoto} variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AR Features Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">AR Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Real-time virtual shoe placement</li>
              <li>• Size comparison and fit visualization</li>
              <li>• Multiple angle viewing</li>
              <li>• Photo capture and sharing</li>
            </ul>
          </div>
        </CardContent>
        
        <canvas ref={canvasRef} className="hidden" />
      </Card>
    </div>
  );
};

export default EnhancedARTryOn;
