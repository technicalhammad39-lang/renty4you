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
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2670&auto=format&fit=crop",
    icon: HouseLine,
  },
  {
    id: "council",
    title: "Council Leasing",
    text: "Properties suitable for council and housing association style leasing, focused on predictable income and lower day-to-day involvement.",
    tags: ["Council demand", "Long-term lease", "Reduced void risk"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    icon: City,
  },
  {
    id: "r2r",
    title: "Rent-to-Rent",
    text: "Rent-ready opportunities structured for investors and operators looking to build cashflow without buying property.",
    tags: ["Cashflow focused", "Operator friendly", "UK-wide sourcing"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
    icon: Key,
  },
];

export function CoreStrategies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
    <section id="strategies" ref={sectionRef} className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Three Ways We Help Investors Source Smarter
          </h2>
          <p className="text-lg text-muted-text">
            Focused property sourcing for investors, operators and landlords building cashflow through practical UK property strategies.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {STRATEGIES.map((strategy) => (
            <div 
              key={strategy.id} 
              className="group relative rounded-[32px] overflow-hidden bg-surface border border-border-subtle flex flex-col h-[600px]"
            >
              <div className="absolute inset-0 h-1/2 w-full overflow-hidden">
                <Image 
                  src={strategy.image} 
                  alt={strategy.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface" />
              </div>

              <div className="relative z-10 flex flex-col h-full mt-auto pt-[280px] p-8">
                <div className="bg-surface/80 backdrop-blur-xl p-4 rounded-2xl w-16 h-16 flex items-center justify-center border border-border-subtle shadow-sm mb-6 group-hover:-translate-y-2 group-hover:shadow-gold/20 transition-all duration-500">
                  <strategy.icon size={32} className="text-gold" weight="duotone" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{strategy.title}</h3>
                <p className="text-muted-text mb-6 flex-grow">{strategy.text}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {strategy.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 bg-background border border-border-subtle rounded-full text-foreground/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href="#contact" className="inline-flex items-center gap-2 text-gold font-semibold group/link mt-auto w-fit">
                  Explore {strategy.title}
                  <ArrowRight size={20} className="group-hover/link:translate-x-1 group-hover/link:text-gold transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
