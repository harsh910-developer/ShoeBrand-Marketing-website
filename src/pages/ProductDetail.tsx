import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ARTryOnModal from "@/components/ARTryOnModal";
import ReviewSystem from "@/components/ReviewSystem";
import SizeGuide from "@/components/SizeGuide";
import ProductComparison from "@/components/ProductComparison";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductActions from "@/components/product/ProductActions";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductBreadcrumb from "@/components/product/ProductBreadcrumb";
import { Palette } from "lucide-react";
import StickyAddToCart from "@/components/product/StickyAddToCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showARModal, setShowARModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();

  // Product data array (fixed type issue for `originalPrice`)
  const products = [
    {
      id: 1,
      name: "Premium Sport Sneakers",
      price: 129.99,
      originalPrice: 159.99,
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&h=600&fit=crop"
      ],
      rating: 4.8,
      reviews: 234,
      category: "sneakers",
      brand: "StepStyle Pro",
      sizes: [8, 9, 10, 11, 12],
      colors: ["Black", "White", "Red"],
      isNew: true,
      isSale: true,
      description: "Experience ultimate comfort and style with our Premium Sport Sneakers. Featuring advanced cushioning technology and breathable materials, these sneakers are perfect for both athletic activities and casual wear.",
      features: [
        "Advanced cushioning technology",
        "Breathable mesh upper",
        "Durable rubber outsole",
        "Lightweight design",
        "Moisture-wicking lining"
      ],
      inStock: true
    },
    {
      id: 2,
      name: "Classic Leather Dress Shoes",
      price: 199.99,
      originalPrice: 239.99,  // <-- Added missing originalPrice here
      images: [
        "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=600&fit=crop"
      ],
      rating: 4.9,
      reviews: 156,
      category: "formal",
      brand: "StepStyle Elite",
      sizes: [8, 9, 10, 11],
      colors: ["Black", "Brown"],
      isNew: false,
      isSale: false,
      description: "Elevate your formal attire with these Classic Leather Dress Shoes. Crafted from premium leather with meticulous attention to detail, perfect for business meetings and special occasions.",
      features: [
        "Premium genuine leather",
        "Cushioned insole",
        "Non-slip sole",
        "Classic design",
        "Handcrafted quality"
      ],
      inStock: true
    }
  ];

  const currentProduct = products.find(p => p.id === parseInt(id || "1"));

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Show sticky bar only if not desktop (md) and product is in stock
  // It is only sticky on small screens; on desktop, users use regular button

  // Handle scroll to show sticky bar when default Add to Cart is out of view
  // Only on mobile
  // Use effect runs only in the browser
  const addToCartBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!addToCartBtnRef.current) return;
      const rect = addToCartBtnRef.current.getBoundingClientRect();
      // If bottom of the button is out of viewport (e.g., behind keyboard)
      setShowSticky(rect.bottom > window.innerHeight || rect.bottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
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

  const handleTryOn = () => {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb productName={currentProduct.name} />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery
            images={currentProduct.images}
            productName={currentProduct.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            isNew={currentProduct.isNew}
            isSale={currentProduct.isSale}
          />

          {/* Product Info and Actions */}
          <div className="space-y-8">
            <ProductInfo
              brand={currentProduct.brand}
              name={currentProduct.name}
              rating={currentProduct.rating}
              reviews={currentProduct.reviews}
              price={currentProduct.price}
              originalPrice={currentProduct.originalPrice}
              description={currentProduct.description}
              features={currentProduct.features}
            />
            <div>
              <ProductActions
                sizes={currentProduct.sizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onTryOn={handleTryOn}
                onAddToComparison={handleAddToComparison}
                onWishlistToggle={handleWishlistToggle}
                onShowSizeGuide={() => setShowSizeGuide(true)}
                isInWishlist={isInWishlist(currentProduct.id)}
                isInComparison={isInComparison(currentProduct.id)}
                inStock={currentProduct.inStock}
                price={currentProduct.price}
              />
              {/* Reference to Add to Cart for sticky logic (small screens) */}
              <button
                ref={addToCartBtnRef}
                style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0 }}
                tabIndex={-1}
                aria-hidden="true"
              />
            </div>
            {/* Customization Button */}
            <div className="pt-4 border-t">
              <Link to={`/customize/${currentProduct.id}`}>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  size="lg"
                >
                  <Palette className="h-5 w-5 mr-2" />
                  Customize This Shoe
                </Button>
              </Link>
              <p className="text-sm text-gray-600 text-center mt-2">
                Make it yours with personalized colors, materials, and text
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewSystem 
            productId={currentProduct.id}
            productName={currentProduct.name}
            averageRating={currentProduct.rating}
            totalReviews={currentProduct.reviews}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts products={products} currentProductId={currentProduct.id} />
      </div>

      <Footer />
      
      {/* Modals */}
      <ARTryOnModal 
        isOpen={showARModal}
        onClose={() => setShowARModal(false)}
        product={currentProduct}
      />

      <SizeGuide 
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <ProductComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />

      {/* Sticky Add To Cart (mobile only) */}
      <StickyAddToCart
        price={currentProduct.price}
        quantity={quantity}
        inStock={currentProduct.inStock}
        selectedSize={selectedSize}
        onAddToCart={handleAddToCart}
        isVisible={showSticky}
        isDisabled={false}
      />
    </div>
  );
};

export default ProductDetail;
