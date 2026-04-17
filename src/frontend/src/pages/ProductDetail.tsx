import { Breadcrumb } from "@/components/Breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProducts";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/916295466310?text=";
const PHONE = "+916295466310";

function ProductDetailSkeleton() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-10 space-y-8">
      <Skeleton className="h-5 w-48 rounded" />
      <div className="grid md:grid-cols-2 gap-10">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailPage() {
  const params = useParams({ from: "/products/$productId" });
  const productId = BigInt(params.productId);
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🏺</div>
        <h1 className="font-display font-bold text-2xl text-foreground mb-2">
          Product Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          This product may have been removed or is no longer available.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2.5 px-5 rounded-lg transition-smooth"
        >
          <ArrowLeft size={16} />
          View All Products
        </Link>
      </div>
    );
  }

  const waMsg = encodeURIComponent(
    `নমস্কার, ${product.nameEn} এর পাইকারি অর্ডার সম্পর্কে জানতে চাই। / Hello, I want bulk order info for ${product.nameEn}.`,
  );

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.nameEn },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border py-3 px-4">
        <div className="container max-w-5xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main content */}
      <section className="bg-background py-10 sm:py-14">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Image Gallery */}
            <div className="space-y-3">
              {product.imageIds.length > 0 ? (
                <>
                  <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-card">
                    <img
                      src={product.imageIds[0]}
                      alt={product.nameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.imageIds.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.imageIds.slice(1, 5).map((imgId) => (
                        <div
                          key={imgId}
                          className="aspect-square rounded-lg overflow-hidden border border-border bg-card"
                        >
                          <img
                            src={imgId}
                            alt={`${product.nameEn} additional view`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-square rounded-2xl border border-border bg-muted flex flex-col items-center justify-center gap-3">
                  <span className="text-6xl">🪔</span>
                  <p className="text-muted-foreground text-sm font-medium">
                    Image Coming Soon
                  </p>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              {product.bulkAvailable && (
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
                  Bulk Available
                </span>
              )}
              <div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                  {product.nameEn}
                </h1>
                <p
                  className="font-body text-lg text-muted-foreground mt-1"
                  lang="bn"
                >
                  {product.nameBn}
                </p>
              </div>

              {(Number(product.priceRangeMin) > 0 ||
                Number(product.priceRangeMax) > 0) && (
                <p className="text-xl font-bold text-primary">
                  ₹{Number(product.priceRangeMin).toLocaleString("en-IN")} – ₹
                  {Number(product.priceRangeMax).toLocaleString("en-IN")}
                </p>
              )}

              {product.descriptionEn && (
                <p className="text-muted-foreground leading-relaxed">
                  {product.descriptionEn}
                </p>
              )}
              {product.descriptionBn && (
                <p className="text-muted-foreground leading-relaxed" lang="bn">
                  {product.descriptionBn}
                </p>
              )}

              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Available Sizes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Policy */}
              <div className="bg-secondary/10 border border-secondary/25 rounded-xl p-4 text-sm space-y-1">
                <p className="font-medium text-foreground">📦 Order Policy</p>
                <p className="text-muted-foreground">
                  Bulk orders: Available across all India
                </p>
                <p className="text-muted-foreground">
                  Retail (single piece): Bardhaman district only
                </p>
                <p className="text-muted-foreground">
                  All orders via WhatsApp or phone call
                </p>
              </div>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-3"
                data-ocid="product-detail-cta"
              >
                <a
                  href={`${WHATSAPP_BASE}${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-5 rounded-lg transition-smooth text-sm"
                  data-ocid="product-detail-whatsapp"
                >
                  <MessageCircle size={16} />
                  WhatsApp for Bulk Order
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-muted font-semibold py-3 px-5 rounded-lg transition-smooth text-sm"
                  data-ocid="product-detail-call"
                >
                  <Phone size={16} />
                  Call +91 6295466310
                </a>
              </div>

              {/* Back link */}
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                <ArrowLeft size={14} />
                Back to All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-muted/30 border-t border-border py-10">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: <Star size={18} />,
                title: "All India Delivery",
                desc: "Bulk orders shipped across India from Bardhaman, West Bengal.",
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "Handcrafted Quality",
                desc: "Traditional clay idol making with 20+ years of expertise.",
              },
              {
                icon: <Truck size={18} />,
                title: "Wholesale Pricing",
                desc: "Special rates for retailers, puja committees & bulk buyers.",
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl"
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
      </section>
    </>
  );
}
