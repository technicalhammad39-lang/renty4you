import { collection, getDocs, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "./config";
import { mockOpportunities, mockBlogs } from "./mock-data";

export interface Opportunity {
  id: string;
  slug: string;
  title: string;
  location: string;
  strategy: 'Serviced Accommodation' | 'Council Leasing' | 'Rent-to-Rent';
  propertyType: string;
  budget: number;
  rentRange: string;
  estimatedCashflow: string;
  roi: string;
  occupancyRequired: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  description: string;
  compliance: {
    licensing: boolean;
    planning: boolean;
    leaseRestrictions: boolean;
  };
  demand: {
    corporate: number;
    tourists: number;
    families: number;
    students: number;
  };
  risks: {
    keyRisk: string;
    assumption: string;
  };
  featured: boolean;
  createdAt: Date;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  createdAt: Date;
}

// Subscribe to Opportunities
export function subscribeToOpportunities(callback: (opportunities: Opportunity[]) => void) {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) {
    callback(mockOpportunities as Opportunity[]);
    return () => {};
  }
  const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(mockOpportunities as Opportunity[]);
    } else {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Opportunity)));
    }
  }, (error) => {
    console.error("Error fetching listings", error);
    callback(mockOpportunities as Opportunity[]);
  });
}

// Fetch single for SSR/initial load
export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) return mockOpportunities as Opportunity[];
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return mockOpportunities as Opportunity[]; 
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Opportunity));
  } catch (error) {
    return mockOpportunities as Opportunity[];
  }
}

export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) return (mockOpportunities.find(o => o.slug === slug) as Opportunity) || null;
    const q = query(collection(db, "listings"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return (mockOpportunities.find(o => o.slug === slug) as Opportunity) || null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Opportunity;
  } catch (error) {
    return (mockOpportunities.find(o => o.slug === slug) as Opportunity) || null;
  }
}

// Subscribe to Blogs
export function subscribeToBlogs(callback: (blogs: Blog[]) => void) {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) {
    callback(mockBlogs as Blog[]);
    return () => {};
  }
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(mockBlogs as Blog[]);
    } else {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog)));
    }
  }, (error) => {
    console.error("Error fetching blogs", error);
    callback(mockBlogs as Blog[]);
  });
}

// Fetch single for SSR/initial load
export async function getBlogs(): Promise<Blog[]> {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) return mockBlogs as Blog[];
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return mockBlogs as Blog[];
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Blog));
  } catch (error) {
    return mockBlogs as Blog[];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !db) return (mockBlogs.find(b => b.slug === slug) as Blog) || null;
    const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return (mockBlogs.find(b => b.slug === slug) as Blog) || null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Blog;
  } catch (error) {
    return (mockBlogs.find(b => b.slug === slug) as Blog) || null;
  }
}
