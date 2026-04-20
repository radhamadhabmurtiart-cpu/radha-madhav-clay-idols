import { createActor } from "@/backend";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Hardcoded fallback meta matching Home.tsx PRODUCT_CATEGORIES ───
const CATEGORY_META: Record<string, { nameBn: string; nameEn: string }> = {
  "bangla-lakshmi-ganesh": {
    nameBn: "বাংলা লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Bangla Lakshmi Ganesh Idol",
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

const SLUGS = Object.keys(CATEGORY_META);

// ─── Hooks ───
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
  currentFileId: string;
}

function CategoryRow({ slug, currentFileId }: CategoryRowProps) {
  const meta = CATEGORY_META[slug];
  const updateImage = useUpdateCategoryImage();
  const [fileId, setFileId] = useState(currentFileId);
  const [isSaving, setIsSaving] = useState(false);

  // Sync when parent data changes
  useEffect(() => {
    setFileId(currentFileId);
  }, [currentFileId]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await updateImage.mutateAsync({ slug, imageUrl: fileId.trim() });
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
      {/* Image Upload */}
      <div className="w-full sm:w-52 shrink-0">
        <ImageUpload
          fileId={fileId}
          onChange={setFileId}
          ocid={`category-image-upload-${slug}`}
        />
      </div>

      {/* Info + Save */}
      <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
        <div>
          <p className="font-semibold text-sm text-foreground">{meta.nameEn}</p>
          <p className="text-xs text-muted-foreground">{meta.nameBn}</p>
          <p className="text-xs text-muted-foreground/60 font-mono mt-0.5">
            /{slug}
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          className="h-8 px-4 w-fit"
          onClick={handleSave}
          disabled={isSaving || fileId.trim() === currentFileId}
          data-ocid={`category-image-save-${slug}`}
        >
          {isSaving ? (
            <Loader2 size={13} className="animate-spin mr-1.5" />
          ) : (
            <Save size={13} className="mr-1.5" />
          )}
          {isSaving ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}

// ─── Page ───
export function AdminCategoryImagesPage() {
  const { data: categoryImages, isLoading } = useCategoryImages();
  const navigate = useNavigate();

  // Build a slug → fileId/url map from backend data
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
            Upload an image for each product category.
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm text-muted-foreground">
        <strong className="text-foreground">How it works:</strong> Click "Choose
        Image" to upload a file from your device, then click Save. The new image
        will appear on the homepage and all city pages immediately.
      </div>

      {/* Category rows */}
      {isLoading ? (
        <div className="space-y-3">
          {SLUGS.map((s) => (
            <Skeleton key={s} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-ocid="category-images-list">
          {SLUGS.map((slug) => (
            <CategoryRow
              key={slug}
              slug={slug}
              currentFileId={imageMap[slug] ?? ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
