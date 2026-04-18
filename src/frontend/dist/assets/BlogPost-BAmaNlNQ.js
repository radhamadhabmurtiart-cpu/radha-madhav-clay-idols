import { c as createLucideIcon, u as useLanguage, r as reactExports, j as jsxRuntimeExports, P as Phone, M as MessageCircle, L as Link } from "./index-CxW9fjL1.js";
import { B as Breadcrumb } from "./Breadcrumb-B1wdc6zW.js";
import { C as Calendar, B as BookOpen } from "./calendar-fUVE8Pu1.js";
import { C as Clock } from "./clock-pHH_uI2s.js";
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const PHONE = "+916295466310";
const WHATSAPP_LINK = "https://wa.me/916295466310?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20clay%20idol%20orders.";
function BlogPost({
  slug,
  title,
  date,
  readTime,
  category,
  excerpt,
  heroImage,
  contentSections,
  relatedCities = [],
  relatedProducts = []
}) {
  const { t } = useLanguage();
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  reactExports.useEffect(() => {
    const schemaId = `blog-post-jsonld-${slug}`;
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title.en,
      description: excerpt.en,
      image: heroImage || "https://radhamadhavmritshilpalay.in/assets/generated/hero-clay-idols.dim_1200x600.jpg",
      datePublished: date,
      author: {
        "@type": "Organization",
        name: "Radha Madhav Mrit Shilpalay",
        url: "https://radhamadhavmritshilpalay.in"
      },
      publisher: {
        "@type": "Organization",
        name: "Radha Madhav Mrit Shilpalay",
        logo: {
          "@type": "ImageObject",
          url: "https://radhamadhavmritshilpalay.in/assets/generated/hero-clay-idols.dim_1200x600.jpg"
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://radhamadhavmritshilpalay.in/blog/${slug}`
      }
    };
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [slug, title.en, excerpt.en, heroImage, date]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Breadcrumb,
        {
          items: [{ label: "Blog", href: "/blog" }, { label: t(title) }],
          className: "mb-6"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary bg-secondary/10 border border-secondary/20 rounded-full px-3 py-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 10 }),
          t(category)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
          formattedDate
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
          t(readTime)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-4", children: t(title) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl", children: t(excerpt) })
    ] }) }),
    heroImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl mx-auto px-4 -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-border shadow-md aspect-[21/9]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: heroImage,
        alt: t(title),
        className: "w-full h-full object-cover",
        fetchPriority: "high"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "py-12 bg-background", "data-ocid": `blog-post-${slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-style space-y-6", children: contentSections.map((section, idx) => {
        const sectionKey = `${section.type}-${idx}-${section.content.en.slice(0, 15)}`;
        if (section.type === "h2") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-bold text-2xl sm:text-3xl text-foreground mt-10 mb-4 border-l-4 border-primary pl-4",
              children: t(section.content)
            },
            sectionKey
          );
        }
        if (section.type === "h3") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-display font-semibold text-xl text-foreground mt-6 mb-3",
              children: t(section.content)
            },
            sectionKey
          );
        }
        if (section.type === "list" && section.items) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 pl-2", children: section.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-2.5 text-foreground text-base leading-relaxed",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" }),
                t(item)
              ]
            },
            `${sectionKey}-item-${i}-${item.en.slice(0, 10)}`
          )) }, sectionKey);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-foreground text-base leading-relaxed",
            children: t(section.content)
          },
          sectionKey
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 32, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: t({
          bn: "পাইকারি অর্ডার দিতে যোগাযোগ করুন",
          en: "Contact Us for Bulk Orders"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: t({
          bn: "রাধা মাধব মৃৎ শিল্পালয় — বর্ধমান থেকে সারা ভারতে সরবরাহ।",
          en: "Radha Madhav Mrit Shilpalay — supplying clay idols from Bardhaman across India."
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `tel:${PHONE}`,
              className: "inline-flex items-center justify-center gap-2 btn-primary rounded-full px-6 py-3 text-sm font-bold",
              "data-ocid": "blog-cta-call-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15 }),
                t({ bn: "কল করুন", en: "Call Now" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: WHATSAPP_LINK,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center justify-center gap-2 btn-secondary rounded-full px-6 py-3 text-sm font-bold",
              "data-ocid": "blog-cta-whatsapp-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 15 }),
                t({ bn: "হোয়াটসঅ্যাপ", en: "WhatsApp Inquiry" })
              ]
            }
          )
        ] })
      ] })
    ] }) }),
    (relatedCities.length > 0 || relatedProducts.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-muted/20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-8", children: [
      relatedCities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-widest text-secondary mb-4", children: t({ bn: "সেবা এলাকা", en: "Service Areas" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: relatedCities.map((city) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `/cities/${city.slug}`,
            className: "text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 rounded-full px-4 py-1.5 transition-smooth bg-card",
            "data-ocid": `blog-related-city-${city.slug}`,
            children: t(city.name)
          },
          city.slug
        )) })
      ] }),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-widest text-secondary mb-4", children: t({ bn: "সম্পর্কিত পণ্য", en: "Related Products" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: relatedProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products",
            className: "text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 rounded-full px-4 py-1.5 transition-smooth bg-card",
            "data-ocid": `blog-related-product-${product.slug}`,
            children: t(product.name)
          },
          product.slug
        )) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14", "aria-hidden": "true" })
  ] });
}
export {
  BlogPost as B
};
