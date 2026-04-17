import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  Globe,
  LayoutGrid,
  Lock,
  LogIn,
  LogOut,
  MapPin as MapPinIcon,
  Menu,
  MessageCircle,
  Phone,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

const PHONE = "+916295466310";
const WHATSAPP_LINK =
  "https://wa.me/916295466310?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20bulk%20clay%20idol%20orders.";

const NAV_ITEMS = [
  { label: { bn: "হোম", en: "Home" }, href: "/" },
  { label: { bn: "পণ্য", en: "Products" }, href: "/products" },
  { label: { bn: "আমাদের সম্পর্কে", en: "About Us" }, href: "/about" },
  { label: { bn: "যোগাযোগ", en: "Contact" }, href: "/contact" },
];

const CITY_LINKS = [
  { label: { bn: "বর্ধমান", en: "Bardhaman" }, href: "/cities/bardhaman" },
  { label: { bn: "দুর্গাপুর", en: "Durgapur" }, href: "/cities/durgapur" },
  { label: { bn: "আসানসোল", en: "Asansol" }, href: "/cities/asansol" },
  { label: { bn: "বাঁকুড়া", en: "Bankura" }, href: "/cities/bankura" },
  { label: { bn: "পুরুলিয়া", en: "Purulia" }, href: "/cities/purulia" },
  { label: { bn: "ধানবাদ", en: "Dhanbad" }, href: "/cities/dhanbad" },
  { label: { bn: "কলকাতা", en: "Kolkata" }, href: "/cities/kolkata" },
  { label: { bn: "সারা ভারত", en: "All India" }, href: "/cities/all-india" },
];

const CATEGORY_LINKS = [
  {
    label: { bn: "বাংলা লক্ষ্মী গণেশ", en: "Bangla Lakshmi Ganesh" },
    href: "/bangla-lakshmi-ganesh-idol",
  },
  {
    label: { bn: "মাটির গণেশ মূর্তি", en: "Clay Ganesh Idol" },
    href: "/clay-ganesh-idol-wholesale",
  },
  {
    label: { bn: "মাটির বিশ্বকর্মা মূর্তি", en: "Clay Vishwakarma" },
    href: "/clay-vishwakarma-idol",
  },
  {
    label: { bn: "মাটির লক্ষ্মী মূর্তি", en: "Clay Lakshmi Idol" },
    href: "/clay-lakshmi-idol",
  },
  {
    label: { bn: "দীপাবলি লক্ষ্মী গণেশ", en: "Diwali Lakshmi Ganesh" },
    href: "/diwali-lakshmi-ganesh-idol",
  },
  {
    label: { bn: "মাটির কালী মূর্তি", en: "Clay Kali Idol" },
    href: "/clay-kali-idol",
  },
  {
    label: { bn: "ছোট দুর্গা মূর্তি", en: "Small Durga Idol" },
    href: "/small-durga-idol",
  },
  {
    label: { bn: "রাধা কৃষ্ণ মূর্তি", en: "Radha Krishna Idol" },
    href: "/radha-krishna-clay-idol",
  },
  {
    label: { bn: "মাটির কার্তিক মূর্তি", en: "Clay Kartik Idol" },
    href: "/clay-kartik-idol",
  },
  {
    label: { bn: "মাটির সরস্বতী মূর্তি", en: "Clay Saraswati Idol" },
    href: "/clay-saraswati-idol",
  },
  {
    label: { bn: "কাস্টম মাটির মূর্তি", en: "Custom Clay Idol" },
    href: "/custom-clay-idol",
  },
];

