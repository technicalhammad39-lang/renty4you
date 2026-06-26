import { getOpportunities } from "@/lib/firebase/firestore";
import OpportunitiesClient from "./opportunities-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Sourcing Opportunities | Rent4uSolutions",
  description: "Explore carefully researched serviced accommodation, council leasing and rent-to-rent opportunities sourced across the UK.",
};

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Pinned Hero Section */}
      <section className="sticky top-0 -z-10 w-full pt-32 pb-20 px-4 flex flex-col justify-center min-h-[40vh] md:min-h-[45vh]">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
            Premium Investment <span className="text-primary block md:inline mt-1 md:mt-0">Marketplace</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Exclusive access to verified serviced accommodation, council leasing and rent-to-rent opportunities across the UK.
          </p>
        </div>
      </section>

      {/* Client Filter & Grid (Scrolls over Hero) */}
      <div className="relative z-10 bg-white dark:bg-[#0f172a] rounded-t-[40px] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] pt-8 pb-24 min-h-screen border-t border-slate-200 dark:border-slate-800/60">
        <OpportunitiesClient initialOpportunities={opportunities} />
      </div>
    </main>
  );
}
