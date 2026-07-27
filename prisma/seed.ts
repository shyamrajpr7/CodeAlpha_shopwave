import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const brands: Record<string, { brands: string[]; models: string[]; descs: string[]; images: string[] }> = {
  Audio: {
    brands: ['Sony', 'Bose', 'JBL', 'Sennheiser', 'Apple', 'Samsung', 'Audio-Technica', 'Shure', 'Anker', 'Jabra', 'Beats', 'Marshall', 'Skullcandy', 'Razer', 'HyperX'],
    models: ['WH-1000XM5', 'QuietComfort Ultra', 'Flip 6', 'HD 660S2', 'AirPods Max', 'Galaxy Buds3 Pro', 'ATH-M50x', 'SE535', 'Liberty 4 NC', 'Elite 85t', 'Studio Pro', 'Major IV', ' Crusher ANC 2', 'Kraken V4', 'Cloud III'],
    descs: [
      'Premium noise-cancelling headphones with adaptive sound control and 30-hour battery life.',
      'True wireless earbuds with spatial audio, ANC and 24-hour total playtime.',
      'Portable Bluetooth speaker with IP67 waterproof rating and 12-hour playtime.',
      'Open-back audiophile headphones with reference-class sound and detachable cables.',
      'Premium over-ear headphones with ANC, head tracking and 20-hour battery.',
      'Compact true wireless earbuds with intelligent ANC and crystal-clear calls.',
      'Professional studio monitor headphones with 45mm drivers and foldable design.',
      'In-ear monitor earphones with triple balanced armature drivers.',
      'Budget ANC earbuds with transparency mode and multi-point connection.',
      'Premium wireless earbuds with HearThrough technology and 6 microphones.',
      'Active noise cancelling headphones with transparency mode and 40-hour battery.',
      'Iconic wireless on-ear headphones with 80+ hours playtime and rock-and-roll design.',
      'Over-ear headphones with bass booster and active noise cancellation.',
      'Gaming headset with THX Spatial Audio, RGB and retractable mic.',
      'Gaming headset with memory foam ear cushions and DTS Headphone:X.',
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80',
    ],
  },
  Peripherals: {
    brands: ['Logitech', 'Razer', 'Corsair', 'SteelSeries', 'HyperX', 'Keychron', 'Akko', 'Ducky', 'Zowie', 'Glorious', 'Viper', 'Nuphy', 'Leopold', 'Fnatic', 'Endgame Gear'],
    models: ['MX Keys S', 'Huntsman V3 Pro', 'K100 RGB', 'Apex Pro TKL', 'Alloy Origins', 'Q1 Pro', 'Pink Rose', 'One 3', 'FK2-C', 'Model O 2', 'Viper V3 HS', 'Air75 V2', 'FC660M', 'STREAK65', 'XM2we'],
    descs: [
      'Premium wireless keyboard with Perfect Stroke keys and smart illumination.',
      'Analog optical gaming keyboard with adjustable actuation and wrist rest.',
      'RGB mechanical gaming keyboard with iCUE control wheel and OPX switches.',
      'Adjustable actuation mechanical gaming keyboard with OLED smart display.',
      'Compact mechanical gaming keyboard with RGB and aircraft-grade aluminum.',
      'Premium wireless mechanical keyboard with hot-swappable Gateron switches.',
      'Custom mechanical keyboard with PBT doubleshot keycaps and silicone dampening.',
      'Premium mechanical keyboard with Cherry MX switches and PBT keycaps.',
      'Ambidextrous ergonomic gaming mouse with 4000 Hz polling rate.',
      'Ultra-light honeycomb wireless gaming mouse with 26K DPI sensor.',
      'Pro gaming mouse with Focus Pro 35K optical sensor and 8K Hz polling.',
      'Ultra-slim wireless mechanical keyboard with low-profile switches.',
      'Legendary TKL mechanical keyboard with Cherry MX switches.',
      'Compact mechanical keyboard with hot-swappable switches and aluminum plate.',
      'Ultra-light wireless gaming mouse with 2K Hz polling and PAW3395 sensor.',
    ],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&q=80',
      'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=600&q=80',
    ],
  },
  Video: {
    brands: ['Logitech', 'Elgato', 'Razer', 'AVerMedia', 'Insta360', 'DJI', 'Sony', 'Canon', 'Nikon', 'GoPro', 'TP-Link', 'NZXT', 'Obsbot', 'Anker', 'Microsoft'],
    models: ['Brio 4K', 'Facecam Pro', 'Kiyo Pro Ultra', 'Live Gamer Ultra 2.1', 'Link 4K', 'DJI Action 5 Pro', 'ZV-E10 II', 'PowerShot V10', 'Z fc', 'Hero 13 Black', 'Tapo C225', 'NZXT Canvas', 'Tiny 2', 'Pivo Pod', 'Lifcam Studio'],
    descs: [
      '4K streaming webcam with HDR, auto light correction and noise-canceling mic.',
      'True 4K 60fps webcam with Sony STARVIS sensor and AI-powered framing.',
      '8K Ultra HD streaming webcam with large sensor and AI-enhanced image.',
      'External capture card for 4K HDR10 passthrough and VRR support.',
      'Compact 4K webcam with magnetic mount and built-in privacy cover.',
      'Action camera with 4K/120fps, horizon leveling and 2-hour battery.',
      'Compact vlogging camera with real-time tracking and background defocus.',
      'Compact vlog camera with 1-inch sensor and wide-angle lens.',
      'Retro-style mirrorless camera with vari-angle LCD and NIKKOR Z lens.',
      'Waterproof action camera with HyperSmooth 6.0 and 5.3K video.',
      '2K QHD pan/tilt home security camera with AI detection.',
      'Portable 16-inch monitor with 1440p 120Hz for gaming and streaming.',
      'AI-powered 4K PTZ webcam with speaker-tracking and gesture control.',
      'AI-powered rotating tripod with face tracking and video calling.',
      'Wide-angle webcam with adjustable field of view and noise-canceling mic.',
    ],
    images: [
      'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80',
    ],
  },
  Displays: {
    brands: ['Samsung', 'LG', 'Dell', 'ASUS', 'BenQ', 'AOC', 'ViewSonic', 'Philips', 'MSI', 'Gigabyte', 'Acer', 'Lenovo', 'HP', 'Apple', 'Xiaomi'],
    models: ['Odyssey G9 49"', 'UltraGear 27GR95QE', 'UltraSharp U2723QE', 'ROG Swift PG32UCDM', 'EW3280U', 'AGON Pro AG276QZD', 'VP2776', 'Evnia 27M2N5500', 'MAG 274UPF', 'M28U', 'Predator X27U', 'ThinkVision T27p-30', 'Z27m G2', 'Studio Display', 'G27QI'],
    descs: [
      '49-inch super ultrawide curved gaming monitor with 240Hz and 1ms response.',
      '27-inch OLED gaming monitor with 240Hz, 0.03ms and anti-glare coating.',
      '27-inch 4K USB-C hub monitor with IPS Black and 100% DCI-P3.',
      '32-inch 4K 240Hz QD-OLED gaming monitor with DisplayPort 2.1.',
      '32-inch 4K entertainment monitor with USB-C 65W PD and speakers.',
      '27-inch QHD OLED gaming monitor with 240Hz and true 10-bit color.',
      '27-inch 4K ColorPro monitor with factory-calibrated Delta E<2.',
      '27-inch QHD 180Hz Fast IPS gaming monitor with HDR400.',
      '28-inch 4K 144Hz Rapid IPS gaming monitor with HDMI 2.1.',
      '28-inch 4K 144Hz IPS gaming monitor with KVM switch and HDMI 2.1.',
      '27-inch QHD 240Hz OLED gaming monitor with 0.03ms response time.',
      '27-inch 4K USB-C monitor with daisy chain and 100W PD.',
      '27-inch QHD monitor with USB-C docking and built-in KVM.',
      '27-inch 5K Retina display with A13 Bionic chip and 600 nits.',
      '27-inch QHD 165Hz IPS gaming monitor with 1ms MPRT.',
    ],
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
      'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80',
      'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=600&q=80',
    ],
  },
  Accessories: {
    brands: ['Anker', 'UGREEN', 'Belkin', 'Satechi', 'HyperDrive', 'Baseus', 'Twelve South', 'Nekteck', 'Cable Matters', 'CalDigit', 'HooToo', 'AorZ', 'NODRU', 'Lention', 'Vention'],
    models: ['PowerExpand 13-in-1', '7-in-1 USB-C Hub', 'Dual USB-C Dock', 'USB-C Multiport', 'HyperDrive Duo', 'GaN Pro 100W', 'Curve SE Stand', 'Thunderbolt 4 Dock', 'USB-C to HDMI 2.1', 'TS4 Thunderbolt 4', 'Trinity Pro', '8-in-1 Hub', 'USB-C 5-in-1', 'CB-C15 USB-C Hub', 'HDMI 2.1 Adapter'],
    descs: [
      'USB-C hub with dual HDMI, 100W PD, Ethernet and SD card reader.',
      'Compact 7-in-1 USB-C hub with 4K HDMI, USB 3.0 and SD card.',
      'Dual display USB-C docking station with 96W power delivery.',
      'USB-C multiport adapter with 4K HDMI, USB-A and 100W PD pass-through.',
      'Dual USB-C portable hub with 4K60 HDMI and 100W charging.',
      'GaN 100W USB-C charger with 3 ports and foldable plug.',
      'Premium aluminum laptop stand with adjustable height and angle.',
      'Thunderbolt 4 dock with triple 4K display support and 98W PD.',
      'USB-C to HDMI 2.1 cable supporting 8K@60Hz and 4K@120Hz.',
      'Thunderbolt 4 docking station with 18 ports and 98W charging.',
      'Thunderbolt 4 hub with 3x Thunderbolt 4 and USB-A port.',
      'Compact 8-in-1 USB-C hub with dual monitor support.',
      'Ultra-slim 5-in-1 USB-C hub for MacBook and ultrabooks.',
      'USB-C hub with 4K HDMI, USB 3.0 ports and SD/microSD reader.',
      'Active HDMI 2.1 adapter supporting 8K and 4K@120Hz.',
    ],
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&q=80',
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&q=80',
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    ],
  },
  Lighting: {
    brands: ['Govee', 'Nanoleaf', 'Philips Hue', 'LIFX', 'BenQ', 'Yeelight', 'Twinkly', 'Corsair', 'Razer', 'Elgato', 'TP-Link', 'Meross', 'Wyze', 'Kasa', 'Innr'],
    models: ['Glide Y-Light Bars', 'Shapes Hexagons', 'Gradient Lightstrip', 'Beam', 'ScreenBar Halo', 'LED Desk Lamp', 'Christmas Multi-Color', 'iCUE lighting Node', 'Light Strip Plus', 'Key Light Air', 'Smart LED Bulb', 'LED Strip WiFi', 'Light Strip V2', 'Smart Light Bulb', 'LED Strip Extensions'],
    descs: [
      'Modular LED light bars with music sync and 30+ scene templates.',
      'Modular hexagon light panels with touch-reactive and music sync.',
      'Gradient ambient LED strip with 16M colors and voice control.',
      'Modular ambient light beam kit with 16M colors and app control.',
      'Premium monitor light bar with wireless dial and auto-dimming.',
      'Minimalist LED desk lamp with wireless charging base and app control.',
      'Addressable RGB LED strip with per-pixel control and 100+ effects.',
      'RGB lighting controller with 4 channel iCUE integration.',
      'Premium LED strip with diffuser, 16M colors and 15 smart scenes.',
      'Professional LED panel light with adjustable color temperature.',
      'Smart LED bulb with 16M colors, voice control and scheduling.',
      'WiFi RGB LED strip with music sync and app control.',
      'Premium LED strip with UV protection and 16M color options.',
      'Smart WiFi LED bulb with scheduling, scenes and voice control.',
      'LED strip extension kit for expanding existing lighting setups.',
    ],
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80',
    ],
  },
  Wearables: {
    brands: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Amazfit', 'Google', 'Withings', 'COROS', 'Suunto', 'Whoop', 'Huawei', 'Nothing', 'Meta', 'Xreal', 'Oura'],
    models: ['Watch Ultra 2', 'Galaxy Watch7', 'Venu 3', 'Charge 6', 'T-Rex Ultra 2', 'Pixel Watch 3', 'ScanWatch Nova', 'Pace 3', 'Race Solar', 'Whoop 4.0', 'Watch GT 5 Pro', 'CMF Watch Pro 3', 'Ray-Ban Meta', 'Air 2 Ultra', 'Ring Gen 3'],
    descs: [
      'Rugged titanium smartwatch with precision dual-frequency GPS and 36-hour battery.',
      'Advanced health smartwatch with BioActive Sensor and Wear OS.',
      'Premium GPS smartwatch with AMOLED display and Body Battery energy.',
      'Advanced fitness tracker with built-in GPS, ECG and stress management.',
      'Rugged outdoor GPS watch with AMOLED display and 25-day battery.',
      'Premium smartwatch with Fitbit health tracking and Google apps.',
      'Hybrid smartwatch with invisible health sensors and 30-day battery.',
      'Lightweight GPS running watch with training load and race predictor.',
      'Multisport GPS watch with solar charging and offline maps.',
      'Advanced recovery and health tracker with strain coach and sleep tracker.',
      'Premium smartwatch with 14-day battery and advanced health sensors.',
      'Budget smartwatch with AMOLED display, Bluetooth calling and GPS.',
      'Smart glasses with 12MP camera, Meta AI and open-ear speakers.',
      'Mixed reality AR glasses with spatial computing and 3D display.',
      'Advanced sleep and recovery ring with temperature sensing.',
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
      'https://images.unsplash.com/photo-1610438235354-a6ae5528385c?w=600&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80',
    ],
  },
  Gaming: {
    brands: ['Sony', 'Microsoft', 'Nintendo', 'Valve', 'Razer', 'Corsair', 'SteelSeries', 'HyperX', 'SCUF', '8BitDo', 'Turtle Beach', 'Astro', 'Nacon', 'PowerA', 'PDP'],
    models: ['DualSense Edge', 'Xbox Elite Series 2', 'Switch 2 Pro', 'Steam Deck OLED', 'Wolverine V3', 'Dark Core RGB Pro', 'Arctis Nova Pro', 'Vanguard', 'Pro Controller', 'Ultimate C 2C', 'Stealth 700 Gen 3', 'A50 X', 'Revolver Pro', 'RIG 600 Pro', 'Afterglow Wave'],
    descs: [
      'Pro wireless controller with adaptive triggers, haptic feedback and remappable buttons.',
      'Premium Xbox controller with adjustable tension thumbsticks and 40-hour battery.',
      'Premium wireless controller with C button and enhanced ergonomic design.',
      'Handheld gaming PC with HDR OLED display and 50% longer battery.',
      'Pro gaming controller with 4 additional bumpers and RGB lighting.',
      'Wireless gaming mouse with Qi charging and 100-hour battery life.',
      'Premium wireless gaming headset with hot-swappable batteries and ANC.',
      'Ultra-light wired gaming controller with Hall Effect thumbsticks.',
      'Pro wireless controller with 3-level trigger locks and remappable paddles.',
      'Retro-style wireless controller with hall effect joysticks and 4-way mode switch.',
      'Wireless gaming headset with 60-hour battery and lay-flat design.',
      'Wireless gaming headset base station with magnetic charging and OLED.',
      'Premium wired gaming controller with trigger vibration.',
      'Wireless gaming headset with dual-mode connectivity and flip-to-mute mic.',
      'RGB wireless controller with programmable buttons and audio controls.',
    ],
    images: [
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&q=80',
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=600&q=80',
      'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&q=80',
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80',
    ],
  },
  Bags: {
    brands: ['Samsonite', 'Osprey', 'North Face', 'Thule', 'Peak Design', 'Timbuk2', 'Aer', 'Bellroy', 'Herschel', 'Chrome Industries', 'Fjallraven', 'Tortuga', 'Cotopaxi', 'Patagonia', 'Mystery Ranch'],
    models: ['Arcade Smart', 'Stratos 34', 'Borealis Classic', 'Subterra 2', 'Everyday Backpack 20L', 'Laptop Briefcase', 'Tech Pack 3', 'Classic Backpack', 'Heritage Plus', 'Citizen Messenger', 'Kanken Classic', 'Outbreaker 45L', 'Allpa 35L', 'Black Hole 32L', '2-Day Assault Pack'],
    descs: [
      'Premium anti-theft laptop backpack with USB charging port and RFID pocket.',
      'Versatile hiking daypack with integrated rain cover and hydration sleeve.',
      'Iconic daypack with padded laptop sleeve and front organization pocket.',
      'Premium travel backpack with clamshell opening and weather-resistant materials.',
      'Versatile everyday backpack with MagLatch and flexfold dividers.',
      'Professional laptop briefcase with QuickAccess pockets and weatherproof fabric.',
      'Tech-focused travel backpack with full perimeter zip and admin panel.',
      'Premium everyday backpack with recycled materials and thoughtful storage.',
      'Classic backpack with premium leather details and 15-inch laptop sleeve.',
      'Signature messenger bag with reflective accents and quick-adjust strap.',
      'Iconic Swedish backpack with Vinylon F fabric and zip opening.',
      'Maximum carry-on travel backpack with full back panel access.',
      'Versatile travel pack with clamshell opening and harness system.',
      'Lightweight weather-resistant backpack with daisy chain and padded hipbelt.',
      'Tactical-inspired daypack with bivvy access and organized compartments.',
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=600&q=80',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80',
    ],
  },
};

