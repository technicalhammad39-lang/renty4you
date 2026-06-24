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
    <main className="min-h-screen bg-slate-50 dark:bg-black pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Property Sourcing <span className="text-primary">Opportunities</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Explore carefully researched serviced accommodation, council leasing and rent-to-rent opportunities sourced across the UK. Exclusive access for registered investors.
          </p>
        </div>
      </section>

      {/* Client Filter & Grid */}
      <OpportunitiesClient initialOpportunities={opportunities} />
    </main>
  );
}
