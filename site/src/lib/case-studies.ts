export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export interface CaseStudy {
  slug: string;
  category: string;
  image: string;
  media: MediaItem[];
  stats: Array<{ value: string; label: string }>;
  services: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "bottega-matta",
    category: "artigianato",
    image: "/images/cases/bottega-matta.jpg",
    media: [
      { type: "image", src: "/images/cases/bottega-matta/BM1.png" },
    ],
    stats: [
      { value: "+60%", label: "revenue" },
      { value: "+170%", label: "traffic" },
    ],
    services: ["web", "seo", "ads", "social", "content"],
  },
  {
    slug: "charme-extensions",
    category: "beauty",
    image: "/images/cases/charme-extensions.jpg",
    media: [
      { type: "image", src: "/images/cases/charme-extensions/C1.png" },
      { type: "image", src: "/images/cases/charme-extensions/C2.png" },
    ],
    stats: [
      { value: "+80%", label: "revenue" },
      { value: "+45%", label: "traffic" },
    ],
    services: ["ads", "seo", "web"],
  },
  {
    slug: "i-peruvia",
    category: "ristorazione",
    image: "/images/cases/i-peruvia.jpg",
    media: [
      { type: "image", src: "/images/cases/i-peruvia/10.png" },
      { type: "image", src: "/images/cases/i-peruvia/11.png" },
      { type: "image", src: "/images/cases/i-peruvia/12.png" },
    ],
    stats: [
      { value: "+300%", label: "traffic" },
      { value: "#1", label: "ranking" },
    ],
    services: ["seo", "social", "ads"],
  },
  {
    slug: "nemesis",
    category: "branding",
    image: "/images/cases/nemesis.jpg",
    media: [
      { type: "video", src: "/images/cases/nemesis/N1.mp4" },
      { type: "video", src: "/images/cases/nemesis/N2.mp4" },
    ],
    stats: [
      { value: "6K+", label: "views" },
      { value: "+150%", label: "engagement" },
      { value: "2×", label: "leads" },
    ],
    services: ["content", "social", "ads"],
  },
  {
    slug: "villa-riviera",
    category: "hospitality",
    image: "/images/cases/villa-riviera.jpg",
    media: [],
    stats: [
      { value: "+390%", label: "directBookings" },
      { value: "-60%", label: "adCost" },
      { value: "4.8×", label: "roas" },
    ],
    services: ["ads", "web", "ai"],
  },
  {
    slug: "auto-brescia",
    category: "automotive",
    image: "/images/cases/auto-brescia.jpg",
    media: [],
    stats: [
      { value: "120+", label: "leadsMonth" },
      { value: "+450%", label: "traffic" },
      { value: "3.5×", label: "roas" },
    ],
    services: ["seo", "ads", "content"],
  },
];

export interface SectionTheme {
  bg: string;
  grain: string;
  particles: string;
  glow: string;
  subtitle: string;
  title: string;
  desc: string;
  statValue: string;
  statLabel: string;
  tag: string;
  link: string;
}

export const sectionThemes: SectionTheme[] = [
  {
    bg: "bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700",
    grain: "grain",
    particles: "237,236,237",
    glow: "bg-orange-500/[0.05]",
    subtitle: "text-orange-500",
    title: "text-gray-100",
    desc: "text-gray-100/50",
    statValue: "text-gray-100",
    statLabel: "text-gray-100/35",
    tag: "border-gray-100/[0.1] text-gray-100/35",
    link: "text-orange-500 hover:text-orange-400",
  },
  {
    bg: "bg-gray-50 dark:bg-navy-800",
    grain: "grain-light",
    particles: "30,41,59",
    glow: "bg-orange-500/[0.04]",
    subtitle: "text-orange-500",
    title: "text-navy-800 dark:text-gray-100",
    desc: "text-navy-700/60 dark:text-gray-100/50",
    statValue: "text-navy-800 dark:text-gray-100",
    statLabel: "text-navy-700/40 dark:text-gray-100/35",
    tag: "border-navy-800/[0.1] text-navy-800/40 dark:border-gray-100/[0.1] dark:text-gray-100/35",
    link: "text-orange-500 hover:text-orange-400",
  },
  {
    bg: "bg-orange-500",
    grain: "grain",
    particles: "255,255,255",
    glow: "bg-white/[0.08]",
    subtitle: "text-white/70",
    title: "text-white",
    desc: "text-white/60",
    statValue: "text-white",
    statLabel: "text-white/50",
    tag: "border-white/20 text-white/50",
    link: "text-white hover:text-white/80",
  },
];

export const caseStudyColors: Record<string, string> = {
  "i-peruvia": "from-amber-700 to-red-800",
  "charme-extensions": "from-pink-600 to-purple-800",
  "nemesis": "from-slate-700 to-slate-900",
  "bottega-matta": "from-amber-600 to-amber-900",
  "villa-riviera": "from-emerald-600 to-teal-800",
  "auto-brescia": "from-orange-600 to-red-700",
};
