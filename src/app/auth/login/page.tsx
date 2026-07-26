'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); setLoading(false); return; }
      router.push('/');
      window.location.reload();
    } catch { setError('Something went wrong'); setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12 relative">
      <div className="mesh-gradient" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] orb" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px] orb" style={{ animationDelay: '3s' }} />

      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-extrabold text-white text-xl shadow-lg shadow-violet-500/20">S</div>
          </Link>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Welcome Back</span>
          </h1>
          <p className="text-white/30 mt-2 text-sm">Sign in to your account</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm animate-scale-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-dark" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-dark" placeholder="••••••••" required />
            </div>
            <button type="submit" disabled={loading} className="btn-glow w-full justify-center py-4 text-base disabled:opacity-50">
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-white/25 text-sm">
              Demo: <span className="text-violet-300 font-medium">demo@shopwave.com</span> / <span className="text-violet-300 font-medium">password123</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-white/25">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
