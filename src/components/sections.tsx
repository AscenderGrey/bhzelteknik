import Image from "next/image";
import { site } from "@/lib/site";
import { founders, type Faq, type Photo } from "@/lib/data";
import { Tile } from "./Logo";
import { QuoteForm } from "./QuoteForm";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

export function PhotoCard({ p, sizes, className = "aspect-[4/3]" }: { p: Photo; sizes: string; className?: string }) {
  return (
    <figure>
      <div className={`group relative overflow-hidden rounded-2xl bg-ink ${className}`}>
        <Image src={p.src} alt={p.alt} fill sizes={sizes} className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <figcaption className="mt-2.5 text-sm font-semibold text-muted">{p.caption}</figcaption>
    </figure>
  );
}

export function Founders() {
  return (
    <section id="grundarna" className="bg-ink py-16 text-white md:py-24">
      <div className="container-x">
        <p className="eyebrow !text-amber">Grundarna</p>
        <h2 className="h2 mt-3 max-w-2xl">B, H och Z – tre delägare sedan {site.foundedYear}</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {founders.map((f) => (
            <li key={f.slug} className="flex items-center gap-5 rounded-3xl bg-ink-2 p-5 ring-1 ring-white/10 md:block">
              <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl bg-white/5 md:w-auto">
                {f.photo ? (
                  <>
                    <Image src={f.photo} alt={`${f.name}, BHZ Elteknik`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                    <Tile letter={f.letter} className="absolute left-3 top-3 size-12 text-ink" />
                  </>
                ) : (
                  <Tile letter={f.letter} className="absolute inset-[12%] text-white md:inset-[18%] [--tile-ink:#0b0b0c]" />
                )}
              </div>
              <div className="min-w-0">
              <h3 className="text-xl font-extrabold md:mt-5">{f.name}</h3>
              <p className="text-sm font-semibold text-white/60">{f.title}</p>
              <div className="mt-4 space-y-1.5 text-sm font-semibold">
                <a href={f.mobileHref} className="flex items-center gap-2 hover:text-amber"><PhoneIcon className="size-4 text-amber" /> {f.mobileDisplay}</a>
                <a href={`mailto:${f.email}`} className="flex items-center gap-2 break-all hover:text-amber"><MailIcon className="size-4 shrink-0 text-amber" /> {f.email}</a>
              </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-lg font-semibold text-white/80">Tre delägare – alla ute på jobben. Du får prata direkt med den som gör arbetet.</p>
      </div>
    </section>
  );
}

export function FaqList({ faqs, title = "Vanliga frågor" }: { faqs: Faq[]; title?: string }) {
  return (
    <section className="container-x max-w-3xl py-16 md:py-24">
      <h2 className="h2">{title}</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="text-2xl font-normal transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Contact({ initialService, source }: { initialService?: string; source?: string }) {
  return (
    <section id="kontakt" className="bg-white py-16 md:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2 className="h2 mt-3">Berätta om ditt projekt</h2>
          <p className="lead mt-4">Ring kontoret eller skicka en förfrågan. Vi återkommer med ett förslag eller bokar ett platsbesök.</p>
          <a href={site.phoneHref} data-cta="call-contact" className="mt-8 flex items-center gap-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            <PhoneIcon className="size-8 text-amber" /> {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="mt-4 flex items-center gap-3 text-lg font-semibold"><MailIcon className="size-5 text-muted" /> {site.email}</a>
          <a href={site.mapUrl} target="_blank" rel="noopener" className="mt-3 flex items-start gap-3 text-lg font-semibold">
            <PinIcon className="mt-1 size-5 shrink-0 text-muted" />
            <span>{site.address.street}, {site.address.postalCode} {site.address.locality}<span className="block text-sm font-semibold text-muted underline">Visa på karta – kontor och lager</span></span>
          </a>
        </div>
        <div id="offert" className="scroll-mt-24">
          <QuoteForm initialService={initialService} source={source} />
        </div>
      </div>
    </section>
  );
}
