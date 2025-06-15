
import { useRecommendations } from "@/hooks/useRecommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface PersonalizedRecommendationsProps {
  browsedCategories?: string[];
  title?: string;
  subtitle?: string;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ 
  browsedCategories = [],
  title = "Recommended for You",
  subtitle = "Based on your browsing history and preferences"
}) => {
  const { recommendations, personalizedRecommendations, isLoading } = useRecommendations();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const allRecommendations = [...recommendations, ...personalizedRecommendations];

  if (allRecommendations.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
        {browsedCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {browsedCategories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRecommendations.slice(0, 6).map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <Link to={`/product/${product.id}`}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-red-500 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-500">${product.price}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="p-2 bg-red-500 hover:bg-red-600">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {allRecommendations.length > 6 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            View More Recommendations
          </Button>
        </div>
      )}
    </section>
  );
};

export default PersonalizedRecommendations;
