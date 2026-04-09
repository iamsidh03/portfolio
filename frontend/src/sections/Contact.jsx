import React, { useState, useEffect, useRef } from "react";
import "../styles/contact.css";

export default function Contact() {
  const CONTACT_EMAIL = "Siddharthraj4689@gmail.com";
  const API_URL = import.meta.env.VITE_CONTACT_API || "http://localhost:5000";

  const [copied,    setCopied]    = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState(null);
  const [visible,   setVisible]   = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      alert("Message sending failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="ct-section" ref={sectionRef}>

      {/* ── Ambient glow ── */}
      <div className="ct-orb ct-orb--left"  />
      <div className="ct-orb ct-orb--right" />

      <div className={`ct-inner ${visible ? "ct-inner--visible" : ""}`}>

        {/* ── Left: copy + social links ── */}
        <div className="ct-left">
          <div className="ct-eyebrow">
            <span className="ct-eyebrow-dot" />
            <span className="ct-eyebrow-text">Contact</span>
          </div>

          <h2 className="ct-heading">
            Let's build<br />
            something<br />
            <span className="ct-heading-ghost">extraordinary.</span>
          </h2>

          <p className="ct-desc">
            Whether you have a project in mind or just want to say hi —
            my inbox is always open.
          </p>

          {/* Email card */}
          <div className="ct-email-card">
            <div className="ct-email-label">Email</div>
            <div className="ct-email-row">
              <span className="ct-email-addr">{CONTACT_EMAIL}</span>
              <button className="ct-copy-btn" onClick={copyEmail} aria-label="Copy email">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Social links */}
          <div className="ct-socials">
            {[
              {
                label: "GitHub",
                href: "https://github.com/iamsidh03",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/iamsidh03/",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
              },
              {
                label: "Twitter / X",
                href: "https://x.com/iamsidh03",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.256 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ct-social">
                {icon}
                <span>{label}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="ct-social-arrow">
                  <path d="M7 17 17 7M7 7h10v10"/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="ct-right">
          <div className="ct-form-card">
            <div className="ct-form-card-glow" />

            <div className="ct-form-header">
              <h3 className="ct-form-title">Send a message</h3>
              <p className="ct-form-sub">I'll get back to you within 24h.</p>
            </div>

            {/* Success */}
            {submitted && (
              <div className="ct-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                Message sent! I'll be in touch soon.
              </div>
            )}

            <form className="ct-form" onSubmit={handleSubmit}>
              {/* Name + Email row */}
              <div className="ct-form-row">
                <div className={`ct-field ${focused === "name" ? "ct-field--focused" : ""} ${formData.name ? "ct-field--filled" : ""}`}>
                  <label className="ct-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className="ct-input"
                    required
                  />
                </div>
                <div className={`ct-field ${focused === "email" ? "ct-field--focused" : ""} ${formData.email ? "ct-field--filled" : ""}`}>
                  <label className="ct-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    className="ct-input"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className={`ct-field ${focused === "message" ? "ct-field--focused" : ""} ${formData.message ? "ct-field--filled" : ""}`}>
                <label className="ct-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  className="ct-input ct-textarea"
                  rows={5}
                  required
                />
              </div>

              <button type="submit" className="ct-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="ct-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}