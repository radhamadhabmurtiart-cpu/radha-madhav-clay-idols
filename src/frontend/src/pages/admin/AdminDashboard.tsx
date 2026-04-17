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
import { Skeleton } from "@/components/ui/skeleton";
import {
  useDeleteProduct,
  useInquiries,
  useProducts,
} from "@/hooks/useProducts";
import { PRODUCT_CATEGORY_LABELS } from "@/types/admin";
import { Link } from "@tanstack/react-router";
import {
  Edit,
  ImageOff,
  Package,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type DeleteTarget = { id: bigint; name: string } | null;
type ActiveTab = "products" | "visitors";

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

  const categories = [
    { id: "all", label: "All" },
    { id: "ganesh", label: "Ganesh" },
    { id: "lakshmi", label: "Lakshmi" },
    { id: "durga", label: "Durga" },
    { id: "saraswati", label: "Saraswati" },
    { id: "hanuman", label: "Hanuman" },
    { id: "custom", label: "Custom" },
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage products and view registered visitors
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
        className="flex gap-1.5 border-b border-border pb-0"
        role="tablist"
        aria-label="Dashboard tabs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "products"}
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-smooth -mb-px ${
            activeTab === "products"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="admin-tab-products"
        >
          <Package size={14} />
          Products
          {products && (
            <span className="ml-1 bg-muted text-muted-foreground text-xs rounded-full px-1.5 py-0.5 font-normal">
              {products.length}
            </span>
          )}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "visitors"}
          onClick={() => setActiveTab("visitors")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-smooth -mb-px ${
            activeTab === "visitors"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
          data-ocid="admin-tab-visitors"
        >
          <Users size={14} />
          Visitors
          {inquiries && (
            <span className="ml-1 bg-muted text-muted-foreground text-xs rounded-full px-1.5 py-0.5 font-normal">
              {inquiries.length}
            </span>
          )}
        </button>
      </div>

      {/* ── Products Tab ── */}
      {activeTab === "products" && (
        <>
          {/* Category filter tabs */}
          <div
            className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-smooth border whitespace-nowrap ${
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

          {/* Product List */}
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
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <span>Image</span>
                <span>Product</span>
                <span className="text-right">Price Range</span>
                <span className="text-center">Bulk</span>
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
                    className={`grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto_auto] gap-2 sm:gap-4 px-4 py-3.5 items-center ${
                      idx !== filtered.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                    data-ocid={`admin-product-row-${product.id}`}
                  >
                    {/* Thumbnail */}
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

                    {/* Name + category */}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {product.nameEn}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {product.nameBn}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {catLabel.en}
                        </Badge>
                        {product.imageIds.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {product.imageIds.length} photo
                            {product.imageIds.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <span className="text-sm text-foreground text-right font-mono">
                      ₹{product.priceRangeMin.toString()}–
                      {product.priceRangeMax.toString()}
                    </span>

                    {/* Bulk */}
                    <span className="text-center">
                      {product.bulkAvailable ? (
                        <Badge
                          variant="outline"
                          className="text-xs border-primary/40 text-primary"
                        >
                          Bulk ✓
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs text-muted-foreground"
                        >
                          No bulk
                        </Badge>
                      )}
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        to="/admin/products/$productId/edit"
                        params={{ productId: product.id.toString() }}
                        data-ocid={`admin-edit-btn-${product.id}`}
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
                        data-ocid={`admin-delete-btn-${product.id}`}
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
              {/* Table header */}
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
                    data-ocid={`admin-visitor-row-${idx + 1}`}
                  >
                    <p className="font-semibold text-sm text-foreground">
                      {visitor.name}
                    </p>
                    <a
                      href={`tel:${visitor.phone}`}
                      className="flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-2 font-mono"
                      data-ocid={`admin-visitor-phone-${idx + 1}`}
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
                This will permanently delete this product and all its images.
                This cannot be undone.
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
