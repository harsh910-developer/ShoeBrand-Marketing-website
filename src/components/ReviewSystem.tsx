
import { useState } from "react";
import { useReviews } from "@/hooks/useReviews";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Shield } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ReviewSystemProps {
  productId: number;
}

const ReviewSystem = ({ productId }: ReviewSystemProps) => {
  const { user } = useAuth();
  const { reviews, userReview, createReview, updateReview, isSubmitting } = useReviews(productId);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmitReview = () => {
    if (userReview) {
      updateReview({
        id: userReview.id,
        rating,
        title,
        content,
      });
    } else {
      createReview({
        product_id: productId,
        rating,
        title,
        content,
      });
    }
    setShowReviewForm(false);
    setTitle("");
    setContent("");
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= currentRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && setRating(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews ({reviews.length})</span>
            {averageRating > 0 && (
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} out of 5
                </span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user && !userReview && (
            <Button 
              onClick={() => setShowReviewForm(true)}
              className="mb-4"
            >
              Write a Review
            </Button>
          )}
          
          {user && userReview && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Your Review</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setRating(userReview.rating);
                    setTitle(userReview.title || "");
                    setContent(userReview.content || "");
                    setShowReviewForm(true);
                  }}
                >
                  Edit
                </Button>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(userReview.rating)}
                {userReview.verified_purchase && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              {userReview.title && <h5 className="font-medium">{userReview.title}</h5>}
              {userReview.content && <p className="text-gray-600">{userReview.content}</p>}
            </div>
          )}

          {showReviewForm && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    {renderStars(rating, true)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Title (optional)</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Summarize your review"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Review (optional)</label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your thoughts about this product"
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleSubmitReview}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {reviews.filter(review => review.id !== userReview?.id).map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(review.rating)}
                  {review.verified_purchase && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Verified Purchase
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(review.created_at))} ago
                  </span>
                </div>
                {review.title && <h5 className="font-medium mb-1">{review.title}</h5>}
                {review.content && <p className="text-gray-600">{review.content}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSystem;
