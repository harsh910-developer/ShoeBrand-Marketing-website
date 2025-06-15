
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export const useRecommendations = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();

  const trackProductView = useMutation({
    mutationFn: async (productData: {
      product_id: number;
      product_category?: string;
      product_brand?: string;
    }) => {
      if (!user) return;

      await supabase.rpc('update_browsing_history', {
        p_user_id: user.id,
        p_product_id: productData.product_id,
        p_product_category: productData.product_category,
        p_product_brand: productData.product_brand,
        p_session_id: sessionStorage.getItem('session_id') || undefined,
      });
    },
  });

  const recommendationsQuery = useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Get user's browsing history
      const { data: browsingHistory } = await supabase
        .from('browsing_history')
        .select('product_brand, product_category')
        .eq('user_id', user.id)
        .limit(50);

      // Get user's purchase history
      const { data: purchaseHistory } = await supabase
        .from('order_items')
        .select('brand, product_id')
        .limit(20);

      // Simulate product recommendations based on user data
      const recommendedProducts: Product[] = [
        {
          id: 1,
          name: "Air Jordan 1 Retro High",
          brand: "Nike",
          price: 170,
          image: "/placeholder.svg",
          category: "Basketball",
          rating: 4.5,
        },
        {
          id: 2,
          name: "Stan Smith Sneakers",
          brand: "Adidas",
          price: 80,
          image: "/placeholder.svg",
          category: "Casual",
          rating: 4.2,
        },
        {
          id: 3,
          name: "Chuck Taylor All Star",
          brand: "Converse",
          price: 55,
          image: "/placeholder.svg",
          category: "Classic",
          rating: 4.0,
        },
      ];

      // Filter based on user preferences
      if (profile?.preferred_brands?.length) {
        return recommendedProducts.filter(product => 
          profile.preferred_brands?.includes(product.brand)
        );
      }

      return recommendedProducts;
    },
    enabled: !!user,
  });

  const personalizedQuery = useQuery({
    queryKey: ['personalized-recommendations', user?.id, profile?.shoe_size],
    queryFn: async () => {
      if (!user) return [];

      // Get recommendations based on size and preferences
      const sizeBasedProducts: Product[] = [
        {
          id: 4,
          name: "Perfect Fit Running Shoe",
          brand: "Nike",
          price: 120,
          image: "/placeholder.svg",
          category: "Running",
          rating: 4.7,
        },
        {
          id: 5,
          name: "Comfort Plus Sneaker",
          brand: "Adidas",
          price: 90,
          image: "/placeholder.svg",
          category: "Comfort",
          rating: 4.3,
        },
      ];

      return sizeBasedProducts;
    },
    enabled: !!user && !!profile?.shoe_size,
  });

  return {
    recommendations: recommendationsQuery.data || [],
    personalizedRecommendations: personalizedQuery.data || [],
    isLoading: recommendationsQuery.isLoading || personalizedQuery.isLoading,
    trackProductView: trackProductView.mutate,
  };
};
