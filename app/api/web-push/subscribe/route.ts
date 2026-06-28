import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const subscription = await req.json();
    
    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
    }

    const subscriptionsRef = collection(db, 'subscriptions');

    // We don't check for duplicates here to avoid read permission errors on the server.
    // Duplicates will be safely ignored or filtered out during the send process.
    await addDoc(subscriptionsRef, {
      ...subscription,
      createdAt: new Date().toISOString()
    });
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscription error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
