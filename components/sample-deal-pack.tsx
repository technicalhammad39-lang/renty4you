"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DownloadSimple, FileText, CheckCircle } from "@phosphor-icons/react/dist/ssr";

const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as any } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as any } }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as any, stiffness: 150, damping: 15, delay: 0.2 } }
};

export function SampleDealPack() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24 bg-surface relative z-10 border-y border-border-subtle overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={slideRight}
            className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative w-[90%] md:w-[80%] h-[90%] bg-background rounded-2xl border border-border-subtle shadow-2xl p-4 md:p-6 flex flex-col transform md:rotate-[-2deg] hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <div className="w-full flex justify-between items-center mb-4 md:mb-6">
                <div className="font-bold text-base md:text-lg">Opportunity Report</div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="text-primary" />
                </div>
              </div>
              <div className="h-32 md:h-40 w-full mb-4 md:mb-6 relative rounded-xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1600607687959-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" alt="Property mock" fill className="object-cover" unoptimized />
              </div>
              <div className="w-3/4 h-3 md:h-4 bg-muted-text/20 rounded-full mb-3 md:mb-4"></div>
              <div className="w-1/2 h-3 md:h-4 bg-muted-text/20 rounded-full mb-6 md:mb-8"></div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 flex-grow">
                 <div className="rounded-lg bg-surface border border-border-subtle p-2 md:p-3 flex flex-col justify-end">
                    <div className="text-[10px] md:text-xs text-muted-text">Gross</div>
                    <div className="font-bold text-sm md:text-base">£3,200</div>
                 </div>
                 <div className="rounded-lg bg-surface border border-border-subtle p-2 md:p-3 flex flex-col justify-end">
                    <div className="text-[10px] md:text-xs text-muted-text">Net ROI</div>
                    <div className="font-bold text-primary text-sm md:text-base">High</div>
                 </div>
              </div>
            </div>

            <motion.div variants={popIn} className="absolute right-2 md:-right-6 top-1/4 bg-background p-3 md:p-4 rounded-xl border border-border-subtle shadow-xl flex items-center gap-2 md:gap-3 transform rotate-[5deg] z-10 scale-90 md:scale-100">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle weight="fill" className="text-green-500 text-lg md:text-xl" />
              </div>
              <div>
                <div className="text-[10px] md:text-xs text-muted-text uppercase font-semibold">Strict Standard</div>
                <div className="font-bold text-xs md:text-sm">Compliance Passed</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={slideLeft}
            className="max-w-md w-full mx-auto lg:mx-0 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Download A <span className="text-primary">Sample Deal Pack</span>
            </h2>
            <p className="text-lg text-muted-text mb-8">
              See how a Rent4uSolutions opportunity is packaged before joining the investor list.
            </p>

            {submitted ? (
              <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl flex flex-col items-center text-center">
                <CheckCircle className="text-primary text-5xl mb-4" weight="fill" />
                <h3 className="text-xl font-bold mb-2">Check Your Email</h3>
                <p className="text-muted-text">We&apos;ve just sent the sample deal pack to your inbox.</p>
              </div>
            ) : (
              <form 
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4 bg-background p-8 rounded-[32px] border border-border-subtle shadow-sm text-left"
              >
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input id="name" required type="text" placeholder="Full Name" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input id="email" required type="email" placeholder="Email Address" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input id="phone" type="tel" placeholder="Phone Number (Optional)" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="strategy" className="sr-only">Investment Strategy</label>
                  <select defaultValue="" id="strategy" required className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none text-foreground">
                    <option value="" disabled>Investment Strategy</option>
                    <option value="sa">Serviced Accommodation</option>
                    <option value="council">Council Leasing</option>
                    <option value="r2r">Rent-to-Rent</option>
                    <option value="unsure">Not Sure Yet</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg">
                  <DownloadSimple size={20} weight="bold" /> Get Sample Deal Pack
                </button>
                <p className="text-xs text-muted-text text-center mt-4">
                  Your details are used only to send the sample pack and follow up on your sourcing enquiry.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
