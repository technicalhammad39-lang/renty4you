"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-surface py-12 border-t border-border-subtle relative z-10">
      <div className="w-full px-4 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-4 pr-0 md:pr-8">
            <Link href="#" className="flex items-center gap-1 mb-6 group">
              <Image
                src="/Rent4you-light-mode.png"
                alt="Rent4uSolutions"
                width={160}
                height={40}
                className="h-8 md:h-10 w-auto object-contain dark:hidden transition-transform duration-300 group-hover:scale-105"
              />
              <Image
                src="/Rent4you-dark-mode.png"
                alt="Rent4uSolutions"
                width={160}
                height={40}
                className="h-8 md:h-10 w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-muted-text leading-relaxed mb-8">
              We source compliant, cashflow-focused property opportunities for investors, Airbnb operators and council leasing strategies across the UK.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Image src="/PRS.png" alt="PRS Member" width={100} height={40} className="object-contain h-10 w-auto" />
              <Image src="/ico.png" alt="ICO Registered" width={100} height={40} className="object-contain h-10 w-auto" />
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Strategies", "Deal Packs", "Process", "Pricing", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={`#${link === "Home" ? "" : link.toLowerCase().replace(" ", "-")}`} className="text-muted-text hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-muted-text hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-text hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <a href="mailto:teamrent4usolutions@gmail.com" className="text-muted-text hover:text-primary transition-colors break-all block mb-12">
              teamrent4usolutions@gmail.com
            </a>

            {/* Prominent Developer Credit */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 block w-full max-w-[280px] group hover:border-primary/40 transition-colors">
              <div className="text-xs text-muted-text mb-3 font-medium uppercase tracking-wider">Developed By</div>
              <a href="https://hammadtools.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group-hover:opacity-90 transition-opacity">
                <div className="flex items-center gap-3">
                  <Image src="/hammadlogo.png" alt="Hammad Tools" width={32} height={32} className="object-contain h-8 w-8 rounded-full" />
                  <span className="text-xl font-bold text-primary group-hover:text-[#20bd5a] transition-colors">Hammad Tools</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-primary">
                  <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-text mt-4 md:mt-0 text-center md:text-left max-w-3xl">
            Disclaimer: Rent4uSolutions does not provide legal, tax, mortgage or financial advice. All investment figures are estimates and should be independently verified by your own professional advisers before entering into any legal agreements.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-sm font-medium text-muted-text whitespace-nowrap">
              © 2026 Rent4uSolutions.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
