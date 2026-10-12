import React from 'react';

function Skills() {
  const skillCategories = [
    {
      category: 'Target Modern Frontend',
      badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20',
      description: 'Building reactive, component-driven interfaces that replace legacy templates.',
      skills: [
        { name: 'React', level: 'Core Competency', icon: '⚛️' },
        { name: 'Tailwind CSS v4', level: 'Advanced', icon: '🎨' },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: '💛' },
        { name: 'SPA Routing & State', level: 'Intermediate', icon: '🔄' },
        { name: 'Chart.js / Analytics', level: 'Intermediate', icon: '📈' },
      ],
    },
    {
      category: 'High-Performance Backend (Go)',
      badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-950/20',
      description: 'Building concurrent, low-latency microservices for high throughput.',
      skills: [
        { name: 'Go (Golang)', level: 'Actively Building', icon: '🔷' },
        { name: 'Goroutines & Channels', level: 'Foundational', icon: '⚡' },
        { name: 'net/http REST APIs', level: 'Intermediate', icon: '🔌' },
        { name: 'JSON Serialization', level: 'Intermediate', icon: '📦' },
        { name: 'Low-latency Routing', level: 'Foundational', icon: '🚦' },
      ],
    },
    {
      category: 'Legacy Foundation & Database',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-950/20',
      description: 'Deep background in maintaining production systems and managing databases.',
      skills: [
        { name: 'PHP (Procedural & OOP)', level: '2+ Years Production', icon: '🐘' },
        { name: 'MySQL / Database Tuning', level: 'Intermediate', icon: '🐬' },
        { name: 'Legacy Refactoring', level: 'Specialist', icon: '🛠️' },
        { name: 'Telephony ACD Architecture', level: 'Domain Expertise', icon: '📞' },
        { name: 'Apache / Server Config', level: 'Working Knowledge', icon: '🪶' },
      ],
    },
    {
      category: 'Tools & DevOps Workflow',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/20',
      description: 'Development, API testing, and version control tools.',
      skills: [
        { name: 'Git & GitHub', level: 'Daily Workflow', icon: '🐙' },
        { name: 'Postman (API Testing)', level: 'Intermediate', icon: '📮' },
        { name: 'Vite Build Tool', level: 'Intermediate', icon: '⚡' },
        { name: 'Windows / Linux Terminal', level: 'Proficient', icon: '💻' },
        { name: 'npm / Package Ecosystem', level: 'Intermediate', icon: '📦' },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">Technical Toolkit</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white">Full-Stack Skills Across Two Eras</h3>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Proven proficiency in legacy infrastructure alongside modern reactive web and concurrent backend stacks.
        </p>
      </div>

      {/* Grid of 4 Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/80 hover:border-gray-700 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${cat.badgeColor} mb-3`}>
                {cat.category}
              </div>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                {cat.description}
              </p>

              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-800/40 hover:bg-gray-800/70 border border-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{skill.icon}</span>
                      <span className="text-gray-200 text-xs sm:text-sm font-medium">{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 px-2 py-0.5 rounded bg-gray-900/60 border border-gray-700/40">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
