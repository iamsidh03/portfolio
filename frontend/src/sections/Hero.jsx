import React from "react";
import Button from "/src/components/ui/Button";
import { MoveRight, Github } from "lucide-react";
import profileImg from "../assets/profile.jpg";

export default function Hero({ scrollTo }) {
  return (
    <header id="home" className="min-h-screen flex items-center pt-8 lg:pt-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}
          <div>
            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full
              bg-emerald-500/10 border border-emerald-500/20 
              text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for work
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8">
              I turn code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
                into products
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10">
              I’m Sid, a software engineer with expertise in building scalable
              systems, specializing in the MERN stack, backend engineering, and
              DevOps. I focus on high-performance architectures and taking
              products from idea to production with clean, efficient
              infrastructure.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Button primary onClick={() => scrollTo("work")} icon={MoveRight}>
                View Projects
              </Button>

              <Button icon={Github} href="https://github.com/iamsidh03">
                Github
              </Button>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="
                w-[320px] h-[320px]
                md:w-[380px] md:h-[380px]
                lg:w-[420px] lg:h-[420px]
                rounded-full
                bg-white/5 backdrop-blur-2xl
                border border-white/20
                shadow-[0_40px_120px_rgba(0,0,0,0.9)]
                flex items-center justify-center
              "
            >
              <img
                src={profileImg}
                alt="Raj"
                className="
                  w-[88%] h-[88%]
                  rounded-full
                  object-cover
                "
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
