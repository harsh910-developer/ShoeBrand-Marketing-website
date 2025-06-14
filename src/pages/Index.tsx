
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ShoppingCart, Heart, Sparkles, TrendingUp, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Sport Sneakers",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      brand: "StepStyle Pro",
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: "Classic Leather Dress Shoes",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 156,
      brand: "StepStyle Elite",
      isNew: false,
      isSale: false
    },
    {
      id: 3,
      name: "Casual Canvas Sneakers",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 89,
      brand: "StepStyle",
      isNew: true,
      isSale: false
    },
    {
      id: 4,
      name: "Athletic Running Shoes",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 312,
      brand: "StepStyle Pro",
      isNew: false,
      isSale: true
    }
  ];

  const categories = [
    {
      name: "Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      count: "120+ Styles",
      description: "Athletic & Casual"
    },
    {
      name: "Formal Shoes",
      image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=300&h=300&fit=crop",
      count: "85+ Styles",
      description: "Business & Dress"
    },
    {
      name: "Casual Shoes",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
      count: "95+ Styles",
      description: "Everyday Comfort"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Crafted from the finest materials"
    },
    {
      icon: TrendingUp,
      title: "Latest Trends",
      description: "Stay ahead with newest styles"
    },
    {
      icon: Sparkles,
      title: "AR Try-On",
      description: "Experience before you buy"
    }
  ];

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
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

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="text-center text-white">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 mb-6 px-4 py-2 text-sm font-medium">
              🔥 New Collection Available
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Step Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed">
              Discover premium branded shoes crafted for the modern lifestyle. Where style meets comfort in every step you take.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link to="/products">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 rounded-full border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                <Link to="/ar-try-on">
                  Try AR Experience
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="h-8 w-8 mx-auto mb-2 text-red-400" />
                  <h3 className="font-semibold text-sm text-white">{feature.title}</h3>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <FeaturedCarousel products={featuredProducts} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-red-50 text-red-600 border-red-200 mb-4">Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Shop by Style</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover your perfect pair from our curated collections</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <Badge className="bg-white/20 text-white border-white/30 mb-3 backdrop-blur-sm">
                      {category.count}
                    </Badge>
                    <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90">{category.description}</p>
                  </div>
                  <Button 
                    className="absolute bottom-6 right-6 bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    size="sm"
                  >
                    Explore
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-red-50 text-red-600 border-red-200 mb-4">Featured</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Trending Now</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handpicked selections from our premium collection</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white border-0 shadow-lg">
                        NEW
                      </Badge>
                    )}
                    {product.isSale && (
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0 shadow-lg">
                        SALE
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-500 mb-2 font-medium">{product.brand}</p>
                    <h3 className="font-bold text-lg mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
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
                        <span className="text-2xl font-bold text-red-500">${product.price}</span>
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
                    className="bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg" 
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full px-8 py-3 transition-all duration-300">
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AR Feature Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-red-500 text-white mb-6 px-4 py-2">Revolutionary Technology</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Try Before You Buy</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience our revolutionary AR technology that lets you virtually try on shoes from the comfort of your home. See how they look and fit before making your purchase.
            </p>
            
            <div className="bg-white rounded-3xl p-12 shadow-2xl mb-12 transform hover:scale-105 transition-transform duration-300">
              <div className="text-8xl mb-6">👟</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">AR Try-On Experience</h3>
              <p className="text-gray-600 mb-8 text-lg">Step into the future of online shopping with immersive AR visualization</p>
              <Button asChild size="lg" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full px-8 py-4 shadow-lg">
                <Link to="/ar-try-on">
                  Start AR Experience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
