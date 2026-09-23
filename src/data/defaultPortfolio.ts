import { PortfolioProfile, Project, SkillCategory, ServicePackage, Testimonial } from '../types/portfolio';

// Generated authentic visual assets
import tarekUserPhoto from '@/src/assets/images/user_tarek_photo.jpg';
import tarekPortrait from '@/src/assets/images/tarek_cutout_portrait_1790154535753.jpg';
import heroEditorPortrait from '@/src/assets/images/hero_editor_portrait_1790153982212.jpg';
import projectCommercialVideo from '@/src/assets/images/project_commercial_video_1790153993466.jpg';
import projectBrandIdentity from '@/src/assets/images/project_brand_identity_1790154004172.jpg';
import projectMotionGraphics from '@/src/assets/images/project_motion_graphics_1790154021503.jpg';
import projectThumbnailPoster from '@/src/assets/images/project_youtube_thumbnail_1790154034075.jpg';

export const defaultProfile: PortfolioProfile = {
  name: 'Md Tarek Aziz',
  nameLine1: 'MD TAREK',
  nameLine2: 'AZIZ',
  headline: 'CREATIVE VISUALIZER • VIDEO EDITOR',
  tagline: 'Transforming raw visual footage into viral, retention-driven stories.',
  roles: [
    'Creative Visualizer',
    'Professional Video Editor',
    'Graphic & Brand Designer',
    'Colorist & Motion Storyteller'
  ],
  bio: 'Transforming raw visual footage into viral, retention-driven stories. প্রফেশনাল ভিডিও এডিটিং, মোশন গ্রাফিক্স এবং হাই-ইমপ্যাক্ট গ্রাফিক ডিজাইনে পারদর্শী।',
  location: 'Dhaka, Bangladesh (Remote Worldwide)',
  email: 'hmtarekaziz00@gmail.com',
  whatsapp: '01883555337',
  availabilityStatus: 'Available for Projects',
  heroImage: tarekUserPhoto,
  showreelTitle: '2026 Creative Showreel · Motion & Visuals',
  showreelDuration: '01:45',
  stats: [
    { value: '3+ Years', label: 'Experience', detail: 'Creative post-production' },
    { value: '46+', label: 'Completed Works', detail: 'Commercials & branding' },
    { value: '2.5M+', label: 'Audience Reach', detail: 'Retention-driven content' },
    { value: '99% ✓', label: 'Client Satisfaction', detail: 'Verified 5-star ratings' },
  ],
  socials: [
    { platform: 'YouTube', url: 'https://youtube.com', label: 'Showreel Channel' },
    { platform: 'Behance', url: 'https://behance.net', label: 'Design Portfolio' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', label: 'Professional Profile' },
    { platform: 'Instagram', url: 'https://instagram.com', label: '@tarekaziz.creative' },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Diploma in Video Editing & Motion Graphics',
      institution: 'National Institute of Creative Arts',
      year: '2022 - 2024',
      description: 'Specialized in non-linear editing, narrative rhythm, sound design and kinetic typography.',
      badge: 'Graduated with Distinction'
    },
    {
      id: 'edu-2',
      degree: 'Professional Certification in Graphic Design & Brand Identity',
      institution: 'Adobe Certified Professional Track',
      year: '2021 - 2022',
      description: 'Focused on typography theory, vector branding, commercial packaging, and digital raster manipulation.',
      badge: 'Adobe Certified'
    },
    {
      id: 'edu-3',
      degree: 'DaVinci Resolve Studio Advanced Color Grading',
      institution: 'Blackmagic Design Authorized Training',
      year: '2023',
      description: 'Mastery over ACES color pipelines, log curve balancing, film print emulation, and look development.',
      badge: 'Certified Colorist'
    }
  ]
};

