import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'shopwave_session';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) return NextResponse.json({ error: 'Please login first' }, { status: 401 });

  const order = await prisma.order.findFirst({
    where: { id: params.id, userId: sessionId },
    include: { items: true },
  });

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  return NextResponse.json(order);
}
