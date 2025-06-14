
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Compare, X } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";

const ComparisonBar = () => {
  const { 
    comparisonProducts, 
    removeFromComparison, 
    setIsComparisonOpen,
    isComparisonOpen 
  } = useComparison();

  if (comparisonProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Compare className="h-5 w-5" />
            <span className="font-medium">Compare Products</span>
            <Badge variant="secondary">{comparisonProducts.length}/3</Badge>
          </div>
          
          <div className="flex gap-2">
            {comparisonProducts.map((product) => (
              <div key={product.id} className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded border"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -top-2 -right-2 p-1 h-6 w-6 bg-red-500 hover:bg-red-600 text-white rounded-full"
                  onClick={() => removeFromComparison(product.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => setIsComparisonOpen(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          Compare Now
        </Button>
      </div>
    </div>
  );
};

export default ComparisonBar;
