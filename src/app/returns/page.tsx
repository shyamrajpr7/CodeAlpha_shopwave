export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Returns & Refunds</span>
          </h1>
          <p className="text-white/30 mt-4">Last updated: January 1, 2026</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Return Policy</h2>
            <p className="text-white/30 text-sm leading-relaxed">We offer a 30-day return policy on all products. If you are not satisfied with your purchase, you may return it within 30 days of delivery for a full refund or exchange.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Return Conditions</h2>
            <ul className="space-y-2">
              {[
                'Item must be in original condition with all tags attached',
                'Item must be unused and in its original packaging',
                'Proof of purchase (order number or receipt) is required',
                'Sale items can be returned within 14 days',
                'Personalized or custom items are non-returnable',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" className="mt-0.5 flex-shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-sm text-white/40">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">How to Initiate a Return</h2>
            <ol className="space-y-3">
              {[
                'Log in to your account and go to My Orders',
                'Select the order containing the item you want to return',
                'Click "Return Item" and select your reason',
                'Print the prepaid return shipping label',
                'Pack the item securely and drop off at any carrier location',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-white/40">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Refund Processing</h2>
            <p className="text-white/30 text-sm leading-relaxed">Once we receive your return, we will inspect the item and process your refund within 3-5 business days. Refunds will be credited to the original payment method. Please allow 5-10 business days for the refund to appear on your statement.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Damaged or Defective Items</h2>
            <p className="text-white/30 text-sm leading-relaxed">If you receive a damaged or defective item, contact us within 48 hours of delivery with photos of the damage. We will arrange a free replacement or full refund at no additional cost to you.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
