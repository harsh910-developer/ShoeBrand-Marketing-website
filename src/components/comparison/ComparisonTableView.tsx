
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, X, ShoppingCart, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ComparisonProduct } from "@/contexts/ComparisonContext";
import { Link } from "react-router-dom";

interface ComparisonTableViewProps {
  products: ComparisonProduct[];
  onRemoveProduct: (productId: number) => void;
}

const ComparisonTableView = ({ products, onRemoveProduct }: ComparisonTableViewProps) => {
  if (products.length === 0) return null;

  const getBestValue = (key: keyof ComparisonProduct, type: 'lowest' | 'highest' = 'lowest') => {
    const values = products.map(p => p[key] as number).filter(v => v !== undefined);
    if (values.length === 0) return null;
    return type === 'lowest' ? Math.min(...values) : Math.max(...values);
  };

  const getPercentageDiff = (value: number, baseValue: number) => {
    if (!baseValue) return 0;
    return ((value - baseValue) / baseValue) * 100;
  };

  const lowestPrice = getBestValue('price', 'lowest');
  const highestRating = getBestValue('rating', 'highest');
  const highestComfort = getBestValue('comfort', 'highest');
  const highestDurability = getBestValue('durability', 'highest');

  const renderValueWithIndicator = (value: number, bestValue: number | null, type: 'lowest' | 'highest' = 'lowest') => {
    if (bestValue === null) return value;
    
    const isBest = type === 'lowest' ? value === bestValue : value === bestValue;
    const diff = type === 'lowest' && bestValue ? getPercentageDiff(value, bestValue) : 0;
    
    return (
      <div className="flex items-center gap-2">
        <span className={isBest ? 'font-bold text-green-600' : ''}>{value}</span>
        {isBest && (
          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
            BEST
          </Badge>
        )}
        {!isBest && diff > 0 && type === 'lowest' && (
          <span className="text-xs text-red-500 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{diff.toFixed(0)}%
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Product</TableHead>
            {products.map((product) => (
              <TableHead key={product.id} className="min-w-48 relative">
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 p-1"
                    onClick={() => onRemoveProduct(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded mx-auto hover:opacity-80"
                    />
                  </Link>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <p className="font-medium text-sm">{product.name}</p>
                  </div>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Price</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <div className="space-y-1">
                  {renderValueWithIndicator(product.price, lowestPrice, 'lowest')}
                  {product.originalPrice && (
                    <div className="text-xs text-gray-500 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">Rating</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <div className="flex items-center gap-2">
                  {renderValueWithIndicator(product.rating, highestRating, 'highest')}
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Available Sizes</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <div className="flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="outline" className="text-xs">
                      {size}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Colors</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <div className="flex flex-wrap gap-1">
                  {product.colors.map((color) => (
                    <Badge key={color} variant="outline" className="text-xs">
                      {color}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Material</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <span className="text-sm">{product.material || 'Not specified'}</span>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Comfort Rating</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                {product.comfort ? (
                  renderValueWithIndicator(product.comfort, highestComfort, 'highest')
                ) : (
                  <span className="text-gray-400 flex items-center gap-1">
                    <Minus className="h-4 w-4" />
                    N/A
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Durability</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                {product.durability ? (
                  renderValueWithIndicator(product.durability, highestDurability, 'highest')
                ) : (
                  <span className="text-gray-400 flex items-center gap-1">
                    <Minus className="h-4 w-4" />
                    N/A
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Weight</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <span className="text-sm">
                  {product.weight ? `${product.weight}g` : 'Not specified'}
                </span>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Waterproof</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <Badge 
                  variant={product.waterproof ? "default" : "secondary"}
                  className={product.waterproof ? "bg-blue-500" : ""}
                >
                  {product.waterproof ? "Yes" : "No"}
                </Badge>
              </TableCell>
            ))}
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Actions</TableCell>
            {products.map((product) => (
              <TableCell key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <Button className="w-full bg-red-500 hover:bg-red-600" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTableView;
