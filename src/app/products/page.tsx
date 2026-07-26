'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    params.set('limit', '50');
    fetch(`/api/products?${params}`).then(r => r.json()).then(d => { setProducts(d.products || []); setLoading(false); });
  };

  useEffect(() => { fetchProducts(); }, [category, search, sort]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-7xl mx-auto animate-fade-up">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">All Products</span>
          </h1>
          <p className="text-white/30 mt-2 text-sm">{products.length} items found</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-dark pl-10" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)} className="input-dark max-w-xs cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'rgba(255,255,255,0.3)\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
            <option value="">All Categories</option>
            <option value="Audio">Audio</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Video">Video</option>
            <option value="Wearables">Wearables</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-dark max-w-xs cursor-pointer appearance-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'rgba(255,255,255,0.3)\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A-Z</option>
            <option value="newest">Newest First</option>
          </select>
          <div className="flex gap-1 glass rounded-xl p-1 self-start">
            {[
              { mode: 'grid', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
              { mode: 'list', icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
            ].map(m => (
              <button key={m.mode} onClick={() => setViewMode(m.mode as any)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${viewMode === m.mode ? 'bg-violet-500/20 text-violet-300' : 'text-white/30 hover:text-white/50'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={m.icon}/></svg>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <div className={viewMode === 'grid' ? 'skeleton aspect-square' : 'flex gap-5 p-5'} >
                  {viewMode === 'list' && <div className="skeleton w-32 h-32 rounded-xl flex-shrink-0" />}
                  <div className="flex-1 p-5"><div className="skeleton h-5 w-3/4 mb-3" /><div className="skeleton h-4 w-1/2 mb-4" /><div className="skeleton h-10 w-32" /></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="glass-card rounded-3xl p-16 text-center">
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-white/30">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}>
            {products.map((product, i) => (
              <div key={product.id} className="card-3d group animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className={`card-3d-inner glass-card rounded-2xl overflow-hidden relative ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className="card-glow rounded-2xl" />
                  <Link href={`/products/${product.id}`}>
                    <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-square' : 'w-48 flex-shrink-0'}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Link>
                  <div className={`p-5 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-sm group-hover:text-violet-300 transition-colors line-clamp-1">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= 4 ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        ))}
                      </div>
                      {viewMode === 'list' && <p className="text-white/30 text-xs mt-2 line-clamp-2">{product.description}</p>}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-extrabold">${product.price.toFixed(2)}</span>
                      <button onClick={async () => { await fetch('/api/cart/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.id, quantity: 1 }) }); }} className="w-9 h-9 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-300 hover:bg-violet-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" /><div className="max-w-7xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{[1,2,3,4,5,6].map(i=><div key={i} className="glass-card rounded-2xl overflow-hidden"><div className="skeleton aspect-square" /><div className="p-5"><div className="skeleton h-5 w-3/4 mb-3" /><div className="skeleton h-10 w-full" /></div></div>)}</div></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
