
import { useState } from "react";
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

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showARModal, setShowARModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison } = useComparison();

  // Mock product data - in a real app, this would come from an API
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

  const product = products.find(p => p.id === parseInt(id || "1"));

  if (!product) {
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
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        brand: product.brand,
      });
    }

    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.name} (Size ${selectedSize}) added to your cart.`,
    });

    setIsCartOpen(true);
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      brand: product.brand,
      rating: product.rating,
      reviews: product.reviews,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
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
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      rating: product.rating,
      reviews: product.reviews,
      brand: product.brand,
      category: product.category,
      sizes: product.sizes,
      colors: product.colors,
    };

    addToComparison(comparisonProduct);
    toast({
      title: "Added to comparison",
      description: `${product.name} has been added to comparison.`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <ProductBreadcrumb productName={product.name} />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductImageGallery
            images={product.images}
            productName={product.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            isNew={product.isNew}
            isSale={product.isSale}
          />

          {/* Product Info and Actions */}
          <div className="space-y-8">
            <ProductInfo
              brand={product.brand}
              name={product.name}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
              originalPrice={product.originalPrice}
              description={product.description}
              features={product.features}
            />

            <ProductActions
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
              onTryOn={handleTryOn}
              onAddToComparison={handleAddToComparison}
              onWishlistToggle={handleWishlistToggle}
              onShowSizeGuide={() => setShowSizeGuide(true)}
              isInWishlist={isInWishlist(product.id)}
              isInComparison={isInComparison(product.id)}
              inStock={product.inStock}
              price={product.price}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewSystem 
            productId={product.id}
            productName={product.name}
            averageRating={product.rating}
            totalReviews={product.reviews}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts products={products} currentProductId={product.id} />
      </div>

      <Footer />
      
      {/* Modals */}
      <ARTryOnModal 
        isOpen={showARModal}
        onClose={() => setShowARModal(false)}
        product={product}
      />

      <SizeGuide 
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <ProductComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default ProductDetail;
