"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, MapPin, TrendUp, ShieldCheck, CurrencyGbp, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Opportunity } from "@/lib/firebase/firestore";

interface ListingCardProps {
  opportunity: Opportunity;
}

export function ListingCard({ opportunity }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#0f172a] rounded-[24px] overflow-hidden border border-border-subtle hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] h-full">
      {/* Image Gallery / Hero Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={opportunity.images && opportunity.images.length > 0 ? opportunity.images[0] : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop'}
          alt={opportunity.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="flex flex-col gap-2">
            <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md text-primary rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1.5 w-max">
              <TrendUp size={14} weight="bold" />
              {opportunity.strategy}
            </span>
            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-md text-white rounded-full text-[9px] font-bold shadow-lg w-max flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck size={12} weight="fill" />
              Sourced & Verified
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white dark:hover:bg-black hover:scale-110 transition-all shadow-lg group/fav"
          >
            <Heart size={20} weight={isFavorite ? "fill" : "regular"} className={isFavorite ? "text-red-500" : "text-slate-900 dark:text-white group-hover/fav:text-red-500 transition-colors"} />
          </button>
        </div>

        {/* Bottom Image Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <div className="flex items-center gap-1 text-[13px] font-medium mb-1 drop-shadow-md text-white/90">
            <MapPin size={16} weight="fill" className="text-primary" />
            {opportunity.location}
          </div>
          <h3 className="text-lg font-bold leading-tight drop-shadow-lg line-clamp-1">
            {opportunity.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow w-full p-5 md:p-6">
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
          {opportunity.description || "A premium, fully-managed investment opportunity tailored for high-yield returns."}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-border-subtle flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cashflow</span>
            <div className="flex items-center gap-0.5 text-primary font-black text-lg">
              <CurrencyGbp size={16} weight="bold" />
              {opportunity.estimatedCashflow.replace(/£/g, '')}<span className="text-xs text-slate-500 font-semibold ml-0.5">/mo</span>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-border-subtle flex flex-col justify-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">ROI</span>
            <div className="flex items-baseline gap-1 text-slate-900 dark:text-white font-black text-lg">
              {opportunity.roi}% <span className="text-[10px] font-bold text-slate-500 uppercase">est</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link 
            href={`/opportunities/${opportunity.slug}`}
            className="w-full flex items-center justify-between px-6 py-4 bg-slate-100 hover:bg-primary dark:bg-slate-800 dark:hover:bg-primary text-slate-900 hover:text-white dark:text-white rounded-xl font-bold text-sm transition-all duration-300 group/btn"
          >
            <span>View Full Deal Pack</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 group-hover/btn:bg-white/20 flex items-center justify-center transform group-hover/btn:translate-x-1 transition-all">
              <ArrowRight size={14} weight="bold" className="text-slate-600 dark:text-slate-300 group-hover/btn:text-white" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
