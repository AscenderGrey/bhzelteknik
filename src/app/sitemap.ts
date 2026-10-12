import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority: number) => ({ url: `${site.url}${path}`, lastModified: now, priority });
  return [u("/", 1), ...services.map((s) => u(`/tjanster/${s.slug}`, 0.9)), u("/integritetspolicy", 0.2)];
}
