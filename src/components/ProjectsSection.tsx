import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Palette,
  Layers,
  LayoutGrid,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Star,
  Play,
  Plus,
  Trash2,
  ImagePlus,
  Upload,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { VideoProject, GraphicProject } from '../types/portfolio';
import { translations } from '../data/portfolioData';

// Direct CDN Image provider with fallback
export const getFastImageUrl = (url: string, _width?: number, _quality?: number): string => {
  if (!url) return '';
  return url;
};

interface SafeProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  onImageReplace?: (newSrc: string) => void;
  lang: 'en' | 'bn';
}

export const SafeProjectImage: React.FC<SafeProjectImageProps> = ({
  src,
  alt,
  className = '',
  onImageReplace,
  lang,
}) => {
  const [attempt, setAttempt] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanNoProto = src.replace(/^https?:\/\//, '');
  const sources = useMemo(() => {
    if (src.startsWith('data:') || src.startsWith('blob:')) {
      return [src];
    }
    return [
      src, // Tier 1: Direct link (no-referrer)
      `https://i0.wp.com/${cleanNoProto}`, // Tier 2: Jetpack global CDN cache
      `https://images.weserv.nl/?url=${encodeURIComponent(src)}&default=${encodeURIComponent(src)}`, // Tier 3: WeServ CDN
      src.endsWith('.png') ? src.replace(/\.png$/, '.jpg') : src.replace(/\.jpg$/, '.png'), // Tier 4: Alternate extension
    ];
  }, [src, cleanNoProto]);

  useEffect(() => {
    setAttempt(0);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const currentSrc = sources[Math.min(attempt, sources.length - 1)];

  const handleError = () => {
    if (attempt < sources.length - 1) {
      setAttempt((prev) => prev + 1);
    } else {
      setHasError(true);
      setIsLoaded(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageReplace) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onImageReplace(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-center bg-[#0d0d0d] rounded-2xl border border-dashed border-[#333]">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
          <AlertCircle size={22} />
        </div>
        <p className="text-sm font-bold text-white mb-1">
          {lang === 'bn' ? 'ডিজাইনটি লোড হতে সমস্যা হয়েছে' : 'Image failed to load'}
        </p>
        <p className="text-xs text-neutral-400 max-w-sm mb-4">
          {lang === 'bn'
            ? 'সার্ভার থেকে ছবিটি পাওয়া যায়নি। আপনি নিচে ক্লিক করে সরাসরি আপনার ফাইল থেকে ছবিটি আপলোড করে দিতে পারেন।'
            : 'Image could not be retrieved. Click below to upload your file directly.'}
        </p>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAttempt(0);
              setHasError(false);
              setIsLoaded(false);
            }}
            className="px-3.5 py-2 rounded-xl bg-[#1c1c1c] hover:bg-[#282828] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#333]"
          >
            <RefreshCw size={13} />
            <span>{lang === 'bn' ? 'পুনরায় চেষ্টা করুন' : 'Retry'}</span>
          </button>
          {onImageReplace && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl bg-[#06cdff] hover:bg-[#05b8e6] text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,205,255,0.4)] cursor-pointer"
              >
                <Upload size={14} />
                <span>{lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Image'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-[#06cdff]/20 border-t-[#06cdff] animate-spin" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
};

interface ProjectsSectionProps {
  videos: VideoProject[];
  graphics: GraphicProject[];
  onAddVideo?: (video: Omit<VideoProject, 'id'>) => void;
  onDeleteVideo?: (id: number | string) => void;
  onAddGraphic?: (graphic: Omit<GraphicProject, 'id'>) => void;
  onDeleteGraphic?: (id: number | string) => void;
  onUpdateGraphic?: (id: number | string, updatedFields: Partial<GraphicProject>) => void;
  lang: 'en' | 'bn';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  videos,
  graphics,
  onAddVideo,
  onDeleteVideo,
  onAddGraphic,
  onDeleteGraphic,
  onUpdateGraphic,
  lang,
}) => {
  const t = translations[lang].projects_section;
  const [activeTab, setActiveTab] = useState<'video' | 'graphic' | 'branding'>('graphic');
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('slider');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const AUTOPLAY_INTERVAL = 4000;

  // Lightbox modal state for graphics
  const [selectedGraphic, setSelectedGraphic] = useState<GraphicProject | null>(null);

  // Active video player modal state
  const [activeVideoModal, setActiveVideoModal] = useState<VideoProject | null>(null);

  // Add Video Modal state
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDesc, setNewVideoDesc] = useState('');

  const parseVideoUrl = (raw: string): { url: string; type: 'vimeo' | 'youtube' | 'mp4' } => {
    const trimmed = raw.trim();
    const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return {
        url: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`,
        type: 'youtube',
      };
    }
    const vimeoMatch = trimmed.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return {
        url: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
        type: 'vimeo',
      };
    }
    return {
      url: trimmed,
      type: trimmed.endsWith('.mp4') ? 'mp4' : 'vimeo',
    };
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoUrl.trim()) return;
    const { url, type } = parseVideoUrl(newVideoUrl);
    onAddVideo?.({
      title: newVideoTitle.trim() || (lang === 'bn' ? 'ভিডিও প্রজেক্ট' : 'Video Project'),
      desc: newVideoDesc.trim() || (lang === 'bn' ? 'প্রফেশনাল ভিডিও এডিটিং ও মোশন ডিজাইন' : 'Professional video editing & motion design'),
      url,
      type,
    });
    setIsAddVideoModalOpen(false);
    setNewVideoTitle('');
    setNewVideoDesc('');
    setNewVideoUrl('');
  };

  // Add Graphic Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'graphic' | 'branding'>('graphic');
  const [newImage, setNewImage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return;
    onAddGraphic?.({
      title: newTitle.trim() || (lang === 'bn' ? 'নতুন ডিজাইন' : 'New Design Project'),
      desc: newDesc.trim() || (lang === 'bn' ? 'গ্রাফিক ডিজাইন ও ভিজ্যুয়াল কম্পোজিশন' : 'Graphic design & visual asset'),
      image: newImage,
      category: newCategory,
    });
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewImage('');
  };

  const graphicItems = graphics.filter((g) =>
    activeTab === 'branding' ? g.category === 'branding' : g.category === 'graphic'
  );

  const currentItemsCount =
    activeTab === 'video' ? videos.length : graphicItems.length;

  useEffect(() => {
    setSliderIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (sliderIndex >= currentItemsCount && currentItemsCount > 0) {
      setSliderIndex(0);
    }
  }, [sliderIndex, currentItemsCount]);

  const handleNextSlider = () => {
    setSlideDirection(1);
    setSliderIndex((prev) => (prev + 1) % Math.max(1, currentItemsCount));
  };

  const handlePrevSlider = () => {
    setSlideDirection(-1);
    setSliderIndex((prev) => (prev - 1 + currentItemsCount) % Math.max(1, currentItemsCount));
  };

  const handleSelectSlide = (idx: number) => {
    setSlideDirection(idx >= sliderIndex ? 1 : -1);
    setSliderIndex(idx);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNextSlider();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlider();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItemsCount]);

  // Autoplay motion transition: slides move one after another automatically for branding only
  useEffect(() => {
    if (activeTab !== 'branding') return;
    if (!isAutoplay || isHovered || currentItemsCount <= 1) return;

    const timer = setInterval(() => {
      setSlideDirection(1);
      setSliderIndex((prev) => (prev + 1) % currentItemsCount);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [activeTab, isAutoplay, isHovered, currentItemsCount]);

  // Aggressively preload fast CDN WebP images into browser cache
  useEffect(() => {
    graphics.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = getFastImageUrl(item.image, 1400, 85);
        const thumb = new Image();
        thumb.src = getFastImageUrl(item.image, 200, 50);
      }
    });
  }, [graphics]);

  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto">
      {/* Star Pill Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        {/* Star Pill Header */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(6,205,255,0.55)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(6,205,255,0.3)' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#141414] border border-[#2a2a2a] rounded-full text-xs font-bold text-[#06cdff] mb-4 cursor-pointer hover:border-[#06cdff] transition-all duration-300 select-none"
        >
          <Star size={14} className="fill-[#06cdff] text-[#06cdff]" />
          <span>{t.title.toUpperCase()}</span>
        </motion.div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-6xl font-extrabold mb-8 text-white select-none">
          {lang === 'bn' ? (
            <>
              আমার <span className="text-[#06cdff]">প্রজেক্ট</span>
            </>
          ) : (
            <>
              My <span className="text-[#06cdff]">Projects</span>
            </>
          )}
        </h2>

        {/* Category Pill Switcher */}
        <div className="inline-flex bg-[#0a0a0a] p-1 rounded-full border border-[#06cdff] shadow-2xl mb-8 relative flex-wrap justify-center gap-1">
          {/* Video Editing */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveTab('video');
              setSliderIndex(0);
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'video'
                ? 'bg-[#06cdff] text-black shadow-[0_0_20px_rgba(6,205,255,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Video size={16} />
            <span>{t.video}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'video' ? 'bg-black/15 text-black' : 'bg-[#1a1a1a] text-neutral-300'
              }`}
            >
              {videos.length}
            </span>
          </motion.button>

          {/* Graphic Design */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveTab('graphic');
              setSliderIndex(0);
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'graphic'
                ? 'bg-[#06cdff] text-black shadow-[0_0_20px_rgba(6,205,255,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Palette size={16} />
            <span>{t.graphic}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'graphic' ? 'bg-black/15 text-black' : 'bg-[#1a1a1a] text-neutral-300'
              }`}
            >
              {graphics.filter((g) => g.category !== 'branding').length}
            </span>
          </motion.button>

          {/* Branding */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveTab('branding');
              setSliderIndex(0);
            }}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer relative ${
              activeTab === 'branding'
                ? 'bg-[#06cdff] text-black shadow-[0_0_20px_rgba(6,205,255,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers size={16} />
            <span>{t.branding}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'branding' ? 'bg-black/15 text-black' : 'bg-[#1a1a1a] text-neutral-300'
              }`}
            >
              {graphics.filter((g) => g.category === 'branding').length}
            </span>
          </motion.button>
        </div>

        {/* View Toggle Bar */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a] p-4 sm:p-5 rounded-2xl border border-[#262626] mb-8 group transition-all duration-300 hover:border-[#06cdff]/40 hover:shadow-[0_0_20px_rgba(6,205,255,0.15)]">
          <div className="flex items-center gap-3.5 text-left">
            <div className="p-2.5 sm:p-3 bg-[#141414] rounded-xl border border-[#262626] text-[#06cdff]">
              {activeTab === 'video' ? <Video size={20} /> : <Palette size={20} />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {activeTab === 'video' ? t.video : activeTab === 'branding' ? t.branding : t.graphic}
              </h3>
              <p className="text-xs text-neutral-400">
                {activeTab === 'video'
                  ? (lang === 'bn' ? 'ডিরেক্ট ভিডিও প্লেয়ার — কোনো থাম্বনেইল গেট ছাড়াই সরাসরি ভিডিও দেখুন' : 'Direct video player — watch videos directly without thumbnail gate')
                  : (lang === 'bn' ? 'সৃজনশীল গ্রাফিক ডিজাইন ও পোস্টার — ক্লিক করে ফুল স্ক্রিনে দেখুন' : 'Creative graphic visual design & brand identity systems.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {activeTab === 'video' && onAddVideo && (
              <button
                type="button"
                onClick={() => setIsAddVideoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md select-none"
              >
                <Plus size={15} />
                <span>{lang === 'bn' ? 'ভিডিও যোগ করুন' : 'Add Video'}</span>
              </button>
            )}

            {activeTab !== 'video' && onAddGraphic && (
              <button
                type="button"
                onClick={() => {
                  setNewCategory(activeTab === 'branding' ? 'branding' : 'graphic');
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md select-none"
              >
                <Plus size={15} />
                <span>{lang === 'bn' ? 'ডিজাইন যোগ করুন' : 'Add Design'}</span>
              </button>
            )}

            <button
              onClick={() => setViewMode((prev) => (prev === 'grid' ? 'slider' : 'grid'))}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl text-xs sm:text-sm font-semibold text-white hover:border-[#06cdff]/60 hover:bg-[#1e1e1e] transition-all cursor-pointer shrink-0"
            >
              {viewMode === 'grid' ? (
                <>
                  <SlidersHorizontal size={14} className="text-[#06cdff]" />
                  <span>{t.slider_view}</span>
                </>
              ) : (
                <>
                  <LayoutGrid size={14} className="text-[#06cdff]" />
                  <span>{t.grid_view}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* VIDEO TAB CONTENT */}
      {activeTab === 'video' && (
        <div>
          {videos.length === 0 ? (
            viewMode === 'slider' ? (
              /* Slider frame empty state matching requested widescreen box */
              <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-6 py-2">
                {/* Left Flanking Navigation Arrow */}
                <button
                  type="button"
                  disabled
                  aria-label="Previous Video"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818]/70 border border-[#2a2a2a] text-neutral-600 flex items-center justify-center shrink-0 cursor-not-allowed z-20"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Central Video Frame with Rounded Neon Border - Empty placeholder ready for user videos */}
                <div className="flex-1 w-full max-w-[860px] aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-b from-[#0e0e0e] to-black rounded-[24px] sm:rounded-[32px] border-2 sm:border-[2.5px] border-[#06cdff] overflow-hidden shadow-[0_0_35px_rgba(6,205,255,0.25)] relative flex flex-col items-center justify-center p-6 sm:p-10 text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#06cdff] mb-4 shadow-[0_0_25px_rgba(6,205,255,0.2)]">
                    <Video size={32} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {lang === 'bn' ? 'ভিডিও এডিটিং বক্স খালি রয়েছে' : 'Video Editing Box is Empty'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                    {lang === 'bn'
                      ? 'ভিডিওর বক্সটি প্রস্তুত রাখা হয়েছে। আপনি ভিডিওর লিংক দিলে এখানে যুক্ত করা হবে।'
                      : 'This video showcase box is ready. Give me your video links to display them here.'}
                  </p>
                  {onAddVideo && (
                    <button
                      type="button"
                      onClick={() => setIsAddVideoModalOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,205,255,0.3)] cursor-pointer active:scale-95"
                    >
                      <Plus size={16} />
                      <span>{lang === 'bn' ? 'ভিডিও যুক্ত করুন' : 'Add Video'}</span>
                    </button>
                  )}
                </div>

                {/* Right Flanking Navigation Arrow */}
                <button
                  type="button"
                  disabled
                  aria-label="Next Video"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818]/70 border border-[#2a2a2a] text-neutral-600 flex items-center justify-center shrink-0 cursor-not-allowed z-20"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-[#2e2e2e] hover:border-[#06cdff]/40 bg-[#0a0a0a]/90 rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto transition-all shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#06cdff] mx-auto mb-4 shadow-[0_0_25px_rgba(6,205,255,0.15)]">
                  <Video size={30} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {lang === 'bn' ? 'কোনো ভিডিও প্রজেক্ট নেই' : 'No Video Projects Yet'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'ভিডিওর বক্স খালি রাখা হয়েছে। আপনি ভিডিও দিলে এখানে যুক্ত করা হবে।'
                    : 'Video box is kept empty. Add your video to display here.'}
                </p>
                {onAddVideo && (
                  <button
                    type="button"
                    onClick={() => setIsAddVideoModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,205,255,0.3)] cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>{lang === 'bn' ? 'নতুন ভিডিও যুক্ত করুন' : 'Add New Video'}</span>
                  </button>
                )}
              </div>
            )
          ) : (
            <div className="space-y-8">
              {viewMode === 'grid' ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((vid) => (
                    <div
                      key={vid.id}
                      className="group border border-[#262626] bg-[#0a0a0a] rounded-2xl p-4 transition-all hover:border-[#06cdff]/40 hover:shadow-[0_0_20px_rgba(6,205,255,0.2)] flex flex-col justify-between relative"
                    >
                      {onDeleteVideo && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteVideo(vid.id);
                          }}
                          title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete Video'}
                          className="absolute top-6 right-6 z-10 p-2 rounded-xl bg-black/80 hover:bg-red-500 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}

                      <div>
                        {/* Embedded Video Player */}
                        <div className="aspect-[9/16] sm:aspect-video bg-neutral-950 rounded-xl overflow-hidden mb-4 border border-[#262626] relative">
                          <iframe
                            src={`${vid.url}?title=0&byline=0&portrait=0`}
                            title={vid.title}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#06cdff] transition-colors line-clamp-2">
                          {vid.title}
                        </h4>
                        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                          {vid.desc}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveVideoModal(vid)}
                        className="w-full py-2 px-3 rounded-xl bg-[#1a1a1a] hover:bg-[#06cdff] hover:text-black text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play size={13} fill="currentColor" />
                        <span>{lang === 'bn' ? 'ফুল স্ক্রিনে চালান' : 'Watch Full Screen'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Slider View for Videos - Exact match with user screenshot */
                <div className="space-y-5">
                  <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-6 py-2">
                    {/* Left Flanking Navigation Arrow */}
                    <button
                      type="button"
                      onClick={handlePrevSlider}
                      aria-label="Previous Video"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#06cdff] text-white hover:text-[#06cdff] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 shadow-xl active:scale-95 z-20"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Central Video Frame with Rounded Neon Border */}
                    <div className="flex-1 w-full max-w-[860px] aspect-[16/10] sm:aspect-[16/9] bg-black rounded-[24px] sm:rounded-[32px] border-2 sm:border-[2.5px] border-[#06cdff] overflow-hidden shadow-[0_0_35px_rgba(6,205,255,0.25)] relative flex items-center justify-center group">
                      {videos[sliderIndex] && (
                        <iframe
                          key={videos[sliderIndex].id}
                          src={`${videos[sliderIndex].url}?title=0&byline=0&portrait=0`}
                          title={videos[sliderIndex].title}
                          className="w-full h-full bg-black block border-0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      )}

                      {/* Delete button */}
                      {onDeleteVideo && videos[sliderIndex] && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteVideo(videos[sliderIndex].id);
                          }}
                          title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete Video'}
                          className="absolute top-3 right-3 z-30 p-2.5 rounded-xl bg-black/80 hover:bg-red-500 text-neutral-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    {/* Right Flanking Navigation Arrow */}
                    <button
                      type="button"
                      onClick={handleNextSlider}
                      aria-label="Next Video"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#06cdff] text-white hover:text-[#06cdff] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 shadow-xl active:scale-95 z-20"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Clean Slide Dots & Count Indicator (1 / N) */}
                  {videos.length > 1 && (
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        {videos.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === sliderIndex
                                ? 'w-7 bg-[#06cdff] shadow-[0_0_10px_rgba(6,205,255,0.6)]'
                                : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                            }`}
                            aria-label={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <span className="text-xs font-mono text-neutral-400">
                        <span className="text-[#06cdff] font-bold">{sliderIndex + 1}</span> / {videos.length}
                      </span>
                    </div>
                  )}

                  {/* Video Caption & Controls */}
                  {videos[sliderIndex] && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto px-4 pt-1">
                      <div className="text-center sm:text-left">
                        <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">
                          {videos[sliderIndex].title}
                        </h4>
                        <p className="text-xs text-neutral-400 line-clamp-2">
                          {videos[sliderIndex].desc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveVideoModal(videos[sliderIndex])}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a1a1a] hover:bg-[#06cdff] hover:text-black text-xs font-semibold text-white transition-all cursor-pointer shrink-0 shadow-md"
                      >
                        <Play size={13} fill="currentColor" />
                        <span>{lang === 'bn' ? 'ফুল স্ক্রিনে চালান' : 'Watch Full Screen'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* GRAPHIC / BRANDING TAB CONTENT */}
      {activeTab !== 'video' && (
        <div>
          {graphicItems.length === 0 ? (
            viewMode === 'slider' ? (
              /* Slider frame empty state matching requested widescreen box */
              <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-6 py-2">
                {/* Left Flanking Navigation Arrow */}
                <button
                  type="button"
                  disabled
                  aria-label="Previous Design"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818]/70 border border-[#2a2a2a] text-neutral-600 flex items-center justify-center shrink-0 cursor-not-allowed z-20"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Central Graphic Frame with Rounded Neon Border - Empty placeholder ready for user designs */}
                <div className="flex-1 w-full max-w-[860px] aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-b from-[#0e0e0e] to-black rounded-[24px] sm:rounded-[32px] border-2 sm:border-[2.5px] border-[#06cdff] overflow-hidden shadow-[0_0_35px_rgba(6,205,255,0.25)] relative flex flex-col items-center justify-center p-6 sm:p-10 text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#06cdff] mb-4 shadow-[0_0_25px_rgba(6,205,255,0.2)]">
                    <ImagePlus size={32} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {lang === 'bn'
                      ? activeTab === 'branding'
                        ? 'ব্র্যান্ডিং বক্স খালি রয়েছে'
                        : 'গ্রাফিক্স ডিজাইনের বক্স খালি রয়েছে'
                      : activeTab === 'branding'
                        ? 'Branding Box is Empty'
                        : 'Graphic Design Box is Empty'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                    {lang === 'bn'
                      ? 'গ্রাফিক্স ডিজাইনের বক্সটি প্রস্তুত রাখা হয়েছে। আপনি ডিজাইন দিলে এখানে সরাসরি যুক্ত হবে।'
                      : 'This graphic design showcase box is ready. Give me your designs to display them here.'}
                  </p>
                  {onAddGraphic && (
                    <button
                      type="button"
                      onClick={() => {
                        setNewCategory(activeTab === 'branding' ? 'branding' : 'graphic');
                        setIsAddModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,205,255,0.3)] cursor-pointer active:scale-95"
                    >
                      <Plus size={16} />
                      <span>{lang === 'bn' ? 'ডিজাইন যোগ করুন' : 'Add Design'}</span>
                    </button>
                  )}
                </div>

                {/* Right Flanking Navigation Arrow */}
                <button
                  type="button"
                  disabled
                  aria-label="Next Design"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818]/70 border border-[#2a2a2a] text-neutral-600 flex items-center justify-center shrink-0 cursor-not-allowed z-20"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            ) : (
              <div className="border border-dashed border-[#2e2e2e] hover:border-[#06cdff]/40 bg-[#0a0a0a]/90 rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto transition-all shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#06cdff] mx-auto mb-4 shadow-[0_0_25px_rgba(6,205,255,0.15)]">
                  <ImagePlus size={30} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {lang === 'bn'
                    ? activeTab === 'branding'
                      ? 'কোনো ব্র্যান্ডিং প্রজেক্ট নেই'
                      : 'কোনো গ্রাফিক প্রজেক্ট নেই'
                    : activeTab === 'branding'
                      ? 'No Branding Projects Yet'
                      : 'No Graphic Projects Yet'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-6 max-w-md mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'গ্রাফিক্স ডিজাইনের বক্স খালি রাখা হয়েছে। আপনি ডিজাইন দিলে এখানে যুক্ত হবে।'
                    : 'Graphic design box is kept empty. Add your designs to display here.'}
                </p>
                {onAddGraphic && (
                  <button
                    type="button"
                    onClick={() => {
                      setNewCategory(activeTab === 'branding' ? 'branding' : 'graphic');
                      setIsAddModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,205,255,0.3)] cursor-pointer"
                  >
                    <Plus size={16} />
                    <span>{lang === 'bn' ? 'আপনার ডিজাইন যোগ করুন' : 'Add Your Design'}</span>
                  </button>
                )}
              </div>
            )
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {graphicItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedGraphic(item)}
                  className="group border border-[#262626] bg-[#0a0a0a] rounded-2xl p-3.5 transition-all hover:border-[#06cdff]/40 hover:shadow-[0_0_20px_rgba(6,205,255,0.25)] cursor-pointer flex flex-col justify-between relative"
                >
                  <div className="aspect-[4/3] bg-neutral-950 rounded-xl overflow-hidden mb-3 border border-[#262626] relative">
                    <SafeProjectImage
                      src={item.image}
                      alt={item.title}
                      lang={lang}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Delete button */}
                    {onDeleteGraphic && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteGraphic(item.id);
                        }}
                        title="Delete this design"
                        className="absolute top-2.5 right-2.5 z-20 p-2 rounded-xl bg-black/80 hover:bg-red-500 text-neutral-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-[#06cdff] text-black text-xs font-bold flex items-center gap-1 shadow-lg">
                        <ExternalLink size={12} />
                        <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'Preview'}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#06cdff] transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Slider View for Graphics & Branding with Motion Transition and Fast CDN Loading */
            <div className="space-y-5">
              <div
                className={`relative w-full mx-auto flex items-center justify-center gap-3 sm:gap-6 py-2 ${
                  activeTab === 'branding' ? 'max-w-2xl' : 'max-w-5xl'
                }`}
              >
                {/* Left Flanking Navigation Arrow */}
                <button
                  type="button"
                  onClick={handlePrevSlider}
                  aria-label="Previous Design"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#06cdff] text-white hover:text-[#06cdff] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 shadow-xl active:scale-95 z-20"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Central Design Frame with Neon Rounded Border */}
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setSelectedGraphic(graphicItems[sliderIndex])}
                  className={`bg-black overflow-hidden shadow-[0_0_35px_rgba(6,205,255,0.25)] relative flex items-center justify-center group cursor-pointer ${
                    activeTab === 'branding'
                      ? 'w-full max-w-[420px] sm:max-w-[480px] aspect-[4/5] rounded-[22px] sm:rounded-[28px] border-2 sm:border-[2.5px] border-[#06cdff]'
                      : 'flex-1 w-full max-w-[860px] aspect-[16/10] sm:aspect-[16/9] rounded-[24px] sm:rounded-[32px] border-2 sm:border-[2.5px] border-[#06cdff]'
                  }`}
                >
                  {/* Ambient Blurred Backdrop with instant low-res blur */}
                  {graphicItems[sliderIndex] && (
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none transition-all duration-500"
                      style={{
                        backgroundImage: `url(${graphicItems[sliderIndex].image})`,
                      }}
                    />
                  )}

                  {/* Motion Slide Transition */}
                  <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                    {graphicItems[sliderIndex] && (
                      <motion.div
                        key={graphicItems[sliderIndex].id}
                        custom={slideDirection}
                        variants={{
                          enter: (dir: number) => ({
                            x: dir > 0 ? 80 : -80,
                            opacity: 0,
                            scale: 0.96,
                          }),
                          center: {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            transition: {
                              x: { type: 'spring', stiffness: 280, damping: 28 },
                              opacity: { duration: 0.3 },
                              scale: { duration: 0.3 },
                            },
                          },
                          exit: (dir: number) => ({
                            x: dir > 0 ? -80 : 80,
                            opacity: 0,
                            scale: 0.96,
                            transition: {
                              x: { type: 'spring', stiffness: 280, damping: 28 },
                              opacity: { duration: 0.25 },
                              scale: { duration: 0.25 },
                            },
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full h-full flex items-center justify-center relative z-10"
                      >
                        <SafeProjectImage
                          src={graphicItems[sliderIndex].image}
                          alt={graphicItems[sliderIndex].title}
                          onImageReplace={(newSrc) => {
                            onUpdateGraphic?.(graphicItems[sliderIndex].id, { image: newSrc });
                          }}
                          lang={lang}
                          className="w-full h-full object-contain select-none transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Autoplay progress bar line at the bottom for branding */}
                  {activeTab === 'branding' && isAutoplay && !isHovered && graphicItems.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-20 pointer-events-none">
                      <motion.div
                        key={sliderIndex}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                        className="h-full bg-gradient-to-r from-[#06cdff] to-[#4ce1ff] shadow-[0_0_8px_#06cdff]"
                      />
                    </div>
                  )}

                  {/* Replace/Upload Image button */}
                  {onUpdateGraphic && graphicItems[sliderIndex] && (
                    <label
                      title={lang === 'bn' ? 'ছবি আপলোড/পরিবর্তন করুন' : 'Upload or replace image'}
                      className="absolute top-3 right-14 z-30 p-2.5 rounded-xl bg-black/80 hover:bg-[#06cdff] text-neutral-300 hover:text-black transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Upload size={15} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                onUpdateGraphic(graphicItems[sliderIndex].id, { image: reader.result });
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  )}

                  {/* Delete button */}
                  {onDeleteGraphic && graphicItems[sliderIndex] && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteGraphic(graphicItems[sliderIndex].id);
                      }}
                      title="Delete this design"
                      className="absolute top-3 right-3 z-30 p-2.5 rounded-xl bg-black/80 hover:bg-red-500 text-neutral-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}

                  {/* Click to zoom badge */}
                  <div className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-full bg-black/75 border border-white/10 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 backdrop-blur-md pointer-events-none">
                    <ExternalLink size={12} className="text-[#06cdff]" />
                    <span>{lang === 'bn' ? 'ফুল স্ক্রিন প্রিভিউ' : 'Fullscreen'}</span>
                  </div>
                </div>

                {/* Right Flanking Navigation Arrow */}
                <button
                  type="button"
                  onClick={handleNextSlider}
                  aria-label="Next Design"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#06cdff] text-white hover:text-[#06cdff] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 shadow-xl active:scale-95 z-20"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Clean Slide Dots & Count Indicator (1 / 6) */}
              {graphicItems.length > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="flex items-center gap-1.5">
                    {graphicItems.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === sliderIndex
                            ? 'w-7 bg-[#06cdff] shadow-[0_0_10px_rgba(6,205,255,0.6)]'
                            : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-mono text-neutral-400">
                    <span className="text-[#06cdff] font-bold">{sliderIndex + 1}</span> / {graphicItems.length}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Graphic Lightbox Modal */}
      <AnimatePresence>
        {selectedGraphic && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedGraphic(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0a0a] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              <button
                onClick={() => setSelectedGraphic(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-[#06cdff] hover:text-black text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-neutral-950 mb-4">
                <SafeProjectImage
                  src={selectedGraphic.image}
                  alt={selectedGraphic.title}
                  lang={lang}
                  onImageReplace={(newSrc) => {
                    onUpdateGraphic?.(selectedGraphic.id, { image: newSrc });
                  }}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedGraphic.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {selectedGraphic.desc}
                  </p>
                </div>
                <a
                  href={selectedGraphic.image}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06cdff] text-black text-xs font-bold hover:bg-[#05b8e6] transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>Open Full Size</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0a0a] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            >
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-[#06cdff] hover:text-black text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="aspect-video bg-neutral-950 rounded-xl overflow-hidden mb-4">
                <iframe
                  src={`${activeVideoModal.url}?autoplay=1&title=0&byline=0&portrait=0`}
                  title={activeVideoModal.title}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {activeVideoModal.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {activeVideoModal.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Graphic / Design Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#0a0a0a] border border-[#262626] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#06cdff]/10 border border-[#06cdff]/30 flex items-center justify-center text-[#06cdff]">
                    <Plus size={16} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {lang === 'bn' ? 'নতুন ডিজাইন যোগ করুন' : 'Add New Design Project'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                {/* Image Upload / URL */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'ইমেজ আপলোড বা লিংক' : 'Image Upload or Direct URL'} *
                  </label>

                  {/* File Upload Box */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#2b2b2b] hover:border-[#06cdff]/60 rounded-2xl p-4 bg-[#141414] cursor-pointer transition-colors group mb-2.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload size={22} className="text-neutral-400 group-hover:text-[#06cdff] mb-1.5 transition-colors" />
                    <span className="text-xs text-neutral-300 font-medium group-hover:text-white transition-colors">
                      {lang === 'bn' ? 'কম্পিউটার বা ফোন থেকে ছবি সিলেক্ট করুন' : 'Click to upload image file'}
                    </span>
                    <span className="text-[10px] text-neutral-500 mt-0.5">PNG, JPG, WEBP</span>
                  </label>

                  {/* Or Image URL input */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-mono">OR</span>
                    <input
                      type="url"
                      placeholder={lang === 'bn' ? 'অথবা ছবির অনলাইন লিংক পেস্ট করুন (https://...)' : 'Or paste direct image URL (https://...)'}
                      value={newImage.startsWith('data:') ? '' : newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06cdff]"
                    />
                  </div>

                  {/* Image Preview if available */}
                  {newImage && (
                    <div className="mt-3 relative rounded-xl overflow-hidden border border-[#262626] max-h-36 bg-neutral-950 flex items-center justify-center">
                      <img src={newImage} alt="Preview" className="max-h-36 object-contain" />
                      <button
                        type="button"
                        onClick={() => setNewImage('')}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/80 text-white hover:bg-red-500 text-xs transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'প্রজেক্টের নাম' : 'Project Title'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'যেমন: YouTube Viral Thumbnail' : 'e.g., YouTube Viral Thumbnail'}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06cdff]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'সংক্ষিপ্ত বিবরণ' : 'Description'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: High CTR Social Media Thumbnail Design' : 'e.g., High CTR Social Media Thumbnail Design'}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06cdff]"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewCategory('graphic')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        newCategory === 'graphic'
                          ? 'bg-[#06cdff] text-black border-[#06cdff]'
                          : 'bg-[#141414] text-neutral-400 border-[#262626] hover:text-white'
                      }`}
                    >
                      {lang === 'bn' ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewCategory('branding')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        newCategory === 'branding'
                          ? 'bg-[#06cdff] text-black border-[#06cdff]'
                          : 'bg-[#141414] text-neutral-400 border-[#262626] hover:text-white'
                      }`}
                    >
                      {lang === 'bn' ? 'ব্র্যান্ডিং' : 'Branding'}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={!newImage}
                    className="px-6 py-2.5 rounded-xl bg-[#06cdff] hover:bg-[#05b8e6] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-xs transition-all cursor-pointer shadow-lg"
                  >
                    {lang === 'bn' ? 'প্রজেক্ট সেভ করুন' : 'Save Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* ADD VIDEO MODAL */}
        {isAddVideoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-[#262626] rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#262626]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#06cdff]/10 border border-[#06cdff]/30 flex items-center justify-center text-[#06cdff]">
                    <Video size={16} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {lang === 'bn' ? 'নতুন ভিডিও যুক্ত করুন' : 'Add New Video'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddVideoModalOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddVideoSubmit} className="space-y-4">
                {/* Video URL */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'ভিডিও লিংক (YouTube বা Vimeo URL)' : 'Video Link (YouTube or Vimeo URL)'} *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=... বা https://vimeo.com/..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06cdff]"
                  />
                  <p className="text-[10px] text-neutral-400 mt-1">
                    {lang === 'bn'
                      ? 'ইউটিউব ভিডিও/শর্টস অথবা ভিমিও ভিডিওর সাধারণ লিংক পেস্ট করলেই চলবে।'
                      : 'Standard YouTube videos, Shorts or Vimeo video links are supported.'}
                  </p>
                </div>

                {/* Video Title */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'ভিডিওর নাম / শিরোনাম' : 'Video Title'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: Cinematic Travel Reel Edit' : 'e.g., Cinematic Travel Reel Edit'}
                    value={newVideoTitle}
                    onChange={(e) => setNewVideoTitle(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06cdff]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    {lang === 'bn' ? 'সংক্ষিপ্ত বিবরণ' : 'Description'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: High retention short form edit with sound design' : 'e.g., High retention short form edit with sound design'}
                    value={newVideoDesc}
                    onChange={(e) => setNewVideoDesc(e.target.value)}
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#06cdff]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddVideoModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={!newVideoUrl.trim()}
                    className="px-6 py-2.5 rounded-xl bg-[#06cdff] hover:bg-[#05b8e6] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-xs transition-all cursor-pointer shadow-lg"
                  >
                    {lang === 'bn' ? 'ভিডিও সেভ করুন' : 'Save Video'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
