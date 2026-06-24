// Removed Firebase SDK imports to avoid installation size/time.
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

// Fetch Opportunities
export async function getOpportunities(): Promise<Opportunity[]> {
  return mockOpportunities as Opportunity[];
}

export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
  return (mockOpportunities.find(o => o.slug === slug) as Opportunity) || null;
}

// Fetch Blogs
export async function getBlogs(): Promise<Blog[]> {
  return mockBlogs as Blog[];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  return (mockBlogs.find(b => b.slug === slug) as Blog) || null;
}
