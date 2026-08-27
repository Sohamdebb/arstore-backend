import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, MapPin, Phone, LogOut, Package, Settings, BarChart3, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
              <p className="text-dark-200 mb-4">{user.email}</p>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30">
                  {user.role === 'ADMIN' ? '👑 Admin' : '👤 User'}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-primary-400" />
              <span>Personal Information</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                <User className="w-5 h-5 text-dark-200" />
                <div>
                  <p className="text-xs text-dark-300">Full Name</p>
                  <p className="text-white">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                <Mail className="w-5 h-5 text-dark-200" />
                <div>
                  <p className="text-xs text-dark-300">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                <Phone className="w-5 h-5 text-dark-200" />
                <div>
                  <p className="text-xs text-dark-300">Phone</p>
                  <p className="text-white">{user.phone || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-dark-600 rounded-xl">
                <MapPin className="w-5 h-5 text-dark-200" />
                <div>
                  <p className="text-xs text-dark-300">Address</p>
                  <p className="text-white">{user.address || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary-400" />
                <span>Quick Actions</span>
              </h2>
              <div className="space-y-3">
                <Link
                  to="/products"
                  className="flex items-center space-x-3 p-4 bg-dark-600 hover:bg-dark-500 rounded-xl transition-colors group"
                >
                  <Package className="w-5 h-5 text-primary-400" />
                  <div>
                    <p className="text-white font-medium">Browse Products</p>
                    <p className="text-dark-300 text-sm">Explore our AR collection</p>
                  </div>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center space-x-3 p-4 bg-dark-600 hover:bg-dark-500 rounded-xl transition-colors group"
                >
                  <Package className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">View Cart</p>
                    <p className="text-dark-300 text-sm">Check your shopping cart</p>
                  </div>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center space-x-3 p-4 bg-dark-600 hover:bg-dark-500 rounded-xl transition-colors group"
                >
                  <ClipboardList className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">My Orders</p>
                    <p className="text-dark-300 text-sm">View order history & tracking</p>
                  </div>
                </Link>
                {user.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-3 p-4 bg-dark-600 hover:bg-dark-500 rounded-xl transition-colors group"
                  >
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Admin Dashboard</p>
                      <p className="text-dark-300 text-sm">Manage products & inventory</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary-400" />
                <span>Account Details</span>
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-600 rounded-xl">
                  <span className="text-dark-200">Account ID</span>
                  <span className="text-white font-mono text-sm">#{user.id}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-600 rounded-xl">
                  <span className="text-dark-200">Role</span>
                  <span className="text-white">{user.role}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-600 rounded-xl">
                  <span className="text-dark-200">Status</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-green-400">Active</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
