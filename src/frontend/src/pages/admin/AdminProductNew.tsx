import { ProductCategory as PC } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddProduct } from "@/hooks/useProducts";
import {
  type AddProductInput,
  PRODUCT_CATEGORY_LABELS,
  type ProductCategory,
} from "@/types/admin";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SimpleForm {
  nameEn: string;
  category: ProductCategory;
  imageUrl: string;
  price: string;
  description: string;
}

const EMPTY: SimpleForm = {
  nameEn: "",
  category: PC.ganesh,
  imageUrl: "",
  price: "",
  description: "",
};

export function AdminProductNewPage() {
  const [form, setForm] = useState<SimpleForm>(EMPTY);
  const addProduct = useAddProduct();
  const navigate = useNavigate();

  function update<K extends keyof SimpleForm>(field: K, value: SimpleForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function buildInput(): AddProductInput {
    const price = Number.parseInt(form.price, 10);
    const priceBig = BigInt(Number.isNaN(price) || price < 0 ? 0 : price);
    return {
      nameEn: form.nameEn.trim(),
      nameBn: form.nameEn.trim(),
      descriptionEn: form.description.trim(),
      descriptionBn: form.description.trim(),
      category: form.category,
      sizes: [],
      priceRangeMin: priceBig,
      priceRangeMax: priceBig,
      bulkAvailable: true,
      imageIds: form.imageUrl.trim() ? [form.imageUrl.trim()] : [],
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nameEn.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!form.imageUrl.trim()) {
      toast.error("Image URL is required.");
      return;
    }
    try {
      await addProduct.mutateAsync(buildInput());
      toast.success("Product added successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to add product.",
      );
    }
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
            Add New Product
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fill in the 5 fields below to add a product.
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
            placeholder="e.g. Ganesh Idol 2ft"
            required
            data-ocid="admin-form-name"
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

        {/* Image URL */}
        <div className="space-y-1.5">
          <Label htmlFor="imageUrl">Image URL *</Label>
          <Input
            id="imageUrl"
            type="url"
            value={form.imageUrl}
            onChange={(e) => update("imageUrl", e.target.value)}
            placeholder="https://example.com/idol-image.jpg"
            required
            data-ocid="admin-form-image-url"
          />
          {form.imageUrl.trim() && (
            <div className="w-full h-36 rounded-lg overflow-hidden border border-border bg-muted mt-2">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Paste a direct image link. The preview above updates automatically.
          </p>
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
            data-ocid="admin-form-price"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="description">Description — optional</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Brief product description…"
            rows={3}
            data-ocid="admin-form-description"
          />
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
            data-ocid="admin-form-cancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
