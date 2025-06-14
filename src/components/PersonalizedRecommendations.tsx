
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
}

interface PersonalizedRecommendationsProps {
  title?: string;
  subtitle?: string;
  browsedCategories?: string[];
  recentlyViewed?: number[];
  purchaseHistory?: string[];
}

const PersonalizedRecommendations = ({ 
  title = "Recommended Just For You",
  subtitle = "Based on your style preferences and browsing history",
  browsedCategories = ["sneakers", "casual"],
  recentlyViewed = [],
  purchaseHistory = []
}: PersonalizedRecommendationsProps) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  // AI-generated recommendations based on user behavior
  const getPersonalizedProducts = (): Product[] => {
    const allProducts: Product[] = [
      {
        id: 5,
        name: "Urban Street Sneakers",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 156,
        brand: "StepStyle Urban",
        category: "sneakers"
      },
      {
        id: 6,
        name: "Comfort Walking Shoes",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 203,
        brand: "StepStyle Comfort",
        category: "casual"
      },
      {
        id: 7,
        name: "Performance Running Pro",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 89,
        brand: "StepStyle Pro",
        category: "athletic"
      },
      {
        id: 8,
        name: "Classic Leather Loafers",
        price: 139.99,
        originalPrice: 179.99,
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 124,
        brand: "StepStyle Elite",
        category: "formal"
      }
    ];

    // Simple AI-like filtering based on browsed categories
    return allProducts.filter(product => 
      browsedCategories.some(category => 
        product.category.includes(category) || 
        product.name.toLowerCase().includes(category)
      )
    ).slice(0, 4);
  };

  const recommendedProducts = getPersonalizedProducts();

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
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

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "10",
      brand: product.brand,
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
    
    setIsCartOpen(true);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Powered
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        {recommendedProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 shadow-lg">
                        SALE
                      </Badge>
                    )}
                    <Badge className="absolute top-3 right-3 bg-purple-500 text-white border-0 shadow-lg">
                      FOR YOU
                    </Badge>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-500 mb-2 font-medium">{product.brand}</p>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-purple-500 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Link>
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button 
                    size="sm" 
                    variant="secondary" 
                    className={`p-2 rounded-full shadow-lg backdrop-blur-sm ${
                      isInWishlist(product.id) 
                        ? 'bg-red-100 hover:bg-red-200' 
                        : 'bg-white/90 hover:bg-white'
                    }`}
                    onClick={(e) => handleWishlistToggle(product, e)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-purple-500 hover:bg-purple-600 p-2 rounded-full shadow-lg" 
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Building Your Profile</h3>
            <p className="text-gray-500">Browse our collection to get personalized recommendations!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;
