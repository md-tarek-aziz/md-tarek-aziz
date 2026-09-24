import React from 'react';
import { ChevronUp } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { motion } from 'motion/react';

interface FooterProps {
  profile: PortfolioProfile;
  lang: 'en' | 'bn';
}

export const Footer: React.FC<FooterProps> = ({ profile, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: lang === 'bn' ? 'আমার প্রজেক্ট' : 'My Projects', href: '#projects' },
    { name: lang === 'bn' ? 'দক্ষতাসমূহ' : 'Core Expertise', href: '#skills' },
    { name: lang === 'bn' ? 'শিক্ষা' : 'Education', href: '#education' },
    { name: lang === 'bn' ? 'যোগাযোগ' : 'Contact', href: '#contact' },
  ];

  return (
    <footer className="pt-20 pb-10 border-t border-[#262626] px-6 sm:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand & Bio */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#06cdff] flex items-center justify-center text-black font-extrabold text-base select-none shadow-[0_0_15px_rgba(6,205,255,0.4)]">
                {profile.name ? profile.name.trim().charAt(0) : 'T'}
              </div>
              <div>
                <h4 className="font-bold text-white text-lg block leading-tight">
                  {profile.name || 'Md Tarek Aziz'}
                </h4>
                <p className="text-xs font-bold text-[#06cdff] tracking-wider uppercase block">
                  VISUALIZER & VIDEO EDITOR
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed mt-2">
              Visualizer & Video Editor • Specializing in high-retention video editing, cinematic color grading, and comprehensive brand identity systems.
            </p>
          </div>

          {/* Navigation Links & Scroll-to-Top Button */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-neutral-400 font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}

            <motion.button
              whileHover={{ scale: 1.08, borderColor: '#06cdff', backgroundColor: '#1f1f1f' }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] text-white flex items-center justify-center transition-all cursor-pointer shadow-md ml-2"
              title="Back to Top"
            >
              <ChevronUp size={20} />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© 2026 {profile.name || 'Mohiuddin Mahim'}. All rights reserved.</p>

          <p className="flex items-center gap-2 font-mono text-[11px]">
            <span>footer.status</span>
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
};
