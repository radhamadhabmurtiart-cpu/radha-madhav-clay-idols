import { Breadcrumb } from "@/components/Breadcrumb";
import { useLanguage } from "@/hooks/useLanguage";
import type { BlogPostProps } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { useEffect } from "react";

/**
 * Shared BlogPost layout component. Each blog page passes its full data.
 * Injects Article JSON-LD schema automatically.
 */
export function BlogPost({
  slug,
  title,
  date,
  readTime,
  category,
  excerpt,
  heroImage,
  contentSections,
  relatedCities = [],
  relatedProducts = [],
}: BlogPostProps) {
  const { t } = useLanguage();

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Article JSON-LD schema
  useEffect(() => {
    const schemaId = `blog-post-jsonld-${slug}`;
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title.en,
      description: excerpt.en,
      image:
        heroImage ||
        "https://radhamadhavmritshilpalay.in/assets/generated/hero-clay-idols.dim_1200x600.jpg",
      datePublished: date,
      author: {
        "@type": "Organization",
        name: "Radha Madhav Mrit Shilpalay",
        url: "https://radhamadhavmritshilpalay.in",
      },
      publisher: {
        "@type": "Organization",
        name: "Radha Madhav Mrit Shilpalay",
        logo: {
          "@type": "ImageObject",
          url: "https://radhamadhavmritshilpalay.in/assets/generated/hero-clay-idols.dim_1200x600.jpg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://radhamadhavmritshilpalay.in/blog/${slug}`,
      },
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

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-card border-b border-border py-10">
        <div className="container max-w-4xl mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Blog", href: "/blog" }, { label: t(title) }]}
            className="mb-6"
          />

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-secondary bg-secondary/10 border border-secondary/20 rounded-full px-3 py-0.5">
              <Tag size={10} />
              {t(category)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              {t(readTime)}
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight mb-4">
            {t(title)}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
            {t(excerpt)}
          </p>
        </div>
      </section>

      {/* ─── Hero Image ─── */}
      {heroImage && (
        <div className="container max-w-4xl mx-auto px-4 -mt-1">
          <div className="rounded-xl overflow-hidden border border-border shadow-md aspect-[21/9]">
            <img
              src={heroImage}
              alt={t(title)}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      )}

      {/* ─── Article Body ─── */}
      <article className="py-12 bg-background" data-ocid={`blog-post-${slug}`}>
        <div className="container max-w-3xl mx-auto px-4">
          <div className="prose-style space-y-6">
            {contentSections.map((section, idx) => {
              const sectionKey = `${section.type}-${idx}-${section.content.en.slice(0, 15)}`;
              if (section.type === "h2") {
                return (
                  <h2
                    key={sectionKey}
                    className="font-display font-bold text-2xl sm:text-3xl text-foreground mt-10 mb-4 border-l-4 border-primary pl-4"
                  >
                    {t(section.content)}
                  </h2>
                );
              }
              if (section.type === "h3") {
                return (
                  <h3
                    key={sectionKey}
                    className="font-display font-semibold text-xl text-foreground mt-6 mb-3"
                  >
                    {t(section.content)}
                  </h3>
                );
              }
              if (section.type === "list" && section.items) {
                return (
                  <ul key={sectionKey} className="space-y-2 pl-2">
                    {section.items.map((item, i) => (
                      <li
                        key={`${sectionKey}-item-${i}-${item.en.slice(0, 10)}`}
                        className="flex items-start gap-2.5 text-foreground text-base leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                );
              }
              // paragraph (default)
              return (
                <p
                  key={sectionKey}
                  className="text-foreground text-base leading-relaxed"
                >
                  {t(section.content)}
                </p>
              );
            })}
          </div>

          {/* ─── Inquiry CTA Inside Article ─── */}
          <div className="mt-12 rounded-xl bg-primary/5 border border-primary/20 p-6 text-center">
            <div className="flex justify-center mb-3">
              <BookOpen size={32} className="text-primary" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              {t({
                bn: "পাইকারি অর্ডার দিতে যোগাযোগ করুন",
                en: "Contact Us for Bulk Orders",
              })}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t({
                bn: "রাধা মাধব মৃৎ শিল্পালয় — বর্ধমান থেকে সারা ভারতে সরবরাহ।",
                en: "Radha Madhav Mrit Shilpalay — supplying clay idols from Bardhaman across India.",
              })}
            </p>
            <p className="font-semibold text-primary text-base">
              +91 6295466310
            </p>
          </div>
        </div>
      </article>

      {/* ─── Related Sections ─── */}
      {(relatedCities.length > 0 || relatedProducts.length > 0) && (
        <section className="py-10 bg-muted/20 border-t border-border">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {relatedCities.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                    {t({ bn: "সেবা এলাকা", en: "Service Areas" })}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedCities.map((city) => (
                      <a
                        key={city.slug}
                        href={`/cities/${city.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 rounded-full px-4 py-1.5 transition-smooth bg-card"
                        data-ocid={`blog-related-city-${city.slug}`}
                      >
                        {t(city.name)}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {relatedProducts.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4">
                    {t({ bn: "সম্পর্কিত পণ্য", en: "Related Products" })}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedProducts.map((product) => (
                      <Link
                        key={product.slug}
                        to="/products"
                        className="text-sm text-muted-foreground hover:text-primary border border-border hover:border-primary/40 rounded-full px-4 py-1.5 transition-smooth bg-card"
                        data-ocid={`blog-related-product-${product.slug}`}
                      >
                        {t(product.name)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Bottom padding for sticky bar */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
