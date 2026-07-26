'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const statusConfig: Record<string, { icon: any; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  confirmed: { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newOrderId = searchParams.get('new');

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOrder, setNewOrder] = useState<any>(null);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { router.push('/auth/login'); return; }
        setOrders(data.orders || []);
        if (newOrderId) {
          const found = data.orders?.find((o: any) => o.id === newOrderId);
          if (found) setNewOrder(found);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [newOrderId, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 skeleton w-48 mb-8" />
        {[1, 2, 3].map((i) => <div key={i} className="h-32 skeleton rounded-2xl mb-4" />)}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      {/* Order Confirmation */}
      {newOrder && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 animate-slide-down">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 text-lg">Order Placed Successfully!</h3>
              <p className="text-green-700 text-sm mt-1">
                Your order <strong>{newOrder.orderNumber}</strong> has been confirmed.
                Total: <strong>${newOrder.total.toFixed(2)}</strong>
              </p>
              <button
                onClick={() => setNewOrder(null)}
                className="text-green-600 text-sm font-medium mt-2 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
      <p className="text-gray-500 mb-8">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-8">Start shopping to see your orders here</p>
          <Link href="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                          <StatusIcon className="w-3 h-3" />
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900 truncate max-w-[120px]">{item.name}</p>
                          <p className="text-xs text-gray-500">×{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
