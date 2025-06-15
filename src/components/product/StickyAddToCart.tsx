
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface StickyAddToCartProps {
  price: number;
  quantity: number;
  inStock: boolean;
  selectedSize: string;
  onAddToCart: () => void;
  isVisible: boolean;
  isDisabled?: boolean;
}

const StickyAddToCart = ({
  price,
  quantity,
  inStock,
  selectedSize,
  onAddToCart,
  isVisible,
  isDisabled = false,
}: StickyAddToCartProps) => {
  // Only show when visible
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-40 px-2 py-3 bg-white/95 shadow-[0_-2px_16px_-8px_rgba(0,0,0,0.06)] backdrop-blur flex justify-center items-center border-t border-gray-200 md:hidden"
    >
      <Button
        size="lg"
        className="w-full bg-red-500 hover:bg-red-600"
        disabled={!selectedSize || !inStock || isDisabled}
        onClick={onAddToCart}
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart - ${(price * quantity).toFixed(2)}
      </Button>
    </div>
  );
};

export default StickyAddToCart;
