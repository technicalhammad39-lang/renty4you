"use client";

import { motion } from "framer-motion";
import { EnvelopeSimple, MapPin, PaperPlaneRight, Phone } from "@phosphor-icons/react/dist/ssr";

const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative z-10 overflow-hidden">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={slideRight}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
              Let’s Discuss Your <span className="text-primary">Strategy</span>
            </h2>
            <p className="text-lg text-muted-text mb-12">
              Ready to join the investor list, request a sample deal pack or book a discovery call? Send a message and we’ll help you understand the next step.
            </p>

            <motion.div variants={staggerContainer} className="space-y-8 mb-12">
              <motion.div variants={itemReveal} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background border border-border-subtle flex items-center justify-center">
                  <EnvelopeSimple className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-text mb-1">Email</div>
                  <a href="mailto:teamrent4usolutions@gmail.com" className="font-semibold text-foreground hover:text-primary transition-colors">
                    teamrent4usolutions@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemReveal} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background border border-border-subtle flex items-center justify-center">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-text mb-1">Phone</div>
                  <div className="font-semibold text-foreground">
                    TBC / Coming Soon
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemReveal} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background border border-border-subtle flex items-center justify-center">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-text mb-1">Location</div>
                  <div className="font-semibold text-foreground">
                    United Kingdom
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemReveal} className="flex flex-row gap-2 md:gap-4 w-full">
               <button className="flex-1 px-2 md:px-6 py-3 rounded-xl md:rounded-full bg-[#25D366] text-white font-bold text-[13px] md:text-base shadow-md shadow-[#25D366]/20 hover:bg-[#20bd5a] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center text-center">
                 WhatsApp Group
               </button>
               <button className="flex-1 px-2 md:px-6 py-3 rounded-xl md:rounded-full bg-background border border-border-subtle text-foreground font-medium text-[13px] md:text-base hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-center">
                 Book Calendly
               </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={slideLeft}
            className="bg-background rounded-3xl p-8 md:p-10 border border-border-subtle/50 shadow-sm relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
             
             <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label htmlFor="contact-name" className="text-sm font-medium text-muted-text mb-2 block">Name</label>
                   <input required type="text" id="contact-name" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                 </div>
                 <div>
                   <label htmlFor="contact-phone" className="text-sm font-medium text-muted-text mb-2 block">Phone</label>
                   <input type="tel" id="contact-phone" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                 </div>
               </div>
               <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-muted-text mb-2 block">Email</label>
                  <input required type="email" id="contact-email" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
               </div>
               <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-muted-text mb-2 block">Message</label>
                  <textarea required id="contact-message" rows={4} className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"></textarea>
               </div>
               
               <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg group">
                  Send Message <PaperPlaneRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
             </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
