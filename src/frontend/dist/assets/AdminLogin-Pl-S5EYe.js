import { c as createLucideIcon, k as useAdmin, l as useNavigate, r as reactExports, j as jsxRuntimeExports, S as ShieldCheck, P as Phone, m as Lock } from "./index-DIjz4Rf9.js";
import { L as LoaderCircle } from "./loader-circle-N0jGJAoL.js";
import { H as House } from "./house-D0KdmUb2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
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
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
function AdminLoginPage() {
  const {
    isAdmin,
    isAdminLoading,
    isActorReady,
    isLoggingIn,
    loginError,
    login
  } = useAdmin();
  const navigate = useNavigate();
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(() => {
    try {
      return localStorage.getItem("adminRememberMe") === "true";
    } catch {
      return false;
    }
  });
  reactExports.useEffect(() => {
    if (!isAdminLoading && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [isAdmin, isAdminLoading, navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) return;
    try {
      if (rememberMe) {
        localStorage.setItem("adminRememberMe", "true");
      } else {
        localStorage.removeItem("adminRememberMe");
      }
    } catch {
    }
    const success = await login(phone.trim(), password);
    if (success) {
      navigate({ to: "/admin" });
    }
  }
  if (isAdminLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-muted-foreground" }) });
  }
  if (isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-muted-foreground" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-md p-8 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 32, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Admin Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs text-muted-foreground tracking-widest uppercase mb-6", children: "Radha Madhav Mrit Shilpalay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "admin-phone",
              className: "text-sm font-medium text-foreground flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 13, className: "text-muted-foreground" }),
                "Phone Number"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "admin-phone",
              type: "tel",
              inputMode: "numeric",
              autoComplete: "username",
              placeholder: "e.g. 6295466310",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              disabled: isLoggingIn || !isActorReady,
              className: "w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
              "data-ocid": "admin-login-phone-input",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "admin-password",
              className: "text-sm font-medium text-foreground flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13, className: "text-muted-foreground" }),
                "Password"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "admin-password",
                type: showPassword ? "text" : "password",
                autoComplete: "current-password",
                placeholder: "Enter password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                disabled: isLoggingIn || !isActorReady,
                className: "w-full bg-background border border-input rounded-md px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors",
                "data-ocid": "admin-login-password-input",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword((v) => !v),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": showPassword ? "Hide password" : "Show password",
                tabIndex: -1,
                children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-2.5 cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground transition-colors",
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
        loginError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2 w-full",
            "data-ocid": "admin-login-error",
            children: loginError
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isLoggingIn || !isActorReady || !phone.trim() || !password.trim(),
            className: "w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-md font-semibold text-sm transition-colors mt-2",
            "data-ocid": "admin-login-btn",
            children: !isActorReady ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
              "Initializing…"
            ] }) : isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
              "Logging in…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }),
              "Login"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "/",
        className: "inline-flex items-center gap-1 hover:text-primary transition-colors underline underline-offset-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 11 }),
          "Back to website"
        ]
      }
    ) })
  ] }) });
}
export {
  AdminLoginPage
};