const FOOTER_QUICK_LINKS = [
  ...NAV_ITEMS,
  { label: { bn: "ব্লগ", en: "Blog" }, href: "/blog" },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    profileChecked,
    visitorName,
    registerVisitorProfile,
    login,
    logout,
  } = useCustomerAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  // Registration form state
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Show registration form when: authenticated, profile checked, and no name yet
  const showRegForm = isAuthenticated && profileChecked && !visitorName;

  // Display name: actual name, or "Welcome" if authenticated but no name
  const displayName =
    visitorName ?? (isAuthenticated ? t({ bn: "স্বাগতম", en: "Welcome" }) : null);

  async function handleRegSubmit(e: FormEvent) {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      setRegError(
        t({ bn: "নাম ও ফোন নম্বর দিন", en: "Please enter name and phone" }),
      );
      return;
    }
    setRegSubmitting(true);
    setRegError("");
    const ok = await registerVisitorProfile(regName.trim(), regPhone.trim());
    setRegSubmitting(false);
    if (ok) {
      setRegSuccess(true);
      setRegName("");
      setRegPhone("");
      // Modal will auto-close when visitorName is set (showRegForm becomes false)
      // Show success message briefly before that happens
      setTimeout(() => setRegSuccess(false), 1500);
    } else {
      setRegError(
        t({
          bn: "সংরক্ষণ ব্যর্থ হয়েছে, আবার চেষ্টা করুন",
          en: "Save failed, please try again",
        }),
      );
    }
  }

  const isCityActive = currentPath.startsWith("/cities");
  const isCategoryActive = CATEGORY_LINKS.some((c) => currentPath === c.href);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Visitor Registration Modal */}
      {showRegForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4"
          data-ocid="visitor-reg-dialog"
        >
          <div className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <User size={18} className="text-primary" />
              <h2 className="font-display font-bold text-lg text-foreground">
                {t({ bn: "আপনার তথ্য দিন", en: "Enter Your Details" })}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              {t({
                bn: "আমরা আপনাকে পণ্য সম্পর্কে জানাতে যোগাযোগ করব।",
                en: "We'll contact you about products you're interested in.",
              })}
            </p>
            <form onSubmit={handleRegSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="reg-name"
                  className="text-sm font-medium mb-1 block"
                >
                  {t({ bn: "নাম", en: "Name" })}
                </Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder={t({ bn: "আপনার নাম লিখুন", en: "Your full name" })}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  data-ocid="visitor-reg.input"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="reg-phone"
                  className="text-sm font-medium mb-1 block"
                >
                  {t({ bn: "ফোন নম্বর", en: "Phone Number" })}
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder={t({
                    bn: "আপনার ফোন নম্বর",
                    en: "e.g. 9876543210",
                  })}
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  data-ocid="visitor-reg-phone.input"
                  required
                />
              </div>
              {regError && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="visitor-reg.error_state"
                >
                  {regError}
                </p>
              )}
              {regSuccess && (
                <p
                  className="text-sm text-green-600 font-medium"
                  data-ocid="visitor-reg.success_state"
                >
                  {t({ bn: "সংরক্ষিত! ধন্যবাদ।", en: "Saved! Thank you." })}
                </p>
              )}
              <Button
                type="submit"
                disabled={regSubmitting}
                className="w-full"
                data-ocid="visitor-reg.submit_button"
              >
                {regSubmitting
                  ? t({ bn: "সংরক্ষণ হচ্ছে...", en: "Saving..." })
                  : t({ bn: "সংরক্ষণ করুন", en: "Save & Continue" })}
              </Button>
              <button
                type="button"
                onClick={() => logout()}
                className="w-full text-xs text-muted-foreground hover:text-destructive transition-smooth text-center py-1"
                data-ocid="visitor-reg.cancel_button"
              >
                {t({ bn: "বাতিল করুন (লগআউট)", en: "Cancel (Logout)" })}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col leading-tight"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-display font-bold text-base sm:text-lg text-primary tracking-tight leading-none">
              RADHA MADHAV
            </span>
            <span className="font-display text-xs sm:text-sm text-muted-foreground tracking-widest uppercase">
              MRIT SHILPALAY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-sm text-sm font-medium transition-smooth ${
                  currentPath === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-ocid={`nav-${item.href.replace("/", "") || "home"}`}
              >
                {t(item.label)}
              </Link>
            ))}

            {/* Cities Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCitiesOpen((o) => !o)}
                onBlur={(e) => {
                  if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                    setCitiesOpen(false);
                  }
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-sm text-sm font-medium transition-smooth ${
                  isCityActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                aria-expanded={citiesOpen}
                aria-haspopup="true"
                data-ocid="nav-cities-dropdown"
              >
                {t({ bn: "শহর", en: "Cities" })}
                <ChevronDown
                  size={13}
                  className={`transition-smooth ${citiesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {citiesOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                  {CITY_LINKS.map((city) => (
                    <Link
                      key={city.href}
                      to={city.href}
                      onClick={() => setCitiesOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-smooth ${
                        currentPath === city.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                      data-ocid={`nav-city-${city.href.replace("/cities/", "")}`}
                    >
                      {t(city.label)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesDropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen((o) => !o)}
                onBlur={(e) => {
                  if (
                    !categoriesDropdownRef.current?.contains(
                      e.relatedTarget as Node,
                    )
                  ) {
                    setCategoriesOpen(false);
                  }
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-sm text-sm font-medium transition-smooth ${
                  isCategoryActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                data-ocid="nav-categories-dropdown"
              >
                {t({ bn: "বিভাগ", en: "Categories" })}
                <ChevronDown
                  size={13}
                  className={`transition-smooth ${categoriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                  {CATEGORY_LINKS.map((cat) => (
                    <Link
                      key={cat.href}
                      to={cat.href as never}
                      onClick={() => setCategoriesOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-smooth ${
                        currentPath === cat.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                      data-ocid={`nav-cat-${cat.href.replace("/", "")}`}
                    >
                      <span className="text-xs text-muted-foreground block leading-none mb-0.5">
                        {cat.label.bn}
                      </span>
                      {cat.label.en}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Link */}
            <Link
              to="/blog"
              className={`px-3 py-2 rounded-sm text-sm font-medium transition-smooth ${
                currentPath.startsWith("/blog")
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              }`}
              data-ocid="nav-blog"
            >
              {t({ bn: "ব্লগ", en: "Blog" })}
            </Link>

            {/* Admin Panel — desktop, subtle */}
            <Link
              to="/admin/login"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth border border-transparent hover:border-border"
              data-ocid="nav-admin-login"
            >
              <Lock size={11} />
              {t({ bn: "অ্যাডমিন", en: "Admin" })}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "bn" : "en")}
              className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-smooth px-2 py-1.5 rounded-sm border border-border hover:border-primary/40"
              aria-label="Toggle language"
              data-ocid="language-toggle"
            >
              <Globe size={12} />
              {language === "en" ? "বাংলা" : "EN"}
            </button>

            {/* Customer Login — Desktop */}
            {!isInitializing && (
              <div className="hidden md:flex items-center">
                {isAuthenticated ? (
                  <div className="flex items-center gap-1.5">
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/60 border border-border rounded-md px-2.5 py-1.5"
                      data-ocid="customer-user-display"
                    >
                      <User size={12} className="text-primary" />
                      {displayName}
                    </span>
                    <button
                      type="button"
                      onClick={logout}
                      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-smooth px-2 py-1.5 rounded-sm border border-border hover:border-destructive/40"
                      aria-label="Logout"
                      data-ocid="customer-logout-btn"
                    >
                      <LogOut size={12} />
                      {t({ bn: "লগআউট", en: "Logout" })}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={login}
                    disabled={isLoggingIn}
                    className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-smooth px-2 py-1.5 rounded-sm border border-border hover:border-primary/40 disabled:opacity-50"
                    aria-label="Login"
                    data-ocid="customer-login-btn"
                  >
                    <LogIn size={12} />
                    {t({ bn: "লগইন", en: "Login" })}
                  </button>
                )}
              </div>
            )}

            {/* Desktop CTA */}
            <a
              href={`tel:${PHONE}`}
              className="hidden sm:flex items-center gap-1.5 btn-primary text-sm py-2 px-3 rounded-md"
              data-ocid="header-call-btn"
            >
              <Phone size={14} />
              {t({ bn: "কল করুন", en: "Call Now" })}
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-smooth"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              data-ocid="mobile-menu-toggle"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav
            className="md:hidden bg-card border-t border-border py-3 px-4"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-3 rounded-sm text-sm font-medium transition-smooth mb-0.5 ${
                  currentPath === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
                data-ocid={`mobile-nav-${item.href.replace("/", "") || "home"}`}
              >
                {t(item.label)}
              </Link>
            ))}

            {/* Mobile Cities Accordion */}
            <button
              type="button"
              onClick={() => setMobileCitiesOpen((o) => !o)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-sm text-sm font-medium transition-smooth mb-0.5 ${
                isCityActive
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              }`}
              data-ocid="mobile-nav-cities"
            >
              <span className="flex items-center gap-2">
                <MapPinIcon size={14} />
                {t({ bn: "শহর / সেবা এলাকা", en: "Cities / Service Areas" })}
              </span>
              <ChevronDown
                size={14}
                className={`transition-smooth ${mobileCitiesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileCitiesOpen && (
              <div className="pl-4 mb-1">
                {CITY_LINKS.map((city) => (
                  <Link
                    key={city.href}
                    to={city.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileCitiesOpen(false);
                    }}
                    className={`block px-3 py-2.5 rounded-sm text-sm transition-smooth mb-0.5 ${
                      currentPath === city.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    data-ocid={`mobile-nav-city-${city.href.replace("/cities/", "")}`}
                  >
                    {t(city.label)}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile All Categories Accordion */}
            <button
              type="button"
              onClick={() => setMobileCategoriesOpen((o) => !o)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-sm text-sm font-medium transition-smooth mb-0.5 ${
                isCategoryActive
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              }`}
              data-ocid="mobile-nav-categories"
            >
              <span className="flex items-center gap-2">
                <LayoutGrid size={14} />
                {t({ bn: "সমস্ত বিভাগ", en: "All Categories" })}
              </span>
              <ChevronDown
                size={14}
                className={`transition-smooth ${mobileCategoriesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileCategoriesOpen && (
              <div className="pl-4 mb-1">
                {CATEGORY_LINKS.map((cat) => (
                  <Link
                    key={cat.href}
                    to={cat.href as never}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileCategoriesOpen(false);
                    }}
                    className={`block px-3 py-2.5 rounded-sm text-sm transition-smooth mb-0.5 ${
                      currentPath === cat.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    data-ocid={`mobile-nav-cat-${cat.href.replace("/", "")}`}
                  >
                    <span className="block text-xs text-muted-foreground/70 leading-none mb-0.5">
                      {cat.label.bn}
                    </span>
                    {cat.label.en}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Blog Link */}
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-3 rounded-sm text-sm font-medium transition-smooth mb-0.5 ${
                currentPath.startsWith("/blog")
                  ? "text-primary bg-primary/10"
                  : "text-foreground hover:text-primary hover:bg-primary/5"
              }`}
              data-ocid="mobile-nav-blog"
            >
              {t({ bn: "ব্লগ", en: "Blog" })}
            </Link>

            {/* Mobile Login / Logout */}
            {!isInitializing && (
              <div className="mt-1 pt-2 border-t border-border">
                {isAuthenticated ? (
                  <div className="px-3 py-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User size={13} className="text-primary" />
                      {displayName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-smooth px-2.5 py-1.5 rounded-sm border border-border hover:border-destructive/40"
                      data-ocid="mobile-customer-logout-btn"
                    >
                      <LogOut size={12} />
                      {t({ bn: "লগআউট", en: "Logout" })}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      await login();
                      setMenuOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-sm text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-smooth disabled:opacity-50"
                    data-ocid="mobile-customer-login-btn"
                  >
                    <LogIn size={14} />
                    {t({ bn: "লগইন / সাইন আপ", en: "Login / Sign Up" })}
                  </button>
                )}
              </div>
            )}

            {/* Admin Panel Link — bottom of hamburger menu */}
            <div className="mt-1 pt-2 border-t border-border">
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-sm text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth"
                data-ocid="mobile-nav-admin-login"
              >
                <Lock size={13} />
                <span>{t({ bn: "অ্যাডমিন প্যানেল", en: "Admin Panel" })}</span>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <p className="font-display font-bold text-xl text-primary mb-1">
                Radha Madhav
              </p>
              <p className="font-display text-sm text-muted-foreground tracking-widest uppercase mb-3">
                Mrit Shilpalay
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t({
                  bn: "বর্ধমানের ঐতিহ্যবাহী মাটির মূর্তি প্রস্তুতকারক।",
                  en: "Traditional handmade clay idol manufacturer from Bardhaman, West Bengal.",
                })}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                {t({ bn: "দ্রুত লিঙ্ক", en: "Quick Links" })}
              </h3>
              <ul className="space-y-2">
                {FOOTER_QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                {t({ bn: "সেবা এলাকা", en: "Service Areas" })}
              </h3>
              <ul className="space-y-2">
                {CITY_LINKS.map((city) => (
                  <li key={city.href}>
                    <Link
                      to={city.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                      data-ocid={`footer-city-${city.href.replace("/cities/", "")}`}
                    >
                      {t(city.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                {t({ bn: "যোগাযোগ", en: "Contact" })}
              </h3>
              <address className="not-italic space-y-2">
                <p className="text-sm text-muted-foreground">
                  Mirchoba, Palpara, Chhotonilpur,
                  <br />
                  Bardhaman, West Bengal – 713103
                </p>
                <a
                  href={`tel:${PHONE}`}
                  className="text-sm text-primary hover:text-primary/80 transition-smooth block font-medium"
                >
                  +91 6295466310
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary hover:text-secondary/80 transition-smooth block font-medium"
                >
                  {t({ bn: "হোয়াটসঅ্যাপে যোগাযোগ করুন", en: "WhatsApp Inquiry" })}
                </a>
              </address>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Radha Madhav Mrit Shilpalay. All
              rights reserved.
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth"
            >
              Built with love using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA Buttons */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex"
        role="complementary"
        aria-label="Quick contact"
      >
        <a
          href={`tel:${PHONE}`}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 font-semibold text-sm transition-smooth hover:bg-primary/90 active:scale-95"
          data-ocid="sticky-call-btn"
        >
          <Phone size={16} />
          {t({ bn: "কল করুন", en: "Call Now" })}
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3.5 font-semibold text-sm transition-smooth hover:bg-secondary/90 active:scale-95"
          data-ocid="sticky-whatsapp-btn"
        >
          <MessageCircle size={16} />
          {t({ bn: "হোয়াটসঅ্যাপ", en: "WhatsApp Us" })}
        </a>
      </div>
    </div>
  );
}
