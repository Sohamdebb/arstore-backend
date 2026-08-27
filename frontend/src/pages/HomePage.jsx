import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ApiService from '../services/api';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.getProducts()
      .then((res) => setFeaturedProducts(res.data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full mb-8 animate-glow">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-dark-100">The Future of Shopping is Here</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Experience
              <span className="text-gradient"> Augmented Reality</span>
              <br />
              Products
            </h1>

            <p className="text-lg sm:text-xl text-dark-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover cutting-edge AR/VR headsets, smart glasses, and accessories.
              Transform how you see the world with our curated collection of immersive technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="group flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products?category=AR/VR Headsets"
                className="flex items-center space-x-2 px-8 py-4 glass glass-hover text-white rounded-2xl font-semibold text-lg"
              >
                <span>Browse AR Headsets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                title: 'Free Shipping',
                desc: 'Free worldwide shipping on orders over $500',
              },
              {
                icon: Shield,
                title: 'Warranty',
                desc: '2-year warranty on all AR/VR devices',
              },
              {
                icon: Zap,
                title: 'Fast Delivery',
                desc: 'Express delivery within 2-3 business days',
              },
            ].map((feature, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:border-primary-500/30 transition-all duration-300">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-500/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-200 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-dark-200">Handpicked AR devices for you</p>
            </div>
            <Link
              to="/products"
              className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-dark-600" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-dark-600 rounded w-1/3" />
                    <div className="h-5 bg-dark-600 rounded w-2/3" />
                    <div className="h-4 bg-dark-600 rounded w-full" />
                    <div className="h-6 bg-dark-600 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-400/10" />
            <div className="relative px-8 py-16 sm:px-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Step Into the Future?
              </h2>
              <p className="text-dark-200 text-lg max-w-xl mx-auto mb-8">
                Join thousands of tech enthusiasts who have already transformed their reality with AR Store.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
