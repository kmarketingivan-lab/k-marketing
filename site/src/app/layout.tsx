import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import "@/app/globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  verification: {
    google: "QDCG4gzIB3AjN502fm74Slw9Kf_PxwEJNPVij4NIO4k",
    other: {
      "msvalidate.01": "C31AFC6FFED6A449B3F9E4101527603B",
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking script: apply saved theme before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("km-theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        {/* Blocking script: set up gtag consent defaults BEFORE any GA script loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});`,
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased dark:bg-navy-800">
        {children}
      </body>
    </html>
  );
}
