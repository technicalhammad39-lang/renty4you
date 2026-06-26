"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-surface relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-4 md:px-8 xl:px-12 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Simple, Transparent <span className="text-primary">Sourcing Fees</span>
          </h2>
          <p className="text-lg text-muted-text">
            A clear two-stage fee structure with no subscription model.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Reservation Fee */}
          <motion.div variants={fadeInUp} className="relative p-8 rounded-[2rem] bg-surface/50 backdrop-blur-sm border border-border-subtle shadow-sm flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Reservation Fee</h3>
              <div className="text-6xl font-bold mb-4 text-foreground font-mono tracking-tighter">£500</div>
              <p className="text-sm text-muted-text">Deducted from the final sourcing fee.</p>
            </div>
          </motion.div>

          {/* Completion Fee */}
          <motion.div variants={fadeInUp} className="relative p-8 rounded-[2rem] bg-surface/50 backdrop-blur-sm border border-border-subtle shadow-sm flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Completion Fee</h3>
              <div className="text-6xl font-bold mb-4 text-foreground font-mono tracking-tighter">£3,000</div>
              <p className="text-sm text-muted-text">Payable on successful completion.</p>
            </div>
          </motion.div>

          {/* Total Fee - Highlighted */}
          <motion.div variants={fadeInUp} className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-primary-hover shadow-[0_20px_40px_rgba(34,197,94,0.3)] flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 text-white">
            <div className="absolute top-0 right-0 px-4 py-2 bg-gradient-to-l from-green-100 to-white text-primary text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl shadow-md">
              Payable In Two Stages
            </div>
            <h3 className="text-xl font-semibold mb-2 mt-4 text-white">Total Sourcing Fee</h3>
            <div className="text-6xl border-b border-white/20 pb-6 font-bold mb-6 text-white font-mono tracking-tighter w-full drop-shadow-sm">£3,500</div>
            <ul className="text-left w-full space-y-4">
              <li className="flex items-center gap-3 text-sm font-medium text-white"><CheckCircle size={20} weight="fill" className="text-white drop-shadow-sm" /> £500 reservation</li>
              <li className="flex items-center gap-3 text-sm font-medium text-white"><CheckCircle size={20} weight="fill" className="text-white drop-shadow-sm" /> £3,000 completion</li>
            </ul>
          </motion.div>

        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto mt-12 space-y-4 text-center"
        >
          <p className="text-sm text-muted-text px-4">
            The reservation fee is non-refundable once a deal is reserved, except in specific circumstances set out in the client agreement.
          </p>
          <p className="text-xs text-muted-text/70 px-4">
            Disclaimer: All figures and projected returns are estimates only. Clients must complete their own financial, legal and professional due diligence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
