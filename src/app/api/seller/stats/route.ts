import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get('shopwave_session')?.value;
  if (!sessionId) return NextResponse.json({ totalProducts: 0, totalSales: 0, totalRevenue: 0, recentOrders: [] });

  const products = await prisma.product.findMany({
    where: { sellerId: sessionId },
    select: { id: true, price: true, reviews: true },
  });

  const totalProducts = products.length;

  const orderItems = await prisma.orderItem.findMany({
    where: { productId: { in: products.map(p => p.id) } },
    select: { price: true, quantity: true },
  });

  const totalSales = orderItems.length;
  const totalRevenue = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return NextResponse.json({ totalProducts, totalSales, totalRevenue, recentOrders: [] });
}
