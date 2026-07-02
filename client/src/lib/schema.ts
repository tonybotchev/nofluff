export const SITE_URL = "https://nofluffmarketing.io";
export const SITE_NAME = "NoFluff Marketing";
export const LEGAL_NAME = "NoFluff Marketing I/O";
export const PHONE = "+19453708656";
export const PHONE_DISPLAY = "(945) 370-8656";
export const EMAIL = "info@dfwhome.loans";
export const ADDRESS = {
  streetAddress: "",
  addressLocality: "Celina",
  addressRegion: "TX",
  postalCode: "75009",
  addressCountry: "US",
};

const CONTEXT = "https://schema.org";

export const organizationSchema = {
  "@context": CONTEXT,
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-dark.svg`,
    width: 480,
    height: 96,
  },
  email: EMAIL,
  telephone: PHONE,
  address: {
    "@type": "PostalAddress",
    ...ADDRESS,
  },
  founder: {
    "@type": "Person",
    name: "Tony Botchev",
    identifier: "NMLS-114198",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Dallas County, Texas" },
    { "@type": "AdministrativeArea", name: "Collin County, Texas" },
    { "@type": "AdministrativeArea", name: "Denton County, Texas" },
    { "@type": "AdministrativeArea", name: "Tarrant County, Texas" },
  ],
  sameAs: [],
};

export const localBusinessSchema = {
  "@context": CONTEXT,
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: LEGAL_NAME,
  image: `${SITE_URL}/og-image.png`,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$97-$797",
  address: {
    "@type": "PostalAddress",
    ...ADDRESS,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.3248,
    longitude: -96.7847,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Celina" },
    { "@type": "City", name: "Frisco" },
    { "@type": "City", name: "Plano" },
    { "@type": "City", name: "McKinney" },
    { "@type": "City", name: "Prosper" },
    { "@type": "City", name: "Allen" },
    { "@type": "City", name: "Dallas" },
    { "@type": "City", name: "Fort Worth" },
  ],
};

export const personSchema = {
  "@context": CONTEXT,
  "@type": "Person",
  "@id": `${SITE_URL}/#tony-botchev`,
  name: "Tony Botchev",
  jobTitle: "Founder & Licensed Mortgage Loan Originator",
  worksFor: { "@id": `${SITE_URL}/#organization` },
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "NMLS",
      value: "114198",
    },
  ],
  knowsAbout: [
    "AI marketing automation",
    "Real estate lead generation",
    "Mortgage origination",
    "CRM systems",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Celina",
    addressRegion: "TX",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": CONTEXT,
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description:
    "AI-powered revenue systems for DFW real estate agents and mortgage professionals.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

const serviceBase = {
  "@context": CONTEXT,
  "@type": "Service",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Dallas-Fort Worth Metroplex, Texas",
  },
};

export const serviceSaasCrm = {
  ...serviceBase,
  "@id": `${SITE_URL}/#service-saas-crm`,
  name: "SaaS CRM for Real Estate & Mortgage",
  serviceType: "CRM Software",
  description:
    "All-in-one AI-powered CRM with pipelines, SMS/email automation, calendars, and funnels for DFW real estate agents and loan officers.",
  url: `${SITE_URL}/#pricing`,
};

export const serviceDeadDatabase = {
  ...serviceBase,
  "@id": `${SITE_URL}/#service-dead-database`,
  name: "Dead Database Reactivation",
  serviceType: "AI Voice Outreach",
  description:
    "AI voice agents call your dead leads using your name, qualify interest, and book appointments back on your calendar.",
  url: `${SITE_URL}/dead-database`,
};

export const serviceListingSentinel = {
  ...serviceBase,
  "@id": `${SITE_URL}/#service-listing-sentinel`,
  name: "ListingSentinel AI",
  serviceType: "Real Estate Intelligence",
  description:
    "AI-powered public-records monitoring for Dallas, Collin, Denton, and Tarrant counties — identifies likely-to-list properties before they hit the MLS.",
  url: `${SITE_URL}/listing-sentinel`,
};

export const serviceAeo = {
  ...serviceBase,
  "@id": `${SITE_URL}/#service-aeo`,
  name: "Answer Engine Optimization (AEO)",
  serviceType: "AI Search Optimization",
  description:
    "Get your real estate or mortgage business cited by ChatGPT, Claude, Perplexity, and Google AI Overviews for high-intent local queries.",
};

export const serviceListingReels = {
  ...serviceBase,
  "@id": `${SITE_URL}/#service-listing-reels`,
  name: "Listing Reels",
  serviceType: "Real Estate Video Marketing",
  description:
    "30–45 second vertical listing videos built from MLS photos. No filming required. 24-hour turnaround.",
};

