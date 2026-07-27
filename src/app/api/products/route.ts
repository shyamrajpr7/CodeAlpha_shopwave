import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');

  const where: any = {};
  if (category && category !== 'All') {
    where.category = category;
  }

  let products = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } });

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);
  else if (sort === 'reviews') products.sort((a, b) => b.reviews - a.reviews);

  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const skip = (page - 1) * limit;
  const paged = products.slice(skip, skip + limit);

  return NextResponse.json({
    products: paged,
    total,
    page,
    totalPages,
    hasMore: skip + paged.length < total,
  });
}
