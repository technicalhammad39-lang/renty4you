"use client";

import React, { useRef, useEffect } from "react";
import { useSearchContext } from "./search-context";

export function SearchScrollWrapper({ children }: { children: React.ReactNode }) {
  const { setIsCompact } = useSearchContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // We toggle to compact mode when the top of this container reaches near the navbar
      if (rect.top <= 80) {
        setIsCompact(true);
      } else {
        setIsCompact(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsCompact]);

  return (
    <div ref={ref} className="w-full">
      {children}
    </div>
  );
}
