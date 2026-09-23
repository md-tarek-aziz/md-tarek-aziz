import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Facebook,
  Linkedin,
  ExternalLink,
  Clock,
  Home,
  MapPin,
  MessageCircle,
  Smartphone,
  Check,
  Copy,
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';
import { translations } from '../data/portfolioData';

interface ContactSectionProps {
  profile: PortfolioProfile;
  lang: 'en' | 'bn';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, lang }) => {
  const t = translations[lang].contact;
  const [copied, setCopied] = useState(false);

  const emailAddress = profile.email || 'hmtarekaziz00@gmail.com';
  // Direct Google Mail web compose URL that opens Gmail in browser
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactCards = [
    {
      title: lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address',
      name: emailAddress,
      sub: lang === 'bn' ? 'অফিসিয়াল যোগাযোগ ও প্রজেক্ট ব্রিফ' : 'Official inquiries & project briefs',
      action: lang === 'bn' ? 'জিমেইলে পাঠান' : 'Send via Gmail',
      icon: <Mail size={22} />,
      href: gmailComposeUrl,
      isEmail: true,
    },
    {
      title: lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp',
      name: '01883555337',
      sub: lang === 'bn' ? 'তাৎক্ষণিক চ্যাট ও প্রজেক্ট আলোচনা' : 'Instant chat & project discussion',
      action: lang === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন' : 'Chat on WhatsApp',
      icon: <MessageCircle size={22} />,
      href: `https://wa.me/8801883555337`,
    },
    {
      title: lang === 'bn' ? 'ফেসবুক' : 'Facebook',
      name: 'Md Tarek Aziz (Facebook)',
      sub: lang === 'bn' ? 'ফেসবুক প্রোফাইলে যুক্ত হোন' : 'Connect on Facebook profile',
      action: lang === 'bn' ? 'ফেসবুক দেখুন' : 'Visit Facebook',
      icon: <Facebook size={22} />,
      href: 'https://www.facebook.com/md.tarek.aziz.607674',
    },
    {
      title: lang === 'bn' ? 'লিঙ্কডইন' : 'LinkedIn',
      name: 'Mohiuddin Mahim (LinkedIn)',
      sub: lang === 'bn' ? 'লিঙ্কডইনে কানেক্ট করুন' : 'Connect on LinkedIn',
      action: lang === 'bn' ? 'লিঙ্কডইন দেখুন' : 'Visit LinkedIn',
      icon: <Linkedin size={22} />,
      href: 'https://www.linkedin.com/in/mohiuddin-mahim-b6aa5635a/',
    },
  ];

  return (
    <section id="contact" className="py-20 max-w-7xl mx-auto">
      {/* Pill Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(212,248,38,0.55)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(212,248,38,0.3)' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0a0a0a] border border-[#d4f826] rounded-full text-xs font-bold text-[#d4f826] mb-4 shadow-[0_0_15px_rgba(212,248,38,0.35)] cursor-pointer hover:border-[#d4f826] transition-all duration-300 select-none"
        >
          <ExternalLink size={14} className="text-[#d4f826]" />
          <span>{lang === 'bn' ? 'যোগাযোগ করুন' : 'CONTACT ME'}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold mb-4 text-white select-none cursor-pointer tracking-tight"
        >
          {lang === 'bn' ? (
            <>
              সরাসরি <span className="text-[#d4f826]">যোগাযোগ</span>
            </>
          ) : (
            <>
              Get In <span className="text-[#d4f826]">Touch</span>
            </>
          )}
        </motion.h2>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl text-center leading-relaxed">
          {lang === 'bn'
            ? 'ভিডিও এডিটিং, গ্রাফিক্স ডিজাইন বা সৃজনশীল কাজের জন্য সরাসরি যুক্ত হন।'
            : 'Feel free to connect directly for video editing, graphic design, or creative collaboration.'}
        </p>
      </div>

      {/* 4 Contact Cards Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
        {contactCards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{ scale: 1.03 }}
            className="border border-[#262626] rounded-3xl p-6 sm:p-7 bg-[#0a0a0a] hover:border-[#d4f826]/30 transition-all flex flex-col justify-between hover:shadow-[0_0_20px_rgba(212,248,38,0.25)]"
          >
            <div>
              {/* Header: Icon + Titles */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-[#d4f826] shrink-0">
                  {card.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-lg text-white mb-0.5">{card.title}</h4>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-neutral-300 text-sm truncate">{card.name}</p>
                    {'isEmail' in card && card.isEmail && (
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        title="Copy email"
                        className="p-1 rounded bg-[#1a1a1a] hover:bg-[#262626] text-neutral-400 hover:text-[#d4f826] transition-colors cursor-pointer text-xs flex items-center gap-1 shrink-0"
                      >
                        {copied ? <Check size={12} className="text-[#00e676]" /> : <Copy size={12} />}
                        <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-note */}
              <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                {card.sub}
              </p>
            </div>

            {/* Action Button */}
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-[#262626] rounded-2xl text-sm font-bold text-white hover:bg-[#d4f826] hover:text-black hover:border-[#d4f826] transition-all flex items-center justify-center gap-2 cursor-pointer mt-auto"
            >
              <span>{card.action}</span>
              <ExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Bottom Address & Availability Box (Exact Screenshot Match) */}
      <div className="max-w-5xl mx-auto border border-[#262626] rounded-3xl p-6 sm:p-8 bg-[#0a0a0a]">
        {/* Availability Status Badges */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
          <span className="px-4 py-2 bg-[#0a0a0a] rounded-full text-xs font-bold text-[#00e676] border border-[#00e676]/40 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
            <span>Available for Projects</span>
          </span>

          <span className="px-4 py-2 bg-[#0a0a0a] rounded-full text-xs font-bold text-[#d4f826] border border-[#d4f826]/40 flex items-center gap-2">
            <Clock size={14} className="text-[#d4f826]" />
            <span>Response: Within 2 Hours</span>
          </span>
        </div>

        {/* Addresses Box with Lime Outline Container */}
        <div className="border border-[#d4f826]/30 rounded-3xl p-4 sm:p-6 mb-5 shadow-[0_0_15px_rgba(212,248,38,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Permanent Address */}
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 sm:p-6 border border-[#d4f826] rounded-2xl bg-[#0a0a0a] hover:shadow-[0_0_20px_rgba(212,248,38,0.4)] transition-all duration-300"
            >
              <p className="text-xs text-[#d4f826] font-bold mb-3 flex items-center gap-2 uppercase tracking-wide">
                <span className="p-1 rounded-full bg-[#d4f826]/10">
                  <Home size={12} className="text-[#d4f826]" />
                </span>
                <span>PERMANENT ADDRESS</span>
              </p>
              <h5 className="font-bold text-base sm:text-lg text-white mb-1">
                Muslim Para, Hajir hat, Kamalnagar.
              </h5>
              <p className="text-xs sm:text-sm text-neutral-400">Lakshmipur, Bangladesh</p>
            </motion.div>

            {/* Present Address */}
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              className="p-5 sm:p-6 border border-[#d4f826] rounded-2xl bg-[#0a0a0a] hover:shadow-[0_0_20px_rgba(212,248,38,0.4)] transition-all duration-300"
            >
              <p className="text-xs text-neutral-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-wide">
                <span className="p-1 rounded-full bg-neutral-800">
                  <MapPin size={12} className="text-neutral-400" />
                </span>
                <span>PRESENT ADDRESS</span>
              </p>
              <h5 className="font-bold text-base sm:text-lg text-white mb-1">
                Kazirbari Satarkul, North Badda, Dhaka.
              </h5>
              <p className="text-xs sm:text-sm text-neutral-400">
                Uttar Badda, Dhaka-1212. Bangladesh.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Full-width Stacked Buttons matching Screenshot */}
        <div className="space-y-3 mb-6">
          {/* Button 1: WhatsApp (Green #00e676) */}
          <motion.a
            whileHover={{ scale: 1.01, boxShadow: '0 0 25px rgba(0, 230, 118, 0.6)' }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300 }}
            href="https://wa.me/8801883555337"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00e676] text-black w-full py-3.5 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#00c853] transition-all text-sm sm:text-base cursor-pointer shadow-lg select-none"
          >
            <Smartphone size={18} className="text-black" />
            <span>Chat on WhatsApp</span>
          </motion.a>

          {/* Button 2: Direct Email (Neon Lime #d4f826) */}
          <motion.a
            whileHover={{ scale: 1.01, boxShadow: '0 0 25px rgba(212, 248, 38, 0.6)' }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300 }}
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#d4f826] text-black w-full py-3.5 sm:py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#c2e223] transition-all text-sm sm:text-base cursor-pointer shadow-lg select-none"
          >
            <Mail size={18} className="text-black" />
            <span>Direct Email</span>
          </motion.a>
        </div>

        {/* Global availability footer */}
        <div className="border-t border-[#1f1f1f] pt-6 text-center">
          <p className="text-xs text-neutral-500">
            Based in Dhaka, Bangladesh — Available worldwide for remote projects.
          </p>
        </div>
      </div>
    </section>
  );
};
