import React from 'react';
import { motion } from 'motion/react';
import { translations } from '../data/portfolioData';

interface StatsBarProps {
  lang: 'en' | 'bn';
}

export const StatsBar: React.FC<StatsBarProps> = ({ lang }) => {
  const t = translations[lang].stats;

  const stats = [
    { label: t.experience, value: '3+ Months', highlight: true },
    { label: t.works, value: '46+', highlight: false },
    { label: t.reach, value: '2.5M+', highlight: true },
    { label: t.satisfaction, value: '99%', suffix: '✓', highlight: false },
  ];

  return (
    <section className="mt-16 rounded-3xl p-6 sm:p-8 bg-[#0a0a0a]/70 backdrop-blur-xl border border-[#d4f826]/20 shadow-2xl flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#262626]/60">
      {stats.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ y: -8 }}
          whileTap={{ y: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="flex-1 text-center cursor-pointer relative p-4 rounded-2xl transition-all duration-300 group"
        >
          {/* Bottom underline accent on hover */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-transparent group-hover:bg-[#d4f826] transition-all duration-300" />
          {/* Subtle neon glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-[#d4f826]/0 group-hover:bg-[#d4f826]/5 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(212,248,38,0.15)] pointer-events-none" />

          <div
            className={`text-3xl sm:text-4xl font-extrabold flex justify-center items-center gap-1 relative z-10 ${
              item.highlight ? 'text-[#d4f826]' : 'text-white'
            }`}
          >
            {item.value}
            {item.suffix && (
              <span className={`text-xl sm:text-2xl ${item.highlight ? 'text-[#d4f826]' : 'text-white'}`}>
                {item.suffix}
              </span>
            )}
          </div>
          <div className="text-neutral-400 text-xs sm:text-sm mt-1 relative z-10 font-medium">
            {item.label}
          </div>
        </motion.div>
      ))}
    </section>
  );
};
