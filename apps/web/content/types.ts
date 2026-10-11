export type ButtonVariant = "primary" | "gold" | "outline" | "white" | "outline-light";

export type LinkItem = { label: string; url: string };

export type Seo = { metaTitle: string; metaDescription: string };

export type GlobalContent = {
  siteName: string;
  baseline: string;
  email: string;
  youtubeUrl: string;
  youtubeHandle: string;
  disclaimer: string;
  callWidgetEnabled: boolean;
  menu: LinkItem[];
  discover: LinkItem[];
  aboutLinks: LinkItem[];
  legal: LinkItem[];
  seo: Seo;
};

export type Cta = { label: string; url: string; variant: ButtonVariant };

export type HeroSection = {
  __component: "home.hero";
  badge: string;
  title: string;
  titleAccent: string;
  lead: string;
  forLabel: string;
  chips: string[];
  primary: Cta;
  secondary: Cta;
  guarantees: string[];
};

export type ThemesSection = { __component: "home.themes-strip"; items: string[] };

export type Step = { number: string; title: string; text: string; linkLabel: string; url: string };

export type HowSection = {
  __component: "home.how-it-works";
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  steps: Step[];
};

export type DiagnosticTeaserSection = {
  __component: "home.diagnostic-teaser";
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  checks: string[];
  cta: Cta;
  previewTitle: string;
  openLabel: string;
  moreLabel: string;
};

export type LatestVideosSection = {
  __component: "home.latest-videos";
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  cta: Cta;
  limit: number;
};

export type Feature = { icon: "shield" | "book" | "heart"; title: string; text: string };

export type WhySection = {
  __component: "home.why-us";
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead?: string;
  cta?: Cta;
  features: Feature[];
};

export type BlogPreviewSection = {
  __component: "home.blog-preview";
  eyebrow: string;
  title: string;
  titleAccent: string;
  cta: Cta;
  limit: number;
};

export type TestimonialsSection = {
  __component: "home.testimonials";
  eyebrow: string;
  title: string;
  titleAccent: string;
  note: string;
};

export type FaqPreviewSection = {
  __component: "home.faq-preview";
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  cta: Cta;
  limit: number;
};

export type PodcastSection = {
  __component: "home.podcast";
  enabled: boolean;
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleAfter: string;
  lead: string;
  placeholder: string;
  button: string;
  note: string;
};

export type VerseSection = {
  __component: "home.verse";
  arabic: string;
  translation: string;
  reference: string;
};

export type TextHighlightSection = {
  __component: "sections.text-highlight";
  eyebrow: string;
  title: string;
  titleAccent: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomeSection =
  | HeroSection
  | ThemesSection
  | HowSection
  | DiagnosticTeaserSection
  | LatestVideosSection
  | WhySection
  | TextHighlightSection
  | BlogPreviewSection
  | TestimonialsSection
  | FaqPreviewSection
  | PodcastSection
  | VerseSection;

export type HomeContent = { seo: Seo; sections: HomeSection[] };

export type Stat = { value: string; label: string };
export type ValueItem = { number: string; title: string; text: string };

export type AboutContent = {
  seo: Seo;
  crumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleAfter: string;
  lead: string;
  storyEyebrow: string;
  storyTitle: string;
  storyAccent: string;
  story: string[];
  storyCta: Cta;
  photoLabel: string;
  photoUrl: string | null;
  photoAlt: string;
  stats: Stat[];
  valuesEyebrow: string;
  valuesTitle: string;
  valuesAccent: string;
  values: ValueItem[];
  disclaimerTitle: string;
  disclaimer: string;
  ctaTitle: string;
  ctaLead: string;
  ctaPrimary: Cta;
  ctaSecondary: Cta;
};

export type Tip = { number: string; title: string; text: string };

export type ResultBand = {
  minScore: number;
  maxScore: number;
  title: string;
  text: string;
};

export type DiagnosticPageContent = {
  seo: Seo;
  crumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  guarantees: string[];
  tipsEyebrow: string;
  tipsTitle: string;
  tipsAccent: string;
  tips: Tip[];
  toolEyebrow: string;
  toolTitle: string;
  toolAccent: string;
  nameLabel: string;
  emailLabel: string;
  progressLabel: string;
  yesLabel: string;
  noLabel: string;
  submitLabel: string;
  confidential: string;
  moreLabel: string;
  resultNote: string;
};

export type DiagnosticAudio = {
  order: number;
  title: string;
  url: string;
};

export type Category = { name: string; slug: string; color: string };

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "verse"; arabic: string; translation: string; reference: string }
  | { type: "youtube"; url: string; title: string }
  | { type: "note"; text: string };

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverColor: string;
  coverUrl: string | null;
  coverAlt: string;
  featured: boolean;
  publishedAt: string;
  author: string;
  blocks: Block[];
  seo: Seo;
};

export type BlogPageContent = {
  seo: Seo;
  crumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  readLabel: string;
  featuredLabel: string;
  loadMore: string;
  newsletterTitle: string;
  newsletterText: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  empty: string;
};

export type Video = {
  title: string;
  youtubeUrl: string;
  duration: string;
  category: string;
  gradient: string;
  thumbnailUrl: string | null;
  featured: boolean;
  publishedAt: string;
  description: string;
};

export type VideosPageContent = {
  seo: Seo;
  crumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  latestLabel: string;
  watchLabel: string;
  allLabel: string;
  allUrl: string;
  bannerTitle: string;
  bannerText: string;
  bannerCta: Cta;
  filters: string[];
};

export type ContactCard = {
  icon: "mail" | "phone" | "video";
  title: string;
  text: string;
  label: string;
  url: string;
  action: "link" | "widget";
};

export type FaqItem = {
  question: string;
  answer: string;
  order: number;
  showOnHome: boolean;
};

export type Testimonial = {
  handle: string;
  text: string;
  url: string;
  visible: boolean;
};

export type ContactPageContent = {
  seo: Seo;
  crumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  cards: ContactCard[];
  formTitle: string;
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  consent: string;
  submit: string;
  success: string;
  faqEyebrow: string;
  faqTitle: string;
  faqAccent: string;
};

export type LegalPage = {
  slug: string;
  seo: Seo;
  eyebrow: string;
  title: string;
  lead: string;
  blocks: Block[];
};
