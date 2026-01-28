import React, { useState } from "react";
import "../styles/contact.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">

      <div className="contact-box">

        <h2 className="contact-title">
          Let’s build something <br />
          <span className="highlight-text">extraordinary.</span>
        </h2>

        <p className="contact-desc">
          Whether you have a project in mind or just want to say hi, my inbox is always open.
        </p>

        <div className="contact-buttons">
          <a href="mailto:hello@example.com" className="contact-btn primary-btn">
            Say Hello
          </a>

          <button className="contact-btn copy-btn" onClick={copyEmail}>
            {copied ? "✔ Copied!" : "Copy Email"}
          </button>
        </div>

      </div>

    </section>
  );
}
