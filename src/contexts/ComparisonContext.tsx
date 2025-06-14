
import React, { createContext, useContext, useState } from 'react';

export interface ComparisonProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  sizes: number[];
  colors: string[];
}

interface ComparisonContextType {
  comparisonProducts: ComparisonProduct[];
  addToComparison: (product: ComparisonProduct) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonProducts, setComparisonProducts] = useState<ComparisonProduct[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const addToComparison = (product: ComparisonProduct) => {
    setComparisonProducts(prev => {
      if (prev.length >= 3) {
        return prev; // Max 3 products for comparison
      }
      if (prev.some(p => p.id === product.id)) {
        return prev; // Already in comparison
      }
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: number) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  const isInComparison = (productId: number) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonProducts,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      isComparisonOpen,
      setIsComparisonOpen,
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
