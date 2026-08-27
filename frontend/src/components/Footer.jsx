import { Store, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">AR Store</span>
            </Link>
            <p className="text-dark-200 max-w-md leading-relaxed">
              Your one-stop shop for augmented reality and mixed reality devices.
              Experience the future of technology with our curated collection of AR/VR products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-dark-200 hover:text-primary-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-dark-200 hover:text-primary-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-dark-200 hover:text-primary-400 transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Smartphones" className="text-dark-200 hover:text-primary-400 transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link to="/products?category=AR/VR Headsets" className="text-dark-200 hover:text-primary-400 transition-colors">
                  AR/VR Headsets
                </Link>
              </li>
              <li>
                <Link to="/products?category=AR Glasses" className="text-dark-200 hover:text-primary-400 transition-colors">
                  AR Glasses
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-dark-200 hover:text-primary-400 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-dark-300 text-sm">
            &copy; 2024 AR Store. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
