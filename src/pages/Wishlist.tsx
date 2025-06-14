
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Trash2, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: "10", // Default size - in a real app, user would select
      brand: item.brand,
    });
    
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
    
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length === 0 
              ? "Your wishlist is empty. Start adding your favorite shoes!"
              : `You have ${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'} in your wishlist`
            }
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Discover amazing shoes and save your favorites here</p>
            <Link to="/products">
              <Button className="bg-red-500 hover:bg-red-600">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-red-500 transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                      <span className="ml-1 text-sm text-gray-500">({item.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-red-500">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      size="sm" 
                      className="w-full bg-red-500 hover:bg-red-600"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${item.id}`} className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
