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
    <div className="group relative flex flex-col bg-white dark:bg-[#0f172a] rounded-[24px] border border-border-subtle hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] h-full mt-4">
      
      {/* Floating Strategy Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <span className="px-4 py-1.5 bg-white dark:bg-black border border-slate-200 dark:border-slate-800 text-primary rounded-full text-[11px] font-black shadow-lg flex items-center gap-1.5 w-max tracking-wide uppercase">
          <TrendUp size={14} weight="bold" />
          {opportunity.strategy}
        </span>
      </div>

      {/* Image Gallery / Hero Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[24px] bg-slate-100 dark:bg-slate-800">
        <Image
          src={opportunity.images && opportunity.images.length > 0 ? opportunity.images[0] : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop'}
          alt={opportunity.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 right-4 z-10">
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
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-4 left-4 z-10">
          <div className="px-3 py-1.5 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5 w-max">
            <MapPin size={14} weight="fill" className="text-primary" />
            {opportunity.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow w-full p-5 md:p-6">
        
        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-1.5 line-clamp-1 tracking-tight">
          {opportunity.title}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-1 leading-relaxed font-medium">
          {opportunity.description || "A premium, fully-managed investment opportunity tailored for high-yield returns."}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 pt-5 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Cashflow</span>
            <div className="flex items-center gap-0.5 text-primary font-black text-xl">
              <CurrencyGbp size={18} weight="bold" />
              {opportunity.estimatedCashflow.replace(/£/g, '')}<span className="text-xs text-slate-400 dark:text-slate-500 font-bold ml-0.5">/mo</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Est. ROI</span>
            <div className="flex items-baseline gap-1 text-slate-900 dark:text-white font-black text-xl">
              {opportunity.roi}%
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link 
            href={`/opportunities/${opportunity.slug}`}
            className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm transition-all duration-300 group/btn"
          >
            <span>View Full Deal Pack</span>
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center transform group-hover/btn:translate-x-1 transition-all">
              <ArrowRight size={14} weight="bold" className="text-slate-900 dark:text-white" />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
