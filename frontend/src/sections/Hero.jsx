import React, { useEffect, useRef } from "react";
import Button from "/src/components/ui/Button";
import { MoveRight, Github } from "lucide-react";
import profileImg from "../assets/profile.jpg";

export default function Hero({ scrollTo }) {
  const heroRef = useRef(null);

  // Parallax mouse-tracking for the glow orbs
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();
      const x = ((clientX - left) / width  - 0.5) * 30;
      const y = ((clientY - top)  / height - 0.5) * 30;
      hero.style.setProperty("--mx", `${x}px`);
      hero.style.setProperty("--my", `${y}px`);
    };
    hero.addEventListener("mousemove", handleMove);
    return () => hero.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <header
      id="home"
      ref={heroRef}
      className="hero-root"
      style={{ "--mx": "0px", "--my": "0px" }}
    >
      {/* ── Ambient background orbs ── */}
      <div className="hero-orb hero-orb--green" />
      <div className="hero-orb hero-orb--white" />

      {/* ── Noise grain overlay ── */}
      <div className="hero-grain" />

      {/* ── Horizontal rule lines (decorative) ── */}
      <div className="hero-rule hero-rule--top" />
      <div className="hero-rule hero-rule--bottom" />

      <div className="hero-inner">
        {/* ════════ LEFT ════════ */}
        <div className="hero-left">

          {/* Availability badge */}
          <div className="hero-badge hero-anim" style={{ "--d": "0ms" }}>
            <span className="hero-badge-ping" />
            <span className="hero-badge-dot"  />
            Available for work
          </div>

          {/* Heading */}
          <h1 className="hero-heading hero-anim" style={{ "--d": "80ms" }}>
            I turn code
            <br />
            <span className="hero-heading-ghost">into products</span>
          </h1>

          {/* Sub line */}
          <p className="hero-sub hero-anim" style={{ "--d": "160ms" }}>
            I'm <strong>Sid</strong> — a software engineer specialising in the MERN stack,
            backend engineering &amp; DevOps. I build high-performance architectures
            and take products from idea to production.
          </p>

          {/* CTAs */}
          <div className="hero-ctas hero-anim" style={{ "--d": "240ms" }}>
            <Button primary onClick={() => scrollTo("work")} icon={MoveRight}>
              View Projects
            </Button>
            <Button icon={Github} href="https://github.com/iamsidh03">
              Github
            </Button>
          </div>

          {/* Stat strip */}
          <div className="hero-stats hero-anim" style={{ "--d": "320ms" }}>
            {[
              { value: "4+",  label: "Years exp." },
              { value: "10+", label: "Projects"   },
              { value: "3",   label: "Open source" },
            ].map(({ value, label }) => (
              <div key={label} className="hero-stat">
                <span className="hero-stat-value">{value}</span>
                <span className="hero-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════ RIGHT ════════ */}
        <div className="hero-right hero-anim" style={{ "--d": "100ms" }}>
          {/* Rotating dashed ring */}
          <div className="hero-ring-outer">
            <svg className="hero-ring-svg" viewBox="0 0 440 440">
              <circle cx="220" cy="220" r="210"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="6 14"
              />
              {/* Emerald arc highlight */}
              <circle cx="220" cy="220" r="210"
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="1.5"
                strokeDasharray="120 1000"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"   stopColor="#10b981" stopOpacity="0" />
                  <stop offset="50%"  stopColor="#10b981" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Image frame */}
          <div className="hero-img-frame">
            {/* Corner accents */}
            <span className="hero-corner hero-corner--tl" />
            <span className="hero-corner hero-corner--br" />

            {/* Emerald glow behind image */}
            <div className="hero-img-glow" />

            <img
              src={profileImg}
              alt="Siddharth"
              className="hero-img"
            />
          </div>

          {/* Floating tag: Currently building */}
          <div className="hero-float-tag">
            <span className="hero-float-dot" />
            Currently building
          </div>
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .hero-root {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 80px 0 60px;
        }

        /* ── Orbs ── */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          transition: transform .08s linear;
        }
        .hero-orb--green {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(16,185,129,.18) 0%, transparent 70%);
          top: -120px; right: -80px;
          transform: translate(var(--mx), var(--my));
        }
        .hero-orb--white {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(255,255,255,.04) 0%, transparent 70%);
          bottom: 0; left: -100px;
          transform: translate(calc(var(--mx) * -0.5), calc(var(--my) * -0.5));
        }

        /* ── Grain ── */
        .hero-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
        }

        /* ── Rule lines ── */
        .hero-rule {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.06) 30%, rgba(255,255,255,.06) 70%, transparent);
          pointer-events: none;
        }
        .hero-rule--top    { top: 72px; }
        .hero-rule--bottom { bottom: 72px; }

        /* ── Inner grid ── */
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* ── Stagger animation ── */
        .hero-anim {
          opacity: 0;
          transform: translateY(20px);
          animation: heroReveal .65s cubic-bezier(.22,1,.36,1) forwards;
          animation-delay: var(--d, 0ms);
        }
        @keyframes heroReveal {
          to { opacity:1; transform:translateY(0); }
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(16,185,129,.08);
          border: 1px solid rgba(16,185,129,.2);
          color: #34d399;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 28px;
          position: relative;
        }
        .hero-badge-ping {
          position: absolute;
          display: inline-flex;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(52,211,153,.5);
          animation: heroPing 1.5s ease-in-out infinite;
          left: 14px;
        }
        .hero-badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(16,185,129,.8);
        }
        @keyframes heroPing {
          0%   { transform:scale(1); opacity:.6; }
          70%  { transform:scale(2.2); opacity:0; }
          100% { transform:scale(1); opacity:0; }
        }

        /* ── Heading ── */
        .hero-heading {
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -.04em;
          color: #fff;
          margin-bottom: 24px;
        }
        .hero-heading-ghost {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,.2);
        }

        /* ── Sub ── */
        .hero-sub {
          font-size: 15.5px;
          line-height: 1.75;
          color: #6b7280;
          max-width: 480px;
          margin-bottom: 36px;
        }
        .hero-sub strong { color: #d1d5db; font-weight: 600; }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        /* ── Stat strip ── */
        .hero-stats {
          display: flex;
          gap: 0;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0 20px;
          border-right: 1px solid rgba(255,255,255,.08);
        }
        .hero-stat:first-child { padding-left: 0; }
        .hero-stat:last-child  { border-right: none; }
        .hero-stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -.03em;
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 11px;
          color: #4b5563;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .07em;
        }

        /* ── Right side ── */
        .hero-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Rotating outer ring */
        .hero-ring-outer {
          position: absolute;
          inset: -40px;
          animation: heroSpin 30s linear infinite;
          pointer-events: none;
        }
        .hero-ring-svg { width: 100%; height: 100%; }
        @keyframes heroSpin { to { transform: rotate(360deg); } }

        /* Image frame */
        .hero-img-frame {
          position: relative;
          width: 360px;
          height: 360px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.04),
            0 40px 100px rgba(0,0,0,.8);
        }
        .hero-img-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 100%, rgba(16,185,129,.25) 0%, transparent 65%);
          pointer-events: none;
          z-index: 1;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          position: relative;
          z-index: 0;
          transition: transform .5s ease;
        }
        .hero-img-frame:hover .hero-img { transform: scale(1.04); }

        /* Corner accents */
        .hero-corner {
          position: absolute;
          width: 20px; height: 20px;
          z-index: 2;
          pointer-events: none;
        }
        .hero-corner--tl {
          top: 10px; left: 10px;
          border-top: 2px solid #10b981;
          border-left: 2px solid #10b981;
          border-radius: 3px 0 0 0;
        }
        .hero-corner--br {
          bottom: 10px; right: 10px;
          border-bottom: 2px solid #10b981;
          border-right: 2px solid #10b981;
          border-radius: 0 0 3px 0;
        }

        /* Floating tag */
        .hero-float-tag {
          position: absolute;
          bottom: -16px;
          left: -20px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 999px;
          background: #111318;
          border: 1px solid rgba(255,255,255,.1);
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          box-shadow: 0 12px 32px rgba(0,0,0,.6);
          animation: heroFloat 3s ease-in-out infinite;
          white-space: nowrap;
        }
        .hero-float-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px rgba(16,185,129,.8);
          animation: heroPing 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes heroFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .hero-badge, .hero-ctas, .hero-stats { justify-content: center; }
          .hero-sub { margin-left: auto; margin-right: auto; }
          .hero-right { order: -1; }
          .hero-img-frame { width: 280px; height: 280px; }
          .hero-ring-outer { inset: -30px; }
        }
        @media (max-width: 540px) {
          .hero-img-frame { width: 240px; height: 240px; border-radius: 20px; }
          .hero-stat-value { font-size: 18px; }
          .hero-stat { padding: 0 14px; }
        }
      `}</style>
    </header>
  );
}