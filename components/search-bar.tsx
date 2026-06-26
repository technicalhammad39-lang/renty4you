"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, HouseLine, CurrencyGbp, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useSearchContext } from "./search-context";
import { useRouter } from "next/navigation";

export function SearchBar({ variant = "full" }: { variant?: "full" | "compact" }) {
  const { searchLoc, setSearchLoc, searchStrategy, setSearchStrategy, searchCashflow, setSearchCashflow, isCompact } = useSearchContext();
  const router = useRouter();

  // Dropdown open states
  const [whereOpen, setWhereOpen] = useState(false);
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [cashflowOpen, setCashflowOpen] = useState(false);

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

    // Redirect to opportunities page with query parameters
    const params = new URLSearchParams();
    if (searchLoc !== "all") params.set("location", searchLoc);
    
    // Map internal strategy keys to the full strings used in the database
    let stratStr = "All";
    if (searchStrategy === "sa") stratStr = "Serviced Accommodation";
    if (searchStrategy === "council") stratStr = "Council Leasing";
    if (searchStrategy === "r2r") stratStr = "Rent-to-Rent";
    
    if (stratStr !== "All") params.set("strategy", stratStr);
    if (searchCashflow !== "0") params.set("budget", "100000"); // Mock budget mapping for now, ideally cashflow is mapped properly

    router.push(`/opportunities?${params.toString()}`);
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
    "400": "£400+/mo",
    "1000": "£1,000+/mo",
    "1500": "£1,500+/mo",
    "2000": "£2,000+/mo"
  };

  
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

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
         className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer shadow-md hover:bg-primary-hover transition-colors"
         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
         transition={{ type: "spring" as any, stiffness: 300, damping: 30 }}
       >
         <motion.div layoutId="search-icon" className="text-white">
            <MagnifyingGlass size={18} weight="bold" />
         </motion.div>
       </motion.div>
    );
  }

  return (
    <motion.div layoutId="search-container" layout transition={{ type: "spring" as any, stiffness: 300, damping: 30 }} className="w-full relative">
      
      {/* DESKTOP LAYOUT (Hidden on Mobile) */}
      <div className="hidden md:grid w-full bg-white border border-border-subtle rounded-full p-2 shadow-2xl grid-cols-4 md:overflow-visible divide-x divide-border-subtle/50 text-slate-900 items-center relative z-40">
        
        {/* WHERE FILTER */}
        <div 
          ref={whereRef} 
          onClick={() => {
            setWhereOpen(!whereOpen);
            setStrategyOpen(false);
            setCashflowOpen(false);
          }}
          className="shrink-0 w-auto flex items-center gap-8 px-6 py-4 cursor-pointer hover:bg-black/5 rounded-full transition-all relative text-left h-full"
        >
          <div className="text-primary">
            <MapPin size={22} weight="duotone" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block leading-none">Where</span>
            <span className={`text-sm font-bold mt-1 block truncate ${searchLoc === "all" ? "text-slate-400 font-semibold" : "text-slate-900"}`}>
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
                        ? "bg-primary/15 text-primary" 
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
          className="shrink-0 w-auto flex items-center gap-8 px-6 py-4 cursor-pointer hover:bg-black/5 rounded-full transition-all relative text-left h-full"
        >
          <div className="text-primary">
            <HouseLine size={22} weight="duotone" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block leading-none">Strategy</span>
            <span className={`text-sm font-bold mt-1 block truncate ${searchStrategy === "all" ? "text-slate-400 font-semibold" : "text-slate-900"}`}>
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
                className="absolute top-[calc(100%+0.5rem)] md:right-0 lg:left-0 lg:right-auto mt-1 w-72 bg-white border border-border-subtle rounded-3xl shadow-2xl p-3 z-50 text-left"
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
                        ? "bg-primary/15 text-primary" 
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
          className="shrink-0 w-auto flex items-center gap-8 px-6 py-4 cursor-pointer hover:bg-black/5 rounded-full transition-all relative text-left h-full"
        >
          <div className="text-primary">
            <CurrencyGbp size={22} weight="duotone" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block leading-none">Net Cashflow</span>
            <span className={`text-sm font-bold mt-1 block truncate ${searchCashflow === "0" ? "text-slate-400 font-semibold" : "text-slate-900"}`}>
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
                className="absolute top-[calc(100%+0.5rem)] md:right-0 mt-1 w-64 bg-white border border-border-subtle rounded-3xl shadow-2xl p-3 z-50 text-left"
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
                        ? "bg-primary/15 text-primary" 
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
        <div className="shrink-0 w-auto flex items-center justify-end px-3 py-1">
          <motion.button
            layoutId="search-button"
            onClick={handleSearch}
            className="w-full px-6 py-4 rounded-full bg-primary text-white font-bold text-[13px] md:text-sm flex items-center justify-center gap-2 hover:bg-primary-hover transition-all hover:shadow-[0_0_20px_rgba(212,160,23,0.5)] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MagnifyingGlass size={18} weight="bold" />
            <motion.span layoutId="search-text">Search Deals</motion.span>
          </motion.button>
        </div>
      </div>

      {/* MOBILE LAYOUT (Hidden on Desktop) */}
      <div className="flex md:hidden w-full bg-white border border-border-subtle rounded-full p-2 shadow-xl items-center justify-between z-40 relative">
        <button 
          onClick={() => setMobileModalOpen(true)}
          className="w-12 h-12 flex shrink-0 items-center justify-center rounded-full bg-black/5 text-primary hover:bg-black/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M200,136a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,136Zm32-56H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Zm-80,96H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"></path></svg>
        </button>
        <div 
          className="flex-1 px-4 text-left min-w-0 cursor-text"
          onClick={() => setMobileModalOpen(true)}
        >
          <span className="text-sm font-bold block truncate text-slate-900">Search Deals...</span>
          <span className="text-[10px] text-slate-500 block truncate">
            {searchLoc !== "all" ? locLabels[searchLoc] : "Anywhere"} • {searchStrategy !== "all" ? stratLabels[searchStrategy] : "Any Strategy"}
          </span>
        </div>
        <button
          onClick={handleSearch}
          className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-hover transition-colors shadow-md"
        >
          <MagnifyingGlass size={20} weight="bold" />
        </button>
      </div>

      {/* MOBILE FILTER MODAL */}
      <AnimatePresence>
        {mobileModalOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring" as any, damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border-subtle bg-white">
              <h2 className="text-lg font-bold">Filters</h2>
              <button 
                onClick={() => setMobileModalOpen(false)} 
                className="w-10 h-10 flex items-center justify-center bg-black/5 hover:bg-black/10 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-8 pb-24">
              
              {/* Where */}
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Where</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(locLabels).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSearchLoc(key)}
                      className={`text-left px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 border transition-all ${
                        searchLoc === key 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "border-border-subtle text-slate-700 bg-surface hover:bg-black/5"
                      }`}
                    >
                      <span>{locLabels[key]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Strategy */}
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Strategy</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { key: "all", desc: "View all properties" },
                    { key: "sa", desc: "Serviced accommodation/Airbnb" },
                    { key: "council", desc: "Housing scheme government rents" },
                    { key: "r2r", desc: "Rent-to-rent operator cashflow" }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setSearchStrategy(item.key)}
                      className={`text-left px-4 py-3 rounded-2xl text-sm transition-all flex flex-col gap-0.5 border ${
                        searchStrategy === item.key 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "border-border-subtle text-slate-700 bg-surface hover:bg-black/5"
                      }`}
                    >
                      <span className="font-bold">{stratLabels[item.key]}</span>
                      <span className={`text-[11px] ${searchStrategy === item.key ? "text-primary/80" : "text-slate-500"}`}>{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cashflow */}
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Net Cashflow</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(cashflowLabels).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSearchCashflow(key)}
                      className={`text-left px-4 py-3 rounded-2xl text-sm font-semibold border transition-all ${
                        searchCashflow === key 
                          ? "bg-primary/10 border-primary text-primary" 
                          : "border-border-subtle text-slate-700 bg-surface hover:bg-black/5"
                      }`}
                    >
                      <span>{cashflowLabels[key]}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Footer */}
            <div className="p-4 bg-white border-t border-border-subtle absolute bottom-0 left-0 right-0">
              <button 
                onClick={() => {
                  setMobileModalOpen(false);
                  handleSearch();
                }} 
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <MagnifyingGlass size={18} weight="bold" />
                Show Opportunities
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
