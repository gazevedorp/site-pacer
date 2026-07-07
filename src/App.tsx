import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";
import { AlertModal } from "@/components/AlertModal";
import { AppFloat } from "@/components/AppFloat";
import { PageShell } from "@/components/layout/PageShell";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import { LenisProvider, useLenis } from "@/hooks/useLenis";
import { SCHEDULE_PAGE_ENABLED } from "@/config/features";

// ─── Lazy page imports (code-split per route) ─────────────────────────────────
const HomePage           = lazy(() => import("@/pages/HomePage"));
const UnitsPage          = lazy(() => import("@/pages/UnitsPage"));
const UnitDetailPage     = lazy(() => import("@/pages/UnitDetailPage"));
const ModalitiesPage     = lazy(() => import("@/pages/ModalitiesPage"));
const ModalityDetailPage = lazy(() => import("@/pages/ModalityDetailPage"));
const SchedulePage       = lazy(() => import("@/pages/SchedulePage"));
const TrainersPage       = lazy(() => import("@/pages/TrainersPage"));
const PlansPage          = lazy(() => import("@/pages/PlansPage"));
const CareersPage        = lazy(() => import("@/pages/CareersPage"));
const ContactPage        = lazy(() => import("@/pages/ContactPage"));
const FAQPage            = lazy(() => import("@/pages/FAQPage"));
const AppPage            = lazy(() => import("@/pages/AppPage"));

// ─── Scroll-to-top on route change (Lenis-aware) ─────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);

  return null;
}

// ─── Route tree ──────────────────────────────────────────────────────────────
function AppRoutes() {
  const wrap = (Page: React.ComponentType) => (
    <Suspense fallback={<PageSkeleton />}>
      <Page />
    </Suspense>
  );

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/"                    element={wrap(HomePage)} />
          <Route path="/unidades"            element={wrap(UnitsPage)} />
          <Route path="/unidades/:slug"      element={wrap(UnitDetailPage)} />
          <Route path="/modalidades"         element={wrap(ModalitiesPage)} />
          <Route path="/modalidades/:slug"   element={wrap(ModalityDetailPage)} />
          <Route
            path="/aulas"
            element={
              SCHEDULE_PAGE_ENABLED ? wrap(SchedulePage) : <Navigate to="/" replace />
            }
          />
          <Route path="/personais"           element={wrap(TrainersPage)} />
          <Route path="/planos"              element={wrap(PlansPage)} />
          <Route path="/trabalhe-conosco"    element={wrap(CareersPage)} />
          <Route path="/contato"             element={wrap(ContactPage)} />
          <Route path="/faq"                  element={wrap(FAQPage)} />
          <Route path="/app"                  element={wrap(AppPage)} />
        </Route>
      </Routes>
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      <LenisProvider lerp={0.1} wheelMultiplier={1}>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

        <div
          className="min-h-screen"
          style={{ opacity: showSplash ? 0 : 1, transition: "opacity 0.5s ease" }}
        >
          <AppFloat />
          <AlertModal enabled={!showSplash} />
          <AppRoutes />
        </div>
      </LenisProvider>
    </BrowserRouter>
  );
}
