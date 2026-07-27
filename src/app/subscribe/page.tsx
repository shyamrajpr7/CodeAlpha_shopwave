'use client';

import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    period: 'month',
    description: 'Perfect for casual shoppers',
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/20',
    features: [
      'Free standard shipping',
      '5% cashback on orders',
      'Early access to sales',
      'Monthly newsletter',
      'Basic customer support',
    ],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    period: 'month',
    description: 'Most popular for power shoppers',
    color: 'from-violet-500 to-indigo-500',
    shadow: 'shadow-violet-500/20',
    features: [
      'Free express shipping',
      '10% cashback on orders',
      'Exclusive member deals',
      'Priority customer support',
      'Early access to new products',
      'Birthday surprise gift',
      'Free returns within 30 days',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39.99,
    period: 'month',
    description: 'For the ultimate shopping experience',
    color: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
    features: [
      'Free same-day delivery',
      '15% cashback on orders',
      'VIP member-only products',
      'Dedicated account manager',
      'First access to limited editions',
      'Exclusive premium gifts',
      'Free returns anytime',
      'Invite to member-only events',
      'Personal shopping assistant',
    ],
    popular: false,
  },
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-6xl mx-auto animate-fade-up">

        <div className="text-center mb-16">
          <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-semibold text-violet-300 tracking-wider uppercase mb-6">
            Membership Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Choose Your Plan</span>
          </h1>
          <p className="text-white/30 mt-4 max-w-xl mx-auto">
            Unlock exclusive benefits, faster shipping, and bigger savings with our membership plans.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative glass-card rounded-3xl p-8 transition-all duration-500 hover-lift ${
                plan.popular ? 'border-2 border-violet-500/30 scale-105 shadow-2xl ' + plan.shadow : 'hover:border-white/10'
              } ${selectedPlan === plan.id ? 'ring-2 ring-violet-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-violet-500/30">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg ${plan.shadow}`}>
                {plan.id === 'basic' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                )}
                {plan.id === 'pro' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                )}
                {plan.id === 'premium' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 15l-2 5 10-8h-8l2-5-10 8h8z"/></svg>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-white/30 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                <span className="text-white/30 text-sm">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" className="mt-0.5 flex-shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
                    <span className="text-sm text-white/50">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={`/subscribe/checkout?plan=${plan.id}`}>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'btn-glow'
                      : 'glass border border-white/10 text-white/60 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/5'
                  }`}
                >
                  <span>{plan.popular ? 'Get Started Now' : `Choose ${plan.name}`}</span>
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/20 text-sm">Cancel anytime. No hidden fees. All plans include a 7-day free trial.</p>
        </div>
      </div>
    </div>
  );
}
