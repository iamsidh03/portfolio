import React, { useEffect, useRef } from "react";
import "../styles/work.css";

import project1 from "../assets/project01.png";
import project2 from "../assets/project02.png";
import project3 from "../assets/project03.png";

const projects = [
  {
    index: "01",
    img: project1,
    alt: "Paper Trading Platform",
    title: "Paper Trading Platform",
    badge: "Backend",
    desc: "Real-time trading backend with live market feeds, order matching, and portfolio tracking. Built with WebSocket architecture for sub-100ms latency on live market data.",
    tags: ["Node.js", "WebSockets", "PostgreSQL", "Finnhub API"],
    cta: null,
    ctaLabel: "Case Study",
    accent: "#10b981",
    accentRgb: "16,185,129",
  },
  {
    index: "02",
    img: project2,
    alt: "Messenger Chat App",
    title: "Messenger Chat App",
    badge: "Full Stack",
    desc: "Full-stack real-time chat system with scalable socket architecture, JWT auth, presence indicators, and a clean minimal UI inspired by modern messaging apps.",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    cta: "https://messenger-chat-app.onrender.com/",
    ctaLabel: "Live Demo",
    accent: "#60a5fa",
    accentRgb: "96,165,250",
  },
  {
    index: "03",
    img: project3,
    alt: "Sorting Visualizer",
    title: "Sorting Visualizer",
    badge: "DSA",
    desc: "Interactive algorithm visualizer with real-time step animation, speed control, and dynamic array sizing — making sorting algorithms intuitive to understand.",
    tags: ["JavaScript", "Algorithms", "Canvas API", "Visualization"],
    cta: "https://iamsidh03.github.io/sorting-algorithms-visualizer/",
    ctaLabel: "Live Demo",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".wk-card");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("wk-card--visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${i * 100}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

export default function Work() {
  useReveal();

  return (
    <section id="work" className="wk-section">
      {/* ── Header ── */}
      <div className="wk-eyebrow">
        <span className="wk-eyebrow-dot" />
        <span className="wk-eyebrow-text">Selected Work</span>
      </div>

      <div className="wk-header">
        <h2 className="wk-heading">
          Things I've
          <br />
          <span className="wk-heading-ghost">built.</span>
        </h2>
        <p className="wk-subheading">
          A few projects that highlight my backend,<br />
          real-time, and system design experience.
        </p>
      </div>

      {/* ── Project list ── */}
      <div className="wk-list">
        {projects.map((p, i) => (
          <article
            key={p.index}
            className="wk-card"
            style={{
              "--accent": p.accent,
              "--accent-rgb": p.accentRgb,
            }}
          >
            {/* Left: content */}
            <div className="wk-card-content">
              {/* Top row: index + badge */}
              <div className="wk-card-top">
                <span className="wk-card-index">{p.index}</span>
                <span className="wk-card-badge"
                  style={{
                    color: p.accent,
                    background: `rgba(${p.accentRgb},.08)`,
                    borderColor: `rgba(${p.accentRgb},.25)`,
                  }}
                >
                  {p.badge}
                </span>
              </div>

              <h3 className="wk-card-title">{p.title}</h3>
              <p className="wk-card-desc">{p.desc}</p>

              <div className="wk-card-tags">
                {p.tags.map((t) => (
                  <span key={t} className="wk-tag">{t}</span>
                ))}
              </div>

              {/* CTA */}
              <div className="wk-card-footer">
                {p.cta ? (
                  <a
                    href={p.cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wk-cta"
                    style={{ color: p.accent }}
                  >
                    <span>{p.ctaLabel}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10"/>
                    </svg>
                  </a>
                ) : (
                  <span className="wk-cta wk-cta--dim">
                    <span>{p.ctaLabel}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M7 7h10v10"/>
                    </svg>
                  </span>
                )}

                {/* Divider line */}
                <div className="wk-card-line"
                  style={{ background: `linear-gradient(90deg, rgba(${p.accentRgb},.5), transparent)` }}
                />
              </div>
            </div>

            {/* Right: image */}
            <div className="wk-card-media">
              {/* Glow behind image */}
              <div className="wk-card-glow"
                style={{ background: `radial-gradient(circle, rgba(${p.accentRgb},.2) 0%, transparent 70%)` }}
              />
              <div className="wk-card-img-wrap">
                {/* Corner accents */}
                <span className="wk-corner wk-corner--tl"
                  style={{ borderColor: `rgba(${p.accentRgb},.6)` }} />
                <span className="wk-corner wk-corner--br"
                  style={{ borderColor: `rgba(${p.accentRgb},.6)` }} />

                <img src={p.img} alt={p.alt} className="wk-card-img" />

                {/* Overlay fade */}
                <div className="wk-card-img-overlay" />

                {/* Big index watermark on image */}
                <span className="wk-card-watermark">{p.index}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}