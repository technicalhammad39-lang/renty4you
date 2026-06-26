"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Opportunity, subscribeToOpportunities } from "@/lib/firebase/firestore";
import { ListingCard } from "@/components/opportunities/listing-card";
import { Funnel, MapPinLine, HouseLine, ChartLineUp } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search-bar";

interface OpportunitiesClientProps {
  initialOpportunities: Opportunity[];
}

function OpportunitiesFilter({
  opportunities: initialOpportunities,
}: {
  opportunities: Opportunity[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);

  useEffect(() => {
    // Listen for real-time updates from Firestore
    const unsubscribe = subscribeToOpportunities((liveData) => {
      setOpportunities(liveData);
    });
    return () => unsubscribe();
  }, []);

  // Extract unique locations and strategies
  const locations = Array.from(new Set(opportunities.map((o) => o.location)));
  const strategies = Array.from(new Set(opportunities.map((o) => o.strategy)));

  // Current filters
  const currentStrategy = searchParams.get("strategy") || "All";
  const currentLocation = searchParams.get("location") || "All";
  const currentBudgetStr = searchParams.get("budget");
  const currentBudget = currentBudgetStr ? parseInt(currentBudgetStr) : 100000; // max budget slider

  // Filter the data
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const matchStrategy = currentStrategy === "All" || opp.strategy === currentStrategy;
      const matchLocation = currentLocation === "All" || opp.location.includes(currentLocation);
      const matchBudget = opp.budget <= currentBudget;
      return matchStrategy && matchLocation && matchBudget;
    });
  }, [opportunities, currentStrategy, currentLocation, currentBudget]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/opportunities?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Search Bar Component */}
      <div className="relative z-40 mb-6 flex justify-center px-4 w-full -translate-y-1/2 -mt-8">
        <div className="w-full max-w-[1000px]">
          <SearchBar variant="full" />
        </div>
      </div>

      {/* Results Grid */}
      <section className="container mx-auto px-4">
        {filteredOpportunities.length > 0 ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredOpportunities.map((opportunity) => (
              <motion.div 
                key={opportunity.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <ListingCard opportunity={opportunity} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Opportunities Found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your filters or checking back later for new properties.
            </p>
            <button 
              onClick={() => router.push("/opportunities")}
              className="mt-6 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default function OpportunitiesClient({ initialOpportunities }: OpportunitiesClientProps) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 text-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    }>
      <OpportunitiesFilter opportunities={initialOpportunities} />
    </Suspense>
  );
}
