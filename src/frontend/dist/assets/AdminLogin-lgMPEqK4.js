import { c as createLucideIcon, k as useAdmin, l as useNavigate, r as reactExports, j as jsxRuntimeExports, m as ShieldOff, n as LogOut, S as ShieldCheck } from "./index-CFIG_hwC.js";
import { L as LoaderCircle } from "./loader-circle-B-gmg9Ur.js";
import { H as House } from "./house-1VlnsKHx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
];
const Fingerprint = createLucideIcon("fingerprint", __iconNode);
const REMEMBER_KEY = "adminRememberMe";
function AdminLoginPage() {
  const {
    login,
    logout,
    identity,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isLoginError,
    loginError,
    isAdmin,
    isAdminLoading
  } = useAdmin();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = reactExports.useState(() => {
    try {
      return localStorage.getItem(REMEMBER_KEY) === "true";
    } catch {
      return false;
    }
  });
  reactExports.useEffect(() => {
    if (!isInitializing && !isAdminLoading && isAuthenticated && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, isInitializing, isAdminLoading, isAdmin, navigate]);
  function handleLogin() {
    if (rememberMe) {
      try {
        localStorage.setItem(REMEMBER_KEY, "true");
      } catch {
      }
    } else {
      try {
        localStorage.removeItem(REMEMBER_KEY);
      } catch {
      }
    }
    login();
  }
  function handleLogout() {
    logout();
  }
  if (isInitializing || isLoggingIn || isAuthenticated && isAdminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-muted-foreground" }) });
  }
  if (isAuthenticated && !isAdminLoading && !isAdmin) {
    const principalText = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-md p-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { size: 32, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground mb-2", children: "প্রবেশাধিকার নেই" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-1 leading-relaxed", children: "এই পেজটি শুধুমাত্র ওয়েবসাইটের মালিকের জন্য।" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4 leading-relaxed", children: "This admin panel is restricted to the website owner only." }),
      principalText && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-muted/50 rounded-md px-3 py-2 mb-5 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Logged in as:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs font-mono text-foreground break-all",
            "data-ocid": "admin-login-principal",
            children: principalText
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/",
            className: "w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-md font-semibold text-sm transition-smooth",
            "data-ocid": "admin-access-denied-go-home",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 14 }),
              "হোম পেজে ফিরুন"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleLogout,
            className: "w-full flex items-center justify-center gap-2 border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/40 px-4 py-2.5 rounded-md font-semibold text-sm transition-smooth",
            "data-ocid": "admin-access-denied-logout",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
              "Logout"
            ]
          }
        )
      ] })
    ] }) }) });
  }
  if (isAuthenticated && isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-muted-foreground" }) });
  }
  const principalDisplay = identity ? identity.getPrincipal().toText() : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-md p-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 32, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Admin Panel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs text-muted-foreground tracking-widest uppercase mb-1", children: "Radha Madhav Mrit Shilpalay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 mb-6 leading-relaxed", children: "Sign in with Internet Identity to manage your products." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleLogin,
          disabled: isInitializing || isLoggingIn,
          className: "w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-md font-semibold text-sm transition-smooth",
          "data-ocid": "admin-login-btn",
          children: isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
            "Initializing…"
          ] }) : isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
            "Connecting…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { size: 16 }),
            "Login with Internet Identity"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-center gap-2.5 mt-4 cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "admin-remember-me-label",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: rememberMe,
                onChange: (e) => setRememberMe(e.target.checked),
                className: "w-4 h-4 rounded border border-border accent-primary cursor-pointer",
                "data-ocid": "admin-remember-me-checkbox"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "লগইন মনে রাখুন",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/70", children: "(Remember me)" })
            ] })
          ]
        }
      ),
      isLoginError && loginError && !loginError.message.toLowerCase().includes("already authenticated") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "mt-4 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2 w-full",
          "data-ocid": "admin-login-error",
          children: [
            "Login failed: ",
            loginError.message
          ]
        }
      ),
      principalDisplay && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "mt-4 text-xs font-mono text-muted-foreground/70 break-all text-center",
          "data-ocid": "admin-login-principal",
          children: principalDisplay
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-xs text-muted-foreground", children: [
        "Internet Identity is a secure, privacy-preserving login method.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "No password required."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "/",
        className: "hover:text-primary transition-smooth underline underline-offset-2",
        children: "← Back to website"
      }
    ) })
  ] }) });
}
export {
  AdminLoginPage
};
