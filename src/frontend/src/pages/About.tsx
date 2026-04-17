import { SectionHeading } from "@/components/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Award,
  ChevronRight,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { useEffect } from "react";

const PHONE = "+916295466310";
const WHATSAPP_LINK =
  "https://wa.me/916295466310?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20clay%20idol%20orders.";

const CRAFTSMANSHIP_POINTS = [
  {
    id: "local-clay",
    icon: Leaf,
    title: { bn: "স্থানীয় মাটি", en: "Local Clay" },
    desc: {
      bn: "বর্ধমানের বিশেষ মাটি ও প্রাকৃতিক রঙ ব্যবহার করে তৈরি হয় প্রতিটি মূর্তি।",
      en: "Each idol is crafted using clay sourced locally from the Bardhaman region with natural pigments.",
    },
  },
  {
    id: "handcrafted",
    icon: Award,
    title: { bn: "হস্তনির্মিত শিল্প", en: "Handcrafted Artistry" },
    desc: {
      bn: "প্রতিটি প্রতিমা দক্ষ শিল্পীর হাতে গড়া — কোনো যন্ত্র নয়, সম্পূর্ণ হস্তশিল্প।",
      en: "Every idol is shaped by skilled hands — entirely handcrafted without industrial machinery.",
    },
  },
  {
    id: "traditional-painting",
    icon: Star,
    title: { bn: "ঐতিহ্যবাহী রঙ", en: "Traditional Painting" },
    desc: {
      bn: "প্রাচীন পদ্ধতিতে রঙ করা হয় — মূর্তির জীবন্ততা ধরে রাখে প্রাকৃতিক রঞ্জক।",
      en: "Painted using age-old techniques that preserve the spiritual liveliness of each divine form.",
    },
  },
  {
    id: "wholesale-supply",
    icon: Users,
    title: { bn: "পাইকারি সরবরাহ", en: "Wholesale Supply" },
    desc: {
      bn: "পুজা কমিটি থেকে শুরু করে খুচরা দোকানদার — সব ধরনের পাইকারি অর্ডার গ্রহণযোগ্য।",
      en: "Supplying wholesale to puja committees, retail shops, and decorators across West Bengal and India.",
    },
  },
];

const TRUST_STATS = [
  {
    id: "years",
    value: "20+",
    label: { bn: "বছরের অভিজ্ঞতা", en: "Years Experience" },
  },
  {
    id: "buyers",
    value: "500+",
    label: { bn: "সন্তুষ্ট ক্রেতা", en: "Satisfied Buyers" },
  },
  {
    id: "idols",
    value: "1000+",
    label: { bn: "মূর্তি প্রতি সিজন", en: "Idols Per Season" },
  },
  {
    id: "districts",
    value: "15+",
    label: { bn: "জেলায় সরবরাহ", en: "Districts Served" },
  },
];

const STORY_INFO = [
  {
    id: "location",
    bn: "মির্চোবা, পালপাড়া, ছোটনীলপুর, বর্ধমান — ৭১৩১০৩",
    en: "Mirchoba, Palpara, Chhotonilpur, Bardhaman – 713103",
  },
  { id: "owner", bn: "স্বত্বাধিকারী: প্রশান্ত পাল", en: "Proprietor: Prashant Pal" },
  {
    id: "specialty",
    bn: "বিশেষজ্ঞতা: পাইকারি মাটির মূর্তি সরবরাহ",
    en: "Speciality: Wholesale Clay Idol Supply",
  },
  {
    id: "service",
    bn: "সেবা এলাকা: সমগ্র পশ্চিমবঙ্গ ও ভারত",
    en: "Service Area: All West Bengal & India",
  },
];

const SERVICE_LIST = [
  { id: "puja-committee", bn: "পুজা কমিটি সরবরাহ", en: "Puja Committee Supply" },
  { id: "retail", bn: "খুচরা দোকানদার", en: "Retail Shop Owners" },
  { id: "decorators", bn: "ডেকোরেটর ও ইভেন্ট", en: "Decorators & Events" },
  { id: "custom", bn: "কাস্টম ডিজাইন মূর্তি", en: "Custom Design Idols" },
  { id: "bulk", bn: "বাল্ক অর্ডার গ্রহণযোগ্য", en: "Bulk Orders Accepted" },
  { id: "delivery", bn: "সর্বভারত ডেলিভারি", en: "Pan-India Delivery" },
];

