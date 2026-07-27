'use client';

import { useState } from 'react';

const faqs = [
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can also view your order status in the My Orders section of your dashboard.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all products. Items must be in their original condition with tags attached. Contact us to initiate a return.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping delivers within 2-3 business days. Same-day delivery is available in select areas for Premium members.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by destination, typically 7-14 business days.' },
  { q: 'How do I change or cancel my order?', a: 'You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing. Contact support for assistance.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and ShopWave gift cards.' },
  { q: 'How do I become a ShopWave member?', a: 'Visit our Subscribe page to choose from Basic, Pro, or Premium plans. Each tier offers different benefits including free shipping, cashback, and exclusive deals.' },
  { q: 'What if I receive a damaged item?', a: 'Contact us within 48 hours of delivery with photos of the damage. We\'ll arrange a free replacement or full refund immediately.' },
  { q: 'Can I use multiple discount codes?', a: 'Only one discount code can be applied per order. However, ShopWave members automatically receive their member discount on every purchase.' },
  { q: 'How do I reset my password?', a: 'Click "Login" on the navbar, then use the password reset option. You\'ll receive an email with a link to create a new password.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Frequently Asked Questions</span>
          </h1>
          <p className="text-white/30 mt-4">Everything you need to know about ShopWave.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-sm text-white/80 pr-4">{faq.q}</span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-white/30 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
