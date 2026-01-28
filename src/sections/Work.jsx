import React from "react";
import "../styles/work.css";

export default function Work() {
  return (
    <section id="work">
      <h2 className="work-title">Selected Works</h2>

      <div className="projects-container">
        
        {/* Project Card #1 */}
        <div className="project-card">
          <div className="project-image"></div>

          <div className="project-content">
            <h3 className="project-title">Fintech Dashboard</h3>

            <p className="project-desc">
              A real-time financial data visualization platform handling 
              high-frequency market events with WebSockets.
            </p>

            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">WebSockets</span>
              <span className="tag">D3.js</span>
            </div>

            <div className="project-link">View Case Study ↗</div>
          </div>
        </div>
        {/* Project Card #2 */}
<div className="project-card">
  <div className="project-image project-2"></div>

  <div className="project-content">
    <h3 className="project-title">AI Image Generator</h3>

    <p className="project-desc">
      A SaaS platform that allows users to generate AI images using 
      Stable Diffusion with flexible credit-based billing.
    </p>

    <div className="project-tags">
      <span className="tag">Next.js</span>
      <span className="tag">Python</span>
      <span className="tag">Stripe</span>
    </div>

    <div className="project-link">View Case Study ↗</div>
  </div>
</div>
{/* Project Card #3 */}
<div className="project-card">
  <div className="project-image project-3"></div>

  <div className="project-content">
    <h3 className="project-title">E-Commerce Monorepo</h3>

    <p className="project-desc">
      A scalable headless commerce platform built using modern architecture, 
      designed for global brands with optimized performance.
    </p>

    <div className="project-tags">
      <span className="tag">TurboRepo</span>
      <span className="tag">TypeScript</span>
      <span className="tag">GraphQL</span>
    </div>

    <div className="project-link">View Case Study ↗</div>
  </div>
</div>



      </div>
    </section>
  );
}
