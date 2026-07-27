'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { handleImageError } from '@/lib/utils';

const allCategories = ['Audio', 'Peripherals', 'Video', 'Displays', 'Accessories', 'Lighting', 'Wearables', 'Gaming', 'Bags'];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    params.set('limit', '100');
    fetch(`/api/products?${params}`).then(r => r.json()).then(d => { setProducts(d.products || []); setLoading(false); });
  };

  useEffect(() => { fetchProducts(); }, [category, search, sort]);

  useEffect(() => { setCategory(initialCategory); setSearch(initialSearch); }, [initialCategory, initialSearch]);

  const filteredProducts = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <div className="mesh-gradient" />
      <div className="max-w-7xl mx-auto animate-fade-up">

        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">{search ? `Results for "${search}"` : category || 'All Products'}</span>
          </h1>
          <p className="text-white/30 mt-2 text-sm">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && search.trim()) fetchProducts(); }}
            placeholder="Search for products, brands and more..."
            className="input-dark pl-12 py-3 text-base rounded-2xl"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 space-y-5`}>
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-4 text-white/60 uppercase tracking-wider">Categories</h3>
              <div className="space-y-1">
                <button onClick={() => setCategory('')} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${!category ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                  All Categories
                </button>
                {allCategories.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${category === cat ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-4 text-white/60 uppercase tracking-wider">Price Range</h3>
              <input type="range" min={0} max={1000} value={priceRange[1]} onChange={e => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-violet-500" />
              <div className="flex justify-between text-xs text-white/30 mt-2">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-sm mb-4 text-white/60 uppercase tracking-wider">Sort By</h3>
              <div className="space-y-1">
                {[
                  { value: '', label: 'Relevance' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Customer Rating' },
                ].map(s => (
                  <button key={s.value} onClick={() => setSort(s.value)} className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${sort === s.value ? 'bg-violet-500/20 text-violet-300 font-semibold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile filter toggle */}
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden mb-4 px-4 py-2 glass-card rounded-xl text-sm text-white/50 hover:text-white transition-all">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="glass-card rounded-2xl overflow-hidden">
                    <div className="skeleton aspect-square" />
                    <div className="p-5"><div className="skeleton h-5 w-3/4 mb-3" /><div className="skeleton h-4 w-1/2 mb-4" /><div className="skeleton h-10 w-32" /></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="glass-card rounded-3xl p-16 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold mb-2">No products found</h2>
                <p className="text-white/30 mb-6">Try adjusting your search or filters.</p>
                <button onClick={() => { setSearch(''); setCategory(''); setSort(''); setPriceRange([0, 1000]); }} className="btn-glow px-6 py-3"><span>Clear Filters</span></button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product, i) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group">
                    <div className="glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer h-full">
                      <div className="relative aspect-square overflow-hidden bg-white/2">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={handleImageError} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {product.badge && (
                          <span className={`absolute top-3 left-3 badge-glow badge-${product.badge === 'Best Seller' ? 'best' : product.badge === 'New' ? 'new' : product.badge === 'Sale' ? 'sale' : product.badge === 'Popular' ? 'popular' : 'trending'}`}>{product.badge}</span>
                        )}
                        {product.originalPrice && (
                          <span className="absolute top-3 right-3 badge-glow badge-sale">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-1.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          ))}
                          <span className="text-[10px] text-white/25 ml-1">({product.reviews.toLocaleString()})</span>
                        </div>
                        <h3 className="font-semibold text-sm group-hover:text-violet-300 transition-colors line-clamp-2 mb-1">{product.name}</h3>
                        <p className="text-white/25 text-xs line-clamp-1 mb-2">{product.category}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-extrabold text-white">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-white/20 line-through">${product.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <p className="text-green-400/70 text-xs mt-1.5">Free delivery</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-12 px-4 relative"><div className="mesh-gradient" /><div className="max-w-7xl mx-auto"><div className="skeleton h-10 w-48 mb-8" /><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i=><div key={i} className="glass-card rounded-2xl overflow-hidden"><div className="skeleton aspect-square" /><div className="p-5"><div className="skeleton h-5 w-3/4 mb-3" /><div className="skeleton h-10 w-full" /></div></div>)}</div></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
