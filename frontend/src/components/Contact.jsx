import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, message: '' });

    try {
      // NOTE: In Phase 2, this will send a real POST request to http://localhost:8080/api/contact
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        submitting: false,
        success: true,
        message: 'Thank you for reaching out! (Ready to connect with Go Backend 🚀)',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-2">Get In Touch</h2>
        <h3 className="text-3xl sm:text-4xl font-bold text-white">Let's Work Together</h3>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
          Have an opportunity, project proposal, or want to collaborate? Send a message.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-10 items-start">
        
        {/* Contact Information Cards */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-7 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-5">
            <h4 className="text-xl font-bold text-white">Contact Information</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Available for full-time opportunities, contract development, and consulting on real-time dashboards & full stack applications.
            </p>

            <div className="space-y-4 text-sm text-gray-300">
              <a
                href="mailto:narasimman14306@gmail.com"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-800/80 border border-gray-700/40 transition-colors group"
              >
                <span className="p-2.5 rounded-lg bg-gray-800 text-cyan-400 text-base">📧</span>
                <div>
                  <div className="text-xs text-gray-400">Email Me</div>
                  <div className="font-medium text-white group-hover:text-cyan-300">narasimman14306@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/narasimman14306-web"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-800/40 hover:bg-gray-800/80 border border-gray-700/40 transition-colors group"
              >
                <span className="p-2.5 rounded-lg bg-gray-800 text-purple-400 text-base">🐙</span>
                <div>
                  <div className="text-xs text-gray-400">GitHub Profile</div>
                  <div className="font-medium text-white group-hover:text-purple-300">github.com/narasimman14306-web</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-800/40 border border-gray-700/40">
                <span className="p-2.5 rounded-lg bg-gray-800 text-indigo-400 text-base">📍</span>
                <div>
                  <div className="text-xs text-gray-400">Location</div>
                  <div className="font-medium text-white">India</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-gray-800/40 border border-gray-700/40">
                <span className="p-2.5 rounded-lg bg-gray-800 text-emerald-400 text-base">⚡</span>
                <div>
                  <div className="text-xs text-gray-400">Response Window</div>
                  <div className="font-medium text-emerald-300">Within 24 Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3 p-8 rounded-2xl bg-gray-900/60 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Job Opportunity / Dashboard Inquiry"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/80 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none"
              ></textarea>
            </div>

            {/* Status Feedback Notification */}
            {status.message && (
              <div
                className={`p-3.5 rounded-xl text-sm font-medium ${
                  status.success
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                    : 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.submitting}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-600/25 active:scale-[0.99] text-sm"
            >
              {status.submitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;
