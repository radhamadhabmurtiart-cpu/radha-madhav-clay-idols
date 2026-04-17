import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import {
  Fingerprint,
  Home,
  Loader2,
  LogOut,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { useEffect, useState } from "react";

const REMEMBER_KEY = "adminRememberMe";

export function AdminLoginPage() {
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
    isAdminLoading,
  } = useAdmin();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem(REMEMBER_KEY) === "true";
    } catch {
      return false;
    }
  });

  // Auto-redirect: if authenticated AND confirmed as admin owner, go to dashboard.
  useEffect(() => {
    if (!isInitializing && !isAdminLoading && isAuthenticated && isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [isAuthenticated, isInitializing, isAdminLoading, isAdmin, navigate]);

  function handleLogin() {
    if (rememberMe) {
      try {
        localStorage.setItem(REMEMBER_KEY, "true");
      } catch {
        // ignore storage errors
      }
    } else {
      try {
        localStorage.removeItem(REMEMBER_KEY);
      } catch {
        // ignore
      }
    }
    login();
  }

  function handleLogout() {
    logout();
  }

  // Show spinner while checking auth state or admin status
  if (isInitializing || isLoggingIn || (isAuthenticated && isAdminLoading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Authenticated but NOT the owner — show Access Denied
  if (isAuthenticated && !isAdminLoading && !isAdmin) {
    const principalText = identity?.getPrincipal().toText() ?? "";
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-xl shadow-md p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <ShieldOff size={32} className="text-destructive" />
            </div>
            <h1 className="font-display font-bold text-xl text-foreground mb-2">
              প্রবেশাধিকার নেই
            </h1>
            <p className="text-sm text-muted-foreground mb-1 leading-relaxed">
              এই পেজটি শুধুমাত্র ওয়েবসাইটের মালিকের জন্য।
            </p>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              This admin panel is restricted to the website owner only.
            </p>

            {/* Show logged-in principal for reference */}
            {principalText && (
              <div className="w-full bg-muted/50 rounded-md px-3 py-2 mb-5 text-left">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Logged in as:
                </p>
                <p
                  className="text-xs font-mono text-foreground break-all"
                  data-ocid="admin-login-principal"
                >
                  {principalText}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2.5 w-full">
              <a
                href="/"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 rounded-md font-semibold text-sm transition-smooth"
                data-ocid="admin-access-denied-go-home"
              >
                <Home size={14} />
                হোম পেজে ফিরুন
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 border border-border bg-card text-muted-foreground hover:text-destructive hover:border-destructive/40 px-4 py-2.5 rounded-md font-semibold text-sm transition-smooth"
                data-ocid="admin-access-denied-logout"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Already redirecting to dashboard (isAuthenticated && isAdmin) — show spinner
  if (isAuthenticated && isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Show principal in login card for owner's reference (only after login attempt)
  const principalDisplay = identity ? identity.getPrincipal().toText() : "";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-md p-8 flex flex-col items-center text-center">
          {/* Logo / Brand */}
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShieldCheck size={32} className="text-primary" />
          </div>

          <h1 className="font-display font-bold text-xl text-foreground mb-1">
            Admin Panel
          </h1>
          <p className="font-display text-xs text-muted-foreground tracking-widest uppercase mb-1">
            Radha Madhav Mrit Shilpalay
          </p>
          <p className="text-sm text-muted-foreground mt-3 mb-6 leading-relaxed">
            Sign in with Internet Identity to manage your products.
          </p>

          {/* Login Button — disabled until AuthClient is fully initialized */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={isInitializing || isLoggingIn}
            className="w-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-md font-semibold text-sm transition-smooth"
            data-ocid="admin-login-btn"
          >
            {isInitializing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Initializing…
              </>
            ) : isLoggingIn ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <Fingerprint size={16} />
                Login with Internet Identity
              </>
            )}
          </button>

          {/* Remember Me */}
          <label
            className="flex items-center gap-2.5 mt-4 cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground transition-smooth"
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

          {/* Error — only show non-"already authenticated" errors */}
          {isLoginError &&
            loginError &&
            !loginError.message
              .toLowerCase()
              .includes("already authenticated") && (
              <p
                className="mt-4 text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2 w-full"
                data-ocid="admin-login-error"
              >
                Login failed: {loginError.message}
              </p>
            )}

          {/* Show principal for owner's reference after authentication */}
          {principalDisplay && (
            <p
              className="mt-4 text-xs font-mono text-muted-foreground/70 break-all text-center"
              data-ocid="admin-login-principal"
            >
              {principalDisplay}
            </p>
          )}

          {/* Info */}
          <p className="mt-4 text-xs text-muted-foreground">
            Internet Identity is a secure, privacy-preserving login method.
            <br />
            No password required.
          </p>
        </div>

        {/* Back to site */}
        <p className="text-center mt-4 text-xs text-muted-foreground">
          <a
            href="/"
            className="hover:text-primary transition-smooth underline underline-offset-2"
          >
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
