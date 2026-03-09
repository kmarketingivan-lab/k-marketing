const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./i18n.ts");

const isStaticExport = process.env.STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: false,
  // Static export for Altervista (FTP upload)
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
  }),

  // Expose flag to client code so routing.ts can read it
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: isStaticExport ? "true" : "",
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Static export requires unoptimized images
    ...(isStaticExport && { unoptimized: true }),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.k-marketing.it",
      },
    ],
  },

  // headers() is not supported with output: 'export'
  ...(!isStaticExport && {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "X-Frame-Options", value: "DENY" },
            { key: "X-Content-Type-Options", value: "nosniff" },
            { key: "Referrer-Policy", value: "origin-when-cross-origin" },
            { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
            {
              key: "Content-Security-Policy",
              value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://d4gy5ea465kim.cloudfront.net https://imagedelivery.net",
                "font-src 'self' data:",
                "connect-src 'self' https://api.emailjs.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://d4gy5ea465kim.cloudfront.net",
                "frame-ancestors 'none'",
              ].join("; "),
            },
          ],
        },
      ];
    },
  }),
};

module.exports = withNextIntl(nextConfig);
