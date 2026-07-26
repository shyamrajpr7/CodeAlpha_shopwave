'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { handleImageError } from '@/lib/utils';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`).then(r => r.json()).then(d => {
      setProduct(d.product);
      setLoading(false);
      if (d.product?.category) {
        fetch(`/api/products?category=${d.product.category}&limit=4`).then(r => r.json()).then(rd => {
          setRelatedProducts((rd.products || []).filter((p: any) => p.id !== d.product.id).slice(0, 3));
        });
      }
    });
  }, [id]);

  const addToCart = async () => {
    setAdding(true);
    await fetch('/api/cart/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.id, quantity }) });
    setTimeout(() => { setAdding(false); router.refresh(); }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 relative">
        <div className="mesh-gradient" />
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="skeleton aspect-square rounded-3xl" />
            <div className="space-y-6 pt-4">
              <div className="skeleton h-4 w-24 rounded-full" />
              <div className="skeleton h-10 w-3/4" />
              <div className="skeleton h-6 w-1/3" />
              <div className="skeleton h-20 w-full" />
              <div className="skeleton h-14 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative">
        <div className="mesh-gradient" />
        <div className="text-center animate-fade-up">
          <h1 className="text-3xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Product Not Found</h1>
          <Link href="/products"><button className="btn-glow px-8 py-3"><span>Back to Products</span></button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-6xl mx-auto animate-fade-up">
        <nav className="flex items-center gap-2 text-sm text-white/25 mb-8">
          <Link href="/" className="hover:text-white/50 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white/50 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/50 truncate">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="card-3d">
            <div className="card-3d-inner relative rounded-3xl overflow-hidden glass-card">
              <div className="card-glow rounded-3xl" />
              <div className="aspect-square relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={handleImageError} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {product.category && (
                  <div className="absolute top-5 left-5">
                    <span className="badge-glow badge-new text-sm px-4 py-1.5">{product.category}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-4">
            <span className="text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">In Stock</span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>{product.name}</h1>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= 4 ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span className="text-sm text-white/30">(4.0)</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-gradient">${product.price.toFixed(2)}</span>
              <span className="text-lg text-white/20 line-through">${(product.price * 1.3).toFixed(2)}</span>
              <span className="badge-glow badge-sale text-xs">Save 30%</span>
            </div>

            <p className="mt-6 text-white/40 leading-relaxed text-sm">{product.description}</p>

            <div className="line-glow my-6" />

            <div>
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all text-lg font-medium">-</button>
                  <span className="w-12 h-12 flex items-center justify-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all text-lg font-medium">+</button>
                </div>
                <span className="text-sm text-white/25">= ${(product.price * quantity).toFixed(2)} total</span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={addToCart} disabled={adding} className="btn-glow flex-1 justify-center py-4 text-base disabled:opacity-50">
                <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
              </button>
              <button className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/5 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', label: 'Free Shipping' },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Secure' },
                { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', label: '30-Day Returns' },
              ].map((f, i) => (
                <div key={i} className="glass-card rounded-xl p-3 text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-violet-400 mb-1.5"><path d={f.icon}/></svg>
                  <span className="text-[10px] text-white/30 font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="line-glow mb-12" />
            <h2 className="text-2xl font-extrabold mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient">You May Also Like</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((rp: any) => (
                <Link key={rp.id} href={`/products/${rp.id}`} className="glass-card rounded-2xl overflow-hidden group hover-lift">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={handleImageError} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm group-hover:text-violet-300 transition-colors">{rp.name}</h3>
                    <span className="text-lg font-extrabold mt-1 block">${rp.price.toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