export const defaultProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Apex Horizon · Cinematic Automotive Commercial',
    category: 'video',
    categoryLabel: 'Commercial Video',
    client: 'Apex Velocity Studio',
    year: '2026',
    role: 'Lead Video Editor & Colorist',
    summary: 'High-octane commercial film editing featuring dynamic sound design, precision speed ramps, and custom DaVinci teal-orange color grade.',
    fullDescription: 'For this luxury automotive campaign, the raw footage was captured on RED V-Raptor in Log format. The challenge was maintaining visual tension across 60 seconds with hyper-accurate rhythm synced to an original cinematic score. I handled the rhythm cut, micro sound design (foley, engine rumbles, risers), and film-print emulation grading.',
    thumbnail: projectCommercialVideo,
    aspectRatio: '16:9',
    tools: ['Premiere Pro', 'DaVinci Resolve Studio', 'After Effects', 'FabFilter EQ'],
    deliverables: ['1x 60s Hero Commercial', '3x 15s Instagram Reels', 'Custom LUT Package'],
    metrics: '+340% Engagement Rate on Launch Week',
    featured: true,
    videoDuration: '01:12',
    beforeAfterComparison: {
      rawImage: projectCommercialVideo,
      gradedImage: projectCommercialVideo,
      rawLabel: 'Log RAW Flat Profile',
      gradedLabel: 'Final Film Print Emulation',
      description: 'Slide to compare the flat camera capture vs the calibrated final cinema color pass.'
    }
  },
  {
    id: 'proj-2',
    title: 'Velour Atelier · Minimalist Luxury Identity',
    category: 'brand',
    categoryLabel: 'Brand Identity',
    client: 'Velour Haute Parfumerie',
    year: '2026',
    role: 'Art Director & Brand Designer',
    summary: 'Bespoke corporate identity, typography guidelines, packaging embossments, and full stationery suite for an artisanal fragrance house.',
    fullDescription: 'Crafted a bespoke identity rooted in understated architectural elegance. The typography uses a customized high-contrast serif paired with modern geometric accents. Designed complete packaging guidelines, die-cuts, tactile foil stamps, and digital social media assets.',
    thumbnail: projectBrandIdentity,
    aspectRatio: '4:3',
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Dimension'],
    deliverables: ['Brand Guidelines Manual (64 Pages)', 'Logo Architecture & Monogram', 'Eco Packaging Die-Cuts'],
    metrics: 'Selected for Editorial Showcase Feature',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Synapse 3D · Kinetic Motion System',
    category: 'motion',
    categoryLabel: 'Motion Design',
    client: 'Synapse Global Summit',
    year: '2025',
    role: '3D Motion Designer',
    summary: 'Broadcast package, stage intro visuals, looping iridescent ribbons, and typography animations for an international tech symposium.',
    fullDescription: 'Engineered smooth, organic fluid ribbons representing data streams in octane renderer, composited with punchy typographic kinetic motion in After Effects. Delivered over 20 modular broadcast bumpers and LED stage backdrop loops.',
    thumbnail: projectMotionGraphics,
    aspectRatio: '16:9',
    tools: ['After Effects', 'Cinema 4D / Octane', 'Premiere Pro', 'Audition'],
    deliverables: ['Main Stage Keynote Intro (4K)', '14x Speaker Lower Thirds', 'Looping Ambient Visuals'],
    metrics: 'Streamed live to 45,000+ Attendees',
    featured: true,
    videoDuration: '00:45'
  },
  {
    id: 'proj-4',
    title: 'The Untamed Edge · Documentary Visuals & Packaging',
    category: 'graphic',
    categoryLabel: 'Visual Packaging & Poster',
    client: 'Frontier Docs & Creator Network',
    year: '2025',
    role: 'Visual Designer & Thumbnail Strategist',
    summary: 'Editorial poster design, cinematic YouTube thumbnail strategy, and visual packaging resulting in top-tier click-through rates.',
    fullDescription: 'Designed high-conversion YouTube packaging and cinematic promotional posters for a 6-part investigative documentary series. Utilized dramatic key lighting cutouts, custom hand-rendered typography, and grain texturing that boosted organic CTR from 4.2% to 11.8%.',
    thumbnail: projectThumbnailPoster,
    aspectRatio: '16:9',
    tools: ['Adobe Photoshop', 'Lightroom', 'Camera Raw', 'Illustrator'],
    deliverables: ['Key Art Poster (300 DPI Print)', '6x High-CTR Thumbnails', 'Social Banner Suite'],
    metrics: '11.8% Peak Click-Through Rate (CTR)',
    featured: false
  },
  {
    id: 'proj-5',
    title: 'Aura Studio · Studio Workflow & Showreel Cuts',
    category: 'video',
    categoryLabel: 'Short-Form & Reels',
    client: 'Creative Creators Hub',
    year: '2025',
    role: 'Short-Form Video Specialist',
    summary: 'Fast-paced, hook-driven vertical videos and viral TikTok/Reels edits featuring custom motion captions, sound FX, and punch zooms.',
    fullDescription: 'Produced a cohesive 30-day vertical video sprint designed specifically for YouTube Shorts and Instagram Reels algorithms. Script-paced cutting, sound effects on key phrases, seamless B-roll transitions, and branded motion typography.',
    thumbnail: heroEditorPortrait,
    aspectRatio: '16:9',
    tools: ['Premiere Pro', 'After Effects', 'CapCut Pro', 'Logic Pro'],
    deliverables: ['30x 9:16 Vertical Reels', 'Custom Animated Caption Presets', 'Sound Effects Library'],
    metrics: 'Over 4.2M Organic Reel Views',
    featured: false,
    videoDuration: '00:58'
  }
];

