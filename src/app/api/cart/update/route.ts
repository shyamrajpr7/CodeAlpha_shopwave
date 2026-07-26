import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'shopwave_session';

function getSessionId(req: NextRequest): string {
  return req.cookies.get(SESSION_COOKIE)?.value || 'anonymous';
}

export async function PUT(req: NextRequest) {
  const sessionId = getSessionId(req);
  const { productId, quantity } = await req.json();

  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { sessionId, productId } });
  } else {
    const item = await prisma.cartItem.findFirst({ where: { sessionId, productId } });
    if (item) {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      const newQty = Math.min(quantity, product?.stock || quantity);
      await prisma.cartItem.update({ where: { id: item.id }, data: { quantity: newQty } });
    }
  }

  const items = await prisma.cartItem.findMany({ where: { sessionId }, include: { product: true } });
  const cart = items.map((i) => ({ productId: i.productId, name: i.product.name, price: i.product.price, quantity: i.quantity }));
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  return NextResponse.json({ success: true, total: parseFloat(total.toFixed(2)), count });
}
