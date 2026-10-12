import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-gray-800/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Brand Logo with User Name */}
        <a href="#hero" className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            N
          </span>
          <span className="font-extrabold text-lg tracking-wide">
            Narasimman<span className="text-cyan-400">.</span>
          </span>
        </a>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>

        {/* CTA Buttons: Resume + Contact */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume download feature: Place your resume PDF in frontend/public/resume.pdf to download!");
            }}
            className="px-4 py-2 text-xs font-semibold text-cyan-300 border border-cyan-500/40 hover:bg-cyan-950/40 rounded-full transition-all duration-200"
          >
            📄 Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-full transition-all duration-200 shadow-md shadow-indigo-600/20 active:scale-95"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0e1322] border-b border-gray-800 px-6 py-4 space-y-3">
          <a href="#about" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">About</a>
          <a href="#experience" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Experience</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Projects</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-cyan-400 py-1">Contact</a>
          <div className="pt-2 border-t border-gray-800">
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume download feature: Place your resume PDF in frontend/public/resume.pdf to download!");
              }}
              className="inline-block text-cyan-400 text-sm font-semibold"
            >
              📄 Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
