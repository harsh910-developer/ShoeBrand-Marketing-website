
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  isNew: boolean;
  isSale: boolean;
}

interface FeaturedCarouselProps {
  products: Product[];
}

const FeaturedCarousel = ({ products }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Badge className="bg-red-50 text-red-600 border-red-200 mb-2">Featured</Badge>
          <h2 className="text-3xl font-bold text-gray-900">Hot Deals</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="rounded-full p-2 hover:bg-red-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="rounded-full p-2 hover:bg-red-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-red-600 shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full flex-shrink-0">
              <div className="flex flex-col lg:flex-row items-center p-8 lg:p-12 min-h-[400px]">
                {/* Product Info */}
                <div className="flex-1 text-white mb-8 lg:mb-0 lg:pr-12 text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start gap-2 mb-4">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white border-0">NEW</Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-yellow-500 text-black border-0">SALE</Badge>
                    )}
                  </div>
                  
                  <p className="text-red-200 mb-2 text-sm font-medium">{product.brand}</p>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{product.name}</h3>
                  
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-2 text-white font-medium">{product.rating}</span>
                    <span className="ml-2 text-red-200">({product.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                    <span className="text-4xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-red-200 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold shadow-lg">
                    <Link to={`/product/${product.id}`}>
                      Shop Now
                    </Link>
                  </Button>
                </div>

                {/* Product Image */}
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-150"></div>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-red-500 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