export const defaultSkills: SkillCategory[] = [
  {
    id: 'video-editing',
    title: 'Video Editing & Post-Production',
    description: 'Cinematic storytelling, pacing, multi-cam workflows, and narrative structuring.',
    skills: [
      { name: 'Adobe Premiere Pro', level: 96, highlight: true, tags: ['Long-form', 'Commercial', 'Sync'] },
      { name: 'DaVinci Resolve Studio', level: 90, highlight: true, tags: ['Color Grading', 'Fairlight'] },
      { name: 'Rhythm & Narrative Pacing', level: 95, highlight: true, tags: ['Hook Mastery', 'Retention'] },
      { name: 'Sound Design & Foley Mixing', level: 88, highlight: false, tags: ['Sound Effects', 'Dialogue Cleaning'] },
      { name: 'Short-Form Reels & TikToks', level: 94, highlight: true, tags: ['Subtitles', 'Viral Pacing'] },
    ]
  },
  {
    id: 'graphic-branding',
    title: 'Graphic Design & Brand Systems',
    description: 'Visual identity, editorial layouts, typography systems, and print production.',
    skills: [
      { name: 'Adobe Photoshop', level: 95, highlight: true, tags: ['Photo Manipulation', 'Retouching', 'Thumbnails'] },
      { name: 'Adobe Illustrator', level: 92, highlight: true, tags: ['Vector Art', 'Logos', 'Iconography'] },
      { name: 'Brand Identity & Guidelines', level: 90, highlight: true, tags: ['Stationery', 'Color Theory'] },
      { name: 'High-CTR YouTube Thumbnails', level: 96, highlight: true, tags: ['Lighting', 'Composition', 'A/B Testing'] },
      { name: 'Print & Packaging Design', level: 85, highlight: false, tags: ['CMYK', 'Die-cuts', 'Posters'] },
    ]
  },
  {
    id: 'motion-vfx',
    title: 'Motion Graphics & Visual Effects',
    description: 'Dynamic kinetic typography, logo reveals, 3D elements, and compositing.',
    skills: [
      { name: 'Adobe After Effects', level: 90, highlight: true, tags: ['Kinetic Type', 'Tracking', 'VFX'] },
      { name: 'Logo Animation & Intros', level: 92, highlight: true, tags: ['Brand Reveals', 'Looping Bumpers'] },
      { name: '3D Basics & Spline/Blender', level: 78, highlight: false, tags: ['3D Mockups', 'Abstract Render'] },
      { name: 'Color Grading & Film Emulation', level: 91, highlight: true, tags: ['LUTs', 'Film Grain', 'ACES'] },
    ]
  }
];

