export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  username?: string;
}

export interface StatMetric {
  value: string;
  label: string;
  suffix?: string;
  highlight?: boolean;
  detail?: string;
}

export interface VideoProject {
  id: number | string;
  title: string;
  desc: string;
  type: 'vimeo' | 'youtube' | 'mp4';
  url: string;
  duration?: string;
}

export interface GraphicProject {
  id: number | string;
  title: string;
  desc: string;
  image: string;
  category?: 'graphic' | 'branding';
}

export interface Project {
  id: string;
  title: string;
  category: 'video' | 'motion' | 'graphic' | 'brand';
  categoryLabel: string;
  client: string;
  year: string;
  role: string;
  summary: string;
  fullDescription: string;
  thumbnail: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  tools: string[];
  deliverables: string[];
  metrics?: string;
  featured?: boolean;
  videoDuration?: string;
  beforeAfterComparison?: {
    rawImage: string;
    gradedImage: string;
    rawLabel: string;
    gradedLabel: string;
    description: string;
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Array<{
    name: string;
    level: number;
    highlight?: boolean;
    tags: string[];
  }>;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: 'video' | 'design' | 'combo';
  shortDesc: string;
  estimatedPrice: string;
  deliveryTime: string;
  highlights: string[];
  recommendedFor?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName?: string;
  clientRole?: string;
  name?: string;
  role?: string;
  company: string;
  avatar?: string;
  avatarText?: string;
  rating?: number;
  metric?: string;
  projectRef?: string;
}

export interface EducationItem {
  id?: string;
  year: string;
  degree: string;
  institution: string;
  description: string;
  focus?: string;
  skillsAcquired?: string[];
  credentialId?: string;
  badge?: string;
}

export interface ExpertiseCard {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  tags?: string[];
  icon: string;
}

export interface AcademicDegree {
  title: string;
  desc: string;
  fullDesc: string;
  year: string;
  status: string;
  institution?: string;
}

export interface ProfessionalTraining {
  institute: string;
  course: string;
  batch: string;
  status: string;
  description: string;
  badges: string[];
  competencies: Array<{
    title: string;
    desc: string;
  }>;
}

export interface PortfolioProfile {
  name: string;
  nameLine1: string;
  nameLine2: string;
  role?: string;
  roles?: string[];
  headline?: string;
  tagline: string;
  bio: string;
  email: string;
  whatsapp: string;
  location: string;
  availabilityStatus: string;
  heroImage: string;
  showreelTitle?: string;
  showreelVideoUrl?: string;
  showreelDuration?: string;
  stats: StatMetric[];
  socialLinks?: SocialLink[];
  socials?: SocialLink[] | Record<string, SocialLink>;
  education?: EducationItem[];
}
