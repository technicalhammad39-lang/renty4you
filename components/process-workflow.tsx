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
    const ctx = gsap.context(() => {
      // 1. Continuous Vertical Line Animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 70%", // Line tip tracks the 70% height mark of the screen
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      }

      if (stepsRef.current) {
        const stepElements = stepsRef.current.querySelectorAll(".workflow-step");
        stepElements.forEach((step, i) => {
          // 2. Card Animation (Appears early as it enters screen)
          const card = step.querySelector(".workflow-card");
          gsap.fromTo(
            card,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50, filter: "blur(10px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.8,
              scrollTrigger: {
                trigger: step,
                start: "top 85%", // Triggers as soon as it's comfortably in view
              },
            }
          );

          // 3. Circle Color Animation (Fades in the green circle on Scrub)
          const circleGreen = step.querySelector(".workflow-circle-green");
          gsap.fromTo(
            circleGreen,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 75%", // Starts turning green slightly before line tip hits
                end: "top 65%",   // Fully green slightly after
                scrub: true,
              },
            }
          );

          // 4. Horizontal Connector Animation (Draws on Scrub)
          const connectors = step.querySelectorAll(".workflow-connector");
          connectors.forEach(connector => {
            gsap.fromTo(
              connector,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: step,
                  start: "top 70%", // Starts drawing as line tip hits the circle
                  end: "top 60%",   // Fully drawn
                  scrub: true,
                },
              }
            );
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-surface relative z-10 overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            From Brief To <span className="text-primary">Packaged Opportunity</span>
          </h2>
          <p className="text-lg text-muted-text">
            A clear sourcing journey from first enquiry to completion support.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto" ref={stepsRef}>
          {/* Timeline Background Line (Offsets prevent it from sticking out above first/last circle) */}
          <div className="absolute left-[28px] md:left-1/2 top-[60px] bottom-[60px] w-[2px] bg-border-subtle -translate-x-1/2 z-0">
            {/* Animated Primary Line */}
            <div ref={lineRef} className="absolute top-0 left-0 w-full bg-primary h-full origin-top" />
          </div>

          <div className="flex flex-col gap-12 lg:gap-16">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`workflow-step relative flex items-center md:justify-between ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Circle Wrapper */}
                  <div className="absolute left-[28px] md:left-1/2 top-1/2 -translate-y-1/2 w-14 h-14 -translate-x-1/2 z-20">
                    {/* Base Gray Circle */}
                    <div className="absolute inset-0 rounded-full flex items-center justify-center font-bold text-lg border-4 border-border-subtle bg-surface text-muted-text">
                      {index + 1}
                    </div>
                    {/* Animated Green Circle */}
                    <div className="workflow-circle-green absolute inset-0 rounded-full flex items-center justify-center font-bold text-lg border-4 border-primary bg-primary text-white shadow-[0_0_20px_rgba(22,163,74,0.5)] opacity-0">
                      {index + 1}
                    </div>
                  </div>

                  {/* Horizontal Connector (Mobile) */}
                  <div className="md:hidden absolute left-[56px] top-1/2 -translate-y-1/2 h-[2px] w-[40px] bg-border-subtle z-0" />
                  <div className="md:hidden workflow-connector absolute left-[56px] top-1/2 -translate-y-1/2 h-[2px] w-[40px] bg-primary origin-left z-10" />
                  
                  {/* Horizontal Connector (Desktop) */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-[calc(4%+1rem)] lg:w-[calc(6%+1rem)] bg-border-subtle z-0 ${isEven ? "left-[50%]" : "right-[50%]"}`} />
                  <div className={`hidden md:block workflow-connector absolute top-1/2 -translate-y-1/2 h-[2px] w-[calc(4%+1rem)] lg:w-[calc(6%+1rem)] bg-primary z-10 ${isEven ? "left-[50%] origin-left" : "right-[50%] origin-right"}`} />

                  {/* Card Content */}
                  <div className={`workflow-card ml-24 md:ml-0 md:w-[46%] lg:w-[44%] ${isEven ? "md:pl-4" : "md:pr-4"}`}>
                    <div className="p-8 bg-background border border-border-subtle rounded-3xl shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 relative group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-text leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Empty Div for Desktop Layout Balance */}
                  <div className="hidden md:block md:w-[46%] lg:w-[44%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
