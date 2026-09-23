import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { ServicePackage } from '../types/portfolio';

interface PricingEstimatorProps {
  services: ServicePackage[];
  onSelectPackageForBooking: (details: string) => void;
  lang: 'en' | 'bn';
}

export const PricingEstimator: React.FC<PricingEstimatorProps> = ({
  services,
  onSelectPackageForBooking,
  lang,
}) => {
  // Calculator state
  const [projectType, setProjectType] = useState<'video' | 'motion' | 'brand' | 'reels'>('video');
  const [volume, setVolume] = useState<'small' | 'medium' | 'large'>('medium');
  const [isRush, setIsRush] = useState<boolean>(false);
  const [needsGrading, setNeedsGrading] = useState<boolean>(true);
  const [needsSoundDesign, setNeedsSoundDesign] = useState<boolean>(true);

  // Compute calculated estimate
  let basePrice = 300;
  if (projectType === 'reels') basePrice = 400;
  if (projectType === 'motion') basePrice = 450;
  if (projectType === 'brand') basePrice = 500;

  const volumeMultiplier = volume === 'small' ? 0.75 : volume === 'medium' ? 1.0 : 1.6;
  let estimatedTotal = Math.round(basePrice * volumeMultiplier);

  if (needsGrading && (projectType === 'video' || projectType === 'reels')) estimatedTotal += 80;
  if (needsSoundDesign && projectType !== 'brand') estimatedTotal += 60;
  if (isRush) estimatedTotal += 120;

  const estimatedDays = isRush 
    ? (volume === 'small' ? '24 - 48 Hours' : '2 - 3 Days')
    : (volume === 'small' ? '3 - 4 Days' : volume === 'medium' ? '5 - 7 Days' : '7 - 10 Days');

  const handleBookEstimate = () => {
    const typeLabel = projectType === 'video' ? 'Commercial Video Edit' : projectType === 'reels' ? 'Short-form Reels Pack' : projectType === 'motion' ? 'Motion Graphics & VFX' : 'Brand Identity Suite';
    const msg = `Estimate: ${typeLabel} (${volume} scope) - Est: ~$${estimatedTotal} [Delivery: ${estimatedDays}]`;
    onSelectPackageForBooking(msg);
  };

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-neutral-800/80 bg-[#08090d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ccff00] mb-2">
            <span>04.</span>
            <span>{lang === 'bn' ? 'সার্ভিস ও প্রজেক্ট এস্টিমেট' : 'Services & Instant Estimator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight text-balance">
            {lang === 'bn' ? 'প্যাকেজসমূহ এবং বাজেট ক্যালকুলেটর' : 'Service Packages & Scope Calculator'}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            {lang === 'bn'
              ? 'নিচের রেডিমেড সার্ভিস প্যাকেজগুলো দেখুন অথবা সরাসরি আপনার প্রজেক্টের বাজেট ও ডেলিভারি সময় হিসাব করুন।'
              : 'Transparent rate guides for commercial work, retainer packages, or calculate custom scope pricing.'}
          </p>
        </div>

        {/* Ready-Made Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((serv) => (
            <div
              key={serv.id}
              className="p-6 rounded-2xl bg-[#0c0d15] border border-neutral-800 flex flex-col justify-between hover:border-[#ccff00]/40 transition-colors"
            >
              <div>
                <div className="text-xs font-mono text-[#ccff00] mb-2">
                  {serv.category.toUpperCase()}
                </div>
                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {serv.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {serv.shortDesc}
                </p>

                <div className="mb-4 pb-4 border-b border-neutral-800">
                  <div className="text-xl font-bold text-[#ccff00] font-mono tabular-nums">
                    {serv.estimatedPrice}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono mt-1">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    <span>{serv.deliveryTime}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {serv.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPackageForBooking(`Inquiry for package: ${serv.title} (${serv.estimatedPrice})`)}
                className="w-full py-2.5 px-3 rounded-full border border-neutral-700 hover:border-[#ccff00] bg-neutral-900 hover:bg-[#ccff00] hover:text-black text-xs font-semibold text-white transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{lang === 'bn' ? 'প্যাকেজ বুক করুন' : 'Book Package'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Live Interactive Project Calculator Card */}
        <div className="rounded-2xl border border-[#ccff00]/30 bg-[#0c0c10] p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#ccff00]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {lang === 'bn' ? 'কাস্টম প্রজেক্ট ক্যালকুলেটর' : 'Interactive Scope & Rate Estimator'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400">
                {lang === 'bn'
                  ? 'আপনার প্রয়োজন অনুযায়ী অপশন নির্বাচন করে আনুমানিক খরচ ও সময় নির্ধারণ করুন'
                  : 'Select your deliverables to get an immediate ballpark cost and timeline.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Options configuration */}
            <div className="lg:col-span-8 space-y-6">
              {/* Deliverable Type */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2.5">
                  1. Deliverable Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'video', label: 'Commercial Video' },
                    { id: 'reels', label: 'Short-Form Reels' },
                    { id: 'motion', label: '3D & Motion VFX' },
                    { id: 'brand', label: 'Brand Identity' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setProjectType(t.id as any)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                        projectType === t.id
                          ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                          : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope Volume */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2.5">
                  2. Project Scope & Volume
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'small', label: 'Starter / Single Cut', desc: '1 video / 5 reels / 1 logo' },
                    { id: 'medium', label: 'Standard / Multi-cut', desc: 'Up to 3 cuts / 10 reels / Suite' },
                    { id: 'large', label: 'Enterprise / Retainer', desc: 'Campaign / 20 reels / Full manual' },
                  ].map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVolume(v.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        volume === v.id
                          ? 'bg-[#ccff00]/10 border-[#ccff00] text-white'
                          : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold">{v.label}</div>
                      <div className="text-[10px] text-neutral-500 mt-1">{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons & Turnaround */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2.5">
                  3. Add-ons & Turnaround Speed
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 cursor-pointer hover:border-neutral-700">
                    <input
                      type="checkbox"
                      checked={needsGrading}
                      onChange={(e) => setNeedsGrading(e.target.checked)}
                      className="accent-[#ccff00] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>DaVinci Cinema Color Grade (+ $80)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 cursor-pointer hover:border-neutral-700">
                    <input
                      type="checkbox"
                      checked={needsSoundDesign}
                      onChange={(e) => setNeedsSoundDesign(e.target.checked)}
                      className="accent-[#ccff00] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Foley & Sound Design Pass (+ $60)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 cursor-pointer hover:border-neutral-700">
                    <input
                      type="checkbox"
                      checked={isRush}
                      onChange={(e) => setIsRush(e.target.checked)}
                      className="accent-[#ccff00] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Rush Express 48h Delivery (+ $120)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Calculated Outcome Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#090a10] border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#ccff00] block uppercase tracking-wider">
                  Estimated Investment
                </span>
                <div className="mt-2 text-4xl sm:text-5xl font-bold text-[#ccff00] font-mono tabular-nums">
                  ${estimatedTotal}
                </div>
                <div className="mt-1 text-xs text-neutral-400 font-mono">
                  USD · Flat Project Rate
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Est. Turnaround:</span>
                    <span className="text-white font-mono font-medium">{estimatedDays}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Revisions:</span>
                    <span className="text-white font-mono font-medium">2 Full Rounds Included</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>File Formats:</span>
                    <span className="text-white font-mono font-medium">ProRes / MP4 / Vector</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleBookEstimate}
                  className="w-full py-3.5 px-4 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-102 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'bn' ? 'এই এস্টিমেটে মেসেজ পাঠান' : 'Lock In This Estimate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-neutral-500 mt-2 font-mono">
                  No commitment required · Pre-fills contact form
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
