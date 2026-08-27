import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShoppingCart, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/api';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [placing, setPlacing] = useState(false);

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast.success(`${item.productName} removed from cart`);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h2>
            <p className="text-dark-200 mb-2">Thank you for your purchase.</p>
            <p className="text-dark-300 text-sm mb-8">Your order #{orderId || 'AR-' + Date.now().toString().slice(-6)} has been placed successfully. You will receive a confirmation email shortly.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                onClick={() => setOrderPlaced(false)}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/orders"
                onClick={() => setOrderPlaced(false)}
                className="px-6 py-3 glass glass-hover text-white rounded-xl font-medium"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-dark-600 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-dark-300" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-dark-200 mb-8">Looks like you haven't added any AR products yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 29.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="glass rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-dark-600 flex-shrink-0">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/200x200?text=AR+Product'}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=AR+Product';
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.productName}</h3>
                        <p className="text-dark-200 text-sm">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="p-2 text-dark-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center glass rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-dark-200 hover:text-white transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-white font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-dark-200 hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xl font-bold text-gradient">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  clearCart();
                  toast.success('Cart cleared');
                }}
                className="text-dark-300 hover:text-red-400 text-sm transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-dark-200">Subtotal ({cart.length} items)</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-200">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-white font-medium'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-200">Tax (8%)</span>
                  <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-lg">Total</span>
                    <span className="text-2xl font-bold text-gradient">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 500 && (
                <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 mb-6">
                  <p className="text-primary-400 text-sm">
                    Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={async () => {
                  if (!user) {
                    toast.error('Please login to place an order');
                    return;
                  }
                  setPlacing(true);
                  try {
                    const orderData = {
                      shippingAddress: user.address || '456 Innovation Ave, San Francisco, CA',
                      paymentMethod: 'Credit Card',
                      items: cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                      })),
                    };
                    const res = await ApiService.createOrder(orderData);
                    setOrderId(res.data.orderNumber);
                    setOrderPlaced(true);
                    clearCart();
                    toast.success('Order placed successfully!');
                  } catch (err) {
                    toast.error(err.message || 'Failed to place order');
                  } finally {
                    setPlacing(false);
                  }
                }}
                disabled={placing}
                className="w-full flex items-center justify-center space-x-2 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 disabled:cursor-not-allowed text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
              >
                {placing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <><span>Place Order</span><ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <Link
                to="/products"
                className="block w-full text-center py-3 text-primary-400 hover:text-primary-300 font-medium mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
