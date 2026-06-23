"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchLoc: string;
  setSearchLoc: (val: string) => void;
  searchStrategy: string;
  setSearchStrategy: (val: string) => void;
  searchCashflow: string;
  setSearchCashflow: (val: string) => void;
  isCompact: boolean;
  setIsCompact: (val: boolean) => void;
  showModal: boolean;
  setShowModal: (val: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchLoc, setSearchLoc] = useState("all");
  const [searchStrategy, setSearchStrategy] = useState("all");
  const [searchCashflow, setSearchCashflow] = useState("0");
  const [isCompact, setIsCompact] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchLoc,
        setSearchLoc,
        searchStrategy,
        setSearchStrategy,
        searchCashflow,
        setSearchCashflow,
        isCompact,
        setIsCompact,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
