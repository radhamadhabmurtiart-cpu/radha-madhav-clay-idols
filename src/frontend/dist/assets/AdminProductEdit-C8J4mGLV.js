import { i as useParams, l as useNavigate, r as reactExports, j as jsxRuntimeExports, g as Skeleton, B as Button, h as Label, I as Input, n as ue } from "./index-9P4jIzoX.js";
import { P as PRODUCT_CATEGORY_LABELS, I as ImageUpload, S as Save } from "./admin-DuxlZ-lR.js";
import { T as Textarea } from "./textarea-BE2b59oG.js";
import { b as useProduct, f as useUpdateProduct } from "./useProducts-imxoOUqf.js";
import { A as ArrowLeft } from "./arrow-left-BspXt7Rj.js";
import { L as LoaderCircle } from "./loader-circle-DqCi7apI.js";
import "./useMutation-BESTmnje.js";
function AdminProductEditPage() {
  const params = useParams({ from: "/admin/products/$productId/edit" });
  const productId = BigInt(params.productId);
  const { data: product, isLoading } = useProduct(productId);
  const updateProduct = useUpdateProduct();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (product && !form) {
      setForm({
        nameEn: product.nameEn,
        category: product.category,
        imageFileId: product.imageIds[0] ?? "",
        price: product.priceRangeMin > 0n ? product.priceRangeMin.toString() : "",
        description: product.descriptionEn
      });
    }
  }, [product, form]);
  function update(field, value) {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  }
  function buildInput() {
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
      sizes: (product == null ? void 0 : product.sizes) ?? [],
      priceRangeMin: priceBig,
      priceRangeMax: priceBig,
      bulkAvailable: (product == null ? void 0 : product.bulkAvailable) ?? true,
      imageIds: form.imageFileId.trim() ? [form.imageFileId.trim()] : []
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    if (!form.nameEn.trim()) {
      ue.error("Product name is required.");
      return;
    }
    if (!form.imageFileId.trim()) {
      ue.error("Please upload a product image.");
      return;
    }
    try {
      await updateProduct.mutateAsync(buildInput());
      ue.success("Product updated successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      console.error("Product update failed:", err);
      ue.error(
        err instanceof Error ? err.message : "Failed to update product."
      );
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 w-full rounded-xl" })
    ] });
  }
  if (!product || !form) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg py-12 text-center", children: [
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg space-y-6", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5 truncate max-w-xs", children: product.nameEn })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-card border border-border rounded-xl p-6 space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nameEn", children: "Product Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "nameEn",
                value: form.nameEn,
                onChange: (e) => update("nameEn", e.target.value),
                required: true,
                "data-ocid": "admin-edit-name"
              }
            )
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
                children: Object.keys(PRODUCT_CATEGORY_LABELS).map(
                  (cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat, children: PRODUCT_CATEGORY_LABELS[cat].en }, cat)
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Image *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageUpload,
              {
                fileId: form.imageFileId,
                onChange: (id) => update("imageFileId", id),
                ocid: "admin-edit-image"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", children: "Price (₹) — optional" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "price",
                type: "number",
                min: "0",
                value: form.price,
                onChange: (e) => update("price", e.target.value),
                placeholder: "e.g. 500",
                "data-ocid": "admin-edit-price"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description — optional" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "description",
                value: form.description,
                onChange: (e) => update("description", e.target.value),
                rows: 3,
                "data-ocid": "admin-edit-description"
              }
            )
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
                  updateProduct.isPending ? "Saving…" : "Save Details"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/admin" }),
                "data-ocid": "admin-edit-cancel",
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
