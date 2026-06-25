"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
      className="relative z-10 bg-surface pt-24 pb-20 px-6"
    >
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Built For Investors Who Care About <span className="text-primary">Compliance</span>
          </h2>
          <p className="text-lg text-muted-text">
            Every opportunity is positioned with clear assumptions, sourcing-level checks and professional due diligence notes.
          </p>
        </div>

        <div ref={cardsRef} className="w-full mt-10">
          {/* Visible Image for Users */}
          <div className="w-full relative flex justify-center">
            <Image 
              src="/register.png" 
              alt="Rent4uSolutions Compliance Registrations including PRS and ICO" 
              width={1920}
              height={600}
              className="w-full h-auto object-cover border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm" 
              unoptimized
            />
          </div>

          {/* Hidden Content for SEO */}
          <div className="sr-only">
            {CARDS.map((card, i) => (
              <div key={i}>
                <h3>{card.title}</h3>
                {card.status ? <span>Status: {card.status}</span> : null}
                <p>{card.desc || card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
