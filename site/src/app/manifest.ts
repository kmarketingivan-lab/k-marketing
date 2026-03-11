import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "K-Marketing",
    short_name: "K-Marketing",
    description: "Sistemi AI di marketing per PMI ambiziose — Brescia",
    start_url: "/",
    display: "standalone",
    theme_color: "#060724",
    background_color: "#060724",
    icons: [
      {
        src: "/icon/medium",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/large",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
