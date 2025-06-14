
import { useMemo, useState } from 'react';
import { Product } from './useProductFilter';

export interface FilterState {
  categories: string[];
  priceRange: string;
  brands: string[];
  sizes: number[];
}

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: '',
    brands: [],
    sizes: []
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
        if (product.price < min || (max !== Infinity && product.price > max)) {
          return false;
        }
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleArrayFilter = <T extends keyof FilterState>(
    key: T,
    value: T extends 'sizes' ? number : string
  ) => {
    setFilters(prev => {
      if (key === 'categories' || key === 'brands') {
        const currentArray = prev[key] as string[];
        const stringValue = value as string;
        return {
          ...prev,
          [key]: currentArray.includes(stringValue)
            ? currentArray.filter(item => item !== stringValue)
            : [...currentArray, stringValue]
        };
      } else if (key === 'sizes') {
        const currentArray = prev[key] as number[];
        const numberValue = value as number;
        return {
          ...prev,
          [key]: currentArray.includes(numberValue)
            ? currentArray.filter(item => item !== numberValue)
            : [...currentArray, numberValue]
        };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: '',
      brands: [],
      sizes: []
    });
  };

  return {
    filters: {
      ...filters,
      priceRange: filters.priceRange === '' ? 'all' : filters.priceRange
    },
    filteredProducts,
    updateFilter,
    toggleArrayFilter,
    clearFilters
  };
};
