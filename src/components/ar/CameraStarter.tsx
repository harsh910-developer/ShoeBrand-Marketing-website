
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CameraStarterProps {
  productName: string;
  isLoading: boolean;
  onStart: () => void;
}

const CameraStarter = ({ productName, isLoading, onStart }: CameraStarterProps) => {
  return (
    <div className="text-center space-y-4 py-8">
      <Camera className="h-16 w-16 mx-auto text-gray-400" />
      <h3 className="text-xl font-semibold">Start AR Try-On Experience</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Enable your camera to virtually try on {productName}. Point your camera at your feet for the best experience.
      </p>
      <Button 
        onClick={onStart} 
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600"
      >
        {isLoading ? "Starting Camera..." : "Enable Camera"}
      </Button>
    </div>
  );
};

export default CameraStarter;
