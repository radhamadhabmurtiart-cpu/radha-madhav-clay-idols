import { c as createLucideIcon, u as useActor, r as reactExports, j as jsxRuntimeExports, X, v as Image, B as Button, n as ue, b as createActor } from "./index-9P4jIzoX.js";
import { L as LoaderCircle } from "./loader-circle-DqCi7apI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
async function resolveFileUrl(actor, fileId) {
  if (!fileId) return "";
  if (fileId.startsWith("http://") || fileId.startsWith("https://")) {
    return fileId;
  }
  const url = await actor.getFileUrl(fileId);
  return url ?? "";
}
function ImageUpload({
  fileId,
  onChange,
  label,
  ocid
}) {
  const { actor } = useActor(createActor);
  const inputRef = reactExports.useRef(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState("");
  const [isResolving, setIsResolving] = reactExports.useState(false);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!fileId) {
      setPreviewUrl("");
      return;
    }
    if (!actor) return;
    let cancelled = false;
    setIsResolving(true);
    resolveFileUrl(actor, fileId).then((url) => {
      if (!cancelled) setPreviewUrl(url);
    }).catch(() => {
      if (!cancelled) setPreviewUrl("");
    }).finally(() => {
      if (!cancelled) setIsResolving(false);
    });
    return () => {
      cancelled = true;
    };
  }, [fileId, actor]);
  async function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!actor) {
      ue.error("Not connected to backend. Please try again.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be smaller than 5 MB.");
      return;
    }
    setIsUploading(true);
    try {
      const token = localStorage.getItem("adminSessionToken");
      const result = await actor.getUploadUrl(file.name, file.type, token);
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      const { uploadUrl, fileId: newFileId } = result.ok;
      const putResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      });
      if (!putResponse.ok) {
        throw new Error(`Upload failed (${putResponse.status})`);
      }
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      onChange(newFileId);
      ue.success("Image uploaded!");
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }
  function handleClear() {
    setPreviewUrl("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }
  const showLoading = isResolving || isUploading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": ocid, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-36 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center", children: showLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 22, className: "animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: isUploading ? "Uploading…" : "Loading…" })
    ] }) : previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: previewUrl,
          alt: "Selected file preview",
          className: "w-full h-full object-cover",
          onError: () => setPreviewUrl("")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleClear,
          className: "absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors",
          "aria-label": "Remove image",
          "data-ocid": ocid ? `${ocid}-clear` : void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 text-muted-foreground/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 28 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "No image selected" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "flex items-center gap-1.5 h-8 text-xs",
          disabled: showLoading,
          onClick: () => {
            var _a;
            return (_a = inputRef.current) == null ? void 0 : _a.click();
          },
          "data-ocid": ocid ? `${ocid}-upload-button` : void 0,
          children: [
            isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 12, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { size: 12 }),
            isUploading ? "Uploading…" : "Choose Image"
          ]
        }
      ),
      previewUrl && !showLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Image ready ✓" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "JPG, PNG, WebP — max 5 MB" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        className: "sr-only",
        onChange: handleFileChange,
        "aria-hidden": "true",
        tabIndex: -1
      }
    )
  ] });
}
const PRODUCT_CATEGORY_LABELS = {
  banglaLakshmiGanesh: {
    bn: "বাংলা লক্ষ্মী গণেশ মূর্তি",
    en: "Bangla Lakshmi Ganesh (Hal Khata)"
  },
  ganesh: { bn: "মাটির গণেশ মূর্তি (পাইকারি)", en: "Clay Ganesh Idol (Wholesale)" },
  vishwakarma: { bn: "মাটির বিশ্বকর্মা মূর্তি", en: "Clay Vishwakarma Idol" },
  lakshmi: { bn: "মাটির লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" },
  diwaliLakshmiGanesh: {
    bn: "দীপাবলি লক্ষ্মী গণেশ মূর্তি",
    en: "Diwali Lakshmi Ganesh Idol"
  },
  kali: { bn: "মাটির কালী মূর্তি", en: "Clay Kali Idol" },
  durga: { bn: "ছোট দুর্গা মূর্তি", en: "Small Durga Idol" },
  radhaKrishna: { bn: "রাধা কৃষ্ণ মাটির মূর্তি", en: "Radha Krishna Clay Idol" },
  kartik: { bn: "মাটির কার্তিক মূর্তি", en: "Clay Kartik Idol" },
  saraswati: { bn: "মাটির সরস্বতী মূর্তি", en: "Clay Saraswati Idol" },
  custom: { bn: "কাস্টম মাটির মূর্তি", en: "Custom Clay Idol" }
};
export {
  ImageUpload as I,
  PRODUCT_CATEGORY_LABELS as P,
  Save as S
};
