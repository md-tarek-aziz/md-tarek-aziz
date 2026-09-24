import React from 'react';
import { Zap, MessageCircle, FileText, Settings } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { translations } from '../data/portfolioData';

interface NavbarProps {
  profile: PortfolioProfile;
  lang: 'en' | 'bn';
  onToggleLang: (l: 'en' | 'bn') => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  lang,
  onToggleLang,
  activeSection,
  onNavigate,
  onOpenCustomizer,
}) => {
  const t = translations[lang].nav;

  const handleDownloadCV = () => {
    // Generate a printable CV view or download
    window.print();
  };

  return (
    <nav className="fixed top-6 w-full z-50 px-4">
      <div className="max-w-7xl mx-auto bg-[#0a0a0a]/90 backdrop-blur-md border border-[#262626] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center shadow-2xl">
        {/* Brand identity */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#06cdff] rounded-xl flex items-center justify-center text-black shrink-0 transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(6,205,255,0.4)]">
            <Zap size={20} fill="black" className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm leading-tight whitespace-nowrap text-white group-hover:text-[#06cdff] transition-colors">
              {profile.name}
            </span>
            <span className="text-[8px] sm:text-[10px] text-[#06cdff] uppercase tracking-widest font-bold whitespace-nowrap">
              Visualizer & Video Editor
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center bg-[#0a0a0a] border border-[#262626] rounded-full p-1 text-xs sm:text-sm font-medium text-neutral-400 shrink-0">
          {(['home', 'projects', 'expertise', 'education', 'contact'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => onNavigate(sec)}
              className={`px-3 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeSection === sec
                  ? 'bg-[#1a1a1a] text-[#06cdff] font-bold shadow-[0_0_10px_rgba(6,205,255,0.2)]'
                  : 'hover:text-white'
              }`}
            >
              {t[sec]}
            </button>
          ))}
        </div>

        {/* Right side CTAs */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-full px-2 py-1 flex items-center gap-1 text-[10px] sm:text-xs font-bold">
            <button
              onClick={() => onToggleLang('en')}
              className={`px-1 rounded cursor-pointer transition-colors ${
                lang === 'en' ? 'text-[#06cdff]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <span className="text-neutral-600">/</span>
            <button
              onClick={() => onToggleLang('bn')}
              className={`px-1 rounded cursor-pointer transition-colors ${
                lang === 'bn' ? 'text-[#06cdff]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              বাং
            </button>
          </div>

          {/* Download CV */}
          <button
            onClick={handleDownloadCV}
            className="bg-[#262626] text-white px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 hover:bg-[#333] transition-colors cursor-pointer"
          >
            <FileText size={13} />
            <span className="hidden sm:inline">{t.cv}</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Let's Talk CTA */}
          <button
            onClick={() => onNavigate('contact')}
            className="bg-[#06cdff] text-black px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#05b8e6] transition-all shadow-[0_0_15px_rgba(6,205,255,0.3)] hover:scale-105 cursor-pointer"
          >
            <MessageCircle size={14} className="fill-black text-black" />
            <span>{t.talk}</span>
          </button>

          {/* Quick Customizer Toggle */}
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              title="Edit Profile"
              className="p-1.5 rounded-full text-neutral-400 hover:text-[#06cdff] hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              <Settings size={15} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
