import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  // Audio
  { name: 'Noise-Cancelling Headphones', slug: 'noise-cancelling-headphones', description: 'Immerse yourself in studio-quality sound with 40-hour battery life and adaptive noise cancellation.', price: 299.99, originalPrice: 399.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', badge: 'Best Seller', rating: 4.8, reviews: 1243, stock: 15, features: JSON.stringify(['40-hour battery', 'Adaptive ANC', 'Foldable design', 'USB-C charging', 'Bluetooth 5.3']), color: '#6366f1' },
  { name: 'Wireless Earbuds Pro', slug: 'wireless-earbuds-pro', description: 'Crystal-clear audio with spatial sound and 36-hour total battery life with case.', price: 179.99, originalPrice: 219.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80', badge: 'Trending', rating: 4.8, reviews: 2891, stock: 25, features: JSON.stringify(['Spatial Audio', '36-hour battery', 'IPX5 waterproof', 'Wireless charging', 'Active noise cancelling']), color: '#14b8a6' },
  { name: 'Portable Bluetooth Speaker', slug: 'portable-bluetooth-speaker', description: 'Waterproof 360° surround sound speaker with 24-hour playtime and built-in microphone.', price: 79.99, originalPrice: 99.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 876, stock: 40, features: JSON.stringify(['360° sound', 'IPX7 waterproof', '24-hour battery', 'USB-C charging', 'Party mode']), color: '#f59e0b' },
  { name: 'Studio Monitor Headphones', slug: 'studio-monitor-headphones', description: 'Flat response professional studio headphones with detachable cables and memory foam pads.', price: 249.99, originalPrice: null, category: 'Audio', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80', badge: null, rating: 4.7, reviews: 432, stock: 12, features: JSON.stringify(['Flat response', 'Detachable cable', 'Memory foam pads', '50mm drivers', 'Impedance 32 Ohm']), color: '#8b5cf6' },
  { name: 'Wireless Soundbar', slug: 'wireless-soundbar', description: 'Dolby Atmos soundbar with wireless subwoofer and HDMI eARC for immersive home theater.', price: 349.99, originalPrice: 449.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80', badge: 'Sale', rating: 4.6, reviews: 321, stock: 8, features: JSON.stringify(['Dolby Atmos', 'Wireless subwoofer', 'HDMI eARC', 'Bluetooth 5.2', 'Voice assistant']), color: '#ec4899' },
  { name: 'True Wireless Earbuds Lite', slug: 'true-wireless-earbuds-lite', description: 'Budget-friendly true wireless earbuds with 30-hour battery and IPX4 water resistance.', price: 39.99, originalPrice: 59.99, category: 'Audio', image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', badge: 'Popular', rating: 4.3, reviews: 5678, stock: 100, features: JSON.stringify(['30-hour battery', 'IPX4 water resistant', 'Touch controls', 'Bluetooth 5.1', 'Lightweight 4g each']), color: '#0ea5e9' },

  // Peripherals
  { name: 'Mechanical Keyboard Pro', slug: 'mechanical-keyboard-pro', description: 'Full-size mechanical keyboard with hot-swappable switches and per-key RGB lighting.', price: 149.99, originalPrice: null, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', badge: 'New', rating: 4.7, reviews: 876, stock: 32, features: JSON.stringify(['Hot-swap switches', 'Per-key RGB', 'Aluminum body', 'USB-C cable', 'N-key rollover']), color: '#0ea5e9' },
  { name: 'Ergonomic Mouse', slug: 'ergonomic-mouse', description: 'Vertical grip reduces wrist strain by 60%. 8 programmable buttons and 32,000 DPI sensor.', price: 89.99, originalPrice: null, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', badge: null, rating: 4.9, reviews: 2104, stock: 45, features: JSON.stringify(['Vertical ergonomic grip', '32,000 DPI sensor', '8 buttons', '300-hour battery', 'Bluetooth + 2.4GHz']), color: '#f59e0b' },
  { name: 'Gaming Mouse RGB', slug: 'gaming-mouse-rgb', description: 'Ultra-light 58g gaming mouse with 26,000 DPI optical sensor and 8K Hz polling rate.', price: 69.99, originalPrice: 89.99, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80', badge: 'Sale', rating: 4.8, reviews: 1567, stock: 28, features: JSON.stringify(['58g ultra-light', '26,000 DPI', '8K Hz polling', 'PTFE feet', 'Paracord cable']), color: '#ef4444' },
  { name: 'Wireless Keyboard Compact', slug: 'wireless-keyboard-compact', description: 'Slim 75% layout wireless keyboard with dual Bluetooth + 2.4GHz and Mac/Win switch.', price: 59.99, originalPrice: null, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', badge: null, rating: 4.4, reviews: 324, stock: 50, features: JSON.stringify(['75% compact layout', 'Dual connectivity', 'Mac/Win switch', 'Rechargeable', 'Low profile keys']), color: '#10b981' },
  { name: 'Mouse Pad XL', slug: 'mouse-pad-xl', description: 'Extended desk mat 900x400mm with stitched edges and anti-slip rubber base.', price: 19.99, originalPrice: 29.99, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 2341, stock: 80, features: JSON.stringify(['900x400mm XL size', 'Stitched edges', 'Anti-slip base', 'Water resistant', 'Smooth surface']), color: '#6366f1' },
  { name: 'Trackball Mouse', slug: 'trackball-mouse', description: 'Index finger trackball with haptic feedback scroll and 4 programmable buttons.', price: 109.99, originalPrice: null, category: 'Peripherals', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', badge: null, rating: 4.6, reviews: 189, stock: 15, features: JSON.stringify(['Index finger trackball', 'Haptic feedback', '4 buttons', 'USB-C rechargeable', 'Ergonomic design']), color: '#8b5cf6' },

  // Video
  { name: '4K Webcam Ultra', slug: '4k-webcam-ultra', description: 'Broadcast-quality 4K streaming at 60fps with AI auto-framing and dual studio mics.', price: 199.99, originalPrice: 249.99, category: 'Video', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80', badge: 'Sale', rating: 4.6, reviews: 532, stock: 8, features: JSON.stringify(['4K/60fps', 'AI auto-framing', 'Built-in ring light', 'Dual mics', 'Works with all platforms']), color: '#10b981' },
  { name: '1080p Webcam HD', slug: '1080p-webcam-hd', description: 'Budget-friendly 1080p webcam with auto light correction and privacy shutter.', price: 49.99, originalPrice: 69.99, category: 'Video', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80', badge: 'Popular', rating: 4.4, reviews: 3456, stock: 60, features: JSON.stringify(['1080p/30fps', 'Auto light correction', 'Privacy shutter', 'Built-in mic', 'USB plug and play']), color: '#06b6d4' },
  { name: 'Ring Light 18"', slug: 'ring-light-18', description: 'Professional 18-inch ring light with tripod stand, phone holder and remote.', price: 59.99, originalPrice: 79.99, category: 'Video', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 1234, stock: 35, features: JSON.stringify(['18-inch ring light', 'Adjustable tripod', 'Phone holder', 'Remote control', '3 color temperatures']), color: '#f59e0b' },
  { name: 'Capture Card 4K', slug: 'capture-card-4k', description: 'External capture card for streaming with passthrough, HDMI in/out, and zero latency.', price: 129.99, originalPrice: null, category: 'Video', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80', badge: null, rating: 4.7, reviews: 456, stock: 18, features: JSON.stringify(['4K30 capture', '1080p60 passthrough', 'HDMI in/out', 'USB-C', 'Zero latency']), color: '#ef4444' },

  // Displays
  { name: 'Ultra-Wide Monitor 34"', slug: 'ultra-wide-monitor-34', description: 'Stunning 34-inch curved display with 165Hz refresh rate and USB-C docking.', price: 599.99, originalPrice: 749.99, category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80', badge: 'Best Seller', rating: 4.9, reviews: 743, stock: 10, features: JSON.stringify(['34" UWQHD 165Hz', '1ms response', 'USB-C 90W PD', 'KVM switch', 'HDR 400']), color: '#a855f7' },
  { name: 'Portable Monitor 15.6"', slug: 'portable-monitor-15', description: 'Ultra-slim 15.6" portable USB-C monitor with 1080p IPS panel and kickstand.', price: 179.99, originalPrice: 229.99, category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 567, stock: 22, features: JSON.stringify(['15.6" FHD IPS', 'USB-C plug & play', '100% sRGB', 'Built-in kickstand', '780g ultra-slim']), color: '#06b6d4' },
  { name: 'Gaming Monitor 27"', slug: 'gaming-monitor-27', description: '27-inch QHD gaming monitor with 240Hz refresh rate and 1ms GtG response time.', price: 449.99, originalPrice: 549.99, category: 'Displays', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80', badge: 'Trending', rating: 4.8, reviews: 891, stock: 14, features: JSON.stringify(['27" QHD 240Hz', '1ms GtG', 'FreeSync Premium', 'HDR 600', 'USB hub']), color: '#10b981' },
  { name: 'Monitor Light Bar', slug: 'monitor-light-bar', description: 'Asymmetric LED light bar with auto-dimming, ambient sensor and USB hub.', price: 49.99, originalPrice: 69.99, category: 'Displays', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80', badge: 'Popular', rating: 4.6, reviews: 2345, stock: 55, features: JSON.stringify(['Asymmetric light', 'Auto-dimming', 'Ambient sensor', 'USB hub', 'Memory function']), color: '#f59e0b' },

  // Accessories
  { name: 'USB-C Hub 12-in-1', slug: 'usb-c-hub-12-in-1', description: 'Turn one USB-C port into a full workstation with dual 4K HDMI and 100W PD.', price: 79.99, originalPrice: null, category: 'Accessories', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80', badge: 'Popular', rating: 4.7, reviews: 1589, stock: 60, features: JSON.stringify(['Dual 4K HDMI', '10Gbps USB-A x3', 'SD + microSD', 'Gigabit Ethernet', '100W Power Delivery']), color: '#8b5cf6' },
  { name: 'Laptop Stand Adjustable', slug: 'laptop-stand-adjustable', description: 'Ergonomic aluminum laptop stand with 6 angle settings and ventilation cutouts.', price: 34.99, originalPrice: 49.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', badge: 'Sale', rating: 4.6, reviews: 3456, stock: 70, features: JSON.stringify(['6 angle settings', 'Aluminum body', 'Ventilation cutouts', 'Foldable design', 'Supports up to 17"']), color: '#6366f1' },
  { name: 'Webcam Tripod Mini', slug: 'webcam-tripod-mini', description: 'Compact metal tripod with ball head mount, cold shoe and phone clamp.', price: 24.99, originalPrice: null, category: 'Accessories', image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&q=80', badge: null, rating: 4.4, reviews: 876, stock: 90, features: JSON.stringify(['Metal construction', 'Ball head mount', 'Cold shoe', 'Phone clamp', 'Max height 30cm']), color: '#0ea5e9' },
  { name: 'Desk Cable Management', slug: 'desk-cable-management', description: 'Under-desk cable tray with adhesive mount and 10 velcro cable ties included.', price: 14.99, originalPrice: 24.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80', badge: 'Sale', rating: 4.3, reviews: 4567, stock: 120, features: JSON.stringify(['Under-desk tray', 'Adhesive mount', '10 velcro ties', 'Steel mesh', 'Easy install']), color: '#14b8a6' },
  { name: 'Wireless Charging Pad', slug: 'wireless-charging-pad', description: '15W fast wireless charger with LED indicator, compatible with all Qi devices.', price: 19.99, originalPrice: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80', badge: null, rating: 4.5, reviews: 2891, stock: 85, features: JSON.stringify(['15W fast charge', 'Qi compatible', 'LED indicator', 'Anti-slip pad', 'Overheat protection']), color: '#a855f7' },
  { name: 'USB-C Cable 2m', slug: 'usb-c-cable-2m', description: 'Braided nylon USB-C to USB-C cable with 100W PD and 480Mbps data transfer.', price: 12.99, originalPrice: null, category: 'Accessories', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', badge: null, rating: 4.7, reviews: 6789, stock: 200, features: JSON.stringify(['100W Power Delivery', '480Mbps data', 'Braided nylon', '2m length', 'Aluminum connectors']), color: '#06b6d4' },

  // Lighting
  { name: 'Smart Desk Lamp', slug: 'smart-desk-lamp', description: 'Circadian-aware LED lamp with app control, 16M colours and wireless charging base.', price: 69.99, originalPrice: 89.99, category: 'Lighting', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 341, stock: 20, features: JSON.stringify(['16M colour modes', 'Wireless charging', 'App & voice control', 'USB-A + USB-C', 'Eye-care tech']), color: '#ec4899' },
  { name: 'LED Strip Lights 5m', slug: 'led-strip-lights-5m', description: '5-meter RGB LED strip with app control, music sync and 16 million colors.', price: 29.99, originalPrice: 39.99, category: 'Lighting', image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80', badge: 'Popular', rating: 4.4, reviews: 3456, stock: 45, features: JSON.stringify(['5m length', '16M colors', 'Music sync', 'App control', 'Self-adhesive']), color: '#8b5cf6' },
  { name: 'Desk Lamp Foldable', slug: 'desk-lamp-foldable', description: 'Minimalist foldable desk lamp with 3 brightness levels and 5000K daylight color.', price: 24.99, originalPrice: null, category: 'Lighting', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80', badge: null, rating: 4.3, reviews: 1234, stock: 50, features: JSON.stringify(['3 brightness levels', '5000K daylight', 'Foldable design', 'USB powered', 'Touch control']), color: '#f59e0b' },

  // Wearables
  { name: 'Smart Watch Pro', slug: 'smart-watch-pro', description: 'AMOLED always-on display with GPS, heart rate, SpO2 and 14-day battery life.', price: 199.99, originalPrice: 249.99, category: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', badge: 'New', rating: 4.7, reviews: 892, stock: 18, features: JSON.stringify(['AMOLED display', 'GPS built-in', 'Heart rate + SpO2', '14-day battery', '50m water resistant']), color: '#0ea5e9' },
  { name: 'Fitness Band', slug: 'fitness-band', description: 'Lightweight fitness tracker with heart rate, sleep tracking and 10-day battery.', price: 39.99, originalPrice: 59.99, category: 'Wearables', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80', badge: 'Sale', rating: 4.4, reviews: 4567, stock: 65, features: JSON.stringify(['Heart rate monitor', 'Sleep tracking', '10-day battery', 'IP68 waterproof', '14 sport modes']), color: '#10b981' },
  { name: 'Wireless Earbuds Sport', slug: 'wireless-earbuds-sport', description: 'Secure-fit sport earbuds with ear hooks, IP68 rating and 10-hour playtime.', price: 59.99, originalPrice: null, category: 'Wearables', image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=600&q=80', badge: null, rating: 4.5, reviews: 789, stock: 40, features: JSON.stringify(['Ear hook design', 'IP68 rating', '10-hour playtime', 'Wireless charging', 'Sweat proof']), color: '#ec4899' },
  { name: 'Running Shoes', slug: 'running-shoes', description: 'Lightweight running shoes with carbon plate, responsive foam and breathable mesh.', price: 129.99, originalPrice: 169.99, category: 'Wearables', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', badge: 'Trending', rating: 4.8, reviews: 2345, stock: 30, features: JSON.stringify(['Carbon plate', 'Responsive foam', 'Breathable mesh', '180g ultralight', 'Energy return']), color: '#ef4444' },

  // Gaming
  { name: 'Gaming Controller', slug: 'gaming-controller', description: 'Pro wireless controller with Hall Effect joysticks, RGB and 4 back buttons.', price: 69.99, originalPrice: 89.99, category: 'Gaming', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&q=80', badge: 'New', rating: 4.7, reviews: 654, stock: 25, features: JSON.stringify(['Hall Effect joysticks', 'RGB lighting', '4 back buttons', '1000Hz polling', '30-hour battery']), color: '#6366f1' },
  { name: 'Gaming Headset 7.1', slug: 'gaming-headset-71', description: 'Virtual 7.1 surround sound gaming headset with detachable mic and memory foam.', price: 89.99, originalPrice: null, category: 'Gaming', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&q=80', badge: null, rating: 4.6, reviews: 1234, stock: 22, features: JSON.stringify(['Virtual 7.1 surround', 'Detachable mic', 'Memory foam pads', 'USB + 3.5mm', 'LED lighting']), color: '#ef4444' },
  { name: 'Gaming Mousepad XL', slug: 'gaming-mousepad-xl', description: 'Extended RGB gaming mousepad with 11 lighting modes and cable management.', price: 29.99, originalPrice: 39.99, category: 'Gaming', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80', badge: 'Sale', rating: 4.5, reviews: 2345, stock: 40, features: JSON.stringify(['900x400mm', '11 RGB modes', 'Cable management', 'Water resistant', 'Speed surface']), color: '#a855f7' },

  // Bags & Cases
  { name: 'Laptop Backpack', slug: 'laptop-backpack', description: 'Anti-theft laptop backpack with USB charging port, water-resistant fabric and 30L capacity.', price: 49.99, originalPrice: 69.99, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', badge: 'Popular', rating: 4.6, reviews: 3456, stock: 35, features: JSON.stringify(['USB charging port', 'Anti-theft design', 'Water-resistant', '30L capacity', 'Padded laptop sleeve']), color: '#10b981' },
  { name: 'Laptop Sleeve 14"', slug: 'laptop-sleeve-14', description: 'Premium felt laptop sleeve with magnetic closure and accessory pocket.', price: 24.99, originalPrice: null, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', badge: null, rating: 4.4, reviews: 1567, stock: 50, features: JSON.stringify(['Premium felt', 'Magnetic closure', 'Accessory pocket', 'Fits 14" laptops', 'Shockproof']), color: '#6366f1' },
];

async function main() {
  console.log('Seeding MongoDB Atlas...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@shopwave.com' } });
  if (!existingAdmin) {
    await prisma.user.create({ data: { name: 'Admin', email: 'admin@shopwave.com', password: hashedPassword, role: 'admin' } });
    console.log('Created admin user');
  }

  const existingDemo = await prisma.user.findUnique({ where: { email: 'demo@shopwave.com' } });
  if (!existingDemo) {
    await prisma.user.create({ data: { name: 'Demo User', email: 'demo@shopwave.com', password: hashedPassword, role: 'customer' } });
    console.log('Created demo user');
  }

  for (const product of products) {
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (existing) {
      await prisma.product.update({ where: { slug: product.slug }, data: product });
    } else {
      await prisma.product.create({ data: product });
    }
  }

  console.log(`Seeded ${products.length} products`);
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