const TRUST_BADGES = [
  {
    id: "trusted-manufacturer",
    icon: Award,
    title: { bn: "বিশ্বস্ত স্থানীয় প্রস্তুতকারক", en: "Trusted Local Manufacturer" },
    desc: {
      bn: "বর্ধমান জেলার অন্যতম প্রধান মাটির মূর্তি প্রস্তুতকারক হিসেবে স্বীকৃত।",
      en: "Recognized as one of the leading clay idol manufacturers in Bardhaman district.",
    },
  },
  {
    id: "bulk-orders",
    icon: Users,
    title: { bn: "পাইকারি অর্ডার গ্রহণযোগ্য", en: "Bulk Orders Accepted" },
    desc: {
      bn: "৫টি থেকে হাজারেরও বেশি মূর্তির অর্ডার — সব আকারের পাইকারি অর্ডার স্বাগত।",
      en: "From 5 to thousands of idols — all sizes of wholesale orders are welcome with competitive pricing.",
    },
  },
  {
    id: "limited-stock",
    icon: Star,
    title: { bn: "উৎসব মৌসুমে সীমিত স্টক", en: "Limited Seasonal Stock" },
    desc: {
      bn: "দুর্গাপূজা ও দীপাবলিতে স্টক দ্রুত শেষ হয়। সময়মতো অর্ডার দিন।",
      en: "Festival season stock sells out fast. Place your Durga Puja and Diwali orders well in advance.",
    },
  },
];

const WHY_BARDHAMAN = [
  {
    id: "heritage-center",
    num: "01",
    bn: "বর্ধমান পশ্চিমবঙ্গের মাটির মূর্তি তৈরির কেন্দ্রস্থল — শতাব্দী প্রাচীন ঐতিহ্য।",
    en: "Bardhaman is one of West Bengal's most celebrated centers for clay idol making — a tradition spanning centuries.",
  },
  {
    id: "easy-access",
    num: "02",
    bn: "কলকাতা ও পশ্চিমবঙ্গের যেকোনো প্রান্ত থেকে সহজ যোগাযোগ ও ডেলিভারি সুবিধা।",
    en: "Easy access and delivery for buyers from Kolkata and all across West Bengal via road and rail.",
  },
  {
    id: "ideal-soil",
    num: "03",
    bn: "মির্চোবা, পালপাড়া, ছোটনীলপুর — এই অঞ্চলের মাটি ও পরিবেশ মূর্তি তৈরির জন্য আদর্শ।",
    en: "Located in Mirchoba, Palpara, Chhotonilpur — the soil and environment here are ideal for quality clay work.",
  },
  {
    id: "family-craft",
    num: "04",
    bn: "স্থানীয় কারিগরদের পরিবারিক পেশা হওয়ায় দক্ষতা ও মান বংশপরম্পরায় বজায় থাকে।",
    en: "Idol-making is a family profession here, ensuring inherited craftsmanship skills passed down through generations.",
  },
];

