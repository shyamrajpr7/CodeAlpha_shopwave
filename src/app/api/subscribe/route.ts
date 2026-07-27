import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, name, email, cardNumber, expiry, cvv, cardName } = body;

    if (!plan || !name || !email || !cardNumber || !expiry || !cvv) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validPlans = ['basic', 'pro', 'premium'];
    if (!validPlans.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Simulate payment processing (no real payment gateway)
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19) {
      return NextResponse.json({ error: 'Invalid card number' }, { status: 400 });
    }

    // In a real app, you'd integrate Stripe, Razorpay, etc.
    // For this demo, we simulate a successful payment
    const subscriptionId = `SUB-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      subscriptionId,
      plan,
      message: `Successfully subscribed to ${plan} plan`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
