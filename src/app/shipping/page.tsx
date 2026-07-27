export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Shipping Policy</span>
          </h1>
          <p className="text-white/30 mt-4">Last updated: January 1, 2026</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Shipping Options</h2>
            <div className="space-y-3">
              {[
                { name: 'Standard Shipping', price: 'Free on orders $50+', time: '5-7 business days' },
                { name: 'Express Shipping', price: '$9.99', time: '2-3 business days' },
                { name: 'Same-Day Delivery', price: '$19.99', time: 'Within 6 hours (Premium only)' },
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between p-4 glass rounded-xl">
                  <div>
                    <p className="text-white font-semibold text-sm">{opt.name}</p>
                    <p className="text-white/30 text-xs">{opt.time}</p>
                  </div>
                  <span className="text-violet-300 text-sm font-medium">{opt.price}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Processing Time</h2>
            <p className="text-white/30 text-sm leading-relaxed">Orders are processed within 1-2 business days. Orders placed before 2 PM EST on business days are typically shipped the same day. Weekend orders are processed on the next business day.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">International Shipping</h2>
            <p className="text-white/30 text-sm leading-relaxed">We ship to over 50 countries. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient. Delivery times for international orders typically range from 7-14 business days depending on location.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Order Tracking</h2>
            <p className="text-white/30 text-sm leading-relaxed">All orders come with tracking. You will receive a tracking number via email once your order has shipped. You can also track your orders in real-time from your account dashboard.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Shipping Restrictions</h2>
            <p className="text-white/30 text-sm leading-relaxed">Some products may have shipping restrictions due to size, weight, or regulatory requirements. These restrictions will be noted on the product page at checkout.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
