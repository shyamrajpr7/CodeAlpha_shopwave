import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/auth';

const SESSION_COOKIE = 'shopwave_session';

function getSessionId(req: NextRequest): string {
  return req.cookies.get(SESSION_COOKIE)?.value || 'anonymous';
}

export async function GET(req: NextRequest) {
  const sessionId = getSessionId(req);
  const user = await prisma.user.findUnique({ where: { id: sessionId } });
  if (!user) return NextResponse.json({ error: 'Please login first' }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ orders });
}

export async function POST(req: NextRequest) {
  const sessionId = getSessionId(req);
  const user = await prisma.user.findUnique({ where: { id: sessionId } });
  if (!user) return NextResponse.json({ error: 'Please login first' }, { status: 401 });

  const { name, email, address, city, zip, country, paymentMethod } = await req.json();

  if (!name || !email || !address) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { sessionId },
    include: { product: true },
  });

  if (!cartItems.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId: user.id,
      total: parseFloat(total.toFixed(2)),
      name,
      email,
      address,
      city: city || '',
      zip: zip || '',
      country: country || '',
      paymentMethod: paymentMethod || 'card',
      items: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          color: item.product.color,
        })),
      },
    },
    include: { items: true },
  });

  await prisma.cartItem.deleteMany({ where: { sessionId } });

  return NextResponse.json({ success: true, order });
}
