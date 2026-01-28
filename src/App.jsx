import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from "./sections/Hero";
import About from './sections/About';
import Work from './sections/Work';
import Contact from './sections/Contact';
import Footer from "./sections/Footer";
import Nav from "./sections/Nav";

import './styles/globals.css';

function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  // Scroll spy (detect current section)
  useEffect(() => {
    const sections = ["home", "about", "work", "contact"];

    const handleScroll = () => {
      let current = "home";
      sections.forEach((sec) => {
        const sectionEl = document.getElementById(sec);
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = sec;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">

      <Nav activeSection={activeSection} scrollTo={scrollTo} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 space-y-24">
        <Hero scrollTo={scrollTo}/>
        <About />
        <Work />
        <Contact />
        <Footer />
      </main>

    </div>
  );
}

export default App;
