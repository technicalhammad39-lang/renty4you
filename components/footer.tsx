"use client";

import Link from "next/link";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-surface py-12 border-t border-border-subtle relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5 pr-0 md:pr-12">
            <Link href="#" className="flex items-center gap-1 mb-6">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Rent<span className="text-gold">4u</span>Solutions
              </span>
            </Link>
            <p className="text-muted-text leading-relaxed mb-8">
              We source compliant, cashflow-focused property opportunities for investors, Airbnb operators and council leasing strategies across the UK.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface text-sm font-medium text-muted-text">
                <ShieldCheck className="text-gold" size={18} />
                PRS In Process
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface text-sm font-medium text-muted-text">
                <ShieldCheck className="text-gold" size={18} />
                ICO In Process
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Strategies", "Deal Packs", "Process", "Pricing", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`#${link === "Home" ? "" : link.toLowerCase().replace(" ", "-")}`} className="text-muted-text hover:text-gold transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <a href="mailto:teamrent4usolutions@gmail.com" className="text-muted-text hover:text-gold transition-colors break-all">
              teamrent4usolutions@gmail.com
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-text mt-4 md:mt-0 text-center md:text-left max-w-3xl">
            Disclaimer: Rent4uSolutions does not provide legal, tax, mortgage or financial advice. All investment figures are estimates and should be independently verified by your own professional advisers before entering into any legal agreements.
          </p>
          <div className="text-sm font-medium text-muted-text whitespace-nowrap">
            © 2026 Rent4uSolutions.
          </div>
        </div>
      </div>
    </footer>
  );
}
