import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.productName} added to cart!`);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group glass rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/10"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-dark-600">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/400x400?text=AR+Product'}
          alt={product.productName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=AR+Product';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-medium bg-primary-500/90 text-white rounded-full backdrop-blur-sm">
              {product.category}
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <div className="flex items-center space-x-1 px-3 py-2 bg-dark-700/90 backdrop-blur-sm rounded-xl">
            <Eye className="w-4 h-4 text-primary-400" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-dark-200 font-medium">{product.brand || 'Unknown Brand'}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-dark-200">4.{product.id % 3 === 0 ? 9 : product.id % 2 === 0 ? 7 : 8}</span>
          </div>
        </div>

        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {product.productName}
        </h3>

        <p className="text-dark-200 text-sm line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gradient">
            ${product.price?.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
