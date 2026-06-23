"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

const CHECKLIST = [
  "Council and Airbnb specialists",
  "Compliance-first sourcing",
  "Data-driven numbers",
  "Conservative projections",
  "Hands-off deal packaging",
  "Support through to completion",
];

export function WhyPartner() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-surface relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div ref={imageRef} className="relative h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay z-10" />
            <Image
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670&auto=format&fit=crop" 
              alt="Investor working"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="space-y-8">
            <div ref={textRef}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                Why Partner With Rent4uSolutions?
              </h2>
              <p className="text-lg text-muted-text leading-relaxed">
                We focus on compliant, cashflow-focused opportunities that are packaged clearly, analysed conservatively and prepared for investors who want to move with confidence.
              </p>
            </div>

            <ul ref={listRef} className="space-y-4">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <CheckCircle weight="fill" className="text-gold text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8 flex">
              <a href="#process" className="text-gold font-semibold uppercase tracking-widest text-sm py-4 border-b-2 border-gold/30 hover:border-gold transition-colors">
                Discover Our Process
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
