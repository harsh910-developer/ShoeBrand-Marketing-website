
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, ShoppingCart, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";

const Index = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Sport Sneakers",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
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
      isNew: false,
      isSale: true
    }
  ];

  const categories = [
    {
      name: "Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      count: "120+ Styles"
    },
    {
      name: "Formal Shoes",
      image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=300&h=300&fit=crop",
      count: "85+ Styles"
    },
    {
      name: "Casual Shoes",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
      count: "95+ Styles"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Step Into <span className="text-red-500">Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover premium branded shoes crafted for the modern man. Style meets comfort in every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-lg px-8 py-3">
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/ar-try-on">
                Try AR Feature
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-lg">{category.count}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked selections from our premium collection</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      NEW
                    </span>
                  )}
                  {product.isSale && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      SALE
                    </span>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-red-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-red-500">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AR Feature Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Try Before You Buy</h2>
            <p className="text-lg text-gray-600 mb-8">
              Experience our revolutionary AR technology that lets you virtually try on shoes from the comfort of your home.
            </p>
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-8 mb-8">
              <div className="text-6xl mb-4">👟</div>
              <h3 className="text-2xl font-semibold mb-4">AR Try-On Feature</h3>
              <p className="text-gray-600 mb-6">Coming Soon - Revolutionary virtual fitting experience</p>
              <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
                <Link to="/ar-try-on">
                  Learn More
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
