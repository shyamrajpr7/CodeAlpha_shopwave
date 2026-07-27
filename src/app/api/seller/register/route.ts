import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.cookies.get('shopwave_session')?.value;
    if (!sessionId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const body = await req.json();
    const { shopName, phone, bio } = body;

    if (!shopName) return NextResponse.json({ error: 'Shop name is required' }, { status: 400 });

    const user = await prisma.user.update({
      where: { id: sessionId },
      data: { role: 'seller', shopName, phone: phone || null, bio: bio || null, sellerSince: new Date() },
    });

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, role: user.role, shopName: user.shopName } });
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
