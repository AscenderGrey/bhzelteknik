import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/data";
import { Logo } from "./Logo";
import { FacebookIcon, MailIcon, PhoneIcon, PinIcon, ShieldIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo className="h-12 w-auto text-white [--tile-ink:#0b0b0c]" />
          {/* NAP block — must match Google Business Profile exactly */}
          <address className="mt-6 space-y-2 text-sm not-italic">
            <p className="font-bold text-white">{site.legalName}</p>
            <p className="flex items-start gap-2"><PinIcon className="mt-0.5 size-4 shrink-0 text-amber" />{site.address.street}, {site.address.postalCode} {site.address.locality}</p>
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white"><PhoneIcon className="size-4 text-amber" /> {site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white"><MailIcon className="size-4 text-amber" /> {site.email}</a>
            <p>Org.nr {site.orgNr}</p>
          </address>
        </div>
        <div>
          <p className="font-bold text-white">Tjänster</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/tjanster/${s.slug}`} className="hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">Följ & verifiera</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li><a href={site.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white"><FacebookIcon className="size-4 text-amber" /> Facebook</a></li>
            <li><a href={site.ucRisksigill} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-white"><ShieldIcon className="size-4 text-amber" /> UC Risksigill</a></li>
            <li><Link href="/integritetspolicy" className="hover:text-white">Integritetspolicy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-xs text-white/60">© {new Date().getFullYear()} {site.legalName} · Sedan {site.foundedYear}</p>
      </div>
    </footer>
  );
}
