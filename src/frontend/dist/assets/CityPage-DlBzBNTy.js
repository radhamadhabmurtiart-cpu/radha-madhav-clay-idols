import { d as useLanguage, r as reactExports, j as jsxRuntimeExports, f as Package, e as MapPin, L as Link } from "./index-DIjz4Rf9.js";
import { B as Breadcrumb } from "./Breadcrumb-C-JiPx-9.js";
import { S as SectionHeading } from "./SectionHeading-CY8c3o4y.js";
import { T as Truck } from "./truck-CXxK-B1i.js";
const CITY_PRODUCT_CATEGORIES = [
  {
    slug: "bangla-lakshmi-ganesh",
    path: "/bangla-lakshmi-ganesh-idol-hal-khata",
    emoji: "🌸",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lakshmi_and_Ganesh.jpg/640px-Lakshmi_and_Ganesh.jpg",
    name: { bn: "বাংলা লক্ষ্মী-গণেশ মূর্তি", en: "Bangla Lakshmi Ganesh Idol" },
    desc: {
      bn: "হাল খাতা ও পয়লা বৈশাখের জন্য বিশেষ মূর্তি।",
      en: "Special idols for Hal Khata & Poila Boishakh."
    }
  },
  {
    slug: "clay-ganesh-idol-wholesale",
    path: "/clay-ganesh-idol-wholesale",
    emoji: "🙏",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Clay_Ganesha.jpg/640px-Clay_Ganesha.jpg",
    name: { bn: "মাটির গণেশ মূর্তি পাইকারি", en: "Clay Ganesh Idol – Wholesale" },
    desc: {
      bn: "গণেশ পূজার জন্য হাতে তৈরি মূর্তি।",
      en: "Handmade idols for Ganesh Puja wholesale."
    }
  },
  {
    slug: "clay-vishwakarma-idol",
    path: "/clay-vishwakarma-idol",
    emoji: "⚙️",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vishwakarma.jpg/640px-Vishwakarma.jpg",
    name: { bn: "মাটির বিশ্বকর্মা মূর্তি", en: "Clay Vishwakarma Idol" },
    desc: {
      bn: "বিশ্বকর্মা পূজার জন্য পাইকারি মূল্যে।",
      en: "Wholesale Vishwakarma idols for puja."
    }
  },
  {
    slug: "clay-lakshmi-idol",
    path: "/clay-lakshmi-idol",
    emoji: "🪷",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Lakshmi.jpg/640px-Lakshmi.jpg",
    name: { bn: "মাটির লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" },
    desc: {
      bn: "লক্ষ্মী পূজার জন্য সেরা বিকল্প।",
      en: "The finest choice for Lakshmi Puja."
    }
  },
  {
    slug: "diwali-lakshmi-ganesh-idol",
    path: "/diwali-lakshmi-ganesh-idol",
    emoji: "🪔",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Diwali_Lakshmi-Ganesh.jpg/640px-Diwali_Lakshmi-Ganesh.jpg",
    name: { bn: "দীপাবলি লক্ষ্মী-গণেশ মূর্তি", en: "Diwali Lakshmi Ganesh Idol" },
    desc: {
      bn: "দীপাবলির জন্য বিশেষ মাটির মূর্তি।",
      en: "Special clay idols for Diwali."
    }
  },
  {
    slug: "clay-kali-idol",
    path: "/clay-kali-idol",
    emoji: "🌑",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Goddess_kali_idol.jpg/640px-Goddess_kali_idol.jpg",
    name: { bn: "মাটির কালী মূর্তি", en: "Clay Kali Idol" },
    desc: {
      bn: "কালী পূজার জন্য হাতে তৈরি মূর্তি।",
      en: "Handcrafted Kali idols for Kali Puja."
    }
  },
  {
    slug: "small-durga-idol",
    path: "/small-durga-idol",
    emoji: "🌺",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Durga_idol.jpg/640px-Durga_idol.jpg",
    name: { bn: "ছোট দুর্গা মূর্তি", en: "Small Durga Idol" },
    desc: {
      bn: "দুর্গাপূজার জন্য ছোট মাটির প্রতিমা।",
      en: "Small Durga idols for Durga Puja."
    }
  },
  {
    slug: "radha-krishna-clay-idol",
    path: "/radha-krishna-clay-idol",
    emoji: "💛",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Radha_Krishna.jpg/640px-Radha_Krishna.jpg",
    name: { bn: "রাধা-কৃষ্ণ মাটির মূর্তি", en: "Radha Krishna Clay Idol" },
    desc: {
      bn: "জন্মাষ্টমীর জন্য রাধা-কৃষ্ণ মূর্তি।",
      en: "Radha Krishna idols for Janmashtami."
    }
  },
  {
    slug: "clay-kartik-idol",
    path: "/clay-kartik-idol",
    emoji: "🦚",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kartik_idol.jpg/640px-Kartik_idol.jpg",
    name: { bn: "মাটির কার্তিক মূর্তি", en: "Clay Kartik Idol" },
    desc: {
      bn: "কার্তিক পূজার জন্য মাটির মূর্তি।",
      en: "Clay Kartik idols for Kartik Puja."
    }
  },
  {
    slug: "clay-saraswati-idol",
    path: "/clay-saraswati-idol",
    emoji: "📚",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saraswati_clay_idol.jpg/640px-Saraswati_clay_idol.jpg",
    name: { bn: "মাটির সরস্বতী মূর্তি", en: "Clay Saraswati Idol" },
    desc: {
      bn: "সরস্বতী পূজার জন্য হাতে তৈরি মূর্তি।",
      en: "Handmade Saraswati idols for puja."
    }
  },
  {
    slug: "custom-clay-idol",
    path: "/custom-clay-idol",
    emoji: "✨",
    image: "",
    name: { bn: "কাস্টম মাটির মূর্তি", en: "Custom Clay Idol" },
    desc: {
      bn: "যেকোনো ডিজাইনে কাস্টম মূর্তি তৈরি।",
      en: "Custom idols in any design or size."
    }
  }
];
function CityPage({
  citySlug,
  cityName,
  headline,
  subheadline,
  localKeywords,
  logisticsDescription,
  contentParagraphs,
  nearbyCities,
  heroImage = "/assets/generated/hero-clay-idols.dim_1200x600.jpg"
}) {
  const { t } = useLanguage();
  reactExports.useEffect(() => {
    const schemaId = `city-page-jsonld-${citySlug}`;
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();
    const cityEnName = cityName.en;
    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Radha Madhav Mrit Shilpalay",
        image: "https://radhamadhavmritshilpalay.in/assets/generated/hero-clay-idols.dim_1200x600.jpg",
        "@id": "https://radhamadhavmritshilpalay.in",
        url: "https://radhamadhavmritshilpalay.in",
        telephone: "+916295466310",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mirchoba, Palpara, Chhotonilpur",
          addressLocality: "Bardhaman",
          addressRegion: "West Bengal",
          postalCode: "713103",
          addressCountry: "IN"
        },
        description: `Clay idol manufacturer and wholesaler in Bardhaman supplying handmade clay idols to ${cityEnName} and nearby areas.`,
        priceRange: "₹₹"
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Clay Idol Supply to ${cityEnName}`,
        provider: {
          "@type": "LocalBusiness",
          name: "Radha Madhav Mrit Shilpalay"
        },
        areaServed: {
          "@type": "City",
          name: cityEnName
        },
        description: logisticsDescription.en
      }
    ];
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [citySlug, cityName.en, logisticsDescription.en]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 sm:py-28 flex flex-col justify-center overflow-hidden",
        "aria-label": `Clay idol supply in ${cityName.en}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: heroImage,
                alt: `Clay idols supplied to ${cityName.en} from Bardhaman`,
                className: "w-full h-full object-cover",
                fetchPriority: "high"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.08_40/0.78)] via-[oklch(0.22_0.08_40/0.65)] to-[oklch(0.15_0.06_35/0.85)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 container max-w-4xl mx-auto px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Breadcrumb,
              {
                items: [{ label: "Cities", href: "/" }, { label: cityName.en }],
                className: "mb-6 text-[oklch(0.85_0.03_75)]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-[oklch(0.97_0.04_80)] leading-tight mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-3xl sm:text-5xl", children: t(headline) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-lg sm:text-2xl mt-2 text-secondary font-semibold", children: t(subheadline) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.90_0.03_75)] text-sm sm:text-base max-w-2xl mt-4 mb-8 leading-relaxed", children: t(logisticsDescription) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              viewBox: "0 0 1440 48",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "w-full",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M0 48L48 40C96 32 192 16 288 12C384 8 480 16 576 22C672 28 768 32 864 30C960 28 1056 20 1152 16C1248 12 1344 12 1392 12L1440 12V48H0Z",
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
        className: "py-14 bg-background",
        "aria-labelledby": `city-content-${citySlug}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              title: {
                bn: `${cityName.bn}-তে মাটির মূর্তি সরবরাহ`,
                en: `Clay Idol Supply in ${cityName.en}`
              },
              centered: false,
              className: "mb-8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: contentParagraphs.map((para, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-foreground text-base leading-relaxed",
              children: t(para)
            },
            `para-${idx}-${para.en.slice(0, 20)}`
          )) }),
          localKeywords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: localKeywords.map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1",
              children: kw
            },
            kw
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-muted/30 border-y border-border",
        "aria-label": "Logistics",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: [
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 26, className: "text-primary" }),
            title: {
              bn: "সারা ভারতে ডেলিভারি",
              en: "All India Delivery Available"
            },
            desc: {
              bn: "আমরা পশ্চিমবঙ্গ সহ সারা ভারতে মূর্তি পাঠাই।",
              en: "We ship idols across West Bengal and all of India."
            }
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 26, className: "text-secondary" }),
            title: {
              bn: "নিরাপদ প্যাকিং",
              en: "Safe Packaging for Clay Idols"
            },
            desc: {
              bn: "মাটির মূর্তির জন্য বিশেষ সুরক্ষা প্যাকিং নিশ্চিত করা হয়।",
              en: "Special protective packaging ensures idols arrive intact."
            }
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 26, className: "text-accent" }),
            title: {
              bn: "পাইকারি মূল্যে বাল্ক অর্ডার",
              en: "Bulk Orders at Wholesale Price"
            },
            desc: {
              bn: "বড় অর্ডারে বিশেষ ছাড় ও পরিবহন সুবিধা পাওয়া যায়।",
              en: "Special discounts and transport support for bulk orders."
            }
          }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card rounded-xl border border-border p-5 flex gap-4 items-start shadow-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 shrink-0", children: item.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground mb-1", children: t(item.title) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: t(item.desc) })
              ] })
            ]
          },
          item.title.en
        )) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-amber-50/60 border-b border-amber-200/50",
        "aria-labelledby": `categories-${citySlug}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              title: { bn: "আমাদের পণ্য বিভাগ", en: "Our Product Categories" },
              subtitle: {
                bn: "পাইকারি অর্ডারের জন্য বিভাগ বেছে নিন",
                en: "Choose a category for wholesale orders"
              },
              className: "mb-10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
              "data-ocid": `categories-grid-${citySlug}`,
              children: CITY_PRODUCT_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                          alt: `${cat.name.en} - clay idol wholesale Bardhaman`,
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
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4 flex flex-col flex-1 gap-1.5", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-sm text-foreground mb-3", children: t({
        bn: "আমাদের মূর্তির সংগ্রহ দেখুন",
        en: "Explore Our Idol Collections"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-6 max-w-xl mx-auto", children: t({
        bn: "গণেশ, লক্ষ্মী, দুর্গা, সরস্বতী ও কাস্টম মাটির মূর্তি পাইকারি মূল্যে।",
        en: "Ganesh, Lakshmi, Durga, Saraswati & custom clay idols at wholesale prices."
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products",
          className: "inline-flex items-center gap-2 btn-primary rounded-full px-8 py-3.5",
          "data-ocid": "city-view-products-btn",
          children: t({ bn: "সমস্ত পণ্য দেখুন", en: "View All Products" })
        }
      )
    ] }) }),
    nearbyCities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-muted/20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-secondary mb-4 text-center", children: t({ bn: "আরও শহরে সরবরাহ", en: "We Also Supply To" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap justify-center gap-3",
          "data-ocid": "nearby-cities-list",
          children: nearbyCities.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: `/cities/${city.slug}`,
              className: "text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 rounded-full px-4 py-1.5 transition-smooth bg-card",
              "data-ocid": `nearby-city-${city.slug}`,
              children: t(city.name)
            },
            city.slug
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14", "aria-hidden": "true" })
  ] });
}
export {
  CityPage as C
};
