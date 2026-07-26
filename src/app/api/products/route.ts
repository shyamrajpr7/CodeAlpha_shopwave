import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const search = searchParams.get('search');

  const where: any = {};
  if (category && category !== 'All') {
    where.category = category;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
    ];
  }

  const orderBy: any = {};
  if (sort === 'price-asc') orderBy.price = 'asc';
  else if (sort === 'price-desc') orderBy.price = 'desc';
  else if (sort === 'rating') orderBy.rating = 'desc';
  else orderBy.createdAt = 'desc';

  const products = await prisma.product.findMany({ where, orderBy });
  return NextResponse.json({ products, total: products.length });
}
