
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, X, ShoppingCart } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { Link } from "react-router-dom";

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductComparison = ({ isOpen, onClose }: ProductComparisonProps) => {
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();

  if (comparisonProducts.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Comparison</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products to compare yet</p>
            <p className="text-sm text-gray-400">Add products to comparison from the product listings</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Compare Products ({comparisonProducts.length}/3)</DialogTitle>
          <Button variant="outline" size="sm" onClick={clearComparison}>
            Clear All
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisonProducts.map((product) => (
            <div key={product.id} className="relative border rounded-lg p-4 space-y-4">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 p-1"
                onClick={() => removeFromComparison(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="space-y-3">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded hover:opacity-80 transition-opacity"
                  />
                </Link>

                <div>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-500">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">Available Sizes:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Colors:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link to={`/product/${product.id}`} className="block">
                    <Button className="w-full bg-red-500 hover:bg-red-600" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {comparisonProducts.length < 3 && (
          <div className="text-center py-4 border-t">
            <p className="text-sm text-gray-500">
              You can compare up to 3 products. Add more products from the catalog.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparison;