const badges = ['Best Seller', 'Trending', 'New', 'Sale', 'Popular', null, null, null];
const colors = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9', '#10b981', '#ec4899', '#06b6d4', '#a855f7'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

const variants = [
  { suffix: '', nameExtra: '' },
  { suffix: '-pro', nameExtra: ' Pro' },
  { suffix: '-max', nameExtra: ' Max' },
  { suffix: '-plus', nameExtra: ' Plus' },
  { suffix: '-lite', nameExtra: ' Lite' },
  { suffix: '-se', nameExtra: ' SE' },
  { suffix: '-mini', nameExtra: ' Mini' },
];

function generateProducts(): any[] {
  const products: any[] = [];
  const usedSlugs = new Set<string>();

  for (const [category, data] of Object.entries(brands)) {
    for (const brand of data.brands) {
      for (let m = 0; m < data.models.length; m++) {
        const model = data.models[m];
        const descIdx = m % data.descs.length;

        for (const variant of variants) {
          const name = `${brand} ${model}${variant.nameExtra}`;
          let slug = `${brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}${variant.suffix}`;
          if (usedSlugs.has(slug)) slug += `-${Math.random().toString(36).slice(2, 6)}`;
          usedSlugs.add(slug);

          const variantMultiplier = variant.nameExtra === ' Max' ? 1.4 : variant.nameExtra === ' Pro' ? 1.25 : variant.nameExtra === ' Plus' ? 1.15 : variant.nameExtra === ' SE' ? 0.85 : variant.nameExtra === ' Lite' ? 0.7 : variant.nameExtra === ' Mini' ? 0.8 : 1;
          const basePrice = parseFloat((15 + Math.random() * 600 * variantMultiplier).toFixed(2));
          const hasDiscount = Math.random() > 0.45;
          const originalPrice = hasDiscount ? parseFloat((basePrice * (1 + 0.1 + Math.random() * 0.35)).toFixed(2)) : null;
          const rating = parseFloat((3.2 + Math.random() * 1.8).toFixed(1));
          const reviews = Math.floor(5 + Math.random() * 9995);

          const featureCount = 3 + Math.floor(Math.random() * 4);
          const allFeatures = [
            'Bluetooth 5.3', 'USB-C charging', 'Wireless charging', 'Water resistant', 'Fast charging',
            'Noise cancelling', 'Voice assistant', 'App control', 'Multi-device', 'Premium materials',
            'RGB lighting', 'Long battery life', 'Lightweight design', 'Ergonomic', 'Foldable',
            'Durable build', 'Quick setup', 'Smart features', 'Energy efficient', 'Compact size',
            'High fidelity', 'Low latency', 'Touch controls', 'Gesture support', 'Customizable',
            'Auto-dimming', 'Built-in microphone', 'LED display', 'Memory foam', 'Anti-slip base',
          ];
          const f: string[] = [];
          const pool = [...allFeatures];
          for (let i = 0; i < featureCount && pool.length > 0; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            f.push(pool.splice(idx, 1)[0]);
          }
          const features = JSON.stringify(f);

          products.push({
            name,
            slug,
            description: data.descs[descIdx],
            price: basePrice,
            originalPrice,
            category,
            image: pick(data.images),
            badge: pick(badges),
            rating,
            reviews,
            stock: Math.floor(1 + Math.random() * 200),
            features,
            color: pick(colors),
          });
        }
      }
    }
  }

  return products;
}

async function main() {
  console.log('Generating 10,000+ products...');

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

  const existingCount = await prisma.product.count();
  console.log(`Existing products: ${existingCount}`);

  const products = generateProducts();
  console.log(`Generated ${products.length} products`);

  const BATCH = 500;
  for (let i = 0; i < products.length; i += BATCH) {
    const batch = products.slice(i, i + BATCH);
    await prisma.product.createMany({ data: batch });
    console.log(`Inserted batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(products.length / BATCH)}`);
  }

  const finalCount = await prisma.product.count();
  console.log(`Total products in database: ${finalCount}`);
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
