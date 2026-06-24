"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    title: "Join Investor List",
    desc: "Secure your place to receive suitable opportunities.",
  },
  {
    title: "Discovery Call",
    desc: "We understand your strategy, budget and preferred model.",
  },
  {
    title: "Share Your Brief",
    desc: "Tell us your target areas, property type and risk profile.",
  },
  {
    title: "Property Search",
    desc: "We shortlist opportunities aligned with your brief.",
  },
  {
    title: "Deal Analysis",
    desc: "We review numbers, assumptions, restrictions and key risks.",
  },
  {
    title: "Deal Pack Delivery",
    desc: "You receive a clear pack with the property, figures and due diligence notes.",
  },
  {
    title: "Offer & Completion Support",
    desc: "We support communication, negotiation and next steps through completion.",
  },
];

export function ProcessWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      if (stepsRef.current) {
        const stepElements = stepsRef.current.querySelectorAll(".workflow-step");
        stepElements.forEach((step, i) => {
          gsap.fromTo(
            step,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: "blur(10px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.8,
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-surface relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            From Brief To Packaged Opportunity
          </h2>
          <p className="text-lg text-muted-text">
            A clear sourcing journey from first enquiry to completion support.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={stepsRef}>
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-border-subtle rounded-full -translate-x-1/2">
            <div ref={lineRef} className="absolute top-0 left-0 w-full bg-primary h-full origin-top" />
          </div>

          <div className="space-y-12">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`workflow-step relative flex items-center md:justify-between ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  <div className="absolute left-[28px] md:left-1/2 w-14 h-14 bg-background border-4 border-primary rounded-full flex items-center justify-center font-bold text-lg -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(212,160,23,0.5)]">
                    {index + 1}
                  </div>

                  <div className={`ml-20 md:ml-0 md:w-[45%] ${isEven ? "md:pl-10" : "md:pr-10"}`}>
                    <div className="p-8 bg-background border border-border-subtle rounded-3xl shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 relative group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-text leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
