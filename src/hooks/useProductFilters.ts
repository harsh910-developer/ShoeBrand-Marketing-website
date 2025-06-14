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
      const currentArray = prev[key] as any[];
      return {
        ...prev,
        [key]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
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
    filters,
    filteredProducts,
    updateFilter,
    toggleArrayFilter,
    clearFilters
  };
};
