import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, SkipForward, Film, Check, Sparkles } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

// Imported assets
import commercialImg from '@/src/assets/images/project_commercial_video_1790153993466.jpg';
import motionImg from '@/src/assets/images/project_motion_graphics_1790154021503.jpg';
import docImg from '@/src/assets/images/project_youtube_thumbnail_1790154034075.jpg';
import brandImg from '@/src/assets/images/project_brand_identity_1790154004172.jpg';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PortfolioProfile;
  lang: 'en' | 'bn';
}

const REEL_SEGMENTS = [
  {
    id: 'seg-1',
    title: 'Apex Horizon · Cinematic Commercial',
    category: 'Commercial Video',
    image: commercialImg,
    duration: 35,
    specs: '4K DCI · 24fps · RED Log to Film Emulation',
    client: 'Apex Velocity Studio'
  },
  {
    id: 'seg-2',
    title: 'Synapse 3D Kinetic Motion Visuals',
    category: 'Motion Graphics',
    image: motionImg,
    duration: 30,
    specs: '4K UHD · 60fps · Octane 3D + After Effects',
    client: 'Synapse Global Summit'
  },
  {
    id: 'seg-3',
    title: 'The Untamed Edge · Documentary Opening',
    category: 'Visual Packaging',
    image: docImg,
    duration: 25,
    specs: '1080p · 23.98fps · Pacing & Sound Design',
    client: 'Frontier Docs'
  },
  {
    id: 'seg-4',
    title: 'Velour Atelier · Luxury Brand Reveal',
    category: 'Brand Visuals',
    image: brandImg,
    duration: 15,
    specs: '4K · Vector Motion & Macro Texture',
    client: 'Velour Haute Parfumerie'
  }
];

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, profile, lang }) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);

  const activeSegment = REEL_SEGMENTS[activeSegmentIndex];

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Simulated progress timer when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // auto loop or switch to next segment
          setActiveSegmentIndex(seg => (seg + 1) % REEL_SEGMENTS.length);
          return 0;
        }
        return prev + 1.2 * playbackSpeed;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed, activeSegmentIndex]);

  if (!isOpen) return null;

  const currentSeconds = Math.floor((progress / 100) * activeSegment.duration);
  const formattedTime = `00:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / 00:${activeSegment.duration}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl bg-[#090a10] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Header bar */}
        <div className="px-5 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div>
              <span className="text-xs font-mono text-neutral-400 block uppercase tracking-wider">
                {lang === 'bn' ? 'অফিশিয়াল শোরিল' : 'Official Reel Player'}
              </span>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {profile.name} · {profile.showreelTitle}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono text-neutral-500">
              Press [ESC] to exit
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close showreel modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Cinema Viewport */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={activeSegment.image}
            alt={activeSegment.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />

          {/* Vignette & cinematic letterbox */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Center Play/Pause button on hover or pause */}
          {(!isPlaying || isPlaying) && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400/90 text-neutral-950 flex items-center justify-center shadow-2xl backdrop-blur-md opacity-90 hover:opacity-100 hover:scale-110 transition-all cursor-pointer z-10"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-neutral-950 text-neutral-950" />
              ) : (
                <Play className="w-6 h-6 fill-neutral-950 ml-1 text-neutral-950" />
              )}
            </button>
          )}

          {/* Overlay info top-left */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeSegment.specs}</span>
          </div>

          {/* Live Soundwave Simulation */}
          {isPlaying && !isMuted && (
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1">
              <span className="w-1 h-3 bg-amber-400 animate-pulse rounded-full" />
              <span className="w-1 h-5 bg-amber-400 animate-pulse delay-75 rounded-full" />
              <span className="w-1 h-2 bg-amber-400 animate-pulse delay-150 rounded-full" />
              <span className="w-1 h-4 bg-amber-400 animate-pulse delay-100 rounded-full" />
              <span className="text-[11px] font-mono text-amber-200 ml-1">AUDIO SYNC</span>
            </div>
          )}

          {/* Bottom active clip info banner */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none">
            <div className="bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-md pointer-events-auto">
              <div className="text-[11px] text-amber-400 font-mono">
                {activeSegment.category} · Client: {activeSegment.client}
              </div>
              <div className="text-white font-semibold text-sm sm:text-base mt-0.5">
                {activeSegment.title}
              </div>
            </div>
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="bg-neutral-950 px-5 py-4 border-t border-neutral-800">
          {/* Timeline Scrubber */}
          <div className="relative mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300"
              aria-label="Seek timeline"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            {/* Left Controls: Play, Next, Timecode */}
            <div className="flex items-center gap-4 text-neutral-300">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setActiveSegmentIndex((activeSegmentIndex + 1) % REEL_SEGMENTS.length);
                  setProgress(0);
                }}
                className="hover:text-amber-400 transition-colors cursor-pointer"
                title="Next reel segment"
                aria-label="Next segment"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-amber-400 transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="tabular-nums text-neutral-400">
                {formattedTime}
              </span>
            </div>

            {/* Right Controls: Playback speed */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 hidden sm:inline">Speed:</span>
              {([1, 1.25, 1.5] as const).map(speed => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reel Segment Switcher List */}
        <div className="p-4 bg-[#0d0f17] border-t border-neutral-800/80">
          <div className="text-xs font-mono text-neutral-400 mb-2">
            {lang === 'bn' ? 'শোরিল সেগমেন্ট নির্বাচন করুন:' : 'Jump to Reel Chapter:'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {REEL_SEGMENTS.map((seg, idx) => (
              <button
                key={seg.id}
                onClick={() => {
                  setActiveSegmentIndex(idx);
                  setProgress(0);
                }}
                className={`p-2 rounded-lg text-left transition-all border ${
                  activeSegmentIndex === idx
                    ? 'bg-amber-500/10 border-amber-500/40 text-white'
                    : 'bg-neutral-900/60 border-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={activeSegmentIndex === idx ? 'text-amber-400' : 'text-neutral-500'}>
                    0{idx + 1}.
                  </span>
                  <span>{seg.duration}s</span>
                </div>
                <div className="text-xs font-medium truncate">
                  {seg.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
