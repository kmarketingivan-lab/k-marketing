import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060724",
          borderRadius: 32,
          color: "#ff6700",
          fontWeight: 800,
          fontSize: 76,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        KM
      </div>
    ),
    { width: 180, height: 180 },
  );
}
