"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, HouseLine, CurrencyGbp, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { useSearchContext } from "./search-context";

interface Deal {
  id: string;
  name: string;
  loc: string;
  strategy: string;
  cashflow: number;
  gross: number;
  yield: string;
}

const MOCK_DEALS: Deal[] = [
  { id: "deal-1", name: "Premium Liverpool Studio", loc: "Liverpool", strategy: "sa", cashflow: 1050, gross: 3200, yield: "High" },
  { id: "deal-2", name: "Manchester Central Apt", loc: "Manchester", strategy: "sa", cashflow: 1200, gross: 3600, yield: "Exceptional" },
  { id: "deal-3", name: "London Executive Suite", loc: "London", strategy: "r2r", cashflow: 1600, gross: 4500, yield: "Strong" },
  { id: "deal-4", name: "Birmingham 3-Bed Sourcing", loc: "Birmingham", strategy: "council", cashflow: 1000, gross: 2200, yield: "Stable" },
  { id: "deal-5", name: "Leeds Student HMO", loc: "Leeds", strategy: "council", cashflow: 1100, gross: 2400, yield: "Secure" },
  { id: "deal-6", name: "Liverpool Serviced Studio", loc: "Liverpool", strategy: "sa", cashflow: 1250, gross: 3400, yield: "High" },
  { id: "deal-7", name: "Manchester Shared Living", loc: "Manchester", strategy: "r2r", cashflow: 1300, gross: 3100, yield: "High" }
];

