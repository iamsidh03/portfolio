import React, { useState } from "react";
import "../styles/contact.css";

export default function Contact() {
  const CONTACT_EMAIL = "Siddharthraj4689@gmail.com.com";
  const API_URL =
    import.meta.env.VITE_CONTACT_API || "http://localhost:5000";

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Message sending failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-box">
        <h2 className="contact-title">
          Let’s build something <br />
          <span className="highlight-text">extraordinary.</span>
        </h2>

        <p className="contact-desc">
          Whether you have a project in mind or just want to say hi,
          my inbox is always open.
        </p>

        {submitted && (
          <div className="success-message">
            ✔ Message sent successfully!
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Tell me about your project..."
            className="form-input textarea"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="contact-btn primary-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="contact-divider">OR</div>

        <div className="contact-buttons">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="contact-btn primary-btn"
          >
            Say Hello
          </a>

          <button
            className="contact-btn copy-btn"
            onClick={copyEmail}
          >
            {copied ? "✔ Copied!" : "Copy Email"}
          </button>
        </div>
      </div>
    </section>
  );
}