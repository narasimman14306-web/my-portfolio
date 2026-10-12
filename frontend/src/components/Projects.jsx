import React from 'react';

function Projects() {
  const projects = [
    {
      title: 'Real-time Telephony & Cybercrime Dashboard',
      description:
        'A mission-critical live monitoring platform for tracking call queues, agent status (ACD, on-call, wrap-up), campaign survey analytics, and missed call metrics in real-time.',
      tags: ['React', 'JavaScript', 'REST APIs', 'Charts', 'Tailwind CSS'],
      badge: 'Production System',
      badgeColor: 'text-amber-300 bg-amber-950/40 border-amber-800/40',
      github: '#',
      demo: '#',
    },
    {
      title: 'High-Performance Go RESTful API Service',
      description:
        'A lightweight and concurrent backend server built with Golang net/http, featuring clean route handlers, high-throughput JSON processing, and contact event handlers.',
      tags: ['Go (Golang)', 'net/http', 'JSON API', 'Concurrency'],
      badge: 'Backend Core',
      badgeColor: 'text-sky-300 bg-sky-950/40 border-sky-800/40',
      github: '#',
      demo: '#',
    },
    {
      title: 'Modern Full-Stack Portfolio Platform',
      description:
        'This developer portfolio engineered with React, Tailwind CSS v4 utility design, modular component patterns, and Go API integration for contact messaging.',
      tags: ['React', 'Tailwind v4', 'Vite', 'Golang API'],
      badge: 'Featured',
      badgeColor: 'text-cyan-300 bg-cyan-950/40 border-cyan-800/40',
      github: 'https://github.com/narasimman14306-web/my-portfolio',
      demo: '#',
    },
    {
      title: 'Interactive Task & Workflow Manager',
      description:
        'A productivity dashboard allowing teams to organize operational tasks, update agent statuses, track progress columns, and maintain instant UI responsiveness.',
      tags: ['React', 'State Management', 'Tailwind CSS', 'Responsive UI'],
      badge: 'Frontend',
      badgeColor: 'text-purple-300 bg-purple-950/40 border-purple-800/40',
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">My Work</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white">Featured Projects & Applications</h3>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Real-world applications spanning live monitoring dashboards, API microservices, and modern web apps.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-7 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-950/40 group"
          >
            <div>
              {/* Badge & Top Row */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${project.badgeColor}`}>
                  {project.badge}
                </span>
                <span className="text-gray-500 group-hover:text-cyan-400 transition-colors text-lg">
                  ↗
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h4>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs px-2.5 py-1 rounded-md bg-gray-800/80 text-gray-300 border border-gray-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="mt-7 pt-4 border-t border-gray-800/60 flex items-center justify-between text-xs font-semibold">
              <a
                href={project.demo}
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>Live Preview</span>
                <span>→</span>
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-1.5"
              >
                <span>GitHub Code</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
