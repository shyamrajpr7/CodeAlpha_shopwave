import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get('shopwave_session')?.value;
  if (!sessionId) return NextResponse.json({ products: [] });

  const products = await prisma.product.findMany({
    where: { sellerId: sessionId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get('shopwave_session')?.value;
  if (!sessionId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const body = await req.json();
  const { name, slug, description, price, originalPrice, category, image, stock, features } = body;

  if (!name || !price) return NextResponse.json({ error: 'Name and price required' }, { status: 400 });

  const productSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).slice(2, 6);

  const product = await prisma.product.create({
    data: {
      name,
      slug: productSlug,
      description: description || '',
      price,
      originalPrice: originalPrice || null,
      category: category || 'Electronics',
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
      badge: 'New',
      rating: 5.0,
      reviews: 0,
      stock: stock || 0,
      features: JSON.stringify(features ? features.split(',').map((f: string) => f.trim()) : []),
      color: '#6366f1',
      sellerId: sessionId,
      listedBy: 'seller',
    },
  });

  return NextResponse.json({ product });
}

export async function DELETE(req: NextRequest) {
  const sessionId = req.cookies.get('shopwave_session')?.value;
  if (!sessionId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.sellerId !== sessionId) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
