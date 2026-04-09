import React, { useEffect, useRef } from "react";
import Button from "/src/components/ui/Button";
import { MoveRight, Github } from "lucide-react";
import profileImg from "../assets/profile.jpg";
import "../styles/Hero.css";
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

      
    </header>
  );
}