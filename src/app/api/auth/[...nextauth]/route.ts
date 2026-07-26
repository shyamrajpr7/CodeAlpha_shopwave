import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyUser, createUser } from '@/lib/auth';

const SESSION_COOKIE = 'shopwave_session';

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) return NextResponse.json({ user: null });

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json({ user: user || null });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'login') {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
      }
      const user = await verifyUser(email, password);
      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
      const res = NextResponse.json({ success: true, user });
      res.cookies.set(SESSION_COOKIE, user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return res;
    }

    if (action === 'register') {
      const { name, email, password } = body;
      if (!name || !email || !password) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      }
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
      const user = await createUser(name, email, password);
      const res = NextResponse.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
      res.cookies.set(SESSION_COOKIE, user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return res;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Auth API error:', err);
    return NextResponse.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}
