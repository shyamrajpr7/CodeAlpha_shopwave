'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setCart(data.cart || []);
      setTotal(data.total || 0);
      setCount(data.count || 0);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchCart(); }, []);

  const updateQuantity = async (productId: string, quantity: number) => {
    const res = await fetch('/api/cart/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await res.json();
    if (data.success) fetchCart();
  };

  const removeItem = async (productId: string) => {
    const res = await fetch(`/api/cart/remove/${productId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      toast.success('Item removed from cart');
      fetchCart();
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 skeleton w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-28 skeleton rounded-2xl" />)}
          </div>
          <div className="h-64 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center page-enter">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet</p>
        <Link href="/products" className="btn-primary">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Your Cart ({count} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item: any) => (
            <div key={item.id || item.productId} className="bg-white rounded-2xl p-4 md:p-6 flex gap-4 border border-gray-100">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-brand-600 font-bold text-lg mt-1">${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1.5 text-gray-500 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1.5 font-medium text-sm min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, Math.min(item.stock, item.quantity + 1))}
                      className="px-3 py-1.5 text-gray-500 hover:bg-gray-50"
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
            <h3 className="font-display text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({count} items)</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">{total >= 50 ? 'Free' : '$9.99'}</span>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">
                    ${(total >= 50 ? total : total + 9.99).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/checkout" className="btn-primary w-full justify-center py-3.5 text-base">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="block text-center text-sm text-brand-600 font-medium mt-4 hover:text-brand-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
