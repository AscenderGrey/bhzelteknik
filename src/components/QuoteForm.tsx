"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quoteOptions } from "@/lib/data";
import { site } from "@/lib/site";
import { ArrowIcon, CheckIcon, PhoneIcon } from "./Icons";

const steps = ["Vad", "Var & när", "Kontakt"];

type Props = { initialService?: string; source?: string };

export function QuoteForm({ initialService, source = "website" }: Props) {
  const router = useRouter();
  const uid = useId();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>(initialService ? [initialService] : []);
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [timing, setTiming] = useState("");
  const [f, setF] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [rot, setRot] = useState<boolean | null>(null);
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const toggle = (s: string) => setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const phoneOk = f.phone.replace(/\D/g, "").length >= 8;
  const canNext = [selected.length > 0, !!propertyType && !!area, f.name.trim().length > 1 && phoneOk][step];
  const errors = ["Välj minst ett alternativ.", "Välj typ av fastighet och område.", "Fyll i namn och ett telefonnummer (minst 8 siffror)."];

  function next() {
    setError(canNext ? null : errors[step]);
    if (canNext && step < 2) setStep(step + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2 || !canNext) return next();
    setSubmitting(true);
    setError(null);
    const params = new URLSearchParams(window.location.search);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f, services: selected, propertyType, area, timing, rot, website, source,
          page: window.location.pathname,
          utm: Object.fromEntries(
            ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]
              .map((k) => [k, params.get(k)])
              .filter(([, v]) => v),
          ),
        }),
      });
      if (!res.ok) throw new Error();
      router.push("/tack");
    } catch {
      setError(`Något gick fel. Ring oss på ${site.phoneDisplay} så hjälper vi dig direkt.`);
      setSubmitting(false);
    }
  }

  const chip = (active: boolean) =>
    `flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold transition ${
      active ? "border-ink bg-amber-soft" : "border-line bg-white hover:border-ink/40"
    }`;
  const pills = (list: string[], value: string, onPick: (v: string) => void) => (
    <div className="mt-2 flex flex-wrap gap-2">
      {list.map((v) => (
        <button type="button" key={v} onClick={() => onPick(v)} aria-pressed={value === v}
          className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition ${value === v ? "border-ink bg-amber-soft" : "border-line bg-white hover:border-ink/40"}`}>
          {v}
        </button>
      ))}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl bg-white p-5 text-ink shadow-xl ring-1 ring-line sm:p-8">
      <ol className="mb-6 grid grid-cols-3 gap-2" aria-label="Steg">
        {steps.map((label, i) => (
          <li key={label} className="text-xs font-bold sm:text-sm" aria-current={i === step ? "step" : undefined}>
            <div className={`mb-1.5 h-1.5 rounded-full ${i <= step ? "bg-amber" : "bg-line"}`} />
            <span className={i === step ? "text-ink" : "text-muted"}>{i + 1}. {label}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="text-xl font-extrabold">Vad gäller det?</legend>
          <p className="mt-1 text-sm text-muted">Välj ett eller flera.</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {quoteOptions.services.map((s) => (
              <button type="button" key={s} onClick={() => toggle(s)} aria-pressed={selected.includes(s)} className={chip(selected.includes(s))}>
                <span className="flex-1">{s}</span>
                {selected.includes(s) && <CheckIcon className="size-5" />}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <fieldset>
            <legend className="text-xl font-extrabold">Typ av fastighet</legend>
            {pills(quoteOptions.propertyTypes, propertyType, setPropertyType)}
          </fieldset>
          <div>
            <label htmlFor={`${uid}-area`} className="font-bold">Område</label>
            <select id={`${uid}-area`} value={area} onChange={(e) => setArea(e.target.value)} className="input mt-2 font-semibold">
              <option value="">Välj område…</option>
              {quoteOptions.areas.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <fieldset>
            <legend className="font-bold">När? <span className="font-normal text-muted">(valfritt)</span></legend>
            {pills(quoteOptions.timings, timing, setTiming)}
          </fieldset>
        </div>
      )}

      {step === 2 && (
        <fieldset className="space-y-4">
          <legend className="text-xl font-extrabold">Vart skickar vi svaret?</legend>
          <Field id={`${uid}-name`} label="Namn" required>
            <input id={`${uid}-name`} autoComplete="name" value={f.name} onChange={set("name")} className="input" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id={`${uid}-phone`} label="Telefon" required>
              <input id={`${uid}-phone`} type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} className="input" />
            </Field>
            <Field id={`${uid}-email`} label="E-post (valfritt)">
              <input id={`${uid}-email`} type="email" autoComplete="email" value={f.email} onChange={set("email")} className="input" />
            </Field>
          </div>
          <Field id={`${uid}-company`} label="Företag (valfritt)">
            <input id={`${uid}-company`} autoComplete="organization" value={f.company} onChange={set("company")} className="input" />
          </Field>
          <Field id={`${uid}-msg`} label="Beskriv jobbet (valfritt)">
            <textarea id={`${uid}-msg`} rows={3} value={f.message} onChange={set("message")} className="input resize-y" />
          </Field>
          <fieldset>
            <legend className="text-sm font-bold">Vill du använda ROT-avdrag? <span className="font-normal text-muted">(privatperson)</span></legend>
            {pills(["Ja", "Nej"], rot === null ? "" : rot ? "Ja" : "Nej", (v) => setRot(v === "Ja"))}
          </fieldset>
          <div aria-hidden className="absolute -left-[9999px]">
            <label>Webbplats<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
          </div>
          <p className="text-xs text-muted">
            Vi använder uppgifterna för att svara på din förfrågan. Läs vår <Link href="/integritetspolicy" className="underline">integritetspolicy</Link>.
          </p>
        </fieldset>
      )}

      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}

      <div className="mt-6 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => { setError(null); setStep(step - 1); }} className="btn-ghost !px-5">Tillbaka</button>
        )}
        {step < 2 ? (
          <button type="button" onClick={next} className="btn-dark flex-1">Nästa <ArrowIcon className="size-5" /></button>
        ) : (
          <button type="submit" disabled={submitting} data-cta="quote-submit" className="btn-amber flex-1 disabled:opacity-60">
            {submitting ? "Skickar…" : "Skicka förfrågan"}
          </button>
        )}
      </div>

      <p className="mt-5 flex flex-wrap items-center justify-center gap-x-2 border-t border-line pt-4 text-sm text-muted">
        Hellre prata direkt?
        <a href={site.phoneHref} data-cta="call-form" className="inline-flex items-center gap-1 font-bold text-ink"><PhoneIcon className="size-4" /> {site.phoneDisplay}</a>
      </p>
    </form>
  );
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label} {required && <span className="text-red-700" aria-hidden>*</span>}
      </label>
      {children}
    </div>
  );
}
