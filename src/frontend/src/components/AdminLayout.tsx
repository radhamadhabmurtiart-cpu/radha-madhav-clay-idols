import { useAdmin } from "@/hooks/useAdmin";
import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Image, LayoutGrid, LogOut, Package, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { label: "Products", href: "/admin", icon: Package, exact: true },
  {
    label: "Category Images",
    href: "/admin/category-images",
    icon: Image,
    exact: true,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { logout, identity } = useAdmin();
  const location = useLocation();
  const router = useRouter();
  const currentPath = location.pathname;

  function handleLogout() {
    logout();
    router.navigate({ to: "/admin/login" });
  }

  const principalDisplay = identity
    ? `${identity.getPrincipal().toText().slice(0, 10)}...`
    : "";

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 hidden md:flex flex-col bg-card border-r border-border">
        {/* Brand */}
        <div className="px-4 py-5 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-primary" />
            <span className="font-display font-bold text-sm text-primary tracking-tight">
              Admin Panel
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-body truncate">
            Radha Madhav Mrit Shilpalay
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Manage
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? currentPath === item.href
              : currentPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
                data-ocid={`admin-nav-${item.label.toLowerCase()}`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="px-3 py-4 border-t border-border space-y-2">
          {principalDisplay && (
            <p className="text-xs text-muted-foreground font-mono truncate px-1">
              {`${principalDisplay}`}
            </p>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-smooth"
            data-ocid="admin-logout-btn"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-4 sm:px-6 h-14 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile brand */}
            <div className="flex items-center gap-2 md:hidden">
              <LayoutGrid size={16} className="text-primary" />
              <span className="font-display font-bold text-sm text-primary">
                Admin
              </span>
            </div>
            {/* Breadcrumb page name — desktop */}
            <h1 className="hidden md:block font-semibold text-sm text-foreground">
              {NAV_ITEMS.find((n) =>
                n.exact
                  ? currentPath === n.href
                  : currentPath.startsWith(n.href),
              )?.label ?? "Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {principalDisplay && (
              <span className="hidden sm:block text-xs font-mono text-muted-foreground">
                {principalDisplay}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-smooth px-2.5 py-1.5 rounded-md border border-border hover:border-destructive/40"
              data-ocid="admin-topbar-logout"
            >
              <LogOut size={12} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Nav Bar */}
        <nav className="md:hidden bg-card border-b border-border px-4 py-2 flex gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? currentPath === item.href
              : currentPath.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-smooth ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
                data-ocid={`admin-mobile-nav-${item.label.toLowerCase()}`}
              >
                <item.icon size={13} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
