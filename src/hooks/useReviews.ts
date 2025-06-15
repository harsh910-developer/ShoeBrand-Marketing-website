
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  user_id: string;
  product_id: number;
  order_id?: string;
  rating: number;
  title?: string;
  content?: string;
  verified_purchase: boolean;
  helpful_votes: number;
  created_at: string;
  updated_at: string;
}

export const useReviews = (productId?: number) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      if (!productId) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
    enabled: !!productId,
  });

  const userReviewQuery = useQuery({
    queryKey: ['user-review', productId, user?.id],
    queryFn: async () => {
      if (!productId || !user) return null;
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Review | null;
    },
    enabled: !!productId && !!user,
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: {
      product_id: number;
      rating: number;
      title?: string;
      content?: string;
      order_id?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      // Check if user has purchased this product
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('order_id')
        .eq('product_id', reviewData.product_id);

      const verified_purchase = orderItems && orderItems.length > 0;

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          product_id: reviewData.product_id,
          rating: reviewData.rating,
          title: reviewData.title,
          content: reviewData.content,
          order_id: reviewData.order_id,
          verified_purchase,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['user-review'] });
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Review failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async (reviewData: {
      id: string;
      rating: number;
      title?: string;
      content?: string;
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update({
          rating: reviewData.rating,
          title: reviewData.title,
          content: reviewData.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewData.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['user-review'] });
      toast({
        title: "Review updated!",
        description: "Your review has been successfully updated.",
      });
    },
  });

  return {
    reviews: reviewsQuery.data || [],
    userReview: userReviewQuery.data,
    isLoading: reviewsQuery.isLoading || userReviewQuery.isLoading,
    createReview: createReviewMutation.mutate,
    updateReview: updateReviewMutation.mutate,
    isSubmitting: createReviewMutation.isPending || updateReviewMutation.isPending,
  };
};
