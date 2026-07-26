'use client';

import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';

function getBadgeClass(badge: string | null) {
  if (!badge) return '';
  const lower = badge.toLowerCase();
  if (lower === 'sale') return 'badge-sale';
  if (lower === 'new') return 'badge-new';
  if (lower === 'best seller') return 'badge-best';
  if (lower === 'popular') return 'badge-popular';
  return 'badge-trending';
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: any }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(data.error || 'Failed to add to cart');
      }
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="product-card block bg-white rounded-2xl overflow-hidden group">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 badge badge-sale">
            -{discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={addToCart}
            className="p-2.5 bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-600 hover:text-white transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
