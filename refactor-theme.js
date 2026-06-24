const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));

const replacements = [
  { pattern: /bg-gold hover:bg-yellow-500/g, replacement: 'bg-primary hover:bg-primary-hover' },
  { pattern: /hover:bg-gold\/90/g, replacement: 'hover:bg-primary-hover' },
  { pattern: /bg-gold\/10/g, replacement: 'bg-primary/10' },
  { pattern: /hover:bg-gold\/10/g, replacement: 'hover:bg-primary/10' },
  { pattern: /hover:text-gold/g, replacement: 'hover:text-primary' },
  { pattern: /text-gold/g, replacement: 'text-primary' },
  { pattern: /border-gold/g, replacement: 'border-primary' },
  { pattern: /focus:border-gold/g, replacement: 'focus:border-primary' },
  { pattern: /focus:ring-gold/g, replacement: 'focus:ring-primary' },
  { pattern: /from-gold/g, replacement: 'from-primary' },
  { pattern: /via-gold/g, replacement: 'via-accent' },
  { pattern: /to-gold/g, replacement: 'to-primary-hover' },
  { pattern: /bg-gold/g, replacement: 'bg-primary' },
  { pattern: /shadow-gold/g, replacement: 'shadow-primary' },
];

// Files to NOT replace entirely or handle carefully
const excludeFiles = ['globals.css', 'listing-card.tsx', 'hero.tsx', 'navbar.tsx'];

files.forEach(file => {
  if (excludeFiles.some(ex => file.includes(ex))) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  replacements.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
