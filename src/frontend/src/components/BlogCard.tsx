import { useLanguage } from "@/hooks/useLanguage";
import type { BlogCardProps } from "@/types";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Clock } from "lucide-react";

interface BlogCardComponentProps extends BlogCardProps {
  className?: string;
}

type BlogPath =
  | "/blog/wholesale-buying-guide"
  | "/blog/how-to-choose-clay-idols"
  | "/blog/durga-puja-bulk-orders-west-bengal";

function toBlogPath(slug: string): BlogPath {
  const map: Record<string, BlogPath> = {
    "wholesale-buying-guide": "/blog/wholesale-buying-guide",
    "how-to-choose-clay-idols": "/blog/how-to-choose-clay-idols",
    "durga-puja-bulk-orders-west-bengal":
      "/blog/durga-puja-bulk-orders-west-bengal",
  };
  return map[slug] ?? "/blog/wholesale-buying-guide";
}

export function BlogCard({
  slug,
  title,
  date,
  readTime,
  category,
  excerpt,
  heroImage,
  className = "",
}: BlogCardComponentProps) {
  const { t } = useLanguage();
  const blogPath = toBlogPath(slug);

  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      className={`bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col transition-smooth hover:shadow-md hover:border-primary/30 group ${className}`}
      data-ocid={`blog-card-${slug}`}
    >
      {/* Thumbnail */}
      <Link to={blogPath} className="block overflow-hidden aspect-[16/9]">
        {heroImage ? (
          <img
            src={heroImage}
            alt={t(title)}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted/50 flex items-center justify-center">
            <BookOpen size={40} className="text-muted-foreground/40" />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        <span className="inline-block self-start text-xs font-semibold uppercase tracking-wide text-secondary bg-secondary/10 border border-secondary/20 rounded-full px-3 py-0.5 mb-3">
          {t(category)}
        </span>

        {/* Title */}
        <h2 className="font-display font-semibold text-lg text-foreground leading-snug mb-2 group-hover:text-primary transition-smooth">
          <Link to={blogPath}>{t(title)}</Link>
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
          {t(excerpt)}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {t(readTime)}
          </span>
        </div>
      </div>

      {/* Read More CTA */}
      <div className="px-5 pb-5">
        <Link
          to={blogPath}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-smooth"
          data-ocid={`blog-card-read-more-${slug}`}
        >
          {t({ bn: "আরও পড়ুন", en: "Read More" })}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
