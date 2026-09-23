import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clapperboard,
  Palette,
  Eye,
  FileText,
  Mic,
  Users,
  Sliders,
  X,
  Star,
  CheckCircle2,
} from 'lucide-react';
import {
  defaultExpertise,
  defaultSoftwareProficiency,
  translations,
} from '../data/portfolioData';

interface SkillsStackProps {
  lang: 'en' | 'bn';
}

export const SkillsStack: React.FC<SkillsStackProps> = ({ lang }) => {
  const t = translations[lang].expertise;
  const [modalOpen, setModalOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
      case 'clapperboard':
        return <Clapperboard size={22} className="text-[#d4f826]" />;
      case 'palette':
        return <Palette size={22} className="text-[#d4f826]" />;
      case 'eye':
        return <Eye size={22} className="text-[#d4f826]" />;
      case 'file-text':
      case 'feather':
        return <FileText size={22} className="text-[#d4f826]" />;
      case 'mic':
        return <Mic size={22} className="text-[#d4f826]" />;
      case 'users':
        return <Users size={22} className="text-[#d4f826]" />;
      default:
        return <Star size={22} className="text-[#d4f826]" />;
    }
  };

  return (
    <section id="expertise" className="py-20 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        {/* Star Badge Pill: Stays firmly in place with no scroll animation. On cursor hover, lighting stroke and glow appears */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(212,248,38,0.55)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(212,248,38,0.3)' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#141414] border border-[#2a2a2a] rounded-full text-xs font-bold text-[#d4f826] mb-4 cursor-pointer hover:border-[#d4f826] transition-all duration-300 select-none"
        >
          <Star size={14} className="fill-[#d4f826] text-[#d4f826]" />
          <span>{t.title.toUpperCase()}</span>
        </motion.div>

        {/* Big Bold Headline: Smoothly rises up from bottom when scrolled down into view */}
        <motion.h2
          initial={{ opacity: 0, y: 65 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.02 }}
          className="text-4xl sm:text-6xl font-extrabold mb-4 text-white select-none tracking-tight cursor-pointer"
        >
          {lang === 'bn' ? (
            <>
              মূল দক্ষতা ও <span className="text-[#d4f826]">গুণাবলি</span>
            </>
          ) : (
            <>
              Core Expertise & <span className="text-[#d4f826]">Skills</span>
            </>
          )}
        </motion.h2>
      </div>

      {/* 2-Column Grid Matching User Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 mb-12">
        {defaultExpertise.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-7 rounded-[24px] bg-[#0c0c0c] border border-[#222222] hover:border-[#d4f826]/60 hover:shadow-[0_0_22px_rgba(212,248,38,0.16)] transition-all duration-300 group cursor-default"
          >
            {/* Horizontal Layout: Icon on the side, Content on right */}
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Left Side Icon Box */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-[#141414] border border-[#262626] group-hover:border-[#d4f826]/50 group-hover:bg-[#1a1a1a] transition-all duration-300">
                {getIcon(item.icon)}
              </div>

              {/* Right Side Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase group-hover:text-[#d4f826] transition-colors">
                  {lang === 'bn' ? item.titleBn : item.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-2">
                  {lang === 'bn' ? item.descBn : item.descEn}
                </p>

                {/* Software Pills */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#181818] border border-[#d4f826]/30 text-[#d4f826] transition-colors shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Matrix Modal Trigger */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.04, borderColor: '#d4f826', boxShadow: '0 0 20px rgba(212,248,38,0.25)' }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-[#141414] border border-[#262626] text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all shadow-lg cursor-pointer"
        >
          <Sliders size={16} className="text-[#d4f826]" />
          <span className="text-white">{t.proficiency}</span>
        </motion.button>
      </div>

      {/* Software Proficiency Matrix Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#d4f826]/10 border border-[#d4f826]/30 flex items-center justify-center text-[#d4f826]">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'bn' ? 'সফ্টওয়্যার প্রফিসিয়েন্সি ম্যাট্রিক্স' : 'Software Proficiency Matrix'}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {lang === 'bn' ? 'প্রোডাকশন টুলসের ব্যবহারিক দক্ষতা' : 'Hands-on production suite proficiency breakdown'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {defaultSoftwareProficiency.map((tool) => (
                  <div key={tool.name} className="p-3.5 rounded-xl bg-[#141414] border border-[#262626]">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#d4f826]" />
                        <span className="text-sm font-bold text-white">{tool.name}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">({tool.category})</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#d4f826]">
                        {tool.level}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tool.level}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-[#d4f826] rounded-full shadow-[0_0_10px_rgba(212,248,38,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

