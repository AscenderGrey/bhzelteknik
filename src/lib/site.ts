// Single source of truth for business facts (NAP). Google compares these
// against the Google Business Profile — keep them identical everywhere.
export const site = {
  name: "BHZ Elteknik",
  legalName: "BHZ elteknik Stockholm AB",
  orgNr: "556794-8921",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhzelteknik.vercel.app",
  phoneDisplay: "08-600 40 35",
  phoneHref: "tel:+4686004035",
  phoneE164: "+4686004035",
  email: "info@bhzelteknik.se",
  address: {
    street: "Tomträttsvägen 4",
    postalCode: "129 31",
    locality: "Hägersten",
    region: "Stockholm",
    country: "SE",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Tomtr%C3%A4ttsv%C3%A4gen+4%2C+129+31+H%C3%A4gersten",
  foundedYear: 2005,
  facebook: "https://www.facebook.com/bhzelteknik",
  ucRisksigill: "https://www.uc.se/risksigill2?showorg=556794-8921&language=swe",
  description:
    "BHZ Elteknik i Hägersten gör elinstallationer i Stockholm sedan 2005 – kraft, belysning, data, tele, tv, säkerhet och KNX. Egen projektering och konstruktion. Tre delägare som själva gör jobbet.",
} as const;
