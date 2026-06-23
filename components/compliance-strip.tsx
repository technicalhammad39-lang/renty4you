"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, FileText, MagnifyingGlass, Scales } from "@phosphor-icons/react/dist/ssr";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "PRS Registration",
    status: "In Process",
    desc: "Governing body for property professionals.",
  },
  {
    icon: Scales,
    title: "ICO Registration",
    status: "In Process",
    desc: "Information Commissioner's Office data protection.",
  },
  {
    icon: FileText,
    title: "Compliance Checklist",
    text: "Licensing, planning, lease and use restrictions considered at sourcing level.",
  },
  {
    icon: MagnifyingGlass,
    title: "Due Diligence Support",
    text: "Clear notes for you and your advisers before commitment.",
  },
];

export function ComplianceStrip() {
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
          { opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 bg-surface rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.8)] pt-24 pb-20 px-6 mt-[-2px]"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Built For Investors Who Care About Compliance
          </h2>
          <p className="text-lg text-muted-text">
            Every opportunity is positioned with clear assumptions, sourcing-level checks and professional due diligence notes.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl bg-background border border-border-subtle hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <card.icon 
                size={40} 
                weight="duotone" 
                className="text-gold mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" 
              />
              
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              
              {card.status ? (
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="relative flex h-3 w-3 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                  </span>
                  <span className="text-sm font-semibold text-gold tracking-wide uppercase">Status: {card.status}</span>
                </div>
              ) : null}
              
              <p className="text-muted-text text-sm leading-relaxed">
                {card.desc || card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
