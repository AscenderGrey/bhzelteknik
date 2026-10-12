import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: `Så hanterar ${site.legalName} personuppgifter som lämnas via webbplatsen.`,
  alternates: { canonical: "/integritetspolicy" },
};

// NOTE: template text — have BHZ review before launch.
export default function Integritetspolicy() {
  return (
    <article className="container-x max-w-3xl py-14 md:py-20 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-extrabold [&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-muted">
      <h1 className="text-3xl font-extrabold sm:text-4xl">Integritetspolicy</h1>
      <p>
        {site.legalName} (org.nr {site.orgNr}, {site.address.street}, {site.address.postalCode} {site.address.locality}) är
        personuppgiftsansvarig för de uppgifter du lämnar via webbplatsen.
      </p>
      <h2>Vilka uppgifter samlar vi in?</h2>
      <p>Namn, telefonnummer, e-post och företag (om du anger dem), område och den information du själv skriver om ditt uppdrag.</p>
      <h2>Varför?</h2>
      <p>För att kunna besvara din förfrågan, lämna offert och utföra uppdraget, samt för att kunna ansöka om ROT-avdrag hos Skatteverket när det är aktuellt.</p>
      <h2>Hur länge sparas uppgifterna?</h2>
      <p>Förfrågningar som inte leder till uppdrag raderas inom 12 månader. Kunduppgifter sparas så länge det krävs enligt bokföringslagen.</p>
      <h2>Vem delas de med?</h2>
      <p>Uppgifterna hanteras i vårt kundsystem och delas inte med andra i marknadsföringssyfte.</p>
      <h2>Dina rättigheter</h2>
      <p>
        Du har rätt att begära utdrag, rättelse eller radering av dina uppgifter. Kontakta {site.email}. Du kan även vända dig till
        Integritetsskyddsmyndigheten (IMY).
      </p>
    </article>
  );
}
