import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, XCircle, ChevronDown, ChevronUp, ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/api';
import toast from 'react-hot-toast';

const statusConfig = {
  PENDING: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', icon: Clock, label: 'Pending' },
  CONFIRMED: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', icon: CheckCircle, label: 'Confirmed' },
  SHIPPED: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', icon: Truck, label: 'Shipped' },
  DELIVERED: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', icon: CheckCircle, label: 'Delivered' },
  CANCELLED: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', icon: XCircle, label: 'Cancelled' },
};

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      ApiService.getMyOrders()
        .then((res) => setOrders(res.data))
        .catch((err) => toast.error('Failed to load orders'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusTimeline = (status) => {
    const steps = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const currentIndex = steps.indexOf(status);
    if (status === 'CANCELLED') return null;
    return steps.map((step, i) => ({
      step,
      label: statusConfig[step].label,
      completed: i <= currentIndex,
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto px-4">
          <ShoppingBag className="w-16 h-16 text-dark-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Login to view orders</h2>
          <Link to="/login" className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">My Orders</h1>
            <p className="text-dark-200 mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
          </div>
          <Link to="/products" className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors">
            <ShoppingBag className="w-4 h-4" />
            <span>Shop Again</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="flex justify-between mb-4">
                  <div className="h-5 bg-dark-600 rounded w-32" />
                  <div className="h-5 bg-dark-600 rounded w-20" />
                </div>
                <div className="h-4 bg-dark-600 rounded w-48" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-20 h-20 text-dark-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No orders yet</h2>
            <p className="text-dark-200 mb-8">Start shopping to see your orders here.</p>
            <Link to="/products" className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold transition-all">
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Products</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.PENDING;
              const StatusIcon = config.icon;
              const isExpanded = expandedOrder === order.id;
              const timeline = getStatusTimeline(order.status);

              return (
                <div key={order.id} className="glass rounded-2xl overflow-hidden">
                  {/* Order Header */}
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                        <StatusIcon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold">#{order.orderNumber}</p>
                        <p className="text-dark-300 text-sm">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-xs font-medium ${config.color} ${config.bg} border ${config.border} rounded-full`}>
                        {config.label}
                      </span>
                      <span className="text-white font-bold">${order.totalAmount?.toFixed(2)}</span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-dark-300" /> : <ChevronDown className="w-5 h-5 text-dark-300" />}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-5 space-y-5">
                      {/* Status Timeline */}
                      {timeline && (
                        <div className="flex items-center justify-between mb-6">
                          {timeline.map((step, i) => (
                            <div key={step.step} className="flex items-center flex-1">
                              <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.completed ? 'bg-primary-500 text-white' : 'bg-dark-500 text-dark-300'}`}>
                                  {i + 1}
                                </div>
                                <span className={`text-xs mt-1 ${step.completed ? 'text-primary-400' : 'text-dark-400'}`}>{step.label}</span>
                              </div>
                              {i < timeline.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 ${step.completed ? 'bg-primary-500' : 'bg-dark-500'}`} />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Items */}
                      <div>
                        <h4 className="text-white font-medium mb-3">Items</h4>
                        <div className="space-y-2">
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-dark-500 flex-shrink-0">
                                <img src={item.product?.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/48'} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{item.product?.productName}</p>
                                <p className="text-dark-300 text-xs">Qty: {item.quantity} × ${item.price?.toFixed(2)}</p>
                              </div>
                              <span className="text-white font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                          <MapPin className="w-5 h-5 text-dark-300 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-dark-300">Shipping Address</p>
                            <p className="text-white text-sm">{order.shippingAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                          <CreditCard className="w-5 h-5 text-dark-300 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-dark-300">Payment Method</p>
                            <p className="text-white text-sm">{order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
