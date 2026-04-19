import { SectionHeading } from "@/components/SectionHeading";
import { SlidingBanner } from "@/components/SlidingBanner";
import { TrustBadge } from "@/components/TrustBadge";
import { useBannerImages } from "@/hooks/useBannerImages";
import { useCategoryImages } from "@/hooks/useCategoryImages";
import { useFeaturedProducts } from "@/hooks/useFeaturedProducts";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Clock,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const PHONE = "+916295466310";
const WHATSAPP_LINK =
  "https://wa.me/916295466310?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20clay%20idol%20orders.";

const PRODUCT_CATEGORIES = [
  {
    slug: "bangla-lakshmi-ganesh",
    path: "/bangla-lakshmi-ganesh-idol",
    emoji: "🌸",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lakshmi_and_Ganesh.jpg/640px-Lakshmi_and_Ganesh.jpg",
    name: { bn: "বাংলা লক্ষ্মী-গণেশ মূর্তি", en: "Bangla Lakshmi Ganesh Idol" },
  },
  {
    slug: "clay-ganesh-idol-wholesale",
    path: "/clay-ganesh-idol-wholesale",
    emoji: "🙏",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Clay_Ganesha.jpg/640px-Clay_Ganesha.jpg",
    name: { bn: "মাটির গণেশ মূর্তি পাইকারি", en: "Clay Ganesh Idol – Wholesale" },
  },
  {
    slug: "clay-vishwakarma-idol",
    path: "/clay-vishwakarma-idol",
    emoji: "⚙️",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vishwakarma.jpg/640px-Vishwakarma.jpg",
    name: { bn: "মাটির বিশ্বকর্মা মূর্তি", en: "Clay Vishwakarma Idol" },
  },
  {
    slug: "clay-lakshmi-idol",
    path: "/clay-lakshmi-idol",
    emoji: "🪷",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Lakshmi.jpg/640px-Lakshmi.jpg",
    name: { bn: "মাটির লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" },
  },
  {
    slug: "diwali-lakshmi-ganesh-idol",
    path: "/diwali-lakshmi-ganesh-idol",
    emoji: "🪔",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Diwali_Lakshmi-Ganesh.jpg/640px-Diwali_Lakshmi-Ganesh.jpg",
    name: { bn: "দীপাবলি লক্ষ্মী-গণেশ মূর্তি", en: "Diwali Lakshmi Ganesh Idol" },
  },
  {
    slug: "clay-kali-idol",
    path: "/clay-kali-idol",
    emoji: "🌑",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Goddess_kali_idol.jpg/640px-Goddess_kali_idol.jpg",
    name: { bn: "মাটির কালী মূর্তি", en: "Clay Kali Idol" },
  },
  {
    slug: "small-durga-idol",
    path: "/small-durga-idol",
    emoji: "🌺",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Durga_idol.jpg/640px-Durga_idol.jpg",
    name: { bn: "ছোট দুর্গা মূর্তি", en: "Small Durga Idol" },
  },
  {
    slug: "radha-krishna-clay-idol",
    path: "/radha-krishna-clay-idol",
    emoji: "💛",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Radha_Krishna.jpg/640px-Radha_Krishna.jpg",
    name: { bn: "রাধা-কৃষ্ণ মাটির মূর্তি", en: "Radha Krishna Clay Idol" },
  },
  {
    slug: "clay-kartik-idol",
    path: "/clay-kartik-idol",
    emoji: "🦚",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kartik_idol.jpg/640px-Kartik_idol.jpg",
    name: { bn: "মাটির কার্তিক মূর্তি", en: "Clay Kartik Idol" },
  },
  {
    slug: "clay-saraswati-idol",
    path: "/clay-saraswati-idol",
    emoji: "📚",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saraswati_clay_idol.jpg/640px-Saraswati_clay_idol.jpg",
    name: { bn: "মাটির সরস্বতী মূর্তি", en: "Clay Saraswati Idol" },
  },
  {
    slug: "custom-clay-idol",
    path: "/custom-clay-idol",
    emoji: "✨",
    image: "",
    name: { bn: "কাস্টম মাটির মূর্তি", en: "Custom Clay Idol" },
  },
];

