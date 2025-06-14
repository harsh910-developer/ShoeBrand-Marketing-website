import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, User, ThumbsUp, ThumbsDown, Camera, X, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comfortRating: number;
  qualityRating: number;
  styleRating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  size?: string;
  images?: string[];
}

interface ReviewSystemProps {
  productId: number;
  productName: string;
  averageRating: number;
  totalReviews: number;
}

const ReviewSystem = ({ productId, productName, averageRating, totalReviews }: ReviewSystemProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comfortRating: 0,
    qualityRating: 0,
    styleRating: 0,
    title: "",
    comment: "",
    size: "",
    images: [] as string[]
  });
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock reviews data - in a real app, this would come from an API
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userId: "user1",
      userName: "Sarah M.",
      rating: 5,
      comfortRating: 5,
      qualityRating: 5,
      styleRating: 4,
      title: "Absolutely love these shoes!",
      comment: "Perfect fit and incredibly comfortable. I've been wearing them daily for work and they still look brand new. The quality is outstanding and worth every penny.",
      date: "2024-01-15",
      verified: true,
      helpful: 12,
      notHelpful: 1,
      size: "8.5",
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"]
    },
    {
      id: 2,
      userId: "user2",
      userName: "Mike R.",
      rating: 4,
      comfortRating: 4,
      qualityRating: 5,
      styleRating: 4,
      title: "Great quality, runs a bit small",
      comment: "Love the design and build quality. However, I'd recommend ordering half a size up as they run small. Otherwise, very satisfied with the purchase.",
      date: "2024-01-10",
      verified: true,
      helpful: 8,
      notHelpful: 2,
      size: "10"
    },
    {
      id: 3,
      userId: "user3",
      userName: "Emily K.",
      rating: 5,
      comfortRating: 5,
      qualityRating: 5,
      styleRating: 5,
      title: "Best shoes I've ever owned",
      comment: "These shoes exceeded my expectations. The comfort level is incredible and they look amazing with any outfit. Highly recommend!",
      date: "2024-01-08",
      verified: false,
      helpful: 15,
      notHelpful: 0,
      size: "7",
      images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"]
    }
  ]);

  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating-high" | "rating-low" | "helpful">("newest");

  const handleStarClick = (category: 'rating' | 'comfortRating' | 'qualityRating' | 'styleRating', rating: number) => {
    setNewReview(prev => ({ ...prev, [category]: rating }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + uploadedImages.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please upload only images under 5MB.",
        variant: "destructive",
      });
    }

    setUploadedImages(prev => [...prev, ...validFiles]);
    
    // Convert to base64 for preview
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewReview(prev => ({
          ...prev,
          images: [...prev.images, e.target?.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setNewReview(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0) {
      toast({
        title: "Please select an overall rating",
        description: "You need to provide an overall star rating for your review.",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.title.trim() || !newReview.comment.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Title and comment are required for your review.",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      userId: "current-user",
      userName: "You",
      rating: newReview.rating,
      comfortRating: newReview.comfortRating,
      qualityRating: newReview.qualityRating,
      styleRating: newReview.styleRating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      helpful: 0,
      notHelpful: 0,
      size: newReview.size,
      images: newReview.images
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ 
      rating: 0, 
      comfortRating: 0,
      qualityRating: 0,
      styleRating: 0,
      title: "", 
      comment: "", 
      size: "",
      images: []
    });
    setUploadedImages([]);
    setShowReviewForm(false);

    toast({
      title: "Review submitted!",
      description: "Thank you for your detailed feedback. Your review has been posted.",
    });
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    label 
  }: { 
    rating: number; 
    onRatingChange: (rating: number) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 cursor-pointer transition-colors ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Reviews Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Customer Reviews
            <Button onClick={() => setShowReviewForm(!showReviewForm)}>
              Write a Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Rating Summary */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{averageRating}</div>
                <div className="flex items-center justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{totalReviews} reviews</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Detailed Review for {productName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <StarRating
                rating={newReview.rating}
                onRatingChange={(rating) => handleStarClick('rating', rating)}
                label="Overall Rating *"
              />
              
              <StarRating
                rating={newReview.comfortRating}
                onRatingChange={(rating) => handleStarClick('comfortRating', rating)}
                label="Comfort"
              />
              
              <StarRating
                rating={newReview.qualityRating}
                onRatingChange={(rating) => handleStarClick('qualityRating', rating)}
                label="Quality"
              />
              
              <StarRating
                rating={newReview.styleRating}
                onRatingChange={(rating) => handleStarClick('styleRating', rating)}
                label="Style"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Review Title *</label>
                <Input
                  placeholder="Summarize your experience"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size Purchased (Optional)</label>
                <Input
                  placeholder="e.g., 9.5"
                  value={newReview.size}
                  onChange={(e) => setNewReview(prev => ({ ...prev, size: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review *</label>
              <Textarea
                placeholder="Share your experience with this product..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Photo Upload Section */}
            <div>
              <label className="block text-sm font-medium mb-2">Add Photos (Optional)</label>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photos
                  </Button>
                  <span className="text-sm text-gray-500 self-center">
                    Max 5 photos, 5MB each
                  </span>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Image Previews */}
                {newReview.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newReview.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Review photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmitReview} className="bg-red-500 hover:bg-red-600">
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort Controls */}
      <div className="flex items-center gap-4">
        <span className="font-medium">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Enhanced Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{review.date}</span>
                      {review.size && <span>• Size: {review.size}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Detailed Ratings */}
              {(review.comfortRating || review.qualityRating || review.styleRating) && (
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  {review.comfortRating > 0 && (
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Comfort</div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.comfortRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {review.qualityRating > 0 && (
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Quality</div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.qualityRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {review.styleRating > 0 && (
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Style</div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= review.styleRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                      onClick={() => window.open(image, '_blank')}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Was this helpful?</span>
                <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpful}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                  <ThumbsDown className="h-4 w-4" />
                  <span>{review.notHelpful}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSystem;
