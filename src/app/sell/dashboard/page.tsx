'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SellerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalProducts: 0, totalSales: 0, totalRevenue: 0, recentOrders: [] });
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', price: '', originalPrice: '', category: 'Electronics', image: '', stock: '10', features: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/auth/[...nextauth]').then(r => r.json()).then(d => {
      if (d.user) setUser(d.user);
      else window.location.href = '/auth/login';
    }).catch(() => { window.location.href = '/auth/login'; });
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch('/api/seller/products').then(r => r.json()).then(d => setProducts(d.products || [])).catch(() => {});
    fetch('/api/seller/stats').then(r => r.json()).then(d => { setStats(d); setLoading(false); }).catch(() => setLoading(false));
  }, [user]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert('Name and price required');
    setSaving(true);
    try {
      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null, stock: parseInt(form.stock) || 0 }),
      });
      const data = await res.json();
      if (data.product) {
        setProducts(prev => [data.product, ...prev]);
        setForm({ name: '', slug: '', description: '', price: '', originalPrice: '', category: 'Electronics', image: '', stock: '10', features: '' });
        setShowAdd(false);
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch {
      alert('Something went wrong');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    const res = await fetch(`/api/seller/products?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const categories = ['Electronics', 'Audio', 'Peripherals', 'Video', 'Displays', 'Accessories', 'Lighting', 'Wearables', 'Gaming', 'Bags', 'Clothing', 'Home', 'Sports', 'Books', 'Toys'];

  if (!user) return <div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" /><div className="max-w-7xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /></div></div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-7xl mx-auto animate-fade-up">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient">Seller Dashboard</span>
            </h1>
            <p className="text-white/30 text-sm mt-1">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/sell">
              <button className="glass px-4 py-2 rounded-xl text-sm text-white/40 hover:text-white transition-all">How it Works</button>
            </Link>
            <button onClick={() => setShowAdd(!showAdd)} className="btn-glow px-5 py-2.5 text-sm">
              <span>+ Add Product</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'products', 'orders', 'earnings'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t ? 'bg-violet-500/20 text-violet-300' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {showAdd && (
          <div className="glass-card rounded-3xl p-8 mb-8 animate-fade-up">
            <h2 className="text-xl font-bold text-white mb-6">Add New Product</h2>
            <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/40 mb-1.5">Product Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark w-full" placeholder="Wireless Headphones Pro" required />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-1.5">URL Slug</label>
                <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} className="input-dark w-full" placeholder="wireless-headphones-pro" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/40 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-dark w-full h-20 resize-none" placeholder="Premium wireless headphones with ANC..." />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-1.5">Price *</label>
                <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-dark w-full" placeholder="99.99" required />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-1.5">Original Price (optional)</label>
                <input type="number" step="0.01" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} className="input-dark w-full" placeholder="129.99" />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-dark w-full">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-1.5">Stock</label>
                <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="input-dark w-full" placeholder="10" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/40 mb-1.5">Image URL</label>
                <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-dark w-full" placeholder="https://images.unsplash.com/..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/40 mb-1.5">Features (comma separated)</label>
                <input type="text" value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} className="input-dark w-full" placeholder="Bluetooth 5.3, Noise Cancelling, 30-hour battery" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-glow px-6 py-2.5 text-sm"><span>{saving ? 'Adding...' : 'Add Product'}</span></button>
                <button type="button" onClick={() => setShowAdd(false)} className="glass px-6 py-2.5 rounded-xl text-sm text-white/40 hover:text-white">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Products', value: stats.totalProducts, icon: '📦', color: 'text-violet-300' },
                { label: 'Total Sales', value: stats.totalSales, icon: '🛒', color: 'text-green-300' },
                { label: 'Revenue', value: `$${(stats.totalRevenue || 0).toFixed(2)}`, icon: '💰', color: 'text-amber-300' },
                { label: 'Avg. Rating', value: '4.7', icon: '⭐', color: 'text-yellow-300' },
              ].map((s, i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-white/20 text-xs">{s.label}</span>
                  </div>
                  <p className={`text-2xl font-extrabold ${s.color}`}>{loading ? '...' : s.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Add Product', action: () => setShowAdd(true), icon: '➕' },
                  { label: 'View Orders', action: () => setTab('orders'), icon: '📋' },
                  { label: 'Check Earnings', action: () => setTab('earnings'), icon: '💵' },
                  { label: 'How to Sell', action: () => window.location.href = '/sell', icon: '📖' },
                ].map((a, i) => (
                  <button key={i} onClick={a.action} className="glass rounded-xl p-4 text-center hover:bg-white/5 transition-all">
                    <span className="text-2xl block mb-2">{a.icon}</span>
                    <span className="text-xs text-white/40">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            {products.length === 0 ? (
              <div className="glass-card rounded-3xl p-16 text-center">
                <div className="text-5xl mb-4">📦</div>
                <h2 className="text-xl font-bold mb-2">No products yet</h2>
                <p className="text-white/30 mb-6">List your first product and start selling.</p>
                <button onClick={() => setShowAdd(true)} className="btn-glow px-6 py-3"><span>Add Product</span></button>
              </div>
            ) : (
              <div className="space-y-3">
                {products.map(p => (
                  <div key={p.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover bg-white/5" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-white truncate">{p.name}</h3>
                      <p className="text-white/30 text-xs">{p.category} · Stock: {p.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">${p.price.toFixed(2)}</p>
                      <p className="text-green-400/70 text-xs">{p.rating}★ · {p.reviews} reviews</p>
                    </div>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400/50 hover:text-red-400 transition-colors p-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2">Orders will appear here</h2>
            <p className="text-white/30">When customers buy your products, their orders will show up here.</p>
          </div>
        )}

        {tab === 'earnings' && (
          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-8 text-center">
              <p className="text-white/30 text-sm mb-2">Total Earnings</p>
              <p className="text-5xl font-extrabold text-gradient">${(stats.totalRevenue || 0).toFixed(2)}</p>
              <p className="text-green-400/70 text-sm mt-2">Commission: 5% per sale</p>
            </div>
            <div className="glass-card rounded-3xl p-8 text-center">
              <div className="text-5xl mb-4">💸</div>
              <h2 className="text-xl font-bold mb-2">Payouts</h2>
              <p className="text-white/30">Earnings are processed weekly via direct bank transfer. Minimum payout: $50.00</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
