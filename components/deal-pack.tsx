"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChartBar, CurrencyGbp, FileText, HouseLine, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export function DealPackDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

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

      if (dashRef.current) {
        const blocks = dashRef.current.querySelectorAll(".dash-block");
        const lines = dashRef.current.querySelectorAll(".dash-line");

        gsap.fromTo(
          blocks,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: dashRef.current,
              start: "top 75%",
            },
          }
        );

        gsap.fromTo(
          lines,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: dashRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="deal-packs" ref={sectionRef} className="py-24 bg-surface relative z-10 overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Inside Every Deal Pack
          </h2>
          <p className="text-lg text-muted-text">
            Every opportunity is packaged like a clear investor report, helping you understand the property, numbers, assumptions, risks and next steps before committing.
          </p>
        </div>

        <div ref={dashRef} className="relative w-full max-w-5xl mx-auto p-4 md:p-8 rounded-[40px] bg-surface border border-border-subtle shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-border-subtle pb-6 mb-6 dash-block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <FileText className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl">Investment Report</h3>
                <p className="text-muted-text text-sm">Ref: SA-LPL-092 • Issued Today</p>
              </div>
            </div>
            <button className="hidden md:block px-4 py-2 bg-gold/10 text-gold rounded-full font-medium text-sm">
              Review Opportunity
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '400px' }}>
              <line x1="33%" y1="20%" x2="66%" y2="20%" stroke="var(--gold)" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" className="dash-line" />
              <line x1="33%" y1="50%" x2="66%" y2="80%" stroke="var(--gold)" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" className="dash-line" />
            </svg>

            <div className="space-y-6 relative z-10">
              <div className="dash-block p-6 rounded-2xl bg-background border border-border-subtle shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3 text-muted-text mb-2">
                  <HouseLine size={20} /> <span className="font-semibold">Property & Area</span>
                </div>
                <div className="h-2 w-3/4 bg-border-subtle rounded-full"></div>
                <div className="h-2 w-1/2 bg-border-subtle rounded-full"></div>
                <div className="h-2 w-5/6 bg-border-subtle rounded-full"></div>
                <div className="mt-4 pt-4 border-t border-border-subtle flex justify-between items-center text-sm">
                  <span>Guest Demand</span>
                  <span className="text-gold font-bold">High</span>
                </div>
              </div>

              <div className="dash-block p-6 rounded-2xl bg-background border border-border-subtle shadow-sm">
                <div className="flex items-center gap-3 text-muted-text mb-4">
                  <ShieldCheck size={20} /> <span className="font-semibold">Compliance Notes</span>
                </div>
                <ul className="space-y-3">
                  {["Licensing checks passed", "Planning permission reviewed", "Lease terms verified"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="dash-block p-6 rounded-2xl bg-gold/5 border border-gold/30 shadow-[0_0_30px_rgba(212,160,23,0.1)]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 text-gold">
                    <CurrencyGbp size={24} weight="bold" /> <span className="font-bold text-lg">Financials</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-border-subtle pb-2">
                    <span className="text-sm text-muted-text">Gross Income (Est.)</span>
                    <span className="text-xl font-bold">£3,200</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-border-subtle pb-2">
                    <span className="text-sm text-muted-text">Total Costs</span>
                    <span className="text-xl font-bold">£2,150</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-sm font-bold text-gold">Net Cashflow</span>
                    <span className="text-2xl font-bold text-gold">£1,050 /m</span>
                  </div>
                </div>
              </div>

              <div className="dash-block p-6 rounded-2xl bg-background border border-border-subtle shadow-sm flex flex-col gap-4">
                 <div className="flex justify-between text-sm">
                  <span className="text-muted-text">Break-even Occupancy</span>
                  <span className="font-bold">65%</span>
                 </div>
                 <div className="w-full h-2 rounded-full bg-border-subtle overflow-hidden">
                    <div className="h-full bg-gold w-[65%]"></div>
                 </div>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="dash-block p-6 rounded-2xl bg-background border border-border-subtle shadow-sm flex flex-col h-full">
                <div className="flex items-center gap-3 text-muted-text mb-4">
                  <ChartBar size={20} /> <span className="font-semibold">Risks & Assumptions</span>
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-grow">
                  Conservative figures applied to nightly rates. Cleaning and portal fees calculated at 18%. 
                </p>
                <div className="flex flex-col gap-3">
                  <div className="p-3 rounded-lg bg-surface border border-border-subtle text-sm flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-1"></div>
                    <div>
                      <span className="font-semibold block text-xs mb-1">Key Risk</span>
                      Seasonal dip in Q1.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-border-subtle text-sm flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1"></div>
                    <div>
                      <span className="font-semibold block text-xs mb-1">Assumption</span>
                      Corporate mid-week demand.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
