import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Package, Plus, Edit3, Trash2, Search, Loader2, X, Save, DollarSign, TrendingUp, ShoppingCart, Users, Mail, Shield } from 'lucide-react';
import ApiService from '../services/api';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderStats, setOrderStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: '', description: '', price: '', imageUrl: '',
    category: '', brand: '', stock: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([loadProducts(), loadOrders(), loadOrderStats(), loadUsers()]).finally(() => setLoading(false));
  }, []);

  const loadProducts = () => ApiService.getProducts().then(res => setProducts(res.data)).catch(console.error);
  const loadOrders = () => ApiService.getAllOrders().then(res => setOrders(res.data)).catch(console.error);
  const loadOrderStats = () => ApiService.getAdminStats().then(res => setOrderStats(res.data)).catch(console.error);
  const loadUsers = () => ApiService.getAllUsers().then(res => setUsers(res.data)).catch(console.error);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await ApiService.updateOrderStatus(orderId, newStatus);
      toast.success(`Order updated to ${newStatus}`);
      loadOrders();
      loadOrderStats();
    } catch (err) {
      toast.error('Failed to update order');
    }
  };

  if (!user || user.role !== 'ADMIN') return <Navigate to="/login" />;

  const filteredProducts = products.filter(p =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = [
    { icon: Package, label: 'Products', value: products.length, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: DollarSign, label: 'Revenue', value: orderStats?.totalRevenue ? `$${Number(orderStats.totalRevenue).toFixed(0)}` : '$0', color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: ShoppingCart, label: 'Orders', value: orderStats?.totalOrders || 0, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: Users, label: 'Users', value: users.length, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  const resetForm = () => {
    setFormData({ productName: '', description: '', price: '', imageUrl: '', category: '', brand: '', stock: '' });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      description: product.description || '',
      price: product.price.toString(),
      imageUrl: product.imageUrl || '',
      category: product.category || '',
      brand: product.brand || '',
      stock: (product.stock || 0).toString()
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) || 0 };
      if (editingProduct) {
        await ApiService.updateProduct(editingProduct.id, payload);
        toast.success('Product updated');
      } else {
        await ApiService.createProduct(payload);
        toast.success('Product created');
      }
      resetForm();
      loadProducts();
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Delete "${product.productName}"?`)) return;
    try {
      await ApiService.deleteProduct(product.id);
      toast.success('Deleted');
      loadProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-dark-200">Manage products, orders, and inventory</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-dark-300">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Tabs */}
        <div className="flex items-center space-x-2 mb-6">
          <button onClick={() => setActiveView('products')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeView === 'products' ? 'bg-primary-600 text-white' : 'bg-dark-600 text-dark-200 hover:text-white'}`}>
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>
          <button onClick={() => setActiveView('orders')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeView === 'orders' ? 'bg-primary-600 text-white' : 'bg-dark-600 text-dark-200 hover:text-white'}`}>
            <ShoppingCart className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>
          <button onClick={() => setActiveView('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeView === 'users' ? 'bg-primary-600 text-white' : 'bg-dark-600 text-dark-200 hover:text-white'}`}>
            <Users className="w-4 h-4" />
            <span>Users ({users.length})</span>
          </button>
        </div>

        {/* Products View */}
        {activeView === 'products' && (
          <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <form onSubmit={(e) => e.preventDefault()} className="flex-1 w-full sm:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-200" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-11 pr-4 py-3 bg-dark-600 border border-dark-400 rounded-xl text-white placeholder-dark-200 focus:outline-none focus:border-primary-500" />
                </div>
              </form>
              <button onClick={() => { resetForm(); setShowForm(true); }}
                className="flex items-center space-x-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors">
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                {loading ? (
                  <div className="glass rounded-2xl p-12 text-center">
                    <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="glass rounded-2xl p-12 text-center">
                    <Package className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                    <p className="text-white font-semibold">No products found</p>
                  </div>
                ) : (
                  <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Product</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Category</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Price</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Stock</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-dark-200">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark-600 flex-shrink-0">
                                    <img src={product.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/40'} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-white text-sm font-medium truncate max-w-[200px]">{product.productName}</p>
                                    <p className="text-dark-300 text-xs">{product.brand || '—'}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs px-2 py-1 bg-primary-500/10 text-primary-400 rounded-full">{product.category || '—'}</span>
                              </td>
                              <td className="px-6 py-4 text-white text-sm">${product.price?.toFixed(2)}</td>
                              <td className="px-6 py-4">
                                <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                  {product.stock || 0}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-end space-x-2">
                                  <button onClick={() => handleEdit(product)} className="p-2 text-dark-300 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDelete(product)} className="p-2 text-dark-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Form Panel */}
              {showForm && (
                <div className="lg:w-96 flex-shrink-0">
                  <div className="glass rounded-2xl p-6 sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-white">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                      <button onClick={resetForm} className="p-2 text-dark-300 hover:text-white rounded-lg"><X className="w-5 h-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm text-dark-200 mb-1">Product Name *</label>
                        <input type="text" required value={formData.productName} onChange={(e) => setFormData({...formData, productName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500" placeholder="e.g. Apple Vision Pro" />
                      </div>
                      <div>
                        <label className="block text-sm text-dark-200 mb-1">Description</label>
                        <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-dark-200 mb-1">Price *</label>
                          <input type="number" step="0.01" min="0" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500" />
                        </div>
                        <div>
                          <label className="block text-sm text-dark-200 mb-1">Stock</label>
                          <input type="number" min="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})}
                            className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-dark-200 mb-1">Category</label>
                          <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500" />
                        </div>
                        <div>
                          <label className="block text-sm text-dark-200 mb-1">Brand</label>
                          <input type="text" value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})}
                            className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-dark-200 mb-1">Image URL</label>
                        <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                          className="w-full px-4 py-2.5 bg-dark-600 border border-dark-400 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500" />
                      </div>
                      {formData.imageUrl && (
                        <div className="rounded-xl overflow-hidden bg-dark-600 h-32">
                          <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      )}
                      <button type="submit" disabled={saving} className="w-full flex items-center justify-center space-x-2 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 text-white rounded-xl font-medium transition-colors">
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /><span>{editingProduct ? 'Update' : 'Create Product'}</span></>}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Orders View */}
        {activeView === 'orders' && (
          <>
            {loading ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto" />
              </div>
            ) : orders.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                <p className="text-white font-semibold">No orders yet</p>
              </div>
            ) : (
              <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Order #</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Customer</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Items</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Total</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Status</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-dark-200">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white text-sm font-mono">#{order.orderNumber}</td>
                          <td className="px-6 py-4">
                            <p className="text-white text-sm">{order.user?.name || 'Unknown'}</p>
                            <p className="text-dark-300 text-xs">{order.user?.email}</p>
                          </td>
                          <td className="px-6 py-4 text-white text-sm">{order.items?.length || 0} item(s)</td>
                          <td className="px-6 py-4 text-white font-medium">${order.totalAmount?.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              order.status === 'DELIVERED' ? 'bg-green-400/10 text-green-400' :
                              order.status === 'SHIPPED' ? 'bg-purple-400/10 text-purple-400' :
                              order.status === 'CONFIRMED' ? 'bg-blue-400/10 text-blue-400' :
                              order.status === 'CANCELLED' ? 'bg-red-400/10 text-red-400' :
                              'bg-yellow-400/10 text-yellow-400'
                            }`}>{order.status}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <select value={order.status} onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="px-2 py-1 bg-dark-600 border border-dark-400 rounded-lg text-white text-xs focus:outline-none focus:border-primary-500">
                              <option value="PENDING">Pending</option>
                              <option value="CONFIRMED">Confirmed</option>
                              <option value="SHIPPED">Shipped</option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Users View */}
        {activeView === 'users' && (
          <>
            {loading ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Loader2 className="w-8 h-8 text-primary-400 animate-spin mx-auto" />
              </div>
            ) : users.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <Users className="w-12 h-12 text-dark-400 mx-auto mb-4" />
                <p className="text-white font-semibold">No users found</p>
              </div>
            ) : (
              <div className="glass rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">User</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Email</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Role</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Phone</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-dark-200">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold">
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-white text-sm font-medium">{u.name}</p>
                                <p className="text-dark-300 text-xs">ID: {u.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-dark-300" />
                              <span className="text-white text-sm">{u.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              u.role === 'ADMIN' ? 'bg-purple-400/10 text-purple-400 border border-purple-400/30' : 'bg-blue-400/10 text-blue-400 border border-blue-400/30'
                            }`}>
                              {u.role === 'ADMIN' ? '👑 Admin' : '👤 User'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-dark-200 text-sm">{u.phone || '—'}</td>
                          <td className="px-6 py-4 text-dark-200 text-sm max-w-[200px] truncate">{u.address || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
