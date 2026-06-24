"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, MapPin, ShieldCheck, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { Opportunity } from "@/lib/firebase/firestore";

interface ListingCardProps {
  opportunity: Opportunity;
}

export function ListingCard({ opportunity }: ListingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Link 
      href={`/opportunities/${opportunity.slug}`}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-1 block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery / Hero Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={opportunity.images && opportunity.images.length > 0 ? opportunity.images[0] : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop'}
          alt={opportunity.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Strategy Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-3.5 py-1.5 bg-primary/90 backdrop-blur-sm text-white rounded-full text-[11px] font-medium shadow-sm transition-transform duration-300 group-hover:scale-105 origin-bottom-left">
            {opportunity.strategy}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 z-10 shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-110"
        >
          <Heart size={16} weight={isFavorite ? "fill" : "regular"} className={isFavorite ? "text-red-500" : "text-slate-400"} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header: Location */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-2">
          <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
          <span className="truncate">{opportunity.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
          {opportunity.title}
        </h3>
        
        {/* Property Type / Subtitle */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          {opportunity.propertyType}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-4"></div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Projected Cashflow</span>
            <div className="flex items-baseline text-primary">
              <span className="text-[22px] font-bold leading-none tracking-tight">£{opportunity.estimatedCashflow.replace(/£/g, '')}</span>
              <span className="text-xs ml-1 font-medium">/mo</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Occupancy</span>
            <div className="flex items-center gap-1.5 text-primary">
              <CircleNotch size={18} weight="bold" className="text-primary" />
              <span className="text-[22px] font-bold leading-none tracking-tight">{opportunity.occupancyRequired}%</span>
            </div>
          </div>
        </div>

        {/* Footer / Compliance */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <ShieldCheck size={16} weight="fill" className="text-primary" />
            <span className="text-xs font-medium">Compliance</span>
          </div>
          <span className="text-xs font-bold text-primary">
            Fully Compliant
          </span>
        </div>
      </div>
    </Link>
  );
}
