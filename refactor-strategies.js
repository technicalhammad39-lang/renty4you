const fs = require('fs');

let code = fs.readFileSync('components/core-strategies.tsx', 'utf8');

// Replace image URLs
code = code.replace(
  /"https:\/\/images\.unsplash\.com\/photo-1522708323590-d24dbb6b0267\?q=80&w=2670&auto=format&fit=crop"/,
  '"/card1.svg"'
);
code = code.replace(
  /"https:\/\/images\.unsplash\.com\/photo-1486406146926-c627a92ad1ab\?q=80&w=2670&auto=format&fit=crop"/,
  '"/card2.svg"'
);
code = code.replace(
  /"https:\/\/images\.unsplash\.com\/photo-1560448204-e02f11c3d0e2\?q=80&w=2670&auto=format&fit=crop"/,
  '"/card3.svg"'
);

// Replace the JSX for cards
const jsxRegex = /<div ref=\{cardsRef\} className="grid grid-cols-1 lg:grid-cols-3 gap-8">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;

const newJsx = `<div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 gap-y-12 pr-4 lg:pr-6">
          {STRATEGIES.map((strategy) => (
            <div 
              key={strategy.id} 
              className="group relative w-full h-[400px] md:h-[420px] xl:h-[450px]"
            >
              {/* Image Container */}
              <div className="absolute top-0 left-0 w-full h-[75%] md:h-[80%] rounded-3xl overflow-hidden shadow-lg border border-border-subtle/20">
                <Image 
                  src={strategy.image} 
                  alt={strategy.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  unoptimized
                />
              </div>

              {/* Blue Box */}
              <div className="absolute bottom-0 right-0 w-[92%] bg-[#08025D] text-white rounded-tl-[32px] rounded-bl-[32px] rounded-br-[32px] p-6 lg:p-8 z-10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                
                {/* Circular Icon */}
                <div className="absolute -top-6 -right-6 w-14 h-14 bg-white rounded-full border border-gray-200 shadow-md flex items-center justify-center text-[#08025D] z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <strategy.icon size={26} weight="fill" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-2 lg:mb-3 pr-4 leading-tight">{strategy.title}</h3>
                <p className="text-[13px] md:text-sm text-gray-300 leading-relaxed line-clamp-4">
                  {strategy.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>`;

code = code.replace(jsxRegex, newJsx);

fs.writeFileSync('components/core-strategies.tsx', code);
console.log("Refactored core-strategies");
