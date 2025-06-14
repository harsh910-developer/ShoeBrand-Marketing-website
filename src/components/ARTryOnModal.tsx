
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, X, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useARModal } from './ar-modal/useARModal';
import EnhancedARCameraView from './ar-modal/EnhancedARCameraView';
import ARControlPanel from './ar-modal/ARControlPanel';

interface Product {
  id: number;
  name: string;
  images: string[];
  brand: string;
  sizes?: number[];
}

interface ARTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ARTryOnModal = ({ isOpen, onClose, product }: ARTryOnModalProps) => {
  const {
    isARActive,
    cameraStream,
    hasCamera,
    shoeColor,
    videoRef,
    startAR,
    stopAR,
    resetView,
    setShoeColor,
    capturedImage,
    capturePhoto
  } = useARModal();

  const handleClose = () => {
    stopAR();
    onClose();
  };

  // Default sizes if not provided
  const availableSizes = product.sizes || [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
  const [selectedSize, setSelectedSize] = useState(9);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl h-[95vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Camera className="h-6 w-6 text-blue-500" />
              Enhanced AR Try-On: {product.name}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 p-6 h-full">
          {/* Enhanced AR Display */}
          <div className="flex-1 relative">
            {hasCamera ? (
              <EnhancedARCameraView
                isActive={isARActive}
                videoRef={videoRef}
                productImage={product.images[0]}
                shoeColor={shoeColor}
                onStartAR={startAR}
                onStopAR={stopAR}
                onCapture={capturePhoto}
                capturedImage={capturedImage}
                availableSizes={availableSizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Camera Not Available</h3>
                <p className="text-gray-500 text-center max-w-md">
                  Your device doesn't support camera access or you haven't granted permission. 
                  Please enable camera access to use the enhanced AR try-on feature.
                </p>
              </div>
            )}
          </div>

          {/* Control Panel */}
          <ARControlPanel
            product={product}
            shoeColor={shoeColor}
            onColorChange={setShoeColor}
            isARActive={isARActive}
            hasCamera={hasCamera}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARTryOnModal;
