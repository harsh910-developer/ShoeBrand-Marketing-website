
import { useRecommendations } from "@/hooks/useRecommendations";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const PersonalizedRecommendations = () => {
  const { user, profile } = useAuth();
  const { recommendations, personalizedRecommendations, isLoading } = useRecommendations();

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Sign in for personalized recommendations</h3>
          <p className="text-gray-600 mb-4">Get product suggestions based on your preferences and browsing history.</p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading recommendations...</div>;
  }

  const renderProductCard = (product: any) => (
    <Card key={product.id} className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{product.brand}</Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">${product.price}</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {profile?.preferred_brands?.length && recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Based on Your Favorite Brands</h2>
          <p className="text-gray-600 mb-6">
            Recommendations from {profile.preferred_brands.join(", ")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map(renderProductCard)}
          </div>
        </div>
      )}

      {profile?.shoe_size && personalizedRecommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Perfect Fit for Size {profile.shoe_size}</h2>
          <p className="text-gray-600 mb-6">
            Shoes specifically curated for your size
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {personalizedRecommendations.map(renderProductCard)}
          </div>
        </div>
      )}

      {(!profile?.preferred_brands?.length && !profile?.shoe_size) && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile for Better Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Add your favorite brands and shoe size to get personalized product recommendations.
            </p>
            <Link to="/profile">
              <Button>Update Profile</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {recommendations.length === 0 && personalizedRecommendations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Start shopping to get recommendations</h3>
            <p className="text-gray-600 mb-4">
              Browse products to help us understand your preferences and show you relevant recommendations.
            </p>
            <Link to="/products">
              <Button>Explore Products</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
