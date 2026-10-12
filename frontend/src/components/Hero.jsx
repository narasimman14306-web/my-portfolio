import React from 'react';

function Hero() {
  const stats = [
    { value: '2+ Yrs', label: 'Legacy Maintenance' },
    { value: 'React + Go', label: 'Target Architecture' },
    { value: '15+', label: 'Dashboard Modules' },
    { value: '<10ms', label: 'Go API Latency Goal' },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Background Glow Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-700/40 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-sm shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Legacy PHP Modernization & Full Stack Developer</span>
        </div>

        {/* Greeting with User Name */}
        <p className="text-cyan-400 font-semibold tracking-wide text-base mb-2">
          👋 Hello world, my name is
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Narasimman.{' '}
          <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Migrating PHP to React & Golang
          </span>
        </h1>

        {/* Subtitle / Bio */}
        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Full stack developer with real-world experience maintaining production PHP telephony & operations systems, transitioning them into ultra-fast <span className="text-cyan-400 font-medium">React</span> frontends and high-concurrency <span className="text-sky-400 font-medium">Golang</span> backend APIs.
        </p>

        {/* Action Buttons (CTAs) including Resume */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#experience"
            className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-full shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-95"
          >
            🔄 View Migration Journey
          </a>
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume PDF: Add your resume file to frontend/public/resume.pdf to enable direct download!");
            }}
            className="px-6 py-3 text-sm font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 rounded-full transition-all duration-200"
          >
            📄 Download Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-700/70 rounded-full transition-all duration-200"
          >
            💬 Contact Me
          </a>
        </div>

        {/* Key Stats Counter Grid */}
        <div className="mt-14 pt-10 border-t border-gray-800/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {s.value}
              </div>
              <div className="text-xs text-gray-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Hero;
