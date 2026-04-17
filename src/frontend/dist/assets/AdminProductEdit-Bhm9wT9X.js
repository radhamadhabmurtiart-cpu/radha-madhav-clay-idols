import { i as useParams, l as useNavigate, r as reactExports, j as jsxRuntimeExports, g as Skeleton, B as Button, h as Label, I as Input, X } from "./index-DOyg_51M.js";
import { P as ProductCategory, S as Switch, I as ImagePlus } from "./switch-DtZEWlHv.js";
import { T as Textarea } from "./textarea-CgX1Kasv.js";
import { a as useProduct, e as useUpdateProduct } from "./useProducts-CYU6srW_.js";
import { p as productToFormData, g as PRODUCT_CATEGORY_LABELS, i as formDataToUpdateInput } from "./admin-C8pegwRz.js";
import { u as ue } from "./index-vZ8YyM8f.js";
import { A as ArrowLeft } from "./arrow-left-xruXMhMk.js";
import { L as LoaderCircle } from "./loader-circle-BJ5ggpKX.js";
import { S as Save } from "./save-BD7TFMNg.js";
import "./useMutation-BmzX82yr.js";
function AdminProductEditPage() {
  const params = useParams({ from: "/admin/products/$productId/edit" });
  const productId = BigInt(params.productId);
  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(null);
  const [images, setImages] = reactExports.useState([]);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (product && !form) {
      setForm(productToFormData(product));
      setImages(
        product.imageIds.map((imageId, idx) => ({
          id: `existing-${idx}-${imageId.slice(0, 16)}`,
          dataUrl: imageId,
          name: "existing",
          isExisting: true
        }))
      );
    }
  }, [product, form]);
  function update(field, value) {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  }
  function syncImageIds(updatedImages) {
    setForm(
      (f) => f ? { ...f, imageIds: updatedImages.map((img) => img.dataUrl) } : f
    );
  }
  async function readFilesAsDataUrls(files) {
    const fileArray = Array.from(files).filter(
      (f) => f.type.startsWith("image/")
    );
    if (fileArray.length === 0) return;
    const results = await Promise.all(
      fileArray.map(
        (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            var _a;
            return resolve({
              id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
              dataUrl: (_a = e.target) == null ? void 0 : _a.result,
              name: file.name,
              isExisting: false
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    );
    setImages((prev) => {
      const combined = [...prev, ...results];
      syncImageIds(combined);
      return combined;
    });
  }
  function removeImage(index) {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      syncImageIds(next);
      return next;
    });
  }
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      readFilesAsDataUrls(e.dataTransfer.files);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    if (!form.nameBn.trim() || !form.nameEn.trim()) {
      ue.error("Both Bengali and English names are required.");
      return;
    }
    try {
      await updateProduct.mutateAsync(formDataToUpdateInput(productId, form));
      ue.success("Product updated successfully!");
      window.history.length > 1 ? window.history.back() : navigate({ to: "/admin" });
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to update product."
      );
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full rounded-xl" })
    ] });
  }
  if (!product || !form) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Product not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "mt-4",
          onClick: () => navigate({ to: "/admin" }),
          children: "Back to Products"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          className: "p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth",
          "aria-label": "Go back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Edit Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: product.nameEn })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-card border border-border rounded-xl p-6 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nameEn", children: "Name (English) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "nameEn",
                  value: form.nameEn,
                  onChange: (e) => update("nameEn", e.target.value),
                  required: true,
                  "data-ocid": "admin-edit-name-en"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nameBn", children: "Name (Bengali) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "nameBn",
                  value: form.nameBn,
                  onChange: (e) => update("nameBn", e.target.value),
                  required: true,
                  "data-ocid": "admin-edit-name-bn"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", children: "Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "category",
                value: form.category,
                onChange: (e) => update("category", e.target.value),
                className: "w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": "admin-edit-category",
                children: Object.values(ProductCategory).map((cat) => {
                  var _a;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: ((_a = PRODUCT_CATEGORY_LABELS[cat]) == null ? void 0 : _a.en) ?? cat }, cat);
                })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "descriptionEn", children: "Description (English)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "descriptionEn",
                value: form.descriptionEn,
                onChange: (e) => update("descriptionEn", e.target.value),
                rows: 3,
                "data-ocid": "admin-edit-desc-en"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "descriptionBn", children: "Description (Bengali)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "descriptionBn",
                value: form.descriptionBn,
                onChange: (e) => update("descriptionBn", e.target.value),
                rows: 3,
                "data-ocid": "admin-edit-desc-bn"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sizes", children: "Available Sizes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "sizes",
                value: form.sizes,
                onChange: (e) => update("sizes", e.target.value),
                placeholder: "e.g. 1ft, 2ft, 3ft, 4ft",
                "data-ocid": "admin-edit-sizes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Separate sizes with commas" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "priceMin", children: "Min Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "priceMin",
                  type: "number",
                  min: "0",
                  value: form.priceRangeMin,
                  onChange: (e) => update("priceRangeMin", e.target.value),
                  "data-ocid": "admin-edit-price-min"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "priceMax", children: "Max Price (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "priceMax",
                  type: "number",
                  min: "0",
                  value: form.priceRangeMax,
                  onChange: (e) => update("priceRangeMax", e.target.value),
                  "data-ocid": "admin-edit-price-max"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: "Bulk Orders Available" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: 'Show "Bulk Order Available" badge on this product' })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: form.bulkAvailable,
                onCheckedChange: (val) => update("bulkAvailable", val),
                "data-ocid": "admin-edit-bulk-toggle"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Images" }),
            images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-3", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: img.dataUrl,
                      alt: img.isExisting ? `Product image ${i + 1}` : img.name,
                      className: "w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeImage(i),
                      className: "absolute top-1 right-1 w-6 h-6 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
                      "aria-label": `Remove image ${i + 1}`,
                      "data-ocid": `admin-edit-remove-image-${img.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                    }
                  ),
                  i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium", children: "Main" }),
                  img.isExisting && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1 left-1 text-xs bg-secondary/90 text-secondary-foreground px-1 py-0.5 rounded font-medium", children: "Saved" })
                ]
              },
              img.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-label": "Add more product images",
                className: `w-full border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-smooth ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`,
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                onDragOver: (e) => {
                  e.preventDefault();
                  setIsDragging(true);
                },
                onDragLeave: () => setIsDragging(false),
                onDrop: handleDrop,
                "data-ocid": "admin-edit-image-dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ImagePlus,
                    {
                      size: 22,
                      className: "mx-auto mb-1.5 text-muted-foreground/60"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: images.length > 0 ? "Add more images" : "Click or drag images here" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "JPG, PNG, WEBP — multiple images supported" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/*",
                multiple: true,
                className: "hidden",
                onChange: (e) => e.target.files && readFilesAsDataUrls(e.target.files),
                "data-ocid": "admin-edit-image-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              images.length,
              " image",
              images.length !== 1 ? "s" : "",
              " total. First image is the main product photo."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: updateProduct.isPending,
                className: "flex items-center gap-2",
                "data-ocid": "admin-edit-submit",
                children: [
                  updateProduct.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                  updateProduct.isPending ? "Saving…" : "Save Changes"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/admin" }),
                children: "Cancel"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  AdminProductEditPage
};
