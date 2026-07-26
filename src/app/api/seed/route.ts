import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const products = [
  { name: 'Noise-Cancelling Headphones', slug: 'noise-cancelling-headphones', description: 'Immerse yourself in studio-quality sound with 40-hour battery life and adaptive noise cancellation.', price: 299.99, originalPrice: 399.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', badge: 'Best Seller', rating: 4.8, reviews: 1243, stock: 15, features: JSON.stringify(['40-hour battery', 'Adaptive ANC', 'Foldable design', 'USB-C charging', 'Bluetooth 5.3']), color: '#6366f1' },
  { name: 'Mechanical Keyboard Pro', slug: 'mechanical-keyboard-pro', description: 'Full-size mechanical keyboard with hot-swappable switches and per-key RGB lighting.', price: 149.99, originalPrice: null, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', badge: 'New', rating: 4.7, reviews: 876, stock: 32, features: JSON.stringify(['Hot-swap switches', 'Per-key RGB', 'Aluminum body', 'USB-C cable', 'N-key rollover']), color: '#0ea5e9' },
  { name: '4K Webcam Ultra', slug: '4k-webcam-ultra', description: 'Broadcast-quality 4K streaming at 60fps with AI auto-framing and dual studio mics.', price: 199.99, originalPrice: 249.99, category: 'Video', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80', badge: 'Sale', rating: 4.6, reviews: 532, stock: 8, features: JSON.stringify(['4K/60fps', 'AI auto-framing', 'Built-in ring light', 'Dual mics', 'Works with all platforms']), color: '#10b981' },
  { name: 'Ergonomic Mouse', slug: 'ergonomic-mouse', description: 'Vertical grip reduces wrist strain by 60%. 8 programmable buttons and 32,000 DPI sensor.', price: 89.99, originalPrice: null, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', badge: null, rating: 4.9, reviews: 2104, stock: 45, features: JSON.stringify(['Vertical ergonomic grip', '32,000 DPI sensor', '8 buttons', '300-hour battery', 'Bluetooth + 2.4GHz']), color: '#f59e0b' },
  { name: 'Smart Desk Lamp', slug: 'smart-desk-lamp', description: 'Circadian-aware LED lamp with app control, 16M colours and wireless charging base.', price: 69.99, originalPrice: 89.99, category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 341, stock: 20, features: JSON.stringify(['16M colour modes', 'Wireless charging', 'App & voice control', 'USB-A + USB-C', 'Eye-care tech']), color: '#ec4899' },
  { name: 'USB-C Hub 12-in-1', slug: 'usb-c-hub-12-in-1', description: 'Turn one USB-C port into a full workstation with dual 4K HDMI and 100W PD.', price: 79.99, originalPrice: null, category: 'Accessories', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80', badge: 'Popular', rating: 4.7, reviews: 1589, stock: 60, features: JSON.stringify(['Dual 4K HDMI', '10Gbps USB-A x3', 'SD + microSD', 'Gigabit Ethernet', '100W Power Delivery']), color: '#8b5cf6' },
  { name: 'Wireless Earbuds Pro', slug: 'wireless-earbuds-pro', description: 'Crystal-clear audio with spatial sound and 36-hour total battery life with case.', price: 179.99, originalPrice: 219.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80', badge: 'Trending', rating: 4.8, reviews: 2891, stock: 25, features: JSON.stringify(['Spatial Audio', '36-hour battery', 'IPX5 waterproof', 'Wireless charging', 'Active noise cancelling']), color: '#14b8a6' },
  { name: 'Ultra-Wide Monitor 34"', slug: 'ultra-wide-monitor-34', description: 'Stunning 34-inch curved display with 165Hz refresh rate and USB-C docking.', price: 599.99, originalPrice: 749.99, category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80', badge: 'Best Seller', rating: 4.9, reviews: 743, stock: 10, features: JSON.stringify(['34" UWQHD 165Hz', '1ms response', 'USB-C 90W PD', 'KVM switch', 'HDR 400']), color: '#a855f7' },
];

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json({ message: 'Database already seeded', seeded: true });
    }

    const hashed = await bcrypt.hash('password123', 10);

    await prisma.user.create({ data: { name: 'Admin', email: 'admin@shopwave.com', password: hashed, role: 'admin' } });
    await prisma.user.create({ data: { name: 'Demo User', email: 'demo@shopwave.com', password: hashed, role: 'customer' } });

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    return NextResponse.json({ message: 'Database seeded successfully', seeded: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
