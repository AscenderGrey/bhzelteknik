import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { CheckIcon, PhoneIcon } from "@/components/Icons";

// Conversion page — fire ad/analytics conversion events here. Kept out of the index.
export const metadata: Metadata = {
  title: "Tack för din förfrågan",
  robots: { index: false, follow: false },
};

export default function TackPage() {
  return (
    <section className="container-x max-w-2xl py-20 text-center md:py-28">
      <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber">
        <CheckIcon className="size-8 text-ink" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Tack! Din förfrågan är skickad.</h1>
      <p className="mt-4 text-lg text-muted">Vi har tagit emot din förfrågan och hör av oss så snart vi kan.</p>
      <div className="mx-auto mt-10 max-w-md rounded-3xl bg-ink p-6 text-white">
        <p className="font-bold">Bråttom?</p>
        <a href={site.phoneHref} data-cta="call-thanks" className="mt-1 inline-flex items-center gap-2 text-2xl font-extrabold">
          <PhoneIcon className="size-6 text-amber" /> {site.phoneDisplay}
        </a>
      </div>
      <Link href="/" className="mt-8 inline-block font-bold underline">Tillbaka till startsidan</Link>
    </section>
  );
}
