export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Privacy Policy</span>
          </h1>
          <p className="text-white/30 mt-4">Last updated: January 1, 2026</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Information We Collect</h2>
            <p className="text-white/30 text-sm leading-relaxed">We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, payment information, and phone number.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">How We Use Your Information</h2>
            <ul className="space-y-2">
              {[
                'To process and fulfill your orders',
                'To communicate with you about your orders, products, and services',
                'To personalize your shopping experience',
                'To improve our website, products, and services',
                'To send marketing communications (with your consent)',
                'To detect and prevent fraud',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <span className="text-sm text-white/40">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Information Sharing</h2>
            <p className="text-white/30 text-sm leading-relaxed">We do not sell your personal information. We may share your information with trusted third parties who assist us in operating our website, conducting our business, and servicing you, provided those parties agree to keep this information confidential.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Data Security</h2>
            <p className="text-white/30 text-sm leading-relaxed">We implement a variety of security measures to maintain the safety of your personal information. Your personal data is stored in secured networks and is only accessible by a limited number of authorized personnel.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Cookies</h2>
            <p className="text-white/30 text-sm leading-relaxed">We use cookies to enhance your experience on our website. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Your Rights</h2>
            <p className="text-white/30 text-sm leading-relaxed">You have the right to access, correct, or delete your personal information at any time. You can do this through your account settings or by contacting us directly.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact Us</h2>
            <p className="text-white/30 text-sm leading-relaxed">If you have any questions about this Privacy Policy, please contact us at <span className="text-violet-300">privacy@shopwave.com</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
