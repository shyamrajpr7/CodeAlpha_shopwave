'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-gradient text-white relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <p className="text-brand-300 font-medium mb-4 tracking-wide text-sm uppercase">
              New Arrivals · 2025 Collection
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              The gear that<br />
              <span className="gradient-text">actually</span> matters.
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              Curated tech peripherals for creators, coders, and power users. Premium quality, exceptional value.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base py-3 px-8">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/products?category=Audio" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white text-base py-3 px-8">
                Browse Audio
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </section>

      {/* Trust badges */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'Free Shipping', sub: 'Orders over $50' },
              { icon: Shield, label: '2-Year Warranty', sub: 'Full coverage' },
              { icon: Headphones, label: '24/7 Support', sub: 'Always here' },
              { icon: RotateCcw, label: '30-Day Returns', sub: 'Easy & free' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Handpicked essentials for your setup</p>
          </div>
          <Link href="/products" className="text-brand-600 font-medium text-sm hover:text-brand-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-square skeleton" />
                <div className="p-4 space-y-3">
                  <div className="h-4 skeleton w-1/3" />
                  <div className="h-5 skeleton w-2/3" />
                  <div className="h-4 skeleton w-full" />
                  <div className="h-6 skeleton w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-lg">
            <h2 className="font-display text-3xl font-bold mb-4">Join the Community</h2>
            <p className="text-white/80 mb-6">
              Sign up today and get 10% off your first order. Be the first to know about new products and exclusive deals.
            </p>
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-all">
              Create Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
