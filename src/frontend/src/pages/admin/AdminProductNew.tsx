import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAddProduct } from "@/hooks/useProducts";
import {
  EMPTY_PRODUCT_FORM,
  PRODUCT_CATEGORY_LABELS,
  type ProductCategory,
  type ProductFormData,
  formDataToAddInput,
} from "@/types/admin";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ImagePlus, Loader2, Save, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface ImagePreview {
  id: string;
  dataUrl: string;
  name: string;
}

export function AdminProductNewPage() {
  const [form, setForm] = useState<ProductFormData>(EMPTY_PRODUCT_FORM);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addProduct = useAddProduct();
  const navigate = useNavigate();

  function update(
    field: keyof ProductFormData,
    value: string | boolean | string[],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                dataUrl: e.target?.result as string,
                name: file.name,
              });
            reader.onerror = reject;
            reader.readAsDataURL(file);
          }),
      ),
    );

    setImages((prev) => {
      const combined = [...prev, ...results];
      // Update imageIds in form
      setForm((f) => ({
        ...f,
        imageIds: combined.map((img) => img.dataUrl),
      }));
      return combined;
    });
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setForm((f) => ({ ...f, imageIds: next.map((img) => img.dataUrl) }));
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
    if (!form.nameBn.trim() || !form.nameEn.trim()) {
      toast.error("Both Bengali and English names are required.");
      return;
    }
    try {
      await addProduct.mutateAsync(formDataToAddInput(form));
      toast.success("Product added successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to add product.",
      );
    }
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
            Add New Product
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the details below to add a new clay idol product.
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
              placeholder="e.g. Ganesh Idol"
              required
              data-ocid="admin-form-name-en"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nameBn">Name (Bengali) *</Label>
            <Input
              id="nameBn"
              value={form.nameBn}
              onChange={(e) => update("nameBn", e.target.value)}
              placeholder="যেমন: গণেশ মূর্তি"
              required
              data-ocid="admin-form-name-bn"
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
            data-ocid="admin-form-category"
          >
            {(Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[]).map(
              (cat) => (
                <option key={cat} value={cat}>
                  {PRODUCT_CATEGORY_LABELS[cat].en}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Descriptions */}
        <div className="space-y-1.5">
          <Label htmlFor="descriptionEn">Description (English)</Label>
          <Textarea
            id="descriptionEn"
            value={form.descriptionEn}
            onChange={(e) => update("descriptionEn", e.target.value)}
            placeholder="Describe the product in English…"
            rows={3}
            data-ocid="admin-form-desc-en"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="descriptionBn">Description (Bengali)</Label>
          <Textarea
            id="descriptionBn"
            value={form.descriptionBn}
            onChange={(e) => update("descriptionBn", e.target.value)}
            placeholder="পণ্যের বিবরণ বাংলায় লিখুন…"
            rows={3}
            data-ocid="admin-form-desc-bn"
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
            data-ocid="admin-form-sizes"
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
              placeholder="500"
              data-ocid="admin-form-price-min"
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
              placeholder="2000"
              data-ocid="admin-form-price-max"
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
            data-ocid="admin-form-bulk-toggle"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <Label>Product Images</Label>

          {/* Drop zone */}
          <button
            type="button"
            aria-label="Upload product images"
            className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-smooth ${
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
            data-ocid="admin-form-image-dropzone"
          >
            <ImagePlus
              size={28}
              className="mx-auto mb-2 text-muted-foreground/60"
            />
            <p className="text-sm font-medium text-foreground">
              Click or drag images here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
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
            data-ocid="admin-form-image-input"
          />

          {/* Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
                >
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                    aria-label={`Remove image ${img.name}`}
                    data-ocid={`admin-form-remove-image-${img.id}`}
                  >
                    <X size={12} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            First image will be shown as the main product photo.{" "}
            {images.length > 0 &&
              `${images.length} image${images.length !== 1 ? "s" : ""} added.`}
          </p>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            disabled={addProduct.isPending}
            className="flex items-center gap-2"
            data-ocid="admin-form-submit"
          >
            {addProduct.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {addProduct.isPending ? "Saving…" : "Save Product"}
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
