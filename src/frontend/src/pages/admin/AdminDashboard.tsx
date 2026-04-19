import { createActor } from "@/backend";
import type { BannerImage } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteProduct,
  useInquiries,
  useProducts,
} from "@/hooks/useProducts";
import { PRODUCT_CATEGORY_LABELS } from "@/types/admin";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Edit,
  ImageIcon,
  ImageOff,
  Loader2,
  Package,
  Phone,
  Plus,
  Save,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Types ───
type DeleteTarget = { id: bigint; name: string } | null;
type ActiveTab = "products" | "visitors" | "homepage" | "categories";

// ─── Category meta ───
const CATEGORY_META: Record<string, { nameBn: string; nameEn: string }> = {
  "bangla-lakshmi-ganesh-idol-hal-khata": {
    nameBn: "বাংলা লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Bangla Lakshmi Ganesh (Hal Khata)",
  },
  "clay-ganesh-idol-wholesale": {
    nameBn: "মাটির গণেশ মূর্তি পাইকারি",
    nameEn: "Clay Ganesh Idol – Wholesale",
  },
  "clay-vishwakarma-idol": {
    nameBn: "মাটির বিশ্বকর্মা মূর্তি",
    nameEn: "Clay Vishwakarma Idol",
  },
  "clay-lakshmi-idol": {
    nameBn: "মাটির লক্ষ্মী মূর্তি",
    nameEn: "Clay Lakshmi Idol",
  },
  "diwali-lakshmi-ganesh-idol": {
    nameBn: "দীপাবলি লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Diwali Lakshmi Ganesh Idol",
  },
  "clay-kali-idol": {
    nameBn: "মাটির কালী মূর্তি",
    nameEn: "Clay Kali Idol",
  },
  "small-durga-idol": {
    nameBn: "ছোট দুর্গা মূর্তি",
    nameEn: "Small Durga Idol",
  },
  "radha-krishna-clay-idol": {
    nameBn: "রাধা-কৃষ্ণ মাটির মূর্তি",
    nameEn: "Radha Krishna Clay Idol",
  },
  "clay-kartik-idol": {
    nameBn: "মাটির কার্তিক মূর্তি",
    nameEn: "Clay Kartik Idol",
  },
  "clay-saraswati-idol": {
    nameBn: "মাটির সরস্বতী মূর্তি",
    nameEn: "Clay Saraswati Idol",
  },
  "custom-clay-idol": {
    nameBn: "কাস্টম মাটির মূর্তি",
    nameEn: "Custom Clay Idol",
  },
};
const CATEGORY_SLUGS = Object.keys(CATEGORY_META);

// ─── Hooks ───
function useAdminActor() {
  return useActor(createActor);
}

function useBannerImages() {
  const { actor, isFetching } = useAdminActor();
  return useQuery({
    queryKey: ["bannerImages"],
    queryFn: async () => {
      if (!actor) return [] as BannerImage[];
      return actor.getBannerImages();
    },
    enabled: !!actor && !isFetching,
  });
}

function useFeaturedProductIds() {
  const { actor, isFetching } = useAdminActor();
  return useQuery({
    queryKey: ["featuredProductIds"],
    queryFn: async () => {
      if (!actor) return [] as bigint[];
      return actor.getFeaturedProductIds();
    },
    enabled: !!actor && !isFetching,
  });
}

function useCategoryImages() {
  const { actor, isFetching } = useAdminActor();
  return useQuery({
    queryKey: ["categoryImages"],
    queryFn: async () => {
      if (!actor) return [] as { slug: string; imageUrl: string }[];
      return actor.getCategoryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

function useUpdateBannerImages() {
  const { actor } = useAdminActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (images: BannerImage[]) => {
      if (!actor) throw new Error("Actor not ready");
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.updateBannerImages(images, token);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bannerImages"] }),
  });
}

function useUpdateFeaturedIds() {
  const { actor } = useAdminActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ids: bigint[]) => {
      if (!actor) throw new Error("Actor not ready");
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.updateFeaturedProductIds(ids, token);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["featuredProductIds"] }),
  });
}

