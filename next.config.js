const VERCEL_HOST = "random-plouf.vercel.app";
const CLOUDFLARE_HOST = "random-plouf.pages.dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:lng(en|fr)/:path*",
        has: [{ type: "host", value: VERCEL_HOST }],
        destination: `https://${CLOUDFLARE_HOST}/:lng/:path*`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
