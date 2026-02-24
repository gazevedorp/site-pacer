import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";
import { GridBackground } from "@/components/ui/grid-background";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { HomePage } from "@/pages/HomePage";
import { UnitPage } from "@/pages/UnitPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      <div
        className="min-h-screen"
        style={{ opacity: showSplash ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
        <GridBackground />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unidades/:slug" element={<UnitPage />} />
        </Routes>
        <WhatsAppFloat />
      </div>
    </BrowserRouter>
  );
}
