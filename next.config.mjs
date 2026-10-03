/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * GitHub Pages serves static files only, so the build must emit a fully
   * prerendered `out/` directory. Three consequences:
   *
   *  - `trailingSlash` — Pages resolves `/about` to `about/index.html`, so
   *    every route needs the trailing slash to match.
   *  - `images.unoptimized` — the next/image optimizer is a server, and Pages
   *    has none, so images ship as-is.
   *  - `headers()` below is inert under `output: "export"`; the headers it
   *    declares are no longer sent. They are kept so that moving back to a
   *    server host restores them with no other change.
   */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1774, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [72, 75, 80],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "X-Robots-Tag", value: "all" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "X-Robots-Tag", value: "all" }],
      },
    ];
  },
};

export default nextConfig;