export const defaultServices: ServicePackage[] = [
  {
    id: 'serv-1',
    title: 'Commercial & Documentary Video Editing',
    category: 'video',
    shortDesc: 'Complete post-production for brand films, commercial spots, YouTube long-form, and documentaries.',
    estimatedPrice: '$250 - $800 / project',
    deliveryTime: '3 - 6 Business Days',
    highlights: [
      'Narrative cut & rhythm sequencing',
      'Advanced DaVinci color grading & LUT creation',
      'Custom foley sound design & audio mastering',
      'Motion graphics, title cards & lower thirds',
      '2 rounds of revisions included'
    ],
    recommendedFor: 'Brands, Agencies & Professional YouTubers'
  },
  {
    id: 'serv-2',
    title: 'Short-Form Viral Sprint (10 - 20 Reels)',
    category: 'video',
    shortDesc: 'High-retention vertical videos optimized for TikTok, Instagram Reels, and YouTube Shorts.',
    estimatedPrice: '$400 - $900 / monthly',
    deliveryTime: 'Fast 48h Turnaround per batch',
    highlights: [
      'Hook optimization in the first 3 seconds',
      'Dynamic animated captions with custom branding',
      'Trendy zooms, sound effects & seamless B-roll',
      'Multi-platform aspect ratio exports (9:16 & 4:5)',
      'Thumbnail cover frames included'
    ],
    recommendedFor: 'Creators, Coaches, Podcasters & E-commerce'
  },
  {
    id: 'serv-3',
    title: 'Full Brand Identity & Graphic Suite',
    category: 'design',
    shortDesc: 'Cohesive visual identity system that sets your brand apart in the market.',
    estimatedPrice: '$350 - $1,200',
    deliveryTime: '5 - 10 Business Days',
    highlights: [
      'Primary logo, secondary logo & brand mark icon',
      'Typography pairing & color palette system',
      'Stationery, business cards & social media kit',
      'Packaging guidelines & print-ready vector files',
      'Comprehensive Brand Guidelines PDF (20+ pages)'
    ],
    recommendedFor: 'Startups, Businesses & Established Personal Brands'
  },
  {
    id: 'serv-4',
    title: 'High-Conversion YouTube Packaging Pack',
    category: 'combo',
    shortDesc: 'Click-tested YouTube thumbnails, banner design, and video editing combo.',
    estimatedPrice: '$300 - $700 / month',
    deliveryTime: '24 - 48 Hours',
    highlights: [
      '4x to 8x high-CTR custom YouTube thumbnails',
      'A/B test variations with distinct color angles',
      'Channel header & watermark branding',
      'Optimized visual storytelling for high click rates'
    ],
    recommendedFor: 'YouTubers wanting to double their organic CTR'
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Creative Director',
    company: 'Vanguard Media Group (UK)',
    quote: 'Tarek transformed our raw commercial footage into a masterclass in visual storytelling. His sense of pacing and DaVinci color grading is genuinely top-tier.',
    metric: '+280% organic watch time',
    avatarText: 'MV'
  },
  {
    id: 'test-2',
    name: 'Sarah Lindqvist',
    role: 'Founder & CEO',
    company: 'Nordic Glow Beauty',
    quote: 'From our brand logo to the launch commercial, Tarek handled both the graphic design and video editing seamlessly. Having one talent who excels at both is rare and invaluable.',
    metric: 'Full Rebrand Delivered in 8 Days',
    avatarText: 'SL'
  },
  {
    id: 'test-3',
    name: 'Rafiqul Islam',
    role: 'Channel Producer',
    company: 'TechPulse Network (1.2M Subs)',
    quote: 'আমাদের চ্যানেলের ভিডিও এডিটিং এবং থাম্বনেইল ডিজাইনের কোয়ালিটি তারেক আসার পর সম্পূর্ণ পাল্টে গেছে। ক্লিক থ্রু রেট এবং ভিউয়ার রিটেনশন এক মাসেই দ্বিগুণ হয়েছে।',
    metric: 'CTR jumped from 4.5% to 10.2%',
    avatarText: 'RI'
  }
];
