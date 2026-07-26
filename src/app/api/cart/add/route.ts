import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'shopwave_session';

function getSessionId(req: NextRequest): string {
  return req.cookies.get(SESSION_COOKIE)?.value || 'anonymous';
}

export async function POST(req: NextRequest) {
  const sessionId = getSessionId(req);
  const { productId, quantity = 1 } = await req.json();

  if (!productId) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const existing = await prisma.cartItem.findFirst({
    where: { sessionId, productId },
  });

  if (existing) {
    const newQty = Math.min(existing.quantity + quantity, product.stock);
    await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: newQty } });
  } else {
    await prisma.cartItem.create({
      data: { sessionId, productId, quantity: Math.min(quantity, product.stock) },
    });
  }

  const count = await prisma.cartItem.aggregate({
    where: { sessionId },
    _sum: { quantity: true },
  });

  return NextResponse.json({
    success: true,
    count: count._sum.quantity || 0,
    message: `${product.name} added to cart`,
  });
}
