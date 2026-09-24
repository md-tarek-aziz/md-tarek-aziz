import React, { useState } from 'react';
import {
  X,
  Save,
  Check,
  RotateCcw,
  Edit3,
  Camera,
} from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PortfolioProfile;
  onSaveProfile: (profile: PortfolioProfile) => void;
  onResetDefaults: () => void;
  lang: 'en' | 'bn';
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetDefaults,
  lang,
}) => {
  const [editableProfile, setEditableProfile] = useState<PortfolioProfile>({ ...profile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveProfile(editableProfile);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditableProfile((prev) => ({ ...prev, heroImage: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[#262626] rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#06cdff]/10 border border-[#06cdff]/30 flex items-center justify-center text-[#06cdff]">
              <Edit3 size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'bn' ? 'পোর্টফোলিও তথ্য পরিবর্তন করুন' : 'Edit Portfolio Details'}
              </h3>
              <p className="text-xs text-neutral-400">
                {lang === 'bn' ? 'নাম, ছবি এবং যোগাযোগের তথ্য কাস্টমাইজ করুন' : 'Update name, portrait photo, and contacts'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold text-xs transition-colors cursor-pointer"
            >
              {saveSuccess ? <Check size={14} /> : <Save size={14} />}
              <span>{saveSuccess ? (lang === 'bn' ? 'সেভ হয়েছে!' : 'Saved!') : (lang === 'bn' ? 'সেভ করুন' : 'Save')}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Two Line Name Headline Config */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] space-y-3">
            <span className="text-xs font-mono text-[#06cdff] uppercase tracking-wider block font-bold">
              Headline Name (Two Lines on Hero)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Line 1 (White Headline)
                </label>
                <input
                  type="text"
                  value={editableProfile.nameLine1}
                  onChange={(e) => setEditableProfile({ ...editableProfile, nameLine1: e.target.value })}
                  placeholder="MD TAREK"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#262626] text-sm text-white font-bold uppercase focus:outline-none focus:border-[#06cdff]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Line 2 (Neon Cyan Headline)
                </label>
                <input
                  type="text"
                  value={editableProfile.nameLine2}
                  onChange={(e) => setEditableProfile({ ...editableProfile, nameLine2: e.target.value })}
                  placeholder="AZIZ"
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-[#262626] text-sm text-[#06cdff] font-bold uppercase focus:outline-none focus:border-[#06cdff]"
                />
              </div>
            </div>
          </div>

          {/* Photo Upload & Preview */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-[#06cdff]/40 overflow-hidden relative shrink-0">
              <img
                src={editableProfile.heroImage}
                alt="Portrait Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full space-y-2">
              <label className="text-xs font-mono text-neutral-300 block font-bold">
                {lang === 'bn' ? 'আপনার ছবি সিলেক্ট করুন (Upload Portrait Photo)' : 'Upload Your Photo (PNG/JPEG)'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#06cdff] file:text-black hover:file:bg-[#05b8e6] cursor-pointer"
              />
              <p className="text-[11px] text-neutral-500 font-mono">
                Upload your picture from your device to immediately see it with the glowing background!
              </p>
            </div>
          </div>

          {/* Other Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">
                Full Name (Navbar & Footer)
              </label>
              <input
                type="text"
                value={editableProfile.name}
                onChange={(e) => setEditableProfile({ ...editableProfile, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#06cdff]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={editableProfile.email}
                onChange={(e) => setEditableProfile({ ...editableProfile, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#06cdff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={editableProfile.whatsapp}
                onChange={(e) => setEditableProfile({ ...editableProfile, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#06cdff]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">
                Location & Work Scope
              </label>
              <input
                type="text"
                value={editableProfile.location}
                onChange={(e) => setEditableProfile({ ...editableProfile, location: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#06cdff]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">
              Availability Status Text
            </label>
            <input
              type="text"
              value={editableProfile.availabilityStatus}
              onChange={(e) => setEditableProfile({ ...editableProfile, availabilityStatus: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#06cdff]"
            />
          </div>

          {/* Reset button */}
          <div className="pt-4 border-t border-[#262626] flex justify-between items-center">
            <button
              onClick={() => {
                onResetDefaults();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset to Defaults</span>
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-full bg-[#06cdff] hover:bg-[#05b8e6] text-black font-extrabold text-xs transition-colors cursor-pointer shadow-lg"
            >
              {lang === 'bn' ? 'পরিবর্তন সেভ করুন' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
