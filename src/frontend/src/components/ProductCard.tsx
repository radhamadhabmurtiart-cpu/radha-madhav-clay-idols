import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import type { ProductCategory } from "@/types";

interface ProductCardProps {
  product: ProductCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();

  return (
    <article
      className="bg-card rounded-lg overflow-hidden shadow-elevated border border-border group transition-smooth hover:-translate-y-1 flex flex-col h-full"
      data-ocid="product-card"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={t(product.name)}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        {product.bulkAvailable && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-secondary/90 text-secondary-foreground text-xs font-semibold px-2 py-0.5 backdrop-blur-sm">
              {t({ bn: "পাইকারি অর্ডার উপলব্ধ", en: "Bulk Order Available" })}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 line-clamp-2 leading-tight">
          {t(product.name)}
        </h3>
        <p className="text-muted-foreground text-xs mb-2 line-clamp-2 flex-1">
          {t(product.description)}
        </p>

        {product.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-sm border border-border"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-muted-foreground px-1 py-0.5">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        )}

        {product.priceRange && (
          <p className="text-xs font-semibold text-primary mt-auto">
            {t({ bn: "মূল্য:", en: "Price:" })} {product.priceRange}
          </p>
        )}
      </div>
    </article>
  );
}
