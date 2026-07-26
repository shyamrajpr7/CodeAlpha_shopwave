'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Smartphone, Banknote, CheckCircle, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: '',
  });

  useEffect(() => {
    fetch('/api/cart')
      .then((r) => r.json())
      .then((data) => {
        if (!data.cart?.length) { router.push('/cart'); return; }
        setCart(data.cart);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => router.push('/cart'));
  }, [router]);

  useEffect(() => {
    fetch('/api/auth/[...nextauth]')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setForm((prev) => ({
            ...prev,
            name: prev.name || data.user.name || '',
            email: prev.email || data.user.email || '',
          }));
        } else {
          toast.error('Please login to checkout');
          router.push('/auth/login');
        }
      });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, paymentMethod }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/orders?new=${data.order.id}`);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to place order');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 skeleton w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 skeleton rounded-2xl" />
          <div className="h-64 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  const shipping = total >= 50 ? 0 : 9.99;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-600 text-white rounded-full text-xs flex items-center justify-center font-bold">1</span>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="input-field"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="input-field"
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP Code</label>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="input-field"
                    placeholder="94102"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="input-field"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-600 text-white rounded-full text-xs flex items-center justify-center font-bold">2</span>
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI / Digital', icon: Smartphone },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === id
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                    {paymentMethod === id && <CheckCircle className="w-4 h-4 ml-auto text-brand-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">${(total + shipping).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center py-3.5 text-base mt-6 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                {submitting ? 'Processing...' : 'Place Order'}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                <Lock className="w-3 h-3 inline mr-1" />
                Secure checkout · Your data is protected
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
