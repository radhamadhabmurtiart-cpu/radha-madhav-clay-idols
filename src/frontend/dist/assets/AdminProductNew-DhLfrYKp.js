import { r as reactExports, l as useNavigate, j as jsxRuntimeExports, h as Label, I as Input, B as Button, n as ue } from "./index-9P4jIzoX.js";
import { P as PRODUCT_CATEGORY_LABELS, I as ImageUpload, S as Save } from "./admin-DuxlZ-lR.js";
import { T as Textarea } from "./textarea-BE2b59oG.js";
import { e as useAddProduct } from "./useProducts-imxoOUqf.js";
import { A as ArrowLeft } from "./arrow-left-BspXt7Rj.js";
import { L as LoaderCircle } from "./loader-circle-DqCi7apI.js";
import "./useMutation-BESTmnje.js";
var ProductCategory = /* @__PURE__ */ ((ProductCategory2) => {
  ProductCategory2["diwaliLakshmiGanesh"] = "diwaliLakshmiGanesh";
  ProductCategory2["radhaKrishna"] = "radhaKrishna";
  ProductCategory2["lakshmi"] = "lakshmi";
  ProductCategory2["vishwakarma"] = "vishwakarma";
  ProductCategory2["custom"] = "custom";
  ProductCategory2["saraswati"] = "saraswati";
  ProductCategory2["kali"] = "kali";
  ProductCategory2["ganesh"] = "ganesh";
  ProductCategory2["banglaLakshmiGanesh"] = "banglaLakshmiGanesh";
  ProductCategory2["durga"] = "durga";
  ProductCategory2["kartik"] = "kartik";
  return ProductCategory2;
})(ProductCategory || {});
const EMPTY = {
  nameEn: "",
  category: ProductCategory.ganesh,
  imageFileId: "",
  price: "",
  description: ""
};
function AdminProductNewPage() {
  const [form, setForm] = reactExports.useState(EMPTY);
  const addProduct = useAddProduct();
  const navigate = useNavigate();
  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  function buildInput() {
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
      imageIds: form.imageFileId.trim() ? [form.imageFileId.trim()] : []
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nameEn.trim()) {
      ue.error("Product name is required.");
      return;
    }
    if (!form.imageFileId.trim()) {
      ue.error("Please upload a product image.");
      return;
    }
    try {
      await addProduct.mutateAsync(buildInput());
      ue.success("Product added successfully!");
      navigate({ to: "/admin" });
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Failed to add product."
      );
    }
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Add New Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Fill in the 5 fields below to add a product." })
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
                placeholder: "e.g. Ganesh Idol 2ft",
                required: true,
                "data-ocid": "admin-form-name"
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
                "data-ocid": "admin-form-category",
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
                ocid: "admin-form-image"
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
                "data-ocid": "admin-form-price"
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
                placeholder: "Brief product description…",
                rows: 3,
                "data-ocid": "admin-form-description"
              }
            )
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
                "data-ocid": "admin-form-cancel",
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
