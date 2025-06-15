
import React, { useState } from 'react';
import { useReviews } from '@/hooks/useReviews';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, Verified } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface ReviewSystemProps {
  productId: number;
  productName?: string;
  averageRating?: number;
  totalReviews?: number;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ 
  productId, 
  productName = "",
  averageRating = 0,
  totalReviews = 0
}) => {
  const { user } = useAuth();
  const { reviews, isLoading, createReview, isCreatingReview } = useReviews(productId);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    content: ''
  });

  // Calculate actual stats from reviews if not provided
  const actualTotalReviews = totalReviews || reviews.length;
  const actualAverageRating = averageRating || (
    reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0
  );

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a review.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createReview({
        product_id: productId,
        rating: newReview.rating,
        title: newReview.title,
        content: newReview.content
      });

      setNewReview({ rating: 5, title: '', content: '' });
      setShowReviewForm(false);
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback."
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse h-32 bg-gray-200 rounded"></div>
        <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            {user && (
              <Button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
                size="sm"
              >
                Write a Review
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold">{actualAverageRating.toFixed(1)}</div>
            {renderStars(Math.round(actualAverageRating))}
            <div className="text-gray-600">({actualTotalReviews} reviews)</div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = actualTotalReviews > 0 ? (count / actualTotalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-600">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review{productName && ` for ${productName}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview(prev => ({ ...prev, rating }))
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Review Title</label>
                <Input
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Summarize your experience"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Review</label>
                <Textarea
                  value={newReview.content}
                  onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts about this product"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={isCreatingReview}>
                  {isCreatingReview ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(review.rating)}
                    {review.verified_purchase && (
                      <Badge variant="secondary" className="text-xs">
                        <Verified className="h-3 w-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold">{review.title}</h4>
                  <p className="text-sm text-gray-600">
                    By {review.profiles?.first_name || 'Anonymous'} • {' '}
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  {review.helpful_votes}
                </Button>
              </div>
              <p className="text-gray-700">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No reviews yet. Be the first to review this product!
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewSystem;
