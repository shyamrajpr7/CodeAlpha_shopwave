export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Terms of Service</span>
          </h1>
          <p className="text-white/30 mt-4">Last updated: January 1, 2026</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Acceptance of Terms</h2>
            <p className="text-white/30 text-sm leading-relaxed">By accessing and using the ShopWave website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Account Registration</h2>
            <p className="text-white/30 text-sm leading-relaxed">To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Products and Pricing</h2>
            <ul className="space-y-2">
              {[
                'All product descriptions and images are as accurate as possible',
                'Prices are subject to change without notice',
                'We reserve the right to limit order quantities',
                'Product availability is subject to change',
                'In the case of pricing errors, we will contact you before processing',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <span className="text-sm text-white/40">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Orders and Payment</h2>
            <p className="text-white/30 text-sm leading-relaxed">By placing an order, you are making an offer to purchase. We reserve the right to accept or decline any order. Payment must be received in full before we process and ship your order.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Intellectual Property</h2>
            <p className="text-white/30 text-sm leading-relaxed">All content on this website, including text, graphics, logos, and software, is the property of ShopWave and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Limitation of Liability</h2>
            <p className="text-white/30 text-sm leading-relaxed">ShopWave shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or products purchased through our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Governing Law</h2>
            <p className="text-white/30 text-sm leading-relaxed">These Terms of Service are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Changes to Terms</h2>
            <p className="text-white/30 text-sm leading-relaxed">We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
            <p className="text-white/30 text-sm leading-relaxed">Questions about these terms? Contact us at <span className="text-violet-300">legal@shopwave.com</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