export const serviceSocialMedia = {
  ...serviceBase,
  "@id": `${SITE_URL}/#service-social-media`,
  name: "Social Media Management",
  serviceType: "Content Marketing",
  description:
    "Done-for-you content calendars, short-form reels, and engagement systems for DFW real estate pros.",
};

const productBase = {
  "@context": CONTEXT,
  "@type": "Product",
  brand: { "@id": `${SITE_URL}/#organization` },
  category: "SaaS / Marketing Automation",
};

export const productStarter = {
  ...productBase,
  "@id": `${SITE_URL}/#plan-starter`,
  name: "NoFluff Starter",
  description:
    "CRM, pipelines, SMS/email, calendar, funnel builder, 1,000 contacts.",
  offers: {
    "@type": "Offer",
    price: "197",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "197",
      priceCurrency: "USD",
      unitCode: "MON",
    },
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/#pricing`,
  },
};

export const productGrowth = {
  ...productBase,
  "@id": `${SITE_URL}/#plan-growth`,
  name: "NoFluff Growth",
  description:
    "Everything in Starter + AI voice agent, dead-lead reactivation, 5,000 contacts, ListingSentinel Lite.",
  offers: {
    "@type": "Offer",
    price: "297",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "297",
      priceCurrency: "USD",
      unitCode: "MON",
    },
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/#pricing`,
  },
};

export const productPro = {
  ...productBase,
  "@id": `${SITE_URL}/#plan-pro`,
  name: "NoFluff Pro",
  description:
    "Everything in Growth + ListingSentinel Pro, AEO program, 4 listing reels/mo, unlimited contacts, dedicated strategist.",
  offers: {
    "@type": "Offer",
    price: "497",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "497",
      priceCurrency: "USD",
      unitCode: "MON",
    },
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/#pricing`,
  },
};

export const faqSchema = {
  "@context": CONTEXT,
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does NoFluff Marketing actually do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build AI-powered revenue systems for DFW real estate agents and mortgage pros — a full CRM, AI voice agents that re-engage dead leads, Listing Sentinel for pre-MLS property intelligence, Answer Engine Optimization, and done-for-you listing reels.",
      },
    },
    {
      "@type": "Question",
      name: "How is the AI voice agent different from a cold-calling VA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The AI agent calls your dead database 24/7 using your name and voice, handles objections, and only routes warm, qualified prospects to your calendar. No salary, no burnout, no no-shows from a human VA.",
      },
    },
    {
      "@type": "Question",
      name: "What is ListingSentinel AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's a proprietary system that monitors public records across Dallas, Collin, Denton, and Tarrant counties — divorces, probates, tax delinquencies, expired listings, rental conversions — and alerts you to likely sellers before the property ever hits the MLS.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a long-term contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All plans are month-to-month. Dead Database Reactivation includes a 7-day free trial with $0 setup. Cancel any time.",
      },
    },
    {
      "@type": "Question",
      name: "Do you only serve the DFW area?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CRM, listing reels, and AEO programs work nationally. Listing Sentinel and our dead-database scripts are DFW-optimized because the owner, Tony Botchev, is a licensed DFW loan originator (NMLS #114198) who uses these exact systems in his own business.",
      },
    },
    {
      "@type": "Question",
      name: "Who built this and why should I trust it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tony Botchev, NMLS #114198, built every system for DFW Homes & Loans first. NoFluff Marketing only exists because other agents kept asking how he was closing so many dead leads. Practitioner-built, not guru-built.",
      },
    },
  ],
};

export const howToSchema = {
  "@context": CONTEXT,
  "@type": "HowTo",
  name: "How to Reactivate a Dead Real Estate Database with AI",
  description:
    "Turn an aged, unresponsive lead list into booked appointments using NoFluff's AI voice agent.",
  totalTime: "P7D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "0",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Upload your list",
      text: "Drop a CSV of old leads (name + phone) into the NoFluff dashboard. No data cleanup required.",
    },
    {
      "@type": "HowToStep",
      name: "Script & voice setup",
      text: "Pick one of our proven real estate scripts (or bring your own) and clone your voice in 90 seconds.",
    },
    {
      "@type": "HowToStep",
      name: "AI runs the dials",
      text: "The agent calls 24/7, handles objections, and texts follow-ups to anyone who doesn't pick up.",
    },
    {
      "@type": "HowToStep",
      name: "Warm transfers to your calendar",
      text: "Only qualified, interested prospects get booked — no time wasted on tire-kickers.",
    },
  ],
};

export function breadcrumbList(
  crumbs: Array<{ name: string; path: string }>
) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export const allPrimarySchemas = [
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  personSchema,
];
