import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useProducts } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types";
import {
  MessageCircle,
  Package,
  Palette,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";

const WHATSAPP_BASE = "https://wa.me/916295466310?text=";

type CategoryId =
  | "ganesh"
  | "lakshmi"
  | "durga"
  | "saraswati"
  | "hanuman"
  | "custom";

interface Category {
  id: CategoryId;
  label: { bn: string; en: string };
  emoji: string;
}

const CATEGORIES: Category[] = [
  {
    id: "ganesh",
    label: { bn: "গণেশ মূর্তি", en: "Clay Ganesh Idol" },
    emoji: "🐘",
  },
  {
    id: "lakshmi",
    label: { bn: "লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" },
    emoji: "🪷",
  },
  { id: "durga", label: { bn: "দুর্গা মূর্তি", en: "Clay Durga Idol" }, emoji: "⚔️" },
  {
    id: "saraswati",
    label: { bn: "সরস্বতী মূর্তি", en: "Clay Saraswati Idol" },
    emoji: "🎵",
  },
  {
    id: "hanuman",
    label: { bn: "হনুমান মূর্তি", en: "Clay Hanuman Idol" },
    emoji: "🔱",
  },
  {
    id: "custom",
    label: { bn: "কাস্টম মূর্তি", en: "Custom Clay Idols" },
    emoji: "✨",
  },
];

const HARDCODED_PRODUCTS: Record<
  Exclude<CategoryId, "custom">,
  ProductCategory[]
> = {
  ganesh: [
    {
      id: "siddhi-vinayak",
      name: { bn: "সিদ্ধি বিনায়ক গণেশ", en: "Siddhi Vinayak Ganesh" },
      description: {
        bn: "শুভ সিদ্ধি বিনায়ক গণেশ মূর্তি — পূজা ও উপহারের জন্য আদর্শ। পাইকারি মূল্যে পাওয়া যায়।",
        en: "Auspicious Siddhi Vinayak Ganesh idol — ideal for puja and gifting. Available at wholesale pricing.",
      },
      image: "/assets/generated/ganesh-siddhi-vinayak.jpg",
      sizes: ['4 ইঞ্চি / 4"', '6"', '9"', '12"', '18"', '24"'],
      priceRange: "₹150 – ₹4500",
      bulkAvailable: true,
      slug: "siddhi-vinayak-ganesh",
    },
    {
      id: "panchmukhi-ganesh",
      name: { bn: "পঞ্চমুখী গণেশ", en: "Panchmukhi Ganesh" },
      description: {
        bn: "পাঁচ মুখের বিশেষ গণেশ মূর্তি — সমৃদ্ধি ও শুভফলের প্রতীক।",
        en: "Five-faced Ganesh idol symbolising prosperity and blessings — a premium collector's piece.",
      },
      image: "/assets/generated/ganesh-panchmukhi.jpg",
      sizes: ['6"', '9"', '12"', '18"'],
      priceRange: "₹350 – ₹3200",
      bulkAvailable: true,
      slug: "panchmukhi-ganesh",
    },
    {
      id: "bal-ganesh",
      name: { bn: "বাল গণেশ", en: "Bal Ganesh" },
      description: {
        bn: "শিশু গণেশের মনোরম রূপ — শিশুদের উপহার ও ছোট পূজার জন্য উপযুক্ত।",
        en: "Charming child Ganesh form — perfect for gifts and home puja mandirs.",
      },
      image: "/assets/generated/ganesh-bal.jpg",
      sizes: ['3"', '5"', '7"'],
      priceRange: "₹150 – ₹950",
      bulkAvailable: true,
      slug: "bal-ganesh",
    },
  ],
  lakshmi: [
    {
      id: "maha-lakshmi",
      name: { bn: "মহালক্ষ্মী", en: "Maha Lakshmi" },
      description: {
        bn: "ধন ও সমৃদ্ধির দেবী মহালক্ষ্মীর মূর্তি — দীপাবলি ও পূজার জন্য সর্বাধিক চাহিদাসম্পন্ন।",
        en: "Goddess of wealth and prosperity — highest demand during Diwali and Lakshmi Puja.",
      },
      image: "/assets/generated/lakshmi-maha.jpg",
      sizes: ['4"', '6"', '9"', '12"', '18"', '24"'],
      priceRange: "₹180 – ₹5000",
      bulkAvailable: true,
      slug: "maha-lakshmi",
    },
    {
      id: "kamala-lakshmi",
      name: { bn: "কমলা লক্ষ্মী", en: "Kamala Lakshmi" },
      description: {
        bn: "পদ্মের উপর বিরাজমান কমলা লক্ষ্মীর সুন্দর মূর্তি — দোকান ও অফিসের জন্য আদর্শ।",
        en: "Beautiful Kamala Lakshmi seated on lotus — ideal for shops, offices and home altars.",
      },
      image: "/assets/generated/lakshmi-kamala.jpg",
      sizes: ['6"', '9"', '12"', '18"'],
      priceRange: "₹280 – ₹3800",
      bulkAvailable: true,
      slug: "kamala-lakshmi",
    },
    {
      id: "padma-lakshmi",
      name: { bn: "পদ্ম লক্ষ্মী", en: "Padma Lakshmi" },
      description: {
        bn: "পদ্মহস্তা লক্ষ্মীর ঐতিহ্যবাহী রূপ — বাণিজ্যিক পূজা কমিটির জন্য বিশেষভাবে তৈরি।",
        en: "Traditional Padma Lakshmi form with lotus — crafted specially for commercial puja committees.",
      },
      image: "/assets/generated/lakshmi-padma.jpg",
      sizes: ['9"', '12"', '18"', '24"'],
      priceRange: "₹420 – ₹4200",
      bulkAvailable: true,
      slug: "padma-lakshmi",
    },
  ],
  durga: [
    {
      id: "mahishasuramardini",
      name: { bn: "মহিষাসুরমর্দিনী দুর্গা", en: "Mahishasuramardini Durga" },
      description: {
        bn: "মহিষাসুর নিধনকারী দুর্গার সর্বাধিক পূজিত রূপ — দুর্গাপূজার জন্য সীমিত স্টক।",
        en: "Most revered form of Durga slaying Mahishasur — limited seasonal stock for Durga Puja.",
      },
      image: "/assets/generated/durga-mahishasura.jpg",
      sizes: ['12"', '18"', '24"', '36"', '48"', '60"', '72"', '84"'],
      priceRange: "₹800 – ₹25000",
      bulkAvailable: true,
      slug: "mahishasuramardini-durga",
    },
    {
      id: "dashabhuja-durga",
      name: { bn: "দশভুজা দুর্গা", en: "Dashabhuja Durga" },
      description: {
        bn: "দশ হাতবিশিষ্ট দুর্গার ক্লাসিক রূপ — বড় পূজা প্যান্ডেলের জন্য উপযুক্ত।",
        en: "Classic ten-armed Durga form — ideal for large puja pandals and community celebrations.",
      },
      image: "/assets/generated/durga-dashabhuja.jpg",
      sizes: ['18"', '24"', '36"', '48"', '60"'],
      priceRange: "₹1200 – ₹18000",
      bulkAvailable: true,
      slug: "dashabhuja-durga",
    },
    {
      id: "durga-family",
      name: { bn: "পরিবার সহ দুর্গা", en: "Durga with Family" },
      description: {
        bn: "লক্ষ্মী, সরস্বতী, কার্তিক ও গণেশ সহ সম্পূর্ণ দুর্গা পরিবার — দুর্গাপূজার সেরা পছন্দ।",
        en: "Complete Durga family with Lakshmi, Saraswati, Kartik & Ganesh — the best choice for Durga Puja.",
      },
      image: "/assets/generated/durga-family.jpg",
      sizes: ['24"', '36"', '48"', '60"'],
      priceRange: "₹3500 – ₹35000",
      bulkAvailable: true,
      slug: "durga-family",
    },
  ],
  saraswati: [
    {
      id: "veena-saraswati",
      name: { bn: "বীণা সরস্বতী", en: "Veena Saraswati" },
      description: {
        bn: "বীণাধারী বিদ্যার দেবী সরস্বতী — সরস্বতী পূজায় সবচেয়ে বেশি চাহিদাসম্পন্ন মূর্তি।",
        en: "Goddess Saraswati with veena — most sought-after idol for Saraswati Puja celebrations.",
      },
      image: "/assets/generated/saraswati-veena.jpg",
      sizes: ['6"', '9"', '12"', '18"', '24"'],
      priceRange: "₹350 – ₹6500",
      bulkAvailable: true,
      slug: "veena-saraswati",
    },
    {
      id: "padmasana-saraswati",
      name: { bn: "পদ্মাসনা সরস্বতী", en: "Padmasana Saraswati" },
      description: {
        bn: "পদ্মাসনে বিরাজমান সরস্বতীর সুন্দর রূপ — বিদ্যালয় ও পাঠাগারের জন্য বিশেষ।",
        en: "Graceful Saraswati seated on lotus — a popular choice for schools and educational institutions.",
      },
      image: "/assets/generated/saraswati-padmasana.jpg",
      sizes: ['9"', '12"', '18"', '24"'],
      priceRange: "₹500 – ₹5500",
      bulkAvailable: true,
      slug: "padmasana-saraswati",
    },
  ],
  hanuman: [
    {
      id: "veer-hanuman",
      name: { bn: "বীর হনুমান", en: "Veer Hanuman" },
      description: {
        bn: "শক্তির প্রতীক বীর হনুমানের মূর্তি — মন্দির ও পূজা কমিটির জন্য উপযুক্ত।",
        en: "Powerful Veer Hanuman idol — ideal for temples, mandirs and puja committees.",
      },
      image: "/assets/generated/hanuman-veer.jpg",
      sizes: ['6"', '9"', '12"', '18"', '24"'],
      priceRange: "₹300 – ₹5800",
      bulkAvailable: true,
      slug: "veer-hanuman",
    },
    {
      id: "sankat-mochan",
      name: { bn: "সংকট মোচন হনুমান", en: "Sankat Mochan Hanuman" },
      description: {
        bn: "সংকট দূরকারী হনুমানের বিশেষ রূপ — ভক্তদের মধ্যে অত্যন্ত জনপ্রিয়।",
        en: "Sankat Mochan form of Hanuman — extremely popular among devotees for home puja.",
      },
      image: "/assets/generated/hanuman-sankat-mochan.jpg",
      sizes: ['6"', '9"', '12"', '18"'],
      priceRange: "₹280 – ₹4200",
      bulkAvailable: true,
      slug: "sankat-mochan-hanuman",
    },
  ],
};

const LOGISTICS_CARDS = [
  {
    id: "all-india",
    icon: <Truck size={28} />,
    title: { bn: "সারা ভারতে ডেলিভারি", en: "All India Delivery" },
    desc: {
      bn: "বর্ধমান থেকে কলকাতা, দুর্গাপুর, আসানসোল সহ সারা ভারতে নিরাপদে পাঠানো হয়।",
      en: "Safe delivery from Bardhaman to Kolkata, Durgapur, Asansol and across all India.",
    },
  },
  {
    id: "safe-transport",
    icon: <ShieldCheck size={28} />,
    title: { bn: "মূর্তির নিরাপদ পরিবহন", en: "Safe Transport for Clay Idols" },
    desc: {
      bn: "প্রতিটি মূর্তি বিশেষভাবে ফোম ও কার্ডবোর্ডে প্যাক করে পাঠানো হয় — ভাঙার ঝুঁকি নেই।",
      en: "Every idol packed in foam and corrugated cardboard — zero breakage risk during transit.",
    },
  },
  {
    id: "bulk-packed",
    icon: <Package size={28} />,
    title: { bn: "বাল্ক অর্ডার নিরাপদ প্যাকিং", en: "Bulk Orders Packed Securely" },
    desc: {
      bn: "বাল্ক অর্ডার বিশেষ ক্রেটে প্যাক করা হয়। দূরে পাঠানোর জন্য সম্পূর্ণ নিরাপদ।",
      en: "Bulk orders crated and strapped for long-distance shipments. 100% safe delivery guaranteed.",
    },
  },
];

const PLACEHOLDER_COLORS = [
  "bg-secondary/20",
  "bg-primary/10",
  "bg-accent/10",
  "bg-muted",
];

function IdolPlaceholder({
  initials,
  colorClass,
}: { initials: string; colorClass: string }) {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${colorClass} gap-2`}
    >
      <span className="text-4xl font-display font-bold text-primary/70 select-none">
        {initials}
      </span>
      <span className="text-xs text-muted-foreground font-body">
        Radha Madhav
      </span>
    </div>
  );
}

function ProductCardWithFallback({
  product,
  index,
}: { product: ProductCategory; index: number }) {
  const { t } = useLanguage();
  const initials = t(product.name)
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const colorClass = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  const waMessage = encodeURIComponent(
    `নমস্কার, আমি ${t(product.name)} এর পাইকারি অর্ডার সম্পর্কে জানতে চাই। দয়া করে মূল্য ও বিবরণ জানান। / Hello, I am interested in bulk order for ${t(product.name)}. Please share pricing and details.`,
  );

  return (
    <article
      className="bg-card rounded-xl overflow-hidden border border-border group transition-smooth hover:-translate-y-1 hover:shadow-lg"
      data-ocid="product-card"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={t(product.name)}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = "flex";
          }}
        />
        <div
          className={`absolute inset-0 flex-col items-center justify-center ${colorClass} hidden`}
          aria-hidden="true"
        >
          <IdolPlaceholder initials={initials} colorClass={colorClass} />
        </div>
        {product.bulkAvailable && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1 shadow-sm">
              {t({ bn: "পাইকারি অর্ডার উপলব্ধ", en: "Bulk Order Available" })}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-display font-semibold text-lg text-foreground leading-tight line-clamp-1">
          {t(product.name)}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {t(product.description)}
        </p>

        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">
              {t({ bn: "মাপ:", en: "Sizes:" })}
            </span>
            {product.sizes.map((size) => (
              <span
                key={size}
                className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded border border-border"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {product.priceRange && (
          <p className="text-sm font-bold text-primary">
            {t({ bn: "মূল্য:", en: "Price:" })} {product.priceRange}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <a
            href={`${WHATSAPP_BASE}${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold py-2 px-3 rounded-lg transition-smooth"
            data-ocid="product-whatsapp-btn"
          >
            <MessageCircle size={14} />
            {t({ bn: "হোয়াটসঅ্যাপ", en: "WhatsApp" })}
          </a>
          <a
            href="tel:+916295466310"
            aria-label={t({ bn: "এখনই কল করুন", en: "Call Now" })}
            className="inline-flex items-center justify-center bg-card border border-primary text-primary hover:bg-primary/10 p-2 rounded-lg transition-smooth"
            data-ocid="product-call-btn"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

/** Convert a backend Product to the ProductCategory shape used by public page */
function backendProductToDisplay(product: {
  id: bigint;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  sizes: string[];
  priceRangeMin: bigint;
  priceRangeMax: bigint;
  bulkAvailable: boolean;
  imageIds: string[];
  category: string;
}): ProductCategory {
  const firstImage = product.imageIds[0] ?? "";
  const priceMin = Number(product.priceRangeMin);
  const priceMax = Number(product.priceRangeMax);
  const priceRange =
    priceMin > 0 || priceMax > 0 ? `₹${priceMin} – ₹${priceMax}` : "";

  return {
    id: product.id.toString(),
    name: { bn: product.nameBn, en: product.nameEn },
    description: { bn: product.descriptionBn, en: product.descriptionEn },
    image: firstImage,
    sizes: product.sizes,
    priceRange,
    bulkAvailable: product.bulkAvailable,
    slug: product.id.toString(),
  };
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card rounded-xl overflow-hidden border border-border"
        >
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LogisticsSection() {
  const { t } = useLanguage();
  return (
    <section
      className="bg-card border-y border-border py-8 px-4"
      aria-label="Logistics Trust"
    >
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {LOGISTICS_CARDS.map((card) => (
            <div
              key={card.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background hover:shadow-sm transition-smooth"
              data-ocid={`logistics-${card.id}`}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 text-secondary">
                {card.icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                  {t(card.title)}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {t(card.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomIdolsSection() {
  const { t } = useLanguage();
  const waCustom = encodeURIComponent(
    "নমস্কার, আমি কাস্টম মাটির মূর্তির অর্ডার দিতে চাই। দয়া করে বিস্তারিত জানান। / Hello, I would like to place a custom clay idol order. Please share details.",
  );

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
          <div className="flex items-center gap-2">
            <Palette className="text-secondary" size={22} />
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              {t({ bn: "বিশেষ অর্ডার", en: "Special Orders" })}
            </span>
          </div>
          <h3 className="text-display-sm text-foreground">
            {t({
              bn: "কাস্টম মাটির মূর্তি তৈরি করুন",
              en: "Design Your Custom Clay Idol",
            })}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t({
              bn: "আপনার পছন্দমতো ডিজাইন, মাপ ও রং বেছে নিন। বিশেষ পূজা, উৎসব বা কর্পোরেট উপহারের জন্য কাস্টম মূর্তি তৈরি করা হয়। ন্যূনতম ২৫টি মূর্তির পাইকারি অর্ডার গ্রহণ করা হয়।",
              en: "Choose your preferred design, size, and finish. Custom idols crafted for special puja, festivals or corporate gifting. Wholesale orders accepted from minimum 25 pieces.",
            })}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              {
                id: "any-deity",
                bn: "যেকোনো দেবতার মূর্তি তৈরি সম্ভব",
                en: "Any deity idol can be crafted",
              },
              {
                id: "logo-design",
                bn: "লোগো বা ব্র্যান্ড সহ কাস্টম ডিজাইন",
                en: "Custom designs with logo or branding",
              },
              {
                id: "bulk-discount",
                bn: "বাল্ক অর্ডারে বিশেষ ছাড়",
                en: "Special discounts on bulk orders",
              },
              {
                id: "delivery-days",
                bn: "৭–২১ দিনের মধ্যে ডেলিভারি",
                en: "Delivery within 7–21 working days",
              },
            ].map((item) => (
              <li key={item.id} className="flex items-start gap-2">
                <span className="text-secondary mt-0.5">✓</span>
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`${WHATSAPP_BASE}${waCustom}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-smooth"
              data-ocid="custom-whatsapp-btn"
            >
              <MessageCircle size={18} />
              {t({ bn: "হোয়াটসঅ্যাপে অর্ডার করুন", en: "Order via WhatsApp" })}
            </a>
            <a
              href="tel:+916295466310"
              className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-6 rounded-lg transition-smooth"
              data-ocid="custom-call-btn"
            >
              <Phone size={18} />
              {t({ bn: "+91 62954 66310", en: "+91 62954 66310" })}
            </a>
          </div>
        </div>
        <div
          className="min-h-64 md:min-h-full bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 flex items-center justify-center p-8"
          aria-hidden="true"
        >
          <div className="text-center space-y-3">
            <div className="text-7xl">🏺</div>
            <p className="font-display font-semibold text-xl text-foreground">
              {t({ bn: "আপনার কল্পনা, আমাদের শিল্প", en: "Your Vision, Our Craft" })}
            </p>
            <p className="text-sm text-muted-foreground">
              {t({
                bn: "বর্ধমান, পশ্চিমবঙ্গ থেকে",
                en: "From Bardhaman, West Bengal",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("ganesh");

  // Fetch from backend; fall back to hardcoded data if empty or loading
  const { data: backendProducts, isLoading } = useProducts();

  // Filter backend products for active category
  const backendForCategory =
    backendProducts && backendProducts.length > 0
      ? backendProducts
          .filter((p) => p.category === activeCategory)
          .map((p, i) => ({ product: backendProductToDisplay(p), index: i }))
      : null;

  // Fallback to hardcoded when backend has nothing yet
  const hardcodedForCategory: { product: ProductCategory; index: number }[] =
    activeCategory !== "custom"
      ? (HARDCODED_PRODUCTS[activeCategory] ?? []).map((p, i) => ({
          product: p,
          index: i,
        }))
      : [];

  const activeProducts =
    activeCategory !== "custom"
      ? (backendForCategory ?? hardcodedForCategory)
      : [];

  return (
    <>
      <title>
        Clay Idol Manufacturer Bardhaman | Wholesale Ganesh Lakshmi Durga Idols
        | Radha Madhav Mrit Shilpalay
      </title>
      <meta
        name="description"
        content="Buy wholesale clay idols from Radha Madhav Mrit Shilpalay, Bardhaman. Ganesh, Lakshmi, Durga, Saraswati, Hanuman &amp; custom clay idols. Bulk orders accepted. All India delivery available. মাটির মূর্তি পাইকারি — গণেশ, লক্ষ্মী, দুর্গা, সরস্বতী মূর্তি।"
      />

      {/* Page Hero */}
      <section className="bg-card border-b border-border py-12 sm:py-16">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-4">
          <SectionHeading
            title={{ bn: "আমাদের মূর্তির সংগ্রহ", en: "Our Idol Collections" }}
            subtitle={{
              bn: "বর্ধমানের দক্ষ শিল্পীদের হস্তনির্মিত মাটির মূর্তি — পাইকারি ও বাল্ক অর্ডারে সরাসরি কারখানা থেকে।",
              en: "Handcrafted clay idols by master artisans of Bardhaman — direct from workshop at wholesale & bulk prices.",
            }}
          />
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Badge className="bg-secondary/20 text-foreground border border-secondary/40 px-3 py-1 text-sm">
              {t({ bn: "✅ পাইকারি মূল্যে পাওয়া যায়", en: "✅ Wholesale Pricing" })}
            </Badge>
            <Badge className="bg-secondary/20 text-foreground border border-secondary/40 px-3 py-1 text-sm">
              {t({ bn: "🏺 হস্তনির্মিত", en: "🏺 Handmade" })}
            </Badge>
            <Badge className="bg-secondary/20 text-foreground border border-secondary/40 px-3 py-1 text-sm">
              {t({ bn: "📦 বাল্ক অর্ডার গৃহীত হয়", en: "📦 Bulk Orders Accepted" })}
            </Badge>
            <Badge className="bg-secondary/20 text-foreground border border-secondary/40 px-3 py-1 text-sm">
              {t({ bn: "🚚 সারা ভারতে ডেলিভারি", en: "🚚 All India Delivery" })}
            </Badge>
          </div>
        </div>
      </section>

      {/* ─── Logistics Trust Section ─── */}
      <LogisticsSection />

      {/* Scarcity Banner */}
      <section className="bg-secondary/15 border-b border-secondary/30 py-3 px-4">
        <p className="text-center text-sm font-semibold text-foreground max-w-3xl mx-auto">
          🔔{" "}
          {t({
            bn: "দুর্গাপূজার জন্য এখনই অর্ডার বুক করুন — সীমিত স্টক উপলব্ধ। দীপাবলিতে লক্ষ্মী মূর্তির চাহিদা বেশি থাকে।",
            en: "Book your Durga Puja order early — limited seasonal stock available. Lakshmi idols are in high demand during Diwali.",
          })}
        </p>
      </section>

      {/* Category Tabs */}
      <section className="bg-background sticky top-0 z-10 border-b border-border shadow-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div
            className="flex gap-1 overflow-x-auto py-3 scrollbar-hide"
            role="tablist"
            aria-label={t({ bn: "পণ্য বিভাগ", en: "Product Categories" })}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                  transition-smooth border whitespace-nowrap
                  ${
                    activeCategory === cat.id
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                  }
                `}
                data-ocid={`category-tab-${cat.id}`}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-background py-10 sm:py-14">
        <div className="container max-w-6xl mx-auto px-4">
          {activeCategory !== "custom" ? (
            <>
              <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-display-sm text-foreground">
                    {CATEGORIES.find((c) => c.id === activeCategory)?.emoji}{" "}
                    {t(CATEGORIES.find((c) => c.id === activeCategory)!.label)}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t({
                      bn: `${activeProducts.length}টি পণ্য উপলব্ধ — পাইকারি ও বাল্ক অর্ডার গৃহীত হয়`,
                      en: `${activeProducts.length} products available — wholesale & bulk orders accepted`,
                    })}
                  </p>
                </div>
                {activeCategory === "durga" && (
                  <div className="flex items-center gap-2 bg-secondary/15 border border-secondary/30 px-3 py-2 rounded-lg text-sm font-semibold text-foreground">
                    ⏰{" "}
                    {t({
                      bn: "দুর্গাপূজার সিজন — এখনই বুক করুন",
                      en: "Durga Puja Season — Book Now",
                    })}
                  </div>
                )}
              </div>

              {isLoading ? (
                <ProductsGridSkeleton />
              ) : (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  role="tabpanel"
                  data-ocid="products-grid"
                >
                  {activeProducts.map(({ product, index }) => (
                    <ProductCardWithFallback
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <CustomIdolsSection />
          )}
        </div>
      </section>

      {/* Trust / B2B CTA Strip */}
      <section className="bg-muted/40 border-t border-border py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
            {[
              {
                id: "trusted",
                icon: "🏆",
                title: { bn: "বিশ্বস্ত নির্মাতা", en: "Trusted Manufacturer" },
                desc: {
                  bn: "বর্ধমানে ২০+ বছরের অভিজ্ঞতা",
                  en: "20+ years of experience in Bardhaman",
                },
              },
              {
                id: "bulk",
                icon: "📦",
                title: { bn: "বাল্ক অর্ডার", en: "Bulk Orders" },
                desc: {
                  bn: "ন্যূনতম ১০টি থেকে পাইকারি মূল্যে পাওয়া যায়",
                  en: "Wholesale pricing from minimum 10 pieces",
                },
              },
              {
                id: "delivery",
                icon: "🚚",
                title: { bn: "সারা ভারতে ডেলিভারি", en: "Pan-India Delivery" },
                desc: {
                  bn: "পশ্চিমবঙ্গ ও ভারতের সর্বত্র পাঠানো হয়",
                  en: "Shipped across West Bengal and all of India",
                },
              },
            ].map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="font-display font-semibold text-foreground">
                  {t(item.title)}
                </h3>
                <p className="text-muted-foreground text-sm">{t(item.desc)}</p>
              </div>
            ))}
          </div>

          <div className="text-center space-y-3">
            <p className="text-foreground font-semibold text-base">
              {t({
                bn: "পাইকারি মূল্য তালিকা বা কাস্টম কোটেশনের জন্য আজই যোগাযোগ করুন",
                en: "Contact us today for wholesale price list or custom quotation",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`${WHATSAPP_BASE}${encodeURIComponent("নমস্কার, আমি মূর্তির পাইকারি মূল্য তালিকা চাই। / Hello, I need the wholesale price list for clay idols.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-7 rounded-lg transition-smooth"
                data-ocid="cta-whatsapp-price"
              >
                <MessageCircle size={18} />
                {t({ bn: "মূল্য তালিকা পান", en: "Get Price List on WhatsApp" })}
              </a>
              <a
                href="tel:+916295466310"
                className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-7 rounded-lg transition-smooth"
                data-ocid="cta-call-now"
              >
                <Phone size={18} />
                {t({ bn: "এখনই কল করুন", en: "Call Now" })}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
