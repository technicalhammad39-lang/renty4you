import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    return NextResponse.json({ error: 'VAPID public key not found' }, { status: 500 });
  }
  return NextResponse.json({ publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY });
}
