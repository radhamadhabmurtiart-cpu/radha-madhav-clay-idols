import { BlogCard } from "@/components/BlogCard";
import { useLanguage } from "@/hooks/useLanguage";
import type { BlogCardProps } from "@/types";
import { useEffect, useState } from "react";

const ALL_POSTS: BlogCardProps[] = [
  {
    slug: "wholesale-buying-guide",
    title: {
      bn: "মাটির মূর্তি পাইকারি কেনার সম্পূর্ণ গাইড",
      en: "Complete Wholesale Buying Guide for Clay Idols",
    },
    excerpt: {
      bn: "পাইকারি মূর্তি কেনার আগে কোন বিষয়গুলো জানা দরকার? সরবরাহকারী বাছাই, অর্ডার প্রক্রিয়া, প্যাকেজিং ও পরিবহন — দোকানদার ও পূজা কমিটির জন্য সম্পূর্ণ গাইড।",
      en: "Everything you need to know before placing a wholesale clay idol order — supplier selection, order process, packaging, and transport. A complete guide for retailers and puja committees.",
    },
    date: "2025-03-15",
    readTime: { bn: "৮ মিনিট পড়া", en: "8 min read" },
    category: { bn: "ক্রয় গাইড", en: "Buying Guide" },
  },
  {
    slug: "how-to-choose-clay-idols",
    title: {
      bn: "পূজার জন্য সঠিক মাটির মূর্তি কিভাবে বেছে নেবেন",
      en: "How to Choose the Right Clay Idol for Puja",
    },
    excerpt: {
      bn: "দুর্গাপূজা, লক্ষ্মীপূজা, গণেশ চতুর্থী — প্রতিটি উৎসবের জন্য আলাদা মূর্তি দরকার। আকার নির্বাচন, গুণমান যাচাই এবং হাতে তৈরি বনাম যন্ত্রে তৈরি — সব জানুন এখানে।",
      en: "Different festivals require different idols. Learn how to select the right size, verify quality, and why handmade clay idols from Bardhaman are superior to machine-made alternatives.",
    },
    date: "2025-04-01",
    readTime: { bn: "৭ মিনিট পড়া", en: "7 min read" },
    category: { bn: "ক্রয় গাইড", en: "Buying Guide" },
  },
  {
    slug: "durga-puja-bulk-orders-west-bengal",
    title: {
      bn: "পশ্চিমবঙ্গের পূজা কমিটিগুলো কিভাবে মাটির মূর্তির পাইকারি অর্ডার দেয়",
      en: "How Durga Puja Committees in West Bengal Place Bulk Clay Idol Orders",
    },
    excerpt: {
      bn: "কলকাতা থেকে দুর্গাপুর — পশ্চিমবঙ্গের বড় পূজা কমিটিগুলো কীভাবে বার্ধমান থেকে মাটির মূর্তি সংগ্রহ করে? অগ্রিম বুকিং, কাস্টম সাইজ এবং নিরাপদ পরিবহনের সম্পূর্ণ প্রক্রিয়া।",
      en: "From Kolkata to Durgapur — how large puja committees across West Bengal source clay idols from Bardhaman. Complete process from advance booking and custom sizing to safe delivery.",
    },
    date: "2025-04-10",
    readTime: { bn: "৯ মিনিট পড়া", en: "9 min read" },
    category: { bn: "শহর ও উৎসব", en: "Cities" },
  },
];

type Category = "all" | "buying-guide" | "cities";

function getPostCategory(post: BlogCardProps): Category {
  const en = post.category.en;
  if (en === "Buying Guide") return "buying-guide";
  if (en === "Cities") return "cities";
  return "all";
}

export function BlogListPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  useEffect(() => {
    document.title =
      "Clay Idol Blog – Wholesale Buying Guides & Puja Tips | Radha Madhav Mrit Shilpalay";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Read expert guides on buying wholesale clay idols, choosing the right puja idol, and how Durga Puja committees in West Bengal place bulk orders from Bardhaman.",
      );
    }
  }, []);

  const categories: { label: string; value: Category }[] = [
    { label: t({ bn: "সব", en: "All" }), value: "all" },
    {
      label: t({ bn: "ক্রয় গাইড", en: "Buying Guide" }),
      value: "buying-guide",
    },
    { label: t({ bn: "শহর", en: "Cities" }), value: "cities" },
  ];

  const filtered =
    activeCategory === "all"
      ? ALL_POSTS
      : ALL_POSTS.filter((post) => getPostCategory(post) === activeCategory);

  return (
    <>
      {/* ─── Header Section ─── */}
      <section className="bg-card border-b border-border py-12">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">
            {t({ bn: "আমাদের ব্লগ", en: "Our Blog" })}
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            {t({
              bn: "মাটির মূর্তি ও পূজার গাইড",
              en: "Clay Idol Guide & Blog",
            })}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t({
              bn: "পাইকারি ক্রেতা, পূজা কমিটি ও দোকানদারদের জন্য বিশেষজ্ঞ পরামর্শ এবং তথ্যমূলক নিবন্ধ।",
              en: "Expert advice and informative articles for wholesale buyers, puja committees, and shop owners.",
            })}
          </p>
        </div>
      </section>

      {/* ─── Category Filter ─── */}
      <section className="bg-background border-b border-border py-4 sticky top-0 z-10 backdrop-blur-sm bg-background/90">
        <div className="container max-w-5xl mx-auto px-4">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label={t({ bn: "বিভাগ ফিল্টার", en: "Category filter" })}
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold border transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
                data-ocid={`blog-filter-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Blog Grid ─── */}
      <section className="py-12 bg-background">
        <div className="container max-w-5xl mx-auto px-4">
          {filtered.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="blog-list-empty"
            >
              <p className="text-lg font-display">
                {t({
                  bn: "এই বিভাগে কোনো নিবন্ধ নেই।",
                  en: "No articles in this category.",
                })}
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="blog-list-grid"
            >
              {filtered.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">
            {t({
              bn: "পাইকারি মূর্তি অর্ডার দিতে চান?",
              en: "Ready to Place a Wholesale Order?",
            })}
          </h2>
          <p className="text-muted-foreground text-sm mb-3">
            {t({
              bn: "আজই যোগাযোগ করুন এবং বর্ধমান থেকে সারা ভারতে ডেলিভারির সুবিধা নিন।",
              en: "Contact us today and get reliable delivery from Bardhaman across India.",
            })}
          </p>
          <p className="font-semibold text-primary text-base">+91 6295466310</p>
        </div>
      </section>

      {/* Bottom padding for sticky bar */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
