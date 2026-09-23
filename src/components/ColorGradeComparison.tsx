import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Check, Eye, Sparkles } from 'lucide-react';

import commercialStill from '@/src/assets/images/project_commercial_video_1790153993466.jpg';
import portraitStill from '@/src/assets/images/hero_editor_portrait_1790153982212.jpg';
import motionStill from '@/src/assets/images/project_motion_graphics_1790154021503.jpg';

interface ColorGradeProps {
  lang: 'en' | 'bn';
}

interface GradePreset {
  id: string;
  nameEn: string;
  nameBn: string;
  camera: string;
  lut: string;
  image: string;
}

const PRESETS: GradePreset[] = [
  {
    id: 'p1',
    nameEn: 'Commercial Automotive',
    nameBn: 'অটোমোটিভ কমার্শিয়াল',
    camera: 'RED V-Raptor 8K · REDCODE RAW Log3G10',
    lut: 'Kodak 2383 Cinema Print Emulation · Custom DaVinci PowerGrade',
    image: commercialStill,
  },
  {
    id: 'p2',
    nameEn: 'Studio Editorial & Fashion',
    nameBn: 'স্টুডিও এডিটোরিয়াল',
    camera: 'Sony FX6 · S-Log3 / S-Gamut3.Cine',
    lut: 'Warm Natural Skin Tone Curve · Halation & Grain Pass',
    image: portraitStill,
  },
  {
    id: 'p3',
    nameEn: '3D VFX & Motion Grade',
    nameBn: 'থ্রিডি মোশন গ্রেড',
    camera: 'Octane EXR 32-bit Float Linear',
    lut: 'ACEScc Color Space Transform · Glow & Chromatic Separation',
    image: motionStill,
  }
];

export const ColorGradeComparison: React.FC<ColorGradeProps> = ({ lang }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const preset = PRESETS[activePresetIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPercent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="colorgrade" className="py-20 md:py-28 border-t border-neutral-800/80 bg-[#090a10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
            <span>02.</span>
            <span>{lang === 'bn' ? 'কালার সায়েন্স ও পোস্ট প্রোডাকশন' : 'Color Science & Grading'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            {lang === 'bn'
              ? 'লগ ফুটেজ থেকে সিনেম্যাটিক ফাইনাল গ্রেড'
              : 'RAW Log Capture vs. Master Cinema Grade'}
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            {lang === 'bn'
              ? 'স্লাইডারটি ডানে-বামে টেনে ক্যামেরার ফ্ল্যাট র ফুটেজ এবং ডাভিঞ্চি রিজলভ কালার গ্রেডিংয়ের পার্থক্যটি দেখুন।'
              : 'Drag the interactive split-slider to inspect the difference between uncorrected camera log and the final filmic color-calibrated master.'}
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-neutral-500 mr-2">
            {lang === 'bn' ? 'প্রোজেক্ট চয়ন:' : 'Select Reel:'}
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activePresetIndex === idx
                  ? 'bg-neutral-200 text-neutral-950 font-semibold shadow-sm'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {lang === 'bn' ? p.nameBn : p.nameEn}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-video sm:aspect-[21/9] w-full select-none cursor-ew-resize overflow-hidden"
          >
            {/* Background Full Layer: FINAL GRADED CINEMA IMAGE */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={preset.image}
                alt="Final Graded Frame"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-110 saturate-110"
              />
              {/* Graded Label Top-Right */}
              <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-amber-400/30 text-xs font-mono text-amber-300">
                FINAL COLOR GRADE (Rec.709)
              </div>
            </div>

            {/* Foreground Clipped Layer: RAW FLAT LOG IMAGE */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ width: containerRef.current?.clientWidth || '100%' }}>
                <img
                  src={preset.image}
                  alt="Raw Log Capture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-125 contrast-70 saturate-50 sepia-15"
                />
              </div>

              {/* Raw Label Top-Left */}
              <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-neutral-700 text-xs font-mono text-neutral-300">
                CAMERA RAW (Flat Log)
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Draggable Circle Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl border-2 border-neutral-950 font-bold">
                <SlidersHorizontal className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Technical Specs Footer */}
          <div className="px-6 py-4 bg-[#0d0f17] border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-neutral-400">
              <div>
                <span className="text-neutral-500 mr-1.5">Sensor:</span>
                <span className="text-white">{preset.camera}</span>
              </div>
              <span className="hidden sm:inline text-neutral-700">·</span>
              <div>
                <span className="text-neutral-500 mr-1.5">Color Pipeline:</span>
                <span className="text-amber-400">{preset.lut}</span>
              </div>
            </div>

            <div className="text-neutral-500 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{lang === 'bn' ? 'তুলনা দেখতে স্লাইডার সরান' : 'Drag slider across frame'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
