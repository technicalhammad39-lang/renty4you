"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Opportunity, subscribeToOpportunities } from "@/lib/firebase/firestore";
import { ListingCard } from "./listing-card";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function FeaturedListings() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToOpportunities((liveData) => {
      // Get the 3 most recently created ones (or featured)
      const featured = liveData.slice(0, 3);
      setOpportunities(featured);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return null;
  }

  return (
    <section className="pt-8 pb-24 bg-surface relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="w-full md:w-auto">
            <span className="text-primary font-bold tracking-wider uppercase text-xs md:text-sm mb-2 block">Live Marketplace</span>
            <div className="flex items-start justify-between md:justify-start gap-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
                <span className="text-primary block">Latest</span>
                <span className="text-slate-900 dark:text-white block">Opportunities</span>
              </h2>
              <Link 
                href="/opportunities"
                className="mt-1 w-12 h-12 shrink-0 rounded-full border border-border-subtle flex items-center justify-center transition-all group hover:bg-black/5 dark:hover:bg-white/10"
              >
                <ArrowUpRight size={24} className="text-slate-900 dark:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
          <Link 
            href="/opportunities" 
            className="hidden md:flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-primary dark:hover:text-primary transition-colors group"
          >
            View All Properties
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => (
            <ListingCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/opportunities" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:bg-primary dark:hover:bg-primary hover:text-white transition-all shadow-lg"
          >
            Explore All Opportunities
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
