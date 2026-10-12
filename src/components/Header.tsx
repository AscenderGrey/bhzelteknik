import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/data";
import { Logo } from "./Logo";
import { PhoneIcon } from "./Icons";

const nav = [
  { href: "/#tjanster", label: "Tjänster" },
  { href: "/#projekt", label: "Projekt" },
  { href: "/#grundarna", label: "Om oss" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label={`${site.name} – startsida`} className="shrink-0 text-white [--tile-ink:#0b0b0c]">
          <Logo className="h-9 w-auto md:h-11" />
        </Link>

        <nav aria-label="Huvudmeny" className="hidden items-center gap-8 text-[15px] font-semibold text-white/80 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-white">{n.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} data-cta="call-header" className="hidden items-center gap-2 rounded-xl px-3 py-2 font-bold hover:bg-white/10 sm:inline-flex">
            <PhoneIcon className="size-5 text-amber" />
            {site.phoneDisplay}
          </a>
          <Link href="/#offert" data-cta="quote-header" className="btn-amber hidden !px-5 !py-2.5 md:inline-flex">Begär offert</Link>

          <details className="group relative lg:hidden">
            <summary
              className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl hover:bg-white/10 [&::-webkit-details-marker]:hidden"
              aria-label="Meny"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6 6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <div className="absolute right-0 top-13 w-72 rounded-2xl bg-white p-3 text-ink shadow-2xl">
              <p className="px-3 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-muted">Tjänster</p>
              {services.map((s) => (
                <Link key={s.slug} href={`/tjanster/${s.slug}`} className="block rounded-lg px-3 py-2.5 font-semibold hover:bg-paper">{s.name}</Link>
              ))}
              <hr className="my-2 border-line" />
              {nav.slice(1).map((n) => (
                <Link key={n.href} href={n.href} className="block rounded-lg px-3 py-2.5 font-semibold hover:bg-paper">{n.label}</Link>
              ))}
              <a href={site.phoneHref} className="btn-dark mt-2 w-full"><PhoneIcon className="size-5" /> {site.phoneDisplay}</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
