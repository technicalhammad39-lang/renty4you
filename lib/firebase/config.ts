// Removed Firebase SDK imports to avoid installation size/time.
// This config now acts purely as a placeholder for when you eventually add Firebase.

const hasConfig = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "dummy",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "dummy",
};

export const app = null;
export const db = null;
export const auth = null;
export const storage = null;
