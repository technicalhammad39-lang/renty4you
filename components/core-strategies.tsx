"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, HouseLine, City, Key } from "@phosphor-icons/react/dist/ssr";

const STRATEGIES = [
  {
    id: "sa",
    title: "Serviced Accommodation",
    text: "Airbnb-ready opportunities in strong demand areas, pre-screened for suitability, compliance risks and realistic cashflow potential.",
    tags: ["Airbnb-ready", "Occupancy-led", "Compliance checks"],
    image: "/card1.jpg",
    icon: HouseLine,
  },
  {
    id: "council",
    title: "Council Leasing",
    text: "Properties suitable for council and housing association style leasing, focused on predictable income and lower day-to-day involvement.",
    tags: ["Council demand", "Long-term lease", "Reduced void risk"],
    image: "/card2.jpg",
    icon: City,
  },
  {
    id: "r2r",
    title: "Rent-to-Rent",
    text: "Rent-ready opportunities structured for investors and operators looking to build cashflow without buying property.",
    tags: ["Cashflow focused", "Operator friendly", "UK-wide sourcing"],
    image: "/card3.jpg",
    icon: Key,
  },
];

export function CoreStrategies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: "blur(16px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.98, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="strategies" ref={sectionRef} className="pt-8 pb-24 bg-surface relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div ref={titleRef} className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Three Ways We Help Investors <span className="text-primary">Source Smarter</span>
          </h2>
          <p className="text-lg text-muted-text">
            Focused property sourcing for investors, operators and landlords building cashflow through practical UK property strategies.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-12 pr-6 lg:pr-8">
          {STRATEGIES.map((strategy) => (
            <div 
              key={strategy.id} 
              className="group relative w-full h-[360px] md:h-[380px] xl:h-[400px]"
            >
              {/* Image Container */}
              <div className="absolute top-0 left-0 w-[85%] lg:w-[88%] h-[85%] md:h-[88%] rounded-3xl overflow-hidden">
                <Image 
                  src={strategy.image} 
                  alt={strategy.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  unoptimized
                />
              </div>

              {/* Green Box */}
              <div className="absolute bottom-4 lg:bottom-6 right-0 w-[90%] md:w-[94%] bg-gradient-to-br from-primary to-accent text-white rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] p-5 lg:p-6 z-10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 border-t-[8px] border-l-[8px] border-surface">
                
                {/* Circular Icon */}
                <div className="absolute -top-6 -right-4 md:-right-6 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center text-primary z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <strategy.icon size={24} weight="fill" className="md:w-[26px] md:h-[26px]" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-1 lg:mb-2 pr-4 leading-tight">{strategy.title}</h3>
                <p className="text-[13px] md:text-sm text-gray-300 leading-relaxed line-clamp-4">
                  {strategy.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
