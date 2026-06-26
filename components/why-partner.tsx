"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { PhoneCall, UserCircle, ShieldCheck, ChartLineUp, Package, MagnifyingGlass, MapPin, Handshake } from "@phosphor-icons/react/dist/ssr";

const LEFT_ITEMS = [
  {
    id: "discovery",
    icon: PhoneCall,
    title: "Discovery Call",
    desc: "Understand goals, strategy and requirements.",
  },
  {
    id: "investor",
    icon: UserCircle,
    title: "Investor Focus",
    desc: "Tailored opportunities based on investor criteria.",
  },
  {
    id: "compliance",
    icon: ShieldCheck,
    title: "Compliance First",
    desc: "Compliance-led sourcing process.",
  },
  {
    id: "analysis",
    icon: ChartLineUp,
    title: "Conservative Analysis",
    desc: "Risk-aware and realistic deal assessment.",
  },
];

const RIGHT_ITEMS = [
  {
    id: "packaging",
    icon: Package,
    title: "Deal Packaging",
    desc: "Investment-ready deal packs.",
  },
  {
    id: "dd",
    icon: MagnifyingGlass,
    title: "Due Diligence Support",
    desc: "Transparent opportunity reviews.",
  },
  {
    id: "uk",
    icon: MapPin,
    title: "UK-Wide Opportunities",
    desc: "Access opportunities across the UK.",
  },
  {
    id: "completion",
    icon: Handshake,
    title: "Completion Support",
    desc: "Guidance throughout the process.",
  },
];

const Y_POSITIONS = [150, 316, 483, 650];

