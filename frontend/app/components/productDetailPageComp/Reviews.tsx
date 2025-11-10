import { Review } from "@/app/data/types";
import StarIcon from "@/app/icons/StarIcon";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ReviewsProps {
  reviews: Review[];
  productId: string;
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews: initialReviews,
  productId,
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: "",
    author: "",
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.text.trim() || !newReview.author.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      author: newReview.author,
      avatarUrl:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(newReview.author),
      rating: newReview.rating,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      text: newReview.text,
    };

    setReviews([...reviews, review]);
    setNewReview({ rating: 5, text: "", author: "" });
    setShowReviewForm(false);

    // Save to localStorage
    const storedReviews = localStorage.getItem(`product_${productId}_reviews`);
    const allReviews = storedReviews ? JSON.parse(storedReviews) : [];
    allReviews.push(review);
    localStorage.setItem(
      `product_${productId}_reviews`,
      JSON.stringify(allReviews)
    );
  };

  useEffect(() => {
    // Load saved reviews from localStorage
    const reviews = async () => {
      const storedReviews = localStorage.getItem(
        `product_${productId}_reviews`
      );
      if (storedReviews) {
        try {
          const parsed = JSON.parse(storedReviews);
          setReviews([...initialReviews, ...parsed]);
        } catch (error) {
          console.error("Failed to load reviews", error);
        }
      }
    };
    reviews();
  }, [productId, initialReviews]);

  return (
    <section className="py-16 sm:py-24 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Reviews
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mt-6 p-6 bg-gray-50 rounded-lg"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={newReview.author}
                onChange={(e) =>
                  setNewReview({ ...newReview, author: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="focus:outline-none"
                  >
                    <StarIcon
                      filled={rating <= newReview.rating}
                      className="text-yellow-400 w-6 h-6"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.text}
                onChange={(e) =>
                  setNewReview({ ...newReview, text: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Submit Review
            </button>
          </form>
        )}

        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                filled={i < Math.round(averageRating)}
                className="text-yellow-400"
              />
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-600">
            {averageRating > 0 ? averageRating.toFixed(1) : "No"} out of 5
          </p>
          <p className="ml-4 pl-4 border-l border-gray-200 text-sm text-gray-600">
            {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {reviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0">
                  <Image
                    className="h-12 w-12 rounded-full object-cover"
                    src={review.avatarUrl}
                    alt={review.author}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < review.rating}
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-base text-gray-600">{review.text}</p>
                  <p className="mt-4 text-sm font-medium text-gray-900">
                    {review.author}
                  </p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
