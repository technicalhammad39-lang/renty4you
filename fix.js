const fs = require('fs');

let nav = fs.readFileSync('components/navbar.tsx', 'utf8');

nav = nav.replace(/bg-white\/90 dark:bg-slate-900\/80/g, 'bg-white/90');
nav = nav.replace(/border-white\/20 dark:border-white\/10/g, 'border-white/20');
nav = nav.replace(/bg-white\/75 dark:bg-slate-900\/60/g, 'bg-white/75');
nav = nav.replace(/border-white\/15 dark:border-white\/5/g, 'border-white/15');

nav = nav.replace(/src=\{mounted && theme === "dark" \? "\/Rent4you-dark-mode\.png" : "\/Rent4you-light-mode\.png"\}/g, 'src="/Rent4you-light-mode.png"');

nav = nav.replace(/text-foreground/g, 'text-slate-900');
nav = nav.replace(/text-muted-text/g, 'text-slate-500');
nav = nav.replace(/bg-background/g, 'bg-white');
nav = nav.replace(/dark:bg-slate-900\/95/g, '');
nav = nav.replace(/dark:border-white\/10/g, '');
nav = nav.replace(/dark:bg-white\/5/g, '');

fs.writeFileSync('components/navbar.tsx', nav);

let search = fs.readFileSync('components/search-bar.tsx', 'utf8');
search = search.replace(/bg-white dark:bg-slate-900/g, 'bg-white');
search = search.replace(/text-foreground/g, 'text-slate-900');
search = search.replace(/text-muted-text/g, 'text-slate-500');
search = search.replace(/hover:bg-black\/5 dark:hover:bg-white\/5/g, 'hover:bg-black/5');
search = search.replace(/bg-surface/g, 'bg-white');
search = search.replace(/bg-background/g, 'bg-white');

fs.writeFileSync('components/search-bar.tsx', search);
