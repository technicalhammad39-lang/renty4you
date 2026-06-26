"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const IMAGES = [
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop", // UK Terraced Houses (Council Leasing)
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop", // Modern Living Room (Serviced Accommodation)
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop", // Keys/Property Deal (Sourcing)
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop", // Premium Property exterior
];

export function Hero({ 
  compact = false,
  title,
  subtitle,
  showButtons = true
}: { 
  compact?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  showButtons?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.to(textRef.current, {
          y: -100,
          opacity: 0,
          filter: "blur(10px)",
          ease: "none",
        }),
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const heightClass = compact ? "h-[40vh] min-h-[320px] md:min-h-[360px]" : "h-[85vh] min-h-[650px]";

  return (
    <div ref={containerRef} className={`sticky top-0 left-0 w-full ${heightClass} overflow-hidden z-0 bg-black flex flex-col justify-center`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" as any }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={IMAGES[currentImage]}
            alt="Premium UK Property"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-[#030712]/50 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-[rgba(3,7,18,0.65)] z-0"></div>

      <div className={`relative z-10 w-full px-4 sm:px-6 md:px-8 xl:px-12 ${compact ? "pt-24 pb-12" : "pt-28 pb-16"} md:pt-0 md:pb-0 flex flex-col justify-center mt-8 md:mt-0`}>
        <div ref={textRef} className="w-full text-white flex flex-col gap-4 md:gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-bold tracking-tight leading-[1.1] text-white text-left ${compact ? "max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl" : "max-w-4xl text-[40px] sm:text-5xl md:text-6xl lg:text-7xl"}`}
          >
            {title || "Cashflow Focused Council Leasing & Airbnb Deals"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-gray-300 leading-relaxed text-left mt-1 md:mt-2 ${compact ? "max-w-2xl text-sm sm:text-base" : "max-w-xl text-sm sm:text-base md:text-lg"}`}
          >
            {subtitle || "We source compliant, cashflow-focused Rent-to-Rent, Airbnb, and Council Sourcing opportunities across the UK for premium property investors."}
          </motion.p>

          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4 md:mt-6 z-20"
            >
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                className="group w-full sm:w-auto px-8 py-4 brand-gradient text-white rounded-full font-bold text-[15px] transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:-translate-y-1 cursor-pointer flex justify-center items-center"
              >
                <span className="flex items-center gap-2">
                  Join Investor List
                  <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
                    <ArrowRight weight="bold" className="absolute transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0" />
                    <ArrowRight weight="bold" className="absolute -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </span>
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                className="group w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-[15px] transition-all hover:-translate-y-1 cursor-pointer flex justify-center items-center"
              >
                <span className="flex items-center gap-2">
                  Book Discovery Call
                  <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
                    <ArrowRight weight="bold" className="absolute transition-all duration-300 group-hover:translate-x-full group-hover:opacity-0" />
                    <ArrowRight weight="bold" className="absolute -translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}


