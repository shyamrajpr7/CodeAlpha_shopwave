export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-3xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Cookie Policy</span>
          </h1>
          <p className="text-white/30 mt-4">Last updated: January 1, 2026</p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-10 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">What Are Cookies</h2>
            <p className="text-white/30 text-sm leading-relaxed">Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">How We Use Cookies</h2>
            <ul className="space-y-2">
              {[
                'Essential cookies: Required for the website to function properly (e.g., shopping cart, login)',
                'Analytics cookies: Help us understand how visitors interact with our website',
                'Marketing cookies: Used to deliver relevant advertisements and track campaign performance',
                'Preference cookies: Remember your settings and preferences to enhance your experience',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <span className="text-sm text-white/40">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Types of Cookies We Use</h2>
            <div className="space-y-3">
              {[
                { name: 'Session Cookies', desc: 'Temporary cookies that exist only while you are browsing our website. They are deleted when you close your browser.' },
                { name: 'Persistent Cookies', desc: 'Cookies that remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.' },
                { name: 'Third-Party Cookies', desc: 'Cookies set by third-party services we use, such as Google Analytics and payment processors.' },
              ].map((cookie, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <p className="text-white font-semibold text-sm">{cookie.name}</p>
                  <p className="text-white/30 text-xs mt-1">{cookie.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Managing Cookies</h2>
            <p className="text-white/30 text-sm leading-relaxed">You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. However, disabling cookies may affect the functionality of our website.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 text-white/40 font-medium">Cookie</th>
                    <th className="text-left py-3 text-white/40 font-medium">Purpose</th>
                    <th className="text-left py-3 text-white/40 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-white/30">
                  {[
                    { name: 'session_id', purpose: 'Authentication', duration: 'Session' },
                    { name: 'cart_data', purpose: 'Shopping cart', duration: '30 days' },
                    { name: '_ga', purpose: 'Analytics', duration: '2 years' },
                    { name: '_gid', purpose: 'Analytics', duration: '24 hours' },
                    { name: 'preferences', purpose: 'User preferences', duration: '1 year' },
                  ].map((c, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 font-mono text-xs text-violet-300">{c.name}</td>
                      <td className="py-3">{c.purpose}</td>
                      <td className="py-3">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact Us</h2>
            <p className="text-white/30 text-sm leading-relaxed">For questions about our Cookie Policy, contact us at <span className="text-violet-300">privacy@shopwave.com</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
