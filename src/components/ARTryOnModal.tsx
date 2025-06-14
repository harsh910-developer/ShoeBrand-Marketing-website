
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import ARDisplay from './ar-modal/ARDisplay';
import ARControls from './ar-modal/ARControls';
import { useARModal } from './ar-modal/useARModal';

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

const ARTryOnModal = ({ isOpen, onClose, product }: ARTryOnModalProps) => {
  const {
    isARActive,
    cameraStream,
    hasCamera,
    shoeColor,
    startAR,
    stopAR,
    resetView,
    setShoeColor
  } = useARModal();

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
          <ARDisplay
            isARActive={isARActive}
            cameraStream={cameraStream}
            shoeColor={shoeColor}
            onResetView={resetView}
          />

          <ARControls
            hasCamera={hasCamera}
            isARActive={isARActive}
            shoeColor={shoeColor}
            product={product}
            onStartAR={startAR}
            onStopAR={stopAR}
            onColorChange={setShoeColor}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARTryOnModal;
