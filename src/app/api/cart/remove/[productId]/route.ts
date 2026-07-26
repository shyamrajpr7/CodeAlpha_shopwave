import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'shopwave_session';

function getSessionId(req: NextRequest): string {
  return req.cookies.get(SESSION_COOKIE)?.value || 'anonymous';
}

export async function DELETE(req: NextRequest, { params }: { params: { productId: string } }) {
  const sessionId = getSessionId(req);
  await prisma.cartItem.deleteMany({ where: { sessionId, productId: params.productId } });

  const count = await prisma.cartItem.aggregate({ where: { sessionId }, _sum: { quantity: true } });

  return NextResponse.json({ success: true, count: count._sum.quantity || 0 });
}
