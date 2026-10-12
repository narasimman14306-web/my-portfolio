import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-[#090d16] py-10 px-6 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} <span className="text-white font-semibold">Narasimman</span>. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span>Engineered with</span>
          <span className="text-cyan-400 font-semibold">React</span>
          <span>&</span>
          <span className="text-sky-400 font-semibold">Golang</span>
        </div>

        <div className="flex items-center gap-5 text-xs font-semibold">
          <a
            href="https://github.com/narasimman14306-web"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="#hero"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