function useUpdateCategoryImage() {
  const { actor } = useAdminActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      slug,
      imageUrl,
    }: { slug: string; imageUrl: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const ok = await actor.updateCategoryImage(slug, imageUrl);
      if (!ok) throw new Error("Failed to update image");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categoryImages"] }),
  });
}

// ─── Category Row ───
interface CategoryRowProps {
  slug: string;
  currentImageUrl: string;
}

function CategoryRow({ slug, currentImageUrl }: CategoryRowProps) {
  const meta = CATEGORY_META[slug];
  const updateImage = useUpdateCategoryImage();
  const [inputUrl, setInputUrl] = useState(currentImageUrl);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setInputUrl(currentImageUrl);
  }, [currentImageUrl]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await updateImage.mutateAsync({ slug, imageUrl: inputUrl.trim() });
      toast.success(`"${meta?.nameEn ?? slug}" image updated!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save image.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start"
      data-ocid={`category-image-row.${slug}`}
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
        {inputUrl ? (
          <img
            src={inputUrl}
            alt={meta?.nameEn ?? slug}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <ImageIcon size={20} className="text-muted-foreground/40" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <p className="font-semibold text-sm text-foreground">
            {meta?.nameEn ?? slug}
          </p>
          <p className="text-xs text-muted-foreground">{meta?.nameBn ?? ""}</p>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-8 text-xs"
              data-ocid={`category-image-input.${slug}`}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="h-8 px-3 shrink-0"
            onClick={handleSave}
            disabled={isSaving || inputUrl.trim() === currentImageUrl}
            data-ocid={`category-image-save.${slug}`}
          >
            {isSaving ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Save size={12} />
            )}
            <span className="ml-1">{isSaving ? "Saving…" : "Save"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Homepage Manager Tab ───
function HomepageManagerTab() {
  const { data: banners, isLoading: bannersLoading } = useBannerImages();
  const { data: featuredIds, isLoading: featuredLoading } =
    useFeaturedProductIds();
  const { data: products } = useProducts();

  const updateBanners = useUpdateBannerImages();
  const updateFeatured = useUpdateFeaturedIds();

  // Banner state
  const [bannerList, setBannerList] = useState<
    { id: string; imageUrl: string; title: string; displayOrder: number }[]
  >([]);
  const [isSavingBanners, setIsSavingBanners] = useState(false);

  // Featured state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSavingFeatured, setIsSavingFeatured] = useState(false);

  // Init banner list from fetched data
  useEffect(() => {
    if (banners) {
      setBannerList(
        banners.map((b) => ({
          id: b.id,
          imageUrl: b.imageUrl,
          title: b.title,
          displayOrder: Number(b.displayOrder),
        })),
      );
    }
  }, [banners]);

  // Init featured from fetched data
  useEffect(() => {
    if (featuredIds) {
      setSelectedIds(featuredIds.map((id) => id.toString()));
    }
  }, [featuredIds]);

  function addBanner() {
    setBannerList((prev) => [
      ...prev,
      {
        id: `banner-${Date.now()}`,
        imageUrl: "",
        title: "",
        displayOrder: prev.length + 1,
      },
    ]);
  }

  function updateBanner(
    index: number,
    field: "imageUrl" | "title",
    value: string,
  ) {
    setBannerList((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [field]: value } : b)),
    );
  }

  function removeBanner(index: number) {
    setBannerList((prev) => prev.filter((_, i) => i !== index));
  }

  async function saveBanners() {
    setIsSavingBanners(true);
    try {
      await updateBanners.mutateAsync(
        bannerList.map((b, i) => ({
          id: b.id,
          imageUrl: b.imageUrl,
          title: b.title,
          displayOrder: BigInt(i + 1),
        })),
      );
      toast.success("Banner images saved!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save banners.",
      );
    } finally {
      setIsSavingBanners(false);
    }
  }

  function toggleFeatured(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) {
        toast.error("Maximum 4 featured products allowed.");
        return prev;
      }
      return [...prev, id];
    });
  }

  async function saveFeatured() {
    setIsSavingFeatured(true);
    try {
      await updateFeatured.mutateAsync(selectedIds.map((id) => BigInt(id)));
      toast.success("Featured products saved!");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to save featured products.",
      );
    } finally {
      setIsSavingFeatured(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* ── Banner Images Section ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-base text-foreground">
              Banner Images
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sliding banner shown under the hero heading on the homepage.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addBanner}
            data-ocid="homepage-banner-add-button"
          >
            <Plus size={13} className="mr-1.5" />
            Add Image
          </Button>
        </div>

        {bannersLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : bannerList.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 border border-dashed border-border rounded-xl text-center"
            data-ocid="homepage-banner-empty-state"
          >
            <ImageIcon size={28} className="text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              No banners yet. Click "Add Image" to add one.
            </p>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="homepage-banner-list">
            {bannerList.map((banner, idx) => (
              <div
                key={banner.id}
                className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start"
                data-ocid={`homepage-banner-item.${idx + 1}`}
              >
                {/* Preview */}
                <div className="w-20 h-14 shrink-0 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                  {banner.imageUrl ? (
                    <img
                      src={banner.imageUrl}
                      alt={banner.title || `Banner ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <ImageIcon size={16} className="text-muted-foreground/40" />
                  )}
                </div>

                {/* Fields */}
                <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Image URL *</Label>
                    <Input
                      value={banner.imageUrl}
                      onChange={(e) =>
                        updateBanner(idx, "imageUrl", e.target.value)
                      }
                      placeholder="https://example.com/banner.jpg"
                      className="h-8 text-xs"
                      data-ocid={`homepage-banner-url-input.${idx + 1}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Title (optional)</Label>
                    <Input
                      value={banner.title}
                      onChange={(e) =>
                        updateBanner(idx, "title", e.target.value)
                      }
                      placeholder="Banner caption"
                      className="h-8 text-xs"
                      data-ocid={`homepage-banner-title-input.${idx + 1}`}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 shrink-0 hover:border-destructive/40 hover:text-destructive"
                  onClick={() => removeBanner(idx)}
                  aria-label="Remove banner"
                  data-ocid={`homepage-banner-remove-button.${idx + 1}`}
                >
                  <X size={13} />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          type="button"
          onClick={saveBanners}
          disabled={isSavingBanners}
          className="flex items-center gap-2"
          data-ocid="homepage-banner-save-button"
        >
          {isSavingBanners ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {isSavingBanners ? "Saving…" : "Save Banners"}
        </Button>
      </div>

      <div className="border-t border-border" />

      {/* ── Featured Products Section ── */}
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-base text-foreground">
            Featured Products
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select up to 4 products to feature on the homepage (2-column grid).
          </p>
          <p className="text-xs text-muted-foreground">
            Selected:{" "}
            <span className="font-semibold text-foreground">
              {selectedIds.length} / 4
            </span>
          </p>
        </div>

        {featuredLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : !products || products.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 border border-dashed border-border rounded-xl text-center"
            data-ocid="homepage-featured-empty-state"
          >
            <Package size={28} className="text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              No products yet. Add products first, then select featured ones.
            </p>
          </div>
        ) : (
          <div
            className="bg-card border border-border rounded-xl overflow-hidden"
            data-ocid="homepage-featured-list"
          >
            {products.map((product, idx) => {
              const isSelected = selectedIds.includes(product.id.toString());
              const firstImage = product.imageIds[0];
              return (
                <button
                  key={product.id.toString()}
                  type="button"
                  onClick={() => toggleFeatured(product.id.toString())}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-smooth ${
                    idx !== products.length - 1 ? "border-b border-border" : ""
                  } ${isSelected ? "bg-primary/5" : "hover:bg-muted/40"}`}
                  data-ocid={`homepage-featured-toggle.${idx + 1}`}
                >
                  {/* Checkbox area */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-smooth ${
                      isSelected ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                    {firstImage ? (
                      <img
                        src={firstImage}
                        alt={product.nameEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff
                          size={12}
                          className="text-muted-foreground/40"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {product.nameEn}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {product.nameBn}
                    </p>
                  </div>

                  {isSelected && (
                    <Star
                      size={14}
                      className="text-primary shrink-0 fill-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <Button
          type="button"
          onClick={saveFeatured}
          disabled={isSavingFeatured}
          className="flex items-center gap-2"
          data-ocid="homepage-featured-save-button"
        >
          {isSavingFeatured ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {isSavingFeatured ? "Saving…" : "Save Featured Products"}
        </Button>
      </div>
    </div>
  );
}

// ─── Categories Tab ───
function CategoriesTab() {
  const { data: categoryImages, isLoading } = useCategoryImages();

  const imageMap: Record<string, string> = {};
  if (categoryImages) {
    for (const ci of categoryImages) {
      imageMap[ci.slug] = ci.imageUrl;
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">How it works:</strong> Paste an
        image URL for each category and click Save. Changes appear immediately
        on the homepage and all city pages.
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {CATEGORY_SLUGS.map((s) => (
            <Skeleton key={s} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-ocid="categories-list">
          {CATEGORY_SLUGS.map((slug) => (
            <CategoryRow
              key={slug}
              slug={slug}
              currentImageUrl={imageMap[slug] ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───
export function AdminDashboardPage() {
  const { data: products, isLoading } = useProducts();
  const {
    data: inquiries,
    isLoading: isInquiriesLoading,
    error: inquiriesError,
  } = useInquiries();
  const deleteProduct = useDeleteProduct();
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<ActiveTab>("products");

  const ALL_CATEGORY_LABELS = Object.entries(PRODUCT_CATEGORY_LABELS).map(
    ([id, labels]) => ({ id, label: labels.en }),
  );
  const categoryFilters = [{ id: "all", label: "All" }, ...ALL_CATEGORY_LABELS];

  const filtered =
    activeCategory === "all"
      ? (products ?? [])
      : (products ?? []).filter((p) => p.category === activeCategory);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteProduct.mutateAsync(deleteTarget.id);
      toast.success("Product permanently deleted.");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete product.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const TAB_CONFIG: { id: ActiveTab; label: string; icon: React.ReactNode }[] =
    [
      {
        id: "products",
        label: "Products",
        icon: <Package size={14} />,
      },
      {
        id: "visitors",
        label: "Visitors",
        icon: <Users size={14} />,
      },
      {
        id: "homepage",
        label: "Homepage Manager",
        icon: <Star size={14} />,
      },
      {
        id: "categories",
        label: "Categories",
        icon: <ImageIcon size={14} />,
      },
    ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage products, homepage, categories, and visitors
          </p>
        </div>
        {activeTab === "products" && (
          <Link to="/admin/products/new">
            <Button
              className="flex items-center gap-2"
              data-ocid="admin-add-product-btn"
            >
              <Plus size={15} />
              Add Product
            </Button>
          </Link>
        )}
      </div>

      {/* Main Tabs */}
      <div
        className="flex gap-0.5 border-b border-border pb-0 overflow-x-auto scrollbar-hide"
        role="tablist"
        aria-label="Dashboard tabs"
      >
        {TAB_CONFIG.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-smooth -mb-px whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`admin-tab-${tab.id}`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === "products" && products && (
              <span className="ml-0.5 bg-muted text-muted-foreground text-xs rounded-full px-1.5 py-0.5 font-normal">
                {products.length}
              </span>
            )}
            {tab.id === "visitors" && inquiries && (
              <span className="ml-0.5 bg-muted text-muted-foreground text-xs rounded-full px-1.5 py-0.5 font-normal">
                {inquiries.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Products Tab ── */}
      {activeTab === "products" && (
        <>
          {/* Category filter pills */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide"
            role="tablist"
            aria-label="Filter by category"
          >
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-smooth border whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground"
                }`}
                data-ocid={`admin-filter-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border rounded-xl"
              data-ocid="admin-empty-state"
            >
              <Package size={40} className="text-muted-foreground/40 mb-4" />
              <p className="font-semibold text-foreground mb-1">
                No products yet
              </p>
              <p className="text-sm text-muted-foreground mb-5">
                Add your first clay idol product to get started.
              </p>
              <Link to="/admin/products/new">
                <Button size="sm" data-ocid="admin-empty-add-btn">
                  <Plus size={14} className="mr-1.5" />
                  Add First Product
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Image</span>
                <span>Product</span>
                <span className="text-right">Price</span>
                <span className="text-right">Actions</span>
              </div>

              {filtered.map((product, idx) => {
                const catLabel = PRODUCT_CATEGORY_LABELS[product.category] ?? {
                  en: product.category,
                };
                const firstImage = product.imageIds[0];

                return (
                  <div
                    key={product.id.toString()}
                    className={`grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto] gap-2 sm:gap-4 px-4 py-3.5 items-center ${
                      idx !== filtered.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                    data-ocid={`admin-product-row.${idx + 1}`}
                  >
                    <div className="hidden sm:block w-12 h-12 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={product.nameEn}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff
                            size={16}
                            className="text-muted-foreground/40"
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {product.nameEn}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {catLabel.en}
                        </Badge>
                        {product.priceRangeMin > 0n && (
                          <span className="text-xs text-muted-foreground font-mono">
                            ₹{product.priceRangeMin.toString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-sm text-foreground text-right font-mono hidden sm:block">
                      {product.priceRangeMin > 0n
                        ? `₹${product.priceRangeMin.toString()}`
                        : "—"}
                    </span>

                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        to="/admin/products/$productId/edit"
                        params={{ productId: product.id.toString() }}
                        data-ocid={`admin-edit-btn.${idx + 1}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2.5"
                        >
                          <Edit size={13} />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 hover:border-destructive/40 hover:text-destructive"
                        onClick={() =>
                          setDeleteTarget({
                            id: product.id,
                            name: product.nameEn,
                          })
                        }
                        data-ocid={`admin-delete-btn.${idx + 1}`}
                      >
                        <Trash2 size={13} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all" ? ` in ${activeCategory}` : " total"}
          </p>
        </>
      )}

      {/* ── Visitors Tab ── */}
      {activeTab === "visitors" && (
        <>
          {isInquiriesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : inquiriesError ? (
            <div
              className="flex flex-col items-center justify-center py-16 bg-card border border-dashed border-destructive/30 rounded-xl"
              data-ocid="admin-visitors-error-state"
            >
              <p className="font-semibold text-destructive mb-1">
                Unauthorized
              </p>
              <p className="text-sm text-muted-foreground">
                {inquiriesError instanceof Error
                  ? inquiriesError.message
                  : "Could not load visitor data."}
              </p>
            </div>
          ) : !inquiries || inquiries.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 bg-card border border-dashed border-border rounded-xl"
              data-ocid="admin-visitors-empty-state"
            >
              <Users size={40} className="text-muted-foreground/40 mb-4" />
              <p className="font-semibold text-foreground mb-1">
                No visitors yet
              </p>
              <p className="text-sm text-muted-foreground">
                Visitors who sign in and submit their details will appear here.
              </p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Name</span>
                <span>Phone</span>
                <span>Product Interest</span>
                <span>Date</span>
              </div>

              {inquiries.map((visitor, idx) => {
                const date = new Date(
                  Number(visitor.timestamp) * 1000,
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={visitor.id.toString()}
                    className={`grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 sm:gap-4 px-4 py-3.5 items-center ${
                      idx !== inquiries.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                    data-ocid={`admin-visitor-row.${idx + 1}`}
                  >
                    <p className="font-semibold text-sm text-foreground">
                      {visitor.name}
                    </p>
                    <a
                      href={`tel:${visitor.phone}`}
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-2 font-mono"
                      data-ocid={`admin-visitor-phone.${idx + 1}`}
                    >
                      <Phone size={12} />
                      {visitor.phone}
                    </a>
                    <p className="text-sm text-muted-foreground truncate">
                      {visitor.productInterest || "—"}
                    </p>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {date}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {inquiries && inquiries.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {inquiries.length} registered visitor
              {inquiries.length !== 1 ? "s" : ""}
            </p>
          )}
        </>
      )}

      {/* ── Homepage Manager Tab ── */}
      {activeTab === "homepage" && <HomepageManagerTab />}

      {/* ── Categories Tab ── */}
      {activeTab === "categories" && <CategoriesTab />}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setDeleteTarget(null);
        }}
      >
        <DialogContent data-ocid="admin-delete-dialog">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You are about to permanently delete{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.name}
              </span>
              .
              <br />
              <br />
              <span className="text-destructive font-medium">
                This will permanently delete this product and all its data. This
                cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
              data-ocid="admin-delete-cancel"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              data-ocid="admin-delete-confirm"
            >
              {isDeleting ? "Deleting…" : "Delete Permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
