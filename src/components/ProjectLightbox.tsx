import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, User, Layers, CheckCircle2, Film, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  lang: 'en' | 'bn';
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose, lang }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0a0b12] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#0a0b12]/95 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between">
          {/* Clean unboxed metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-amber-400 font-semibold">{project.categoryLabel}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>Client: {project.client}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Container */}
        <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b12] via-transparent to-transparent opacity-80" />
          
          {project.videoDuration && (
            <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>Runtime: {project.videoDuration}</span>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {project.title}
            </h2>
            <p className="mt-3 text-base text-neutral-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Metrics / Highlights */}
          {project.metrics && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-mono text-amber-300 block uppercase tracking-wider">
                  Impact & Performance
                </span>
                <span className="text-sm font-semibold text-white">
                  {project.metrics}
                </span>
              </div>
            </div>
          )}

          {/* Grid of details: Role, Tools, Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-800">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                My Role
              </h4>
              <p className="text-sm font-medium text-white">
                {project.role}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Software & Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs text-neutral-300 font-mono">
                {project.tools.map((tool, idx) => (
                  <span key={idx}>
                    {tool}{idx < project.tools.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Key Deliverables
              </h4>
              <ul className="text-xs text-neutral-300 space-y-1">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500">
              High-definition production asset
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Close View
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors font-semibold"
              >
                Inquire Similar Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
