"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Opportunity } from "@/lib/firebase/firestore";
import { ListingCard } from "@/components/opportunities/listing-card";
import { Funnel, MapPinLine, HouseLine, ChartLineUp } from "@phosphor-icons/react";

interface OpportunitiesClientProps {
  initialOpportunities: Opportunity[];
}

function OpportunitiesFilter({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 mb-12 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Strategy Filter */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <button
                onClick={() => updateFilters("strategy", "All")}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  currentStrategy === "All"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                All Strategies
              </button>
              {strategies.map((strategy) => (
                <button
                  key={strategy}
                  onClick={() => updateFilters("strategy", strategy)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                    currentStrategy === strategy
                      ? "bg-gold text-white shadow-md shadow-gold/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {strategy === "Serviced Accommodation" && <HouseLine size={16} weight="bold" />}
                  {strategy === "Council Leasing" && <ChartLineUp size={16} weight="bold" />}
                  {strategy === "Rent-to-Rent" && <Funnel size={16} weight="bold" />}
                  {strategy}
                </button>
              ))}
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinLine size={18} className="text-slate-400" />
                </div>
                <select
                  value={currentLocation}
                  onChange={(e) => updateFilters("location", e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-gold dark:bg-slate-800 dark:text-white cursor-pointer appearance-none"
                >
                  <option value="All">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <section className="container mx-auto px-4">
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredOpportunities.map((opportunity) => (
              <ListingCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Opportunities Found</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your filters or checking back later for new properties.
            </p>
            <button 
              onClick={() => router.push("/opportunities")}
              className="mt-6 px-6 py-3 bg-gold text-white font-bold rounded-xl hover:bg-gold/90 transition-colors"
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
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    }>
      <OpportunitiesFilter opportunities={initialOpportunities} />
    </Suspense>
  );
}
