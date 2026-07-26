'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Star, ShoppingCart, ChevronLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { router.push('/products'); return; }
        setProduct(data);
        setLoading(false);
      })
      .catch(() => { router.push('/products'); });
  }, [id, router]);

  const addToCart = async () => {
    setAdding(true);
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id, quantity }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Added to cart!');
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to add to cart');
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square skeleton rounded-3xl" />
          <div className="space-y-4 py-4">
            <div className="h-6 skeleton w-1/3" />
            <div className="h-10 skeleton w-2/3" />
            <div className="h-4 skeleton w-full" />
            <div className="h-4 skeleton w-3/4" />
            <div className="h-12 skeleton w-1/3 mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const features = product.features ? JSON.parse(product.features) : [];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm font-medium mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 badge badge-best text-sm">{product.badge}</span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 badge badge-sale text-sm">Save {discount}%</span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">{product.category}</span>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="badge badge-sale">${(product.originalPrice - product.price).toFixed(2)} off</span>
              </>
            )}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((f: string) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="mb-6">
            <div className={`flex items-center gap-2 text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
              {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium"
                >
                  −
                </button>
                <span className="px-4 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                disabled={adding}
                className="btn-primary flex-1 py-3.5 text-base disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          )}

          {/* Trust features */}
          <div className="border-t border-gray-100 pt-6 space-y-3">
            {[
              { icon: Truck, text: 'Free shipping on orders over $50' },
              { icon: Shield, text: '2-year manufacturer warranty' },
              { icon: RotateCcw, text: '30-day hassle-free returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-gray-500">
                <Icon className="w-4 h-4 text-gray-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
