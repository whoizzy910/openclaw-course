import { useState, useEffect } from "react";

const modules = [
  { emoji: "🦞", title: "What OpenClaw Actually Is", duration: "10 min", color: "#C8602A" },
  { emoji: "⚙️", title: "Installation & First Run", duration: "12 min", color: "#4ECDC4" },
  { emoji: "🧠", title: "Crafting Your SOUL.md", duration: "15 min", color: "#A855F7" },
  { emoji: "💾", title: "Memory & HEARTBEAT Mastery", duration: "15 min", color: "#F59E0B" },
  { emoji: "🛠️", title: "Skills: Install, Vet & Build", duration: "18 min", color: "#10B981" },
  { emoji: "💸", title: "Model Selection & Cost Control", duration: "10 min", color: "#EF4444" },
  { emoji: "🤝", title: "Multi-Agent & Advanced Patterns", duration: "10 min", color: "#6366F1" },
  { emoji: "🚀", title: "Putting It All Together", duration: "10 min", color: "#EC4899" },
];

const quotes = [
  { text: "Everything Siri was supposed to be. And it goes so much further.", handle: "@crossiBuilds" },
  { text: "The closest thing to experiencing an AI-enabled future.", handle: "@kailazh" },
  { text: "It feels like it did to run Linux vs Windows 20 years ago. You're in control.", handle: "@snopoke" },
  { text: "This is the best 'morning briefing' interface I've seen.", handle: "@aaronmakelky" },
];

