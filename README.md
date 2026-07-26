# ShopWave — Full-Stack Ecommerce Platform

A fully functional, production-ready ecommerce web application built with Next.js 14, Prisma ORM, and PostgreSQL. Deployed on Vercel with automated CI/CD via GitHub Actions.

## Live Demo

🔗 [https://shopwave.vercel.app](https://shopwave.vercel.app)

## Features

### Core Ecommerce
- **Product Catalog** — Browse products with category filtering, search, and sorting (price, rating)
- **Product Detail Pages** — Full product information with features, ratings, stock status, and quantity selector
- **Shopping Cart** — Add/remove items, update quantities, persistent cart via database
- **Checkout Flow** — Multi-step checkout with shipping info and payment method selection
- **Order Processing** — Complete order placement with confirmation and order history

### Authentication & User Management
- **User Registration** — Account creation with email/password validation
- **User Login** — Secure authentication with bcrypt password hashing
- **Session Management** — Cookie-based sessions with httpOnly security
- **User-Specific Data** — Personalized cart, orders, and order history

### Admin Features
- **Seed Data** — Pre-populated with 8 products across 6 categories
- **Demo Accounts** — Ready-to-use test accounts for quick demo

### UI/UX
- **Responsive Design** — Fully responsive from mobile to desktop
- **Modern UI** — Clean, professional design with Tailwind CSS
- **Smooth Animations** — Page transitions, hover effects, loading skeletons
- **Toast Notifications** — Real-time feedback for all user actions
- **Skeleton Loading** — Beautiful loading states throughout the app

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma |
| **Authentication** | Custom cookie-based auth with bcryptjs |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |
| **Deployment** | Vercel |
| **CI/CD** | GitHub Actions |

## Project Structure

```
shopwave/
├── .github/workflows/
│   └── ci-cd.yml          # CI/CD pipeline (lint, build, deploy)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with Navbar & Footer
│   │   ├── page.tsx        # Homepage with hero & featured products
│   │   ├── globals.css     # Global styles
│   │   ├── products/
│   │   │   ├── page.tsx    # Product listing with filters
│   │   │   └── [id]/page.tsx # Product detail page
│   │   ├── cart/page.tsx   # Shopping cart
│   │   ├── checkout/page.tsx # Checkout flow
│   │   ├── orders/page.tsx # Order history
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── api/
│   │       ├── auth/       # Authentication endpoints
│   │       ├── products/   # Product CRUD
│   │       ├── cart/       # Cart management
│   │       └── orders/     # Order processing
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation with cart count
│   │   ├── Footer.tsx      # Site footer
│   │   └── ProductCard.tsx # Product card component
│   └── lib/
│       ├── prisma.ts       # Prisma client singleton
│       └── auth.ts         # Auth utilities
├── public/                 # Static assets
├── vercel.json             # Vercel deployment config
└── package.json
```

## Database Schema

The application uses PostgreSQL with the following models:

- **User** — User accounts (id, name, email, password, role)
- **Product** — Product catalog (id, name, slug, description, price, category, image, rating, stock, features)
- **CartItem** — Shopping cart items (linked to sessions and products)
- **Order** — Customer orders (orderNumber, status, total, shipping details)
- **OrderItem** — Individual items within an order

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (local or Supabase)

### 1. Clone and Install

```bash
git clone <repository-url>
cd shopwave
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database URL:
```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### 3. Setup Database

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@shopwave.com | password123 | Admin |
| demo@shopwave.com | password123 | Customer |

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/[...nextauth]` | Get current user |
| POST | `/api/auth/[...nextauth]` | Login (`action: "login"`) or register (`action: "register"`) |
| DELETE | `/api/auth/[...nextauth]` | Logout |
| POST | `/api/auth/register` | Register new user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports `?category=`, `?sort=`, `?search=`) |
| GET | `/api/products/[id]` | Get product by ID |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart contents |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update` | Update item quantity |
| DELETE | `/api/cart/remove/[productId]` | Remove item from cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get user's orders (auth required) |
| POST | `/api/orders` | Place an order (auth required) |
| GET | `/api/orders/[id]` | Get order details (auth required) |

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs:

1. **Lint & Type Check** — Validates code quality
2. **Build** — Builds the Next.js application
3. **Deploy Preview** — Auto-deploys PR previews
4. **Deploy Production** — Deploys to production on main branch push
5. **Database Migration** — Runs Prisma migrations after production deploy
6. **Seed** — Seeds the database with initial data

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `DATABASE_URL` | PostgreSQL connection string |

## Deployment to Vercel

### Manual Deployment
```bash
npm i -g vercel
vercel --prod
```

### Via CI/CD (Recommended)
Push to `main` branch — the pipeline handles everything automatically.

## Performance

- **Server-Side Rendering** — Fast initial page loads
- **Image Optimization** — Next.js Image component with lazy loading
- **Code Splitting** — Automatic route-based code splitting
- **Static Generation** — Pre-rendered pages where applicable
- **Database Indexing** — Optimized queries with proper indexes

## License

MIT
