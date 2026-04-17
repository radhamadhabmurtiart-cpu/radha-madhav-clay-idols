import { l as useNavigate, j as jsxRuntimeExports, g as Skeleton, b as useQuery, r as reactExports, K as Image, h as Label, I as Input, B as Button, a as useActor, t as useQueryClient, d as createActor } from "./index-DBsV3H2z.js";
import { u as useMutation } from "./useMutation-85116HF6.js";
import { u as ue } from "./index-CdQS9FN_.js";
import { A as ArrowLeft } from "./arrow-left-Dik7pR9Z.js";
import { L as LoaderCircle } from "./loader-circle-DC1_pQ9o.js";
import { S as Save } from "./save-COwtf7AV.js";
const CATEGORY_META = {
  "bangla-lakshmi-ganesh": {
    nameBn: "বাংলা লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Bangla Lakshmi Ganesh Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Lakshmi_and_Ganesh.jpg/640px-Lakshmi_and_Ganesh.jpg"
  },
  "clay-ganesh-idol-wholesale": {
    nameBn: "মাটির গণেশ মূর্তি পাইকারি",
    nameEn: "Clay Ganesh Idol – Wholesale",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Clay_Ganesha.jpg/640px-Clay_Ganesha.jpg"
  },
  "clay-vishwakarma-idol": {
    nameBn: "মাটির বিশ্বকর্মা মূর্তি",
    nameEn: "Clay Vishwakarma Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vishwakarma.jpg/640px-Vishwakarma.jpg"
  },
  "clay-lakshmi-idol": {
    nameBn: "মাটির লক্ষ্মী মূর্তি",
    nameEn: "Clay Lakshmi Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Lakshmi.jpg/640px-Lakshmi.jpg"
  },
  "diwali-lakshmi-ganesh-idol": {
    nameBn: "দীপাবলি লক্ষ্মী-গণেশ মূর্তি",
    nameEn: "Diwali Lakshmi Ganesh Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Diwali_Lakshmi-Ganesh.jpg/640px-Diwali_Lakshmi-Ganesh.jpg"
  },
  "clay-kali-idol": {
    nameBn: "মাটির কালী মূর্তি",
    nameEn: "Clay Kali Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Goddess_kali_idol.jpg/640px-Goddess_kali_idol.jpg"
  },
  "small-durga-idol": {
    nameBn: "ছোট দুর্গা মূর্তি",
    nameEn: "Small Durga Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Durga_idol.jpg/640px-Durga_idol.jpg"
  },
  "radha-krishna-clay-idol": {
    nameBn: "রাধা-কৃষ্ণ মাটির মূর্তি",
    nameEn: "Radha Krishna Clay Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Radha_Krishna.jpg/640px-Radha_Krishna.jpg"
  },
  "clay-kartik-idol": {
    nameBn: "মাটির কার্তিক মূর্তি",
    nameEn: "Clay Kartik Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Kartik_idol.jpg/640px-Kartik_idol.jpg"
  },
  "clay-saraswati-idol": {
    nameBn: "মাটির সরস্বতী মূর্তি",
    nameEn: "Clay Saraswati Idol",
    fallbackImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saraswati_clay_idol.jpg/640px-Saraswati_clay_idol.jpg"
  },
  "custom-clay-idol": {
    nameBn: "কাস্টম মাটির মূর্তি",
    nameEn: "Custom Clay Idol",
    fallbackImage: ""
  }
};
const SLUGS = Object.keys(CATEGORY_META);
function useCategoryImageActor() {
  return useActor(createActor);
}
function useCategoryImages() {
  const { actor, isFetching } = useCategoryImageActor();
  return useQuery({
    queryKey: ["categoryImages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategoryImages();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateCategoryImage() {
  const { actor } = useCategoryImageActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      slug,
      imageUrl
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const ok = await actor.updateCategoryImage(slug, imageUrl);
      if (!ok) throw new Error("Failed to update image");
      return ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryImages"] });
    }
  });
}
function CategoryRow({ slug, currentImageUrl }) {
  const meta = CATEGORY_META[slug];
  const updateImage = useUpdateCategoryImage();
  const [inputUrl, setInputUrl] = reactExports.useState(currentImageUrl);
  const [previewUrl, setPreviewUrl] = reactExports.useState(currentImageUrl);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setInputUrl(currentImageUrl);
    setPreviewUrl(currentImageUrl);
  }, [currentImageUrl]);
  const displayImage = previewUrl || meta.fallbackImage;
  async function handleSave() {
    setIsSaving(true);
    try {
      await updateImage.mutateAsync({ slug, imageUrl: inputUrl.trim() });
      setPreviewUrl(inputUrl.trim());
      ue.success(`"${meta.nameEn}" image updated!`);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Failed to save image.");
    } finally {
      setIsSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-4",
      "data-ocid": `category-image-row-${slug}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full sm:w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center", children: displayImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: displayImage,
            alt: meta.nameEn,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.currentTarget.style.display = "none";
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 24, className: "text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: meta.nameEn }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: meta.nameBn }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60 font-mono mt-0.5", children: [
              "/",
              slug
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `img-url-${slug}`, className: "text-xs", children: "Image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: `img-url-${slug}`,
                  value: inputUrl,
                  onChange: (e) => setInputUrl(e.target.value),
                  placeholder: "https://example.com/image.jpg",
                  className: "h-8 text-xs",
                  "data-ocid": `category-image-input-${slug}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "h-8 px-3 shrink-0",
                onClick: handleSave,
                disabled: isSaving || inputUrl.trim() === currentImageUrl,
                "data-ocid": `category-image-save-${slug}`,
                children: [
                  isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 13 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5", children: isSaving ? "Saving…" : "Save" })
                ]
              }
            )
          ] }),
          currentImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
            "Current:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground/70", children: currentImageUrl })
          ] })
        ] })
      ]
    }
  );
}
function AdminCategoryImagesPage() {
  const { data: categoryImages, isLoading } = useCategoryImages();
  const navigate = useNavigate();
  const imageMap = {};
  if (categoryImages) {
    for (const ci of categoryImages) {
      imageMap[ci.slug] = ci.imageUrl;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-6", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Category Images" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Update the image shown for each product category on the website." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "How it works:" }),
      " Paste an image URL in the box and click Save. The new image will appear on the homepage and all city pages immediately. If no URL is set, the default image is used."
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: SLUGS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, s)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "category-images-list", children: SLUGS.map((slug) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CategoryRow,
      {
        slug,
        currentImageUrl: imageMap[slug] ?? ""
      },
      slug
    )) })
  ] });
}
export {
  AdminCategoryImagesPage
};
