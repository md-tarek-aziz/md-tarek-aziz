import React, { useState } from 'react';
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
} from 'lucide-react';
import { VideoProject, GraphicProject } from '../types/portfolio';
import { translations } from '../data/portfolioData';

interface ProjectsSectionProps {
  videos: VideoProject[];
  graphics: GraphicProject[];
  onAddGraphic?: (graphic: Omit<GraphicProject, 'id'>) => void;
  onDeleteGraphic?: (id: number | string) => void;
  lang: 'en' | 'bn';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  videos,
  graphics,
  onAddGraphic,
  onDeleteGraphic,
  lang,
}) => {
  const t = translations[lang].projects_section;
  const [activeTab, setActiveTab] = useState<'video' | 'graphic' | 'branding'>('video');
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('slider');
  const [sliderIndex, setSliderIndex] = useState(0);

  // Lightbox modal state for graphics
  const [selectedGraphic, setSelectedGraphic] = useState<GraphicProject | null>(null);

  // Active video player modal state
  const [activeVideoModal, setActiveVideoModal] = useState<VideoProject | null>(null);

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
    activeTab === 'branding' ? g.category === 'branding' : g.category !== 'branding'
  );

  const currentItemsCount =
    activeTab === 'video' ? videos.length : graphicItems.length;

  const handleNextSlider = () => {
    setSliderIndex((prev) => (prev + 1) % Math.max(1, currentItemsCount));
  };

  const handlePrevSlider = () => {
    setSliderIndex((prev) => (prev - 1 + currentItemsCount) % Math.max(1, currentItemsCount));
  };

  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto">
      {/* Star Pill Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        {/* Star Pill Header */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(212,248,38,0.55)' }}
          whileTap={{ scale: 0.95, boxShadow: '0 0 10px rgba(212,248,38,0.3)' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#141414] border border-[#2a2a2a] rounded-full text-xs font-bold text-[#d4f826] mb-4 cursor-pointer hover:border-[#d4f826] transition-all duration-300 select-none"
        >
          <Star size={14} className="fill-[#d4f826] text-[#d4f826]" />
          <span>{t.title.toUpperCase()}</span>
        </motion.div>

        {/* Section Headline */}
        <h2 className="text-4xl sm:text-6xl font-extrabold mb-8 text-white select-none">
          {lang === 'bn' ? (
            <>
              আমার <span className="text-[#d4f826]">প্রজেক্ট</span>
            </>
          ) : (
            <>
              My <span className="text-[#d4f826]">Projects</span>
            </>
          )}
        </h2>

        {/* Category Pill Switcher */}
        <div className="inline-flex bg-[#0a0a0a] p-1 rounded-full border border-[#d4f826] shadow-2xl mb-8 relative flex-wrap justify-center gap-1">
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
                ? 'bg-[#d4f826] text-black shadow-[0_0_20px_rgba(212,248,38,0.4)]'
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
                ? 'bg-[#d4f826] text-black shadow-[0_0_20px_rgba(212,248,38,0.4)]'
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
                ? 'bg-[#d4f826] text-black shadow-[0_0_20px_rgba(212,248,38,0.4)]'
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
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a] p-4 sm:p-5 rounded-2xl border border-[#262626] mb-8 group transition-all duration-300 hover:border-[#d4f826]/40 hover:shadow-[0_0_20px_rgba(212,248,38,0.15)]">
          <div className="flex items-center gap-3.5 text-left">
            <div className="p-2.5 sm:p-3 bg-[#141414] rounded-xl border border-[#262626] text-[#d4f826]">
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
            {activeTab !== 'video' && onAddGraphic && (
              <button
                type="button"
                onClick={() => {
                  setNewCategory(activeTab === 'branding' ? 'branding' : 'graphic');
                  setIsAddModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#d4f826] hover:bg-[#c2e223] text-black font-extrabold rounded-xl text-xs sm:text-sm transition-all cursor-pointer shadow-md select-none"
              >
                <Plus size={15} />
                <span>{lang === 'bn' ? 'ডিজাইন যোগ করুন' : 'Add Design'}</span>
              </button>
            )}

            <button
              onClick={() => setViewMode((prev) => (prev === 'grid' ? 'slider' : 'grid'))}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#141414] border border-[#2a2a2a] rounded-xl text-xs sm:text-sm font-semibold text-white hover:border-[#d4f826]/60 hover:bg-[#1e1e1e] transition-all cursor-pointer shrink-0"
            >
              {viewMode === 'grid' ? (
                <>
                  <SlidersHorizontal size={14} className="text-[#d4f826]" />
                  <span>{t.slider_view}</span>
                </>
              ) : (
                <>
                  <LayoutGrid size={14} className="text-[#d4f826]" />
                  <span>{t.grid_view}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* VIDEO TAB CONTENT */}
      {activeTab === 'video' && (
        <div className="space-y-8">
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  className="group border border-[#262626] bg-[#0a0a0a] rounded-2xl p-4 transition-all hover:border-[#d4f826]/40 hover:shadow-[0_0_20px_rgba(212,248,38,0.2)] flex flex-col justify-between"
                >
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

                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#d4f826] transition-colors line-clamp-2">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-4">
                      {vid.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal(vid)}
                    className="w-full py-2 px-3 rounded-xl bg-[#1a1a1a] hover:bg-[#d4f826] hover:text-black text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play size={13} fill="currentColor" />
                    <span>{lang === 'bn' ? 'ফুল স্ক্রিনে চালান' : 'Watch Full Screen'}</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Slider View for Videos - Exact match with user screenshot */
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center gap-3 sm:gap-6 py-2">
              {/* Left Flanking Navigation Arrow */}
              <button
                type="button"
                onClick={handlePrevSlider}
                aria-label="Previous Video"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#d4f826] text-white hover:text-[#d4f826] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 shadow-xl active:scale-95 z-10"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Central Video Frame with Neon-Lime Rounded Border (NO text underneath) */}
              <div className="flex-1 w-full max-w-[860px] aspect-[16/10] sm:aspect-[16/9] bg-black rounded-[24px] sm:rounded-[32px] border-2 sm:border-[2.5px] border-[#d4f826] overflow-hidden shadow-[0_0_35px_rgba(212,248,38,0.22)] relative flex items-center justify-center">
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
              </div>

              {/* Right Flanking Navigation Arrow */}
              <button
                type="button"
                onClick={handleNextSlider}
                aria-label="Next Video"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#181818] hover:bg-[#242424] border border-[#2a2a2a] hover:border-[#d4f826] text-white hover:text-[#d4f826] flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 shadow-xl active:scale-95 z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* GRAPHIC / BRANDING TAB CONTENT */}
      {activeTab !== 'video' && (
        <div>
          {graphicItems.length === 0 ? (
            /* Empty State Container */
            <div className="border border-dashed border-[#2e2e2e] hover:border-[#d4f826]/40 bg-[#0a0a0a]/90 rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto transition-all shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#d4f826] mx-auto mb-4 shadow-[0_0_25px_rgba(212,248,38,0.15)]">
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
                  ? 'অন্যজনের পূর্বের ছবিগুলো সফলভাবে মুছে দেওয়া হয়েছে। এখন আপনি আপনার নিজের আকর্ষণীয় ডিজাইন, থাম্বনেইল বা ব্যানার যুক্ত করতে পারেন।'
                  : 'Previous sample images were cleared. You can now add or upload your own creative designs and posters.'}
              </p>
              {onAddGraphic && (
                <button
                  type="button"
                  onClick={() => {
                    setNewCategory(activeTab === 'branding' ? 'branding' : 'graphic');
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4f826] hover:bg-[#c2e223] text-black font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(212,248,38,0.3)] cursor-pointer"
                >
                  <Plus size={16} />
                  <span>{lang === 'bn' ? 'আপনার ডিজাইন যোগ করুন' : 'Add Your Design'}</span>
                </button>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {graphicItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedGraphic(item)}
                  className="group border border-[#262626] bg-[#0a0a0a] rounded-2xl p-3.5 transition-all hover:border-[#d4f826]/40 hover:shadow-[0_0_20px_rgba(212,248,38,0.25)] cursor-pointer flex flex-col justify-between relative"
                >
                  <div className="aspect-[4/3] bg-neutral-950 rounded-xl overflow-hidden mb-3 border border-[#262626] relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
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
                      <span className="px-3 py-1.5 rounded-full bg-[#d4f826] text-black text-xs font-bold flex items-center gap-1 shadow-lg">
                        <ExternalLink size={12} />
                        <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'Preview'}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d4f826] transition-colors truncate">
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
            /* Slider View for Graphics */
            <div className="relative max-w-2xl mx-auto">
              {graphicItems[sliderIndex] && (
                <div
                  onClick={() => setSelectedGraphic(graphicItems[sliderIndex])}
                  className="border border-[#262626] bg-[#0a0a0a] rounded-3xl p-6 shadow-2xl cursor-pointer group hover:border-[#d4f826]/50 relative"
                >
                  <div className="aspect-[4/3] bg-neutral-950 rounded-2xl overflow-hidden mb-4 border border-[#262626] relative">
                    <img
                      src={graphicItems[sliderIndex].image}
                      alt={graphicItems[sliderIndex].title}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                    />

                    {/* Delete button */}
                    {onDeleteGraphic && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteGraphic(graphicItems[sliderIndex].id);
                        }}
                        title="Delete this design"
                        className="absolute top-3 right-3 z-20 p-2.5 rounded-xl bg-black/80 hover:bg-red-500 text-neutral-300 hover:text-white transition-all opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-[#d4f826] transition-colors">
                    {graphicItems[sliderIndex].title}
                  </h4>
                  <p className="text-sm text-neutral-400 mt-1">
                    {graphicItems[sliderIndex].desc}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#262626]">
                    <span className="text-xs font-mono text-[#d4f826]">
                      {sliderIndex + 1} / {graphicItems.length}
                    </span>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={handlePrevSlider}
                        className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#d4f826] hover:text-black text-white transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={handleNextSlider}
                        className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#d4f826] hover:text-black text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
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
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-[#d4f826] hover:text-black text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-neutral-950 mb-4">
                <img
                  src={selectedGraphic.image}
                  alt={selectedGraphic.title}
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d4f826] text-black text-xs font-bold hover:bg-[#c2e223] transition-colors"
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
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-[#d4f826] hover:text-black text-white transition-colors cursor-pointer"
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
                  <div className="w-8 h-8 rounded-xl bg-[#d4f826]/10 border border-[#d4f826]/30 flex items-center justify-center text-[#d4f826]">
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
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#2b2b2b] hover:border-[#d4f826]/60 rounded-2xl p-4 bg-[#141414] cursor-pointer transition-colors group mb-2.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload size={22} className="text-neutral-400 group-hover:text-[#d4f826] mb-1.5 transition-colors" />
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
                      className="flex-1 bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4f826]"
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
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4f826]"
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
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4f826]"
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
                          ? 'bg-[#d4f826] text-black border-[#d4f826]'
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
                          ? 'bg-[#d4f826] text-black border-[#d4f826]'
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
                    className="px-6 py-2.5 rounded-xl bg-[#d4f826] hover:bg-[#c2e223] disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-xs transition-all cursor-pointer shadow-lg"
                  >
                    {lang === 'bn' ? 'প্রজেক্ট সেভ করুন' : 'Save Project'}
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
