import { AdminLayout } from "@/components/AdminLayout";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAdmin } from "@/hooks/useAdmin";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

// ─── Core Pages ───
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const ProductsPage = lazy(() =>
  import("@/pages/Products").then((m) => ({ default: m.ProductsPage })),
);
const AboutPage = lazy(() =>
  import("@/pages/About").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("@/pages/Contact").then((m) => ({ default: m.ContactPage })),
);

// ─── City Pages ───
const CityBardhamanPage = lazy(() =>
  import("@/pages/cities/Bardhaman").then((m) => ({
    default: m.CityBardhamanPage,
  })),
);
const CityDurgapurPage = lazy(() =>
  import("@/pages/cities/Durgapur").then((m) => ({
    default: m.CityDurgapurPage,
  })),
);
const CityAsansolPage = lazy(() =>
  import("@/pages/cities/Asansol").then((m) => ({
    default: m.CityAsansolPage,
  })),
);
const CityBankuraPage = lazy(() =>
  import("@/pages/cities/Bankura").then((m) => ({
    default: m.CityBankuraPage,
  })),
);
const CityPuruliaPage = lazy(() =>
  import("@/pages/cities/Purulia").then((m) => ({
    default: m.CityPuruliaPage,
  })),
);
const CityDhanbadPage = lazy(() =>
  import("@/pages/cities/Dhanbad").then((m) => ({
    default: m.CityDhanbadPage,
  })),
);
const CityKolkataPage = lazy(() =>
  import("@/pages/cities/Kolkata").then((m) => ({
    default: m.CityKolkataPage,
  })),
);
const CityAllIndiaPage = lazy(() =>
  import("@/pages/cities/AllIndia").then((m) => ({
    default: m.CityAllIndiaPage,
  })),
);

// ─── Blog Pages ───
const BlogListPage = lazy(() =>
  import("@/pages/blog/BlogList").then((m) => ({ default: m.BlogListPage })),
);
const BlogWholesaleBuyingGuidePage = lazy(() =>
  import("@/pages/blog/WholesaleBuyingGuide").then((m) => ({
    default: m.BlogWholesaleBuyingGuidePage,
  })),
);
const BlogHowToChooseClayIdolsPage = lazy(() =>
  import("@/pages/blog/HowToChooseClayIdols").then((m) => ({
    default: m.BlogHowToChooseClayIdolsPage,
  })),
);
const BlogDurgaPujaBulkOrdersPage = lazy(() =>
  import("@/pages/blog/DurgaPujaBulkOrders").then((m) => ({
    default: m.BlogDurgaPujaBulkOrdersPage,
  })),
);

// ─── Category Pages ───
const BanglaLakshmiGaneshPage = lazy(() =>
  import("@/pages/categories/BanglaLakshmiGanesh").then((m) => ({
    default: m.BanglaLakshmiGaneshPage,
  })),
);
const ClayGaneshWholesalePage = lazy(() =>
  import("@/pages/categories/ClayGaneshWholesale").then((m) => ({
    default: m.ClayGaneshWholesalePage,
  })),
);
const ClayVishwakarmaPage = lazy(() =>
  import("@/pages/categories/ClayVishwakarma").then((m) => ({
    default: m.ClayVishwakarmaPage,
  })),
);
const ClayLakshmiPage = lazy(() =>
  import("@/pages/categories/ClayLakshmi").then((m) => ({
    default: m.ClayLakshmiPage,
  })),
);
const DiwaliLakshmiGaneshPage = lazy(() =>
  import("@/pages/categories/DiwaliLakshmiGanesh").then((m) => ({
    default: m.DiwaliLakshmiGaneshPage,
  })),
);
const ClayKaliPage = lazy(() =>
  import("@/pages/categories/ClayKali").then((m) => ({
    default: m.ClayKaliPage,
  })),
);
const SmallDurgaPage = lazy(() =>
  import("@/pages/categories/SmallDurga").then((m) => ({
    default: m.SmallDurgaPage,
  })),
);
const RadhaKrishnaPage = lazy(() =>
  import("@/pages/categories/RadhaKrishna").then((m) => ({
    default: m.RadhaKrishnaPage,
  })),
);
const ClayKartikPage = lazy(() =>
  import("@/pages/categories/ClayKartik").then((m) => ({
    default: m.ClayKartikPage,
  })),
);
const ClaySaraswatiPage = lazy(() =>
  import("@/pages/categories/ClaySaraswati").then((m) => ({
    default: m.ClaySaraswatiPage,
  })),
);
const CustomClayIdolPage = lazy(() =>
  import("@/pages/categories/CustomClayIdol").then((m) => ({
    default: m.CustomClayIdolPage,
  })),
);

// ─── Product Detail Page ───
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetail").then((m) => ({
    default: m.ProductDetailPage,
  })),
);

