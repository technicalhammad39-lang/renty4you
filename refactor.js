const fs = require('fs');

let code = fs.readFileSync('components/search-bar.tsx', 'utf8');

// Replace local state with context
code = code.replace(
  /const \[searchLoc, setSearchLoc\] = useState\("all"\);\s*const \[searchStrategy, setSearchStrategy\] = useState\("all"\);\s*const \[searchCashflow, setSearchCashflow\] = useState\("0"\);/,
  `const { searchLoc, setSearchLoc, searchStrategy, setSearchStrategy, searchCashflow, setSearchCashflow, isCompact, showModal, setShowModal } = useSearchContext();`
);

// Remove local showModal state
code = code.replace(/const \[showModal, setShowModal\] = useState\(false\);\n?/, '');

// Add import
code = code.replace(
  /import { MapPin, HouseLine, CurrencyGbp, MagnifyingGlass, X } from "@phosphor-icons\/react\/dist\/ssr";/,
  `import { MapPin, HouseLine, CurrencyGbp, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";\nimport { useSearchContext } from "./search-context";`
);

// Change component signature
code = code.replace(
  /export function SearchBar\(\) \{/,
  `export function SearchBar({ variant = "full" }: { variant?: "full" | "compact" }) {`
);

// Add the compact / full rendering logic at the start of return
const returnRegex = /return \(\s*<div className="w-full relative">/;
const newReturn = `
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
         onClick={() => setShowModal(true)}
         transition={{ type: "spring", stiffness: 300, damping: 30 }}
       >
         <motion.div layoutId="search-icon">
           <MagnifyingGlass size={18} weight="bold" />
         </motion.div>
       </motion.div>
    );
  }

  return (
    <motion.div layoutId="search-container" layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className="w-full relative">`;

code = code.replace(returnRegex, newReturn);

// Also need to close the motion.div at the end instead of just div
code = code.replace(/<\/div>\s*$/m, '</motion.div>\n');

// Add layoutId to the search button inside the full variant
code = code.replace(
  /<button\s+onClick=\{handleSearch\}\s+className="w-full md:w-auto px-6 py-3\.5 rounded-full bg-gold/m,
  `<motion.button
            layoutId="search-button"
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-3.5 rounded-full bg-gold`
);
code = code.replace(
  /<span>Search Sourced Deals<\/span>\s*<\/button>/m,
  `<motion.span layoutId="search-text">Search Sourced Deals</motion.span>
          </motion.button>`
);

// Wrap MagnifyingGlass inside motion.div
code = code.replace(
  /<MagnifyingGlass size=\{18\} weight="bold" \/>/,
  `<motion.div layoutId="search-icon">
              <MagnifyingGlass size={18} weight="bold" />
            </motion.div>`
);

fs.writeFileSync('components/search-bar.tsx', code);
console.log('Done refactoring search-bar.tsx');
