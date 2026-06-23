"use client";

import { EnvelopeSimple, MapPin, PaperPlaneRight, Phone } from "@phosphor-icons/react/dist/ssr";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-background relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Let’s Discuss Your Strategy
            </h2>
            <p className="text-lg text-muted-text mb-12">
              Ready to join the investor list, request a sample deal pack or book a discovery call? Send a message and we’ll help you understand the next step.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background border border-border-subtle flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                  <EnvelopeSimple className="text-gold" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-text mb-1">Email</div>
                  <a href="mailto:teamrent4usolutions@gmail.com" className="font-semibold text-foreground hover:text-gold transition-colors">
                    teamrent4usolutions@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background border border-border-subtle flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-text mb-1">Phone</div>
                  <div className="font-semibold text-foreground">
                    TBC / Coming Soon
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background border border-border-subtle flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-text mb-1">Location</div>
                  <div className="font-semibold text-foreground">
                    United Kingdom
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
               <button className="px-6 py-3 rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/50 font-medium hover:bg-[#25D366] hover:text-white transition-colors dark:text-[#25D366]">
                 Join WhatsApp Group
               </button>
               <button className="px-6 py-3 rounded-full bg-background border border-border-subtle text-foreground font-medium hover:border-gold hover:text-gold transition-colors">
                 Book Calendly Call
               </button>
            </div>
          </div>

          <div className="bg-background rounded-3xl p-8 md:p-10 border border-border-subtle/50 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
             
             <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label htmlFor="contact-name" className="text-sm font-medium text-muted-text mb-2 block">Name</label>
                   <input required type="text" id="contact-name" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" />
                 </div>
                 <div>
                   <label htmlFor="contact-phone" className="text-sm font-medium text-muted-text mb-2 block">Phone</label>
                   <input type="tel" id="contact-phone" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" />
                 </div>
               </div>
               <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-muted-text mb-2 block">Email</label>
                  <input required type="email" id="contact-email" className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" />
               </div>
               <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-muted-text mb-2 block">Message</label>
                  <textarea required id="contact-message" rows={4} className="w-full bg-surface border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"></textarea>
               </div>
               
               <button type="submit" className="w-full py-4 bg-gold hover:bg-gold/90 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 hover:shadow-lg group">
                  Send Message <PaperPlaneRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
}
