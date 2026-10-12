import React from 'react';

function About() {
  const comparison = [
    {
      aspect: 'Frontend Architecture',
      before: 'Procedural PHP rendering full HTML pages with server reloads',
      after: 'React SPA with dynamic components, state management & Tailwind CSS',
    },
    {
      aspect: 'Backend & Data Flow',
      before: 'Tightly coupled PHP scripts querying MySQL on every page request',
      after: 'Decoupled Go RESTful APIs with structured JSON & sub-millisecond responses',
    },
    {
      aspect: 'Concurrency & Traffic',
      before: 'Heavy PHP process spawning causing server memory spikes during peak calls',
      after: 'Go lightweight Goroutines handling concurrent dashboard telemetry effortlessly',
    },
    {
      aspect: 'User Experience',
      before: 'Static tables requiring manual browser refresh for latest agent states',
      after: 'Live auto-updating dashboard with fluid Chart.js analytics & instant updates',
    },
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">Engineering Philosophy</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white">Full Stack Evolution & Modernization</h3>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          From maintaining complex legacy PHP systems to engineering modern, decoupled React frontends and Golang backend microservices.
        </p>
      </div>

      <div className="space-y-12">
        {/* Story Narrative Box */}
        <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
          <p>
            Hello! I am <span className="text-white font-semibold">Narasimman</span>. My software journey began with deep hands-on maintenance of high-pressure, production telephony and cybercrime monitoring software built on <span className="text-amber-400 font-semibold">PHP & MySQL</span>.
          </p>
          <p>
            While maintaining these legacy systems, I managed mission-critical modules like real-time agent tracking (ACD status, on-call timers, pause queues, and campaign binders). However, as call volumes grew, the limitations of monolithic, server-rendered PHP became clear: high server memory usage, synchronous execution, and constant page flickering.
          </p>
          <p>
            Recognizing these architectural bottlenecks, I spearheaded a modernization transition:
            rebuilding the user interface into a lightning-fast <span className="text-cyan-400 font-semibold">React Single Page Application</span>, and transitioning backend data pipelines into <span className="text-sky-400 font-semibold">Go (Golang)</span>. Golang's compiled speed, minimal resource footprint, and native concurrency provide the ideal engine for demanding real-time dashboards.
          </p>
        </div>

        {/* Before vs After Architecture Comparison Card */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span>⚡ Architecture Transformation:</span>
            <span className="text-amber-400">Legacy PHP</span>
            <span className="text-gray-500">➔</span>
            <span className="text-cyan-400">React + Go</span>
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {/* The Legacy PHP Monolith (Before) */}
            <div className="p-6 rounded-2xl bg-amber-950/15 border border-amber-800/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-amber-800/30">
                <span className="font-bold text-amber-300 text-sm">Where I Started: Legacy PHP</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400">
                  Initial Monolith
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✕</span>
                  <span>Direct MySQL queries mixed inside presentation HTML files.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✕</span>
                  <span>Full page reloads interrupting supervisor workflows during live calls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✕</span>
                  <span>PHP synchronous processing causing high memory consumption per request.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✕</span>
                  <span>Difficult to scale, test, or introduce modern responsive UI patterns.</span>
                </li>
              </ul>
            </div>

            {/* The Modernized Stack (After) */}
            <div className="p-6 rounded-2xl bg-cyan-950/15 border border-cyan-800/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-800/30">
                <span className="font-bold text-cyan-300 text-sm">Current Architecture: React & Go</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
                  Modernized Stack
                </span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Decoupled React frontend with smooth component-level state updates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Compiled, ultra-fast Go REST API handlers with sub-millisecond responses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Goroutines handle concurrent telemetry and agent status without blocking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Fluid user experience with Tailwind CSS v4 and live responsive charts.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
