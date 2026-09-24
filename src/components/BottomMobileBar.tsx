import React from 'react';
import { Home, Briefcase, Cpu, GraduationCap, Mail } from 'lucide-react';
import { translations } from '../data/portfolioData';

interface BottomMobileBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  lang: 'en' | 'bn';
}

export const BottomMobileBar: React.FC<BottomMobileBarProps> = ({
  activeSection,
  onNavigate,
  lang,
}) => {
  const t = translations[lang].nav;

  const items = [
    { id: 'home', label: t.home, icon: <Home size={18} /> },
    { id: 'projects', label: t.projects, icon: <Briefcase size={18} /> },
    { id: 'expertise', label: t.expertise, icon: <Cpu size={18} /> },
    { id: 'education', label: t.education, icon: <GraduationCap size={18} /> },
    { id: 'contact', label: t.contact, icon: <Mail size={18} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#262626] px-2 py-2">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              activeSection === item.id
                ? 'text-[#06cdff] font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div
              className={`p-1 rounded-lg ${
                activeSection === item.id ? 'bg-[#1a1a1a] shadow-[0_0_10px_rgba(6,205,255,0.3)]' : ''
              }`}
            >
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