const CATEGORY_SLUG_MAP: Record<string, string> = {
  banglaLakshmiGanesh: "bangla-lakshmi-ganesh",
  ganesh: "clay-ganesh-idol-wholesale",
  vishwakarma: "clay-vishwakarma-idol",
  lakshmi: "clay-lakshmi-idol",
  diwaliLakshmiGanesh: "diwali-lakshmi-ganesh-idol",
  kali: "clay-kali-idol",
  durga: "small-durga-idol",
  radhaKrishna: "radha-krishna-clay-idol",
  kartik: "clay-kartik-idol",
  saraswati: "clay-saraswati-idol",
  custom: "custom-clay-idol",
};

const WHY_CHOOSE_POINTS = [
  {
    icon: <Award size={26} />,
    title: { bn: "হাতে তৈরি গুণমান", en: "Handmade Quality" },
    desc: {
      bn: "প্রতিটি মূর্তি দক্ষ কারিগরদের হাতে তৈরি, সর্বোচ্চ মানের কাদামাটি ব্যবহার করে।",
      en: "Every idol crafted by skilled artisans using premium quality clay from Bardhaman.",
    },
  },
  {
    icon: <Package size={26} />,
    title: { bn: "পাইকারি মূল্য", en: "Wholesale Pricing" },
    desc: {
      bn: "সরাসরি প্রস্তুতকারকের কাছ থেকে পাইকারি মূল্যে ক্রয় করুন।",
      en: "Buy directly from the manufacturer at wholesale prices. No middlemen.",
    },
  },
  {
    icon: <Users size={26} />,
    title: { bn: "বাল্ক অর্ডার সাপোর্ট", en: "Bulk Order Support" },
    desc: {
      bn: "পূজা কমিটি, ডেকোরেটর ও দোকানদারদের জন্য বিশেষ বাল্ক অর্ডার সুবিধা।",
      en: "Special bulk order facilities for puja committees, decorators and shop owners.",
    },
  },
  {
    icon: <Sparkles size={26} />,
    title: { bn: "কাস্টম ডিজাইন", en: "Custom Designs Available" },
    desc: {
      bn: "আপনার চাহিদা অনুযায়ী যেকোনো ডিজাইনের মূর্তি তৈরি করা হয়।",
      en: "We create idols in any design per your requirements. Special orders accepted.",
    },
  },
];

const TRUST_BADGES = [
  {
    icon: <ShieldCheck size={16} />,
    title: { bn: "বিশ্বস্ত স্থানীয় প্রস্তুতকারক", en: "Trusted Local Manufacturer" },
  },
  {
    icon: <Package size={16} />,
    title: { bn: "বাল্ক অর্ডার গৃহীত", en: "Bulk Orders Accepted" },
  },
  {
    icon: <Clock size={16} />,
    title: { bn: "উৎসব-প্রস্তুত স্টক", en: "Festival-Ready Stock" },
  },
  {
    icon: <Star size={16} />,
    title: { bn: "বর্ধমানের ঐতিহ্য", en: "Bardhaman Heritage" },
  },
];