export function WhyPartner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section className="pt-16 pb-0 xl:pt-20 bg-[#FAFAF9] dark:bg-[#0B1220] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full px-4 md:px-8 xl:px-12 relative z-10" ref={containerRef}>
        
        <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-4 xl:mb-2 relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            Why Partner <br className="md:hidden" />
            <span className="text-primary">With Us</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } } }}
            className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Our premium sourcing ecosystem connects you to the right opportunities.
          </motion.p>
        </div>

        {/* Desktop Ecosystem Layout (Fixed aspect ratio 1200/600 ensures nodes and SVG align perfectly) */}
        <div className="hidden lg:block relative w-full mx-auto -mt-6 xl:-mt-10" style={{ aspectRatio: '1200/600' }}>
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Glowing gradients for the moving "comets" */}
              <linearGradient id="cometGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
                <stop offset="80%" stopColor="#22C55E" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="cometGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
                <stop offset="80%" stopColor="#22C55E" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            
            {/* Background Static Paths Left (Center to Left) */}
            {[100, 230, 370, 500].map((y, i) => (
              <path
                key={`left-bg-${i}`}
                d={`M 530 300 C 420 300, 420 ${y}, 312 ${y}`}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="2"
              />
            ))}

            {/* Background Static Paths Right (Center to Right) */}
            {[100, 230, 370, 500].map((y, i) => (
              <path
                key={`right-bg-${i}`}
                d={`M 670 300 C 780 300, 780 ${y}, 888 ${y}`}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="2"
              />
            ))}

            {/* Animated Foreground Paths Left (Flowing Center -> Left staggered) */}
            {[100, 230, 370, 500].map((y, i) => (
              <motion.path
                key={`left-fg-${i}`}
                d={`M 530 300 C 420 300, 420 ${y}, 312 ${y}`}
                fill="none"
                stroke="url(#cometGradLeft)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="150 650"
                initial={{ strokeDashoffset: 800 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "linear",
                  delay: (i === 1 || i === 2) ? 0 : 0.6
                }}
              />
            ))}
            
            {/* Animated Foreground Paths Right (Flowing Center -> Right staggered) */}
            {[100, 230, 370, 500].map((y, i) => (
              <motion.path
                key={`right-fg-${i}`}
                d={`M 670 300 C 780 300, 780 ${y}, 888 ${y}`}
                fill="none"
                stroke="url(#cometGradRight)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="150 650"
                initial={{ strokeDashoffset: 800 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "linear",
                  delay: (i === 1 || i === 2) ? 0 : 0.6
                }}
              />
            ))}
          </svg>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="absolute inset-0 w-full h-full z-10"
          >
            {/* Center Hub */}
            <motion.div 
              variants={itemVariants}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center"
            >
              <Link href="/opportunities" className="relative group cursor-pointer block">
                <div className="absolute inset-0 bg-primary blur-[50px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <Image 
                   src="/favicon.png" 
                   alt="Rent4YouSolutions Logo" 
                   width={140} 
                   height={140} 
                   className="object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:scale-110 group-hover:drop-shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-all duration-500 relative z-10" 
                   unoptimized
                />
              </Link>

              {/* Explore More Button aligned safely below */}
              <div className="absolute top-[150px]">
                <Link href="/opportunities" className="group relative inline-flex items-center justify-center text-[15px] font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                  Explore More
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </motion.div>

            {/* Left Nodes */}
            {LEFT_ITEMS.map((item, i) => {
              const yPct = [16.66, 38.33, 61.66, 83.33][i];
              return (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-slate-700 shadow-md group cursor-pointer transition-all duration-300"
                  style={{ left: '26%', top: `${yPct}%` }}
                >
                  <item.icon size={24} weight="duotone" className="text-primary relative z-10" />
                  
                  {/* Left Text Card */}
                  <div className="absolute right-[calc(100%+12px)] xl:right-[calc(100%+16px)] w-[220px] xl:w-[260px] text-right bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Right Nodes */}
            {RIGHT_ITEMS.map((item, i) => {
              const yPct = [16.66, 38.33, 61.66, 83.33][i];
              return (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-slate-700 shadow-md group cursor-pointer transition-all duration-300"
                  style={{ left: '74%', top: `${yPct}%` }}
                >
                  <item.icon size={24} weight="duotone" className="text-primary relative z-10" />
                  
                  {/* Right Text Card */}
                  <div className="absolute left-[calc(100%+12px)] xl:left-[calc(100%+16px)] w-[220px] xl:w-[260px] text-left bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}

          </motion.div>
        </div>

        {/* Mobile / Tablet Layout */}
        <div className="block lg:hidden relative z-10 mt-10 max-w-md mx-auto px-2 pb-16">
          
          {/* Mobile Mind-map Diagram */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-between py-4">
            
            {/* SVG Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 300 220" preserveAspectRatio="none">
              {/* Left to Center Lines */}
              {[20, 80, 140, 200].map((y, i) => (
                <path key={`m-left-${i}`} d={`M 30 ${y} C 80 ${y}, 100 110, 150 110`} fill="none" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
              ))}
              {/* Center to Right Lines */}
              {[20, 80, 140, 200].map((y, i) => (
                <path key={`m-right-${i}`} d={`M 150 110 C 200 110, 220 ${y}, 270 ${y}`} fill="none" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
              ))}
            </svg>

            {/* Left Icons */}
            <div className="flex flex-col justify-between h-full z-10 relative">
              {LEFT_ITEMS.map((item, i) => (
                <motion.div key={item.id} initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} transition={{delay: i*0.1}} className="w-10 h-10 rounded-full bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                  <item.icon size={18} className="text-primary" weight="duotone" />
                </motion.div>
              ))}
            </div>

            {/* Center Logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[88px] h-[88px] rounded-full bg-white dark:bg-[#0B1220] shadow-[0_0_30px_rgba(34,197,94,0.2)] border border-primary/20 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20"></div>
              <Image src="/favicon.png" alt="Logo" width={52} height={52} className="object-contain relative z-10" unoptimized />
            </motion.div>

            {/* Right Icons */}
            <div className="flex flex-col justify-between h-full z-10 relative">
              {RIGHT_ITEMS.map((item, i) => (
                <motion.div key={item.id} initial={{opacity:0, x:20}} whileInView={{opacity:1, x:0}} transition={{delay: i*0.1}} className="w-10 h-10 rounded-full bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm">
                  <item.icon size={18} className="text-primary" weight="duotone" />
                </motion.div>
              ))}
            </div>

          </div>

          {/* Benefits Vertical List */}
          <div className="mt-10 flex flex-col space-y-0 px-2">
            {[...LEFT_ITEMS, ...RIGHT_ITEMS].map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-4 py-4 ${i !== 7 ? 'border-b border-slate-200/60 dark:border-slate-800/60' : ''}`}
              >
                <div className="mt-0.5 shrink-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    whileInView={{ scale: 1 }} 
                    transition={{ delay: (i * 0.05) + 0.2, type: "spring" }}
                  >
                    <svg className="w-4 h-4 text-primary" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="16" height="16" rx="8" fill="currentColor" fillOpacity="0.1"/>
                      <path d="M11.3333 5.5L6.74996 10.0833L4.66663 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-[15px] font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>

      </div>
    </section>
  );
}
