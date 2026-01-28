import React from "react";
import "../styles/tile.css";

export default function About() {
  return (
    <section id="about">
      <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        <div className="tile bio-tile md:col-span-2 lg:col-span-2 row-span-2">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Full Stack Developer
          </h3>

          <p className="text-neutral-400 leading-relaxed mb-4">
            Full-stack developer with expertise in MERN stack technologies,
            specializing in building scalable web applications with clean,
            efficient code. I combine strong problem-solving abilities, bringing
            both technical depth and analytical thinking to every project.
            Experienced in designing RESTful APIs, implementing real-time
            features, and working with both SQL and NoSQL databases to create
            robust solutions. Passionate about continuous learning and
            delivering high-quality applications that prioritize user experience
            and performance. Collaborative team player committed to writing
            maintainable code and contributing meaningfully to development
            teams.
          </p>

          <div className="flex gap-2">
            <span className="skill-badge">React</span>
            <span className="skill-badge">Node.js</span>
            <span className="skill-badge">Express</span>
            <span className="skill-badge">PostgreSQL</span>
          </div>
        </div>
        {/* Experience Tile */}
        <div className="tile experience-tile flex flex-col items-center justify-center text-center">
          <span className="exp-number">2+</span>
          <span className="exp-label">Years Experience</span>
        </div>

        {/* Twitter Tile */}
        <a
          href="https://x.com/iamsidh03"
          target="_blank"
          rel="noopener noreferrer"
          className="tile twitter-tile group cursor-pointer"
        >
          <div className="tile twitter-tile group cursor-pointer">
            <div className="tile-inner">
              <div className="tile-top">
                <span className="twitter-icon">𝕏</span>

                <span className="arrow">↗</span>
              </div>

              <div className="tile-bottom">
                <span className="twitter-handle">@iamsidh03</span>
              </div>
            </div>
          </div>
        </a>

        {/* Stack Visualizer Tile */}
        <div className="tile stack-tile row-span-2">
          <h3 className="stack-title">Core Stack</h3>

          <div className="stack-list">
            <div className="stack-item">
              <span className="stack-label">Frontend</span>
              <span className="stack-value">React, Tailwind</span>
            </div>

            <div className="stack-item">
              <span className="stack-label">Backend</span>
              <span className="stack-value">Node.js, Express</span>
            </div>

            <div className="stack-item">
              <span className="stack-label">Database</span>
              <span className="stack-value">PostgreSQL, MongoDB</span>
            </div>

            {/* <div className="stack-item">
      <span className="stack-label">DevOps</span>
      <span className="stack-value">Docker, AWS</span>
    </div> */}
          </div>
        </div>
        {/* Location Tile */}
        <div className="tile location-tile">
          <div className="location-overlay"></div>

          <div className="location-label">
            <span>San Francisco, CA</span>
          </div>
        </div>
        {/* LinkedIn Tile */}
        <a
          href="https://www.linkedin.com/in/iamsidh03/"
          target="_blank"
          rel="noopener noreferrer"
          className="tile linkedin-tile group cursor-pointer"
        >
          <div className="tile linkedin-tile group cursor-pointer">
            <div className="tile-inner">
              <div className="tile-top">
                <span className="linkedin-icon">in</span>

                <span className="arrow">↗</span>
              </div>

              <div className="tile-bottom">
                <span className="linkedin-label">LinkedIn</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
