import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Camera, Ruler, GitCompare, Plus, Minus } from "lucide-react";

interface ProductActionsProps {
  sizes: number[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  quantity: number;
  onQuantityChange: (change: number) => void;
  onAddToCart: () => void;
  onTryOn: () => void;
  onAddToComparison: () => void;
  onWishlistToggle: () => void;
  onShowSizeGuide: () => void;
  isInWishlist: boolean;
  isInComparison: boolean;
  inStock: boolean;
  price: number;
  onSaveForLater?: (item: any) => void;
}

const ProductActions = ({
  sizes,
  selectedSize,
  onSizeSelect,
  quantity,
  onQuantityChange,
  onAddToCart,
  onTryOn,
  onAddToComparison,
  onWishlistToggle,
  onShowSizeGuide,
  isInWishlist,
  isInComparison,
  inStock,
  price,
  onSaveForLater
}: ProductActionsProps) => {
  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Size</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onShowSizeGuide}
            className="text-red-500 border-red-400 hover:bg-red-50 font-semibold"
          >
            <Ruler className="h-4 w-4 mr-1" />
            Size Guide
          </Button>
        </div>
        <div className="flex gap-2 mb-4">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size.toString() ? "default" : "outline"}
              size="sm"
              onClick={() => onSizeSelect(size.toString())}
              className={selectedSize === size.toString() ? "bg-red-500 hover:bg-red-600 border-red-500 text-white" : ""}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium w-8 text-center">{quantity}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onQuantityChange(1)}
            disabled={quantity >= 10}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          size="lg" 
          className="w-full bg-red-500 hover:bg-red-600"
          disabled={!selectedSize || !inStock}
          onClick={onAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart - ${(price * quantity).toFixed(2)}
        </Button>
        {/* NEW: Save for Later Button (only show if size selected & not in cart) */}
        {onSaveForLater && selectedSize && (
          <Button
            size="lg"
            variant="outline"
            className="w-full border-blue-500 text-blue-500"
            onClick={() => onSaveForLater({
              id: null, // Will pass current product details from parent in future step
              name: null,
              price: null,
              image: null,
              size: selectedSize,
              brand: null,
            })}
          >
            Save for Later
          </Button>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600"
            onClick={onTryOn}
          >
            <Camera className="h-5 w-5 mr-2" />
            Try-On with AR
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className={`border-purple-500 text-purple-500 hover:bg-purple-50 ${
              isInComparison ? 'bg-purple-50' : ''
            }`}
            onClick={onAddToComparison}
            disabled={isInComparison}
          >
            <GitCompare className="h-5 w-5 mr-2" />
            {isInComparison ? 'In Comparison' : 'Compare'}
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="lg" 
          className={`w-full ${isInWishlist 
            ? 'border-red-500 text-red-500 bg-red-50' 
            : 'border-gray-300'
          }`}
          onClick={onWishlistToggle}
        >
          <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? 'fill-red-500' : ''}`} />
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  );
};

export default ProductActions;
