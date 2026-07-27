'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/[...nextauth]').then(r => r.json()).then(d => { if (d.user) setUser(d.user); }).catch(() => {});
    fetch('/api/cart').then(r => r.json()).then(d => { setCartCount(d.count || d.items?.reduce((s: number, i: any) => s + i.quantity, 0) || 0); }).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = async () => {
    await fetch('/api/auth/[...nextauth]', { method: 'DELETE' });
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl shadow-black/20 py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Shop</span>
            <span className="text-white">Wave</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/products', label: 'Products' },
            { href: '/orders', label: 'Orders' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:scale-110 transition-transform">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-[10px] font-bold flex items-center justify-center text-white shadow-lg shadow-violet-500/30 animate-scale-in">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300 ring-2 ring-transparent hover:ring-violet-500/30">
                {user.name?.charAt(0)?.toUpperCase()}
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-12 w-56 glass rounded-2xl shadow-2xl shadow-black/30 border border-white/10 z-50 py-2 animate-scale-in">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-white/40 mt-0.5">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {[
                        { href: '/dashboard', icon: '👤', label: 'My Account' },
                        { href: '/orders', icon: '📦', label: 'My Orders' },
                        { href: '/cart', icon: '🛒', label: 'My Cart' },
                        { href: '/dashboard?tab=settings', icon: '⚙️', label: 'Settings' },
                      ].map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-white/5 pt-1">
                      <button
                        onClick={() => { setProfileOpen(false); logout(); }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all"
                      >
                        <span className="text-base">🚪</span>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="px-4 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300">Login</Link>
              <Link href="/auth/register">
                <button className="btn-glow py-2.5 px-5 text-sm">
                  <span>Sign Up</span>
                </button>
              </Link>
            </div>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 mx-4 glass rounded-2xl p-4 animate-scale-in">
          {['/', '/products', '/orders', '/cart'].map(href => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
              {href === '/' ? 'Home' : href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
            </Link>
          ))}
          {user && (
            <>
              <div className="line-glow my-2" />
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">👤 My Account</Link>
              <Link href="/dashboard?tab=settings" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">⚙️ Settings</Link>
              <button onClick={() => { setMobileOpen(false); logout(); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all">🚪 Sign Out</button>
            </>
          )}
          {!user && (
            <>
              <div className="line-glow my-2" />
              <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">Login</Link>
              <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-violet-300 hover:text-violet-200 hover:bg-violet-500/5 transition-all">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