export function AboutPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title =
      "About Us | Radha Madhav Mrit Shilpalay – Idol Maker Bardhaman | মাটির মূর্তি প্রস্তুতকারক";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Learn about Radha Madhav Mrit Shilpalay — traditional handmade clay idol manufacturer in Bardhaman, West Bengal. Family craftsmanship, wholesale supply, মাটির মূর্তি প্রস্তুতকারক বর্ধমান।",
      );
    }
  }, []);

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Banner */}
      <section className="relative bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(var(--secondary)) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(var(--accent)) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        <div className="relative container max-w-6xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-primary-foreground/40" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70">
              {t({ bn: "আমাদের পরিচয়", en: "Our Story" })}
            </span>
            <span className="h-px w-10 bg-primary-foreground/40" />
          </div>
          <h1 className="text-display-lg text-primary-foreground mb-5 leading-tight">
            {t({
              bn: "রাধা মাধব মৃৎ শিল্পালয়",
              en: "Radha Madhav Mrit Shilpalay",
            })}
          </h1>
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            {t({
              bn: "বর্ধমানের হৃদয় থেকে — প্রজন্মের পর প্রজন্ম ধরে হাতে গড়া মাটির মূর্তির এক অনন্য সংসার।",
              en: "From the heart of Bardhaman — a family legacy of handcrafted clay idols passed down through generations.",
            })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
              <Award size={13} />
              {t({ bn: "বিশ্বস্ত শিল্পী", en: "Trusted Artisan" })}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
              <Users size={13} />
              {t({ bn: "পাইকারি সরবরাহকারী", en: "Wholesale Supplier" })}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
              <MapPin size={13} />
              {t({ bn: "বর্ধমান, পশ্চিমবঙ্গ", en: "Bardhaman, WB" })}
            </span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <SectionHeading
                centered={false}
                title={{ bn: "আমাদের ইতিহাস", en: "Our Heritage Story" }}
                subtitle={{
                  bn: "প্রশান্ত পালের পরিবার বর্ধমানে মৃৎ শিল্পের চর্চা করে আসছেন প্রজন্মের পর প্রজন্ম ধরে।",
                  en: "The Pal family has been practicing the art of mrit shilpa (clay sculpture) in Bardhaman for generations.",
                }}
              />
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  {t({
                    bn: "রাধা মাধব মৃৎ শিল্পালয়ের সূচনা হয়েছিল বর্ধমানের মির্চোবায়, প্রশান্ত পালের পূর্বপুরুষদের হাতে। পরিবারের প্রতিটি প্রজন্ম এই ঐতিহ্যকে বুকে ধারণ করে এগিয়ে এসেছে।",
                    en: "Radha Madhav Mrit Shilpalay was founded in Mirchoba, Bardhaman, by the ancestors of Prashant Pal. Each generation of the family has carried this tradition forward with devotion.",
                  })}
                </p>
                <p>
                  {t({
                    bn: "আজ প্রশান্ত পাল সেই গর্বিত পারিবারিক ঐতিহ্যের ধারাবাহিকতা বজায় রেখে পশ্চিমবঙ্গের শ্রেষ্ঠ মৃৎ শিল্পীদের একজন হিসেবে পরিচিত হয়েছেন।",
                    en: "Today, Prashant Pal continues this proud family legacy and is recognized as one of West Bengal's finest clay idol artisans.",
                  })}
                </p>
                <p>
                  {t({
                    bn: "দুর্গাপূজা, লক্ষ্মীপূজা, গণেশ চতুর্থী থেকে শুরু করে বিভিন্ন উৎসবের মূর্তি — প্রতিটি প্রতিমায় ঢেলে দেওয়া হয় পূর্বপুরুষের শেখানো শিল্পীসত্তা।",
                    en: "From Durga Puja to Ganesh Chaturthi, every idol carries the artistry taught by forebears — a living connection to a centuries-old cultural tradition.",
                  })}
                </p>
              </div>
            </div>

            {/* Visual block */}
            <div className="relative">
              <div className="bg-muted/40 border border-border rounded-2xl overflow-hidden">
                <div className="bg-secondary/20 px-6 py-8 text-center">
                  <p className="font-display text-5xl text-primary font-bold mb-1">
                    ২০+
                  </p>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                    {t({ bn: "বছরের অভিজ্ঞতা", en: "Years of Experience" })}
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  {STORY_INFO.map((item) => (
                    <div key={item.id} className="flex items-start gap-2">
                      <ChevronRight
                        size={14}
                        className="text-secondary mt-0.5 flex-shrink-0"
                      />
                      <p className="text-sm text-foreground">{t(item)}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full bg-secondary/20 -z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-primary/10 -z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="bg-muted/30 border-y border-border py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST_STATS.map((stat) => (
              <div
                key={stat.id}
                className="text-center"
                data-ocid={`trust-stat-${stat.id}`}
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {t(stat.label)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "আমাদের কারুকাজ", en: "Our Craftsmanship" }}
            subtitle={{
              bn: "প্রতিটি মূর্তি স্থানীয় মাটি, প্রাকৃতিক রঙ ও ঐতিহ্যবাহী পদ্ধতিতে হাতে তৈরি।",
              en: "Every idol is handcrafted with local clay, natural pigments, and traditional painting methods.",
            }}
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFTSMANSHIP_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-secondary/60 hover:shadow-md transition-smooth"
                  data-ocid={`craft-point-${point.id}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {t(point.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(point.desc)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Experience */}
      <section className="bg-muted/30 border-y border-border py-14 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <SectionHeading
                centered={false}
                title={{ bn: "বিশ্বাস ও অভিজ্ঞতা", en: "Trust & Experience" }}
                subtitle={{
                  bn: "পশ্চিমবঙ্গ ও ভারত জুড়ে শত শত পাইকারি ক্রেতার বিশ্বাসের সঙ্গী।",
                  en: "Trusted by hundreds of wholesale buyers across West Bengal and India.",
                }}
              />
              <div className="mt-6 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  {t({
                    bn: "বছরের পর বছর ধরে আমরা পুজা কমিটি, খুচরা দোকানদার ও ডেকোরেটরদের কাছে নির্ভরযোগ্য মাটির মূর্তি সরবরাহ করে আসছি।",
                    en: "For years, we have been reliably supplying handmade clay idols to puja committees, retail shops, and decorators across the region.",
                  })}
                </p>
                <p>
                  {t({
                    bn: "দুর্গাপূজা ও দীপাবলির মৌসুমে আমাদের চাহিদা সর্বোচ্চ পর্যায়ে থাকে — তাই আগাম অর্ডার দেওয়া বাঞ্ছনীয়।",
                    en: "During Durga Puja and Diwali season demand is at its peak — advance orders are highly recommended to secure your stock.",
                  })}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_LIST.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                    <span className="text-sm text-foreground">{t(item)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges Column */}
            <div className="space-y-4">
              {TRUST_BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start hover:border-primary/30 transition-smooth"
                    data-ocid={`trust-badge-${badge.id}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">
                        {t(badge.title)}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t(badge.desc)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Bardhaman */}
      <section className="bg-background py-14 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <SectionHeading
            title={{ bn: "কেন বর্ধমান?", en: "Why Bardhaman?" }}
            subtitle={{
              bn: "বর্ধমান পশ্চিমবঙ্গের মূর্তি শিল্পের প্রাণকেন্দ্র — শতাব্দী ধরে এই মাটিতে গড়ে উঠেছে অসংখ্য শিল্পীর জীবন।",
              en: "Bardhaman is the cultural heartland of West Bengal's idol-making belt — a living tradition rooted in this soil.",
            }}
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_BARDHAMAN.map((point) => (
              <div
                key={point.id}
                className="flex gap-4 items-start bg-muted/30 border border-border rounded-xl p-5 hover:bg-muted/50 transition-smooth"
                data-ocid={`bardhaman-point-${point.id}`}
              >
                <span className="font-display text-2xl font-bold text-secondary/60 leading-none flex-shrink-0 mt-0.5">
                  {point.num}
                </span>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {t(point)}
                </p>
              </div>
            ))}
          </div>

          {/* Location detail card */}
          <div className="mt-8 bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <MapPin size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                {t({ bn: "আমাদের অবস্থান", en: "Our Location" })}
              </h3>
              <p className="text-sm text-muted-foreground">
                Mirchoba, Palpara, Chhotonilpur, Bardhaman, West Bengal –
                713103, India
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {t({
                  bn: "কলকাতা থেকে মাত্র ১০০ কিমি — সহজ সড়ক ও রেল যোগাযোগ।",
                  en: "Just ~100 km from Kolkata — easily accessible by road and rail.",
                })}
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/Mirchoba+Palpara+Chhotonilpur+Bardhaman+West+Bengal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm py-2 px-4 rounded-md inline-flex items-center gap-2 flex-shrink-0"
              data-ocid="map-link-about"
            >
              <MapPin size={14} />
              {t({ bn: "মানচিত্রে দেখুন", en: "View on Map" })}
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary py-14 sm:py-20">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-primary-foreground/30" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              {t({ bn: "যোগাযোগ করুন", en: "Get In Touch" })}
            </span>
            <span className="h-px w-8 bg-primary-foreground/30" />
          </div>
          <h2 className="text-display-md text-primary-foreground mb-4">
            {t({
              bn: "কাস্টম অর্ডার বা পাইকারি জিজ্ঞাসা?",
              en: "Custom Order or Bulk Inquiry?",
            })}
          </h2>
          <p className="text-primary-foreground/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {t({
              bn: "যেকোনো আকার বা ডিজাইনের মূর্তির জন্য আজই যোগাযোগ করুন। দুর্গাপূজা ও দীপাবলির আগে অর্ডার দিন — সীমিত স্টক।",
              en: "Contact us today for any size or custom design. Place your Durga Puja and Diwali orders early — limited seasonal stock available.",
            })}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold py-3.5 px-8 rounded-lg text-base hover:bg-primary-foreground/90 transition-smooth w-full sm:w-auto"
              data-ocid="about-call-cta"
            >
              <Phone size={18} />
              {t({ bn: "এখনই কল করুন", en: "Call Now" })}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-bold py-3.5 px-8 rounded-lg text-base hover:bg-secondary/90 transition-smooth w-full sm:w-auto"
              data-ocid="about-whatsapp-cta"
            >
              <MessageCircle size={18} />
              {t({ bn: "হোয়াটসঅ্যাপ করুন", en: "WhatsApp Inquiry" })}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
