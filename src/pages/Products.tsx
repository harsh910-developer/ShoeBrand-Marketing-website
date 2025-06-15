import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, GitCompare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearch } from "@/contexts/SearchContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { useProductFilter, Product } from "@/hooks/useProductFilter";
import { useProductFilters } from "@/hooks/useProductFilters";
import ProductFilters from "@/components/ProductFilters";
import ProductComparison from "@/components/ProductComparison";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const { searchQuery } = useSearch();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison, setIsComparisonOpen, isComparisonOpen } = useComparison();

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Sport Sneakers",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      category: "sneakers",
      brand: "StepStyle Pro",
      sizes: [8, 9, 10, 11, 12],
      colors: ["Black", "White", "Red"],
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
      category: "formal",
      brand: "StepStyle Elite",
      sizes: [8, 9, 10, 11],
      colors: ["Black", "Brown"],
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
      category: "casual",
      brand: "StepStyle",
      sizes: [7, 8, 9, 10, 11, 12],
      colors: ["Navy", "White", "Gray"],
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
      category: "sneakers",
      brand: "StepStyle Pro",
      sizes: [8, 9, 10, 11, 12, 13],
      colors: ["Black", "Blue", "White"],
      isNew: false,
      isSale: true
    },
    {
      id: 5,
      name: "Leather Loafers",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 67,
      category: "formal",
      brand: "StepStyle Elite",
      sizes: [8, 9, 10, 11],
      colors: ["Brown", "Black"],
      isNew: false,
      isSale: false
    },
    {
      id: 6,
      name: "High-Top Sneakers",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 145,
      category: "sneakers",
      brand: "StepStyle",
      sizes: [7, 8, 9, 10, 11],
      colors: ["White", "Black", "Red"],
      isNew: true,
      isSale: false
    }
  ];

  // First apply search filter, then apply other filters
  const searchFilteredProducts = useProductFilter(products, searchQuery);
  const { 
    filters, 
    filteredProducts, 
    updateFilter, 
    toggleArrayFilter, 
    clearFilters 
  } = useProductFilters(searchFilteredProducts);

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

  const handleComparisonToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInComparison(product.id)) {
      return; // Already in comparison
    }

    const comparisonProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-gray-600">
            {searchQuery 
              ? `Found ${filteredProducts.length} products matching your search`
              : "Discover our complete collection of premium men's shoes"
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <ProductFilters
              filters={filters}
              onUpdateFilter={updateFilter}
              onToggleArrayFilter={toggleArrayFilter}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredProducts.length} products found</p>
              <Select defaultValue="popularity">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Sort by Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-green-500">NEW</Badge>
                        )}
                        {product.isSale && (
                          <Badge className="absolute top-2 right-2 bg-red-500">SALE</Badge>
                        )}
                        {/* Quick actions on hover overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/10">
                          <div className="w-full flex gap-2 mb-2 justify-center">
                            <Button 
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={e => { e.preventDefault(); }}
                            >
                              Add to Cart
                            </Button>
                            <Button 
                              asChild
                              size="sm"
                              variant="secondary"
                              className="hover:bg-slate-100"
                            >
                              <Link to={`/product/${product.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
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
                        </div>
                        <div className="mt-3">
                          <p className="text-xs text-gray-500">Available sizes: {product.sizes.join(", ")}</p>
                        </div>
                      </CardContent>
                    </Link>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {/* Wishlist Button */}
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className={`p-2 ${
                          isInWishlist(product.id) 
                            ? 'bg-red-100 hover:bg-red-200' 
                            : 'bg-white/90 hover:bg-white'
                        }`}
                        onClick={(e) => handleWishlistToggle(product, e)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </Button>
                      
                      {/* Comparison Button */}
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className={`p-2 ${
                          isInComparison(product.id) 
                            ? 'bg-purple-100 hover:bg-purple-200' 
                            : 'bg-white/90 hover:bg-white'
                        }`}
                        onClick={(e) => handleComparisonToggle(product, e)}
                        disabled={isInComparison(product.id)}
                      >
                        <GitCompare className={`h-4 w-4 ${isInComparison(product.id) ? 'text-purple-500' : 'text-gray-600'}`} />
                      </Button>
                    </div>
                    
                    {/* Quick Add to Cart Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={(e) => e.preventDefault()}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Product Comparison Modal */}
      <ProductComparison 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </div>
  );
};

export default Products;
