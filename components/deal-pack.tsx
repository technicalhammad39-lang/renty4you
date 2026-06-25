"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChartBar, CurrencyGbp, FileText, HouseLine, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export function DealPackDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

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

      if (dashRef.current) {
        const blocks = dashRef.current.querySelectorAll(".dash-block");

        gsap.fromTo(
          blocks,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
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
        <div ref={titleRef} className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Inside Every Deal Pack
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Every opportunity is packaged like a clear investor report, helping you understand the property, numbers, assumptions, risks and next steps before committing.
          </p>
        </div>

        <div ref={dashRef} className="relative w-full max-w-6xl mx-auto rounded-[32px] bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* MacOS Browser Header */}
          <div className="flex items-center px-6 py-4 bg-white/40 dark:bg-black/40 border-b border-black/5 dark:border-white/5">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
              investor-report-sa-lpl-092.pdf
            </div>
            <div className="w-14"></div> {/* Spacer for centering */}
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 dash-block">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-hover/5 flex items-center justify-center border border-primary/20 shadow-inner">
                  <FileText className="text-primary" size={32} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl md:text-3xl tracking-tight text-slate-900 dark:text-white mb-2">Investment Report</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                    Ref: SA-LPL-092 <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span> Issued Today
                  </p>
                </div>
              </div>
              <button className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-sm transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(212,160,23,0.3)] hover:shadow-[0_0_30px_rgba(212,160,23,0.5)]">
                Review Opportunity
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
              
              {/* Row 1, Col 1 - Property */}
              <div className="col-span-1 md:col-span-4 dash-block p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col gap-6 relative z-10">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <HouseLine size={24} weight="duotone" className="text-primary" /> 
                  <span className="font-bold tracking-tight text-lg">Property & Area</span>
                </div>
                {/* Mockup Image Placeholder */}
                <div className="w-full h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative shadow-inner flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-50 dark:from-slate-700 dark:to-slate-800"></div>
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                    Liverpool City Centre
                  </div>
                </div>
                <div className="space-y-3 flex-grow">
                  <div className="h-2.5 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                  <div className="h-2.5 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                  <div className="h-2.5 w-5/6 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Guest Demand</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    Very High
                  </span>
                </div>
              </div>

              {/* Row 1, Col 2 - Financials */}
              <div className="col-span-1 md:col-span-4 dash-block p-1.5 rounded-[2rem] bg-gradient-to-b from-primary/40 via-accent/10 to-transparent shadow-xl relative z-10 flex flex-col">
                <div className="h-full w-full rounded-[1.8rem] bg-white dark:bg-slate-900 p-8 flex flex-col relative overflow-hidden">
                  {/* Sparkline background effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
                  
                  <div className="flex items-center gap-3 text-primary mb-10 relative z-10">
                    <CurrencyGbp size={28} weight="duotone" /> 
                    <span className="font-bold tracking-tight text-xl">Financials</span>
                  </div>
                  
                  <div className="space-y-6 relative z-10 flex-grow flex flex-col">
                    <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Gross Income (Est.)</span>
                      <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">£3,200</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-800 pb-4">
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Costs</span>
                      <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">£2,150</span>
                    </div>
                    
                    <div className="pt-6 pb-2 mt-auto">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Net Cashflow</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">£1,050</span>
                        <span className="text-xl font-bold text-slate-400">/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 1 & 2, Col 3 - Risks */}
              <div className="col-span-1 md:col-span-4 md:row-span-2 dash-block p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col h-full relative z-10">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-6">
                  <ChartBar size={24} weight="duotone" className="text-primary" /> 
                  <span className="font-bold tracking-tight text-lg">Risks & Assumptions</span>
                </div>
                <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 mb-8">
                  Conservative figures applied to nightly rates. Cleaning and portal fees calculated at 18%.
                </p>
                <div className="flex flex-col gap-5 flex-grow">
                  <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5 shadow-[0_0_12px_rgba(239,68,68,0.6)]"></div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">Key Risk</span>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Seasonal dip in Q1 occupancy.</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white text-sm block mb-1">Assumption</span>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Corporate mid-week demand remains stable.</span>
                    </div>
                  </div>
                </div>
                {/* Skeleton to fill empty space */}
                <div className="mt-auto pt-8 flex flex-col gap-5 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                    <div className="flex-1 space-y-2.5">
                       <div className="h-2 w-1/3 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                       <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2.5 pl-11">
                    <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="h-2 w-4/6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Row 2, Col 1 - Compliance */}
              <div className="col-span-1 md:col-span-4 dash-block p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col relative z-10">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 mb-6 flex-shrink-0">
                  <ShieldCheck size={24} weight="duotone" className="text-primary" /> 
                  <span className="font-bold tracking-tight text-lg">Compliance Notes</span>
                </div>
                <ul className="space-y-5 flex-grow">
                  {["Licensing checks passed", "Planning permission reviewed", "Lease terms verified"].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 2, Col 2 - Break-even Occupancy */}
              <div className="col-span-1 md:col-span-4 dash-block p-6 rounded-[24px] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-6 relative z-10">
                 <div className="flex justify-between items-center w-full px-2">
                  <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm">Break-even Occupancy</span>
                  <span className="font-bold text-slate-900 dark:text-white text-base">65%</span>
                 </div>
                 <div className="relative w-48 h-48 flex-shrink-0 drop-shadow-sm mb-4">
                   <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 42 42">
                     {/* Occupancy (65%) */}
                     <circle
                       cx="21"
                       cy="21"
                       r="15.9155"
                       className="text-primary hover:scale-[1.06] hover:drop-shadow-xl transition-all duration-300 origin-center cursor-pointer"
                       strokeWidth="8"
                       strokeDasharray="65 100"
                       strokeDashoffset="0"
                       stroke="currentColor"
                       fill="none"
                     >
                       <title>Break-even Occupancy: 65%</title>
                     </circle>
                     {/* Vacancy (35%) */}
                     <circle
                       cx="21"
                       cy="21"
                       r="15.9155"
                       className="text-slate-200 dark:text-slate-700 hover:scale-[1.06] hover:drop-shadow-xl transition-all duration-300 origin-center cursor-pointer"
                       strokeWidth="8"
                       strokeDasharray="35 100"
                       strokeDashoffset="-65"
                       stroke="currentColor"
                       fill="none"
                     >
                       <title>Vacancy Buffer: 35%</title>
                     </circle>
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="font-black text-slate-900 dark:text-white text-4xl">65%</span>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">Required</span>
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
