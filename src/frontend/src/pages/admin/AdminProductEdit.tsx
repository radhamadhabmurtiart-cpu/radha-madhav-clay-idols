import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import {
  PRODUCT_CATEGORY_LABELS,
  type ProductCategory,
  type UpdateProductInput,
} from "@/types/admin";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SimpleForm {
  nameEn: string;
  category: ProductCategory;
  imageFileId: string;
  price: string;
  description: string;
}

export function AdminProductEditPage() {
  const params = useParams({ from: "/admin/products/$productId/edit" });
  const productId = BigInt(params.productId);
  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();
  const navigate = useNavigate();

  const [form, setForm] = useState<SimpleForm | null>(null);

  useEffect(() => {
    if (product && !form) {
      setForm({
        nameEn: product.nameEn,
        category: product.category,
        imageFileId: product.imageIds[0] ?? "",
        price:
          product.priceRangeMin > 0n ? product.priceRangeMin.toString() : "",
        description: product.descriptionEn,
      });
    }
  }, [product, form]);

  function update<K extends keyof SimpleForm>(field: K, value: SimpleForm[K]) {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  function buildInput(): UpdateProductInput {
    if (!form) throw new Error("Form not ready");
    const price = Number.parseInt(form.price, 10);
    const priceBig = BigInt(Number.isNaN(price) || price < 0 ? 0 : price);
    return {
      id: productId,
      nameEn: form.nameEn.trim(),
      nameBn: form.nameEn.trim(),
      descriptionEn: form.description.trim(),
      descriptionBn: form.description.trim(),
      category: form.category,
      sizes: product?.sizes ?? [],
      priceRangeMin: priceBig,
      priceRangeMax: priceBig,
      bulkAvailable: product?.bulkAvailable ?? true,
      imageIds: form.imageFileId.trim() ? [form.imageFileId.trim()] : [],
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!form.nameEn.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!form.imageFileId.trim()) {
      toast.error("Please upload a product image.");
      return;
    }
    try {
      await updateProduct.mutateAsync(buildInput());
      toast.success("Product updated successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      console.error("Product update failed:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to update product.",
      );
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-lg space-y-4">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  if (!product || !form) {
    return (
      <div className="max-w-lg py-12 text-center">
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
    <div className="max-w-lg space-y-6">
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
          <p className="text-sm text-muted-foreground mt-0.5 truncate max-w-xs">
            {product.nameEn}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-xl p-6 space-y-5"
      >
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="nameEn">Product Name *</Label>
          <Input
            id="nameEn"
            value={form.nameEn}
            onChange={(e) => update("nameEn", e.target.value)}
            required
            data-ocid="admin-edit-name"
          />
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
            {(Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[]).map(
              (cat) => (
                <option key={cat} value={cat}>
                  {PRODUCT_CATEGORY_LABELS[cat].en}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Image Upload */}
        <div className="space-y-1.5">
          <Label>Product Image *</Label>
          <ImageUpload
            fileId={form.imageFileId}
            onChange={(id) => update("imageFileId", id)}
            ocid="admin-edit-image"
          />
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <Label htmlFor="price">Price (₹) — optional</Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="e.g. 500"
            data-ocid="admin-edit-price"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description — optional</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            data-ocid="admin-edit-description"
          />
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
            {updateProduct.isPending ? "Saving…" : "Save Details"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/admin" })}
            data-ocid="admin-edit-cancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
