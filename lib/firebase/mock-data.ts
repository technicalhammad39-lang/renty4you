export const mockOpportunities = [
  {
    id: "opp_001",
    slug: "luxury-sa-manchester-city",
    title: "Luxury Serviced Apartment in Deansgate",
    location: "Manchester, UK",
    strategy: "Serviced Accommodation",
    propertyType: "2-Bed Apartment",
    budget: 2500,
    rentRange: "£1,800 - £2,200",
    estimatedCashflow: "£850 - £1,200",
    roi: "28%",
    occupancyRequired: "62%",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1c2c49e599?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    ],
    bedrooms: 2,
    bathrooms: 2,
    description: "A premium high-floor apartment located in the heart of Manchester's Deansgate district. Perfect for corporate clients and weekend tourists. Walking distance to Spinningfields and Manchester Arena.",
    compliance: {
      licensing: true,
      planning: true,
      leaseRestrictions: false,
    },
    risks: {
      keyRisk: "Seasonal dip in Q1 tourism.",
      assumption: "Corporate mid-week demand remains stable throughout the year.",
    },
    featured: true,
    createdAt: new Date("2026-06-20T10:00:00Z"),
  },
  {
    id: "opp_002",
    slug: "council-lease-liverpool-family",
    title: "Long-term Council Lease Family Home",
    location: "Liverpool, UK",
    strategy: "Council Leasing",
    propertyType: "3-Bed Terraced",
    budget: 1500,
    rentRange: "£900 - £950",
    estimatedCashflow: "£450 - £500",
    roi: "35%",
    occupancyRequired: "100%", // Council guarantees rent
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    ],
    bedrooms: 3,
    bathrooms: 1,
    description: "A solid 3-bedroom terraced house perfect for a 3-5 year council lease scheme. Hands-off investment with guaranteed rent and no void periods. High demand area for family housing.",
    compliance: {
      licensing: true,
      planning: true,
      leaseRestrictions: false,
    },
    risks: {
      keyRisk: "Wear and tear over 5 years.",
      assumption: "Council renews lease after the initial 3-year term.",
    },
    featured: false,
    createdAt: new Date("2026-06-22T14:30:00Z"),
  },
  {
    id: "opp_003",
    slug: "r2r-hmo-birmingham-professionals",
    title: "High-Yield Professional HMO",
    location: "Birmingham, UK",
    strategy: "Rent-to-Rent",
    propertyType: "5-Bed HMO",
    budget: 3500,
    rentRange: "£2,500 - £2,800",
    estimatedCashflow: "£1,100 - £1,400",
    roi: "45%",
    occupancyRequired: "75%",
    images: [
      "https://images.unsplash.com/photo-1600607687931-cebf58b38df9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    ],
    bedrooms: 5,
    bathrooms: 3,
    description: "Fully compliant 5-bedroom HMO aimed at young professionals working in central Birmingham. Turn-key condition requiring minimal setup costs. Strong local demand from hospital staff.",
    compliance: {
      licensing: true, // HMO License
      planning: true, // Article 4 compliant
      leaseRestrictions: false,
    },
    risks: {
      keyRisk: "Utility cost fluctuations.",
      assumption: "Average stay per tenant is 12+ months.",
    },
    featured: true,
    createdAt: new Date("2026-06-23T09:15:00Z"),
  }
];

export const mockBlogs = [
  {
    id: "blog_001",
    slug: "understanding-council-leasing-benefits",
    title: "The Hidden Benefits of Council Leasing in 2026",
    category: "Council Leasing",
    author: "Rent4uSolutions Team",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Why more investors are moving towards guaranteed rent schemes and avoiding the volatility of standard ASTs.",
    content: "<p>Council leasing provides an incredible hands-off strategy...</p>", // Simple mock
    createdAt: new Date("2026-06-15T10:00:00Z"),
  },
  {
    id: "blog_002",
    slug: "sa-compliance-checklist-2026",
    title: "Serviced Accommodation Compliance Checklist",
    category: "Compliance",
    author: "Rent4uSolutions Team",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Ensure your SA business is fully compliant with the latest 2026 regulations, planning permissions, and health & safety laws.",
    content: "<p>Compliance is the cornerstone of a sustainable SA business...</p>",
    createdAt: new Date("2026-06-18T10:00:00Z"),
  }
];
