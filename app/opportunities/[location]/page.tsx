import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import OpportunitiesClient from "../opportunities-client";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Opportunity } from "@/lib/firebase/firestore";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Supported dynamic locations for SEO
const VALID_LOCATIONS = ["london", "manchester", "birmingham", "liverpool", "leeds", "glasgow", "nottingham", "sheffield"];

type Props = {
  params: Promise<{ location: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const loc = location.charAt(0).toUpperCase() + location.slice(1);
  return {
    title: `Property Sourcing & Investment Deals in ${loc} | Rent4uSolutions`,
    description: `Discover high-yield property investment opportunities in ${loc}. Explore exclusive rent-to-rent, serviced accommodation, and council leasing deals in the ${loc} area.`,
    alternates: {
      canonical: `https://rent4usolutions.com/opportunities/${location.toLowerCase()}`,
    }
  };
}

export default async function LocationOpportunitiesPage({ params }: Props) {
  const { location } = await params;
  const locationRaw = location.toLowerCase();
  
  // Validation for programmatic SEO to avoid infinite useless pages
  if (!VALID_LOCATIONS.includes(locationRaw)) {
    notFound();
  }

  const locationFormatted = locationRaw.charAt(0).toUpperCase() + locationRaw.slice(1);

  // Note: For a real production app with Firebase, we'd query by location.
  // const q = query(
  //   collection(db, "opportunities"),
  //   where("location", "==", locationFormatted),
  //   where("status", "==", "available"),
  //   orderBy("createdAt", "desc")
  // );
  // const snapshot = await getDocs(q);
  // const opportunities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Opportunity));

  // Placeholder for fetching
  const q = query(
    collection(db, "opportunities"),
    where("status", "==", "available"),
    orderBy("createdAt", "desc")
  );
  
  let opportunities: Opportunity[] = [];
  try {
    const snapshot = await getDocs(q);
    opportunities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Opportunity[];
    
    // Client side filtering for demo since Firebase requires composite indexes for multiple where/orderBy
    opportunities = opportunities.filter(opp => opp.location.toLowerCase() === locationRaw);
  } catch (error) {
    console.error("Error fetching opportunities for location:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      <Navbar />
      <Hero 
        compact={true} 
        title={<>{locationFormatted} Property <span className="text-primary block md:inline mt-1 md:mt-0">Investments</span></>}
        subtitle={`Discover thoroughly vetted, cashflow-generating properties ready for your portfolio in ${locationFormatted}.`}
        showButtons={false}
      />

      <div className="relative z-10 w-full bg-white dark:bg-[#0f172a] rounded-t-[40px] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] pt-8 min-h-screen border-t border-slate-200 dark:border-slate-800/60 mt-[-20px]">
        <OpportunitiesClient initialOpportunities={opportunities} />
      </div>
      <Footer />
    </main>
  );
}
