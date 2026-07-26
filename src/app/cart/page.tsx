'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { handleImageError } from '@/lib/utils';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/cart').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); });
  }, []);

  const updateQty = async (productId: string, qty: number) => {
    setUpdating(productId);
    await fetch('/api/cart/update', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId, quantity: qty }) });
    if (qty <= 0) setItems(items.filter(i => i.productId !== productId));
    else setItems(items.map(i => i.productId === productId ? { ...i, quantity: qty } : i));
    setUpdating(null);
  };

  const remove = async (productId: string) => {
    await fetch(`/api/cart/remove/${productId}`, { method: 'DELETE' });
    setItems(items.filter(i => i.productId !== productId));
  };

  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 relative">
        <div className="mesh-gradient" />
        <div className="max-w-4xl mx-auto">
          <div className="skeleton h-10 w-48 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card rounded-2xl p-6 flex gap-5">
                <div className="skeleton w-24 h-24 rounded-xl flex-shrink-0" />
                <div className="flex-1"><div className="skeleton h-5 w-3/4 mb-3" /><div className="skeleton h-4 w-1/2" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-4xl mx-auto animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
          <span className="text-gradient">Your Cart</span>
        </h1>

        {items.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-400">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-white/30 mb-8">Discover something amazing to add to your collection.</p>
            <Link href="/products">
              <button className="btn-glow px-8 py-3.5"><span>Explore Products</span></button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <div
                  key={item.productId}
                  className="glass-card rounded-2xl p-5 flex gap-5 items-center animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" onError={handleImageError} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.productId}`}>
                      <h3 className="font-bold text-sm truncate hover:text-violet-300 transition-colors">{item.product?.name}</h3>
                    </Link>
                    <p className="text-white/30 text-xs mt-1">{item.product?.category}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm">-</button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">{updating === item.productId ? '...' : item.quantity}</span>
                        <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm">+</button>
                      </div>
                      <button onClick={() => remove(item.productId)} className="text-white/20 hover:text-red-400 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-extrabold">${(item.product?.price * item.quantity).toFixed(2)}</div>
                    <div className="text-xs text-white/25">${item.product?.price.toFixed(2)} each</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-28 animate-fade-up stagger-3">
                <h3 className="font-bold text-lg mb-5">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-white/40">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Shipping</span><span className={shipping === 0 ? 'text-green-400 font-semibold' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                  {shipping > 0 && <p className="text-xs text-violet-300/60">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>}
                  <div className="line-glow my-4" />
                  <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span className="text-gradient">${total.toFixed(2)}</span></div>
                </div>
                <Link href="/checkout">
                  <button className="btn-glow w-full justify-center py-4 mt-6 text-base"><span>Proceed to Checkout</span></button>
                </Link>
                <Link href="/products" className="block text-center mt-4 text-sm text-white/30 hover:text-violet-300 transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
