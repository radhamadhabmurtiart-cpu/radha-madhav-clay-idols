import { d as useLanguage, j as jsxRuntimeExports, L as Link, r as reactExports } from "./index-DIjz4Rf9.js";
import { B as BookOpen, C as Calendar } from "./calendar-D0ppiYcK.js";
import { C as Clock } from "./clock-gd6IGh4I.js";
function toBlogPath(slug) {
  const map = {
    "wholesale-buying-guide": "/blog/wholesale-buying-guide",
    "how-to-choose-clay-idols": "/blog/how-to-choose-clay-idols",
    "durga-puja-bulk-orders-west-bengal": "/blog/durga-puja-bulk-orders-west-bengal"
  };
  return map[slug] ?? "/blog/wholesale-buying-guide";
}
function BlogCard({
  slug,
  title,
  date,
  readTime,
  category,
  excerpt,
  heroImage,
  className = ""
}) {
  const { t } = useLanguage();
  const blogPath = toBlogPath(slug);
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: `bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col transition-smooth hover:shadow-md hover:border-primary/30 group ${className}`,
      "data-ocid": `blog-card-${slug}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: blogPath, className: "block overflow-hidden aspect-[16/9]", children: heroImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: heroImage,
            alt: t(title),
            className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
            loading: "lazy"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 40, className: "text-muted-foreground/40" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block self-start text-xs font-semibold uppercase tracking-wide text-secondary bg-secondary/10 border border-secondary/20 rounded-full px-3 py-0.5 mb-3", children: t(category) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground leading-snug mb-2 group-hover:text-primary transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: blogPath, children: t(title) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4", children: t(excerpt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
              formattedDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
              t(readTime)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: blogPath,
            className: "inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-smooth",
            "data-ocid": `blog-card-read-more-${slug}`,
            children: [
              t({ bn: "আরও পড়ুন", en: "Read More" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "→" })
            ]
          }
        ) })
      ]
    }
  );
}
const ALL_POSTS = [
  {
    slug: "wholesale-buying-guide",
    title: {
      bn: "মাটির মূর্তি পাইকারি কেনার সম্পূর্ণ গাইড",
      en: "Complete Wholesale Buying Guide for Clay Idols"
    },
    excerpt: {
      bn: "পাইকারি মূর্তি কেনার আগে কোন বিষয়গুলো জানা দরকার? সরবরাহকারী বাছাই, অর্ডার প্রক্রিয়া, প্যাকেজিং ও পরিবহন — দোকানদার ও পূজা কমিটির জন্য সম্পূর্ণ গাইড।",
      en: "Everything you need to know before placing a wholesale clay idol order — supplier selection, order process, packaging, and transport. A complete guide for retailers and puja committees."
    },
    date: "2025-03-15",
    readTime: { bn: "৮ মিনিট পড়া", en: "8 min read" },
    category: { bn: "ক্রয় গাইড", en: "Buying Guide" }
  },
  {
    slug: "how-to-choose-clay-idols",
    title: {
      bn: "পূজার জন্য সঠিক মাটির মূর্তি কিভাবে বেছে নেবেন",
      en: "How to Choose the Right Clay Idol for Puja"
    },
    excerpt: {
      bn: "দুর্গাপূজা, লক্ষ্মীপূজা, গণেশ চতুর্থী — প্রতিটি উৎসবের জন্য আলাদা মূর্তি দরকার। আকার নির্বাচন, গুণমান যাচাই এবং হাতে তৈরি বনাম যন্ত্রে তৈরি — সব জানুন এখানে।",
      en: "Different festivals require different idols. Learn how to select the right size, verify quality, and why handmade clay idols from Bardhaman are superior to machine-made alternatives."
    },
    date: "2025-04-01",
    readTime: { bn: "৭ মিনিট পড়া", en: "7 min read" },
    category: { bn: "ক্রয় গাইড", en: "Buying Guide" }
  },
  {
    slug: "durga-puja-bulk-orders-west-bengal",
    title: {
      bn: "পশ্চিমবঙ্গের পূজা কমিটিগুলো কিভাবে মাটির মূর্তির পাইকারি অর্ডার দেয়",
      en: "How Durga Puja Committees in West Bengal Place Bulk Clay Idol Orders"
    },
    excerpt: {
      bn: "কলকাতা থেকে দুর্গাপুর — পশ্চিমবঙ্গের বড় পূজা কমিটিগুলো কীভাবে বার্ধমান থেকে মাটির মূর্তি সংগ্রহ করে? অগ্রিম বুকিং, কাস্টম সাইজ এবং নিরাপদ পরিবহনের সম্পূর্ণ প্রক্রিয়া।",
      en: "From Kolkata to Durgapur — how large puja committees across West Bengal source clay idols from Bardhaman. Complete process from advance booking and custom sizing to safe delivery."
    },
    date: "2025-04-10",
    readTime: { bn: "৯ মিনিট পড়া", en: "9 min read" },
    category: { bn: "শহর ও উৎসব", en: "Cities" }
  }
];
function getPostCategory(post) {
  const en = post.category.en;
  if (en === "Buying Guide") return "buying-guide";
  if (en === "Cities") return "cities";
  return "all";
}
function BlogListPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  reactExports.useEffect(() => {
    document.title = "Clay Idol Blog – Wholesale Buying Guides & Puja Tips | Radha Madhav Mrit Shilpalay";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Read expert guides on buying wholesale clay idols, choosing the right puja idol, and how Durga Puja committees in West Bengal place bulk orders from Bardhaman."
      );
    }
  }, []);
  const categories = [
    { label: t({ bn: "সব", en: "All" }), value: "all" },
    {
      label: t({ bn: "ক্রয় গাইড", en: "Buying Guide" }),
      value: "buying-guide"
    },
    { label: t({ bn: "শহর", en: "Cities" }), value: "cities" }
  ];
  const filtered = activeCategory === "all" ? ALL_POSTS : ALL_POSTS.filter((post) => getPostCategory(post) === activeCategory);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-secondary mb-3", children: t({ bn: "আমাদের ব্লগ", en: "Our Blog" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight", children: t({
        bn: "মাটির মূর্তি ও পূজার গাইড",
        en: "Clay Idol Guide & Blog"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed", children: t({
        bn: "পাইকারি ক্রেতা, পূজা কমিটি ও দোকানদারদের জন্য বিশেষজ্ঞ পরামর্শ এবং তথ্যমূলক নিবন্ধ।",
        en: "Expert advice and informative articles for wholesale buyers, puja committees, and shop owners."
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-b border-border py-4 sticky top-0 z-10 backdrop-blur-sm bg-background/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-2 overflow-x-auto pb-1",
        role: "tablist",
        "aria-label": t({ bn: "বিভাগ ফিল্টার", en: "Category filter" }),
        children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": activeCategory === cat.value,
            onClick: () => setActiveCategory(cat.value),
            className: `shrink-0 px-5 py-2 rounded-full text-sm font-semibold border transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeCategory === cat.value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
            "data-ocid": `blog-filter-${cat.value}`,
            children: cat.label
          },
          cat.value
        ))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-20 text-muted-foreground",
        "data-ocid": "blog-list-empty",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display", children: t({
          bn: "এই বিভাগে কোনো নিবন্ধ নেই।",
          en: "No articles in this category."
        }) })
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        "data-ocid": "blog-list-grid",
        children: filtered.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { ...post }, post.slug))
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-muted/30 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: t({
        bn: "পাইকারি মূর্তি অর্ডার দিতে চান?",
        en: "Ready to Place a Wholesale Order?"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-3", children: t({
        bn: "আজই যোগাযোগ করুন এবং বর্ধমান থেকে সারা ভারতে ডেলিভারির সুবিধা নিন।",
        en: "Contact us today and get reliable delivery from Bardhaman across India."
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-primary text-base", children: "+91 6295466310" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14", "aria-hidden": "true" })
  ] });
}
export {
  BlogListPage
};
