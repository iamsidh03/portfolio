import React from "react";
import "../styles/work.css";

import project1 from "../assets/project01.png";
import project2 from "../assets/project02.png";
import project3 from "../assets/project03.png";

export default function Work() {
  return (
    <section id="work" className="work-section">
      <div className="work-header">
        <h2 className="work-title">Selected Work</h2>
        <p className="work-subtitle">
          A few projects that highlight my backend, real-time, and system design experience.
        </p>
      </div>

      <div className="projects-container">
        {/* Project 1 */}
        <div className="project-card">
          <div className="project-media">
            <img src={project1} alt="Paper Trading Platform" />
            <span className="project-index">01</span>
          </div>

          <div className="project-content">
            <h3 className="project-title">
              Paper Trading Platform <span>Backend</span>
            </h3>

            <p className="project-desc">
              Real-time trading backend with live market feeds, order matching,
              and portfolio tracking using WebSockets.
            </p>

            <div className="project-tags">
              <span>Node</span>
              <span>WebSockets</span>
              <span>PostgreSQL</span>
              <span>Finnhub</span>
            </div>

            <a className="project-cta">View Case Study →</a>
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-card reverse">
          <div className="project-media">
            <img src={project2} alt="Messenger Chat App" />
            <span className="project-index">02</span>
          </div>

          <div className="project-content">
            <h3 className="project-title">Messenger Chat App</h3>

            <p className="project-desc">
              Full-stack real-time chat system with scalable socket architecture
              and clean UI.
            </p>

            <div className="project-tags">
              <span>React</span>
              <span>Node</span>
              <span>MongoDB</span>
              <span>Socket.io</span>
            </div>

            <a
              href="https://messenger-chat-app.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta"
            >
              Live Demo →
            </a>
          </div>
        </div>

        {/* Project 3 */}
        <div className="project-card">
          <div className="project-media">
            <img src={project3} alt="Sorting Visualizer" />
            <span className="project-index">03</span>
          </div>

          <div className="project-content">
            <h3 className="project-title">Sorting Visualizer</h3>

            <p className="project-desc">
              Interactive algorithm visualizer with speed control
              and dynamic array size.
            </p>

            <div className="project-tags">
              <span>JavaScript</span>
              <span>Algorithms</span>
              <span>Visualization</span>
            </div>

            <a
              href="https://iamsidh03.github.io/sorting-algorithms-visualizer/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-cta"
            >
              Live Demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}