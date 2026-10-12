import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in ~/dev confuses workspace-root detection
  outputFileTracingRoot: __dirname,
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  async redirects() {
    // URLs from the old One.com site
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/kontakt.php", destination: "/#kontakt", permanent: true },
    ];
  },
};

export default nextConfig;
