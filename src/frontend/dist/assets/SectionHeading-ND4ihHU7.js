import { u as useLanguage, j as jsxRuntimeExports } from "./index-DOyg_51M.js";
function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = ""
}) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${centered ? "text-center" : ""} ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-3 mb-3 ${centered ? "justify-center" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-secondary opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-secondary", children: "Radha Madhav" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-secondary opacity-60" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display-md text-foreground mb-4", children: t(title) }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed", children: t(subtitle) })
  ] });
}
export {
  SectionHeading as S
};
