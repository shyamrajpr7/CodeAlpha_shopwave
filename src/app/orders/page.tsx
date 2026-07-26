'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { handleImageError } from '@/lib/utils';

function OrdersContent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders').then(r => r.json()).then(d => { setOrders(d.orders || []); setLoading(false); });
  }, []);

  const statusColor: Record<string, string> = {
    pending: 'badge-trending',
    processing: 'badge-popular',
    shipped: 'badge-best',
    delivered: 'badge-new',
    cancelled: 'badge-sale',
  };

  if (loading) return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-4xl mx-auto">
        <div className="skeleton h-10 w-48 mb-8" />
        <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="glass-card rounded-2xl p-6"><div className="flex justify-between mb-4"><div className="skeleton h-5 w-32" /><div className="skeleton h-5 w-20 rounded-full" /></div><div className="skeleton h-4 w-48 mb-3" /><div className="skeleton h-8 w-full" /></div>)}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-4xl mx-auto animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
          <span className="text-gradient">Your Orders</span>
        </h1>
        <p className="text-white/30 text-sm mb-8">{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>

        {orders.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-400"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-white/30 mb-8">Start shopping to see your orders here.</p>
            <Link href="/products"><button className="btn-glow px-8 py-3"><span>Start Shopping</span></button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <div key={order.id} className="glass-card rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-base">Order #{order.orderNumber}</h3>
                    <p className="text-xs text-white/25 mt-1">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span className={`badge-glow ${statusColor[order.status] || 'badge-popular'} self-start`}>{order.status}</span>
                </div>

                <div className="space-y-2.5 mb-4">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3 bg-white/2 rounded-xl p-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.product?.image} alt="" className="w-full h-full object-cover" onError={handleImageError} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{item.product?.name}</div>
                        <div className="text-xs text-white/25">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="line-glow mb-3" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}</span>
                  <span className="text-lg font-extrabold text-gradient">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" /><div className="max-w-4xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /></div></div>}>
      <OrdersContent />
    </Suspense>
  );
}
