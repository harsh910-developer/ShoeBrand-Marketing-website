import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus, Camera, Ruler, GitCompare } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ARTryOnModal from "@/components/ARTryOnModal";
import ReviewSystem from "@/components/ReviewSystem";
import EnhancedARTryOn from "@/components/EnhancedARTryOn";
import SizeGuide from "@/components/SizeGuide";
import ProductComparison from "@/components/ProductComparison";

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
      description: "Preparing enhanced AR experience...",
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-red-500">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 mb-6 text-red-500 hover:text-red-600">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-green-500">NEW</Badge>
              )}
              {product.isSale && (
                <Badge className="absolute top-4 right-4 bg-red-500">SALE</Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-red-500">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Size</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSizeGuide(true)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Ruler className="h-4 w-4 mr-1" />
                  Size Guide
                </Button>
              </div>
              <div className="flex gap-2 mb-4">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size.toString())}
                    className={selectedSize === size.toString() ? "bg-red-500 hover:bg-red-600" : ""}
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
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
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
                disabled={!selectedSize || !product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                  onClick={handleTryOn}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Try-On with AR
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`border-purple-500 text-purple-500 hover:bg-purple-50 ${
                    isInComparison(product.id) ? 'bg-purple-50' : ''
                  }`}
                  onClick={handleAddToComparison}
                  disabled={isInComparison(product.id)}
                >
                  <GitCompare className="h-5 w-5 mr-2" />
                  {isInComparison(product.id) ? 'In Comparison' : 'Compare'}
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="lg" 
                className={`w-full ${isInWishlist(product.id) 
                  ? 'border-red-500 text-red-500 bg-red-50' 
                  : 'border-gray-300'
                }`}
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
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
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{relatedProduct.brand}</p>
                    <h3 className="font-semibold mb-2 group-hover:text-red-500 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-500">${relatedProduct.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Enhanced AR Try-On Modal */}
      <EnhancedARTryOn 
        isOpen={showARModal}
        onClose={() => setShowARModal(false)}
        productId={product.id}
        productName={product.name}
        productImage={product.images[0]}
      />

      {/* Size Guide Modal */}
      <SizeGuide 
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      {/* Product Comparison Modal */}
      <ProductComparison 
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
};

export default ProductDetail;
