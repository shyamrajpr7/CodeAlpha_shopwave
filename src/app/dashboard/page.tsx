'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleImageError } from '@/lib/utils';

type Tab = 'overview' | 'orders' | 'profile' | 'settings';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/[...nextauth]').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
    ]).then(([authData, ordersData]) => {
      if (!authData.user) { window.location.href = '/auth/login'; return; }
      setUser(authData.user);
      setName(authData.user.name || '');
      setEmail(authData.user.email || '');
      setOrders(ordersData.orders || []);
      setLoading(false);
    }).catch(() => { window.location.href = '/auth/login'; });
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg({ type: '', text: '' });
    try {
      const body: any = { name, email };
      if (newPassword) {
        if (newPassword !== confirmPassword) { setMsg({ type: 'error', text: 'Passwords do not match' }); setSaving(false); return; }
        body.currentPassword = currentPassword;
        body.newPassword = newPassword;
      }
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ type: 'error', text: data.error }); setSaving(false); return; }
      setUser(data.user);
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
      setMsg({ type: 'success', text: 'Profile updated successfully' });
    } catch {
      setMsg({ type: 'error', text: 'Something went wrong' });
    }
    setSaving(false);
  };

  const totalSpent = orders.reduce((sum: number, o: any) => sum + o.total, 0);
  const totalItems = orders.reduce((sum: number, o: any) => sum + o.items.reduce((s: number, i: any) => s + i.quantity, 0), 0);

  const statusColor = (s: string) => {
    switch (s) {
      case 'delivered': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'shipped': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'processing': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'pending': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 relative">
        <div className="mesh-gradient" />
        <div className="max-w-6xl mx-auto">
          <div className="skeleton h-10 w-48 mb-8" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-32 rounded-2xl" />)}
          </div>
          <div className="skeleton h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const tabs: { id: Tab; label: string; icon: JSX.Element }[] = [
    { id: 'overview', label: 'Overview', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { id: 'orders', label: 'Orders', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
    { id: 'profile', label: 'Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { id: 'settings', label: 'Settings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-6xl mx-auto animate-fade-up">

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-violet-500/20">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient">Welcome back, {user.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-white/30 text-sm mt-0.5">Manage your account and orders</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => { setActiveTab(t.id); setMsg({ type: '', text: '' }); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', value: orders.length, icon: '📦', color: 'from-violet-500/20 to-indigo-500/20', border: 'border-violet-500/20' },
                { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: '💰', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/20' },
                { label: 'Items Purchased', value: totalItems, icon: '🛒', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
                { label: 'Member Since', value: new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: '📅', color: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-500/20' },
              ].map((stat, i) => (
                <div key={i} className={`glass-card rounded-2xl p-5 border ${stat.border} hover:translate-y-0`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-gradient-to-r ${stat.color}`}>{stat.label}</span>
                  </div>
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Recent Orders</h2>
                {orders.length > 0 && (
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">View All</button>
                )}
              </div>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">📦</div>
                  <p className="text-white/30 mb-4">No orders yet</p>
                  <Link href="/products" className="btn-glow px-6 py-3 inline-flex"><span>Start Shopping</span></Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order: any) => (
                    <Link key={order.id} href={`/orders/${order.id}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-violet-500/20 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center text-lg flex-shrink-0">📦</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm group-hover:text-violet-300 transition-colors truncate">{order.orderNumber}</p>
                        <p className="text-xs text-white/30 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm">${order.total.toFixed(2)}</p>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${statusColor(order.status)}`}>{order.status}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Browse Products', href: '/products', icon: '🛍️' },
                  { label: 'View Cart', href: '/cart', icon: '🛒' },
                  { label: 'My Orders', href: '/orders', icon: '📦' },
                  { label: 'Edit Profile', action: () => setActiveTab('profile'), icon: '👤' },
                ].map((a, i) => (
                  <button key={i} onClick={a.action || (() => router.push(a.href!))} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-violet-500/20 transition-all group">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{a.icon}</span>
                    <span className="text-xs font-medium text-white/40 group-hover:text-white/70 transition-colors">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fade-up">
            <h2 className="text-xl font-bold mb-2">Order History</h2>
            {orders.length === 0 ? (
              <div className="glass-card rounded-2xl p-16 text-center">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                <p className="text-white/30 mb-6">Start shopping to see your orders here.</p>
                <Link href="/products" className="btn-glow px-6 py-3 inline-flex"><span>Browse Products</span></Link>
              </div>
            ) : (
              orders.map((order: any) => (
                <Link key={order.id} href={`/orders/${order.id}`} className="block glass-card rounded-2xl p-5 hover:translate-y-0 group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 flex items-center justify-center text-lg flex-shrink-0">📦</div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm group-hover:text-violet-300 transition-colors">{order.orderNumber}</p>
                        <p className="text-xs text-white/30 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item: any, i: number) => (
                          <img key={i} src={item.image} alt="" className="w-8 h-8 rounded-lg border-2 border-[#0a0a0f] object-cover" onError={handleImageError} />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded-lg bg-white/10 border-2 border-[#0a0a0f] flex items-center justify-center text-[10px] font-bold text-white/40">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total.toFixed(2)}</p>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${statusColor(order.status)}`}>{order.status}</span>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20 group-hover:text-violet-400 transition-colors flex-shrink-0"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl animate-fade-up">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

              {msg.text && (
                <div className={`mb-6 p-4 rounded-xl text-sm animate-scale-in ${
                  msg.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-300' : 'bg-green-500/10 border border-green-500/20 text-green-300'
                }`}>{msg.text}</div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg shadow-violet-500/20">
                    {name.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold">{name || 'User'}</p>
                    <p className="text-sm text-white/30">{email}</p>
                    <p className="text-xs text-white/20 mt-1 capitalize">Role: {user.role}</p>
                  </div>
                </div>

                <div className="line-glow" />

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-dark" required />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-dark" required />
                </div>

                <div className="line-glow" />
                <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">Change Password (optional)</p>

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Current Password</label>
                  <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="input-dark" placeholder="Enter current password" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">New Password</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-dark" placeholder="Min 6 characters" minLength={6} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-dark" placeholder="Confirm new password" />
                  </div>
                </div>

                <button type="submit" disabled={saving} className="btn-glow px-8 py-3 disabled:opacity-50">
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Notifications</h2>
              <div className="space-y-4">
                {[
                  { label: 'Order Updates', desc: 'Receive notifications about order status changes', defaultOn: true },
                  { label: 'Promotions', desc: 'Get notified about sales and special offers', defaultOn: true },
                  { label: 'New Products', desc: 'Be the first to know about new arrivals', defaultOn: false },
                  { label: 'Newsletter', desc: 'Weekly digest of trending products and deals', defaultOn: false },
                ].map((item, i) => (
                  <NotificationToggle key={i} {...item} />
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <p className="font-semibold text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-white/30 mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Coming Soon</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <p className="font-semibold text-sm">Active Sessions</p>
                    <p className="text-xs text-white/30 mt-0.5">Manage your active login sessions</p>
                  </div>
                  <span className="text-sm font-bold text-green-400">1 Active</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <p className="font-semibold text-sm">Login History</p>
                    <p className="text-xs text-white/30 mt-0.5">Review recent login activity</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">No suspicious activity</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-red-500/10">
              <h2 className="text-lg font-bold mb-2 text-red-400">Danger Zone</h2>
              <p className="text-sm text-white/30 mb-4">Permanently delete your account and all associated data.</p>
              <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function NotificationToggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs text-white/30 mt-0.5">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-all duration-300 ${on ? 'bg-violet-500' : 'bg-white/10'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  );
}
