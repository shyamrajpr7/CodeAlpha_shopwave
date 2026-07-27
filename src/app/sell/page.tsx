'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SellPage() {
  const [user, setUser] = useState<any>(null);
  const [isSeller, setIsSeller] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({ shopName: '', phone: '', bio: '' });

  useEffect(() => {
    fetch('/api/auth/[...nextauth]').then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        if (d.user.role === 'seller' || d.user.shopName) setIsSeller(true);
      }
    }).catch(() => {});
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.shopName) return alert('Please enter a shop name');
    setRegistering(true);
    try {
      const res = await fetch('/api/seller/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setIsSeller(true);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch {
      alert('Something went wrong');
    }
    setRegistering(false);
  };

  if (isSeller) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 relative">
        <div className="mesh-gradient" />
        <div className="max-w-2xl mx-auto text-center animate-fade-up">
          <div className="glass-card rounded-3xl p-12">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient">You&apos;re a Seller!</span>
            </h1>
            <p className="text-white/30 mb-8">Start listing your products and reaching millions of customers.</p>
            <Link href="/sell/dashboard">
              <button className="btn-glow px-8 py-3 text-base"><span>Go to Seller Dashboard</span></button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-6xl mx-auto animate-fade-up">

        <div className="text-center mb-16">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-semibold text-violet-300 tracking-wider uppercase mb-6">
            Become a Seller
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Sell on ShopWave</span>
          </h1>
          <p className="text-white/30 mt-4 max-w-xl mx-auto">
            Reach millions of customers. List your products in minutes and start selling today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '🚀', title: 'Quick Setup', desc: 'Create your seller account and list your first product in under 5 minutes.' },
            { icon: '🌍', title: 'Global Reach', desc: 'Access millions of active shoppers across 50+ countries worldwide.' },
            { icon: '💰', title: 'Low Fees', desc: 'Only 5% commission per sale. No hidden charges, no monthly fees.' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 text-center hover-lift">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-white/30 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Why Sell on ShopWave?</h2>
            <div className="space-y-4">
              {[
                { icon: '📦', text: 'Unlimited product listings across all categories' },
                { icon: '📊', text: 'Real-time analytics dashboard with sales insights' },
                { icon: '💳', text: 'Secure payment processing with fast payouts' },
                { icon: '🚚', text: 'Integrated shipping and logistics support' },
                { icon: '🛡️', text: 'Seller protection against fraud and returns' },
                { icon: '📈', text: 'Marketing tools to boost your product visibility' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 glass rounded-xl p-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-white/50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">
              {user ? 'Start Selling Today' : 'Create Your Seller Account'}
            </h2>
            {user ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/40 mb-2">Shop Name</label>
                  <input type="text" value={form.shopName} onChange={e => setForm({ ...form, shopName: e.target.value })} className="input-dark w-full" placeholder="My Awesome Shop" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/40 mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-dark w-full" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/40 mb-2">About Your Shop</label>
                  <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="input-dark w-full h-24 resize-none" placeholder="Tell customers what you sell..." />
                </div>
                <button type="submit" disabled={registering} className="btn-glow w-full py-3">
                  <span>{registering ? 'Setting Up...' : 'Start Selling'}</span>
                </button>
                <p className="text-white/15 text-xs text-center">By registering, you agree to our Terms of Service and Seller Agreement.</p>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/30 mb-6">Sign in to create your seller account and start listing products.</p>
                <Link href="/auth/login">
                  <button className="btn-glow px-8 py-3"><span>Sign In to Sell</span></button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