export function HomePage() {
  const { t } = useLanguage();
  const { data: bannerImages = [] } = useBannerImages();
  const { data: backendCategoryImages } = useCategoryImages();
  const { data: featuredProducts = [] } = useFeaturedProducts();

  const categoryImageMap: Record<string, string> = {};
  if (backendCategoryImages) {
    for (const ci of backendCategoryImages) {
      if (ci.imageUrl) categoryImageMap[ci.slug] = ci.imageUrl;
    }
  }

  const mergedCategories = PRODUCT_CATEGORIES.map((cat) => ({
    ...cat,
    image: categoryImageMap[cat.slug] || cat.image,
  }));

  useEffect(() => {
    document.title =
      "Radha Madhav Mrit Shilpalay – Clay Idol Manufacturer in Bardhaman | Wholesale Supplier West Bengal";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Premium handmade clay idol manufacturer and bulk wholesaler in Bardhaman, West Bengal. Supplying Ganesh, Lakshmi, Durga, Saraswati idols to Durgapur, Asansol, Kolkata and all India. Call +91 6295466310 for bulk orders.",
      );
    }
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="relative min-h-[92vh] sm:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-clay-idols.dim_1200x600.jpg"
            alt="Handcrafted clay idols by Radha Madhav Mrit Shilpalay, Bardhaman"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.08_40/0.72)] via-[oklch(0.22_0.08_40/0.60)] to-[oklch(0.15_0.06_35/0.80)]" />
        </div>
        <div className="relative z-10 container max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary-foreground rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm">
            <Clock size={13} className="text-secondary" />
            {t({
              bn: "দুর্গাপূজার মৌসুমে সীমিত স্টক — এখনই অর্ডার করুন",
              en: "Limited seasonal stock for Durga Puja season — Order now",
            })}
          </div>
          <h1 className="font-display font-bold text-[oklch(0.97_0.04_80)] leading-tight mb-2">
            <span className="block text-3xl sm:text-5xl lg:text-6xl">
              {t({
                bn: "বর্ধমানের প্রিমিয়াম মাটির মূর্তি প্রস্তুতকারক",
                en: "Premium Clay Idol Manufacturer in Bardhaman",
              })}
            </span>
            <span className="block text-lg sm:text-2xl lg:text-3xl mt-2 text-secondary font-semibold">
              {t({
                bn: "মাটির মূর্তি প্রস্তুতকারক | পাইকারি বিক্রেতা",
                en: "Clay Idol Manufacturer & Wholesaler",
              })}
            </span>
          </h1>
          <p className="text-[oklch(0.90_0.03_75)] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
            {t({
              bn: "গণেশ, লক্ষ্মী, দুর্গা ও কাস্টম মাটির মূর্তি পাইকারি মূল্যে। পূজা কমিটি, সাজসজ্জাকারী ও দোকানদারদের জন্য বিশেষ সুবিধা।",
              en: "Wholesale clay Ganesh, Lakshmi, Durga & custom idols. Special B2B pricing for puja committees, decorators and shop owners.",
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={`tel:${PHONE}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-smooth px-7 py-3.5 rounded-full text-base font-bold shadow-lg"
              data-ocid="hero-call-btn"
            >
              <Phone size={18} />
              {t({ bn: "এখনই কল করুন", en: "Call Now" })}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-95 transition-smooth px-7 py-3.5 rounded-full text-base font-bold shadow-lg"
              data-ocid="hero-whatsapp-btn"
            >
              <MessageCircle size={18} />
              {t({ bn: "হোয়াটসঅ্যাপ ইনকোয়ারি", en: "WhatsApp Inquiry" })}
            </a>
          </div>
          <div
            className="mt-5 flex justify-center"
            data-ocid="hero-delivery-badge"
          >
            <span className="inline-flex items-center gap-2 bg-[oklch(0.20_0.06_40/0.55)] border border-secondary/50 text-[oklch(0.97_0.04_80)] rounded-full px-5 py-2 text-sm font-semibold backdrop-blur-sm shadow">
              <Truck size={15} className="text-secondary flex-shrink-0" />
              {t({
                bn: "🇮🇳 সারা ভারতে ডেলিভারি উপলব্ধ — নিরাপদ প্যাকিং সহ",
                en: "🇮🇳 All India Delivery Available — Safe & Secure Packing",
              })}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            {TRUST_BADGES.map((b) => (
              <div
                key={b.title.en}
                className="flex items-center gap-1.5 text-xs font-medium text-[oklch(0.95_0.03_80)] bg-[oklch(0.15_0.04_40/0.45)] border border-[oklch(0.85_0.04_75/0.25)] rounded-full px-3 py-1 backdrop-blur-sm"
              >
                <span className="text-secondary">{b.icon}</span>
                {t(b.title)}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-hidden="true"
          >
            <path
              d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 27.5C672 35 768 40 864 37.5C960 35 1056 25 1152 20C1248 15 1344 15 1392 15L1440 15V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z"
              fill="oklch(0.97 0.04 80)"
            />
          </svg>
        </div>
      </section>

      {/* ─── Sliding Banner ─── */}
      <section
        className="py-6 bg-[oklch(0.97_0.04_80)]"
        aria-label="Featured banner"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SlidingBanner images={bannerImages} />
        </div>
      </section>

      {/* ─── Featured Products ─── */}
      <section
        className="py-14 bg-muted/30"
        aria-labelledby="featured-products-heading"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "বিশেষ পণ্য সংগ্রহ", en: "Featured Products" }}
            subtitle={{
              bn: "পাইকারি মূল্যে হাতে তৈরি মাটির মূর্তির বিশেষ সংগ্রহ",
              en: "Handpicked clay idol collections at wholesale prices",
            }}
            className="mb-8"
          />
          <div
            className="grid grid-cols-2 gap-4 sm:gap-6"
            data-ocid="featured-products-grid"
          >
            {featuredProducts.length === 0
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl border border-border overflow-hidden animate-pulse"
                    data-ocid={`featured-product-skeleton.${i}`}
                  >
                    <div className="aspect-[4/3] bg-muted" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                ))
              : featuredProducts.map((product, idx) => {
                  const catSlug =
                    CATEGORY_SLUG_MAP[product.category] ?? "custom-clay-idol";
                  const catEntry = PRODUCT_CATEGORIES.find(
                    (c) => c.slug === catSlug,
                  );
                  const imageSrc =
                    product.imageIds[0] ||
                    catEntry?.image ||
                    "/assets/generated/hero-clay-idols.dim_1200x600.jpg";
                  const priceLabel =
                    product.priceRangeMin > 0n
                      ? `₹${product.priceRangeMin.toString()} – ₹${product.priceRangeMax.toString()}`
                      : null;
                  return (
                    <Link
                      key={product.id.toString()}
                      to="/products/$productId"
                      params={{ productId: product.id.toString() }}
                      className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                      data-ocid={`featured-product.item.${idx + 1}`}
                    >
                      <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                        <img
                          src={imageSrc}
                          alt={`${product.nameEn} - clay idol wholesale`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/assets/generated/hero-clay-idols.dim_1200x600.jpg";
                          }}
                        />
                        {product.bulkAvailable && (
                          <span className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t({ bn: "পাইকারি", en: "Wholesale" })}
                          </span>
                        )}
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1">
                        <p className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
                          {product.nameBn}
                        </p>
                        <p className="text-xs text-muted-foreground leading-none">
                          {product.nameEn}
                        </p>
                        {priceLabel && (
                          <p className="text-xs font-semibold text-primary mt-1">
                            {priceLabel}
                          </p>
                        )}
                        <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200 pt-1">
                          {t({ bn: "বিস্তারিত দেখুন", en: "View Details" })} →
                        </span>
                      </div>
                    </Link>
                  );
                })}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 btn-primary rounded-full px-8 py-3.5"
              data-ocid="view-all-products-btn"
            >
              {t({ bn: "সমস্ত পণ্য দেখুন", en: "View All Products" })}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Categories (3-col) ─── */}
      <section
        className="py-14 bg-amber-50/60 border-y border-amber-200/50"
        aria-labelledby="categories-heading"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "আমাদের পণ্য বিভাগ", en: "Our Product Categories" }}
            subtitle={{
              bn: "পাইকারি অর্ডারের জন্য বিভাগ বেছে নিন",
              en: "Choose a category for wholesale orders",
            }}
            className="mb-8"
          />
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5"
            data-ocid="categories-grid"
          >
            {mergedCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.path as never}
                className="group bg-card border border-amber-200/60 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                data-ocid={`category-card-${cat.slug}`}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                  {cat.image ? (
                    <>
                      <img
                        src={cat.image}
                        alt={`${cat.name.en} - clay idol wholesale by Radha Madhav Mrit Shilpalay`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.style.display = "none";
                          const fb =
                            img.nextElementSibling as HTMLElement | null;
                          if (fb) fb.style.display = "flex";
                        }}
                      />
                      <div
                        className="absolute inset-0 flex-col items-center justify-center gap-2 bg-muted hidden"
                        aria-hidden="true"
                      >
                        <span className="text-4xl">{cat.emoji}</span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-primary/5">
                      <span className="text-4xl">{cat.emoji}</span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1">
                  <p className="font-semibold text-foreground text-xs sm:text-sm leading-tight line-clamp-2">
                    {cat.name.bn}
                  </p>
                  <p className="text-xs text-muted-foreground leading-none">
                    {cat.name.en}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200 pt-1">
                    {t({ bn: "বিস্তারিত দেখুন", en: "View Details" })} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section
        className="py-14 bg-background"
        aria-labelledby="why-choose-heading"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "কেন আমাদের বেছে নেবেন?", en: "Why Choose Us?" }}
            subtitle={{
              bn: "বর্ধমানের সেরা মাটির মূর্তি প্রস্তুতকারক হিসেবে আমরা গর্বিত।",
              en: "Proud to be the most trusted clay idol manufacturer in Bardhaman, West Bengal.",
            }}
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CHOOSE_POINTS.map((point) => (
              <TrustBadge
                key={point.title.en}
                icon={point.icon}
                title={t(point.title)}
                description={t(point.desc)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section
        className="py-14 bg-primary/5 border-y border-border"
        aria-labelledby="trust-heading"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2">
              {t({ bn: "বিশ্বাস ও মান", en: "Trust & Quality" })}
            </p>
            <h2 className="text-display-sm text-foreground">
              {t({
                bn: "পশ্চিমবঙ্গ জুড়ে বিশ্বস্ত",
                en: "Trusted Across West Bengal",
              })}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {TRUST_BADGES.map((badge) => (
              <TrustBadge
                key={badge.title.en}
                icon={badge.icon}
                title={t(badge.title)}
                variant="compact"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: "Subrata Ghosh",
                role: {
                  bn: "পূজা কমিটি সভাপতি, বর্ধমান",
                  en: "Puja Committee President, Bardhaman",
                },
                text: {
                  bn: "প্রশান্ত পালের কাছ থেকে গত ৫ বছর ধরে দুর্গা মূর্তি কিনছি। অসাধারণ কারিগরি এবং সময়মতো ডেলিভারি।",
                  en: "Buying Durga idols from Prashant Pal for 5 years. Exceptional craftsmanship and on-time delivery.",
                },
              },
              {
                name: "Rajesh Kumar",
                role: {
                  bn: "মূর্তির পাইকারি বিক্রেতা, কলকাতা",
                  en: "Idol Wholesale Dealer, Kolkata",
                },
                text: {
                  bn: "সেরা পাইকারি মূল্যে উচ্চমানের মাটির মূর্তি পাওয়া যায়।",
                  en: "Best wholesale pricing on high-quality clay idols. All my customers are impressed.",
                },
              },
              {
                name: "Anita Das",
                role: { bn: "ডেকোরেটর, দুর্গাপুর", en: "Decorator, Durgapur" },
                text: {
                  bn: "কাস্টম ডিজাইনের মূর্তি তৈরিতে এদের জুড়ি নেই। দ্রুত কাজ এবং নিখুঁত ফিনিশিং।",
                  en: "No match for custom design idol creation. Fast work and flawless finishing every time.",
                },
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-card rounded-xl border border-border p-5 shadow-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
                    <Star
                      key={k}
                      size={13}
                      className="fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{t(review.text)}"
                </p>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t(review.role)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO Content ─── */}
      <section
        className="py-10 bg-muted/20"
        aria-labelledby="seo-content-heading"
      >
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2
            id="seo-content-heading"
            className="text-display-sm text-foreground mb-4"
          >
            {t({
              bn: "বর্ধমানে মাটির মূর্তির পাইকারি বিক্রেতা",
              en: "Clay Idol Wholesale Supplier in Bardhaman, West Bengal",
            })}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto">
            {t({
              bn: "রাধা মাধব মৃৎ শিল্পালয় — বর্ধমানের সেরা মাটির মূর্তি প্রস্তুতকারক। গণেশ মূর্তি পাইকারি, লক্ষ্মী মূর্তি সরবরাহ, দুর্গা প্রতিমা পাইকারি — সমস্ত উৎসবের জন্য মাটির মূর্তি সরাসরি প্রস্তুতকারকের কাছ থেকে।",
              en: "Radha Madhav Mrit Shilpalay — the premier clay idol manufacturer in Bardhaman. Ganesh idol wholesale, Lakshmi idol supplier, Durga idol wholesale — handmade clay idols for all festivals directly from the manufacturer. Serving retail shops, puja committees, decorators and wholesale buyers across West Bengal and India.",
            })}
          </p>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section
        className="py-16 bg-primary relative overflow-hidden"
        aria-labelledby="contact-cta-heading"
      >
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 bg-primary-foreground"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10 bg-primary-foreground"
          aria-hidden="true"
        />
        <div className="relative container max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">
            {t({ bn: "যোগাযোগ করুন", en: "Get In Touch" })}
          </p>
          <h2
            id="contact-cta-heading"
            className="text-display-md text-primary-foreground mb-4"
          >
            {t({
              bn: "পাইকারি অর্ডারের জন্য আজই যোগাযোগ করুন",
              en: "Contact Us Today for Bulk Orders",
            })}
          </h2>
          <p className="text-primary-foreground/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            {t({
              bn: "দুর্গাপূজা, দীপাবলি ও অন্যান্য উৎসবের জন্য এখনই বুকিং দিন। সীমিত মৌসুমী স্টক।",
              en: "Book now for Durga Puja, Diwali and other festivals. Limited seasonal stock available.",
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={`tel:${PHONE}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary-foreground text-primary hover:bg-primary-foreground/90 active:scale-95 transition-smooth px-8 py-3.5 rounded-full text-base font-bold shadow-lg"
              data-ocid="cta-call-btn"
            >
              <Phone size={18} />
              {t({ bn: "+৯১ ৬২৯৫৪৬৬৩১০", en: "+91 6295466310" })}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-95 transition-smooth px-8 py-3.5 rounded-full text-base font-bold shadow-lg"
              data-ocid="cta-whatsapp-btn"
            >
              <MessageCircle size={18} />
              {t({ bn: "হোয়াটসঅ্যাপ ইনকোয়ারি", en: "WhatsApp Inquiry" })}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-primary-foreground/70 text-sm">
            <MapPin size={15} />
            <span>
              Mirchoba, Palpara, Chhotonilpur, Bardhaman, West Bengal – 713103
            </span>
          </div>
        </div>
      </section>

      {/* ─── About Business (bottom) ─── */}
      <section className="py-16 bg-background" aria-labelledby="about-heading">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={{ bn: "আমাদের সম্পর্কে", en: "About Our Business" }}
                centered={false}
                className="mb-6"
              />
              <p className="text-foreground text-base leading-relaxed mb-4">
                {t({
                  bn: "রাধা মাধব মৃৎ শিল্পালয় হল বর্ধমানের মির্চোবা পালপাড়ায় একটি ঐতিহ্যবাহী মাটির মূর্তি প্রস্তুতকারী প্রতিষ্ঠান। প্রশান্ত পালের নেতৃত্বে আমরা বছরের পর বছর ধরে সর্বোচ্চ মানের হাতে তৈরি মাটির মূর্তি তৈরি করে আসছি।",
                  en: "Radha Madhav Mrit Shilpalay is a traditional clay idol manufacturing establishment in Mirchoba, Palpara, Bardhaman. Led by Prashant Pal, we have been crafting the finest handmade clay idols for years.",
                })}
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {t({
                  bn: "আমাদের দক্ষ কারিগররা প্রতিটি মূর্তিতে ঐতিহ্যবাহী শিল্পকলার ছাপ রাখেন। বর্ধমানের সমৃদ্ধ মৃৎশিল্পের ঐতিহ্য বহন করে আমরা পশ্চিমবঙ্গ ও সারা ভারতে পাইকারি মূল্যে মূর্তি সরবরাহ করি।",
                  en: "Our skilled artisans imprint traditional craftsmanship in every idol. Carrying forward the rich pottery heritage of Bardhaman, we supply idols at wholesale prices across West Bengal and all of India.",
                })}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  {
                    value: "15+",
                    label: { bn: "বছরের অভিজ্ঞতা", en: "Years Experience" },
                  },
                  {
                    value: "500+",
                    label: { bn: "সন্তুষ্ট ক্লায়েন্ট", en: "Happy Clients" },
                  },
                  {
                    value: "50+",
                    label: { bn: "মূর্তির ডিজাইন", en: "Idol Designs" },
                  },
                  {
                    value: "10K+",
                    label: { bn: "বার্ষিক অর্ডার", en: "Annual Orders" },
                  },
                ].map((stat) => (
                  <div
                    key={stat.value}
                    className="bg-card rounded-lg border border-border p-4 text-center"
                  >
                    <p className="font-display font-bold text-2xl text-primary">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {t(stat.label)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin
                  size={15}
                  className="text-secondary mt-0.5 flex-shrink-0"
                />
                <span>
                  Mirchoba, Palpara, Chhotonilpur, Bardhaman, West Bengal –
                  713103
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border aspect-[4/3]">
                <img
                  src="/assets/generated/hero-clay-idols.dim_1200x600.jpg"
                  alt="Traditional clay idol workshop at Radha Madhav Mrit Shilpalay Bardhaman"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">🏺</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {t({
                      bn: "ঐতিহ্যবাহী শিল্পকলা",
                      en: "Traditional Craftsmanship",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bardhaman, West Bengal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bottom padding for sticky bar */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
