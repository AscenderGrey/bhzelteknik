import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/data";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, CheckIcon, PhoneIcon } from "@/components/Icons";
import { Contact, FaqList, PhotoCard } from "@/components/sections";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  const title = `${s.name} i Stockholm`;
  return {
    title,
    description: s.metaDescription,
    alternates: { canonical: `/tjanster/${s.slug}` },
    openGraph: { title: `${title} | BHZ Elteknik`, description: s.metaDescription, images: [s.image?.src ?? "/opengraph-image.jpg"] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Hem", path: "/" },
    { name: s.name, path: `/tjanster/${s.slug}` },
  ];

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={faqSchema(s.faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="bg-ink text-white">
        <div className="container-x grid gap-10 py-12 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <nav aria-label="Brödsmulor" className="text-sm font-semibold text-white/60">
              <Link href="/" className="hover:text-white">Hem</Link> <span aria-hidden>/</span> <span className="text-white/90">{s.name}</span>
            </nav>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">{s.name} i Stockholm</h1>
            <p className="mt-5 text-lg leading-relaxed text-white/80 text-pretty">{s.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#offert" data-cta={`quote-service-${s.slug}`} className="btn-amber">Begär offert <ArrowIcon className="size-5" /></Link>
              <a href={site.phoneHref} data-cta={`call-service-${s.slug}`} className="btn-ghost text-white"><PhoneIcon className="size-5" /> {site.phoneDisplay}</a>
            </div>
            {s.rot && <p className="mt-5 text-sm font-semibold text-amber">ROT-avdrag på arbetskostnaden för privatpersoner – elarbete i bostaden</p>}
          </div>
          {s.image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={s.image.src} alt={s.image.alt} fill priority sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
            </div>
          ) : s.explainer ? (
            <ol className="space-y-3">
              {s.explainer.steps.map((st, i) => (
                <li key={st.h} className="flex gap-4 rounded-2xl bg-ink-2 p-5 ring-1 ring-white/10">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber font-extrabold text-ink">{i + 1}</span>
                  <div><p className="font-extrabold">{st.h}</p><p className="mt-1 text-sm text-white/70">{st.p}</p></div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="h2">Det här ingår</h2>
          <ul className="mt-6 space-y-3">
            {s.includes.map((i) => (
              <li key={i} className="flex gap-3 text-lg"><CheckIcon className="mt-1 size-5 shrink-0 text-ink" /> {i}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="h2">Passar för</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.forWho.map((w) => <li key={w} className="rounded-xl bg-white px-4 py-2 font-bold ring-1 ring-line">{w}</li>)}
          </ul>
          {s.explainer && (
            <div className="mt-8 rounded-3xl bg-amber-soft p-6">
              <h3 className="text-lg font-extrabold">{s.explainer.title}</h3>
              <p className="mt-2 text-ink/80">
                <strong>Projektering</strong> är planen: vilka funktioner du vill ha och var allt ska sitta. <strong>Programmering</strong> är när vi
                ställer in systemet så att varje knapp och scen gör det den ska. Vi gör båda delarna själva.
              </p>
            </div>
          )}
        </div>
      </section>

      {s.gallery.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container-x">
            <h2 className="h2">Från våra uppdrag</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
              {s.gallery.map((p) => <PhotoCard key={p.src} p={p} sizes="(min-width:768px) 25vw, 50vw" className="aspect-square" />)}
            </div>
          </div>
        </section>
      )}

      <FaqList faqs={s.faqs} title={`Frågor om ${s.name.toLowerCase()}`} />
      <Contact initialService={s.quoteKey} source={`service-${s.slug}`} />

      <section className="container-x py-14">
        <h2 className="text-xl font-extrabold">Andra tjänster</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.filter((o) => o.slug !== s.slug).map((o) => (
            <li key={o.slug}><Link href={`/tjanster/${o.slug}`} className="inline-block rounded-xl bg-white px-4 py-2 font-bold ring-1 ring-line hover:ring-ink">{o.name}</Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