// ─── Admin Pages ───
const AdminLoginPage = lazy(() =>
  import("@/pages/admin/AdminLogin").then((m) => ({
    default: m.AdminLoginPage,
  })),
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/admin/AdminDashboard").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminProductNewPage = lazy(() =>
  import("@/pages/admin/AdminProductNew").then((m) => ({
    default: m.AdminProductNewPage,
  })),
);
const AdminProductEditPage = lazy(() =>
  import("@/pages/admin/AdminProductEdit").then((m) => ({
    default: m.AdminProductEditPage,
  })),
);

export function PageLoader() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-8 w-2/3 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
    </div>
  );
}

// ─── Admin Guard ───
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, isAdminLoading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoading && !isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [isAdmin, isAdminLoading, navigate]);

  if (isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="h-12 w-48 rounded-md" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return <AdminLayout>{children}</AdminLayout>;
}

// ─── Public Root ───
const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </LanguageProvider>
  ),
});

// ─── Core Routes ───
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: ProductDetailPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

// ─── City Routes ───
const cityBardhamanRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/bardhaman",
  component: CityBardhamanPage,
});
const cityDurgapurRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/durgapur",
  component: CityDurgapurPage,
});
const cityAsansolRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/asansol",
  component: CityAsansolPage,
});
const cityBankuraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/bankura",
  component: CityBankuraPage,
});
const cityPuruliaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/purulia",
  component: CityPuruliaPage,
});
const cityDhanbadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/dhanbad",
  component: CityDhanbadPage,
});
const cityKolkataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/kolkata",
  component: CityKolkataPage,
});
const cityAllIndiaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cities/all-india",
  component: CityAllIndiaPage,
});

// ─── Blog Routes ───
const blogListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogListPage,
});
const blogWholesaleBuyingGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/wholesale-buying-guide",
  component: BlogWholesaleBuyingGuidePage,
});
const blogHowToChooseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/how-to-choose-clay-idols",
  component: BlogHowToChooseClayIdolsPage,
});
const blogDurgaPujaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/durga-puja-bulk-orders-west-bengal",
  component: BlogDurgaPujaBulkOrdersPage,
});

// ─── Category Routes ───
const banglaLakshmiGaneshRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bangla-lakshmi-ganesh-idol",
  component: BanglaLakshmiGaneshPage,
});
const clayGaneshWholesaleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clay-ganesh-idol-wholesale",
  component: ClayGaneshWholesalePage,
});
const clayVishwakarmaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clay-vishwakarma-idol",
  component: ClayVishwakarmaPage,
});
const clayLakshmiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clay-lakshmi-idol",
  component: ClayLakshmiPage,
});
const diwaliLakshmiGaneshRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/diwali-lakshmi-ganesh-idol",
  component: DiwaliLakshmiGaneshPage,
});
const clayKaliRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clay-kali-idol",
  component: ClayKaliPage,
});
const smallDurgaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/small-durga-idol",
  component: SmallDurgaPage,
});
const radhaKrishnaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/radha-krishna-clay-idol",
  component: RadhaKrishnaPage,
});
const clayKartikRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clay-kartik-idol",
  component: ClayKartikPage,
});
const claySaraswatiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clay-saraswati-idol",
  component: ClaySaraswatiPage,
});
const customClayIdolRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/custom-clay-idol",
  component: CustomClayIdolPage,
});

// ─── Admin Routes ───
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminGuard>
      <Suspense fallback={<PageLoader />}>
        <AdminDashboardPage />
      </Suspense>
    </AdminGuard>
  ),
});

const adminProductNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/new",
  component: () => (
    <AdminGuard>
      <Suspense fallback={<PageLoader />}>
        <AdminProductNewPage />
      </Suspense>
    </AdminGuard>
  ),
});

const adminProductEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products/$productId/edit",
  component: () => (
    <AdminGuard>
      <Suspense fallback={<PageLoader />}>
        <AdminProductEditPage />
      </Suspense>
    </AdminGuard>
  ),
});

const adminCategoryImagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/category-images",
  component: () => {
    // Redirect old route to /admin (Categories tab is now in dashboard)
    const navigate = useNavigate();
    useEffect(() => {
      navigate({ to: "/admin" });
    }, [navigate]);
    return null;
  },
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  aboutRoute,
  contactRoute,
  cityBardhamanRoute,
  cityDurgapurRoute,
  cityAsansolRoute,
  cityBankuraRoute,
  cityPuruliaRoute,
  cityDhanbadRoute,
  cityKolkataRoute,
  cityAllIndiaRoute,
  blogListRoute,
  blogWholesaleBuyingGuideRoute,
  blogHowToChooseRoute,
  blogDurgaPujaRoute,
  banglaLakshmiGaneshRoute,
  clayGaneshWholesaleRoute,
  clayVishwakarmaRoute,
  clayLakshmiRoute,
  diwaliLakshmiGaneshRoute,
  clayKaliRoute,
  smallDurgaRoute,
  radhaKrishnaRoute,
  clayKartikRoute,
  claySaraswatiRoute,
  customClayIdolRoute,
  adminLoginRoute,
  adminRoute,
  adminProductNewRoute,
  adminProductEditRoute,
  adminCategoryImagesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
