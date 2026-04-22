import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Finance Bro — Calculator FIRE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #111111 40%, #064e3b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: "#10b981",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 2, opacity: 0.8 }}>
            FINANCE BRO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Calculator FIRE
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "#d4d4d4",
              maxWidth: 900,
            }}
          >
            Afla de cati bani ai nevoie ca sa fii liber financiar — si in cat
            timp ajungi acolo.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#a3a3a3",
          }}
        >
          <div>Libertate financiara · RON & EUR · Pilon 1/2/3 + investitii</div>
          <div style={{ color: "#10b981", fontWeight: 600 }}>finance-bro</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
