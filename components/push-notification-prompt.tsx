'use client';

import { useEffect } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export function PushNotificationPrompt() {
  const { isSupported, subscribeToPush } = usePushNotifications();

  useEffect(() => {
    if (isSupported && typeof window !== 'undefined' && 'Notification' in window) {
      // 'default' means the user hasn't allowed or denied yet
      if (Notification.permission === 'default') {
        const timer = setTimeout(() => {
          // This automatically triggers the browser's native permission popup
          subscribeToPush();
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [isSupported, subscribeToPush]);

  // We don't render any custom HTML popup anymore.
  return null;
}
