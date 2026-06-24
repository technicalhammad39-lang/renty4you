"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, MapPin, House, ShieldCheck, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import { Opportunity } from "@/lib/firebase/firestore";

interface ListingCardProps {
  opportunity: Opportunity;
}

export function ListingCard({ opportunity }: ListingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group bg-white dark:bg-slate-900 rounded-[24px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:-translate-y-1 flex flex-col h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery / Hero Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={opportunity.images[0]}
          alt={opportunity.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105 origin-left">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              {opportunity.strategy}
            </span>
            {opportunity.featured && (
              <span className="px-3 py-1.5 bg-gold/90 text-white backdrop-blur-md rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105 origin-left self-start">
                Featured
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="w-8 h-8 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors z-10"
          >
            <Heart size={18} weight={isFavorite ? "fill" : "regular"} className={isFavorite ? "text-red-500" : "text-slate-700 dark:text-slate-300"} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header: Location & Type */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
            <MapPin size={16} weight="fill" />
            {opportunity.location}
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
            <House size={14} weight="duotone" />
            {opportunity.propertyType}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-snug">
          {opportunity.title}
        </h3>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Est. Cashflow</span>
            <span className="font-bold text-gold text-sm">{opportunity.estimatedCashflow}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">Rent Range</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{opportunity.rentRange}</span>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <ChartLineUp size={16} className="text-blue-500" />
            Req. {opportunity.occupancyRequired}
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <ShieldCheck size={16} className="text-green-500" />
            Compliant
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={`/opportunities/${opportunity.slug}`}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 bg-slate-900 hover:bg-gold text-white dark:bg-white dark:hover:bg-gold dark:text-slate-900 dark:hover:text-white"
        >
          View Opportunity
        </Link>
      </div>
    </div>
  );
}
