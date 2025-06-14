
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
  // Enhanced metrics
  material?: string;
  durability?: number; // 1-10 scale
  comfort?: number; // 1-10 scale
  style?: string;
  waterproof?: boolean;
  weight?: number; // in grams
}

export interface SavedComparison {
  id: string;
  name: string;
  products: ComparisonProduct[];
  createdAt: Date;
}

export type ComparisonView = 'cards' | 'table' | 'detailed';

interface ComparisonContextType {
  comparisonProducts: ComparisonProduct[];
  addToComparison: (product: ComparisonProduct) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
  isComparisonOpen: boolean;
  setIsComparisonOpen: (open: boolean) => void;
  
  // New features
  currentView: ComparisonView;
  setCurrentView: (view: ComparisonView) => void;
  savedComparisons: SavedComparison[];
  saveComparison: (name: string) => void;
  loadComparison: (comparison: SavedComparison) => void;
  deleteSavedComparison: (id: string) => void;
  generateShareLink: () => string;
  comparisonHistory: ComparisonProduct[][];
  addToHistory: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonProducts, setComparisonProducts] = useState<ComparisonProduct[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ComparisonView>('cards');
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [comparisonHistory, setComparisonHistory] = useState<ComparisonProduct[][]>([]);

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
    if (comparisonProducts.length > 0) {
      addToHistory();
    }
    setComparisonProducts([]);
  };

  const isInComparison = (productId: number) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  const saveComparison = (name: string) => {
    const newComparison: SavedComparison = {
      id: Date.now().toString(),
      name,
      products: [...comparisonProducts],
      createdAt: new Date()
    };
    setSavedComparisons(prev => [...prev, newComparison]);
  };

  const loadComparison = (comparison: SavedComparison) => {
    setComparisonProducts(comparison.products);
  };

  const deleteSavedComparison = (id: string) => {
    setSavedComparisons(prev => prev.filter(c => c.id !== id));
  };

  const generateShareLink = () => {
    const productIds = comparisonProducts.map(p => p.id).join(',');
    return `${window.location.origin}/compare?products=${productIds}`;
  };

  const addToHistory = () => {
    if (comparisonProducts.length > 0) {
      setComparisonHistory(prev => [comparisonProducts, ...prev.slice(0, 9)]); // Keep last 10
    }
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
      currentView,
      setCurrentView,
      savedComparisons,
      saveComparison,
      loadComparison,
      deleteSavedComparison,
      generateShareLink,
      comparisonHistory,
      addToHistory,
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
