import { r as reactExports, j as jsxRuntimeExports, M as MessageCircle, P as Phone, S as ShieldCheck, g as Skeleton, u as useLanguage, L as Link } from "./index-CrRcH9cU.js";
import { B as Breadcrumb } from "./Breadcrumb-OAdr682T.js";
import { u as useProducts } from "./useProducts-__McboOG.js";
import { S as Star } from "./star-CrWgkBF1.js";
import { T as Truck } from "./truck-ChehPZ79.js";
const WHATSAPP_BASE = "https://wa.me/916295466310?text=";
const PHONE = "+916295466310";
const PLACEHOLDER_COLORS = [
  "bg-secondary/20",
  "bg-primary/10",
  "bg-accent/10",
  "bg-muted"
];
function BackendProductCard({
  product,
  index
}) {
  const { t } = useLanguage();
  const initials = t(product.name).split(" ").slice(0, 2).map((w) => w[0]).join("");
  const colorClass = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const waMsg = encodeURIComponent(
    `নমস্কার, ${t(product.name)} এর পাইকারি অর্ডার সম্পর্কে জানতে চাই। / Hello, I want bulk order info for ${t(product.name)}.`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "bg-card rounded-xl overflow-hidden border border-border group transition-smooth hover:-translate-y-1 hover:shadow-lg flex flex-col h-full",
      "data-ocid": "category-product-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products/$productId",
            params: { productId: product.slug },
            className: "block relative overflow-hidden aspect-square",
            "aria-label": `View details for ${t(product.name)}`,
            children: [
              product.image ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.image,
                    alt: t(product.name),
                    className: "w-full h-full object-cover transition-smooth group-hover:scale-105",
                    loading: "lazy",
                    onError: (e) => {
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const ph = img.nextElementSibling;
                      if (ph) ph.style.display = "flex";
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `absolute inset-0 flex-col items-center justify-center gap-2 ${colorClass} hidden`,
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-primary/70 select-none", children: initials }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "📷 Image Coming Soon" })
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `absolute inset-0 flex flex-col items-center justify-center gap-2 ${colorClass}`,
                  "aria-label": `${t(product.name)} — image coming soon`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", "aria-hidden": "true", children: "🪔" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-tight line-clamp-2", children: t(product.name) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "📷 Image Coming Soon" })
                    ] })
                  ]
                }
              ),
              product.bulkAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm", children: "Bulk Available" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4 space-y-2 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm sm:text-base text-foreground leading-tight line-clamp-2", children: t(product.name) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1", children: t(product.description) }),
          product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            product.sizes.slice(0, 3).map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border",
                children: size
              },
              size
            )),
            product.sizes.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground px-1.5 py-0.5", children: [
              "+",
              product.sizes.length - 3
            ] })
          ] }),
          product.priceRange && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-xs font-bold ${product.priceRange.startsWith("₹") ? "text-primary" : "text-secondary"}`,
              children: product.priceRange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `${WHATSAPP_BASE}${waMsg}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1 inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold py-2 px-2 rounded-lg transition-smooth",
                "data-ocid": "category-product-whatsapp",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 12 }),
                  "WhatsApp"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${PHONE}`,
                "aria-label": "Call Now",
                className: "inline-flex items-center justify-center bg-card border border-primary text-primary hover:bg-primary/10 p-2 rounded-lg transition-smooth",
                "data-ocid": "category-product-call",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products/$productId",
                params: { productId: product.slug },
                className: "inline-flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-lg transition-smooth text-xs font-semibold",
                "aria-label": "View product details",
                "data-ocid": "category-product-detail-link",
                children: "›"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ProductsGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl overflow-hidden border border-border",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-lg" })
        ] })
      ]
    },
    i
  )) });
}
function backendProductToDisplay(p) {
  const min = Number(p.priceRangeMin);
  const max = Number(p.priceRangeMax);
  return {
    id: p.id.toString(),
    name: { bn: p.nameBn, en: p.nameEn },
    description: { bn: p.descriptionBn, en: p.descriptionEn },
    image: p.imageIds[0] ?? "",
    sizes: p.sizes,
    priceRange: min > 0 || max > 0 ? `₹${min} – ₹${max}` : "Contact for Wholesale Price",
    bulkAvailable: p.bulkAvailable,
    slug: p.id.toString()
  };
}
function CategoryPage({ config }) {
  const { data: backendProducts, isLoading } = useProducts();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://radhamadhavmritshilpalay.in";
  const canonicalUrl = `${baseUrl}${config.canonicalPath}`;
  reactExports.useEffect(() => {
    document.title = config.seoTitle;
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };
    setMeta("description", config.metaDescription);
    setLink("canonical", canonicalUrl);
    const faqSchemaId = "category-faq-jsonld";
    const existing = document.getElementById(faqSchemaId);
    if (existing) existing.remove();
    if (config.faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: config.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      };
      const script = document.createElement("script");
      script.id = faqSchemaId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(script);
    }
    return () => {
      const el = document.getElementById(faqSchemaId);
      if (el) el.remove();
    };
  }, [config, canonicalUrl]);
  const filteredProducts = backendProducts && backendProducts.length > 0 ? backendProducts.filter((p) => config.backendCategories.includes(p.category)).map((p, i) => ({ product: backendProductToDisplay(p), index: i })) : [];
  const whatsappMsg = encodeURIComponent(
    `নমস্কার, ${config.h1En} সম্পর্কে পাইকারি অর্ডার দিতে চাই। দয়া করে মূল্য জানান। / Hello, I want to place a bulk order for ${config.h1En}. Please share pricing.`
  );
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: config.h1En }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { items: breadcrumbItems }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-b border-border py-12 sm:py-16",
        "aria-label": "Category Hero",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30", children: "Wholesale Available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20", children: "All India Delivery" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-2", children: config.h1En }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-lg text-muted-foreground mb-1",
              lang: "bn",
              children: config.h1Bn
            }
          ),
          config.subtitleEn && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-secondary mt-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✦" }),
            config.subtitleEn
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4 mb-6 leading-relaxed max-w-2xl", children: "Clay idol manufacturer in Bardhaman, West Bengal — bulk orders available for retailers, puja committees & wholesale buyers across India." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col sm:flex-row gap-3",
              "data-ocid": "category-hero-cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `${WHATSAPP_BASE}${whatsappMsg}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-smooth",
                    "data-ocid": "category-hero-whatsapp",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
                      "WhatsApp for Bulk Order"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: `tel:${PHONE}`,
                    className: "inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-6 rounded-lg transition-smooth",
                    "data-ocid": "category-hero-call",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
                      "Call +91 6295466310"
                    ]
                  }
                )
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/10 border-b border-secondary/25 py-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📦 Bulk orders: All India" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border hidden sm:inline", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🏪 Retail (single piece): Bardhaman district only" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border hidden sm:inline", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "📱 All orders via WhatsApp or phone —",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `tel:${PHONE}`,
            className: "text-primary font-semibold hover:underline",
            children: "+91 6295466310"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-2xl text-foreground", children: [
          "About Our ",
          config.h1En
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: config.descEn }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", lang: "bn", children: config.descBn })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Why Choose Us?" }),
        [
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 18 }),
            title: "We supply clay idols across India",
            desc: "Trusted manufacturer from Bardhaman, West Bengal with 20+ years of expertise."
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }),
            title: "Trusted Local Manufacturer",
            desc: "Handcrafted clay idols by skilled artisans — quality guaranteed."
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 18 }),
            title: "Bulk Orders Accepted",
            desc: "Wholesale pricing for retailers, puja committees, factories & event organizers."
          }
        ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 p-4 bg-card border border-border rounded-xl",
            "data-ocid": "trust-badge",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0", children: badge.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: badge.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: badge.desc })
              ] })
            ]
          },
          badge.title
        ))
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-2xl text-foreground mb-1", children: [
          config.h1En,
          " — Products",
          filteredProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-base font-normal text-secondary bg-secondary/15 px-2.5 py-0.5 rounded-full border border-secondary/30 align-middle", children: [
            filteredProducts.length,
            " designs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Bulk & wholesale orders accepted · All India delivery" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductsGridSkeleton, {}) : filteredProducts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5",
          "data-ocid": "category-products-grid",
          children: filteredProducts.map(({ product, index }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            BackendProductCard,
            {
              product,
              index
            },
            product.id
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-16 bg-card border border-border rounded-2xl",
          "data-ocid": "category-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🏺" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "Products Coming Soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm mx-auto", children: "We are adding product photos and pricing. Contact us directly for current availability and bulk pricing." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `${WHATSAPP_BASE}${whatsappMsg}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-smooth",
                  "data-ocid": "category-empty-whatsapp",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
                    "WhatsApp for Bulk Order"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${PHONE}`,
                  className: "inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-6 rounded-lg transition-smooth",
                  "data-ocid": "category-empty-call",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }),
                    "Call Now"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary/10 border-t border-primary/20 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: "Call or WhatsApp now for bulk orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Bardhaman → Kolkata → Durgapur → Asansol → Dhanbad → Bankura → Purulia → All India" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `${WHATSAPP_BASE}${whatsappMsg}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-8 rounded-lg text-lg transition-smooth",
            "data-ocid": "category-bottom-whatsapp",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 20 }),
              "WhatsApp: +91 6295466310"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${PHONE}`,
            className: "inline-flex items-center justify-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-8 rounded-lg text-lg transition-smooth",
            "data-ocid": "category-bottom-call",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 20 }),
              "Call: +91 6295466310"
            ]
          }
        )
      ] })
    ] }) }),
    config.faqs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background border-t border-border py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-6", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "category-faq", children: config.faqs.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-2", children: faq.q }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: faq.a })
          ]
        },
        faq.q
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sr-only", "aria-hidden": "true", children: config.altTexts.map((alt) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alt }, alt)) })
  ] });
}
export {
  CategoryPage as C
};
