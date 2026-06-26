"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { House, Buildings, Key, ArrowRight, HouseLine, City } from "@phosphor-icons/react/dist/ssr";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const STRATEGIES = [
  {
    id: "sa",
    title: "Serviced Accommodation",
    text: "Airbnb-ready opportunities in strong demand areas, pre-screened for suitability, compliance risks and realistic cashflow potential.",
    tags: ["Airbnb-ready", "Occupancy-led", "Compliance checks"],
    image: "/card1.jpg",
    icon: HouseLine,
  },
  {
    id: "council",
    title: "Council Leasing",
    text: "Properties suitable for council and housing association style leasing, focused on predictable income and lower day-to-day involvement.",
    tags: ["Council demand", "Long-term lease", "Reduced void risk"],
    image: "/card2.jpg",
    icon: City,
  },
  {
    id: "r2r",
    title: "Rent-to-Rent",
    text: "Rent-ready opportunities structured for investors and operators looking to build cashflow without buying property.",
    tags: ["Cashflow focused", "Operator friendly", "UK-wide sourcing"],
    image: "/card3.jpg",
    icon: Key,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
};

const fadeSlight = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const imageReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const boxSlide = {
  hidden: { x: 40 },
  visible: { x: 0, transition: { duration: 0.7, ease: "easeOut" as any } }
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as any, stiffness: 200, damping: 15 } }
};

export function CoreStrategies() {
  const { ref: headerRef, controls: headerControls } = useScrollAnimation(0.25);
  const { ref: gridRef, controls: gridControls } = useScrollAnimation(0.15);

  return (
    <section id="strategies" className="pt-8 pb-24 bg-surface relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          className="max-w-3xl mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Smarter Property <br className="md:hidden" /> <span className="text-primary">Sourcing</span>
          </motion.h2>
          <motion.p variants={fadeSlight} className="text-sm md:text-base text-muted-text max-w-2xl">
            Focused property sourcing for investors, operators and landlords building cashflow through practical UK property strategies.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={gridRef}
          initial="hidden"
          animate={gridControls}
          variants={containerStagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-12 pr-6 lg:pr-8"
        >
          {STRATEGIES.map((strategy) => (
            <motion.div 
              key={strategy.id}
              variants={containerStagger}
              className="group relative w-full h-[360px] md:h-[380px] xl:h-[400px] cursor-pointer"
            >
              {/* Image Container */}
              <motion.div variants={imageReveal} className="absolute top-0 left-0 w-[85%] lg:w-[88%] h-[85%] md:h-[88%] rounded-3xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                <Image 
                  src={strategy.image} 
                  alt={strategy.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  unoptimized
                />
              </motion.div>

              {/* Green Box */}
              <motion.div variants={boxSlide} className="absolute bottom-4 lg:bottom-6 right-0 w-[90%] md:w-[94%] bg-gradient-to-br from-primary to-accent text-white rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] p-5 lg:p-6 z-10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 border-t-[8px] border-l-[8px] border-surface">
                
                {/* Circular Icon */}
                <motion.div variants={iconPop} className="absolute -top-6 -right-4 md:-right-6 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center text-primary z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <strategy.icon size={24} weight="fill" className="md:w-[26px] md:h-[26px]" />
                </motion.div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-1 lg:mb-2 pr-4 leading-tight">{strategy.title}</h3>
                <p className="text-[13px] md:text-sm text-gray-300 leading-relaxed line-clamp-4">
                  {strategy.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
