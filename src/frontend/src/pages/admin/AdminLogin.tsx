import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  Home,
  Loader2,
  Lock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminLoginPage() {
  const {
    isAdmin,
    isAdminLoading,
    isActorReady,
    isLoggingIn,
    loginError,
    login,
  } = useAdmin();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem("adminRememberMe") === "true";
    } catch {
      return false;
    }
  });

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (!isAdminLoading && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [isAdmin, isAdminLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) return;

    try {
      if (rememberMe) {
        localStorage.setItem("adminRememberMe", "true");
      } else {
        localStorage.removeItem("adminRememberMe");
      }
    } catch {
      /* ignore */
    }

    const success = await login(phone.trim(), password);
    if (success) {
      toast.success("Logged in successfully!");
      navigate({ to: "/admin" });
    }
  }

  // Still checking session token on mount
  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Already admin, redirect in progress
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-md p-8 flex flex-col items-center">
          {/* Logo / Brand */}
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShieldCheck size={32} className="text-primary" />
          </div>

          <h1 className="font-display font-bold text-xl text-foreground mb-1">
            Admin Login
          </h1>
          <p className="font-display text-xs text-muted-foreground tracking-widest uppercase mb-6">
            Radha Madhav Mrit Shilpalay
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Phone field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-phone"
                className="text-sm font-medium text-foreground flex items-center gap-1.5"
              >
                <Phone size={13} className="text-muted-foreground" />
                Phone Number
              </label>
              <input
                id="admin-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="username"
                placeholder="e.g. 6295466310"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoggingIn || !isActorReady}
                className="w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                data-ocid="admin-login-phone-input"
                required
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="text-sm font-medium text-foreground flex items-center gap-1.5"
              >
                <Lock size={13} className="text-muted-foreground" />
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoggingIn || !isActorReady}
                  className="w-full bg-background border border-input rounded-md px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  data-ocid="admin-login-password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label
              className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="admin-remember-me-label"
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border border-border accent-primary cursor-pointer"
                data-ocid="admin-remember-me-checkbox"
              />
              <span>
                লগইন মনে রাখুন{" "}
                <span className="text-xs text-muted-foreground/70">
                  (Remember me)
                </span>
              </span>
            </label>

            {/* Error */}
            {loginError && (
              <p
                className="text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2 w-full"
                data-ocid="admin-login-error"
              >
                {loginError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={
                isLoggingIn ||
                !isActorReady ||
                !phone.trim() ||
                !password.trim()
              }
              className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-md font-semibold text-sm transition-colors mt-2"
              data-ocid="admin-login-btn"
            >
              {!isActorReady ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Initializing…
                </>
              ) : isLoggingIn ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Logging in…
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Login
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <p className="text-center mt-4 text-xs text-muted-foreground">
          <a
            href="/"
            className="inline-flex items-center gap-1 hover:text-primary transition-colors underline underline-offset-2"
          >
            <Home size={11} />
            Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
