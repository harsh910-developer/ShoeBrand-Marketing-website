
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useComparison } from "@/contexts/ComparisonContext";

export function useProductActions(currentProduct: any, quantity: number, setQuantity: (n: number) => void, selectedSize: string) {
  const { addToCart, setIsCartOpen, saveForLater } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.images[0],
        size: selectedSize,
        brand: currentProduct.brand,
      });
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} ${currentProduct.name} (Size ${selectedSize}) added to your cart.`,
    });
    setIsCartOpen(true);
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      originalPrice: currentProduct.originalPrice,
      image: currentProduct.images[0],
      brand: currentProduct.brand,
      rating: currentProduct.rating,
      reviews: currentProduct.reviews,
    };

    if (isInWishlist(currentProduct.id)) {
      removeFromWishlist(currentProduct.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleTryOn = (setShowARModal: (show: boolean) => void) => {
    setShowARModal(true);
    toast({
      title: "AR Try-On Loading",
      description: "Preparing your AR experience...",
    });
  };

  const handleAddToComparison = () => {
    const comparisonProduct = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      originalPrice: currentProduct.originalPrice,
      image: currentProduct.images[0],
      rating: currentProduct.rating,
      reviews: currentProduct.reviews,
      brand: currentProduct.brand,
      category: currentProduct.category,
      sizes: currentProduct.sizes,
      colors: currentProduct.colors,
    };

    addToComparison(comparisonProduct);
    toast({
      title: "Added to comparison",
      description: `${currentProduct.name} has been added to comparison.`,
    });
  };

  return {
    handleQuantityChange,
    handleAddToCart,
    handleWishlistToggle,
    handleTryOn,
    handleAddToComparison,
    isInWishlist: isInWishlist(currentProduct.id),
    isInComparison: isInComparison(currentProduct.id),
    saveForLater,
  };
}
