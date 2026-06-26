"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Plus, X } from "@phosphor-icons/react/dist/ssr";

const FAQS = [
  {
    q: "Is this property definitely suitable for Airbnb or serviced accommodation?",
    a: "Rent4uSolutions only labels a property as SA-ready after basic checks on lease wording, likely lender stance and building rules. Final approval must be confirmed by your own solicitor and lender."
  },
  {
    q: "How realistic are the Airbnb income projections?",
    a: "Projections are deliberately conservative and based on sensible occupancy and nightly rate assumptions. They are illustrations, not guarantees, and should be stress-tested by the client."
  },
  {
    q: "What extra costs should I budget for when running this as serviced accommodation?",
    a: "Beyond rent or mortgage costs, allow for utilities, council tax or business rates, internet, cleaning, linen, toiletries, platform fees and management costs where applicable."
  },
  {
    q: "Does Rent4uSolutions manage the Airbnb for me?",
    a: "No. Rent4uSolutions focuses on sourcing and packaging deals. Where possible, it may point clients toward local cleaners, serviced accommodation managers or other useful partners."
  },
  {
    q: "How does council leasing work?",
    a: "Rent4uSolutions sources properties suitable for council or housing association leasing schemes. The legal agreement is between the client and the council or partner organisation."
  },
  {
    q: "What are the main benefits of leasing to the council?",
    a: "Many landlords like the predictable income, reduced void risk and more hands-off experience, although rent may sometimes be below open-market levels."
  },
  {
    q: "Who handles repairs and maintenance under a council lease?",
    a: "Responsibilities vary by scheme and agreement. Clients should review the specific lease terms carefully with their solicitor before signing."
  },
  {
    q: "Is the rent guaranteed and is it below market?",
    a: "Some schemes offer secure or guaranteed rent, often slightly below open-market rent in exchange for reduced risk and hassle."
  },
  {
    q: "Does Rent4uSolutions arrange the council lease for me?",
    a: "Rent4uSolutions does not draft or sign leases on the client’s behalf. Its role is to source suitable properties and highlight relevant schemes or contacts."
  },
  {
    q: "Can I switch a council-leased property to serviced accommodation later?",
    a: "Council leasing and serviced accommodation have very different requirements. Any change of use must be agreed with the lender, lease, council or other relevant parties."
  },
  {
    q: "Does Rent4uSolutions guarantee performance?",
    a: "No. All figures are estimates and should be independently verified by the client and professional advisers."
  }
];

const blurFade = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: "easeOut" as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.25 });
  const headerControls = useAnimation();

  const listRef = useRef(null);
  const listInView = useInView(listRef, { once: true, amount: 0.1 });
  const listControls = useAnimation();

  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerInView, headerControls]);

  useEffect(() => {
    if (listInView) {
      listControls.start("visible");
    }
  }, [listInView, listControls]);

  return (
    <section id="faq" className="py-16 md:py-24 bg-background relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={blurFade}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div 
          ref={listRef}
          initial="hidden"
          animate={listControls}
          variants={staggerContainer}
          className="space-y-4"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                variants={blurFade}
                key={index} 
                className={`border border-border-subtle rounded-2xl bg-surface transition-all duration-300 ${isOpen ? "shadow-md border-primary/40" : "hover:border-primary/20"}`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-base md:text-lg transition-colors pr-4 md:pr-8 ${isOpen ? "text-primary" : "text-foreground"}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-primary bg-primary text-white rotate-180" : "border-border-subtle bg-transparent text-muted-text"}`}>
                    {isOpen ? <X size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 pt-0 md:p-6 md:pt-0 text-sm md:text-base text-muted-text leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
