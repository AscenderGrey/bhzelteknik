import { site } from "./site";
import { areas, founders, services, type Faq, type Service } from "./data";

const businessId = `${site.url}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": businessId,
    name: site.name,
    legalName: site.legalName,
    taxID: site.orgNr,
    description: site.description,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    image: `${site.url}/img/work/trappa-led.jpg`,
    foundingDate: String(site.foundedYear),
    founder: founders.map((f) => ({ "@type": "Person", name: f.name, email: f.email })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: areas.map((a) => ({ "@type": "Place", name: a })),
    sameAs: [site.facebook],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tjänster",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/tjanster/${s.slug}` },
      })),
    },
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.name} i Stockholm`,
    serviceType: s.name,
    description: s.metaDescription,
    url: `${site.url}/tjanster/${s.slug}`,
    provider: { "@id": businessId },
    areaServed: areas.map((a) => ({ "@type": "Place", name: a })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
