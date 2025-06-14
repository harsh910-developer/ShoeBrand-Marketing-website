
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ARHeader from "./ar/ARHeader";
import ARModeSelector from "./ar/ARModeSelector";
import ProductPreview from "./ar/ProductPreview";
import CameraStarter from "./ar/CameraStarter";
import ARCameraView from "./ar/ARCameraView";
import CapturedPhoto from "./ar/CapturedPhoto";
import ARFeatureInfo from "./ar/ARFeatureInfo";
import { useARCamera } from "./ar/useARCamera";

interface EnhancedARTryOnProps {
  productId: number;
  productName: string;
  productImage: string;
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedARTryOn = ({ productId, productName, productImage, isOpen, onClose }: EnhancedARTryOnProps) => {
  const [arMode, setArMode] = useState<"preview" | "try-on">("preview");
  
  const {
    cameraActive,
    isLoading,
    capturedImage,
    videoRef,
    canvasRef,
    startCamera,
    capturePhoto
  } = useARCamera(isOpen, arMode);

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
        <ARHeader productName={productName} onClose={onClose} />
        
        <CardContent className="space-y-6">
          <ARModeSelector arMode={arMode} onModeChange={setArMode} />

          {arMode === "preview" ? (
            <ProductPreview productImage={productImage} productName={productName} />
          ) : (
            <div className="space-y-4">
              {!cameraActive ? (
                <CameraStarter 
                  productName={productName} 
                  isLoading={isLoading} 
                  onStart={startCamera} 
                />
              ) : (
                <>
                  <ARCameraView
                    productImage={productImage}
                    onCapture={capturePhoto}
                    onSwitchMode={() => setArMode("preview")}
                  />
                  
                  {capturedImage && (
                    <CapturedPhoto
                      capturedImage={capturedImage}
                      onDownload={downloadPhoto}
                      onShare={sharePhoto}
                    />
                  )}
                </>
              )}
            </div>
          )}

          <ARFeatureInfo />
        </CardContent>
        
        <canvas ref={canvasRef} className="hidden" />
      </Card>
    </div>
  );
};

export default EnhancedARTryOn;
