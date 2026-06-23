"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
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
    <section id="pricing" ref={sectionRef} className="py-24 bg-background relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Simple, Transparent Sourcing Fees
          </h2>
          <p className="text-lg text-muted-text">
            A clear two-stage fee structure with no subscription model.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Reservation Fee</h3>
            <div className="text-5xl font-bold mb-4 font-mono tracking-tighter">£500</div>
            <p className="text-muted-text">Deducted from the final sourcing fee.</p>
          </div>

          <div className="p-8 rounded-3xl bg-surface border border-border-subtle shadow-sm flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-2">Completion Fee</h3>
            <div className="text-5xl font-bold mb-4 font-mono tracking-tighter">£3,000</div>
            <p className="text-muted-text">Payable on successful completion.</p>
          </div>

          <div className="p-8 rounded-3xl bg-surface border-2 border-gold shadow-[0_0_40px_rgba(212,160,23,0.15)] flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-gold text-white text-xs font-bold uppercase tracking-wider rounded-bl-2xl">
              Payable In Two Stages
            </div>
            <h3 className="text-xl font-semibold mb-2 mt-4">Total Sourcing Fee</h3>
            <div className="text-5xl border-b border-gold/30 pb-6 font-bold mb-6 text-gold font-mono tracking-tighter w-full">£3,500</div>
            <ul className="text-left w-full space-y-3">
              <li className="flex items-center gap-2"><CheckCircle weight="fill" className="text-gold" /> £500 reservation</li>
              <li className="flex items-center gap-2"><CheckCircle weight="fill" className="text-gold" /> £3,000 completion</li>
            </ul>
          </div>

        </div>

        <div className="max-w-4xl mx-auto mt-12 space-y-4 text-center">
          <p className="text-sm text-muted-text px-4">
            The reservation fee is non-refundable once a deal is reserved, except in specific circumstances set out in the client agreement.
          </p>
          <p className="text-xs text-muted-text/70 px-4">
            Disclaimer: All figures and projected returns are estimates only. Clients must complete their own financial, legal and professional due diligence.
          </p>
        </div>
      </div>
    </section>
  );
}
