import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Hardcoded fallback images matching Home.tsx PRODUCT_CATEGORIES ───
const CATEGORY_META: Record<
  string,
  { nameBn: string; nameEn: string; fallbackImage: string }
> = {
  "bangla-lakshmi-ganesh": {
    nameBn: "বাংলা লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Bangla Lakshmi Ganesh Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lakshmi_and_Ganesh.jpg/640px-Lakshmi_and_Ganesh.jpg",
  },
  "clay-ganesh-idol-wholesale": {
    nameBn: "মাটির গণেশ মূর্তি পাইকারি",
    nameEn: "Clay Ganesh Idol – Wholesale",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Clay_Ganesha.jpg/640px-Clay_Ganesha.jpg",
  },
  "clay-vishwakarma-idol": {
    nameBn: "মাটির বিশ্বকর্মা মূর্তি",
    nameEn: "Clay Vishwakarma Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vishwakarma.jpg/640px-Vishwakarma.jpg",
  },
  "clay-lakshmi-idol": {
    nameBn: "মাটির লক্ষ্মী মূর্তি",
    nameEn: "Clay Lakshmi Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Lakshmi.jpg/640px-Lakshmi.jpg",
  },
  "diwali-lakshmi-ganesh-idol": {
    nameBn: "দীপাবলি লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Diwali Lakshmi Ganesh Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Diwali_Lakshmi-Ganesh.jpg/640px-Diwali_Lakshmi-Ganesh.jpg",
  },
  "clay-kali-idol": {
    nameBn: "মাটির কালী মূর্তি",
    nameEn: "Clay Kali Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Goddess_kali_idol.jpg/640px-Goddess_kali_idol.jpg",
  },
  "small-durga-idol": {
    nameBn: "ছোট দুর্গা মূর্তি",
    nameEn: "Small Durga Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Durga_idol.jpg/640px-Durga_idol.jpg",
  },
  "radha-krishna-clay-idol": {
    nameBn: "রাধা-কৃষ্ণ মাটির মূর্তি",
    nameEn: "Radha Krishna Clay Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Radha_Krishna.jpg/640px-Radha_Krishna.jpg",
  },
  "clay-kartik-idol": {
    nameBn: "মাটির কার্তিক মূর্তি",
    nameEn: "Clay Kartik Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kartik_idol.jpg/640px-Kartik_idol.jpg",
  },
  "clay-saraswati-idol": {
    nameBn: "মাটির সরস্বতী মূর্তি",
    nameEn: "Clay Saraswati Idol",
    fallbackImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saraswati_clay_idol.jpg/640px-Saraswati_clay_idol.jpg",
  },
  "custom-clay-idol": {
    nameBn: "কাস্টম মাটির মূর্তি",
    nameEn: "Custom Clay Idol",
    fallbackImage: "",
  },
};

const SLUGS = Object.keys(CATEGORY_META);

// ─── Hook ───
function useCategoryImageActor() {
  return useActor(createActor);
}

function useCategoryImages() {
  const { actor, isFetching } = useCategoryImageActor();
  return useQuery({
    queryKey: ["categoryImages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryImages();
    },
    enabled: !!actor && !isFetching,
  });
}

function useUpdateCategoryImage() {
  const { actor } = useCategoryImageActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      slug,
      imageUrl,
    }: { slug: string; imageUrl: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const token = localStorage.getItem("adminSessionToken");
      const ok = await actor.updateCategoryImage(slug, imageUrl, token);
      if (!ok) throw new Error("Failed to update image");
      return ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryImages"] });
    },
  });
}

// ─── Category Row Component ───
interface CategoryRowProps {
  slug: string;
  currentImageUrl: string;
}

function CategoryRow({ slug, currentImageUrl }: CategoryRowProps) {
  const meta = CATEGORY_META[slug];
  const updateImage = useUpdateCategoryImage();
  const [inputUrl, setInputUrl] = useState(currentImageUrl);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const [isSaving, setIsSaving] = useState(false);

  // Sync when parent data changes
  useEffect(() => {
    setInputUrl(currentImageUrl);
    setPreviewUrl(currentImageUrl);
  }, [currentImageUrl]);

  const displayImage = previewUrl || meta.fallbackImage;

  async function handleSave() {
    setIsSaving(true);
    try {
      await updateImage.mutateAsync({ slug, imageUrl: inputUrl.trim() });
      setPreviewUrl(inputUrl.trim());
      toast.success(`"${meta.nameEn}" image updated!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save image.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-4"
      data-ocid={`category-image-row-${slug}`}
    >
      {/* Image Preview */}
      <div className="w-full sm:w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
        {displayImage ? (
          <img
            src={displayImage}
            alt={meta.nameEn}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <ImageIcon size={24} className="text-muted-foreground/40" />
        )}
      </div>

      {/* Info + Input */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div>
          <p className="font-semibold text-sm text-foreground">{meta.nameEn}</p>
          <p className="text-xs text-muted-foreground">{meta.nameBn}</p>
          <p className="text-xs text-muted-foreground/60 font-mono mt-0.5">
            /{slug}
          </p>
        </div>

        <div className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <Label htmlFor={`img-url-${slug}`} className="text-xs">
              Image URL
            </Label>
            <Input
              id={`img-url-${slug}`}
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="h-8 text-xs"
              data-ocid={`category-image-input-${slug}`}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="h-8 px-3 shrink-0"
            onClick={handleSave}
            disabled={isSaving || inputUrl.trim() === currentImageUrl}
            data-ocid={`category-image-save-${slug}`}
          >
            {isSaving ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} />
            )}
            <span className="ml-1.5">{isSaving ? "Saving…" : "Save"}</span>
          </Button>
        </div>

        {currentImageUrl && (
          <p className="text-xs text-muted-foreground truncate">
            Current:{" "}
            <span className="font-mono text-foreground/70">
              {currentImageUrl}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Page ───
export function AdminCategoryImagesPage() {
  const { data: categoryImages, isLoading } = useCategoryImages();
  const navigate = useNavigate();

  // Build a slug → url map from backend data
  const imageMap: Record<string, string> = {};
  if (categoryImages) {
    for (const ci of categoryImages) {
      imageMap[ci.slug] = ci.imageUrl;
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/admin" })}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Category Images
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Update the image shown for each product category on the website.
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">How it works:</strong> Paste an
        image URL in the box and click Save. The new image will appear on the
        homepage and all city pages immediately. If no URL is set, the default
        image is used.
      </div>

      {/* Category rows */}
      {isLoading ? (
        <div className="space-y-3">
          {SLUGS.map((s) => (
            <Skeleton key={s} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-ocid="category-images-list">
          {SLUGS.map((slug) => (
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
