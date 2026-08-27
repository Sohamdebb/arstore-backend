import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Package, Shield, Truck, Minus, Plus, ChevronRight, Layers, Camera, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import ApiService from '../services/api';
import ThreeDViewer from '../components/ThreeDViewer';
import ReviewsSection from '../components/ReviewsSection';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('image');

  useEffect(() => {
    ApiService.getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        toast.error('Product not found');
        navigate('/products');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`Added ${quantity} ${product.productName} to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-dark-600 rounded w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-dark-600 rounded-2xl" />
              <div className="space-y-6">
                <div className="h-4 bg-dark-600 rounded w-24" />
                <div className="h-8 bg-dark-600 rounded w-3/4" />
                <div className="h-4 bg-dark-600 rounded w-full" />
                <div className="h-4 bg-dark-600 rounded w-full" />
                <div className="h-12 bg-dark-600 rounded w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-dark-200 mb-8">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product.productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Section */}
          <div>
            {/* Tab Switcher */}
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setActiveTab('image')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'image' ? 'bg-primary-600 text-white' : 'bg-dark-600 text-dark-200 hover:text-white'
                }`}
              >
                <Info className="w-4 h-4" />
                <span>Product Image</span>
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === '3d' ? 'bg-primary-600 text-white' : 'bg-dark-600 text-dark-200 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>3D / AR View</span>
              </button>
            </div>

            {/* Media Content */}
            {activeTab === 'image' ? (
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-dark-600 glass">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/600x600?text=AR+Product'}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x600?text=AR+Product';
                    }}
                  />
                </div>
                {product.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 text-sm font-medium bg-primary-500/90 text-white rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <ThreeDViewer product={product} />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-primary-400 font-medium mb-2">{product.brand || 'Premium Brand'}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{product.productName}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-dark-400'}`}
                  />
                ))}
              </div>
              <span className="text-dark-200">(4.{product.id % 3 === 0 ? 9 : product.id % 2 === 0 ? 7 : 8} / 5.0)</span>
              <span className="text-dark-300">|</span>
              <span className="text-dark-200">{50 + product.id * 17 % 200} reviews</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-gradient">${product.price?.toFixed(2)}</span>
            </div>

            {/* Description */}
            <p className="text-dark-200 leading-relaxed mb-8">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center space-x-2 mb-6">
              <Package className="w-5 h-5 text-dark-200" />
              <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-white font-medium">Quantity:</span>
              <div className="flex items-center glass rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-dark-200 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                  className="p-3 text-dark-200 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex items-center justify-center space-x-3 w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-dark-500 disabled:cursor-not-allowed text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <Truck className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-white text-sm font-medium">Free Shipping</p>
                  <p className="text-dark-300 text-xs">Over $500</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <Shield className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-white text-sm font-medium">2 Year Warranty</p>
                  <p className="text-dark-300 text-xs">Full coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewsSection productId={product.id} />
        </div>
      </div>
    </div>
  );
}
