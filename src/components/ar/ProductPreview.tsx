
import { Badge } from "@/components/ui/badge";

interface ProductPreviewProps {
  productImage: string;
  productName: string;
}

const ProductPreview = ({ productImage, productName }: ProductPreviewProps) => {
  return (
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
  );
};

export default ProductPreview;
