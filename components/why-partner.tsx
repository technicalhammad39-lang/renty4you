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
    <section ref={sectionRef} className="py-24 bg-background relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div ref={imageRef} className="relative w-full flex justify-center items-center">
            <Image
              src="/why-us-side.png" 
              alt="Why Partner with Us"
              width={600}
              height={600}
              className="w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-xl"
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CheckCircle weight="fill" className="text-primary text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-lg font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8 flex">
              <a href="#process" className="text-primary font-semibold uppercase tracking-widest text-sm py-4 border-b-2 border-primary/30 hover:border-primary transition-colors">
                Discover Our Process
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
