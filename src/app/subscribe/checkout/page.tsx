'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const plans: Record<string, { name: string; price: number; period: string; color: string }> = {
  basic: { name: 'Basic', price: 9.99, period: 'month', color: 'from-blue-500 to-cyan-500' },
  pro: { name: 'Pro', price: 19.99, period: 'month', color: 'from-violet-500 to-indigo-500' },
  premium: { name: 'Premium', price: 39.99, period: 'month', color: 'from-amber-500 to-orange-500' },
};

function SubscriptionCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'pro';
  const plan = plans[planId] || plans.pro;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });

  useEffect(() => {
    fetch('/api/auth/[...nextauth]').then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        setForm(prev => ({ ...prev, name: d.user.name || '', email: d.user.email || '' }));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.cardNumber || !form.expiry || !form.cvv) {
      return alert('Please fill in all fields');
    }
    setProcessing(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, ...form }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.error || 'Payment failed. Please try again.');
        setProcessing(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-2xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /></div>
    </div>
  );

  if (success) return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-lg mx-auto glass-card rounded-3xl p-12 text-center animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
          <span className="text-gradient">Welcome to {plan.name}!</span>
        </h1>
        <p className="text-white/30 mb-2">Your subscription is now active.</p>
        <p className="text-white/20 text-sm mb-8">A confirmation email has been sent to {form.email}</p>
        <div className="glass rounded-2xl p-6 mb-8 text-left">
          <div className="flex justify-between mb-3">
            <span className="text-white/40 text-sm">Plan</span>
            <span className="text-white font-semibold text-sm">{plan.name}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-white/40 text-sm">Billing</span>
            <span className="text-white font-semibold text-sm">${plan.price}/{plan.period}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40 text-sm">Status</span>
            <span className="text-green-400 font-semibold text-sm">Active</span>
          </div>
        </div>
        <Link href="/">
          <button className="btn-glow px-8 py-3"><span>Start Shopping</span></button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-2xl mx-auto animate-fade-up">

        <Link href="/subscribe" className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm mb-8 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to plans
        </Link>

        <div className="glass-card rounded-3xl p-8 md:p-10">
          <h1 className="text-2xl font-extrabold mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Subscribe to {plan.name}</span>
          </h1>

          <div className={`glass rounded-2xl p-6 mb-8 bg-gradient-to-r ${plan.color} bg-opacity-10`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{plan.name} Plan</p>
                <p className="text-white/40 text-sm">Billed monthly</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-white">${plan.price}</p>
                <p className="text-white/40 text-sm">/{plan.period}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/40 mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-dark w-full"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/40 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-dark w-full"
                placeholder="john@example.com"
              />
            </div>

            <div className="line-glow my-6" />

            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Payment Details</h3>

            <div>
              <label className="block text-sm font-medium text-white/40 mb-2">Cardholder Name</label>
              <input
                type="text"
                value={form.cardName}
                onChange={e => setForm({ ...form, cardName: e.target.value })}
                className="input-dark w-full"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/40 mb-2">Card Number</label>
              <input
                type="text"
                value={form.cardNumber}
                onChange={e => setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19) })}
                className="input-dark w-full"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/40 mb-2">Expiry</label>
                <input
                  type="text"
                  value={form.expiry}
                  onChange={e => {
                    let v = e.target.value.replace(/\D/g, '');
                    if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                    setForm({ ...form, expiry: v.slice(0, 5) });
                  }}
                  className="input-dark w-full"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/40 mb-2">CVV</label>
                <input
                  type="text"
                  value={form.cvv}
                  onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  className="input-dark w-full"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={processing}
                className="btn-glow w-full py-4 text-base disabled:opacity-50"
              >
                <span>{processing ? 'Processing Payment...' : `Pay $${plan.price} / ${plan.period}`}</span>
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/20 text-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <span>Secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubscribeCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" /><div className="max-w-2xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /></div></div>}>
      <SubscriptionCheckoutContent />
    </Suspense>
  );
}
