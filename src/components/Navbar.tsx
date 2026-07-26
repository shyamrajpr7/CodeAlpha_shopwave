'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Search, Package } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUser();
    fetchCart();
    const interval = setInterval(fetchCart, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/[...nextauth]');
      const data = await res.json();
      setUser(data.user);
    } catch { setUser(null); }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setCartCount(data.count || 0);
    } catch { setCartCount(0); }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/[...nextauth]', { method: 'DELETE' });
    setUser(null);
    setCartCount(0);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-display text-xl font-bold text-gray-900">ShopWave</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/products" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">
              Shop
            </Link>
            {user && (
              <Link href="/orders" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1">
                <Package className="w-4 h-4" /> Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-50 rounded-xl">
                  <div className="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-brand-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-3 py-2 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all">
                  Login
                </Link>
                <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-down">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                    setMobileOpen(false);
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
            <Link href="/products" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            {user && (
              <Link href="/orders" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>
                My Orders
              </Link>
            )}
            {user ? (
              <>
                <div className="px-3 py-2 text-sm text-brand-600 font-medium">Hi, {user.name}</div>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link href="/auth/register" className="block px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg" onClick={() => setMobileOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
