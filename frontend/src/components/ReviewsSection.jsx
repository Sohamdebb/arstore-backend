import { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/api';
import toast from 'react-hot-toast';

export default function ReviewsSection({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ averageRating: 0, reviewCount: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ rating: 5, title: '', comment: '' });

  useEffect(() => {
    loadReviews();
    loadSummary();
  }, [productId]);

  const loadReviews = () => {
    ApiService.getProductReviews(productId)
      .then(res => setReviews(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const loadSummary = () => {
    ApiService.getProductRatingSummary(productId)
      .then(res => setSummary(res.data))
      .catch(console.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await ApiService.createReview(productId, formData);
      toast.success('Review submitted!');
      setFormData({ rating: 5, title: '', comment: '' });
      setShowForm(false);
      loadReviews();
      loadSummary();
    } catch (err) {
      toast.error(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await ApiService.deleteReview(reviewId);
      toast.success('Review deleted');
      loadReviews();
      loadSummary();
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-primary-400" />
            <span>Customer Reviews</span>
          </h3>
          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <Star className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-gradient">{summary.averageRating}</p>
            <div className="flex items-center space-x-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(summary.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-dark-400'}`} />
              ))}
            </div>
            <p className="text-dark-300 text-sm">{summary.reviewCount} review{summary.reviewCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="glass rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Your Review</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-dark-200 mb-2">Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1 transition-transform hover:scale-110">
                    <Star className={`w-7 h-7 ${star <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-400 hover:text-yellow-400'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-dark-200 mb-1">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500"
                placeholder="Summarize your experience" />
            </div>
            <div>
              <label className="block text-sm text-dark-200 mb-1">Comment</label>
              <textarea rows={3} value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Tell others about your experience..." />
            </div>
            <div className="flex items-center space-x-3">
              <button type="submit" disabled={submitting}
                className="flex items-center space-x-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white rounded-xl font-medium text-sm transition-colors">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /><span>Submit Review</span></>}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-dark-600 hover:bg-dark-500 text-dark-200 rounded-xl text-sm transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-dark-600" />
                <div className="h-4 bg-dark-600 rounded w-32" />
              </div>
              <div className="h-4 bg-dark-600 rounded w-48 mb-2" />
              <div className="h-3 bg-dark-600 rounded w-full" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <MessageSquare className="w-12 h-12 text-dark-400 mx-auto mb-4" />
          <p className="text-white font-semibold mb-2">No reviews yet</p>
          <p className="text-dark-300 text-sm">Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                    {review.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{review.user?.name}</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-dark-400'}`} />
                      ))}
                      <span className="text-dark-300 text-xs ml-1">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                      </span>
                    </div>
                  </div>
                </div>
                {user && user.id === review.user?.id && (
                  <button onClick={() => handleDelete(review.id)}
                    className="p-1.5 text-dark-300 hover:text-red-400 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {review.title && <p className="text-white font-medium mt-3">{review.title}</p>}
              {review.comment && <p className="text-dark-200 text-sm mt-1">{review.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