export function SearchBar({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { searchLoc, setSearchLoc, searchStrategy, setSearchStrategy, searchCashflow, setSearchCashflow, isCompact, showModal, setShowModal } = useSearchContext();

  // Dropdown open states
  const [whereOpen, setWhereOpen] = useState(false);
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [cashflowOpen, setCashflowOpen] = useState(false);

  // Modal open states
    const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);

  // Refs for click outside detection
  const whereRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const cashflowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (whereRef.current && !whereRef.current.contains(target)) {
        setWhereOpen(false);
      }
      if (strategyRef.current && !strategyRef.current.contains(target)) {
        setStrategyOpen(false);
      }
      if (cashflowRef.current && !cashflowRef.current.contains(target)) {
        setCashflowOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    // Close all panels
    setWhereOpen(false);
    setStrategyOpen(false);
    setCashflowOpen(false);

    const filtered = MOCK_DEALS.filter(deal => {
      const matchLoc = searchLoc === "all" || deal.loc.toLowerCase() === searchLoc.toLowerCase();
      const matchStrat = searchStrategy === "all" || deal.strategy.toLowerCase() === searchStrategy.toLowerCase();
      const matchCF = deal.cashflow >= parseInt(searchCashflow);
      return matchLoc && matchStrat && matchCF;
    });
    setFilteredDeals(filtered);
    setShowModal(true);
  };

  const handleGetDealPack = (strategy: string) => {
    setShowModal(false);
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // Pre-fill strategy field in forms
    setTimeout(() => {
      const strategySelect = document.getElementById("strategy") as HTMLSelectElement;
      if (strategySelect) {
        strategySelect.value = strategy;
        strategySelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }, 800);
  };

  const locLabels: Record<string, string> = {
    all: "All UK Regions",
    London: "London",
    Manchester: "Manchester",
    Liverpool: "Liverpool",
    Birmingham: "Birmingham",
    Leeds: "Leeds"
  };

  const stratLabels: Record<string, string> = {
    all: "All Strategies",
    sa: "Serviced Accommodation",
    council: "Council Leasing",
    r2r: "Rent-to-Rent"
  };

  const cashflowLabels: Record<string, string> = {
    "0": "Any Cashflow",
    "1000": "£1,000+/mo",
    "1500": "£1,500+/mo",
    "2000": "£2,000+/mo"
  };

  
  // If this instance is meant to be the full one, but we are in compact mode, render a placeholder
  if (variant === "full" && isCompact) {
    return <div className="w-full h-[76px] invisible pointer-events-none" />;
  }

  // If this instance is meant to be compact, but we are in full mode, render nothing
  if (variant === "compact" && !isCompact) {
    return null;
  }

  if (variant === "compact") {
    return (
       <motion.div
         layoutId="search-container"
         layout
         className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white cursor-pointer shadow-md hover:bg-gold/90 transition-colors"
         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
         transition={{ type: "spring", stiffness: 300, damping: 30 }}
       >
         <motion.div layoutId="search-icon" className="text-white">
            <MagnifyingGlass size={18} weight="bold" />
         </motion.div>
       </motion.div>
    );
  }

  return (
    <motion.div layoutId="search-container" layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className="w-full relative">
      {/* Airbnb style Search Panel */}
      <div className="w-full bg-white border border-border-subtle rounded-3xl md:rounded-full p-2 shadow-xl md:shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-border-subtle/50 text-slate-900 items-center relative z-40">
        
        {/* WHERE FILTER */}
        <div 
          ref={whereRef} 
          onClick={() => {
            setWhereOpen(!whereOpen);
            setStrategyOpen(false);
            setCashflowOpen(false);
          }}
          className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-black/5 rounded-3xl md:rounded-full transition-all relative text-left h-full"
        >
          <div className="text-gold">
            <MapPin size={22} weight="duotone" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold block leading-none">Where</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block truncate">
              {locLabels[searchLoc]}
            </span>
          </div>

          <AnimatePresence>
            {whereOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[calc(100%+0.5rem)] left-0 mt-1 w-64 bg-white border border-border-subtle rounded-3xl shadow-2xl p-3 z-50 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xs font-bold text-slate-500 px-3 py-2 border-b border-border-subtle/50 mb-1">
                  Popular Regions
                </div>
                {Object.keys(locLabels).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSearchLoc(key);
                      setWhereOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                      searchLoc === key 
                        ? "bg-gold/15 text-gold" 
                        : "hover:bg-black/5 text-slate-900/80"
                    }`}
                  >
                    <MapPin size={16} />
                    <span>{locLabels[key]}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STRATEGY FILTER */}
        <div 
          ref={strategyRef}
          onClick={() => {
            setStrategyOpen(!strategyOpen);
            setWhereOpen(false);
            setCashflowOpen(false);
          }}
          className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-black/5 rounded-3xl md:rounded-full transition-all relative text-left h-full"
        >
          <div className="text-gold">
            <HouseLine size={22} weight="duotone" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold block leading-none">Strategy</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block truncate">
              {stratLabels[searchStrategy]}
            </span>
          </div>

          <AnimatePresence>
            {strategyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[calc(100%+0.5rem)] left-0 md:left-auto md:right-0 lg:left-0 lg:right-auto mt-1 w-72 bg-white border border-border-subtle rounded-3xl shadow-2xl p-3 z-50 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xs font-bold text-slate-500 px-3 py-2 border-b border-border-subtle/50 mb-1">
                  UK Property Models
                </div>
                {[
                  { key: "all", desc: "View all properties" },
                  { key: "sa", desc: "Serviced accommodation/Airbnb" },
                  { key: "council", desc: "Housing scheme government rents" },
                  { key: "r2r", desc: "Rent-to-rent operator cashflow" }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setSearchStrategy(item.key);
                      setStrategyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex flex-col gap-0.5 ${
                      searchStrategy === item.key 
                        ? "bg-gold/15 text-gold" 
                        : "hover:bg-black/5 text-slate-900"
                    }`}
                  >
                    <span className="text-sm font-bold">{stratLabels[item.key]}</span>
                    <span className="text-[10px] text-slate-500 leading-tight">{item.desc}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CASHFLOW FILTER */}
        <div 
          ref={cashflowRef}
          onClick={() => {
            setCashflowOpen(!cashflowOpen);
            setWhereOpen(false);
            setStrategyOpen(false);
          }}
          className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-black/5 rounded-3xl md:rounded-full transition-all relative text-left h-full"
        >
          <div className="text-gold">
            <CurrencyGbp size={22} weight="duotone" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold block leading-none">Net Cashflow</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block truncate">
              {cashflowLabels[searchCashflow]}
            </span>
          </div>

          <AnimatePresence>
            {cashflowOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-[calc(100%+0.5rem)] left-0 md:left-auto md:right-0 mt-1 w-64 bg-white border border-border-subtle rounded-3xl shadow-2xl p-3 z-50 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xs font-bold text-slate-500 px-3 py-2 border-b border-border-subtle/50 mb-1">
                  Monthly Net Targets
                </div>
                {Object.keys(cashflowLabels).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSearchCashflow(key);
                      setCashflowOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                      searchCashflow === key 
                        ? "bg-gold/15 text-gold" 
                        : "hover:bg-black/5 text-slate-900/80"
                    }`}
                  >
                    <CurrencyGbp size={16} />
                    <span>{cashflowLabels[key]}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SEARCH BUTTON */}
        <div className="flex items-center justify-center md:justify-end px-3 py-1">
          <motion.button
            layoutId="search-button"
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-4 rounded-full bg-gold text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold/90 transition-all hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] active:scale-95 cursor-pointer"
          >
            <MagnifyingGlass size={18} weight="bold" />
            <motion.span layoutId="search-text">Search Sourced Deals</motion.span>
          </motion.button>
        </div>

      </div>

      {/* Matching Search Results Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white border border-border-subtle rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl overflow-hidden relative text-slate-900"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-slate-500 hover:text-gold hover:border-gold transition-colors"
                aria-label="Close modal"
              >
                <X size={14} weight="bold" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                  Available Sourced Opportunities
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Matches for: <span className="font-semibold text-gold">{locLabels[searchLoc]}</span> • Strategy: <span className="font-semibold text-gold">{stratLabels[searchStrategy]}</span> • Min Cashflow: <span className="font-semibold text-gold">{cashflowLabels[searchCashflow]}</span>
                </p>
              </div>

              <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4">
                {filteredDeals.length > 0 ? (
                  filteredDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-5 rounded-2xl bg-white border border-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gold/30 hover:shadow-md transition-all text-left"
                    >
                      <div>
                        <h4 className="font-bold text-lg text-slate-900">{deal.name}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5">
                          <span>Region: <strong className="text-slate-900">{deal.loc}</strong></span>
                          <span>Strategy: <strong className="text-slate-900">{stratLabels[deal.strategy]}</strong></span>
                          <span>Yield/ROI: <strong className="text-gold">{deal.yield}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 justify-between w-full md:w-auto border-t md:border-t-0 border-border-subtle/50 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                          <span className="text-xs text-slate-500 block">Est. Net Cashflow</span>
                          <strong className="text-lg text-gold font-mono">£{deal.cashflow}/m</strong>
                        </div>
                        <button
                          onClick={() => handleGetDealPack(deal.strategy)}
                          className="px-4 py-2 rounded-full bg-gold text-white text-xs font-bold shadow hover:bg-gold/90 transition-all cursor-pointer"
                        >
                          Get Deal Pack
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-500/50 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="font-bold text-lg text-slate-900">No direct live matches found</h4>
                    <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
                      However, we source off-market opportunities daily. Send us a message and we'll check our pipeline for deals matching your brief.
                    </p>
                    <button
                      onClick={() => handleGetDealPack(searchStrategy !== "all" ? searchStrategy : "sa")}
                      className="mt-4 px-6 py-2.5 rounded-full bg-gold text-white text-sm font-bold shadow hover:bg-gold/90 transition-all cursor-pointer"
                    >
                      Submit Your Sourcing Brief
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-border-subtle mt-6 pt-4 text-center">
                <p className="text-xs text-slate-500">
                  Note: All projected metrics are conservative estimates subject to full client due diligence.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
