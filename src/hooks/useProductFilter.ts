
import { useMemo } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  sizes: number[];
  colors: string[];
  isNew: boolean;
  isSale: boolean;
}

export const useProductFilter = (products: Product[], searchQuery: string) => {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);
};
