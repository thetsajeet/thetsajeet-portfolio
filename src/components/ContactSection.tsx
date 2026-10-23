import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { Mail, Check, ExternalLink, FileText, Send, Github } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    sound.chime();
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    sound.chime();
    setInquirySent(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
    setTimeout(() => {
      setInquirySent(false);
      setInquiryOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2400);
  };

  return (
    <section id="contact" className="w-full py-24 md:py-36 border-b border-neutral-200 bg-white">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Call to action headline */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 max-w-3xl leading-[1.15]">
          Looking for a senior software engineer?
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-xl font-normal">
          I'd love to hear what you're building and explore how I could contribute to your engineering team, UI architecture, or distributed backend systems.
        </p>

        {/* 4-Column Hairline Joined Links with Liquid Hover */}
        <div className="mt-14 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 border border-neutral-300 divide-y sm:divide-y-0 sm:divide-x divide-neutral-300">
          {/* Email Button */}
          <button
            onClick={copyEmail}
            className="h-16 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider liquid-button hover:bg-neutral-900 text-neutral-900 transition-colors cursor-pointer group"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                <span>Email</span>
              </>
            )}
          </button>

          {/* GitHub Button */}
          <a
            href={PORTFOLIO_DATA.profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.drop(800)}
            className="h-16 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider liquid-button hover:bg-neutral-900 text-neutral-900 transition-colors cursor-pointer group"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
          </a>

          {/* LinkedIn Button */}
          <a
            href={PORTFOLIO_DATA.profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.drop(800)}
            className="h-16 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider liquid-button hover:bg-neutral-900 text-neutral-900 transition-colors cursor-pointer group"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
          </a>

          {/* Resume Button */}
          <button
            onClick={() => {
              sound.tick();
              onOpenResume();
            }}
            className="h-16 flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider liquid-button hover:bg-neutral-900 text-neutral-900 transition-colors cursor-pointer group"
          >
            <FileText className="w-4 h-4 text-neutral-500 group-hover:text-white" />
            <span>Resume</span>
          </button>
        </div>

        {/* Direct Quick Note Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              sound.whoosh();
              setInquiryOpen(true);
            }}
            className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-sm font-medium tracking-wide flex items-center gap-2 shadow-sm transition-all hover:scale-105 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send a quick direct message</span>
          </button>
          <span className="text-xs font-mono text-neutral-400">
            Usually responds within 24 hours
          </span>
        </div>
      </div>

      {/* Quick Message Modal Drawer */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setInquiryOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition-colors"
            >
              ✕
            </button>

            {inquirySent ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-medium text-neutral-900">Message Delivered</h3>
                <p className="mt-2 text-neutral-600 text-sm max-w-xs">
                  Thank you! Ajeet has received your note and will get back to you shortly at your email.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Direct Inquiries
                </span>
                <h3 className="text-2xl font-medium tracking-tight text-neutral-900 mt-1">
                  Get in touch with Ajeet
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Have an engineering opportunity, open source collaboration, or technical problem? Let's connect.
                </p>

                <form onSubmit={handleSubmitInquiry} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-black focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-black focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me a bit about your engineering stack, challenges, or timeline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-black focus:outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Direct to {PORTFOLIO_DATA.profile.email}</span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
