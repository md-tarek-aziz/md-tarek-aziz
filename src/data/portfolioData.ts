import {
  PortfolioProfile,
  VideoProject,
  GraphicProject,
  ExpertiseCard,
  AcademicDegree,
  ProfessionalTraining,
} from '../types/portfolio';

// User authentic portrait photo from WhatsApp
import tarekUserPhoto from '../assets/images/user_tarek_photo.jpg';

export const defaultProfile: PortfolioProfile = {
  name: 'Md Tarek Aziz',
  nameLine1: 'MD TAREK',
  nameLine2: 'AZIZ',
  role: 'CREATIVE VISUALIZER • VIDEO EDITOR',
  tagline: 'Transforming raw visual footage into viral, retention-driven stories.',
  bio: 'Specializing in high-retention social media video editing, motion design, and brand identity systems.',
  email: 'hmtarekaziz00@gmail.com',
  whatsapp: '01883555337',
  location: 'Dhaka, Bangladesh (Remote Worldwide)',
  availabilityStatus: 'Available for Projects',
  heroImage: tarekUserPhoto,
  stats: [
    { label: 'Experience', value: '3+ Months', highlight: true },
    { label: 'Completed Works', value: '46+', highlight: false },
    { label: 'Audience Reach', value: '2.5M+', highlight: true },
    { label: 'Client Satisfaction', value: '99%', suffix: '✓', highlight: false },
  ],
  socialLinks: [
    { platform: 'Email', url: 'mailto:hmtarekaziz00@gmail.com', label: 'hmtarekaziz00@gmail.com' },
    { platform: 'WhatsApp', url: 'https://wa.me/8801883555337', label: '01883555337' },
    { platform: 'Facebook', url: 'https://www.facebook.com/md.tarek.aziz.607674', label: 'Md Tarek Aziz (Facebook)' },
    { platform: 'Instagram', url: 'https://instagram.com', label: 'Instagram' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', label: 'LinkedIn' },
    { platform: 'YouTube', url: 'https://youtube.com', label: 'YouTube' },
  ],
};

export const defaultVideos: VideoProject[] = [];

export const defaultGraphics: GraphicProject[] = [
  {
    id: 1,
    title: 'Smart Watch Commercial Social Media Ad Banner',
    desc: 'High-converting smartwatch promotional visual ad campaign designed for digital marketing and social media engagement.',
    image: 'https://i.postimg.cc/0QrrDvN8/3711-MD-Tarek-Aziz-(whats)-Copy.png',
    category: 'branding',
  },
  {
    id: 2,
    title: 'Creative Product Promotional Poster Design',
    desc: 'Striking commercial product poster composition with professional lighting, typography, and brand storytelling.',
    image: 'https://i.postimg.cc/bYW3B046/3707-Mahfujur-Rahman-Product-Poster-Design-02.jpg',
    category: 'branding',
  },
  {
    id: 3,
    title: 'Social Media Brand Advertisement Campaign',
    desc: 'Modern, vibrant visual advertising banner crafted for maximum click-through rates and high conversion.',
    image: 'https://i.postimg.cc/rpf9C5SP/ads.png',
    category: 'branding',
  },
  {
    id: 4,
    title: 'Commercial Product Packaging & Brand Showcase',
    desc: 'Clean, minimalist product design and packaging visual highlighting key features and luxury brand aesthetics.',
    image: 'https://i.postimg.cc/d1G9D7Wv/prodac.png',
    category: 'branding',
  },
  {
    id: 5,
    title: 'Luxury Perfume Brand Advertising Design',
    desc: 'Premium perfume bottle commercial visual ad featuring elegant color harmony, atmospheric lighting, and brand identity.',
    image: 'https://i.postimg.cc/CKxG1dWq/MD-TAREK-AZIZ-3711luxure-perfume.png',
    category: 'branding',
  },
  {
    id: 6,
    title: 'Visual Identity & Creative Brand Composition',
    desc: 'Signature branding graphic poster blending kinetic typography with striking artistic visual direction.',
    image: 'https://i.postimg.cc/wT8VKkjv/ta.png',
    category: 'branding',
  },
  {
    id: 7,
    title: 'Commercial Brand & Product Ad Design',
    desc: 'High-converting social media promotional banner & product visual composition',
    image: 'https://i.postimg.cc/5tMpwqDh/ads3.png',
    category: 'graphic',
  },
];

export const defaultExpertise: ExpertiseCard[] = [
  {
    id: 'video_editing',
    titleEn: 'VIDEO EDITING',
    titleBn: 'ভিডিও এডিটিং',
    descEn: 'Short-form content, YouTube videos, commercial ads, kinetic typography, podcast editing, color grading & sound design.',
    descBn: 'শর্ট-ফর্ম কন্টেন্ট, ইউটিউব ভিডিও, কমার্শিয়াল অ্যাডস, কাইনেটিক টাইপোগ্রাফি, পডকাস্ট এডিটিং, কালার গ্রেডিং ও সাউন্ড ডিজাইন।',
    tags: ['Premiere Pro', 'After Effects', 'CapCut'],
    icon: 'video',
  },
  {
    id: 'graphic_design',
    titleEn: 'GRAPHIC DESIGN',
    titleBn: 'গ্রাফিক ডিজাইন',
    descEn: 'Posters, social media banners, YouTube thumbnails, flyer/brochure design & digital branding assets.',
    descBn: 'পোস্টার, সোশ্যাল মিডিয়া ব্যানার, ইউটিউব থাম্বনেইল, ফ্লায়ার/ব্রোশিওর ডিজাইন ও ডিজিটাল ব্র্যান্ডিং অ্যাসেট।',
    tags: ['Photoshop', 'Illustrator', 'Canva'],
    icon: 'palette',
  },
  {
    id: 'visualization',
    titleEn: 'CREATIVE VISUALIZATION',
    titleBn: 'ক্রিয়েটিভ ভিজ্যুয়ালাইজেশন',
    descEn: 'Concept development, visual storytelling & information visualization.',
    descBn: 'কনসেপ্ট ডেভেলপমেন্ট, ভিজ্যুয়াল স্টোরিটেলিং ও ইনফরমেশন ভিজ্যুয়ালাইজেশন।',
    tags: [],
    icon: 'eye',
  },
  {
    id: 'script_writing',
    titleEn: 'SCRIPT WRITING',
    titleBn: 'স্ক্রিপ্ট রাইটিং',
    descEn: 'Video scripts, promotional content, storytelling & voice-over scripts.',
    descBn: 'ভিডিও স্ক্রিপ্ট, প্রমোশনাল কন্টেন্ট, স্টোরিটেলিং ও ভয়েস-ওভার স্ক্রিপ্ট।',
    tags: [],
    icon: 'file-text',
  },
  {
    id: 'speaking',
    titleEn: 'PUBLIC SPEAKING',
    titleBn: 'পাবলিক স্পিকিং',
    descEn: 'Presentation, audience engagement & effective communication.',
    descBn: 'উপস্থাপনা, অডিয়েন্স এনগেজমেন্ট ও কার্যকর যোগাযোগ।',
    tags: [],
    icon: 'mic',
  },
  {
    id: 'leadership',
    titleEn: 'LEADERSHIP',
    titleBn: 'লিডারশিপ',
    descEn: 'Team coordination, creative direction & project execution.',
    descBn: 'টিম কো-অর্ডিনেশন, ক্রিয়েটিভ ডিরেকশন ও প্রজেক্ট এক্সিকিউশন।',
    tags: [],
    icon: 'users',
  },
];

export const defaultSoftwareProficiency = [
  { name: 'Adobe Premiere Pro', level: 95, category: 'Video Editing' },
  { name: 'Adobe After Effects', level: 88, category: 'Motion Design' },
  { name: 'DaVinci Resolve Studio', level: 85, category: 'Color Grading' },
  { name: 'Adobe Photoshop', level: 92, category: 'Graphic Design' },
  { name: 'Adobe Illustrator', level: 86, category: 'Vector & Branding' },
  { name: 'CapCut Pro', level: 96, category: 'Viral Short-Form' },
];

export const defaultAcademic: AcademicDegree[] = [
  {
    title: 'Dawra-e Hadith',
    desc: 'Masters Equivalent in Islamic Studies',
    fullDesc: 'Highest academic degree in Hadith literature, Quranic exegesis, Islamic theology, and Classical Arabic literature.',
    year: '2025',
    status: 'Completed 2025',
  },
  {
    title: 'Secondary School Certificate (SSC)',
    desc: 'Secondary Education Curriculum',
    fullDesc: 'Successfully completed the secondary education curriculum with strong academic distinction.',
    year: '2025',
    status: 'Completed 2025',
  },
  {
    title: 'Higher Secondary Certificate (HSC)',
    desc: 'Higher Secondary Education',
    fullDesc: 'Currently enrolled and actively pursuing the second year curriculum in Higher Secondary education.',
    year: 'Ongoing / Running',
    status: '2nd Year Ongoing (Running)',
  },
];

export const defaultTraining: ProfessionalTraining = {
  institute: 'As-Sunnah Skill Development Institute',
  course: 'SBMC (Small Business Management Course)',
  batch: 'Batch 37',
  status: 'Certified Professional',
  description: 'Professional creative training in video editing, motion design, graphic identity, and meta advertising strategies.',
  badges: ['SBMC (Small Business Management Course)', 'Batch 37', 'Certified Professional'],
  competencies: [
    { title: 'Video Editing', desc: 'Premiere Pro, After Effects & DaVinci Resolve' },
    { title: 'Graphic Design', desc: 'Photoshop, Illustrator, Canva Pro & Branding' },
    { title: 'Meta Marketing', desc: 'Facebook & Instagram High-ROI Ads Strategy' },
    { title: 'Generative AI Tools', desc: 'Prompt Engineering, AI Visuals & Fast Workflows' },
  ],
};

export const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'My Projects',
      expertise: 'Core Expertise',
      education: 'Education',
      contact: 'Contact',
      cv: 'Download CV',
      talk: "Let's Talk",
    },
    hero: {
      role: 'CREATIVE VISUALIZER • VIDEO EDITOR',
      nameLine1: 'MD TAREK',
      nameLine2: 'AZIZ',
      desc: 'Transforming raw visual footage into <br /> viral, retention-driven stories.',
      projects: 'My Projects',
      contact: 'Contact Me',
      available: 'Available for Projects',
      location: 'Dhaka, Bangladesh (Remote Worldwide)',
    },
    stats: {
      experience: 'Experience',
      works: 'Completed Works',
      reach: 'Audience Reach',
      satisfaction: 'Client Satisfaction',
    },
    projects_section: {
      title: 'My Projects',
      video: 'Video Editing',
      graphic: 'Graphic Design',
      branding: 'Branding',
      slider_view: 'Slider View',
      grid_view: 'Grid View',
    },
    expertise: {
      title: 'Core Expertise & Skills',
      proficiency: 'View Detailed Software Proficiency Matrix',
    },
    education: {
      title: 'My Education & Creative Learning',
      subtitle: 'Academic credentials alongside professional creative training from As-Sunnah Skill Development Institute',
      academic_bg: 'Part 1: Academic Background',
      prof_dev: 'Part 2: Professional Skill Development',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Feel free to connect directly for video editing, graphic design, or creative collaboration.',
      email: 'Email Address',
      whatsapp: 'WhatsApp',
      facebook: 'Facebook',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
    },
  },
  bn: {
    nav: {
      home: 'হোম',
      projects: 'প্রজেক্টসমূহ',
      expertise: 'দক্ষতা',
      education: 'শিক্ষা',
      contact: 'যোগাযোগ',
      cv: 'সিভি ডাউনলোড',
      talk: 'কথা বলুন',
    },
    hero: {
      role: 'ক্রিয়েটিভ ভিজ্যুয়ালাইজার • ভিডিও এডিটর',
      nameLine1: 'এমডি তারেক',
      nameLine2: 'আজিজ',
      desc: 'সাধারণ ফুটেজকে <br /> ভাইরাল, রিটেনশন-ড্রাইভেন স্টোরিতে রূপান্তর করি।',
      projects: 'আমার প্রজেক্ট',
      contact: 'যোগাযোগ',
      available: 'প্রজেক্টের জন্য প্রস্তুত',
      location: 'ঢাকা, বাংলাদেশ (রিমোটলি)',
    },
    stats: {
      experience: 'অভিজ্ঞতা',
      works: 'সম্পন্ন কাজ',
      reach: 'অডিয়েন্স রিচ',
      satisfaction: 'ক্লায়েন্ট সন্তুষ্টি',
    },
    projects_section: {
      title: 'আমার প্রজেক্ট',
      video: 'ভিডিও এডিটিং',
      graphic: 'গ্রাফিক ডিজাইন',
      branding: 'ব্র্যান্ডিং',
      slider_view: 'স্লাইডার ভিউ',
      grid_view: 'গ্রিড ভিউ',
    },
    expertise: {
      title: 'মূল দক্ষতা ও গুণাবলি',
      proficiency: 'সফ্টওয়্যার প্রফিসিয়েন্সি ম্যাট্রিক্স দেখুন',
    },
    education: {
      title: 'শিক্ষা ও সৃজনশীল শিক্ষা',
      subtitle: 'আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট থেকে পেশাদার সৃজনশীল প্রশিক্ষণ',
      academic_bg: 'পর্ব ১: একাডেমিক ব্যাকগ্রাউন্ড',
      prof_dev: 'পর্ব ২: পেশাদার দক্ষতা উন্নয়ন',
    },
    contact: {
      title: 'যোগাযোগ',
      subtitle: 'ভিডিও এডিটিং, গ্রাফিক ডিজাইন বা সৃজনশীল প্রজেক্টের জন্য সরাসরি যোগাযোগ করুন।',
      email: 'ইমেইল',
      whatsapp: 'হোয়াটসঅ্যাপ',
      facebook: 'ফেসবুক',
      instagram: 'ইনস্টাগ্রাম',
      linkedin: 'লিঙ্কডইন',
      twitter: 'টুইটার',
    },
  },
};
