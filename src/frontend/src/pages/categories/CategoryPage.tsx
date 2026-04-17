import { Breadcrumb } from "@/components/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useProducts } from "@/hooks/useProducts";
import type { ProductCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, ShieldCheck, Star, Truck } from "lucide-react";
import { useEffect } from "react";

const WHATSAPP_BASE = "https://wa.me/916295466310?text=";
const PHONE = "+916295466310";

export interface CategoryFaqItem {
  q: string;
  a: string;
}

export interface CategoryPageConfig {
  seoTitle: string;
  metaDescription: string;
  canonicalPath: string;
  h1En: string;
  h1Bn: string;
  /** Optional subtitle shown below H1 (e.g. "50+ unique designs") */
  subtitleEn?: string;
  descEn: string;
  descBn: string;
  altTexts: string[];
  faqs: CategoryFaqItem[];
  /** backend categories to filter: "ganesh" | "lakshmi" | "durga" | "saraswati" | "hanuman" | "custom" */
  backendCategories: string[];
}

const PLACEHOLDER_COLORS = [
  "bg-secondary/20",
  "bg-primary/10",
  "bg-accent/10",
  "bg-muted",
];

function BackendProductCard({
  product,
  index,
}: {
  product: ProductCategory;
  index: number;
}) {
  const { t } = useLanguage();
  const initials = t(product.name)
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const colorClass = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const waMsg = encodeURIComponent(
    `নমস্কার, ${t(product.name)} এর পাইকারি অর্ডার সম্পর্কে জানতে চাই। / Hello, I want bulk order info for ${t(product.name)}.`,
  );

  return (
    <article
      className="bg-card rounded-xl overflow-hidden border border-border group transition-smooth hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
      data-ocid="category-product-card"
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.slug }}
        className="block relative overflow-hidden aspect-square"
        aria-label={`View details for ${t(product.name)}`}
      >
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={t(product.name)}
              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const ph = img.nextElementSibling as HTMLElement | null;
                if (ph) ph.style.display = "flex";
              }}
            />
            <div
              className={`absolute inset-0 flex-col items-center justify-center gap-2 ${colorClass} hidden`}
              aria-hidden="true"
            >
              <span className="text-3xl font-display font-bold text-primary/70 select-none">
                {initials}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                📷 Image Coming Soon
              </span>
            </div>
          </>
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${colorClass}`}
            aria-label={`${t(product.name)} — image coming soon`}
          >
            <span className="text-4xl" aria-hidden="true">
              🪔
            </span>
            <div className="text-center px-2">
              <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2">
                {t(product.name)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                📷 Image Coming Soon
              </p>
            </div>
          </div>
        )}
        {product.bulkAvailable && (
          <div className="absolute bottom-2 left-2">
            <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
              Bulk Available
            </span>
          </div>
        )}
      </Link>
      <div className="p-3 sm:p-4 space-y-2 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-sm sm:text-base text-foreground leading-tight line-clamp-2">
          {t(product.name)}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
          {t(product.description)}
        </p>
        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded border border-border"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        )}
        {product.priceRange && (
          <p
            className={`text-xs font-bold ${
              product.priceRange.startsWith("₹")
                ? "text-primary"
                : "text-secondary"
            }`}
          >
            {product.priceRange}
          </p>
        )}
        <div className="flex gap-2 pt-1">
          <a
            href={`${WHATSAPP_BASE}${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold py-2 px-2 rounded-lg transition-smooth"
            data-ocid="category-product-whatsapp"
          >
            <MessageCircle size={12} />
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE}`}
            aria-label="Call Now"
            className="inline-flex items-center justify-center bg-card border border-primary text-primary hover:bg-primary/10 p-2 rounded-lg transition-smooth"
            data-ocid="category-product-call"
          >
            <Phone size={14} />
          </a>
          <Link
            to="/products/$productId"
            params={{ productId: product.slug }}
            className="inline-flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-lg transition-smooth text-xs font-semibold"
            aria-label="View product details"
            data-ocid="category-product-detail-link"
          >
            ›
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-card rounded-xl overflow-hidden border border-border"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

function backendProductToDisplay(p: {
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
  const min = Number(p.priceRangeMin);
  const max = Number(p.priceRangeMax);
  return {
    id: p.id.toString(),
    name: { bn: p.nameBn, en: p.nameEn },
    description: { bn: p.descriptionBn, en: p.descriptionEn },
    image: p.imageIds[0] ?? "",
    sizes: p.sizes,
    priceRange:
      min > 0 || max > 0 ? `₹${min} – ₹${max}` : "Contact for Wholesale Price",
    bulkAvailable: p.bulkAvailable,
    slug: p.id.toString(),
  };
}

export function CategoryPage({ config }: { config: CategoryPageConfig }) {
  const { data: backendProducts, isLoading } = useProducts();

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://radhamadhavmritshilpalay.in";
  const canonicalUrl = `${baseUrl}${config.canonicalPath}`;

  // Set SEO meta in <head>
  useEffect(() => {
    document.title = config.seoTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta("description", config.metaDescription);
    setLink("canonical", canonicalUrl);

    // JSON-LD FAQ schema
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
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

  // Filter products by backend categories
  const filteredProducts =
    backendProducts && backendProducts.length > 0
      ? backendProducts
          .filter((p) => config.backendCategories.includes(p.category))
          .map((p, i) => ({ product: backendProductToDisplay(p), index: i }))
      : [];

  const whatsappMsg = encodeURIComponent(
    `নমস্কার, ${config.h1En} সম্পর্কে পাইকারি অর্ডার দিতে চাই। দয়া করে মূল্য জানান। / Hello, I want to place a bulk order for ${config.h1En}. Please share pricing.`,
  );

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: config.h1En },
  ];

  return (
    <>
      {/* ─── Breadcrumb ─── */}
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container max-w-6xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* ─── Hero Section ─── */}
      <section
        className="bg-card border-b border-border py-12 sm:py-16"
        aria-label="Category Hero"
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
                Wholesale Available
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                All India Delivery
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-2">
              {config.h1En}
            </h1>
            <p
              className="font-body text-lg text-muted-foreground mb-1"
              lang="bn"
            >
              {config.h1Bn}
            </p>
            {config.subtitleEn && (
              <p className="text-sm font-semibold text-secondary mt-2 flex items-center gap-1.5">
                <span>✦</span>
                {config.subtitleEn}
              </p>
            )}
            <p className="text-muted-foreground mt-4 mb-6 leading-relaxed max-w-2xl">
              Clay idol manufacturer in Bardhaman, West Bengal — bulk orders
              available for retailers, puja committees &amp; wholesale buyers
              across India.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3"
              data-ocid="category-hero-cta"
            >
              <a
                href={`${WHATSAPP_BASE}${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-smooth"
                data-ocid="category-hero-whatsapp"
              >
                <MessageCircle size={18} />
                WhatsApp for Bulk Order
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-6 rounded-lg transition-smooth"
                data-ocid="category-hero-call"
              >
                <Phone size={18} />
                Call +91 6295466310
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Order Policy Callout ─── */}
      <section className="bg-secondary/10 border-b border-secondary/25 py-4 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-foreground">
            <span>📦 Bulk orders: All India</span>
            <span className="text-border hidden sm:inline">|</span>
            <span>🏪 Retail (single piece): Bardhaman district only</span>
            <span className="text-border hidden sm:inline">|</span>
            <span>
              📱 All orders via WhatsApp or phone —{" "}
              <a
                href={`tel:${PHONE}`}
                className="text-primary font-semibold hover:underline"
              >
                +91 6295466310
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* ─── SEO Description Section ─── */}
      <section className="bg-background py-10 sm:py-14">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-2xl text-foreground">
                About Our {config.h1En}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {config.descEn}
              </p>
              <p className="text-muted-foreground leading-relaxed" lang="bn">
                {config.descBn}
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-foreground">
                Why Choose Us?
              </h2>
              {[
                {
                  icon: <Star size={18} />,
                  title: "We supply clay idols across India",
                  desc: "Trusted manufacturer from Bardhaman, West Bengal with 20+ years of expertise.",
                },
                {
                  icon: <ShieldCheck size={18} />,
                  title: "Trusted Local Manufacturer",
                  desc: "Handcrafted clay idols by skilled artisans — quality guaranteed.",
                },
                {
                  icon: <Truck size={18} />,
                  title: "Bulk Orders Accepted",
                  desc: "Wholesale pricing for retailers, puja committees, factories & event organizers.",
                },
              ].map((badge) => (
                <div
                  key={badge.title}
                  className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl"
                  data-ocid="trust-badge"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {badge.title}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Products Section ─── */}
      <section className="bg-muted/30 border-t border-border py-10 sm:py-14">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl text-foreground mb-1">
              {config.h1En} — Products
              {filteredProducts.length > 0 && (
                <span className="ml-2 text-base font-normal text-secondary bg-secondary/15 px-2.5 py-0.5 rounded-full border border-secondary/30 align-middle">
                  {filteredProducts.length} designs
                </span>
              )}
            </h2>
            <p className="text-muted-foreground text-sm">
              Bulk &amp; wholesale orders accepted · All India delivery
            </p>
          </div>

          {isLoading ? (
            <ProductsGridSkeleton />
          ) : filteredProducts.length > 0 ? (
            <div
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
              data-ocid="category-products-grid"
            >
              {filteredProducts.map(({ product, index }) => (
                <BackendProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16 bg-card border border-border rounded-2xl"
              data-ocid="category-empty-state"
            >
              <div className="text-5xl mb-4">🏺</div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                Products Coming Soon
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                We are adding product photos and pricing. Contact us directly
                for current availability and bulk pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`${WHATSAPP_BASE}${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-6 rounded-lg transition-smooth"
                  data-ocid="category-empty-whatsapp"
                >
                  <MessageCircle size={18} />
                  WhatsApp for Bulk Order
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-6 rounded-lg transition-smooth"
                  data-ocid="category-empty-call"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className="bg-primary/10 border-t border-primary/20 py-10">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-4">
          <p className="font-display font-bold text-xl text-foreground">
            Call or WhatsApp now for bulk orders
          </p>
          <p className="text-muted-foreground text-sm">
            Bardhaman → Kolkata → Durgapur → Asansol → Dhanbad → Bankura →
            Purulia → All India
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${WHATSAPP_BASE}${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-8 rounded-lg text-lg transition-smooth"
              data-ocid="category-bottom-whatsapp"
            >
              <MessageCircle size={20} />
              WhatsApp: +91 6295466310
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-8 rounded-lg text-lg transition-smooth"
              data-ocid="category-bottom-call"
            >
              <Phone size={20} />
              Call: +91 6295466310
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      {config.faqs.length > 0 && (
        <section className="bg-background border-t border-border py-10 sm:py-14">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4" data-ocid="category-faq">
              {config.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <h3 className="font-semibold text-foreground text-sm mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Image Alt Texts (hidden SEO) ─── */}
      <div className="sr-only" aria-hidden="true">
        {config.altTexts.map((alt) => (
          <span key={alt}>{alt}</span>
        ))}
      </div>
    </>
  );
}

// Re-export the t helper type for individual pages
export type { CategoryPageConfig as CategoryConfig };
