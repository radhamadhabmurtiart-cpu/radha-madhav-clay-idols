import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useActor, a as useQuery, b as createActor, d as useLanguage, P as Phone, M as MessageCircle, L as Link, e as MapPin, S as ShieldCheck, f as Package } from "./index-DL76Lnv-.js";
import { S as SectionHeading } from "./SectionHeading-DdTzVNnC.js";
import { C as ChevronRight } from "./chevron-right-ZWUisYEd.js";
import { C as Clock } from "./clock-Ozgl6Qtk.js";
import { T as Truck } from "./truck-CGIcDr5D.js";
import { S as Star } from "./star-D9OndiBe.js";
import { A as Award } from "./award-BzZ3EBCE.js";
import { U as Users } from "./users-PIEBVCIO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const DEFAULT_BANNERS = [
  {
    id: "default-1",
    imageUrl: "/assets/generated/banner-ganesh-workshop.dim_1400x700.jpg",
    title: "",
    displayOrder: 0n
  },
  {
    id: "default-2",
    imageUrl: "/assets/generated/banner-durga-idols.dim_1400x700.jpg",
    title: "",
    displayOrder: 1n
  },
  {
    id: "default-3",
    imageUrl: "/assets/generated/banner-lakshmi-craft.dim_1400x700.jpg",
    title: "",
    displayOrder: 2n
  },
  {
    id: "default-4",
    imageUrl: "/assets/generated/banner-idol-collection.dim_1400x700.jpg",
    title: "",
    displayOrder: 3n
  }
];
function SlidingBanner({ images }) {
  const slides = images.length > 0 ? images : DEFAULT_BANNERS;
  const [current, setCurrent] = reactExports.useState(0);
  const [fading, setFading] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const slidesLenRef = reactExports.useRef(slides.length);
  slidesLenRef.current = slides.length;
  const startTimer = reactExports.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesLenRef.current);
    }, 5e3);
  }, []);
  function goTo(index) {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 300);
  }
  function goPrev() {
    goTo((current - 1 + slides.length) % slides.length);
    startTimer();
  }
  function goNext() {
    goTo((current + 1) % slides.length);
    startTimer();
  }
  reactExports.useEffect(() => {
    if (slides.length <= 1) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length, startTimer]);
  const slide = slides[current] ?? slides[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative w-full overflow-hidden rounded-2xl shadow-lg h-[50vh] md:h-[65vh]",
      "data-ocid": "sliding-banner",
      "aria-label": "Featured banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: slide.imageUrl,
                alt: "Handcrafted clay idol by Radha Madhav Mrit Shilpalay Bardhaman",
                className: "w-full h-full object-cover",
                loading: "eager",
                onError: (e) => {
                  e.currentTarget.src = "/assets/generated/hero-clay-idols.dim_1200x600.jpg";
                }
              }
            )
          }
        ),
        slides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: goPrev,
            "aria-label": "Previous slide",
            className: "absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200",
            "data-ocid": "banner-prev-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 20 })
          }
        ),
        slides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: goNext,
            "aria-label": "Next slide",
            className: "absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-200",
            "data-ocid": "banner-next-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 20 })
          }
        ),
        slides.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20",
            role: "tablist",
            "aria-label": "Banner slides",
            children: slides.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": i === current,
                "aria-label": `Slide ${i + 1}`,
                onClick: () => {
                  goTo(i);
                  startTimer();
                },
                className: `rounded-full transition-all duration-200 ${i === current ? "w-5 h-2 bg-secondary" : "w-2 h-2 bg-white/55 hover:bg-white/80"}`,
                "data-ocid": `banner-dot-${i + 1}`
              },
              s.id
            ))
          }
        )
      ]
    }
  );
}
function TrustBadge({
  icon,
  title,
  description,
  variant = "default"
}) {
  if (variant === "compact") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-card/80 border border-border rounded-md px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary text-lg flex-shrink-0", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: title })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border shadow-sm transition-smooth hover:shadow-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mb-4 text-2xl text-secondary", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: description })
  ] });
}
const BANNER_KEYS = {
  all: ["bannerImages"]
};
function useBannerImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: BANNER_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      const images = await actor.getBannerImages();
      return [...images].sort(
        (a, b) => Number(a.displayOrder) - Number(b.displayOrder)
      );
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
}
const CATEGORY_IMAGE_KEYS = {
  all: ["categoryImages"]
};
function useCategoryImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: CATEGORY_IMAGE_KEYS.all,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryImages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1e3
    // 5 minutes — category images don't change often
  });
}
const FEATURED_KEYS = {
  products: ["featuredProducts"]
};
function useFeaturedProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: FEATURED_KEYS.products,
    queryFn: async () => {
      if (!actor) return [];
      const [featuredIds, allProducts] = await Promise.all([
        actor.getFeaturedProductIds(),
        actor.getProducts()
      ]);
      if (featuredIds.length > 0) {
        const idSet = new Set(featuredIds.map((id) => id.toString()));
        const featured = allProducts.filter((p) => idSet.has(p.id.toString()));
        if (featured.length > 0) return featured;
      }
      return allProducts.slice(0, 4);
    },
    enabled: !!actor && !isFetching,
    staleTime: 2 * 60 * 1e3
  });
}
const PHONE = "+916295466310";
const WHATSAPP_LINK = "https://wa.me/916295466310?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20clay%20idol%20orders.";
const PRODUCT_CATEGORIES = [
  {
    slug: "bangla-lakshmi-ganesh",
    path: "/bangla-lakshmi-ganesh-idol",
    emoji: "🌸",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lakshmi_and_Ganesh.jpg/640px-Lakshmi_and_Ganesh.jpg",
    name: { bn: "বাংলা লক্ষ্মী-গণেশ মূর্তি", en: "Bangla Lakshmi Ganesh Idol" }
  },
  {
    slug: "clay-ganesh-idol-wholesale",
    path: "/clay-ganesh-idol-wholesale",
    emoji: "🙏",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Clay_Ganesha.jpg/640px-Clay_Ganesha.jpg",
    name: { bn: "মাটির গণেশ মূর্তি পাইকারি", en: "Clay Ganesh Idol – Wholesale" }
  },
  {
    slug: "clay-vishwakarma-idol",
    path: "/clay-vishwakarma-idol",
    emoji: "⚙️",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vishwakarma.jpg/640px-Vishwakarma.jpg",
    name: { bn: "মাটির বিশ্বকর্মা মূর্তি", en: "Clay Vishwakarma Idol" }
  },
  {
    slug: "clay-lakshmi-idol",
    path: "/clay-lakshmi-idol",
    emoji: "🪷",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Lakshmi.jpg/640px-Lakshmi.jpg",
    name: { bn: "মাটির লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" }
  },
  {
    slug: "diwali-lakshmi-ganesh-idol",
    path: "/diwali-lakshmi-ganesh-idol",
    emoji: "🪔",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Diwali_Lakshmi-Ganesh.jpg/640px-Diwali_Lakshmi-Ganesh.jpg",
    name: { bn: "দীপাবলি লক্ষ্মী-গণেশ মূর্তি", en: "Diwali Lakshmi Ganesh Idol" }
  },
  {
    slug: "clay-kali-idol",
    path: "/clay-kali-idol",
    emoji: "🌑",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Goddess_kali_idol.jpg/640px-Goddess_kali_idol.jpg",
    name: { bn: "মাটির কালী মূর্তি", en: "Clay Kali Idol" }
  },
  {
    slug: "small-durga-idol",
    path: "/small-durga-idol",
    emoji: "🌺",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Durga_idol.jpg/640px-Durga_idol.jpg",
    name: { bn: "ছোট দুর্গা মূর্তি", en: "Small Durga Idol" }
  },
  {
    slug: "radha-krishna-clay-idol",
    path: "/radha-krishna-clay-idol",
    emoji: "💛",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Radha_Krishna.jpg/640px-Radha_Krishna.jpg",
    name: { bn: "রাধা-কৃষ্ণ মাটির মূর্তি", en: "Radha Krishna Clay Idol" }
  },
  {
    slug: "clay-kartik-idol",
    path: "/clay-kartik-idol",
    emoji: "🦚",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kartik_idol.jpg/640px-Kartik_idol.jpg",
    name: { bn: "মাটির কার্তিক মূর্তি", en: "Clay Kartik Idol" }
  },
  {
    slug: "clay-saraswati-idol",
    path: "/clay-saraswati-idol",
    emoji: "📚",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saraswati_clay_idol.jpg/640px-Saraswati_clay_idol.jpg",
    name: { bn: "মাটির সরস্বতী মূর্তি", en: "Clay Saraswati Idol" }
  },
  {
    slug: "custom-clay-idol",
    path: "/custom-clay-idol",
    emoji: "✨",
    image: "",
    name: { bn: "কাস্টম মাটির মূর্তি", en: "Custom Clay Idol" }
  }
];
const CATEGORY_SLUG_MAP = {
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
  custom: "custom-clay-idol"
};
const WHY_CHOOSE_POINTS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 26 }),
    title: { bn: "হাতে তৈরি গুণমান", en: "Handmade Quality" },
    desc: {
      bn: "প্রতিটি মূর্তি দক্ষ কারিগরদের হাতে তৈরি, সর্বোচ্চ মানের কাদামাটি ব্যবহার করে।",
      en: "Every idol crafted by skilled artisans using premium quality clay from Bardhaman."
    }
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 26 }),
    title: { bn: "পাইকারি মূল্য", en: "Wholesale Pricing" },
    desc: {
      bn: "সরাসরি প্রস্তুতকারকের কাছ থেকে পাইকারি মূল্যে ক্রয় করুন।",
      en: "Buy directly from the manufacturer at wholesale prices. No middlemen."
    }
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 26 }),
    title: { bn: "বাল্ক অর্ডার সাপোর্ট", en: "Bulk Order Support" },
    desc: {
      bn: "পূজা কমিটি, ডেকোরেটর ও দোকানদারদের জন্য বিশেষ বাল্ক অর্ডার সুবিধা।",
      en: "Special bulk order facilities for puja committees, decorators and shop owners."
    }
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 26 }),
    title: { bn: "কাস্টম ডিজাইন", en: "Custom Designs Available" },
    desc: {
      bn: "আপনার চাহিদা অনুযায়ী যেকোনো ডিজাইনের মূর্তি তৈরি করা হয়।",
      en: "We create idols in any design per your requirements. Special orders accepted."
    }
  }
];
const TRUST_BADGES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }),
    title: { bn: "বিশ্বস্ত স্থানীয় প্রস্তুতকারক", en: "Trusted Local Manufacturer" }
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 16 }),
    title: { bn: "বাল্ক অর্ডার গৃহীত", en: "Bulk Orders Accepted" }
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 16 }),
    title: { bn: "উৎসব-প্রস্তুত স্টক", en: "Festival-Ready Stock" }
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16 }),
    title: { bn: "বর্ধমানের ঐতিহ্য", en: "Bardhaman Heritage" }
  }
];
function HomePage() {
  const { t } = useLanguage();
  const { data: bannerImages = [] } = useBannerImages();
  const { data: backendCategoryImages } = useCategoryImages();
  const { data: featuredProducts = [] } = useFeaturedProducts();
  const categoryImageMap = {};
  if (backendCategoryImages) {
    for (const ci of backendCategoryImages) {
      if (ci.imageUrl) categoryImageMap[ci.slug] = ci.imageUrl;
    }
  }
  const mergedCategories = PRODUCT_CATEGORIES.map((cat) => ({
    ...cat,
    image: categoryImageMap[cat.slug] || cat.image
  }));
  reactExports.useEffect(() => {
    document.title = "Radha Madhav Mrit Shilpalay – Clay Idol Manufacturer in Bardhaman | Wholesale Supplier West Bengal";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Premium handmade clay idol manufacturer and bulk wholesaler in Bardhaman, West Bengal. Supplying Ganesh, Lakshmi, Durga, Saraswati idols to Durgapur, Asansol, Kolkata and all India. Call +91 6295466310 for bulk orders."
      );
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[92vh] sm:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden",
        "aria-label": "Hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-clay-idols.dim_1200x600.jpg",
                alt: "Handcrafted clay idols by Radha Madhav Mrit Shilpalay, Bardhaman",
                className: "w-full h-full object-cover",
                fetchPriority: "high"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.08_40/0.72)] via-[oklch(0.22_0.08_40/0.60)] to-[oklch(0.15_0.06_35/0.80)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container max-w-4xl mx-auto px-4 py-20 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 text-secondary-foreground rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13, className: "text-secondary" }),
              t({
                bn: "দুর্গাপূজার মৌসুমে সীমিত স্টক — এখনই অর্ডার করুন",
                en: "Limited seasonal stock for Durga Puja season — Order now"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-[oklch(0.97_0.04_80)] leading-tight mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-3xl sm:text-5xl lg:text-6xl", children: t({
                bn: "বর্ধমানের প্রিমিয়াম মাটির মূর্তি প্রস্তুতকারক",
                en: "Premium Clay Idol Manufacturer in Bardhaman"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-lg sm:text-2xl lg:text-3xl mt-2 text-secondary font-semibold", children: t({
                bn: "মাটির মূর্তি প্রস্তুতকারক | পাইকারি বিক্রেতা",
                en: "Clay Idol Manufacturer & Wholesaler"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.90_0.03_75)] text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mt-4 mb-8 leading-relaxed", children: t({
              bn: "গণেশ, লক্ষ্মী, দুর্গা ও কাস্টম মাটির মূর্তি পাইকারি মূল্যে। পূজা কমিটি, সাজসজ্জাকারী ও দোকানদারদের জন্য বিশেষ সুবিধা।",
              en: "Wholesale clay Ganesh, Lakshmi, Durga & custom idols. Special B2B pricing for puja committees, decorators and shop owners."
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${PHONE}`,
                  className: "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-smooth px-7 py-3.5 rounded-full text-base font-bold shadow-lg",
                  "data-ocid": "hero-call-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
                    t({ bn: "এখনই কল করুন", en: "Call Now" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: WHATSAPP_LINK,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-95 transition-smooth px-7 py-3.5 rounded-full text-base font-bold shadow-lg",
                  "data-ocid": "hero-whatsapp-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
                    t({ bn: "হোয়াটসঅ্যাপ ইনকোয়ারি", en: "WhatsApp Inquiry" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mt-5 flex justify-center",
                "data-ocid": "hero-delivery-badge",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 bg-[oklch(0.20_0.06_40/0.55)] border border-secondary/50 text-[oklch(0.97_0.04_80)] rounded-full px-5 py-2 text-sm font-semibold backdrop-blur-sm shadow", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 15, className: "text-secondary flex-shrink-0" }),
                  t({
                    bn: "🇮🇳 সারা ভারতে ডেলিভারি উপলব্ধ — নিরাপদ প্যাকিং সহ",
                    en: "🇮🇳 All India Delivery Available — Safe & Secure Packing"
                  })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-3 justify-center", children: TRUST_BADGES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 text-xs font-medium text-[oklch(0.95_0.03_80)] bg-[oklch(0.15_0.04_40/0.45)] border border-[oklch(0.85_0.04_75/0.25)] rounded-full px-3 py-1 backdrop-blur-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: b.icon }),
                  t(b.title)
                ]
              },
              b.title.en
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              viewBox: "0 0 1440 60",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "w-full",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 27.5C672 35 768 40 864 37.5C960 35 1056 25 1152 20C1248 15 1344 15 1392 15L1440 15V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z",
                  fill: "oklch(0.97 0.04 80)"
                }
              )
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-6 bg-[oklch(0.97_0.04_80)]",
        "aria-label": "Featured banner",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidingBanner, { images: bannerImages }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-muted/30",
        "aria-labelledby": "featured-products-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              title: { bn: "বিশেষ পণ্য সংগ্রহ", en: "Featured Products" },
              subtitle: {
                bn: "পাইকারি মূল্যে হাতে তৈরি মাটির মূর্তির বিশেষ সংগ্রহ",
                en: "Handpicked clay idol collections at wholesale prices"
              },
              className: "mb-8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 gap-4 sm:gap-6",
              "data-ocid": "featured-products-grid",
              children: featuredProducts.length === 0 ? [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card rounded-xl border border-border overflow-hidden animate-pulse",
                  "data-ocid": `featured-product-skeleton.${i}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-muted" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-3/4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-1/2" })
                    ] })
                  ]
                },
                i
              )) : featuredProducts.map((product, idx) => {
                const catSlug = CATEGORY_SLUG_MAP[product.category] ?? "custom-clay-idol";
                const catEntry = PRODUCT_CATEGORIES.find(
                  (c) => c.slug === catSlug
                );
                const firstImageId = product.imageIds.find(
                  (id) => id.trim() !== ""
                );
                const imageSrc = firstImageId || (catEntry == null ? void 0 : catEntry.image) || "/assets/generated/hero-clay-idols.dim_1200x600.jpg";
                const hasRealImage = Boolean(firstImageId);
                const priceLabel = product.priceRangeMin > 0n ? `₹${product.priceRangeMin.toString()} – ₹${product.priceRangeMax.toString()}` : null;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/products/$productId",
                    params: { productId: product.id.toString() },
                    className: "group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col",
                    "data-ocid": `featured-product.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[4/3] bg-muted", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: imageSrc,
                            alt: `${product.nameEn} - clay idol wholesale Bardhaman`,
                            className: `w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${hasRealImage ? "" : "opacity-80"}`,
                            loading: "lazy",
                            onError: (e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextElementSibling;
                              if (fallback) fallback.classList.remove("hidden");
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden absolute inset-0 flex flex-col items-center justify-center bg-primary/5 gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🏺" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: product.nameEn })
                        ] }),
                        product.bulkAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full", children: t({ bn: "পাইকারি", en: "Wholesale" }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4 flex flex-col flex-1 gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-tight line-clamp-2", children: product.nameBn }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none", children: product.nameEn }),
                        priceLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mt-1", children: priceLabel }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200 pt-1", children: [
                          t({ bn: "বিস্তারিত দেখুন", en: "View Details" }),
                          " →"
                        ] })
                      ] })
                    ]
                  },
                  product.id.toString()
                );
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "inline-flex items-center gap-2 btn-primary rounded-full px-8 py-3.5",
              "data-ocid": "view-all-products-btn",
              children: t({ bn: "সমস্ত পণ্য দেখুন", en: "View All Products" })
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-amber-50/60 border-y border-amber-200/50",
        "aria-labelledby": "categories-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              title: { bn: "আমাদের পণ্য বিভাগ", en: "Our Product Categories" },
              subtitle: {
                bn: "পাইকারি অর্ডারের জন্য বিভাগ বেছে নিন",
                en: "Choose a category for wholesale orders"
              },
              className: "mb-8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5",
              "data-ocid": "categories-grid",
              children: mergedCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: cat.path,
                  className: "group bg-card border border-amber-200/60 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col",
                  "data-ocid": `category-card-${cat.slug}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden aspect-[4/3] bg-muted", children: cat.image ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: cat.image,
                          alt: `${cat.name.en} - clay idol wholesale by Radha Madhav Mrit Shilpalay`,
                          className: "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
                          loading: "lazy",
                          onError: (e) => {
                            const img = e.currentTarget;
                            img.style.display = "none";
                            const fb = img.nextElementSibling;
                            if (fb) fb.style.display = "flex";
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 flex-col items-center justify-center gap-2 bg-muted hidden",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: cat.emoji })
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: cat.emoji }) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4 flex flex-col flex-1 gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs sm:text-sm leading-tight line-clamp-2", children: cat.name.bn }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none", children: cat.name.en }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all duration-200 pt-1", children: [
                        t({ bn: "বিস্তারিত দেখুন", en: "View Details" }),
                        " →"
                      ] })
                    ] })
                  ]
                },
                cat.slug
              ))
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-background",
        "aria-labelledby": "why-choose-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              title: { bn: "কেন আমাদের বেছে নেবেন?", en: "Why Choose Us?" },
              subtitle: {
                bn: "বর্ধমানের সেরা মাটির মূর্তি প্রস্তুতকারক হিসেবে আমরা গর্বিত।",
                en: "Proud to be the most trusted clay idol manufacturer in Bardhaman, West Bengal."
              },
              className: "mb-10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: WHY_CHOOSE_POINTS.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustBadge,
            {
              icon: point.icon,
              title: t(point.title),
              description: t(point.desc)
            },
            point.title.en
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-primary/5 border-y border-border",
        "aria-labelledby": "trust-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-secondary mb-2", children: t({ bn: "বিশ্বাস ও মান", en: "Trust & Quality" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-sm text-foreground", children: t({
              bn: "পশ্চিমবঙ্গ জুড়ে বিশ্বস্ত",
              en: "Trusted Across West Bengal"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8", children: TRUST_BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustBadge,
            {
              icon: badge.icon,
              title: t(badge.title),
              variant: "compact"
            },
            badge.title.en
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
            {
              name: "Subrata Ghosh",
              role: {
                bn: "পূজা কমিটি সভাপতি, বর্ধমান",
                en: "Puja Committee President, Bardhaman"
              },
              text: {
                bn: "প্রশান্ত পালের কাছ থেকে গত ৫ বছর ধরে দুর্গা মূর্তি কিনছি। অসাধারণ কারিগরি এবং সময়মতো ডেলিভারি।",
                en: "Buying Durga idols from Prashant Pal for 5 years. Exceptional craftsmanship and on-time delivery."
              }
            },
            {
              name: "Rajesh Kumar",
              role: {
                bn: "মূর্তির পাইকারি বিক্রেতা, কলকাতা",
                en: "Idol Wholesale Dealer, Kolkata"
              },
              text: {
                bn: "সেরা পাইকারি মূল্যে উচ্চমানের মাটির মূর্তি পাওয়া যায়।",
                en: "Best wholesale pricing on high-quality clay idols. All my customers are impressed."
              }
            },
            {
              name: "Anita Das",
              role: { bn: "ডেকোরেটর, দুর্গাপুর", en: "Decorator, Durgapur" },
              text: {
                bn: "কাস্টম ডিজাইনের মূর্তি তৈরিতে এদের জুড়ি নেই। দ্রুত কাজ এবং নিখুঁত ফিনিশিং।",
                en: "No match for custom design idol creation. Fast work and flawless finishing every time."
              }
            }
          ].map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-xl border border-border p-5 shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-3", children: ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    size: 13,
                    className: "fill-secondary text-secondary"
                  },
                  k
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4 italic", children: [
                  '"',
                  t(review.text),
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: review.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t(review.role) })
                ] })
              ]
            },
            review.name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 bg-muted/20",
        "aria-labelledby": "seo-content-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "seo-content-heading",
              className: "text-display-sm text-foreground mb-4",
              children: t({
                bn: "বর্ধমানে মাটির মূর্তির পাইকারি বিক্রেতা",
                en: "Clay Idol Wholesale Supplier in Bardhaman, West Bengal"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto", children: t({
            bn: "রাধা মাধব মৃৎ শিল্পালয় — বর্ধমানের সেরা মাটির মূর্তি প্রস্তুতকারক। গণেশ মূর্তি পাইকারি, লক্ষ্মী মূর্তি সরবরাহ, দুর্গা প্রতিমা পাইকারি — সমস্ত উৎসবের জন্য মাটির মূর্তি সরাসরি প্রস্তুতকারকের কাছ থেকে।",
            en: "Radha Madhav Mrit Shilpalay — the premier clay idol manufacturer in Bardhaman. Ganesh idol wholesale, Lakshmi idol supplier, Durga idol wholesale — handmade clay idols for all festivals directly from the manufacturer. Serving retail shops, puja committees, decorators and wholesale buyers across West Bengal and India."
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-16 bg-primary relative overflow-hidden",
        "aria-labelledby": "contact-cta-heading",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 bg-primary-foreground",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-10 bg-primary-foreground",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container max-w-4xl mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3", children: t({ bn: "যোগাযোগ করুন", en: "Get In Touch" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "contact-cta-heading",
                className: "text-display-md text-primary-foreground mb-4",
                children: t({
                  bn: "পাইকারি অর্ডারের জন্য আজই যোগাযোগ করুন",
                  en: "Contact Us Today for Bulk Orders"
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-base sm:text-lg mb-8 max-w-xl mx-auto", children: t({
              bn: "দুর্গাপূজা, দীপাবলি ও অন্যান্য উৎসবের জন্য এখনই বুকিং দিন। সীমিত মৌসুমী স্টক।",
              en: "Book now for Durga Puja, Diwali and other festivals. Limited seasonal stock available."
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${PHONE}`,
                  className: "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary-foreground text-primary hover:bg-primary-foreground/90 active:scale-95 transition-smooth px-8 py-3.5 rounded-full text-base font-bold shadow-lg",
                  "data-ocid": "cta-call-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
                    t({ bn: "+৯১ ৬২৯৫৪৬৬৩১০", en: "+91 6295466310" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: WHATSAPP_LINK,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-95 transition-smooth px-8 py-3.5 rounded-full text-base font-bold shadow-lg",
                  "data-ocid": "cta-whatsapp-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
                    t({ bn: "হোয়াটসঅ্যাপ ইনকোয়ারি", en: "WhatsApp Inquiry" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-primary-foreground/70 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mirchoba, Palpara, Chhotonilpur, Bardhaman, West Bengal – 713103" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-background", "aria-labelledby": "about-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeading,
          {
            title: { bn: "আমাদের সম্পর্কে", en: "About Our Business" },
            centered: false,
            className: "mb-6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-base leading-relaxed mb-4", children: t({
          bn: "রাধা মাধব মৃৎ শিল্পালয় হল বর্ধমানের মির্চোবা পালপাড়ায় একটি ঐতিহ্যবাহী মাটির মূর্তি প্রস্তুতকারী প্রতিষ্ঠান। প্রশান্ত পালের নেতৃত্বে আমরা বছরের পর বছর ধরে সর্বোচ্চ মানের হাতে তৈরি মাটির মূর্তি তৈরি করে আসছি।",
          en: "Radha Madhav Mrit Shilpalay is a traditional clay idol manufacturing establishment in Mirchoba, Palpara, Bardhaman. Led by Prashant Pal, we have been crafting the finest handmade clay idols for years."
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed mb-6", children: t({
          bn: "আমাদের দক্ষ কারিগররা প্রতিটি মূর্তিতে ঐতিহ্যবাহী শিল্পকলার ছাপ রাখেন। বর্ধমানের সমৃদ্ধ মৃৎশিল্পের ঐতিহ্য বহন করে আমরা পশ্চিমবঙ্গ ও সারা ভারতে পাইকারি মূল্যে মূর্তি সরবরাহ করি।",
          en: "Our skilled artisans imprint traditional craftsmanship in every idol. Carrying forward the rich pottery heritage of Bardhaman, we supply idols at wholesale prices across West Bengal and all of India."
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [
          {
            value: "15+",
            label: { bn: "বছরের অভিজ্ঞতা", en: "Years Experience" }
          },
          {
            value: "500+",
            label: { bn: "সন্তুষ্ট ক্লায়েন্ট", en: "Happy Clients" }
          },
          {
            value: "50+",
            label: { bn: "মূর্তির ডিজাইন", en: "Idol Designs" }
          },
          {
            value: "10K+",
            label: { bn: "বার্ষিক অর্ডার", en: "Annual Orders" }
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-lg border border-border p-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-primary", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: t(stat.label) })
            ]
          },
          stat.value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapPin,
            {
              size: 15,
              className: "text-secondary mt-0.5 flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mirchoba, Palpara, Chhotonilpur, Bardhaman, West Bengal – 713103" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden shadow-lg border border-border aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-clay-idols.dim_1200x600.jpg",
            alt: "Traditional clay idol workshop at Radha Madhav Mrit Shilpalay Bardhaman",
            className: "w-full h-full object-cover",
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -left-4 bg-card border border-border rounded-xl shadow-lg px-4 py-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏺" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: t({
              bn: "ঐতিহ্যবাহী শিল্পকলা",
              en: "Traditional Craftsmanship"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Bardhaman, West Bengal" })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14", "aria-hidden": "true" })
  ] });
}
export {
  HomePage
};
