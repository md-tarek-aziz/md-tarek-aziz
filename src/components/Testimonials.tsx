import React from 'react';
import { Quote, Sparkles, Star } from 'lucide-react';
import { Testimonial } from '../types/portfolio';

interface TestimonialsProps {
  testimonials: Testimonial[];
  lang: 'en' | 'bn';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, lang }) => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-800/80 bg-[#090a11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <span>05.</span>
            <span>{lang === 'bn' ? 'ক্লায়েন্ট রিভিউ ও ফিডব্যাক' : 'Client Endorsements'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            {lang === 'bn' ? 'ক্লায়েন্ট ও ক্রিয়েটরদের প্রতিক্রিয়া' : 'Verified Reviews & Outcomes'}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            {lang === 'bn'
              ? 'আন্তর্জাতিক এজেন্সি, ইউটিউব ক্রিয়েটর এবং ডিরেক্টরদের সাথে কাজ করার বাস্তব অভিজ্ঞতা।'
              : 'Direct feedback from creative directors, founders, and media network leads.'}
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0c0d16] border border-neutral-800 flex flex-col justify-between relative group hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* 5-star indicator */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-800/80">
                {/* Quantifiable outcome badge */}
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-3">
                  Result: {t.metric}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-display font-bold text-sm text-amber-300">
                    {t.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {t.name}
                    </h4>
                    {/* Unboxed metadata separator */}
                    <div className="text-xs text-neutral-400 font-mono">
                      <span>{t.role}</span>
                      <span className="mx-1">·</span>
                      <span className="text-neutral-500">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
