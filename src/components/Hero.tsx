import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Send, Camera } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { translations } from '../data/portfolioData';

interface HeroProps {
  profile: PortfolioProfile;
  lang: 'en' | 'bn';
  onNavigate: (sectionId: string) => void;
  onUploadPhoto?: (photoUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  lang,
  onNavigate,
  onUploadPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang].hero;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadPhoto) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine line 1 and line 2 based on language and custom names
  const line1 = lang === 'bn' ? (profile.nameLine1 === 'MD TAREK' ? 'এমডি তারেক' : profile.nameLine1) : profile.nameLine1;
  const line2 = lang === 'bn' ? (profile.nameLine2 === 'AZIZ' ? 'আজিজ' : profile.nameLine2) : profile.nameLine2;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="grid lg:grid-cols-2 gap-12 items-center"
    >
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Left Column: Text & CTAs */}
      <div>
        {/* Animated Role Pill */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6,205,255,0.5)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(6,205,255,0.3)' }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1a1a] border border-[#262626] rounded-full text-xs font-bold text-[#06cdff] mb-6 cursor-pointer hover:border-[#06cdff] transition-all duration-300"
        >
          <span className="w-2 h-2 bg-[#06cdff] rounded-full animate-pulse" />
          <span>{t.role}</span>
        </motion.div>

        {/* Huge Headline: Line 1 (White) + Line 2 (#06cdff) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-[0.95] text-white cursor-pointer select-none"
        >
          {line1} <br />
          <span className="text-[#06cdff]">{line2}</span>
        </motion.h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-neutral-400 mb-8 max-w-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t.desc }}
        />

        {/* CTAs & Availability */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            {/* Projects Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6,205,255,0.5)' }}
              whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(6,205,255,0.3)' }}
              onClick={() => onNavigate('projects')}
              className="w-full bg-[#06cdff] text-black px-4 py-4 rounded-xl font-bold hover:bg-[#05b8e6] transition-colors relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,205,255,0.3)]"
            >
              <Play size={18} fill="black" className="text-black" />
              <span>{t.projects}</span>
            </motion.button>

            {/* Contact Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6,205,255,0.5)' }}
              whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(6,205,255,0.3)' }}
              onClick={() => onNavigate('contact')}
              className="w-full border border-[#262626] px-4 py-4 rounded-xl font-bold hover:bg-[#1a1a1a] transition-colors relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer text-white"
            >
              <Send size={18} />
              <span>{t.contact}</span>
            </motion.button>
          </div>

          {/* Availability Status Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
            <span className="w-2 h-2 bg-[#06cdff] rounded-full animate-pulse" />
            <span className="text-[#06cdff] font-medium">{t.available}</span>
            <span className="text-neutral-600">•</span>
            <span>{t.location}</span>
          </div>
        </div>
      </div>

      {/* Right Column: Exact Photo & Glow Background matching mohiuddinmahim.vercel.app */}
      <div className="relative flex justify-center">
        <div className="relative group">
          {/* EXACT GLOW BEHIND PHOTO: radial blur aura behind the frame */}
          <div className="absolute -inset-3 bg-[#06cdff] blur-2xl opacity-25 rounded-3xl transition-all duration-500 group-hover:opacity-60 group-hover:blur-3xl" />

          {/* Portrait Container with rounded frame and glowing border */}
          <div className="w-[300px] sm:w-[380px] md:w-[420px] aspect-[4/5] sm:aspect-square rounded-3xl relative overflow-hidden border border-[#262626] group-hover:border-[#06cdff]/70 transition-all duration-500 group-hover:scale-[1.02] cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#121212]">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={profile.heroImage}
              alt={profile.name}
              className="w-full h-full object-cover object-top select-none transition-transform duration-700"
            />

            {/* Subtle bottom gradient for cinematic depth and integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

            {/* Top right creative badge */}
            <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#06cdff]/40 text-[#06cdff] text-[10px] font-mono tracking-wider font-bold shadow-lg flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06cdff] animate-pulse" />
              <span>VISUALIZER</span>
            </div>

            {/* Change Photo Floating Badge */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-3.5 py-1.5 bg-[#0a0a0a]/90 hover:bg-[#06cdff] hover:text-black text-white text-xs font-semibold rounded-full border border-neutral-700/80 hover:border-[#06cdff] transition-all shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer"
              >
                <Camera size={13} />
                <span>{lang === 'bn' ? 'ছবি পরিবর্তন করুন' : 'Change Photo'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
