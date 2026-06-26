"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export function SEOPropertyGuide() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-background border-t border-border-subtle py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            The Ultimate Guide to UK Property Sourcing & Investment
          </h2>
          <p className="text-muted-text text-sm md:text-base leading-relaxed">
            Whether you're looking for high-yield Rent-to-Rent deals, Serviced Accommodation (Airbnb) opportunities, or hands-off Council Leasing investments, understanding the UK property sourcing market is critical to your success.
          </p>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-muted-text">
                <h3>What is a Property Sourcing Company?</h3>
                <p>
                  A property sourcing company (or deal sourcer) acts as the bridge between lucrative property investments and time-poor investors. By leveraging deep local market knowledge, strong estate agent relationships, and off-market direct-to-vendor marketing, property sourcing specialists in the UK secure high cashflow property deals that are rarely available to the general public.
                </p>

                <h3>Rent-to-Rent (R2R) Deals in the UK</h3>
                <p>
                  Rent-to-Rent is an incredibly popular property investment strategy in the UK that allows investors to generate high cashflow without the need for large mortgage deposits. In a rent-to-rent deal, the property sourcing agency secures a property from a landlord for a guaranteed monthly rent over a fixed term (usually 3 to 5 years). The investor then sub-lets the property, typically as a House in Multiple Occupation (HMO) or Serviced Accommodation (SA), generating a significant profit margin.
                </p>

                <h3>Serviced Accommodation (SA) Opportunities</h3>
                <p>
                  Serviced accommodation involves renting out fully furnished properties on a short-term basis, similar to a hotel, using platforms like Airbnb and Booking.com. The best property sourcing companies carefully analyze local tourism, corporate travel demand, and regulatory requirements to find serviced accommodation investment opportunities that yield significantly higher returns than standard single-let properties.
                </p>

                <h3>Council Leasing & Social Housing Deals</h3>
                <p>
                  For investors seeking a truly hands-off, passive income stream, council leasing opportunities offer a highly attractive alternative. In these arrangements, properties are leased directly to local authorities, housing associations, or government-backed care providers. Benefits include guaranteed rent, zero void periods, and frequently, internal maintenance coverage. A dedicated deal packaging UK specialist can secure these properties and facilitate the contracts.
                </p>

                <h3>Why Invest in UK Property Now?</h3>
                <p>
                  The UK property market consistently demonstrates resilience, driven by a structural undersupply of housing and strong rental demand across key cities like Liverpool, Manchester, Leeds, and Birmingham. From buy-to-let investment deals to advanced commercial conversions, having an expert property sourcing team on the ground ensures your capital is deployed into the highest-performing assets safely and compliantly.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors font-semibold text-sm"
          >
            {isExpanded ? "Read Less" : "Read the Full Guide"}
            <CaretDown
              size={16}
              weight="bold"
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
