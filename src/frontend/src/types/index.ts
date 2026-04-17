export type Language = "bn" | "en";

export interface TranslationSet {
  bn: string;
  en: string;
}

export interface NavItem {
  label: TranslationSet;
  href: string;
}

export interface ProductCategory {
  id: string;
  name: TranslationSet;
  description: TranslationSet;
  image: string;
  sizes: string[];
  priceRange?: string;
  bulkAvailable: boolean;
  slug: string;
}

export interface TrustBadgeData {
  icon: string;
  title: TranslationSet;
  description: TranslationSet;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
}

export interface BusinessInfo {
  name: TranslationSet;
  tagline: TranslationSet;
  phone: string;
  whatsapp: string;
  address: TranslationSet;
  city: TranslationSet;
  state: string;
  pincode: string;
}

// ─── City Page Types ───
export interface CityPageProps {
  citySlug: string;
  cityName: TranslationSet;
  headline: TranslationSet;
  subheadline: TranslationSet;
  localKeywords: string[];
  logisticsDescription: TranslationSet;
  contentParagraphs: TranslationSet[];
  nearbyCities: Array<{ name: TranslationSet; slug: string }>;
  heroImage?: string;
}

// ─── Blog Post Types ───
export interface BlogContentSection {
  type: "h2" | "h3" | "paragraph" | "list";
  content: TranslationSet;
  items?: TranslationSet[];
}

export interface BlogPostProps {
  slug: string;
  title: TranslationSet;
  date: string;
  readTime: TranslationSet;
  category: TranslationSet;
  excerpt: TranslationSet;
  heroImage?: string;
  contentSections: BlogContentSection[];
  relatedCities?: Array<{ name: TranslationSet; slug: string }>;
  relatedProducts?: Array<{ name: TranslationSet; slug: string }>;
}

export interface BlogCardProps {
  slug: string;
  title: TranslationSet;
  date: string;
  readTime: TranslationSet;
  category: TranslationSet;
  excerpt: TranslationSet;
  heroImage?: string;
}

// ─── SEO Meta Types ───
export interface PageSeoMeta {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}
