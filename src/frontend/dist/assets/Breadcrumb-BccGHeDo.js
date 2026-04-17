import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CH3DR1V4.js";
import { H as House } from "./house-BDPni-x0.js";
import { C as ChevronRight } from "./chevron-right-CJArtW36.js";
function Breadcrumb({ items, className = "" }) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://radhamadhavmritshilpalay.in";
  reactExports.useEffect(() => {
    const schemaId = "breadcrumb-jsonld";
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...item.href ? { item: `${baseUrl}${item.href}` } : {}
      }))
    };
    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [items, baseUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: `text-sm text-muted-foreground ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "flex flex-wrap items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-1 hover:text-primary transition-smooth",
            "aria-label": "Home",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 13 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Home" })
            ]
          }
        ) }),
        items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  size: 12,
                  className: "text-border",
                  "aria-hidden": "true"
                }
              ),
              item.href && index < items.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: item.href,
                  className: "hover:text-primary transition-smooth",
                  children: item.label
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  "aria-current": "page",
                  className: "text-foreground font-medium truncate max-w-[180px] sm:max-w-xs",
                  children: item.label
                }
              )
            ]
          },
          `${item.label}-${index}`
        ))
      ] })
    }
  );
}
export {
  Breadcrumb as B
};
