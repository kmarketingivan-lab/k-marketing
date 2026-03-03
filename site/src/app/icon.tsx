import { ImageResponse } from "next/og";

export function generateImageMetadata() {
  return [
    { id: "small", size: { width: 32, height: 32 }, contentType: "image/png" as const },
    { id: "medium", size: { width: 192, height: 192 }, contentType: "image/png" as const },
    { id: "large", size: { width: 512, height: 512 }, contentType: "image/png" as const },
  ];
}

export default function Icon({ id }: { id: string }) {
  const fallback = { width: 32, height: 32, fontSize: 16, radius: 6 };
  const sizes: Record<string, { width: number; height: number; fontSize: number; radius: number }> = {
    small: fallback,
    medium: { width: 192, height: 192, fontSize: 80, radius: 32 },
    large: { width: 512, height: 512, fontSize: 200, radius: 80 },
  };

  const s = sizes[id] ?? fallback;

  return new ImageResponse(
    (
      <div
        style={{
          width: s.width,
          height: s.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#060724",
          borderRadius: s.radius,
          color: "#ff6700",
          fontWeight: 800,
          fontSize: s.fontSize,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        KM
      </div>
    ),
    { width: s.width, height: s.height },
  );
}
