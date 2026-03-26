import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Ekaitz Busto | Full Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Emerald top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
          }}
        />

        {/* Top-left ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -250,
            left: -250,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.13) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-right ambient glow */}
        <div
          style={{
            position: "absolute",
            bottom: -180,
            right: -80,
            width: 550,
            height: 550,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Decorative rings (top-right) */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            border: "1px solid rgba(16,185,129,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "1px solid rgba(16,185,129,0.05)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "68px 80px",
            justifyContent: "space-between",
          }}
        >
          {/* Top: availability badge */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(16,185,129,0.28)",
                borderRadius: 999,
                padding: "7px 18px",
                background: "rgba(16,185,129,0.07)",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  color: "#10b981",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}
              >
                OPEN TO OPPORTUNITIES
              </span>
            </div>
          </div>

          {/* Centre: name + description */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 13,
                color: "#52525b",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              Full Stack Developer
            </div>
            <div
              style={{
                fontSize: 108,
                fontWeight: 800,
                color: "#fafafa",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                marginBottom: 28,
              }}
            >
              Ekaitz
              <br />
              Busto
            </div>
            <div
              style={{
                fontSize: 21,
                color: "#4b5563",
                maxWidth: 560,
                lineHeight: 1.55,
              }}
            >
              Building web applications, MES systems, and data tools
              with React, Next.js, and Python.
            </div>
          </div>

          {/* Bottom: domain + tech tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: "#3f3f46",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              ekaitzbusto.dev
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["React", "Next.js", "TypeScript", "Python"].map((tech) => (
                <div
                  key={tech}
                  style={{
                    fontSize: 14,
                    color: "#52525b",
                    background: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: 6,
                    padding: "6px 14px",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
