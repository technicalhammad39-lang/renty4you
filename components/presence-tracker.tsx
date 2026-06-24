'use client';

import { useEffect } from 'react';
import { ref, onValue, onDisconnect, set, push } from 'firebase/database';
import { rtdb } from '@/lib/firebase/config';

export function PresenceTracker() {
  useEffect(() => {
    if (!rtdb) return;

    // A special Firebase reference that tells us whether the client is connected to Realtime DB
    const connectedRef = ref(rtdb, '.info/connected');
    
    // The path where we will store the active visitors
    const visitorsRef = ref(rtdb, 'active_visitors');

    const unsubscribe = onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected! Let's push a new visitor session
        const mySessionRef = push(visitorsRef);

        // When we disconnect, automatically remove this session
        onDisconnect(mySessionRef).remove();

        // Save the session data
        set(mySessionRef, {
          joinedAt: Date.now(),
          userAgent: window.navigator.userAgent
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
}
