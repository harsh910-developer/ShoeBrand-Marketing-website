
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { FilterState } from "@/hooks/useProductFilters";

interface ProductFiltersProps {
  filters: FilterState;
  onUpdateFilter: (key: keyof FilterState, value: any) => void;
  onToggleArrayFilter: (key: 'categories' | 'brands' | 'sizes', value: any) => void;
  onClearFilters: () => void;
}

const ProductFilters = ({ 
  filters, 
  onUpdateFilter, 
  onToggleArrayFilter, 
  onClearFilters 
}: ProductFiltersProps) => {
  const categories = [
    { id: "sneakers", label: "Sneakers" },
    { id: "formal", label: "Formal Shoes" },
    { id: "casual", label: "Casual Shoes" }
  ];

  const brands = ["StepStyle", "StepStyle Pro", "StepStyle Elite"];
  const sizes = [7, 8, 9, 10, 11, 12, 13];

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.priceRange !== '' || 
                          filters.brands.length > 0 || 
                          filters.sizes.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-red-500 hover:text-red-600"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => onToggleArrayFilter('categories', category.id)}
              />
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
        <Select value={filters.priceRange} onValueChange={(value) => onUpdateFilter('priceRange', value === 'all' ? '' : value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
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
              <Checkbox 
                id={brand}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => onToggleArrayFilter('brands', brand)}
              />
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
            <Button 
              key={size} 
              variant={filters.sizes.includes(size) ? "default" : "outline"}
              size="sm" 
              className="h-8"
              onClick={() => onToggleArrayFilter('sizes', size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
