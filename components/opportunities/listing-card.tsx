"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, Star } from "@phosphor-icons/react/dist/ssr";
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
      className="group flex flex-col h-full cursor-pointer block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery / Hero Image */}
      <div className="relative aspect-[1/1] w-full overflow-hidden bg-slate-100 rounded-[20px] mb-4">
        <Image
          src={opportunity.images && opportunity.images.length > 0 ? opportunity.images[0] : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1665&auto=format&fit=crop'}
          alt={opportunity.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Strategy Badge Overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[11px] font-bold shadow-sm shadow-black/5">
            {opportunity.strategy}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform duration-200"
        >
          <Heart size={26} weight={isFavorite ? "fill" : "regular"} className={isFavorite ? "text-red-500" : "text-white drop-shadow-md"} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow w-full px-1">
        {/* Header: Location & Occupancy/Rating */}
        <div className="flex justify-between items-start mb-0.5">
          <h3 className="text-[15px] font-semibold text-slate-900 leading-tight truncate pr-4">
            {opportunity.location}
          </h3>
          <div className="flex items-center gap-1 text-[13px] font-medium text-slate-800 shrink-0">
            <Star size={12} weight="fill" className="text-slate-900" />
            {opportunity.occupancyRequired}%
          </div>
        </div>
        
        {/* Property Title / Subtitle */}
        <p className="text-[14px] text-slate-500 mb-0.5 truncate">
          {opportunity.title}
        </p>

        <p className="text-[14px] text-slate-500 mb-2 truncate">
          {opportunity.propertyType}
        </p>

        {/* Pricing */}
        <div className="mt-auto flex items-baseline gap-1 text-slate-900">
          <span className="font-semibold">£{opportunity.estimatedCashflow.replace(/£/g, '')}</span>
          <span className="text-[14px]">est. cashflow</span>
        </div>
      </div>
    </Link>
  );
}
