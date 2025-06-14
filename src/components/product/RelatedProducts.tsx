
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  brand: string;
  rating: number;
}

interface RelatedProductsProps {
  products: Product[];
  currentProductId: number;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
            <Link to={`/product/${product.id}`}>
              <div className="relative overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold mb-2 group-hover:text-red-500 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-500">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
