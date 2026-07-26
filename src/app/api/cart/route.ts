import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'shopwave_session';

function getSessionId(req: NextRequest): string {
  return req.cookies.get(SESSION_COOKIE)?.value || 'anonymous';
}

export async function GET(req: NextRequest) {
  const sessionId = getSessionId(req);
  const items = await prisma.cartItem.findMany({
    where: { sessionId },
    include: { product: true },
  });

  const cart = items.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    price: item.product.price,
    image: item.product.image,
    color: item.product.color,
    quantity: item.quantity,
    stock: item.product.stock,
  }));

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return NextResponse.json({ cart, total: parseFloat(total.toFixed(2)), count });
}
