import { r as reactExports, l as useNavigate, j as jsxRuntimeExports, h as Label, I as Input, X, B as Button } from "./index-DBsV3H2z.js";
import { P as ProductCategory, S as Switch, I as ImagePlus } from "./switch-CPk0371o.js";
import { T as Textarea } from "./textarea-CCXT8_Eh.js";
import { d as useAddProduct } from "./useProducts-lhLGrzct.js";
import { E as EMPTY_PRODUCT_FORM, g as PRODUCT_CATEGORY_LABELS, h as formDataToAddInput } from "./admin-BWwu5cQZ.js";
import { u as ue } from "./index-CdQS9FN_.js";
import { A as ArrowLeft } from "./arrow-left-Dik7pR9Z.js";
import { L as LoaderCircle } from "./loader-circle-DC1_pQ9o.js";
import { S as Save } from "./save-COwtf7AV.js";
import "./useMutation-85116HF6.js";
function AdminProductNewPage() {
  const [form, setForm] = reactExports.useState(EMPTY_PRODUCT_FORM);
  const [images, setImages] = reactExports.useState([]);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const addProduct = useAddProduct();
  const navigate = useNavigate();
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
              id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              dataUrl: (_a = e.target) == null ? void 0 : _a.result,
              name: file.name
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      )
    );
    setImages((prev) => {
      const combined = [...prev, ...results];
      setForm((f) => ({
        ...f,
        imageIds: combined.map((img) => img.dataUrl)
      }));
      return combined;
    });
  }
  function removeImage(index) {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setForm((f) => ({ ...f, imageIds: next.map((img) => img.dataUrl) }));
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
    if (!form.nameBn.trim() || !form.nameEn.trim()) {
      ue.error("Both Bengali and English names are required.");
      return;
    }
    try {
      await addProduct.mutateAsync(formDataToAddInput(form));
      ue.success("Product added successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to add product."
      );
    }
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Add New Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Fill in the details below to add a new clay idol product." })
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
                  placeholder: "e.g. Ganesh Idol",
                  required: true,
                  "data-ocid": "admin-form-name-en"
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
                  placeholder: "যেমন: গণেশ মূর্তি",
                  required: true,
                  "data-ocid": "admin-form-name-bn"
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
                "data-ocid": "admin-form-category",
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
                placeholder: "Describe the product in English…",
                rows: 3,
                "data-ocid": "admin-form-desc-en"
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
                placeholder: "পণ্যের বিবরণ বাংলায় লিখুন…",
                rows: 3,
                "data-ocid": "admin-form-desc-bn"
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
                "data-ocid": "admin-form-sizes"
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
                  placeholder: "500",
                  "data-ocid": "admin-form-price-min"
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
                  placeholder: "2000",
                  "data-ocid": "admin-form-price-max"
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
                "data-ocid": "admin-form-bulk-toggle"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Product Images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-label": "Upload product images",
                className: `w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-smooth ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`,
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
                "data-ocid": "admin-form-image-dropzone",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ImagePlus,
                    {
                      size: 28,
                      className: "mx-auto mb-2 text-muted-foreground/60"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Click or drag images here" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP — multiple images supported" })
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
                "data-ocid": "admin-form-image-input"
              }
            ),
            images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-3", children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: img.dataUrl,
                      alt: img.name,
                      className: "w-full h-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeImage(i),
                      className: "absolute top-1 right-1 w-6 h-6 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth",
                      "aria-label": `Remove image ${img.name}`,
                      "data-ocid": `admin-form-remove-image-${img.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                    }
                  ),
                  i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium", children: "Main" })
                ]
              },
              img.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "First image will be shown as the main product photo.",
              " ",
              images.length > 0 && `${images.length} image${images.length !== 1 ? "s" : ""} added.`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: addProduct.isPending,
                className: "flex items-center gap-2",
                "data-ocid": "admin-form-submit",
                children: [
                  addProduct.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                  addProduct.isPending ? "Saving…" : "Save Product"
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
  AdminProductNewPage
};
