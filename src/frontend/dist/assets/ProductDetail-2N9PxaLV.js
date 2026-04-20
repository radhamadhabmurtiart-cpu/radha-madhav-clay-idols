import { i as useParams, j as jsxRuntimeExports, L as Link, M as MessageCircle, P as Phone, S as ShieldCheck, g as Skeleton } from "./index-9P4jIzoX.js";
import { B as Breadcrumb } from "./Breadcrumb-1FUH8UeT.js";
import { b as useProduct } from "./useProducts-imxoOUqf.js";
import { A as ArrowLeft } from "./arrow-left-BspXt7Rj.js";
import { S as Star } from "./star-DepKwnVX.js";
import { T as Truck } from "./truck-CRFb8AZ_.js";
import "./house-BeFeNKuQ.js";
import "./chevron-right-BF3yJ3IF.js";
import "./useMutation-BESTmnje.js";
const WHATSAPP_BASE = "https://wa.me/916295466310?text=";
const PHONE = "+916295466310";
function ProductDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-3/4 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" })
      ] })
    ] })
  ] });
}
function ProductDetailPage() {
  const params = useParams({ from: "/products/$productId" });
  const productId = BigInt(params.productId);
  const { data: product, isLoading } = useProduct(productId);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetailSkeleton, {});
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🏺" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Product Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This product may have been removed or is no longer available." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/products",
          className: "inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2.5 px-5 rounded-lg transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
            "View All Products"
          ]
        }
      )
    ] });
  }
  const waMsg = encodeURIComponent(
    `নমস্কার, ${product.nameEn} এর পাইকারি অর্ডার সম্পর্কে জানতে চাই। / Hello, I want bulk order info for ${product.nameEn}.`
  );
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.nameEn }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { items: breadcrumbItems }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10 sm:py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: product.imageIds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl overflow-hidden border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: product.imageIds[0],
            alt: product.nameEn,
            className: "w-full h-full object-cover"
          }
        ) }),
        product.imageIds.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: product.imageIds.slice(1, 5).map((imgId) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-square rounded-lg overflow-hidden border border-border bg-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imgId,
                alt: `${product.nameEn} additional view`,
                className: "w-full h-full object-cover"
              }
            )
          },
          imgId
        )) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square rounded-2xl border border-border bg-muted flex flex-col items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🪔" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "Image Coming Soon" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        product.bulkAvailable && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold uppercase tracking-widest text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30", children: "Bulk Available" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight", children: product.nameEn }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-body text-lg text-muted-foreground mt-1",
              lang: "bn",
              children: product.nameBn
            }
          )
        ] }),
        (Number(product.priceRangeMin) > 0 || Number(product.priceRangeMax) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-primary", children: [
          "₹",
          Number(product.priceRangeMin).toLocaleString("en-IN"),
          " – ₹",
          Number(product.priceRangeMax).toLocaleString("en-IN")
        ] }),
        product.descriptionEn && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: product.descriptionEn }),
        product.descriptionBn && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", lang: "bn", children: product.descriptionBn }),
        product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Available Sizes:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-sm bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border font-medium",
              children: size
            },
            size
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/10 border border-secondary/25 rounded-xl p-4 text-sm space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "📦 Order Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Bulk orders: Available across all India" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Retail (single piece): Bardhaman district only" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "All orders via WhatsApp or phone call" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col sm:flex-row gap-3",
            "data-ocid": "product-detail-cta",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `${WHATSAPP_BASE}${waMsg}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-5 rounded-lg transition-smooth text-sm",
                  "data-ocid": "product-detail-whatsapp",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16 }),
                    "WhatsApp for Bulk Order"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: `tel:${PHONE}`,
                  className: "flex-1 inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-5 rounded-lg transition-smooth text-sm",
                  "data-ocid": "product-detail-call",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
                    "Call +91 6295466310"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/products",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
              "Back to All Products"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 18 }),
        title: "All India Delivery",
        desc: "Bulk orders shipped across India from Bardhaman, West Bengal."
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }),
        title: "Handcrafted Quality",
        desc: "Traditional clay idol making with 20+ years of expertise."
      },
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 18 }),
        title: "Wholesale Pricing",
        desc: "Special rates for retailers, puja committees & bulk buyers."
      }
    ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 bg-card border border-border rounded-xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0", children: badge.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: badge.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: badge.desc })
          ] })
        ]
      },
      badge.title
    )) }) }) })
  ] });
}
export {
  ProductDetailPage
};
