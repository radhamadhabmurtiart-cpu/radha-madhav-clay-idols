import { ProductCategory } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import {
  PRODUCT_CATEGORY_LABELS,
  type ProductFormData,
  formDataToUpdateInput,
  productToFormData,
} from "@/types/admin";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, Loader2, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ImagePreview {
  id: string;
  dataUrl: string;
  name: string;
  isExisting?: boolean;
}

export function AdminProductEditPage() {
  const params = useParams({ from: "/admin/products/$productId/edit" });
  const productId = BigInt(params.productId);
  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductFormData | null>(null);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product && !form) {
      setForm(productToFormData(product));
      setImages(
        product.imageIds.map((imageId, idx) => ({
          id: `existing-${idx}-${imageId.slice(0, 16)}`,
          dataUrl: imageId,
          name: "existing",
          isExisting: true,
        })),
      );
    }
  }, [product, form]);

  function update(
    field: keyof ProductFormData,
    value: string | boolean | string[],
  ) {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  function syncImageIds(updatedImages: ImagePreview[]) {
    setForm((f) =>
      f ? { ...f, imageIds: updatedImages.map((img) => img.dataUrl) } : f,
    );
  }

  async function readFilesAsDataUrls(files: FileList | File[]): Promise<void> {
    const fileArray = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (fileArray.length === 0) return;

    const results = await Promise.all(
      fileArray.map(
        (file) =>
          new Promise<ImagePreview>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) =>
              resolve({
                id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                dataUrl: e.target?.result as string,
                name: file.name,
                isExisting: false,
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
    );

    setImages((prev) => {
      const combined = [...prev, ...results];
      syncImageIds(combined);
      return combined;
    });
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      syncImageIds(next);
      return next;
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      readFilesAsDataUrls(e.dataTransfer.files);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!form.nameBn.trim() || !form.nameEn.trim()) {
      toast.error("Both Bengali and English names are required.");
      return;
    }
    try {
      await updateProduct.mutateAsync(formDataToUpdateInput(productId, form));
      toast.success("Product updated successfully!");
      // Go back to the previous page (admin dashboard or product list)
      window.history.length > 1
        ? window.history.back()
        : navigate({ to: "/admin" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update product.",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!product || !form) {
    return (
      <div className="max-w-2xl py-12 text-center">
        <p className="font-semibold text-foreground">Product not found.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate({ to: "/admin" })}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
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
            Edit Product
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {product.nameEn}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 space-y-5"
      >
        {/* Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="nameEn">Name (English) *</Label>
            <Input
              id="nameEn"
              value={form.nameEn}
              onChange={(e) => update("nameEn", e.target.value)}
              required
              data-ocid="admin-edit-name-en"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nameBn">Name (Bengali) *</Label>
            <Input
              id="nameBn"
              value={form.nameBn}
              onChange={(e) => update("nameBn", e.target.value)}
              required
              data-ocid="admin-edit-name-bn"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            value={form.category}
            onChange={(e) =>
              update("category", e.target.value as ProductCategory)
            }
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="admin-edit-category"
          >
            {Object.values(ProductCategory).map((cat) => (
              <option key={cat} value={cat}>
                {PRODUCT_CATEGORY_LABELS[cat]?.en ?? cat}
              </option>
            ))}
          </select>
        </div>

        {/* Descriptions */}
        <div className="space-y-1.5">
          <Label htmlFor="descriptionEn">Description (English)</Label>
          <Textarea
            id="descriptionEn"
            value={form.descriptionEn}
            onChange={(e) => update("descriptionEn", e.target.value)}
            rows={3}
            data-ocid="admin-edit-desc-en"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="descriptionBn">Description (Bengali)</Label>
          <Textarea
            id="descriptionBn"
            value={form.descriptionBn}
            onChange={(e) => update("descriptionBn", e.target.value)}
            rows={3}
            data-ocid="admin-edit-desc-bn"
          />
        </div>

        {/* Sizes */}
        <div className="space-y-1.5">
          <Label htmlFor="sizes">Available Sizes</Label>
          <Input
            id="sizes"
            value={form.sizes}
            onChange={(e) => update("sizes", e.target.value)}
            placeholder="e.g. 1ft, 2ft, 3ft, 4ft"
            data-ocid="admin-edit-sizes"
          />
          <p className="text-xs text-muted-foreground">
            Separate sizes with commas
          </p>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="priceMin">Min Price (₹)</Label>
            <Input
              id="priceMin"
              type="number"
              min="0"
              value={form.priceRangeMin}
              onChange={(e) => update("priceRangeMin", e.target.value)}
              data-ocid="admin-edit-price-min"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="priceMax">Max Price (₹)</Label>
            <Input
              id="priceMax"
              type="number"
              min="0"
              value={form.priceRangeMax}
              onChange={(e) => update("priceRangeMax", e.target.value)}
              data-ocid="admin-edit-price-max"
            />
          </div>
        </div>

        {/* Bulk Available */}
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <p className="font-medium text-sm text-foreground">
              Bulk Orders Available
            </p>
            <p className="text-xs text-muted-foreground">
              Show "Bulk Order Available" badge on this product
            </p>
          </div>
          <Switch
            checked={form.bulkAvailable}
            onCheckedChange={(val) => update("bulkAvailable", val)}
            data-ocid="admin-edit-bulk-toggle"
          />
        </div>

        {/* Image Gallery */}
        <div className="space-y-3">
          <Label>Product Images</Label>

          {/* Existing + new images grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
                >
                  <img
                    src={img.dataUrl}
                    alt={img.isExisting ? `Product image ${i + 1}` : img.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                    aria-label={`Remove image ${i + 1}`}
                    data-ocid={`admin-edit-remove-image-${img.id}`}
                  >
                    <X size={12} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                      Main
                    </span>
                  )}
                  {img.isExisting && (
                    <span className="absolute top-1 left-1 text-xs bg-secondary/90 text-secondary-foreground px-1 py-0.5 rounded font-medium">
                      Saved
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Drop zone */}
          <button
            type="button"
            aria-label="Add more product images"
            className={`w-full border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-smooth ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            data-ocid="admin-edit-image-dropzone"
          >
            <ImagePlus
              size={22}
              className="mx-auto mb-1.5 text-muted-foreground/60"
            />
            <p className="text-sm font-medium text-foreground">
              {images.length > 0
                ? "Add more images"
                : "Click or drag images here"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              JPG, PNG, WEBP — multiple images supported
            </p>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) =>
              e.target.files && readFilesAsDataUrls(e.target.files)
            }
            data-ocid="admin-edit-image-input"
          />

          <p className="text-xs text-muted-foreground">
            {images.length} image{images.length !== 1 ? "s" : ""} total. First
            image is the main product photo.
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={updateProduct.isPending}
            className="flex items-center gap-2"
            data-ocid="admin-edit-submit"
          >
            {updateProduct.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {updateProduct.isPending ? "Saving…" : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin" })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
