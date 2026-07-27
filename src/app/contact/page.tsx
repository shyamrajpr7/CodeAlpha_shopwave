'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-4xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Contact Us</span>
          </h1>
          <p className="text-white/30 mt-4 max-w-lg mx-auto">Have a question or need help? We&apos;re here for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '📧', title: 'Email', desc: 'support@shopwave.com', sub: 'We reply within 24 hours' },
            { icon: '💬', title: 'Live Chat', desc: 'Available 24/7', sub: 'Instant support' },
            { icon: '📞', title: 'Phone', desc: '+1 (555) 123-4567', sub: 'Mon-Fri 9am-6pm EST' },
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center hover-lift">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-violet-300 text-sm font-medium">{item.desc}</p>
              <p className="text-white/20 text-xs mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="glass-card rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
            <p className="text-white/30">We&apos;ll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium text-white/40 mb-2">Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-dark w-full" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/40 mb-2">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-dark w-full" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-white/40 mb-2">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-dark w-full" placeholder="How can we help?" required />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/40 mb-2">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="input-dark w-full h-40 resize-none" placeholder="Tell us more..." required />
            </div>
            <button type="submit" className="btn-glow px-8 py-3"><span>Send Message</span></button>
          </form>
        )}
      </div>
    </div>
  );
}
