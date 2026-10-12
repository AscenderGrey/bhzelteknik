import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { homeFaqs, projectGroups, services } from "@/lib/data";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, PhoneIcon, ShieldIcon } from "@/components/Icons";
import { Contact, FaqList, Founders, PhotoCard } from "@/components/sections";
import hero from "../../public/img/work/trappa-led.jpg";

const trust = ["Sedan 2005", "3 delägare i arbete", "KNX-projektering", "UC Risksigill"];

const why = [
  { h: "Sedan 2005", p: "Vi har drivit företaget i Stockholm sedan hösten 2005." },
  { h: "Ägarna gör jobbet", p: "Alla tre delägare arbetar i företaget – ute på jobben, inte bara på kontoret." },
  { h: "Egen projektering", p: "Vi projekterar och konstruerar elsystemen själva, så planering och utförande hänger ihop." },
  { h: "KNX i egen regi", p: "Vi projekterar och programmerar kompletta KNX-installationer själva." },
];

const process = [
  { h: "Kontakt", p: "Ring eller skicka en förfrågan och berätta vad du behöver." },
  { h: "Platsbesök & offert", p: "Vi tittar på förutsättningarna och lämnar en tydlig offert." },
  { h: "Installation & egenkontroll", p: "Vi utför arbetet och gör egenkontroll innan vi lämnar över." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[62%]">
          <Image src={hero} alt="LED-belysning under trappsteg i en bostad i Stockholm, installerad av BHZ Elteknik" fill priority placeholder="blur" sizes="(min-width:1024px) 62vw, 100vw" className="object-cover object-[30%_50%]" />
          <div className="absolute inset-0 bg-ink/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/25 lg:to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="container-x flex min-h-[78svh] flex-col justify-center py-20 md:min-h-[720px]">
          <p className="eyebrow !text-amber">Elektriker i Hägersten, Stockholm</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Elinstallationer i Stockholm – sedan 2005
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 text-pretty">
            Kraft, belysning, data, säkerhet och KNX för hem, företag och fastigheter. Tre delägare som gör jobbet själva.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#offert" data-cta="quote-hero" className="btn-amber">Begär offert <ArrowIcon className="size-5" /></Link>
            <a href={site.phoneHref} data-cta="call-hero" className="btn-ghost text-white"><PhoneIcon className="size-5" /> Ring {site.phoneDisplay}</a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/75">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-amber" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="tjanster" className="container-x scroll-mt-20 py-16 md:py-24">
        <p className="eyebrow">Tjänster</p>
        <h2 className="h2 mt-3 max-w-2xl">Alla installationer – från första ritning till sista armatur</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/tjanster/${s.slug}`} className={`group flex h-full flex-col overflow-hidden rounded-3xl ring-1 transition hover:-translate-y-0.5 hover:shadow-xl ${s.image ? "bg-white ring-line" : "bg-ink text-white ring-ink"}`}>
                {s.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] items-center justify-center bg-ink-2">
                    {s.slug === "knx" ? <span className="text-5xl font-extrabold tracking-tight text-amber">KNX</span> : <ShieldIcon className="size-16 text-amber" />}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-extrabold">{s.name}</h3>
                  <p className={`mt-2 flex-1 ${s.image ? "text-muted" : "text-white/70"}`}>{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold">Läs mer <ArrowIcon className="size-4 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </li>
          ))}
          <li className="flex flex-col justify-center rounded-3xl bg-amber-soft p-6">
            <h3 className="text-xl font-extrabold">ROT-avdrag för privatpersoner</h3>
            <p className="mt-2 text-ink/75">Gör vi elarbete i din bostad kan du få ROT-avdrag på arbetskostnaden. Vi visar vad som gäller i offerten.</p>
          </li>
        </ul>
      </section>

      <section id="projekt" className="scroll-mt-20 bg-white py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow">Projekt</p>
          <h2 className="h2 mt-3 max-w-2xl">Ljuset är det man ser. Elen är det som håller.</h2>
          <p className="lead mt-4 max-w-2xl">Ett urval av riktiga jobb – bostäder, butiker, kontor och stora elcentraler.</p>
          {projectGroups.map((g) => (
            <div key={g.name} className="mt-12">
              <h3 className="text-lg font-extrabold">{g.name}</h3>
              <div className={`mt-4 grid gap-x-4 gap-y-6 ${g.items.length > 2 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"}`}>
                {g.items.map((p) => (
                  <PhotoCard key={p.src} p={p} sizes={g.items.length > 2 ? "(min-width:1024px) 25vw, 50vw" : "50vw"} className={g.items.length > 2 ? "aspect-square" : "aspect-[4/3]"} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Founders />

      <section className="container-x py-16 md:py-24">
        <p className="eyebrow">Varför BHZ</p>
        <h2 className="h2 mt-3">Samma personer från offert till egenkontroll</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <li key={w.h} className="rounded-3xl bg-white p-6 ring-1 ring-line">
              <span className="text-sm font-extrabold text-muted">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-extrabold">{w.h}</h3>
              <p className="mt-2 text-muted">{w.p}</p>
            </li>
          ))}
        </ul>

        <h2 className="h2 mt-20">Så går det till</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {process.map((s, i) => (
            <li key={s.h} className="flex gap-4 rounded-3xl bg-ink p-6 text-white">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber text-lg font-extrabold text-ink">{i + 1}</span>
              <div>
                <h3 className="text-lg font-extrabold">{s.h}</h3>
                <p className="mt-1 text-white/70">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Contact source="home" />
      <FaqList faqs={homeFaqs} />
    </>
  );
}
