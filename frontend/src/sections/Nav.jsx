// import React from "react";
// import "../styles/nav.css";

// export default function Nav({ activeSection, scrollTo }) {
//   const menu = ["home", "about", "work","DSA", "contact"];

//   return (
//     <nav className="floating-nav">
//       <div className="nav-container">
//         {menu.map((item) => (
//           <button
//             key={item}
//             onClick={() => scrollTo(item)}
//             className={
//               activeSection === item
//                 ? "nav-btn active"
//                 : "nav-btn"
//             }
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }

import { useState } from "react";
import "../styles/nav.css";
import { ChatPanel } from "./ChatBot";

export default function Nav({ activeSection, scrollTo }) {
  const menu = ["home", "about", "work", "DSA", "contact"];
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <nav className="floating-nav">
        <div className="nav-container">
          {/* ── Menu items ── */}
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={activeSection === item ? "nav-btn active" : "nav-btn"}
            >
              {item}
            </button>
          ))}

          {/* ── Divider ── */}
          <span className="nav-divider" />

          {/* ── Chat with Jiya pill ── */}
          <button
            onClick={() => setChatOpen((v) => !v)}
            className={`nav-jiya-btn ${chatOpen ? "nav-jiya-btn--active" : ""}`}
            aria-label={chatOpen ? "Close Jiya chat" : "Open Jiya chat"}
          >
            {/* Bot icon */}
            <span className="nav-jiya-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4Z"
                  fill="currentColor"
                  fillOpacity=".9"
                />
                <circle cx="9.5" cy="11.5" r="1.2" fill="#0d1117"/>
                <circle cx="14.5" cy="11.5" r="1.2" fill="#0d1117"/>
              </svg>
            </span>

            <span className="nav-jiya-label">
              {chatOpen ? "Close" : "Chat with Jiya"}
            </span>

            {/* Online dot */}
            {!chatOpen && <span className="nav-jiya-dot" />}
          </button>
        </div>
      </nav>

      {/* Chat panel rendered outside nav so it overlays the page */}
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}