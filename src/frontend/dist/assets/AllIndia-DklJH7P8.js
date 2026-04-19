import { c as createLucideIcon, d as useLanguage, r as reactExports, j as jsxRuntimeExports, G as Globe, P as Phone, M as MessageCircle, e as MapPin, f as Package, L as Link } from "./index-DL76Lnv-.js";
import { B as Breadcrumb } from "./Breadcrumb-D0RxylH5.js";
import { S as SectionHeading } from "./SectionHeading-DdTzVNnC.js";
import { T as Truck } from "./truck-CGIcDr5D.js";
import "./house-D6GkxEq-.js";
import "./chevron-right-ZWUisYEd.js";
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const PHONE = "+916295466310";
const WHATSAPP_LINK = "https://wa.me/916295466310?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20all-India%20bulk%20clay%20idol%20orders.";
const METRO_CITIES = [
  {
    name: { bn: "দিল্লি", en: "Delhi" },
    detail: {
      bn: "বাঙালি সমাজ ও পূজা কমিটি",
      en: "Bengali Associations & Puja Committees"
    }
  },
  {
    name: { bn: "মুম্বাই", en: "Mumbai" },
    detail: {
      bn: "মহারাষ্ট্রের বাঙালি সম্প্রদায়",
      en: "Bengali Community in Maharashtra"
    }
  },
  {
    name: { bn: "ব্যাঙ্গালোর", en: "Bangalore" },
    detail: {
      bn: "কর্ণাটকের বাঙালি পূজা সমিতি",
      en: "Bengali Puja Samiti in Karnataka"
    }
  },
  {
    name: { bn: "চেন্নাই", en: "Chennai" },
    detail: {
      bn: "তামিলনাড়ুর বাঙালি অ্যাসোসিয়েশন",
      en: "Bengali Association Tamil Nadu"
    }
  },
  {
    name: { bn: "হায়দ্রাবাদ", en: "Hyderabad" },
    detail: {
      bn: "তেলেঙ্গানায় দুর্গাপূজা সমিতি",
      en: "Durga Puja Samiti in Telangana"
    }
  },
  {
    name: { bn: "আহমেদাবাদ", en: "Ahmedabad" },
    detail: {
      bn: "গুজরাটে গণেশ চতুর্থী ও পূজা",
      en: "Ganesh Chaturthi & Puja in Gujarat"
    }
  },
  {
    name: { bn: "পুণে", en: "Pune" },
    detail: {
      bn: "মহারাষ্ট্রের বাঙালি সংঘ",
      en: "Bengali Sangha in Maharashtra"
    }
  }
];
const ALL_STATE_CITIES = [
  { name: { bn: "বর্ধমান", en: "Bardhaman" }, slug: "bardhaman" },
  { name: { bn: "দুর্গাপুর", en: "Durgapur" }, slug: "durgapur" },
  { name: { bn: "আসানসোল", en: "Asansol" }, slug: "asansol" },
  { name: { bn: "বাঁকুড়া", en: "Bankura" }, slug: "bankura" },
  { name: { bn: "পুরুলিয়া", en: "Purulia" }, slug: "purulia" },
  { name: { bn: "ধানবাদ", en: "Dhanbad" }, slug: "dhanbad" },
  { name: { bn: "কলকাতা", en: "Kolkata" }, slug: "kolkata" }
];
function CityAllIndiaPage() {
  const { t } = useLanguage();
  reactExports.useEffect(() => {
    document.title = "Clay Idol Wholesale Supplier All India | সারা ভারতে মাটির মূর্তি পাইকারি – Radha Madhav Shilpalay";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Pan-India clay idol wholesale supplier from Bardhaman, West Bengal. Handmade Ganesh, Durga, Lakshmi idols shipped to Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Ahmedabad, Pune and all states. Bengali diaspora puja committees, Ganesh Chaturthi, Diwali orders accepted. Call +91 6295466310."
      );
    }
  }, []);
  reactExports.useEffect(() => {
    const schemaId = "all-india-jsonld";
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();
    const schemas = [
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
        description: "Pan-India clay idol manufacturer and wholesaler based in Bardhaman, West Bengal. Supplying handmade Durga, Ganesh, Lakshmi, Saraswati, Kali and Hanuman idols across India for Bengali diaspora communities, puja committees, and temple trusts.",
        priceRange: "₹₹",
        areaServed: {
          "@type": "Country",
          name: "India"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Pan-India Clay Idol Wholesale Supply",
        provider: {
          "@type": "LocalBusiness",
          name: "Radha Madhav Mrit Shilpalay"
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "City", name: "Delhi" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Bangalore" },
          { "@type": "City", name: "Chennai" },
          { "@type": "City", name: "Hyderabad" },
          { "@type": "City", name: "Ahmedabad" },
          { "@type": "City", name: "Pune" },
          { "@type": "City", name: "Kolkata" }
        ],
        description: "Wholesale supply of handmade clay idols across all Indian states. Safe packaging, railway parcel and road transport options available for long-distance delivery."
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do you deliver clay idols across India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We ship clay idols from Bardhaman, West Bengal to any state in India by railway parcel or road transport courier. Safe protective packaging ensures idols arrive intact."
            }
          },
          {
            "@type": "Question",
            name: "What is the minimum order for all-India delivery?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Minimum order quantities vary by idol type and size. Contact us on WhatsApp or phone to discuss your requirements and get a custom quotation including shipping charges."
            }
          },
          {
            "@type": "Question",
            name: "How early should I place an order for Durga Puja?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For pan-India delivery, we recommend placing orders at least 45–60 days before your puja date to ensure stock availability and timely delivery."
            }
          },
          {
            "@type": "Question",
            name: "Do you supply idols for Ganesh Chaturthi outside West Bengal?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We supply Ganesh idols for Ganesh Chaturthi celebrations in Maharashtra, Gujarat, Karnataka, Tamil Nadu and other states. Bulk orders accepted for community associations."
            }
          }
        ]
      }
    ];
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 sm:py-28 flex flex-col justify-center overflow-hidden",
        "aria-label": "All India clay idol wholesale supply",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-clay-idols.dim_1200x600.jpg",
                alt: "Handmade clay idols shipped across India from Bardhaman",
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
                items: [
                  { label: "Cities", href: "/" },
                  { label: "All India Delivery" }
                ],
                className: "mb-6 text-[oklch(0.85_0.03_75)]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 rounded-full px-4 py-1.5 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14, className: "text-secondary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-secondary uppercase tracking-widest", children: t({ bn: "সারা ভারতে সরবরাহ", en: "Pan-India Delivery" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-[oklch(0.97_0.04_80)] leading-tight mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-3xl sm:text-5xl", children: t({
                bn: "সারা ভারতে মাটির মূর্তির পাইকারি সরবরাহ",
                en: "Wholesale Clay Idol Supply Across All India"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-lg sm:text-2xl mt-2 text-secondary font-semibold", children: t({
                bn: "বর্ধমান থেকে দিল্লি, মুম্বাই, ব্যাঙ্গালোর সহ সব রাজ্যে",
                en: "From Bardhaman to Delhi, Mumbai, Bangalore & All States"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[oklch(0.90_0.03_75)] text-sm sm:text-base max-w-2xl mt-4 mb-8 leading-relaxed", children: t({
              bn: "বর্ধমান থেকে ভারতের যেকোনো রাজ্যে রেলপথ বা রোড ট্রান্সপোর্টে মাটির মূর্তি পাঠানো হয়। নিরাপদ প্যাকিং নিশ্চিত।",
              en: "Clay idols are shipped from Bardhaman to any state in India by railway parcel or road transport. Safe packaging guaranteed."
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${PHONE}`,
                  className: "inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-smooth px-7 py-3.5 rounded-full text-base font-bold shadow-lg",
                  "data-ocid": "all-india-hero-call-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 17 }),
                    t({ bn: "এখনই কল করুন", en: "Call for Pan-India Order" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: WHATSAPP_LINK,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-95 transition-smooth px-7 py-3.5 rounded-full text-base font-bold shadow-lg",
                  "data-ocid": "all-india-hero-whatsapp-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 17 }),
                    t({ bn: "হোয়াটসঅ্যাপ ইনকোয়ারি", en: "WhatsApp Inquiry" })
                  ]
                }
              )
            ] })
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
        "aria-labelledby": "all-india-content",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeading,
            {
              title: {
                bn: "সারা ভারতে বাঙালি সম্প্রদায়ের পূজায় মাটির মূর্তি",
                en: "Clay Idols for Bengali Diaspora Celebrations Across India"
              },
              centered: false,
              className: "mb-8"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-base leading-relaxed", children: t({
              bn: "ভারতের বিভিন্ন রাজ্যে ছড়িয়ে থাকা বাঙালি সম্প্রদায় প্রতি বছর দুর্গাপূজা, লক্ষ্মীপূজা, কালীপূজা, সরস্বতীপূজা সহ নানা উৎসব পালন করে। দিল্লি থেকে চেন্নাই, মুম্বাই থেকে হায়দ্রাবাদ — প্রতিটি শহরে বাঙালি অ্যাসোসিয়েশন ও পূজা কমিটিগুলো বর্ধমানের হাতে তৈরি মাটির মূর্তির খোঁজ করে। রাধা মাধব মৃৎ শিল্পালয় এই চাহিদা পূরণ করে সরাসরি নির্মাতার দরে।",
              en: "Bengali communities spread across different states of India celebrate Durga Puja, Lakshmi Puja, Kali Puja, Saraswati Puja and many other festivals every year. From Delhi to Chennai, Mumbai to Hyderabad — Bengali associations and puja committees in every city look for handmade clay idols from Bardhaman. Radha Madhav Mrit Shilpalay fulfils this demand at direct manufacturer prices."
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-base leading-relaxed", children: t({
              bn: "মহারাষ্ট্র ও গুজরাটে গণেশ চতুর্থী উপলক্ষে গণেশ মূর্তির ব্যাপক চাহিদা থাকে। কর্ণাটক, তামিলনাড়ু ও তেলেঙ্গানায় বাঙালি সমাজ দুর্গাপূজার জন্য বিশেষ মূর্তি সংগ্রহ করে। আমরা এই সব রাজ্যে রেলওয়ে পার্সেল ও রোড ট্রান্সপোর্ট কুরিয়ারের মাধ্যমে নিরাপদে মূর্তি পাঠাই।",
              en: "Demand for Ganesh idols is high in Maharashtra and Gujarat during Ganesh Chaturthi. Bengali communities in Karnataka, Tamil Nadu and Telangana source special idols for Durga Puja celebrations. We ship safely to all these states via railway parcel and road transport couriers."
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-base leading-relaxed", children: t({
              bn: "সারা ভারত থেকে অর্ডার দিতে হোয়াটসঅ্যাপে মূর্তির ছবি, মাপ ও পরিমাণ পাঠান। আমরা সম্পূর্ণ কোটেশন ও শিপিং তথ্য দেব। দীপাবলি, নবরাত্রি, গণেশ চতুর্থী — যেকোনো উৎসবের জন্য অর্ডার গ্রহণ করা হয়।",
              en: "To place orders from anywhere in India, send idol photos, measurements and quantity via WhatsApp. We will provide a complete quotation and shipping details. Orders accepted for Diwali, Navratri, Ganesh Chaturthi — any festival."
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: [
            "clay idol manufacturer all India",
            "Ganesh idol wholesale India",
            "Durga idol supplier pan India",
            "সারা ভারতে মাটির মূর্তি সরবরাহ",
            "handmade clay idol India delivery",
            "Bengali diaspora puja idol wholesale",
            "idol export Indian communities",
            "clay murti nationwide India"
          ].map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        className: "py-14 bg-muted/30 border-y border-border",
        "aria-labelledby": "metros-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-secondary mb-2", children: t({ bn: "প্রধান শহরে সরবরাহ", en: "Serving Major Cities" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "metros-heading", className: "text-display-sm text-foreground", children: t({
              bn: "ভারতের প্রধান মহানগরীতে মাটির মূর্তি",
              en: "Clay Idols Delivered to India's Major Metros"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: METRO_CITIES.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-xl border border-border p-5 flex gap-3 items-start shadow-sm",
              "data-ocid": `metro-city-${city.name.en.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MapPin,
                  {
                    size: 20,
                    className: "text-primary mt-0.5 shrink-0",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: t(city.name) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t(city.detail) })
                ] })
              ]
            },
            city.name.en
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground mt-8", children: t({
            bn: "এছাড়াও ভারতের যেকোনো রাজ্যে অর্ডার গ্রহণ করা হয়।",
            en: "Orders also accepted for any other state or city in India."
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-background", "aria-label": "Logistics Trust", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 26, className: "text-primary" }),
        title: {
          bn: "রেল ও সড়কপথে ডেলিভারি",
          en: "Rail & Road Delivery"
        },
        desc: {
          bn: "রেলওয়ে পার্সেল ও রোড ট্রান্সপোর্ট — দুটি বিকল্পই পাওয়া যায়।",
          en: "Railway parcel and road transport — both options available."
        }
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 26, className: "text-secondary" }),
        title: {
          bn: "দীর্ঘপথের জন্য বিশেষ প্যাকিং",
          en: "Special Packing for Long Distance"
        },
        desc: {
          bn: "দূরবর্তী গন্তব্যে মূর্তি অক্ষত পৌঁছাতে বহু স্তরের সুরক্ষা প্যাকিং করা হয়।",
          en: "Multi-layer protective packaging ensures idols arrive intact at distant destinations."
        }
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 26, className: "text-accent" }),
        title: {
          bn: "অভিজ্ঞ হ্যান্ডলিং টিম",
          en: "Experienced Handling Team"
        },
        desc: {
          bn: "মাটির মূর্তি প্যাকিং ও শিপিংয়ে অভিজ্ঞ দলের তত্ত্বাবধানে ডেলিভারি।",
          en: "Delivery supervised by a team experienced in packing and shipping clay idols."
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
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-muted/20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-sm text-foreground mb-3", children: t({
        bn: "আমাদের মূর্তির সংগ্রহ দেখুন",
        en: "Explore Our Full Idol Collection"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base mb-6 max-w-xl mx-auto", children: t({
        bn: "গণেশ, দুর্গা, লক্ষ্মী, সরস্বতী, কালী ও হনুমানের হাতে তৈরি মাটির মূর্তি পাইকারি মূল্যে।",
        en: "Handmade Ganesh, Durga, Lakshmi, Saraswati, Kali & Hanuman clay idols at wholesale prices."
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products",
          className: "inline-flex items-center gap-2 btn-primary rounded-full px-8 py-3.5",
          "data-ocid": "all-india-view-products-btn",
          children: t({ bn: "সমস্ত পণ্য দেখুন", en: "View All Products" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-secondary mb-4 text-center", children: t({
        bn: "পশ্চিমবঙ্গের শহরেও সরবরাহ",
        en: "Also Serving Cities in West Bengal"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap justify-center gap-3",
          "data-ocid": "wb-cities-list",
          children: ALL_STATE_CITIES.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `/cities/${city.slug}`,
              className: "text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 rounded-full px-4 py-1.5 transition-smooth bg-card",
              "data-ocid": `wb-city-${city.slug}`,
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
  CityAllIndiaPage
};
