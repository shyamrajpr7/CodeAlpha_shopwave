'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', paymentMethod: 'credit_card' });

  useEffect(() => {
    fetch('/api/cart').then(r => r.json()).then(d => { setItems(d.items || []); setLoading(false); });
  }, []);

  const subtotal = items.reduce((s, i) => s + (i.product?.price || 0) * i.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const placeOrder = async () => {
    if (!form.name || !form.email || !form.address) return alert('Please fill in all fields');
    setPlacing(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, total }),
    });
    const data = await res.json();
    if (data.order) router.push(`/orders`);
    else { alert('Failed to place order'); setPlacing(false); }
  };

  if (loading) return <div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" /><div className="max-w-5xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /></div></div>;

  if (items.length === 0) return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" />
      <div className="max-w-5xl mx-auto glass-card rounded-3xl p-16 text-center animate-fade-up">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-white/30 mb-6">Add some products before checking out.</p>
        <Link href="/products"><button className="btn-glow px-8 py-3"><span>Shop Now</span></button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-5xl mx-auto animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
          <span className="text-gradient">Checkout</span>
        </h1>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold flex items-center justify-center">1</span>
                Shipping Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Full Name</label><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark" placeholder="John Doe" /></div>
                <div><label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark" placeholder="you@email.com" /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">Address</label><input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="input-dark" placeholder="123 Main St" /></div>
                <div><label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">City</label><input type="text" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input-dark" placeholder="Mumbai" /></div>
                <div><label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">ZIP Code</label><input type="text" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} className="input-dark" placeholder="400001" /></div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold flex items-center justify-center">2</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { value: 'credit_card', label: 'Credit / Debit Card', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
                  { value: 'paypal', label: 'PayPal', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { value: 'cod', label: 'Cash on Delivery', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
                ].map(m => (
                  <label key={m.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${form.paymentMethod === m.value ? 'border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/5' : 'border-white/8 bg-white/2 hover:border-white/15'}`}>
                    <input type="radio" name="payment" value={m.value} checked={form.paymentMethod === m.value} onChange={e => setForm({ ...form, paymentMethod: e.target.value })} className="hidden" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${form.paymentMethod === m.value ? 'border-violet-400' : 'border-white/20'}`}>
                      {form.paymentMethod === m.value && <div className="w-2.5 h-2.5 rounded-full bg-violet-400" />}
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={form.paymentMethod === m.value ? 'text-violet-300' : 'text-white/30'}><path d={m.icon}/></svg>
                    <span className="font-medium text-sm">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 sticky top-28">
              <h3 className="font-bold text-lg mb-5">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-5">
                {items.map(item => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      <img src={item.product?.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{item.product?.name}</div>
                      <div className="text-xs text-white/25">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-bold">${(item.product?.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="line-glow mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/40">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-white/40">Shipping</span><span className={shipping === 0 ? 'text-green-400 font-semibold' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="line-glow my-3" />
                <div className="flex justify-between text-xl font-extrabold"><span>Total</span><span className="text-gradient">${total.toFixed(2)}</span></div>
              </div>
              <button onClick={placeOrder} disabled={placing} className="btn-glow w-full justify-center py-4 mt-6 text-base disabled:opacity-50">
                <span>{placing ? 'Placing Order...' : 'Place Order'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
