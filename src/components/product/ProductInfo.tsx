
import { Star } from "lucide-react";

interface ProductInfoProps {
  brand: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
}

const ProductInfo = ({
  brand,
  name,
  rating,
  reviews,
  price,
  originalPrice,
  description,
  features
}: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">{brand}</p>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-medium">{rating}</span>
          </div>
          <span className="text-gray-500">({reviews} reviews)</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold text-red-500">${price}</span>
          {originalPrice && (
            <span className="text-xl text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Features</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
