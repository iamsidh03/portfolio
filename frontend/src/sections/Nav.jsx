import React from "react";
import "../styles/nav.css";

export default function Nav({ activeSection, scrollTo }) {
  const menu = ["home", "about", "work","DSA", "contact"];

  return (
    <nav className="floating-nav">
      <div className="nav-container">
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className={
              activeSection === item
                ? "nav-btn active"
                : "nav-btn"
            }
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
