import { NextResponse } from 'next/server';
import webpush from 'web-push';

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      return NextResponse.json({ error: 'VAPID keys missing' }, { status: 500 });
    }

    webpush.setVapidDetails(
      'mailto:hello@rent4yousolutions.com',
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const { title, message, url, icon, subscriptions } = await req.json();
    
    if (!subscriptions || !Array.isArray(subscriptions)) {
       return NextResponse.json({ error: 'No subscriptions provided' }, { status: 400 });
    }

    const payload = JSON.stringify({
      title: title || 'Rent4You Solutions',
      body: message || 'You have a new notification!',
      url: url || '/',
      icon: icon || '/Rent4you-fav.png'
    });

    const expiredDocIds: string[] = [];
    
    const sendPromises = subscriptions.map(async (sub: any) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          payload
        );
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          expiredDocIds.push(sub.docId);
        } else {
          console.error('Failed to send push to', sub.endpoint, err);
        }
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true, count: subscriptions.length - expiredDocIds.length, expiredDocIds });
  } catch (err) {
    console.error('Push error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
