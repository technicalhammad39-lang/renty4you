"use client";

import { motion } from "framer-motion";

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
};

const stepContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } }
};

const connectorDraw = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "easeInOut" as any } }
};

const circlePop = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
};

export function ProcessWorkflow() {
  return (
    <section id="process" className="py-24 bg-surface relative z-10 overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            From Brief To <span className="text-primary">Packaged Opportunity</span>
          </h2>
          <p className="text-lg text-muted-text">
            A clear sourcing journey from first enquiry to completion support.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Static Background Line */}
          <div className="absolute left-[28px] md:left-1/2 top-[60px] bottom-[60px] w-[2px] bg-border-subtle -translate-x-1/2 z-0" />

          <div className="flex flex-col gap-12 lg:gap-16">
            {STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                  variants={stepContainer}
                  className={`relative flex items-center md:justify-between ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Circle Wrapper */}
                  <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-14 h-14 bg-surface rounded-full flex items-center justify-center z-10 border border-border-subtle shadow-sm">
                    <motion.div variants={circlePop} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </motion.div>
                  </div>

                  {/* Horizontal Connector Line for Desktop */}
                  <motion.div 
                    variants={connectorDraw}
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] bg-primary z-0 ${isEven ? "left-[calc(50%+28px)] origin-left" : "right-[calc(50%+28px)] origin-right"}`}
                    style={{ width: "calc(8% - 28px)" }}
                  />
                  {/* Horizontal Connector Line for Mobile */}
                  <motion.div 
                    variants={connectorDraw}
                    className="md:hidden absolute top-1/2 -translate-y-1/2 left-[56px] w-[15%] h-[2px] bg-primary z-0 origin-left"
                  />

                  {/* Card Content */}
                  <motion.div variants={itemReveal} className="w-full md:w-[42%] pl-24 md:pl-0">
                    <div className="bg-white dark:bg-slate-900 border border-border-subtle rounded-[2rem] p-6 lg:p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <motion.div variants={itemReveal} className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Step {index + 1}</motion.div>
                      <motion.h3 variants={itemReveal} className="text-xl md:text-2xl font-bold text-foreground mb-3">{step.title}</motion.h3>
                      <motion.p variants={itemReveal} className="text-sm md:text-base text-muted-text leading-relaxed">
                        {step.desc}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  {/* Spacer for Flex Alignment on Desktop */}
                  <div className="hidden md:block md:w-[42%]"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
