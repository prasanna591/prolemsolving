/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: false,
    formats: ["image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1280, 1774, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
