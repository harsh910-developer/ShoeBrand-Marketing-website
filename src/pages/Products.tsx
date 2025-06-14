
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Products = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: "",
    size: [],
    brand: [],
    color: []
  });

  const products = [
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

  const categories = [
    { id: "sneakers", label: "Sneakers" },
    { id: "formal", label: "Formal Shoes" },
    { id: "casual", label: "Casual Shoes" }
  ];

  const brands = ["StepStyle", "StepStyle Pro", "StepStyle Elite"];
  const sizes = [7, 8, 9, 10, 11, 12, 13];
  const colors = ["Black", "White", "Brown", "Red", "Blue", "Navy", "Gray"];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of premium men's shoes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox id={category.id} />
                      <label htmlFor={category.id} className="text-sm cursor-pointer">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-100">$0 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200-300">$200 - $300</SelectItem>
                    <SelectItem value="300+">$300+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={brand} />
                      <label htmlFor={brand} className="text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Button key={size} variant="outline" size="sm" className="h-8">
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{products.length} products found</p>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
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
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="secondary" className="p-2" onClick={(e) => e.preventDefault()}>
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={(e) => e.preventDefault()}>
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
