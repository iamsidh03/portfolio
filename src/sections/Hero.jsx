import React from "react";
import Button from "/src/components/ui/Button";  
import { MoveRight, Github } from "lucide-react";

export default function Hero({ scrollTo }) {
  return (
    <header id="home" className="pt-20 lg:pt-32">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 
        text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Available for work
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8">
         I turn code <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
            into products
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10">
          Full-stack developer skilled in MERN with experience building real-time, scalable applications.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button primary onClick={() => scrollTo("work")} icon={MoveRight}>View Projects</Button>
          <Button icon={Github} href="https://github.com/iamsidh03">Github</Button>
        </div>
      </div>
    </header>
  );
}
