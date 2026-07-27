'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { handleImageError } from '@/lib/utils';

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 15,
    opacity: Math.random() * 0.3 + 0.1,
    color: ['#7c3aed', '#6366f1', '#a855f7', '#ec4899', '#38bdf8'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function Orb({ color, size, top, left, delay }: { color: string; size: number; top: string; left: string; delay: number }) {
  return (
    <div
      className="orb"
      style={{
        background: color,
        width: size,
        height: size,
        top,
        left,
        animationDelay: `${delay}s`,
        opacity: 0.4,
      }}
    />
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const featuredProducts = [
    { name: 'Premium Headphones', tagline: 'Immersive Sound. Timeless Design.', badge: 'best', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop' },
    { name: 'Smart Watch Pro', tagline: 'Your Health, Your Style.', badge: 'new', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop' },
    { name: 'Running Shoes', tagline: 'Run Beyond Limits.', badge: 'trending', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop' },
  ];

  useEffect(() => {
    fetch('/api/products?limit=8').then(r => r.json()).then(d => { setProducts(d.products || []); });
    fetch('/api/products').then(r => r.json()).then(d => {
      const cats = [...new Set((d.products || []).map((p: any) => p.category))];
      setCategories(cats);
    });
  }, []);

  useEffect(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('cart_count='));
    if (cookie) setCartCount(parseInt(cookie.split('=')[1]) || 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setFeaturedIdx(i => (i + 1) % featuredProducts.length), 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    setVisibleSections(prev => {
      const next = new Set(prev);
      entries.forEach(e => { if (e.isIntersecting) next.add(e.target.id); });
      return next;
    });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    sectionRefs.current.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [observerCallback]);

  const addRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="relative min-h-screen">
      <div className="mesh-gradient" />
      <Particles />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden px-4">
        <Orb color="rgba(99, 102, 241, 0.15)" size={500} top="-10%" left="10%" delay={0} />
        <Orb color="rgba(168, 85, 247, 0.1)" size={400} top="50%" left="70%" delay={2} />
        <Orb color="rgba(236, 72, 153, 0.08)" size={350} top="70%" left="20%" delay={4} />

        <div className="text-center max-w-5xl mx-auto relative z-10">
          <h1 className="animate-fade-up stagger-2" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="block text-6xl md:text-8xl lg:text-9xl font-extrabold leading-none tracking-tight">
              <span className="text-gradient">Discover</span>
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none mt-2 text-white/90">
              Your Style.
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl font-extrabold leading-none mt-2 text-gradient-warm">
              Define Yourself.
            </span>
          </h1>

          <p className="animate-fade-up stagger-3 mt-8 text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
            Curated collections that blend innovation with elegance. Shop the future, today.
          </p>

          <div className="animate-fade-up stagger-4 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <button className="btn-glow text-base px-10 py-4">
                <span>Shop Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </Link>
            <Link href="/products">
              <button className="btn-outline text-base px-10 py-4">Explore Collection</button>
            </Link>
          </div>

          <div className="animate-fade-up stagger-5 mt-20 flex items-center justify-center gap-12 text-white/20 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80">500+</div>
              <div className="mt-1">Products</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80">10K+</div>
              <div className="mt-1">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white/80">4.9</div>
              <div className="mt-1">Rating</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-violet-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES MARQUEE ========== */}
      <section className="py-8 border-y border-white/5 overflow-hidden">
        <div className="marquee">
          {[...categories, ...categories, ...categories].map((cat, i) => (
            <div key={i} className="flex-shrink-0 px-8 text-sm font-medium text-white/25 uppercase tracking-widest">
              {cat}
              <span className="ml-8 text-violet-500/40">&#9670;</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FEATURED SHOWCASE ========== */}
      <section id="featured" ref={addRef('featured')} className="py-24 px-4 relative">
        <Orb color="rgba(99, 102, 241, 0.08)" size={300} top="20%" left="5%" delay={1} />
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-violet-400 text-sm font-semibold tracking-wider uppercase">Featured</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient">Editor&apos;s Pick</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((fp, i) => (
              <div
                key={i}
                className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-700 ${isVisible('featured') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={fp.img}
                    alt={fp.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`badge-glow badge-${fp.badge}`}>{fp.badge}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold">{fp.name}</h3>
                  <p className="text-white/50 mt-1 text-sm">{fp.tagline}</p>
                  <Link href="/products">
                    <button className="mt-4 text-sm font-semibold text-violet-300 flex items-center gap-2 group/btn">
                      Shop Now
                      <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ========== PRODUCTS GRID ========== */}
      <section id="products" ref={addRef('products')} className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible('products') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-violet-400 text-sm font-semibold tracking-wider uppercase">Collection</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient-warm">Trending Now</span>
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <div className="skeleton aspect-square" />
                  <div className="p-5">
                    <div className="skeleton h-5 w-3/4 mb-3" />
                    <div className="skeleton h-4 w-1/2 mb-4" />
                    <div className="skeleton h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className={`card-3d group transition-all duration-700 ${isVisible('products') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="card-3d-inner glass-card rounded-2xl overflow-hidden relative">
                    <div className="card-glow rounded-2xl" />
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-violet-500/30 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          </button>
                        </div>
                        {product.category && (
                          <div className="absolute bottom-3 left-3">
                            <span className="badge-glow badge-new">{product.category}</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="p-5">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-base group-hover:text-violet-300 transition-colors line-clamp-1">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= 4 ? '#fbbf24' : 'none'} stroke="#fbbf24" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="text-xs text-white/30 ml-1">(4.0)</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-white">${product.price.toFixed(2)}</span>
                          {product.category && (
                            <span className="text-xs text-white/20 line-through">${(product.price * 1.3).toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          onClick={async () => {
                            await fetch('/api/cart/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.id, quantity: 1 }) });
                            setCartCount(c => c + 1);
                          }}
                          className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-300 hover:bg-violet-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`text-center mt-12 transition-all duration-700 ${isVisible('products') ? 'opacity-100' : 'opacity-0'}`}>
            <Link href="/products">
              <button className="btn-outline px-8 py-3.5 text-sm">View All Products</button>
            </Link>
          </div>
        </div>
      </section>

      <div className="line-glow max-w-4xl mx-auto" />

      {/* ========== WHY US ========== */}
      <section id="why" ref={addRef('why')} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-violet-400 text-sm font-semibold tracking-wider uppercase">Why ShopWave</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-3" style={{ fontFamily: 'var(--font-syne)' }}>
              <span className="text-gradient">Built Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Free Shipping', desc: 'On all orders over $50. Fast & reliable delivery worldwide.' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure Payment', desc: '256-bit SSL encryption. Your data is always protected.' },
              { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: '30-Day Returns', desc: 'Not satisfied? Return within 30 days for a full refund.' },
            ].map((f, i) => (
              <div
                key={i}
                className={`glass-card rounded-3xl p-8 text-center transition-all duration-700 ${isVisible('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-5 border border-violet-500/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER CTA ========== */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
          <Orb color="rgba(124, 58, 237, 0.15)" size={300} top="-20%" left="30%" delay={0} />
          <h2 className="text-3xl md:text-5xl font-extrabold relative z-10" style={{ fontFamily: 'var(--font-syne)' }}>
            <span className="text-gradient">Stay in the Loop</span>
          </h2>
          <p className="text-white/35 mt-4 max-w-lg mx-auto relative z-10">Subscribe for exclusive drops, early access, and members-only deals.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto relative z-10">
            <input type="email" placeholder="your@email.com" className="input-dark flex-1" />
            <Link href="/subscribe">
              <button className="btn-glow px-8 whitespace-nowrap">
                <span>Subscribe</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
