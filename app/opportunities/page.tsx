import { getOpportunities } from "@/lib/firebase/firestore";
import OpportunitiesClient from "./opportunities-client";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Property Sourcing Opportunities | Rent4uSolutions",
  description: "Explore carefully researched serviced accommodation, council leasing and rent-to-rent opportunities sourced across the UK.",
};

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      <Navbar />
      <Hero 
        compact={true} 
        title={<>Handpicked High-Yield <span className="text-primary block md:inline mt-1 md:mt-0">Investments</span></>}
        subtitle="Discover thoroughly vetted, cashflow-generating properties ready for your portfolio."
        showButtons={false}
      />

      {/* Client Filter & Grid (Scrolls over Hero) */}
      <div className="relative z-10 w-full bg-white dark:bg-[#0f172a] rounded-t-[40px] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.1)] pt-8 min-h-screen border-t border-slate-200 dark:border-slate-800/60 mt-[-20px]">
        <OpportunitiesClient initialOpportunities={opportunities} />
        
        <div className="mt-16">
          <Footer />
        </div>
      </div>
    </main>
  );
}
