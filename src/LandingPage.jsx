import { useState, useEffect } from "react";

const modules = [
  { emoji: "🦞", title: "What OpenClaw Actually Is", duration: "10 min", color: "#FF6B35" },
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

export default function LandingPage({ onEnter }) {
  const [scrolled, setScrolled] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [visible, setVisible] = useState(true);

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
    <div style={{ fontFamily: "'Georgia', serif", background: "#080808", color: "#E8E0D0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; }

        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 48px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(8,8,8,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #1a1a1a;
          padding: 14px 48px;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 900;
          color: #FF6B35;
          letter-spacing: -0.5px;
        }
        .nav-cta {
          background: #FF6B35;
          color: #080808;
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
          color: #FF6B35;
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
          color: #F0E8D8;
          margin-bottom: 8px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .hero-title-accent { color: #FF6B35; }

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
          border-right: 1px solid #222;
          text-align: center;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #F0E8D8;
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
          background: #FF6B35;
          color: #080808;
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
          border: 1px solid #2a2a2a;
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
          border-top: 1px solid #141414;
          border-bottom: 1px solid #141414;
          padding: 16px 0;
          overflow: hidden;
          background: #0d0d0d;
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
        .marquee-dot { color: #FF6B35; margin-right: 48px; }

        /* Modules section */
        .section { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #FF6B35;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 700;
          color: #F0E8D8;
          letter-spacing: -1px;
          margin-bottom: 48px;
          line-height: 1.1;
        }

        .modules-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #181818;
          border: 1px solid #181818;
          border-radius: 4px;
          overflow: hidden;
        }
        .module-row {
          background: #0d0d0d;
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
          font-size: 11px;
          color: #333;
          width: 20px;
          flex-shrink: 0;
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
          color: #D8D0C0;
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
          background: #0a0a0a;
          border-top: 1px solid #141414;
          border-bottom: 1px solid #141414;
          text-align: center;
        }
        .quote-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 30px);
          font-style: italic;
          color: #C8C0B0;
          max-width: 680px;
          margin: 0 auto 16px;
          line-height: 1.5;
          transition: opacity 0.4s ease;
        }
        .quote-handle {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #FF6B35;
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
        .quote-dot.active { background: #FF6B35; }

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
          color: #F0E8D8;
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
          border-top: 1px solid #141414;
          padding: 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #FF6B35;
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
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">🦞 OpenClaw Course</div>
        <button className="nav-cta" onClick={onEnter}>Start Learning →</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-lobster">🦞</span>
            Free · 90 Minutes · Self-Paced
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
              <div className="hero-stat-label">Modules</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">24</div>
              <div className="hero-stat-label">Lessons</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">0</div>
              <div className="hero-stat-label">Cost</div>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "#181818", border: "1px solid #181818", borderRadius: 4, overflow: "hidden" }}>
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
            <div key={i} style={{ background: "#0d0d0d", padding: "24px 28px" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#D8D0C0", marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5, fontFamily: "'DM Mono', monospace" }}>{desc}</div>
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
          <p className="bottom-sub">90 minutes · 8 modules · completely free</p>
          <button className="cta-primary" onClick={onEnter} style={{ margin: "0 auto" }}>
            Start the Course →
          </button>
        </div>
      </div>

      <footer>
        <div className="footer-logo">🦞 OpenClaw Course</div>
        <div className="footer-text">Built with Claude · Free forever</div>
      </footer>
    </div>
  );
}
