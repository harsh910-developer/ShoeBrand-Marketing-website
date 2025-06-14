
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

interface CapturedPhotoProps {
  capturedImage: string;
  onDownload: () => void;
  onShare: () => void;
}

const CapturedPhoto = ({ capturedImage, onDownload, onShare }: CapturedPhotoProps) => {
  return (
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
        <Button onClick={onDownload} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button onClick={onShare} variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default CapturedPhoto;
