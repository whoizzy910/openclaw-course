import { useState } from "react";

export default function PaywallModal({ onClose, moduleTitle }) {
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discountCode: discountCode.trim() || null,
          origin: window.location.origin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      setError("Network error — please try again");
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.88)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "flex-end",  // sheet from bottom on mobile
      justifyContent: "center",
      padding: "0",
    }}>
      <style>{`
        @media (min-width: 520px) {
          .paywall-sheet {
            align-self: center !important;
            border-radius: 6px !important;
            max-width: 420px !important;
            margin: 24px !important;
            border-bottom-left-radius: 6px !important;
            border-bottom-right-radius: 6px !important;
          }
        }
      `}</style>

      <div
        className="paywall-sheet"
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          borderRadius: "12px 12px 0 0",
          padding: "28px 24px calc(28px + env(safe-area-inset-bottom, 0px))",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Drag handle (mobile) */}
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: "#333", margin: "0 auto 20px",
        }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none",
            color: "#555", fontSize: 22, cursor: "pointer",
            lineHeight: 1, padding: "4px 8px",
          }}
        >×</button>

        {/* Lock icon */}
        <div style={{ fontSize: 32, marginBottom: 12, textAlign: "center" }}>🔒</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Georgia', serif",
          fontSize: 20,
          fontWeight: "bold",
          color: "#F0E8D8",
          textAlign: "center",
          marginBottom: 6,
          letterSpacing: "-0.5px",
        }}>
          Unlock Full Access
        </h2>

        <p style={{
          fontFamily: "monospace",
          fontSize: 11,
          color: "#666",
          textAlign: "center",
          marginBottom: 20,
          lineHeight: 1.6,
        }}>
          <strong style={{ color: "#aaa" }}>{moduleTitle}</strong> and all remaining<br />
          modules are part of the full course.
        </p>

        {/* What's included */}
        <div style={{
          background: "#0d0d0d",
          border: "1px solid #1e1e1e",
          borderRadius: 4,
          padding: "14px 16px",
          marginBottom: 20,
        }}>
          {[
            "Modules 2–8 (7 modules)",
            "24 lessons + video walkthroughs",
            "SOUL.md, Memory & Skills deep dives",
            "Multi-agent & cost optimization",
            "Lifetime access — no subscription",
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "monospace", fontSize: 11,
              color: "#888", paddingBottom: i < 4 ? 7 : 0,
            }}>
              <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* Discount code */}
        <div style={{ marginBottom: 14 }}>
          <label style={{
            fontFamily: "monospace", fontSize: 10,
            color: "#555", letterSpacing: 1,
            textTransform: "uppercase",
            display: "block", marginBottom: 6,
          }}>
            Discount Code (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. CLAW20"
            value={discountCode}
            onChange={e => {
              setDiscountCode(e.target.value.toUpperCase());
              setError("");
            }}
            style={{
              width: "100%",
              background: "#0a0a0a",
              border: `1px solid ${error ? "#ef4444" : "#2a2a2a"}`,
              borderRadius: 3,
              padding: "10px 14px",
              fontFamily: "monospace",
              fontSize: 14,
              color: "#E8E0D0",
              letterSpacing: 2,
              outline: "none",
              WebkitAppearance: "none",
            }}
          />
          {error && (
            <div style={{
              fontFamily: "monospace", fontSize: 11,
              color: "#ef4444", marginTop: 6,
            }}>
              ✕ {error}
            </div>
          )}
        </div>

        {/* Price */}
        <div style={{
          display: "flex", alignItems: "baseline",
          justifyContent: "center", gap: 8,
          marginBottom: 16,
        }}>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: 38, fontWeight: "bold",
            color: "#FF6B35", lineHeight: 1,
          }}>$29</span>
          <span style={{
            fontFamily: "monospace", fontSize: 11, color: "#555",
          }}>one-time</span>
        </div>

        {/* CTA */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#333" : "#FF6B35",
            color: loading ? "#666" : "#080808",
            border: "none",
            borderRadius: 3,
            padding: "15px",
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: "bold",
            letterSpacing: 1,
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
            minHeight: 50,
          }}
        >
          {loading ? "Redirecting to Stripe..." : "Unlock Full Course →"}
        </button>

        <p style={{
          fontFamily: "monospace", fontSize: 10,
          color: "#444", textAlign: "center",
          marginTop: 10, lineHeight: 1.6,
        }}>
          Secure payment via Stripe · 30-day money back guarantee
        </p>
      </div>
    </div>
  );
}

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discountCode: discountCode.trim() || null,
          origin: window.location.origin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      setError("Network error — please try again");
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: 6,
        padding: "40px",
        maxWidth: 420,
        width: "100%",
        position: "relative",
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none",
            color: "#555", fontSize: 20, cursor: "pointer",
            lineHeight: 1,
          }}
        >×</button>

        {/* Lock icon */}
        <div style={{ fontSize: 36, marginBottom: 16, textAlign: "center" }}>🔒</div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Georgia', serif",
          fontSize: 22,
          fontWeight: "bold",
          color: "#F0E8D8",
          textAlign: "center",
          marginBottom: 8,
          letterSpacing: "-0.5px",
        }}>
          Unlock Full Access
        </h2>

        <p style={{
          fontFamily: "monospace",
          fontSize: 12,
          color: "#666",
          textAlign: "center",
          marginBottom: 28,
          lineHeight: 1.6,
        }}>
          <strong style={{ color: "#aaa" }}>{moduleTitle}</strong> and all remaining modules<br />
          are part of the full course.
        </p>

        {/* What's included */}
        <div style={{
          background: "#0d0d0d",
          border: "1px solid #1e1e1e",
          borderRadius: 4,
          padding: "16px 20px",
          marginBottom: 24,
        }}>
          {[
            "Modules 2–8 (7 modules)",
            "24 lessons + video walkthroughs",
            "SOUL.md, Memory & Skills deep dives",
            "Multi-agent & cost optimization",
            "Lifetime access — no subscription",
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "monospace", fontSize: 12,
              color: "#888", paddingBottom: i < 4 ? 8 : 0,
            }}>
              <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        {/* Discount code */}
        <div style={{ marginBottom: 16 }}>
          <label style={{
            fontFamily: "monospace", fontSize: 11,
            color: "#555", letterSpacing: 1,
            textTransform: "uppercase",
            display: "block", marginBottom: 6,
          }}>
            Discount Code (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. CLAW20"
            value={discountCode}
            onChange={e => {
              setDiscountCode(e.target.value.toUpperCase());
              setError("");
              setDiscountApplied(false);
            }}
            style={{
              width: "100%",
              background: "#0a0a0a",
              border: `1px solid ${error ? "#ef4444" : discountApplied ? "#22c55e" : "#2a2a2a"}`,
              borderRadius: 3,
              padding: "10px 14px",
              fontFamily: "monospace",
              fontSize: 13,
              color: "#E8E0D0",
              letterSpacing: 2,
              outline: "none",
            }}
          />
          {error && (
            <div style={{
              fontFamily: "monospace", fontSize: 11,
              color: "#ef4444", marginTop: 6,
            }}>
              ✕ {error}
            </div>
          )}
        </div>

        {/* Price */}
        <div style={{
          display: "flex", alignItems: "baseline",
          justifyContent: "center", gap: 8,
          marginBottom: 20,
        }}>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontSize: 42, fontWeight: "bold",
            color: "#FF6B35", lineHeight: 1,
          }}>$29</span>
          <span style={{
            fontFamily: "monospace", fontSize: 12, color: "#555",
          }}>one-time</span>
        </div>

        {/* CTA */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#333" : "#FF6B35",
            color: loading ? "#666" : "#080808",
            border: "none",
            borderRadius: 3,
            padding: "14px",
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: "bold",
            letterSpacing: 1,
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Redirecting to Stripe..." : "Unlock Full Course →"}
        </button>

        <p style={{
          fontFamily: "monospace", fontSize: 10,
          color: "#444", textAlign: "center",
          marginTop: 12, lineHeight: 1.6,
        }}>
          Secure payment via Stripe · 30-day money back guarantee
        </p>
      </div>
    </div>
  );
}
