
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, X } from "lucide-react";

interface ARHeaderProps {
  productName: string;
  onClose: () => void;
}

const ARHeader = ({ productName, onClose }: ARHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-500" />
        AR Try-On: {productName}
      </CardTitle>
      <Button variant="ghost" size="sm" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </CardHeader>
  );
};

export default ARHeader;
