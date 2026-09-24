import React, { useState, useEffect } from 'react';
import {
  defaultProfile,
  defaultVideos,
  defaultGraphics,
} from './data/portfolioData';
import { PortfolioProfile, GraphicProject, VideoProject } from './types/portfolio';

import { CustomCursor } from './components/CustomCursor';
import { ProgressBar } from './components/ProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsStack } from './components/SkillsStack';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BottomMobileBar } from './components/BottomMobileBar';
import { CustomizerModal } from './components/CustomizerModal';

export default function App() {
  // Default to English first when anyone enters the website
  const [lang, setLang] = useState<'en' | 'bn'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang === 'bn' || urlLang === 'en') {
          return urlLang;
        }
        const savedLang = localStorage.getItem('tarek_portfolio_lang');
        if (savedLang === 'bn' || savedLang === 'en') {
          return savedLang;
        }
      }
    } catch (e) {
      // fallback
    }
    return 'en';
  });

  const handleToggleLang = (newLang: 'en' | 'bn') => {
    setLang(newLang);
    try {
      localStorage.setItem('tarek_portfolio_lang', newLang);
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const [activeSection, setActiveSection] = useState('home');
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Load saved profile if modified in browser
  const [profile, setProfile] = useState<PortfolioProfile>(() => {
    try {
      const saved = localStorage.getItem('tarek_portfolio_profile_v2');
      if (saved) {
        return {
          ...defaultProfile,
          ...JSON.parse(saved),
        };
      }
      const v1 = localStorage.getItem('tarek_portfolio_profile');
      if (v1) {
        const parsed = JSON.parse(v1);
        const migrated = {
          ...defaultProfile,
          ...parsed,
          heroImage: defaultProfile.heroImage,
        };
        localStorage.setItem('tarek_portfolio_profile_v2', JSON.stringify(migrated));
        return migrated;
      }
    } catch (e) {
      // fallback
    }
    return defaultProfile;
  });

  // Video projects state (stored in localStorage)
  const [videos, setVideos] = useState<VideoProject[]>(() => {
    try {
      const saved = localStorage.getItem('tarek_portfolio_videos_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      // fallback
    }
    return defaultVideos;
  });

  const handleAddVideo = (newVideo: Omit<VideoProject, 'id'>) => {
    const item: VideoProject = {
      ...newVideo,
      id: Date.now(),
    };
    setVideos((prev) => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem('tarek_portfolio_videos_v1', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleDeleteVideo = (id: number | string) => {
    setVideos((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      try {
        localStorage.setItem('tarek_portfolio_videos_v1', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Custom graphic projects state (stored in localStorage)
  const [graphics, setGraphics] = useState<GraphicProject[]>(() => {
    try {
      const saved = localStorage.getItem('tarek_portfolio_graphics_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingImages = new Set(parsed.map((p: GraphicProject) => p.image));
          const missingDefaults = defaultGraphics.filter((dg) => !existingImages.has(dg.image));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch (e) {
      // fallback
    }
    return defaultGraphics;
  });

  const handleAddGraphic = (newGraphic: Omit<GraphicProject, 'id'>) => {
    const item: GraphicProject = {
      ...newGraphic,
      id: Date.now(),
    };
    setGraphics((prev) => {
      const updated = [item, ...prev];
      try {
        localStorage.setItem('tarek_portfolio_graphics_v5', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleDeleteGraphic = (id: number | string) => {
    setGraphics((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      try {
        localStorage.setItem('tarek_portfolio_graphics_v5', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSaveProfile = (newProfile: PortfolioProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('tarek_portfolio_profile_v2', JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const handlePhotoUpload = (photoUrl: string) => {
    const updated = { ...profile, heroImage: photoUrl };
    handleSaveProfile(updated);
  };

  const handleResetDefaults = () => {
    setProfile(defaultProfile);
    try {
      localStorage.removeItem('tarek_portfolio_profile_v2');
      localStorage.removeItem('tarek_portfolio_profile');
    } catch (e) {
      console.error(e);
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white dot-pattern selection:bg-[#06cdff] selection:text-black">
      {/* Top Scroll Indicator */}
      <ProgressBar />

      {/* Glowing Custom Cursor follower */}
      <CustomCursor />

      {/* Floating Pill Top Navbar */}
      <Navbar
        profile={profile}
        lang={lang}
        onToggleLang={handleToggleLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Main Content matching mohiuddinmahim.vercel.app layout */}
      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto md:pb-28">
        {/* Section: Hero */}
        <Hero
          profile={profile}
          lang={lang}
          onNavigate={handleNavigate}
          onUploadPhoto={handlePhotoUpload}
        />

        {/* Section: 4 Metrics Stats Bar */}
        <StatsBar lang={lang} />

        {/* Section: My Projects (Video Player, Graphic Grid & Lightbox) */}
        <ProjectsSection
          videos={videos}
          graphics={graphics}
          onAddVideo={handleAddVideo}
          onDeleteVideo={handleDeleteVideo}
          onAddGraphic={handleAddGraphic}
          onDeleteGraphic={handleDeleteGraphic}
          lang={lang}
        />

        {/* Section: Core Expertise & Skills + Software Matrix */}
        <SkillsStack lang={lang} />

        {/* Section: Education & Creative Learning (Academic + As-Sunnah) */}
        <EducationSection lang={lang} />

        {/* Section: Direct Contact & Brief Form */}
        <ContactSection profile={profile} lang={lang} />
      </main>

      {/* Footer */}
      <Footer profile={profile} lang={lang} />

      {/* Sticky Bottom Navigation for Mobile */}
      <BottomMobileBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        lang={lang}
      />

      {/* Live Customizer Modal */}
      <CustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
        onResetDefaults={handleResetDefaults}
        lang={lang}
      />
    </div>
  );
}