export default function LandingPage({ onEnter, theme = "dark", onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#111318" : "#F5F3EF",
    bgCard: isDark ? "#1a1d24" : "#EDEAE4",
    bgNav: isDark ? "rgba(17,19,24,0.95)" : "rgba(245,243,239,0.95)",
    text: isDark ? "#ECEEF4" : "#1A1C24",
    textMuted: isDark ? "#9CA0B0" : "#5A5E70",
    textDim: isDark ? "#6E7380" : "#8A8E9E",
    border: isDark ? "#252830" : "#D8D4CC",
    accent: "#C8602A",
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % quotes.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: colors.bg, color: colors.text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #111318; }
        ::-webkit-scrollbar-thumb { background: #C8602A; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 48px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(8,8,8,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #252830;
          padding: 14px 48px;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 900;
          color: #C8602A;
          letter-spacing: -0.5px;
        }
        .nav-cta {
          background: #C8602A;
          color: #111318;
          border: none;
          padding: 10px 22px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: opacity 0.2s;
        }
        .nav-cta:hover { opacity: 0.85; }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,53,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 80%, rgba(99,102,241,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 10% 60%, rgba(236,72,153,0.06) 0%, transparent 50%);
        }
        .hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(255,107,53,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        }
        .hero-content { position: relative; z-index: 1; max-width: 860px; }

        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,107,53,0.1);
          border: 1px solid rgba(255,107,53,0.25);
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #C8602A;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
        }
        .hero-lobster { font-size: 20px; }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -3px;
          color: #F4F0E8;
          margin-bottom: 8px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .hero-title-accent { color: #C8602A; }

        .hero-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 400;
          font-style: italic;
          color: #888;
          margin-bottom: 40px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-stats {
          display: flex; align-items: center; justify-content: center;
          gap: 0;
          margin-bottom: 48px;
          animation: fadeUp 0.6s 0.3s ease both;
        }
        .hero-stat {
          padding: 0 32px;
          border-right: 1px solid #2a2d38;
          text-align: center;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #F4F0E8;
          line-height: 1;
        }
        .hero-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 4px;
        }

        .hero-cta-row {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.6s 0.4s ease both;
        }
        .cta-primary {
          background: #C8602A;
          color: #111318;
          border: none;
          padding: 16px 36px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .cta-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .cta-secondary {
          background: transparent;
          color: #888;
          border: 1px solid #2e3240;
          padding: 16px 28px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .cta-secondary:hover { border-color: #555; color: #ccc; }

        /* Marquee */
        .marquee-section {
          border-top: 1px solid #1e2128;
          border-bottom: 1px solid #1e2128;
          padding: 16px 0;
          overflow: hidden;
          background: #1a1d24;
        }
        .marquee-track {
          display: flex; gap: 48px;
          animation: marquee 25s linear infinite;
          white-space: nowrap;
        }
        .marquee-item {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 2px;
          flex-shrink: 0;
        }
        .marquee-dot { color: #C8602A; margin-right: 48px; }

        /* Modules section */
        .section { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #C8602A;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          color: #F4F0E8;
          letter-spacing: -1px;
          margin-bottom: 48px;
          line-height: 1.1;
        }

        .modules-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #1e2128;
          border: 1px solid #1e2128;
          border-radius: 4px;
          overflow: hidden;
        }
        .module-row {
          background: #1a1d24;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: background 0.15s;
          cursor: default;
        }
        .module-row:hover { background: #111; }
        .module-number {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #C8602A;
          width: 20px;
          flex-shrink: 0;
          font-weight: 500;
        }
        .module-emoji-wrap {
          width: 36px; height: 36px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .module-info { flex: 1; min-width: 0; }
        .module-row-title {
          font-size: 14px;
          font-weight: bold;
          color: #D8DCE8;
          line-height: 1.3;
        }
        .module-row-duration {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #444;
          margin-top: 2px;
        }
        .module-bar {
          width: 3px;
          height: 32px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        /* Quote rotator */
        .quotes-section {
          padding: 80px 48px;
          background: #161920;
          border-top: 1px solid #1e2128;
          border-bottom: 1px solid #1e2128;
          text-align: center;
        }
        .quote-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 30px);
          font-style: italic;
          color: #CDD0DC;
          max-width: 680px;
          margin: 0 auto 16px;
          line-height: 1.5;
          transition: opacity 0.4s ease;
        }
        .quote-handle {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #C8602A;
          letter-spacing: 1px;
          transition: opacity 0.4s ease;
        }
        .quote-dots {
          display: flex; justify-content: center; gap: 6px; margin-top: 24px;
        }
        .quote-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #333; transition: background 0.3s;
        }
        .quote-dot.active { background: #C8602A; }

        /* Bottom CTA */
        .bottom-cta {
          padding: 120px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .bottom-cta-bg {
          position: absolute; inset: 0; z-index: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,107,53,0.1) 0%, transparent 70%);
        }
        .bottom-cta-content { position: relative; z-index: 1; }
        .bottom-lobster {
          font-size: 64px;
          display: block;
          margin-bottom: 24px;
          animation: float 4s ease-in-out infinite;
        }
        .bottom-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 900;
          color: #F4F0E8;
          letter-spacing: -2px;
          margin-bottom: 16px;
          line-height: 1;
        }
        .bottom-sub {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #555;
          margin-bottom: 40px;
          letter-spacing: 0.5px;
        }

        /* Footer */
        footer {
          border-top: 1px solid #1e2128;
          padding: 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #C8602A;
        }
        .footer-text {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #333;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @media (max-width: 700px) {
          .nav { padding: 16px 20px; }
          .nav.scrolled { padding: 12px 20px; }
          .section { padding: 60px 20px; }
          .modules-list { grid-template-columns: 1fr; }
          .hero-stats { gap: 0; }
          .hero-stat { padding: 0 16px; }
          footer { flex-direction: column; gap: 8px; text-align: center; }
          .bottom-cta { padding: 80px 20px; }
          .quotes-section { padding: 60px 20px; }
        }
      `}</style>

      {/* Nav */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} style={{ background: scrolled ? colors.bgNav : "transparent", borderBottomColor: colors.border }}>
        <div className="nav-logo" style={{ color: colors.accent }}>🦞 OpenClaw Course</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onToggleTheme}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              borderRadius: 20,
              padding: "6px 14px",
              fontFamily: "monospace",
              fontSize: 12,
              color: colors.textMuted,
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
          >
            {isDark ? "☀ Light" : "☾ Dark"}
          </button>
          <button className="nav-cta" onClick={onEnter}>Start Learning →</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-lobster">🦞</span>
            Module 1 Free · Full Access $29 · Self-Paced
          </div>
          <h1 className="hero-title">
            <span className="hero-title-accent">Maximize</span><br />
            OpenClaw
          </h1>
          <p className="hero-sub">The complete guide from first install to power-user mastery</p>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val">90</div>
              <div className="hero-stat-label">Minutes</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">8</div>
              <div className="hero-stat-label">Videos</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">24</div>
              <div className="hero-stat-label">Lessons</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">$29</div>
              <div className="hero-stat-label">Full Access</div>
            </div>
          </div>

          <div className="hero-cta-row">
            <button className="cta-primary" onClick={onEnter}>
              Start the Course →
            </button>
            <button className="cta-secondary" onClick={() => document.getElementById("modules").scrollIntoView()}>
              View Curriculum
            </button>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: "48px", flexShrink: 0 }}>
              <span className="marquee-item">SOUL.md</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">HEARTBEAT.md</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">ClawHub Skills</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">Multi-Agent Routing</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">Token Optimization</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">Memory Architecture</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">Proactive Automation</span>
              <span className="marquee-item marquee-dot">✦</span>
              <span className="marquee-item">Security Hardening</span>
              <span className="marquee-item marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div id="modules">
        <div className="section">
          <div className="section-label">Curriculum</div>
          <h2 className="section-title">
            Everything you need.<br />Nothing you don't.
          </h2>
          <div className="modules-list">
            {modules.map((mod, i) => (
              <div key={i} className="module-row">
                <div className="module-number">0{i + 1}</div>
                <div
                  className="module-emoji-wrap"
                  style={{ background: mod.color + "18" }}
                >
                  {mod.emoji}
                </div>
                <div className="module-info">
                  <div className="module-row-title">{mod.title}</div>
                  <div className="module-row-duration">{mod.duration}</div>
                </div>
                <div className="module-bar" style={{ background: mod.color + "60" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes */}
      <div className="quotes-section">
        <div className="section-label" style={{ marginBottom: "40px" }}>What users say</div>
        <p className="quote-text" style={{ opacity: visible ? 1 : 0 }}>
          "{quotes[quoteIdx].text}"
        </p>
        <div className="quote-handle" style={{ opacity: visible ? 1 : 0 }}>
          {quotes[quoteIdx].handle}
        </div>
        <div className="quote-dots">
          {quotes.map((_, i) => (
            <div key={i} className={`quote-dot ${i === quoteIdx ? "active" : ""}`} />
          ))}
        </div>
      </div>

      {/* What you'll learn */}
      <div className="section" style={{ paddingBottom: 60 }}>
        <div className="section-label">After this course</div>
        <h2 className="section-title">You'll know exactly<br />what you're doing.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "#1e2128", border: "1px solid #1e2128", borderRadius: 4, overflow: "hidden" }}>
          {[
            ["🏗️", "Deploy OpenClaw", "Local, VPS, or Mac Mini — pick the right setup for your needs"],
            ["✍️", "Write a powerful SOUL.md", "The file that makes your agent feel like a teammate, not a chatbot"],
            ["🔁", "Build proactive workflows", "Agent acts without being prompted — on your schedule"],
            ["🧩", "Install & vet skills safely", "Navigate ClawHub without getting burned by malicious skills"],
            ["💰", "Control your API costs", "Three-stage model strategy cuts spend without sacrificing quality"],
            ["🔒", "Secure your setup", "Patch CVEs, limit permissions, protect your credentials"],
            ["🤖", "Run multiple agents", "Route different channels to specialized agents with different personalities"],
            ["🛠️", "Build custom skills", "Write SKILL.md files that automate repetitive workflows precisely"],
          ].map(([icon, title, desc], i) => (
            <div key={i} style={{ background: "#1a1d24", padding: "24px 28px" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#D8DCE8", marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#8A8FA0", lineHeight: 1.5, fontFamily: "'DM Mono', monospace" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <div className="bottom-cta-bg" />
        <div className="bottom-cta-content">
          <span className="bottom-lobster">🦞</span>
          <h2 className="bottom-title">Ready to build<br />your agent?</h2>
          <p className="bottom-sub">90 minutes · 8 modules · Module 1 free</p>
          <button className="cta-primary" onClick={onEnter} style={{ margin: "0 auto" }}>
            Start the Course →
          </button>
        </div>
      </div>

      <footer>
        <div className="footer-logo">🦞 OpenClaw Course</div>
        <div className="footer-text">Built with Claude · Module 1 free · Full access $29</div>
      </footer>
    </div>
  );
}
