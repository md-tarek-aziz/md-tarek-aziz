import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, CheckCircle, Zap } from 'lucide-react';
import {
  defaultAcademic,
  defaultTraining,
  translations,
} from '../data/portfolioData';

interface EducationSectionProps {
  lang: 'en' | 'bn';
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  const t = translations[lang].education;

  return (
    <section id="education" className="py-20 max-w-7xl mx-auto">
      {/* Pill Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(6,205,255,0.55)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(6,205,255,0.3)' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0a0a0a] border border-[#06cdff] rounded-full text-xs font-bold text-[#06cdff] mb-4 shadow-[0_0_15px_rgba(6,205,255,0.35)] cursor-pointer hover:border-[#06cdff] transition-all duration-300 select-none"
        >
          <GraduationCap size={16} className="text-[#06cdff]" />
          <span>
            {lang === 'bn' ? 'শিক্ষা ও প্রফেশনাল স্কিলস' : 'EDUCATION & PROFESSIONAL SKILLS'}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-white select-none cursor-pointer tracking-tight"
        >
          {lang === 'bn' ? (
            <>
              আমার শিক্ষা ও <span className="text-[#06cdff]">সৃজনশীল দক্ষতা</span>
            </>
          ) : (
            <>
              My Education & <span className="text-[#06cdff]">Creative Learning</span>
            </>
          )}
        </motion.h2>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl text-center leading-relaxed">
          {lang === 'bn'
            ? 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে প্রফেশনাল ক্রিয়েটিভ ট্রেনিংয়ের পাশাপাশি একাডেমিক ব্যাকগ্রাউন্ড'
            : 'Academic credentials alongside professional creative training from As-Sunnah Skill Development Institute'}
        </p>
      </div>

      {/* 3 Academic Cards (Directly matching screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {defaultAcademic.map((item, idx) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="group border border-[#06cdff]/30 rounded-3xl p-6 bg-[#0a0a0a]/70 backdrop-blur shadow-[0_0_15px_rgba(6,205,255,0.1)] hover:border-[#06cdff] hover:shadow-[0_0_25px_rgba(6,205,255,0.35)] transition-all duration-300 flex flex-col"
          >
            {/* Top row: Book icon & Year tag */}
            <div className="flex justify-between items-start mb-4">
              <motion.div
                whileHover={idx === 0 ? { y: -6 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="text-[#06cdff] p-2.5 rounded-xl border border-[#06cdff]/30 bg-[#1a1a1a]/50 shadow-[0_0_10px_rgba(6,205,255,0.2)]"
              >
                <BookOpen size={20} />
              </motion.div>
              <span className="text-xs font-bold bg-[#1a1a1a] px-2.5 py-1 rounded border border-[#262626] text-neutral-300">
                {item.year}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h4 className="font-bold text-lg text-white mb-1 group-hover:text-[#06cdff] transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-[#06cdff] mb-3 font-bold">
              {item.desc}
            </p>

            {/* Description */}
            <p className="text-sm text-neutral-400 mb-6 flex-grow leading-relaxed">
              {item.fullDesc}
            </p>

            {/* Divider & Status */}
            <div className="border-t border-[#262626] pt-4 mt-auto">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-neutral-500">Status:</span>
                <span className="text-[#06cdff] group-hover:drop-shadow-[0_0_8px_rgba(6,205,255,0.8)] transition-all duration-300">
                  {item.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Part 2: Professional Skill Development (Exact Screenshot Match) */}
      <motion.div
        whileHover={{ borderColor: '#06cdff' }}
        className="border border-[#06cdff]/30 rounded-3xl sm:rounded-[32px] p-6 sm:p-8 md:p-10 bg-[#0a0a0a]/80 backdrop-blur transition-all duration-300 hover:border-[#06cdff] hover:shadow-[0_0_30px_rgba(6,205,255,0.2)]"
      >
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#141414] border border-[#06cdff]/30 flex items-center justify-center text-[#06cdff] shadow-[0_0_10px_rgba(6,205,255,0.2)]">
              <GraduationCap size={20} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              {lang === 'bn' ? 'পার্ট ২: প্রফেশনাল স্কিল ডেভেলপমেন্ট' : 'Part 2: Professional Skill Development'}
            </h3>
          </div>

          <span className="px-3.5 py-1 rounded-full border border-[#06cdff]/40 bg-[#141414] text-xs font-bold text-[#06cdff] shadow-[0_0_10px_rgba(6,205,255,0.2)]">
            {defaultTraining.batch}
          </span>
        </div>

        {/* Institution Info */}
        <p className="text-xs sm:text-sm text-neutral-400 mt-4 mb-2 font-mono">
          {defaultTraining.institute} • SBMC
        </p>

        <h4 className="font-bold text-2xl sm:text-3xl text-white mb-2 tracking-tight">
          {defaultTraining.institute}
        </h4>
        <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-3xl leading-relaxed">
          {defaultTraining.description}
        </p>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {defaultTraining.badges.map((badge) => (
            <span
              key={badge}
              className="px-3.5 py-1.5 bg-[#141414] border border-[#262626] text-[#06cdff] text-xs rounded-full font-bold"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Core Competencies Header */}
        <h5 className="font-bold text-sm sm:text-base mb-4 flex items-center gap-2 text-white tracking-wide">
          <CheckCircle size={18} className="text-[#06cdff]" />
          <span>CORE COMPETENCIES ACQUIRED:</span>
        </h5>

        {/* Competency 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {defaultTraining.competencies.map((comp) => (
            <div
              key={comp.title}
              className="p-4 sm:p-5 bg-[#121212] rounded-2xl border border-[#222222] hover:border-[#06cdff]/40 transition-colors"
            >
              <h6 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <CheckCircle size={16} className="text-[#06cdff] shrink-0" />
                <span>{comp.title}</span>
              </h6>
              <p className="text-xs text-neutral-400 font-mono ml-6">
                {comp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner Row matching Screenshot */}
        <div className="border-t border-[#1f1f1f] pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base">
            <Zap size={20} className="text-[#06cdff]" />
            <span>
              {lang === 'bn' ? 'বাস্তব প্রজেক্টের হ্যান্ডস-অন অভিজ্ঞতা' : 'Hands-on Real Project Execution'}
            </span>
          </div>

          <span className="px-5 py-2 rounded-full border border-[#06cdff] bg-[#141414] text-xs font-extrabold text-[#06cdff] shadow-[0_0_15px_rgba(6,205,255,0.35)] select-none">
            {lang === 'bn' ? 'ইন্ডাস্ট্রি রেডি' : 'INDUSTRY READY'}
          </span>
        </div>
      </motion.div>
    </section>
  );
};
