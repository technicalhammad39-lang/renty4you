"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2653&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2535&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1600607687931-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=2670&auto=format&fit=crop", 
];

export function Hero() {
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

  return (
    <div ref={containerRef} className="sticky top-0 left-0 w-full h-[85vh] min-h-[620px] overflow-hidden z-0 bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
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

      <div className="relative z-10 h-full flex flex-col justify-center w-full px-4 md:px-8 xl:px-12 py-32">
        <div ref={textRef} className="w-full text-white flex flex-col gap-2 md:gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white max-w-4xl text-left"
          >
            Council Leasing & Airbnb Property Opportunities Across The UK
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 leading-relaxed max-w-xl text-left"
          >
            We source compliant, cashflow-focused Rent-to-Rent, Airbnb, and Council Sourcing opportunities across the UK for premium property investors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-1 md:mt-2"
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="px-8 py-4 brand-gradient text-white rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:-translate-y-1 cursor-pointer"
            >
              Join Investor List
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-sm transition-all hover:-translate-y-1 cursor-pointer"
            >
              Book Discovery Call
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


