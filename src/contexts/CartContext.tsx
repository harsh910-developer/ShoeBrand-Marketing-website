import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  brand: string;
}

export interface SavedItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  brand: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLoading: boolean;
  savedItems: SavedItem[];
  saveForLater: (item: CartItem) => void;
  moveToCart: (item: SavedItem) => void;
  removeSavedItem: (id: number, size: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount with error handling
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('stepstyle-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Validate cart structure
          if (Array.isArray(parsedCart)) {
            setItems(parsedCart);
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem('stepstyle-cart');
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever items change with error handling
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('stepstyle-cart', JSON.stringify(items));
        
        // Also save timestamp for potential expiration
        localStorage.setItem('stepstyle-cart-timestamp', Date.now().toString());
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [items, isLoading]);

  // Load saved items from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('stepstyle-saved');
      if (saved) {
        setSavedItems(JSON.parse(saved));
      }
    } catch (e) {
      localStorage.removeItem('stepstyle-saved');
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('stepstyle-saved', JSON.stringify(savedItems));
      } catch (e) { }
    }
  }, [savedItems, isLoading]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Save for Later logic
  const saveForLater = (item: CartItem) => {
    setItems(prev => prev.filter(i => !(i.id === item.id && i.size === item.size)));
    setSavedItems(prev => [...prev, { ...item }]);
  };
  const moveToCart = (item: SavedItem) => {
    setSavedItems(prev => prev.filter(i => !(i.id === item.id && i.size === item.size)));
    // If already in cart, increase quantity
    setItems(prevItems => {
      const exists = prevItems.find(i => i.id === item.id && i.size === item.size);
      if (exists) return prevItems.map(i =>
        i.id === item.id && i.size === item.size
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };
  const removeSavedItem = (id: number, size: string) => {
    setSavedItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      isCartOpen,
      setIsCartOpen,
      isLoading,
      savedItems,
      saveForLater,
      moveToCart,
      removeSavedItem
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
