import Link from "next/link";
import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Always-visible call / quote bar on phones — most local-service leads come from mobile. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={site.phoneHref} data-cta="call-sticky" className="btn !py-3 bg-white text-ink">
          <PhoneIcon className="size-5" /> Ring
        </a>
        <Link href="/#offert" data-cta="quote-sticky" className="btn-amber !py-3">Begär offert</Link>
      </div>
    </div>
  );
}
