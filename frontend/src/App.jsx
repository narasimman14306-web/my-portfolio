import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 antialiased selection:bg-indigo-500 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Me Section */}
        <About />

        {/* 4. Professional Work Experience Timeline */}
        <Experience />

        {/* 5. Skills & Technologies */}
        <Skills />

        {/* 6. Featured Production & Technical Projects */}
        <Projects />

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

export default App;
