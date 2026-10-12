import React from 'react';

function Experience() {
  const experiences = [
    {
      stage: 'Stage 3: Current Architecture',
      role: 'Go (Golang) Backend Engineering & API Migration',
      company: 'High-Performance API Infrastructure',
      period: '2024 - Present',
      badge: 'Modern Backend',
      badgeColor: 'text-sky-300 bg-sky-950/40 border-sky-800/40',
      description:
        'Migrating bottleneck PHP backend endpoints into lightweight, concurrent Go REST microservices to handle high-throughput telemetry data with sub-millisecond latencies.',
      details: [
        'Rewriting monolithic PHP API endpoints into idiomatic Go handlers using net/http and structured JSON serialization.',
        'Leveraging Go goroutines and channels to process asynchronous agent events and call logs concurrently.',
        'Eliminating heavy PHP runtime memory overhead, resulting in significantly lower server CPU and RAM consumption.',
        'Building robust REST interfaces consumed seamlessly by React single-page dashboard clients.',
      ],
      technologies: ['Go (Golang)', 'REST APIs', 'Goroutines', 'JSON Serialization', 'Postman', 'Microservices'],
    },
    {
      stage: 'Stage 2: Frontend Modernization',
      role: 'React Migration & Interactive Dashboard Development',
      company: 'Single Page Application (SPA) Transition',
      period: '2023 - 2024',
      badge: 'Frontend Modernization',
      badgeColor: 'text-cyan-300 bg-cyan-950/40 border-cyan-800/40',
      description:
        'Transformed legacy multi-page PHP dashboards into a responsive, component-driven React application, eliminating tedious page reloads for call center supervisors.',
      details: [
        'Decoupled monolithic server-rendered HTML/PHP views into reusable, modular React components.',
        'Implemented dynamic state management and polling/asynchronous data fetching for real-time ACD queues, active calls, and agent pause status.',
        'Integrated interactive Chart.js visualizations for Average Waiting Times (AWT), peak call traffic, and agent performance.',
        'Adopted modern utility-first styling (Tailwind CSS) for responsive layouts across all monitor resolutions.',
      ],
      technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite', 'State Management', 'REST Integration'],
    },
    {
      stage: 'Stage 1: The Foundation',
      role: 'Legacy PHP & Database Systems Maintenance',
      company: 'Telephony & Cybercrime Operations Core',
      period: '2022 - 2023',
      badge: 'System Maintenance',
      badgeColor: 'text-amber-300 bg-amber-950/40 border-amber-800/40',
      description:
        'Deep-dive maintenance and feature expansion of legacy procedural PHP applications managing mission-critical call centers and cybercrime reporting databases.',
      details: [
        'Maintained complex PHP modules for agent status tracking (ACD, on-call, pause states, wrap-up timers, and unpicked calls).',
        'Managed and optimized relational MySQL queries, table indexing, and campaign session data bindings.',
        'Diagnosed latency bottlenecks caused by frequent browser refreshes and heavy server-side query loads.',
        'Identified the architectural need to transition from procedural monolith to decoupled React + Go stack.',
      ],
      technologies: ['PHP', 'MySQL', 'Procedural Architecture', 'Apache / XAMPP', 'Telephony ACD', 'JavaScript'],
    },
  ];

  return (
    <section id="experience" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">Architectural Evolution</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white">From Legacy PHP to React & Go</h3>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          My engineering journey of maintaining production PHP monoliths and leading their transition into a lightning-fast React frontend and Go backend architecture.
        </p>
      </div>

      {/* Migration Timeline */}
      <div className="relative border-l border-gray-800 ml-4 sm:ml-8 space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 sm:pl-12 group">
            {/* Timeline Node Bullet */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-gray-900 border-2 border-cyan-400 group-hover:scale-125 group-hover:border-indigo-400 transition-all duration-200"></div>

            {/* Experience Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-gray-700/80 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-cyan-400 tracking-wide uppercase">
                  {exp.stage}
                </span>
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${exp.badgeColor}`}>
                  {exp.badge}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h4>
                  <div className="text-sm font-medium text-indigo-400">
                    {exp.company}
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-800/80 px-3 py-1 rounded-full border border-gray-700/50 w-fit">
                  {exp.period}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Achievements Bullet Points */}
              <div className="space-y-2 mb-5">
                {exp.details.map((item, dIdx) => (
                  <div key={dIdx} className="text-xs sm:text-sm text-gray-400 flex items-start gap-2.5">
                    <span className="text-cyan-400 mt-0.5">▸</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/60">
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-800/80 text-gray-300 border border-gray-700/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
