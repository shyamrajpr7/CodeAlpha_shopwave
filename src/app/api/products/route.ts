import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');
  const sellerOnly = searchParams.get('sellerOnly');
  const skip = (page - 1) * limit;

  const where: any = {};
  if (category && category !== 'All') {
    where.category = category;
  }
  if (sellerOnly) {
    where.listedBy = 'seller';
  }

  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price-asc') orderBy = { price: 'asc' };
  else if (sort === 'price-desc') orderBy = { price: 'desc' };
  else if (sort === 'rating') orderBy = { rating: 'desc' };
  else if (sort === 'reviews') orderBy = { reviews: 'desc' };

  let products: any[];
  let total: number;

  if (search) {
    const q = search.toLowerCase();
    const allProducts = await prisma.product.findMany({ where, orderBy });
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
    total = filtered.length;
    products = filtered.slice(skip, skip + limit);
  } else {
    [products, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy, skip, take: limit }),
      prisma.product.count({ where }),
    ]);
  }

  return NextResponse.json({
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasMore: skip + products.length < total,
  });
}
