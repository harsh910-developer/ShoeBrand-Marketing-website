
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, X, ShoppingCart, LayoutGrid, Table, List } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";
import { Link } from "react-router-dom";
import ComparisonTableView from "./comparison/ComparisonTableView";
import ComparisonManager from "./comparison/ComparisonManager";

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductComparison = ({ isOpen, onClose }: ProductComparisonProps) => {
  const { 
    comparisonProducts, 
    removeFromComparison, 
    clearComparison,
    currentView,
    setCurrentView 
  } = useComparison();

  // Add enhanced product data for demo
  const enhancedProducts = comparisonProducts.map(product => ({
    ...product,
    material: product.id === 1 ? 'Synthetic Mesh' : product.id === 2 ? 'Genuine Leather' : 'Canvas',
    durability: product.id === 1 ? 8 : product.id === 2 ? 9 : 7,
    comfort: product.id === 1 ? 9 : product.id === 2 ? 7 : 8,
    style: product.id === 1 ? 'Athletic' : product.id === 2 ? 'Formal' : 'Casual',
    waterproof: product.id === 1 ? true : false,
    weight: product.id === 1 ? 280 : product.id === 2 ? 420 : 320,
  }));

  if (enhancedProducts.length === 0) {
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

  const renderCardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {enhancedProducts.map((product) => (
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
                <span className="font-medium">Material:</span>
                <span className="ml-2">{product.material}</span>
              </div>
              <div>
                <span className="font-medium">Comfort:</span>
                <span className="ml-2">{product.comfort}/10</span>
              </div>
              <div>
                <span className="font-medium">Durability:</span>
                <span className="ml-2">{product.durability}/10</span>
              </div>
              <div>
                <span className="font-medium">Weight:</span>
                <span className="ml-2">{product.weight}g</span>
              </div>
              <div>
                <span className="font-medium">Waterproof:</span>
                <Badge variant={product.waterproof ? "default" : "secondary"} className="ml-2 text-xs">
                  {product.waterproof ? "Yes" : "No"}
                </Badge>
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
  );

  const viewOptions = [
    { id: 'cards', label: 'Cards', icon: LayoutGrid },
    { id: 'table', label: 'Table', icon: Table },
    { id: 'detailed', label: 'Detailed', icon: List },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Compare Products ({enhancedProducts.length}/3)</DialogTitle>
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-1 border rounded p-1">
              {viewOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant={currentView === option.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView(option.id as any)}
                    className="px-3"
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
            
            {/* Comparison Manager */}
            <ComparisonManager />
            
            <Button variant="outline" size="sm" onClick={clearComparison}>
              Clear All
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {currentView === 'cards' && renderCardView()}
          {currentView === 'table' && (
            <ComparisonTableView 
              products={enhancedProducts}
              onRemoveProduct={removeFromComparison}
            />
          )}
          {currentView === 'detailed' && renderCardView()} {/* For now, use card view */}
        </div>

        {enhancedProducts.length < 3 && (
          <div className="text-center py-4 border-t mt-6">
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
