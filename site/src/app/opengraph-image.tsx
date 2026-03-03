import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const alt = "K-Marketing — Sistemi AI di Marketing per PMI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#060724",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #ff6700, #ff8533, #ff6700)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: 20,
            backgroundColor: "#ff6700",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            KM
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          K-Marketing
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#ff6700",
            marginBottom: 24,
          }}
        >
          Sistemi AI di Marketing per PMI
        </div>

        {/* Separator */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: "#ff6700",
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Location */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#9ca3af",
          }}
        >
          Brescia, Italia — k-marketing.it
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
