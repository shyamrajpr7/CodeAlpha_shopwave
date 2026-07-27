# ShopWave — Full-Stack E-Commerce Platform

A fully functional, production-ready e-commerce web application featuring 14,000+ products, seller marketplace, subscription plans, and a professional UI — built with Next.js 14, Prisma ORM, and MongoDB Atlas. Deployed on Vercel.

## Live Demo

🔗 **[https://shopwave-pc6x.vercel.app](https://shopwave-pc6x.vercel.app)**

### Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| `admin@shopwave.com` | `password123` | Admin |
| `demo@shopwave.com` | `password123` | Customer |

---

## Features

### Core E-Commerce
- **14,000+ Products** — Across 9 categories (Audio, Peripherals, Video, Displays, Accessories, Lighting, Wearables, Gaming, Bags) with 15+ brands per category
- **Product Catalog** — Amazon/Flipkart-style grid with sidebar filters, price range slider, category navigation, and sort options (Price, Rating, Reviews, Newest)
- **Search** — Real-time product search across names, descriptions, and categories
- **Product Detail Pages** — Full product info with image gallery, features, ratings, reviews count, stock status, and quantity selector
- **Shopping Cart** — Add/remove items, update quantities, persistent cart via MongoDB
- **Checkout Flow** — Complete checkout with shipping info, order summary, and order placement
- **Order History** — Full order tracking with status, items, and timestamps
- **Pagination** — Server-side paginated product listing (24 per page) with "Load More" button

### Seller Marketplace
- **Sell on ShopWave** — Landing page with benefits, stats, and seller registration form
- **Seller Dashboard** — 4-tab dashboard (Overview, Products, Orders, Earnings) with real-time stats
- **Product Management** — Add, list, and delete products with full CRUD operations
- **Seller Product Tracking** — Products marked with "Sold by Seller" badge on the catalog

### User Dashboard
- **Overview Tab** — Account stats, recent orders, quick actions
- **Orders Tab** — Full order history with status chips and product thumbnails
- **Profile Tab** — Edit name, email, and password
- **Settings Tab** — Notification preferences, security info, account management

### Subscription Plans
- **3 Tiers** — Basic ($9.99/mo), Pro ($19.99/mo), Premium ($39.99/mo)
- **Plan Comparison** — Feature breakdown with pricing cards
- **Payment Checkout** — Full payment form with card details and confirmation screen

### Authentication & Security
- **Registration** — Account creation with email/password validation
- **Login** — Secure authentication with bcrypt password hashing
- **Session Management** — httpOnly cookie-based sessions
- **Auto-Login** — Seamless redirect after registration
- **Profile Management** — Update name, email, and password from dashboard

### Pages & Navigation
- **Homepage** — Hero section, featured products, category showcase, newsletter CTA
- **Professional Navbar** — Search, cart count badge, avatar dropdown menu with account links
- **Responsive Footer** — Shop links, Help links, Legal links, social media icons
- **Contact Us** — Contact form with email, chat, and phone info
- **FAQs** — 10 questions with accordion toggle
- **Shipping Policy** — Shipping rates, processing times, international shipping
- **Returns Policy** — 30-day return policy with step-by-step guide
- **Privacy Policy** — Data collection, usage, sharing, and security practices
- **Terms of Service** — Account, products, payments, intellectual property terms
- **Cookie Policy** — Cookie types, purposes, and management guide

### UI/UX
- **Glass Morphism Design** — Modern frosted glass aesthetic with gradient accents
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **Smooth Animations** — Fade-up, scale-in, hover-lift, and skeleton loading states
- **Toast Notifications** — Real-time feedback for all user actions
- **Discount Badges** — Percentage-off badges, star ratings, review counts
- **Image Fallback** — Graceful image error handling with placeholders

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (custom glass morphism, animations) |
| **Database** | MongoDB Atlas (cloud-hosted) |
| **ORM** | Prisma |
| **Authentication** | Custom cookie-based auth with bcryptjs |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

---

## Project Structure

```
shopwave/
├── prisma/
│   ├── schema.prisma        # MongoDB schema (User, Product, CartItem, Order, OrderItem)
│   ├── seed.ts              # Generates 14,000+ products across 9 categories
│   └── clear.ts             # Database cleanup script
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with fonts & providers
│   │   ├── page.tsx         # Homepage (hero, featured, categories, newsletter)
│   │   ├── globals.css      # Global styles, glass morphism, animations
│   │   ├── products/
│   │   │   ├── page.tsx     # Product catalog with filters, search, pagination
│   │   │   └── [id]/page.tsx # Product detail page
│   │   ├── cart/page.tsx    # Shopping cart
│   │   ├── checkout/page.tsx # Checkout flow
│   │   ├── orders/page.tsx  # Order history
│   │   ├── dashboard/page.tsx # User dashboard (Overview, Orders, Profile, Settings)
│   │   ├── sell/
│   │   │   ├── page.tsx     # Sell on ShopWave landing page
│   │   │   └── dashboard/page.tsx # Seller dashboard
│   │   ├── subscribe/
│   │   │   ├── page.tsx     # Subscription plans
│   │   │   └── checkout/page.tsx # Subscription payment
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── contact/page.tsx # Contact form
│   │   ├── faq/page.tsx     # FAQ accordion
│   │   ├── shipping/page.tsx
│   │   ├── returns/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── cookies/page.tsx
│   │   └── api/
│   │       ├── auth/        # Authentication (login, register, session)
│   │       ├── products/    # Product listing & detail
│   │       ├── cart/        # Cart CRUD operations
│   │       ├── orders/      # Order placement & history
│   │       ├── seller/      # Seller registration, products, stats
│   │       ├── subscribe/   # Subscription processing
│   │       ├── user/        # Profile management
│   │       └── seed/        # Database seeding
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation with search, cart, avatar dropdown
│   │   └── Footer.tsx       # Site footer with links
│   └── lib/
│       ├── prisma.ts        # Prisma client singleton
│       ├── auth.ts          # Password hashing & verification
│       └── utils.ts         # Image fallback, placeholder utilities
├── .env                     # Environment variables (gitignored)
├── next.config.js           # Next.js config
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

---

## Database Schema

```prisma
model User {
  id, name, email, password, role (customer/seller/admin),
  phone, bio, shopName, sellerSince, isVerified
}

model Product {
  id, name, slug, description, price, originalPrice,
  category, image, badge, rating, reviews, stock,
  features, color, sellerId, listedBy (shopwave/seller)
}

model CartItem { id, sessionId, productId, quantity }
model Order    { id, orderNumber, userId, status, total, shipping details }
model OrderItem { id, orderId, productId, name, price, quantity, image, color }
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/[...nextauth]` | Get current user session |
| POST | `/api/auth/[...nextauth]` | Login or register |
| DELETE | `/api/auth/[...nextauth]` | Logout |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with pagination (`?category=&sort=&search=&page=&limit=`) |
| GET | `/api/products/[id]` | Get product details |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart contents |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update` | Update item quantity |
| DELETE | `/api/cart/remove/[productId]` | Remove item |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user's orders |
| POST | `/api/orders` | Place an order |
| GET | `/api/orders/[id]` | Get order details |

### Seller
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/seller/register` | Register as seller |
| GET | `/api/seller/products` | List seller's products |
| POST | `/api/seller/products` | Add a product |
| DELETE | `/api/seller/products?id=` | Delete a product |
| GET | `/api/seller/stats` | Get seller stats |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/user/profile` | Update profile (name, email, password) |

### Subscription
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/subscribe` | Process subscription payment |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- MongoDB Atlas account

### 1. Clone & Install

```bash
git clone https://github.com/shyamrajpr7/shopwave.git
cd shopwave
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Update `.env` with your MongoDB connection string:

```
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/shopwave?retryWrites=true&w=majority"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Setup Database

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or push to GitHub — Vercel auto-deploys from the `main` branch.

### Required Environment Variables on Vercel

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Any secret string |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` |

---

## Key Technical Decisions

- **MongoDB over PostgreSQL** — Simpler cloud setup with MongoDB Atlas, no need for Supabase
- **JS-Side Product Filtering** — MongoDB Prisma doesn't support `contains`/`mode: 'insensitive'`; acceptable for 14K catalog
- **Server-Side Pagination** — Products API uses Prisma `skip`/`take` for efficient database queries
- **Cookie-Based Auth** — Lightweight session management without external auth providers
- **14,000+ Generated Products** — 9 categories × 15 brands × 15 models × 7 variants for a realistic catalog
- **Glass Morphism UI** — Custom CSS layer system with gradient accents for a modern aesthetic

---

## License

MIT
